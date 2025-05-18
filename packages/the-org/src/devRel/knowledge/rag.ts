import fs from 'node:fs/promises';
import path from 'node:path';
import { logger } from '@elizaos/core';
import { generateEmbedding, cosineSimilarity } from '../embeddings/embeddingService';
import { DocumentationConfig } from './knowledgeManager';

export interface DocumentChunk {
  content: string;
  metadata: {
    source: string;
    title?: string;
    section?: string;
  };
  embedding?: number[];
}

export class RAGSystem {
  private chunks: DocumentChunk[] = [];
  private isInitialized = false;
  private docConfig: DocumentationConfig[] = [];
  private chunkSize = 1000; // characters per chunk
  private chunkOverlap = 200; // characters overlap between chunks

  constructor(docConfig: DocumentationConfig[] = []) {
    this.docConfig = docConfig;
  }

  /**
   * Initialize the RAG system by loading and processing documents
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    logger.info('Initializing RAG system...');

    try {
      // Load documents from all configured sources
      for (const config of this.docConfig) {
        await this.processDocumentationSource(config);
      }

      logger.info(`RAG system initialized with ${this.chunks.length} document chunks`);
      this.isInitialized = true;
    } catch (error) {
      logger.error('Failed to initialize RAG system:', error);
      throw error;
    }
  }

  /**
   * Process a single documentation source
   */
  private async processDocumentationSource(config: DocumentationConfig): Promise<void> {
    const { path: sourcePath, type, name } = config;

    try {
      logger.debug(`Processing documentation source: ${name} (${type}) at ${sourcePath}`);

      // Handle different documentation types
      switch (type) {
        case 'markdown':
          await this.processMarkdownFiles(sourcePath, name);
          break;
        case 'typescript':
          await this.processTypeScriptFiles(sourcePath, name);
          break;
        default:
          logger.warn(`Unsupported documentation type: ${type}`);
      }
    } catch (error) {
      logger.error(`Error processing documentation source ${name}:`, error);
    }
  }

  /**
   * Process markdown files in a directory
   */
  private async processMarkdownFiles(dirPath: string, sourceName: string): Promise<void> {
    try {
      const files = await this.findFilesByExtension(dirPath, '.md');

      for (const file of files) {
        try {
          const content = await fs.readFile(file, 'utf-8');
          const title = path.basename(file, '.md');

          // Split markdown into sections by headers
          const sections = this.splitMarkdownIntoSections(content);

          for (const section of sections) {
            // Further split into chunks if needed
            const chunks = this.splitIntoChunks(section.content);

            for (const chunk of chunks) {
              this.chunks.push({
                content: chunk,
                metadata: {
                  source: sourceName,
                  title,
                  section: section.title,
                },
              });
            }
          }
        } catch (error) {
          logger.error(`Error processing markdown file ${file}:`, error);
        }
      }
    } catch (error) {
      logger.error(`Error reading markdown files from ${dirPath}:`, error);
      throw error;
    }
  }

  /**
   * Process TypeScript files in a directory
   */
  private async processTypeScriptFiles(dirPath: string, sourceName: string): Promise<void> {
    try {
      const files = await this.findFilesByExtension(dirPath, '.ts');

      for (const file of files) {
        try {
          const content = await fs.readFile(file, 'utf-8');
          const title = path.basename(file, '.ts');

          // Split TypeScript files by functions/classes
          const chunks = this.splitTypeScriptFile(content);

          for (const chunk of chunks) {
            this.chunks.push({
              content: chunk.content,
              metadata: {
                source: sourceName,
                title,
                section: chunk.name,
              },
            });
          }
        } catch (error) {
          logger.error(`Error processing TypeScript file ${file}:`, error);
        }
      }
    } catch (error) {
      logger.error(`Error reading TypeScript files from ${dirPath}:`, error);
      throw error;
    }
  }

  /**
   * Find all files with a specific extension in a directory (recursively)
   */
  private async findFilesByExtension(dirPath: string, extension: string): Promise<string[]> {
    const files: string[] = [];

    async function walkDir(currentPath: string): Promise<void> {
      const entries = await fs.readdir(currentPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);

        if (entry.isDirectory()) {
          await walkDir(fullPath);
        } else if (entry.isFile() && entry.name.endsWith(extension)) {
          files.push(fullPath);
        }
      }
    }

    await walkDir(dirPath);
    return files;
  }

  /**
   * Split markdown content into sections based on headers
   */
  private splitMarkdownIntoSections(content: string): Array<{ title: string; content: string }> {
    const sections: Array<{ title: string; content: string }> = [];
    const lines = content.split('\n');
    let currentSection = { title: 'Introduction', content: '' };

    for (const line of lines) {
      // Check for markdown headers (##, ###, etc.)
      const headerMatch = line.match(/^(#{1,6})\s+(.+)/);

      if (headerMatch) {
        // Save previous section if it has content
        if (currentSection.content.trim()) {
          sections.push({ ...currentSection });
        }

        // Start new section
        currentSection = {
          title: headerMatch[2].trim(),
          content: line + '\n',
        };
      } else {
        currentSection.content += line + '\n';
      }
    }

    // Add the last section
    if (currentSection.content.trim()) {
      sections.push({ ...currentSection });
    }

    return sections;
  }

  /**
   * Split content into overlapping chunks
   */
  private splitIntoChunks(
    content: string,
    chunkSize: number = this.chunkSize,
    overlap: number = this.chunkOverlap
  ): string[] {
    const chunks: string[] = [];
    let start = 0;

    while (start < content.length) {
      let end = start + chunkSize;

      // Try to end at a sentence boundary if possible
      if (end < content.length) {
        const nextPeriod = content.indexOf('.', end);
        const nextNewline = content.indexOf('\n', end);

        if (nextPeriod !== -1 && nextPeriod < end + 100) {
          end = nextPeriod + 1;
        } else if (nextNewline !== -1 && nextNewline < end + 50) {
          end = nextNewline + 1;
        }
      }

      chunks.push(content.substring(start, end).trim());

      // Stop if we've reached the end
      if (end >= content.length) break;

      // Move start forward, but allow overlap
      start = end - Math.min(overlap, chunkSize / 2);
    }

    return chunks;
  }

  /**
   * Split TypeScript file into logical chunks (functions, classes, etc.)
   */
  private splitTypeScriptFile(content: string): Array<{ name: string; content: string }> {
    const chunks: Array<{ name: string; content: string }> = [];

    // Simple regex to match functions and classes
    const functionRegex =
      /(export\s+)?(async\s+)?(function|class|interface|type|const|let|var)\s+([a-zA-Z0-9_$]+)[\s<{]/g;
    let lastIndex = 0;
    let match;

    while ((match = functionRegex.exec(content)) !== null) {
      const name = match[4] || 'anonymous';
      const start = match.index;

      // Add the previous chunk if there's content between matches
      if (start > lastIndex) {
        const chunkContent = content.substring(lastIndex, start).trim();
        if (chunkContent) {
          chunks.push({
            name: 'Code',
            content: chunkContent,
          });
        }
      }

      // Find the end of this function/class
      let depth = 0;
      let inString = false;
      let stringChar = '';
      let i = start;

      while (i < content.length) {
        const char = content[i];

        // Handle strings
        if (char === '"' || char === '`' || char === "'") {
          if (!inString) {
            inString = true;
            stringChar = char;
          } else if (char === stringChar) {
            // Skip escaped quotes
            if (content[i - 1] !== '\\') {
              inString = false;
            }
          }
        }

        // Count braces when not in a string
        if (!inString) {
          if (char === '{' || char === '(' || char === '[') {
            depth++;
          } else if (char === '}' || char === ')' || char === ']') {
            depth--;

            // Found the end of the block
            if (depth <= 0) {
              const chunkContent = content.substring(start, i + 1).trim();
              if (chunkContent) {
                chunks.push({
                  name,
                  content: chunkContent,
                });
              }
              lastIndex = i + 1;
              break;
            }
          }
        }

        i++;
      }
    }

    // Add any remaining content
    if (lastIndex < content.length) {
      const chunkContent = content.substring(lastIndex).trim();
      if (chunkContent) {
        chunks.push({
          name: 'Code',
          content: chunkContent,
        });
      }
    }

    return chunks;
  }

  /**
   * Generate embeddings for all document chunks
   */
  async generateEmbeddings(): Promise<void> {
    logger.info(`Generating embeddings for ${this.chunks.length} chunks...`);

    for (let i = 0; i < this.chunks.length; i++) {
      try {
        const chunk = this.chunks[i];
        chunk.embedding = await generateEmbedding(chunk.content);

        // Log progress every 10 chunks
        if (i > 0 && i % 10 === 0) {
          logger.debug(`Generated embeddings for ${i}/${this.chunks.length} chunks`);
        }
      } catch (error) {
        logger.error(`Error generating embedding for chunk ${i}:`, error);
      }
    }

    logger.info('Finished generating embeddings');
  }

  /**
   * Find the most relevant document chunks for a query
   */
  async query(
    query: string,
    k: number = 5,
    minScore: number = 0.7
  ): Promise<Array<{ content: string; metadata: any; score: number }>> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // Generate embedding for the query
      const queryEmbedding = await generateEmbedding(query);
      return this.queryWithEmbedding(queryEmbedding, k, minScore);
    } catch (error) {
      logger.error('Error generating query embedding:', error);
      throw error;
    }
  }

  /**
   * Query the RAG system using a pre-computed embedding
   * @param queryEmbedding - The embedding vector of the query
   * @param k - Maximum number of results to return
   * @param minScore - Minimum similarity score (0-1) for results
   * @returns Array of similar documents with their metadata and scores
   */
  async queryWithEmbedding(
    queryEmbedding: number[],
    k: number = 5,
    minScore: number = 0.7
  ): Promise<Array<{ content: string; metadata: any; score: number }>> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // Calculate similarity scores for all chunks
      const scoredChunks = [];

      // Process chunks in batches to avoid overwhelming the system
      const batchSize = 10;
      for (let i = 0; i < this.chunks.length; i += batchSize) {
        const batch = this.chunks.slice(i, i + batchSize);
        const batchResults = await Promise.all(
          batch.map(async (chunk) => {
            if (!chunk.embedding) {
              return { ...chunk, score: -1 };
            }
            // Convert embeddings to strings for the calculateSimilarity function
            const score = cosineSimilarity(queryEmbedding, chunk.embedding);
            return { ...chunk, score };
          })
        );
        scoredChunks.push(...batchResults);
      }

      // Filter and sort results
      return scoredChunks
        .filter((chunk) => chunk.score >= minScore)
        .sort((a, b) => b.score - a.score)
        .slice(0, k)
        .map(({ content, metadata, score }) => ({
          content,
          metadata,
          score,
        }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Error querying RAG system with embedding:', errorMessage);
      throw new Error(`Failed to query RAG system: ${errorMessage}`);
    }
  }

  /**
   * Format search results into a readable string
   */
  formatResults(results: Array<{ content: string; metadata: any; score: number }>): string {
    if (results.length === 0) {
      return 'No relevant information found.';
    }

    return results
      .map((result, i) => {
        const { content, metadata, score } = result;
        const source = metadata?.source || 'Unknown';
        const title = metadata?.title || 'Untitled';
        const section = metadata?.section ? ` (${metadata.section})` : '';

        // Truncate content for display
        const maxLength = 200;
        let displayContent =
          content.length > maxLength ? content.substring(0, maxLength) + '...' : content;

        // Add line breaks for better readability
        return (
          `### ${i + 1}. ${title}${section} [${Math.round(score * 100)}%]\n\n` +
          `**Source:** ${source}\n\n` +
          `${displayContent.replace(/\n/g, '\n\n')}\n\n`
        );
      })
      .join('\n\n');
  }
}

// Singleton instance
let ragInstance: RAGSystem | null = null;

/**
 * Get or create the RAG system instance
 */
export function getRAGSystem(docConfig: DocumentationConfig[] = []): RAGSystem {
  if (!ragInstance) {
    ragInstance = new RAGSystem(docConfig);
  } else if (docConfig.length > 0) {
    // Update config if provided
    ragInstance = new RAGSystem(docConfig);
  }

  return ragInstance;
}

/**
 * Initialize the RAG system with the given documentation configuration
 */
export async function initializeRAG(docConfig: DocumentationConfig[]): Promise<RAGSystem> {
  const rag = getRAGSystem(docConfig);
  await rag.initialize();
  return rag;
}

/**
 * Query the RAG system for relevant information
 */
export async function queryRAG(
  query: string,
  docConfig: DocumentationConfig[],
  k: number = 5,
  minScore: number = 0.7
): Promise<string> {
  const rag = getRAGSystem(docConfig);
  await rag.initialize();
  const results = await rag.query(query, k, minScore);
  return rag.formatResults(results);
}

/**
 * Find documents similar to the input text
 * @param text - The input text to find similar documents for
 * @param docConfig - Documentation configuration
 * @param k - Maximum number of results to return (default: 5)
 * @param minScore - Minimum similarity score (0-1) for results (default: 0.7)
 * @returns Array of similar documents with their metadata and scores
 */
export async function querySimilarDocuments(
  text: string,
  docConfig: DocumentationConfig[],
  k: number = 5,
  minScore: number = 0.7
): Promise<Array<{ content: string; metadata: any; score: number }>> {
  const rag = getRAGSystem(docConfig);

  try {
    // Use the standard query method which will handle embeddings internally
    return await rag.query(text, k, minScore);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Error querying similar documents:', errorMessage);
    throw new Error(`Failed to find similar documents: ${errorMessage}`);
  }
}

export default {
  RAGSystem,
  getRAGSystem,
  initializeRAG,
  queryRAG,
};

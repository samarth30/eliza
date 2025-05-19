import fs from 'node:fs/promises';
import path from 'node:path';
import { logger } from '@elizaos/core';
import { generateEmbeddingsBatch, cosineSimilarity } from '../embeddings/embeddingService';
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
      // Check if embedding cache exists
      const cacheExists = await this.checkEmbeddingCacheExists();

      if (cacheExists) {
        logger.info('Embedding cache exists. Skipping document processing.');
        // Just mark as initialized without processing documents
        // We'll load embeddings from cache later in generateEmbeddings()
        this.isInitialized = true;
        return;
      }

      // If no cache exists, load documents from all configured sources
      logger.info('No embedding cache found. Processing documentation sources...');
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
   * Check if embedding cache exists and has files
   */
  private async checkEmbeddingCacheExists(): Promise<boolean> {
    try {
      // Get the cache directory path from the embedding service
      // This is a bit of a hack but allows us to check the same cache location
      const cacheDir = path.join(__dirname, '../.embedding-cache');

      // Check if directory exists and has files
      try {
        const files = await fs.readdir(cacheDir);
        const hasEmbeddings = files.some((file) => file.endsWith('.json'));

        if (hasEmbeddings) {
          logger.info(`Found existing embedding cache with ${files.length} files`);
          return true;
        }
      } catch (err) {
        // Directory doesn't exist or can't be read
        return false;
      }

      return false;
    } catch (error) {
      logger.error('Error checking embedding cache:', error);
      return false;
    }
  }

  /**
   * Process a single documentation source
   */
  private async processDocumentationSource(config: DocumentationConfig): Promise<void> {
    const { path: sourcePath, type, name } = config;

    try {
      // Log the absolute path to help with debugging
      const absolutePath = path.resolve(sourcePath);
      logger.info(`Processing documentation source: ${name} (${type})
      - Source path: ${sourcePath}
      - Absolute path: ${absolutePath}
      - Current working directory: ${process.cwd()}`);

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
    // If we skipped document processing (due to existing cache), we need to load chunks from cache
    if (this.chunks.length === 0) {
      logger.info('No chunks loaded. Attempting to reconstruct from embedding cache...');
      await this.loadChunksFromCache();
    }

    logger.info(`Checking embeddings for ${this.chunks.length} chunks...`);

    // Skip if no chunks were found or reconstructed
    if (this.chunks.length === 0) {
      logger.warn('No chunks available. Cannot generate or load embeddings.');
      return;
    }

    // First try to load embeddings from cache for all chunks
    // This will populate embeddings from both memory and disk cache without generating new ones
    const chunksWithoutEmbedding = this.chunks.filter((chunk) => !chunk.embedding);
    if (chunksWithoutEmbedding.length > 0) {
      logger.info(`Loading cached embeddings for ${chunksWithoutEmbedding.length} chunks...`);

      // Try to load from cache in batches to avoid overwhelming the system
      const batchSize = 50;
      for (let i = 0; i < chunksWithoutEmbedding.length; i += batchSize) {
        const batch = chunksWithoutEmbedding.slice(i, i + batchSize);
        const contents = batch.map((chunk) => chunk.content);

        try {
          // This will check both memory and disk cache but won't generate new embeddings yet
          // It will only load existing embeddings from cache
          const cachedEmbeddings = await generateEmbeddingsBatch(contents);

          // Update chunks with cached embeddings
          cachedEmbeddings.forEach((embedding, index) => {
            batch[index].embedding = embedding;
          });

          if (i > 0 && i % 100 === 0) {
            logger.debug(
              `Loaded cached embeddings for ${i}/${chunksWithoutEmbedding.length} chunks`
            );
          }
        } catch (error) {
          logger.error(`Error loading cached embeddings for batch ${i}-${i + batchSize}:`, error);
        }
      }
    }

    // Now check which chunks still need embeddings generated
    const chunksStillNeedingEmbeddings = this.chunks.filter((chunk) => !chunk.embedding);

    if (chunksStillNeedingEmbeddings.length === 0) {
      logger.info('All embeddings loaded from cache. No new embeddings needed.');
      return;
    }

    // Generate embeddings only for chunks that still don't have them
    logger.info(`Generating new embeddings for ${chunksStillNeedingEmbeddings.length} chunks...`);

    const contents = chunksStillNeedingEmbeddings.map((chunk) => chunk.content);
    try {
      const embeddings = await generateEmbeddingsBatch(contents);
      embeddings.forEach((embedding, index) => {
        chunksStillNeedingEmbeddings[index].embedding = embedding;
      });
      logger.info(
        `Successfully generated new embeddings for ${chunksStillNeedingEmbeddings.length} chunks.`
      );
    } catch (error) {
      logger.error('Error generating new embeddings in batch:', error);
      // Optionally, handle individual fallbacks or mark chunks as failed
    }

    logger.info('Finished loading and generating embeddings');
  }

  /**
   * Load chunks from embedding cache files
   * This is used when we skip document processing but still need the chunks
   */
  private async loadChunksFromCache(): Promise<void> {
    try {
      const cacheDir = path.join(__dirname, '../.embedding-cache');
      const files = await fs.readdir(cacheDir);
      const jsonFiles = files.filter((file) => file.endsWith('.json'));

      logger.info(`Found ${jsonFiles.length} cache files. Reconstructing chunks...`);

      // Process files in batches to avoid memory issues
      const batchSize = 50;
      let reconstructedCount = 0;

      for (let i = 0; i < jsonFiles.length; i += batchSize) {
        const batch = jsonFiles.slice(i, i + batchSize);

        await Promise.all(
          batch.map(async (file) => {
            try {
              const filePath = path.join(cacheDir, file);
              const data = await fs.readFile(filePath, 'utf8');
              const parsed = JSON.parse(data);

              if (parsed.text && parsed.embedding) {
                // Create a new chunk with the cached data
                // We don't have the original metadata, so we'll use placeholders
                this.chunks.push({
                  content: parsed.text,
                  embedding: parsed.embedding,
                  metadata: {
                    source: 'cache',
                    title: 'Reconstructed from cache',
                    section: file.replace('.json', ''),
                  },
                });
                reconstructedCount++;
              }
            } catch (error) {
              logger.error(`Error processing cache file ${file}:`, error);
            }
          })
        );

        if (i > 0 && i % 100 === 0) {
          logger.debug(`Reconstructed ${reconstructedCount} chunks from cache so far...`);
        }
      }

      logger.info(`Successfully reconstructed ${reconstructedCount} chunks from cache.`);
    } catch (error) {
      logger.error('Error loading chunks from cache:', error);
    }
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

    logger.info(`RAG query called with minScore=${minScore}, k=${k}`);
    logger.info(
      `Current chunks: ${this.chunks.length}, with embeddings: ${this.chunks.filter((c) => c.embedding).length}`
    );

    try {
      // Generate embedding for the query
      const queryEmbeddings = await generateEmbeddingsBatch([query]);
      if (!queryEmbeddings || queryEmbeddings.length === 0 || !queryEmbeddings[0]) {
        logger.error('Failed to generate embedding for query.');
        throw new Error('Failed to generate query embedding.');
      }

      // Use a lower minScore for testing if the original minScore fails to find matches
      const results = await this.queryWithEmbedding(queryEmbeddings[0], k, minScore);

      if (results.length === 0 && minScore > 0.3) {
        logger.info(`No results found with minScore=${minScore}, trying with lower threshold 0.3`);
        return this.queryWithEmbedding(queryEmbeddings[0], k, 0.3);
      }

      return results;
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

    logger.info(`queryWithEmbedding called with minScore=${minScore}, k=${k}`);

    try {
      // Calculate similarity scores for all chunks
      const scoredChunks = [];
      const totalChunks = this.chunks.length;
      const chunksWithEmbeddings = this.chunks.filter((c) => c.embedding).length;

      logger.info(`Processing ${totalChunks} chunks (${chunksWithEmbeddings} with embeddings)`);

      if (chunksWithEmbeddings === 0) {
        logger.error('No chunks have embeddings! Check embedding generation process.');
        // Attempt to fix by generating embeddings now
        logger.info('Attempting to generate embeddings now...');
        await this.generateEmbeddings();

        // Check again after attempting to generate
        const chunksWithEmbeddingsAfterFix = this.chunks.filter((c) => c.embedding).length;
        logger.info(`After fix attempt: ${chunksWithEmbeddingsAfterFix} chunks have embeddings`);
      }

      // Process chunks in batches to avoid overwhelming the system
      const batchSize = 100; // Increased batch size for efficiency
      for (let i = 0; i < this.chunks.length; i += batchSize) {
        const batch = this.chunks.slice(i, i + batchSize);
        const batchResults = await Promise.all(
          batch.map(async (chunk) => {
            if (!chunk.embedding) {
              logger.debug(`Chunk missing embedding: ${chunk.metadata?.source || 'unknown'}`);
              return { ...chunk, score: -1 };
            }
            // Calculate cosine similarity
            const score = cosineSimilarity(queryEmbedding, chunk.embedding);
            return { ...chunk, score };
          })
        );
        scoredChunks.push(...batchResults);
      }

      // Find top scores for debugging
      const topScores = scoredChunks.sort((a, b) => b.score - a.score).slice(0, 10);
      logger.info(`Top similarity scores: ${topScores.map((c) => c.score.toFixed(4)).join(', ')}`);

      if (topScores.length > 0) {
        logger.info(
          `Best match (${topScores[0].score.toFixed(4)}): ${topScores[0].metadata?.source || 'unknown'}`
        );
      }

      // Filter and sort results
      const results = scoredChunks
        .filter((chunk) => chunk.score >= minScore)
        .sort((a, b) => b.score - a.score)
        .slice(0, k)
        .map(({ content, metadata, score }) => ({
          content,
          metadata,
          score,
        }));

      logger.info(`Found ${results.length} results with minScore=${minScore}`);
      return results;
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
 * Query the RAG system with a query string and get a formatted response
 *
 * @param query - The query string
 * @param docConfig - Documentation configuration
 * @param k - Number of results to return (default: 3)
 * @param minScore - Minimum similarity score threshold (default: 0.6)
 * @returns Formatted response with relevant information
 */
export async function queryRAG(
  query: string,
  docConfig: DocumentationConfig[],
  k: number = 3,
  minScore: number = 0.4 // Lowered threshold based on testing
): Promise<string> {
  try {
    const rag = getRAGSystem(docConfig);
    await rag.initialize();
    const results = await rag.query(query, k, minScore);

    if (results.length === 0) {
      return 'No relevant information found.';
    }

    return rag.formatResults(results);
  } catch (error) {
    logger.error('Error querying RAG system:', error);
    return 'Error retrieving information. Please try again later.';
  }
}

/**
 * Query for similar documents with their metadata and scores
 *
 * @param text - The text to find similar documents for
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
    // Initialize and ensure embeddings are generated
    await rag.initialize();
    await rag.generateEmbeddings();
    // Use the standard query method
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

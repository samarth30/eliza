import { logger } from '@elizaos/core';
import path from 'node:path';
import fs from 'node:fs/promises';

/**
 * Document chunking strategies for improved embedding generation.
 * This module provides enhanced methods for chunking documents that better preserve
 * context and semantic meaning compared to naive character-based chunking.
 */

export interface ChunkingOptions {
  // Size of a chunk in characters (default is larger than standard for better context)
  chunkSize?: number;
  // Amount of overlap between chunks (default is larger to maintain context)
  overlapSize?: number;
  // Whether to use semantic chunking (trying to preserve sections/paragraphs)
  useSemanticChunking?: boolean;
  // Whether to include metadata with each chunk
  includeMetadata?: boolean;
  // Maximum chunks per document (0 means no limit)
  maxChunksPerDocument?: number;
}

export interface DocumentChunk {
  content: string;
  metadata: {
    source: string;
    documentId: string;
    title?: string;
    section?: string;
    chunkIndex: number;
    totalChunks: number;
    isDocumentLevel?: boolean;
  };
}

/**
 * Process a markdown file into semantic chunks optimized for embedding generation
 * @param filePath Path to the markdown file
 * @param options Chunking options
 * @returns Array of document chunks
 */
export async function chunkMarkdownDocument(
  filePath: string,
  options: ChunkingOptions = {}
): Promise<DocumentChunk[]> {
  const {
    chunkSize = 2000, // Larger chunk size for better context
    overlapSize = 500, // More overlap between chunks
    useSemanticChunking = true,
    includeMetadata = true,
    maxChunksPerDocument = 0,
  } = options;

  try {
    // Read markdown file
    const content = await fs.readFile(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    const documentId = fileName.replace(/\.md$/, '');

    // Extract title from markdown
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : documentId;

    let chunks: DocumentChunk[] = [];

    if (useSemanticChunking) {
      chunks = semanticallyChunkMarkdown(content, {
        documentId,
        source: filePath,
        title,
        chunkSize,
        overlapSize,
      });
    } else {
      chunks = simpleChunkDocument(content, {
        documentId,
        source: filePath,
        title,
        chunkSize,
        overlapSize,
      });
    }

    // Apply max chunks limit if specified
    if (maxChunksPerDocument > 0 && chunks.length > maxChunksPerDocument) {
      logger.info(`Limiting ${chunks.length} chunks to ${maxChunksPerDocument} for ${filePath}`);
      chunks = chunks.slice(0, maxChunksPerDocument);
    }

    // Recalculate totalChunks after potential limiting
    chunks.forEach((chunk, index) => {
      chunk.metadata.chunkIndex = index;
      chunk.metadata.totalChunks = chunks.length;
    });

    logger.debug(`Generated ${chunks.length} chunks from ${filePath}`);
    return chunks;
  } catch (error) {
    logger.error(`Error chunking markdown document ${filePath}:`, error);
    return [];
  }
}

/**
 * Semantically chunk markdown content by preserving heading structure
 */
function semanticallyChunkMarkdown(
  content: string,
  {
    documentId,
    source,
    title,
    chunkSize = 2000,
    overlapSize = 500,
  }: {
    documentId: string;
    source: string;
    title: string;
    chunkSize?: number;
    overlapSize?: number;
  }
): DocumentChunk[] {
  // First, split the markdown into sections by headings
  const sections = extractMarkdownSections(content);
  const chunks: DocumentChunk[] = [];

  // If the document is small enough, keep it as a single chunk
  if (content.length <= chunkSize) {
    return [
      {
        content,
        metadata: {
          source,
          documentId,
          title,
          chunkIndex: 0,
          totalChunks: 1,
        },
      },
    ];
  }

  // Process each section
  sections.forEach((section) => {
    const sectionContent = section.content;
    const sectionTitle = section.title || title;

    // If section is small enough, keep it as one chunk
    if (sectionContent.length <= chunkSize) {
      chunks.push({
        content: sectionContent,
        metadata: {
          source,
          documentId,
          title,
          section: sectionTitle,
          chunkIndex: chunks.length,
          totalChunks: -1, // Will be updated later
        },
      });
    } else {
      // Split larger sections into chunks with overlap
      const sectionChunks = splitTextIntoChunks(sectionContent, chunkSize, overlapSize);

      sectionChunks.forEach((chunkText) => {
        chunks.push({
          content: chunkText,
          metadata: {
            source,
            documentId,
            title,
            section: sectionTitle,
            chunkIndex: chunks.length,
            totalChunks: -1, // Will be updated later
          },
        });
      });
    }
  });

  return chunks;
}

/**
 * Extract sections from markdown content based on headings
 */
function extractMarkdownSections(markdown: string): Array<{ title: string; content: string }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const sections: Array<{ title: string; content: string }> = [];

  // Start with whole document as default section if no headings
  let currentSection = {
    title: 'Document',
    content: '',
  };

  // Find all heading positions
  const headings: Array<{ index: number; level: number; title: string }> = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    headings.push({
      index: match.index,
      level: match[1].length, // Number of # characters
      title: match[2].trim(),
    });
  }

  // If no headings, return whole document as one section
  if (headings.length === 0) {
    return [{ title: 'Document', content: markdown }];
  }

  // Process sections based on headings
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    const nextHeadingIndex = i < headings.length - 1 ? headings[i + 1].index : markdown.length;

    const sectionContent = markdown.substring(heading.index, nextHeadingIndex).trim();
    sections.push({
      title: heading.title,
      content: sectionContent,
    });
  }

  return sections;
}

/**
 * Simple text chunking that tries to preserve paragraph boundaries
 */
function splitTextIntoChunks(text: string, chunkSize: number, overlapSize: number): string[] {
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    let end = Math.min(start + chunkSize, text.length);

    // Try to end at a natural boundary if possible
    if (end < text.length) {
      // Look for paragraph breaks first (double newline)
      const paragraphBreak = text.indexOf('\n\n', end - 100);
      if (paragraphBreak !== -1 && paragraphBreak < end + 100) {
        end = paragraphBreak + 2;
      } else {
        // Then try sentence boundaries
        const sentenceEnd = findSentenceBoundary(text, end);
        if (sentenceEnd !== -1 && sentenceEnd < end + 150) {
          end = sentenceEnd;
        }
      }
    }

    chunks.push(text.substring(start, end).trim());

    if (end >= text.length) break;

    // Move start with overlap
    start = Math.max(start + (chunkSize - overlapSize), end - overlapSize);
  }

  return chunks;
}

/**
 * Find the nearest sentence boundary to the given position
 */
function findSentenceBoundary(text: string, position: number): number {
  // Common sentence-ending punctuation followed by space or newline
  const sentenceEndRegex = /[.!?](?=[\s\n])/g;
  let boundary = -1;

  // Look ahead up to 150 chars for a sentence boundary
  const searchText = text.substring(
    Math.max(0, position - 50),
    Math.min(text.length, position + 150)
  );
  const searchOffset = Math.max(0, position - 50);

  let match;
  while ((match = sentenceEndRegex.exec(searchText)) !== null) {
    const matchPosition = match.index + searchOffset + 1; // +1 to include the punctuation

    if (matchPosition >= position) {
      boundary = matchPosition;
      break;
    }
  }

  return boundary;
}

/**
 * Chunk a document using simple character-based chunking
 */
function simpleChunkDocument(
  content: string,
  {
    documentId,
    source,
    title,
    chunkSize = 2000,
    overlapSize = 500,
  }: {
    documentId: string;
    source: string;
    title: string;
    chunkSize?: number;
    overlapSize?: number;
  }
): DocumentChunk[] {
  // If the document is small enough, keep it as a single chunk
  if (content.length <= chunkSize) {
    return [
      {
        content,
        metadata: {
          source,
          documentId,
          title,
          chunkIndex: 0,
          totalChunks: 1,
        },
      },
    ];
  }

  const textChunks = splitTextIntoChunks(content, chunkSize, overlapSize);

  return textChunks.map((chunkText, index) => ({
    content: chunkText,
    metadata: {
      source,
      documentId,
      title,
      chunkIndex: index,
      totalChunks: textChunks.length,
    },
  }));
}

/**
 * Process a batch of markdown files into chunks
 */
export async function batchProcessMarkdownFiles(
  filePaths: string[],
  options: ChunkingOptions = {}
): Promise<DocumentChunk[]> {
  const allChunks: DocumentChunk[] = [];

  for (const filePath of filePaths) {
    const chunks = await chunkMarkdownDocument(filePath, options);
    allChunks.push(...chunks);
  }

  return allChunks;
}

/**
 * Generate a document embedding that represents the entire document
 * This is useful for document-level search and similarity
 */
export async function processEntireDocument(filePath: string): Promise<DocumentChunk> {
  try {
    // Read the entire file
    const content = await fs.readFile(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    const documentId = fileName.replace(/\.md$/, '');

    // Extract title from markdown
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : documentId;

    // Create a single chunk for the entire document
    return {
      content,
      metadata: {
        source: filePath,
        documentId,
        title,
        chunkIndex: 0,
        totalChunks: 1,
      },
    };
  } catch (error) {
    logger.error(`Error processing entire document ${filePath}:`, error);
    throw error;
  }
}

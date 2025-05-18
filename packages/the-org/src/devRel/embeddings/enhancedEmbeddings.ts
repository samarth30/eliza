import { logger } from '@elizaos/core';
import { generateEmbeddingsBatch } from './embeddingService';
import {
  DocumentChunk,
  chunkMarkdownDocument,
  processEntireDocument,
  batchProcessMarkdownFiles,
} from './documentChunker';
import { estimateTokens, truncateToTokenLimit, MAX_TOKENS_PER_REQUEST } from './tokenCounter';
import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Generate embeddings for markdown documents with enhanced chunking strategies
 * for better semantic understanding and context preservation.
 */

interface EnhancedEmbeddingOptions {
  // Whether to generate document-level embeddings in addition to chunk embeddings
  generateDocumentEmbeddings?: boolean;
  // Chunking strategy: 'semantic', 'paragraph', or 'simple'
  chunkingStrategy?: 'semantic' | 'paragraph' | 'simple';
  // Whether to use batched processing for multiple documents
  useBatchProcessing?: boolean;
  // Chunk size in characters
  chunkSize?: number;
  // Overlap size in characters
  overlapSize?: number;
  // Maximum chunks per document (0 = no limit)
  maxChunksPerDocument?: number;
}

interface EmbeddedDocument {
  chunks: (DocumentChunk & { embedding?: number[] })[];
  documentEmbedding?: number[];
  metadata: {
    title: string;
    source: string;
    documentId: string;
  };
}

/**
 * Process a single markdown document and generate embeddings for its chunks
 * @param filePath Path to the markdown file
 * @param options Embedding options
 * @returns Promise with the embedded document
 */
export async function embedMarkdownDocument(
  filePath: string,
  options: EnhancedEmbeddingOptions = {}
): Promise<EmbeddedDocument> {
  const {
    generateDocumentEmbeddings = true,
    chunkingStrategy = 'semantic',
    chunkSize = 2000,
    overlapSize = 500,
    maxChunksPerDocument = 0,
  } = options;

  logger.info(`Embedding document ${filePath} with ${chunkingStrategy} chunking strategy`);

  try {
    // Step 1: Chunk the document using the appropriate strategy
    const documentChunks = await chunkMarkdownDocument(filePath, {
      chunkSize,
      overlapSize,
      useSemanticChunking: chunkingStrategy === 'semantic',
      maxChunksPerDocument,
    });

    if (documentChunks.length === 0) {
      throw new Error(`Failed to chunk document ${filePath}`);
    }

    // Step 2: Check for token limits and truncate if necessary
    for (let i = 0; i < documentChunks.length; i++) {
      const chunk = documentChunks[i];
      const tokenCount = estimateTokens(chunk.content);

      if (tokenCount > MAX_TOKENS_PER_REQUEST) {
        logger.warn(
          `Chunk ${i} exceeds token limit (${tokenCount} > ${MAX_TOKENS_PER_REQUEST}). Truncating.`
        );
        chunk.content = truncateToTokenLimit(chunk.content);
        logger.info(`Truncated chunk to ${estimateTokens(chunk.content)} tokens`);
      }
    }

    // Step 3: Generate embeddings for each chunk
    logger.info(`Generating embeddings for ${documentChunks.length} chunks from ${filePath}`);
    const chunkTexts = documentChunks.map((chunk) => chunk.content);
    const chunkEmbeddings = await generateEmbeddingsBatch(chunkTexts);

    // Step 3: Combine chunks with their embeddings
    const embeddedChunks = documentChunks.map((chunk, i) => ({
      ...chunk,
      embedding: chunkEmbeddings[i],
    }));

    // Step 4: Generate a document-level embedding if requested
    let documentEmbedding: number[] | undefined;
    if (generateDocumentEmbeddings) {
      try {
        const wholeDocs = await processEntireDocument(filePath);

        // Check if document exceeds token limit
        const tokenCount = estimateTokens(wholeDocs.content);
        if (tokenCount > MAX_TOKENS_PER_REQUEST) {
          logger.warn(
            `Document exceeds token limit (${tokenCount} > ${MAX_TOKENS_PER_REQUEST}). Truncating for document-level embedding.`
          );
          wholeDocs.content = truncateToTokenLimit(wholeDocs.content);
          logger.info(`Truncated document to ${estimateTokens(wholeDocs.content)} tokens`);
        }

        const embeddings = await generateEmbeddingsBatch([wholeDocs.content]);
        documentEmbedding = embeddings[0];
        logger.info(`Generated document-level embedding for ${filePath}`);
      } catch (error) {
        logger.warn(`Failed to generate document-level embedding for ${filePath}:`, error);
        // Continue without document-level embedding
      }
    }

    // Step 5: Return the embedded document
    const metadata = {
      title: embeddedChunks[0]?.metadata.title || path.basename(filePath),
      source: filePath,
      documentId:
        embeddedChunks[0]?.metadata.documentId || path.basename(filePath).replace(/\.md$/, ''),
    };

    return {
      chunks: embeddedChunks,
      documentEmbedding,
      metadata,
    };
  } catch (error) {
    logger.error(`Error embedding document ${filePath}:`, error);
    throw error;
  }
}

/**
 * Process a batch of markdown files and generate embeddings for all chunks
 * @param directoryPath Path to directory containing markdown files
 * @param options Embedding options
 * @returns Promise with array of embedded documents
 */
export async function embedDirectoryDocuments(
  directoryPath: string,
  options: EnhancedEmbeddingOptions = {}
): Promise<EmbeddedDocument[]> {
  const { useBatchProcessing = true } = options;

  try {
    // Step 1: Find all markdown files in the directory
    const files = await fs.readdir(directoryPath);
    const markdownFiles = files
      .filter((file) => file.endsWith('.md'))
      .map((file) => path.join(directoryPath, file));

    logger.info(`Found ${markdownFiles.length} markdown files in ${directoryPath}`);

    if (markdownFiles.length === 0) {
      return [];
    }

    // Step 2: Process files individually or in batch
    if (useBatchProcessing) {
      // Batch processing
      const allChunks = await batchProcessMarkdownFiles(markdownFiles, {
        chunkSize: options.chunkSize,
        overlapSize: options.overlapSize,
        useSemanticChunking: options.chunkingStrategy === 'semantic',
        maxChunksPerDocument: options.maxChunksPerDocument,
      });

      // Group chunks by document
      const chunksByDocument = new Map<string, DocumentChunk[]>();
      allChunks.forEach((chunk) => {
        const docId = chunk.metadata.documentId;
        if (!chunksByDocument.has(docId)) {
          chunksByDocument.set(docId, []);
        }
        chunksByDocument.get(docId)!.push(chunk);
      });

      // Check for token limits and truncate if necessary
      for (let i = 0; i < allChunks.length; i++) {
        const chunk = allChunks[i];
        const tokenCount = estimateTokens(chunk.content);

        if (tokenCount > MAX_TOKENS_PER_REQUEST) {
          logger.warn(
            `Batch chunk ${i} exceeds token limit (${tokenCount} > ${MAX_TOKENS_PER_REQUEST}). Truncating.`
          );
          chunk.content = truncateToTokenLimit(chunk.content);
          logger.info(`Truncated batch chunk to ${estimateTokens(chunk.content)} tokens`);
        }
      }

      // Generate embeddings for all chunks in smaller batches to avoid rate limits
      logger.info(`Generating embeddings for ${allChunks.length} chunks in batches`);

      // Process in smaller batches of 20 chunks at a time
      const batchSize = 20;
      const allEmbeddings: number[][] = [];

      for (let i = 0; i < allChunks.length; i += batchSize) {
        const batchEndIndex = Math.min(i + batchSize, allChunks.length);
        const batchChunks = allChunks.slice(i, batchEndIndex);
        const batchTexts = batchChunks.map((chunk) => chunk.content);

        logger.info(
          `Processing batch ${i / batchSize + 1} of ${Math.ceil(allChunks.length / batchSize)}`
        );
        const batchEmbeddings = await generateEmbeddingsBatch(batchTexts);
        allEmbeddings.push(...batchEmbeddings);
      }

      // Combine chunks with their embeddings
      const embeddedChunks = allChunks.map((chunk, i) => ({
        ...chunk,
        embedding: allEmbeddings[i],
      }));

      // Group embedded chunks by document
      const embeddedChunksByDocument = new Map<
        string,
        (DocumentChunk & { embedding?: number[] })[]
      >();
      embeddedChunks.forEach((chunk) => {
        const docId = chunk.metadata.documentId;
        if (!embeddedChunksByDocument.has(docId)) {
          embeddedChunksByDocument.set(docId, []);
        }
        embeddedChunksByDocument.get(docId)!.push(chunk);
      });

      // Create embedded document objects
      const embeddedDocuments: EmbeddedDocument[] = [];
      for (const [docId, chunks] of embeddedChunksByDocument.entries()) {
        const filePath = chunks[0].metadata.source;
        const metadata = {
          title: chunks[0].metadata.title || docId,
          source: filePath,
          documentId: docId,
        };

        // Generate document-level embedding if requested
        let documentEmbedding: number[] | undefined;
        if (options.generateDocumentEmbeddings) {
          try {
            const wholeDoc = await processEntireDocument(filePath);
            const docEmbeddings = await generateEmbeddingsBatch([wholeDoc.content]);
            documentEmbedding = docEmbeddings[0];
          } catch (error) {
            logger.warn(`Failed to generate document-level embedding for ${filePath}:`, error);
          }
        }

        embeddedDocuments.push({
          chunks,
          documentEmbedding,
          metadata,
        });
      }

      return embeddedDocuments;
    } else {
      // Process files individually
      const embeddedDocuments: EmbeddedDocument[] = [];
      for (const filePath of markdownFiles) {
        try {
          const embeddedDoc = await embedMarkdownDocument(filePath, options);
          embeddedDocuments.push(embeddedDoc);
        } catch (error) {
          logger.error(`Failed to embed document ${filePath}:`, error);
          // Continue with other files
        }
      }
      return embeddedDocuments;
    }
  } catch (error) {
    logger.error(`Error embedding directory ${directoryPath}:`, error);
    throw error;
  }
}

/**
 * Helper function to convert EmbeddedDocument to DocumentChunk[] format used by RAG
 */
export function convertToRAGChunks(
  embeddedDocuments: EmbeddedDocument[]
): (DocumentChunk & { embedding?: number[] })[] {
  const ragChunks: (DocumentChunk & { embedding?: number[] })[] = [];

  embeddedDocuments.forEach((doc) => {
    // Add all chunk-level embeddings
    ragChunks.push(...doc.chunks);

    // Add document-level embedding if available
    if (doc.documentEmbedding) {
      ragChunks.push({
        content: `Full document: ${doc.metadata.title}`,
        metadata: {
          source: doc.metadata.source,
          documentId: doc.metadata.documentId,
          title: doc.metadata.title,
          chunkIndex: -1,
          totalChunks: doc.chunks.length,
        },
        embedding: doc.documentEmbedding,
      });
    }
  });

  return ragChunks;
}

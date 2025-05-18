import { logger } from '@elizaos/core';
import path from 'node:path';
import {
  embedMarkdownDocument,
  embedDirectoryDocuments,
  convertToRAGChunks,
} from './enhancedEmbeddings';

async function testEnhancedEmbeddings() {
  try {
    // Define paths
    const docsPath = path.resolve(process.cwd(), 'packages/docs/docs');
    logger.info(`Testing enhanced embeddings with docs from: ${docsPath}`);

    // Test 1: Process a single file with semantic chunking
    const testFile = path.join(docsPath, 'quickstart.md');
    logger.info(`Processing single file: ${testFile}`);

    const embeddedDoc = await embedMarkdownDocument(testFile, {
      generateDocumentEmbeddings: true,
      chunkingStrategy: 'semantic',
      chunkSize: 2000,
      overlapSize: 500,
    });

    logger.info(`Embedded document summary:`);
    logger.info(`- Title: ${embeddedDoc.metadata.title}`);
    logger.info(`- Chunks: ${embeddedDoc.chunks.length}`);
    logger.info(
      `- Document embedding: ${embeddedDoc.documentEmbedding ? 'Generated' : 'Not generated'}`
    );

    // Display sample chunks
    if (embeddedDoc.chunks.length > 0) {
      logger.info('Sample chunks:');
      embeddedDoc.chunks.slice(0, 2).forEach((chunk, i) => {
        logger.info(`Chunk ${i + 1}: ${chunk.content.substring(0, 100)}...`);
        logger.info(`  Section: ${chunk.metadata.section || 'None'}`);
        logger.info(`  Embedding dimensions: ${chunk.embedding?.length || 0}`);
      });
    }

    // Test 2: Process the entire docs directory
    logger.info(`\nProcessing entire docs directory: ${docsPath}`);

    const embeddedDocs = await embedDirectoryDocuments(docsPath, {
      generateDocumentEmbeddings: true,
      chunkingStrategy: 'semantic',
      useBatchProcessing: true,
      chunkSize: 2000,
      overlapSize: 500,
      maxChunksPerDocument: 20, // Limit chunks per document
    });

    logger.info(`Embedded ${embeddedDocs.length} documents`);

    // Convert to RAG chunks format
    const ragChunks = convertToRAGChunks(embeddedDocs);
    logger.info(`Generated ${ragChunks.length} RAG chunks (including document-level chunks)`);

    // Count document-level chunks vs regular chunks
    const docLevelChunks = ragChunks.filter((c) => c.metadata.isDocumentLevel);
    logger.info(`Document-level chunks: ${docLevelChunks.length}`);
    logger.info(`Regular chunks: ${ragChunks.length - docLevelChunks.length}`);

    logger.info('Enhanced embeddings testing completed successfully');
  } catch (error) {
    logger.error('Error testing enhanced embeddings:', error);
  }
}

// Run the test
testEnhancedEmbeddings().catch((error) => {
  logger.error('Uncaught error in enhanced embeddings test:', error);
});

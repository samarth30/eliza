import path from 'path';
import { logger } from '@elizaos/core';
import { queryRAG, initializeRAG } from './rag';

async function testRAG() {
  try {
    // Define documentation sources including docs directory
    // Make absolute path more reliable
    const docsPath = path.resolve(process.cwd(), 'packages/docs/docs');
    logger.info(`Using docs path: ${docsPath}`);

    const docConfig: Array<any> = [
      {
        path: docsPath,
        type: 'markdown',
        name: 'Docs',
        description: 'Official ElizaOS documentation',
      },
    ];

    logger.info('Testing RAG system...');

    // First initialize the RAG system explicitly
    logger.info('Initializing RAG system with docs from: ' + docConfig[0].path);
    const ragSystem = await initializeRAG(docConfig);

    // Force embeddings generation
    logger.info('Generating embeddings...');
    await ragSystem.generateEmbeddings();

    // Get chunks count
    const totalChunks = ragSystem['chunks'].length;
    const chunksWithEmbeddings = ragSystem['chunks'].filter((c: any) => c.embedding).length;
    logger.info(`RAG system has ${totalChunks} chunks, ${chunksWithEmbeddings} with embeddings`);

    // Check if the docs directory exists and has files
    const fs = require('fs');
    const mdFiles = [];
    try {
      const files = fs.readdirSync(docConfig[0].path);
      for (const file of files) {
        if (file.endsWith('.md')) {
          mdFiles.push(file);
        }
      }
      logger.info(
        `Found ${mdFiles.length} markdown files in docs directory: ${mdFiles.join(', ')}`
      );
    } catch (err) {
      logger.error(`Error reading docs directory: ${err}`);
    }

    // Test query 1: CLI character export with lower threshold
    const query1 = 'How do I export character files using CLI?';
    logger.info(`Testing query: "${query1}"`);
    const results1 = await queryRAG(query1, docConfig, 5, 0.4); // Lower threshold
    logger.info('Results for character export query:');
    logger.info(results1);

    // // Test query 2: General query with lower threshold
    // const query2 = 'What is ElizaOS?';
    // logger.info(`Testing query: "${query2}"`);
    // const results2 = await queryRAG(query2, docConfig, 5, 0.4); // Lower threshold
    // logger.info('Results for general query:');
    // logger.info(results2);

    logger.info('RAG testing completed successfully');
  } catch (error) {
    logger.error('Error testing RAG:', error);
  }
}

// Run the test
testRAG();

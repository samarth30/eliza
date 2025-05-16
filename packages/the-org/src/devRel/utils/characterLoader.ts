import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadDocumentation, loadSourceCode } from './fileUtils';
import { loadApiDocumentation, loadCliDocumentation } from './fileUtils';
import { logger } from '@elizaos/core';
import { OFFICIAL_DOCS } from '../config/documentationConfig';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Loads the avatar image in base64 format
 *
 * @returns Base64 encoded avatar string
 */
export function loadAvatar(): string {
  const imagePath = path.resolve(path.join(__dirname, '../assets/portrait.jpg'));

  // Read and convert to Base64
  return fs.existsSync(imagePath)
    ? `data:image/jpeg;base64,${fs.readFileSync(imagePath).toString('base64')}`
    : '';
}

/**
 * Loads knowledge base data from configured sources
 *
 * @returns Array of knowledge base content
 */
export function loadKnowledgeBase(): string[] {
  const knowledge: string[] = [];

  // Add documentation URLs to knowledge base as high-priority items
  knowledge.push(
    `Official Documentation: The ElizaOS documentation is available at ${OFFICIAL_DOCS.main}`
  );
  knowledge.push(
    `API Documentation: API reference documentation can be found at ${OFFICIAL_DOCS.api}`
  );
  knowledge.push(
    `CLI Documentation: Command-line interface documentation is at ${OFFICIAL_DOCS.cli}`
  );
  knowledge.push(`Source Code: ElizaOS source code is available at ${OFFICIAL_DOCS.github}`);

  // Load additional documentation if configured
  if (process.env.DEVREL_IMPORT_KNOWLEDGE) {
    // Load documentation
    let docsPath = path.resolve(path.join(__dirname, '../../../../docs/docs'));
    if (!fs.existsSync(docsPath)) {
      docsPath = path.resolve(path.join(__dirname, '../../../docs/docs'));
    }

    // Try to find docs in multiple potential locations
    if (fs.existsSync(docsPath)) {
      logger.debug('Loading documentation...');
      const docKnowledge = loadDocumentation(docsPath);
      knowledge.push(...docKnowledge);
      logger.debug(`Loaded ${docKnowledge.length} documentation files into knowledge base`);
    } else {
      logger.warn('Documentation directory not found:', docsPath);
    }

    // Load source code
    let packagesPath = path.resolve(path.join(__dirname, '../../../..'));
    // if it doesnt exist, try "../../"
    if (!fs.existsSync(packagesPath)) {
      packagesPath = path.resolve(path.join(__dirname, '../../..'));
    }
    if (fs.existsSync(packagesPath)) {
      logger.debug('Loading source code...');
      const sourceKnowledge = loadSourceCode(packagesPath);
      knowledge.push(...sourceKnowledge);
      logger.debug(`Loaded ${sourceKnowledge.length} source files into knowledge base`);
    } else {
      logger.warn('Packages directory not found:', packagesPath);
    }

    // Load API documentation
    const apiDocsPath = path.resolve(path.join(__dirname, '../../../../docs/api'));
    if (fs.existsSync(apiDocsPath)) {
      logger.debug('Loading API documentation...');
      const apiKnowledge = loadApiDocumentation(apiDocsPath);
      knowledge.push(...apiKnowledge);
      logger.debug(`Loaded ${apiKnowledge.length} API documentation files into knowledge base`);
    } else {
      logger.warn('API documentation directory not found:', apiDocsPath);
    }

    // Load CLI documentation
    const cliPath = path.resolve(path.join(__dirname, '../../../../packages/cli'));
    if (fs.existsSync(cliPath)) {
      logger.debug('Loading CLI documentation...');
      const cliKnowledge = loadCliDocumentation(cliPath);
      knowledge.push(...cliKnowledge);
      logger.debug(`Loaded ${cliKnowledge.length} CLI documentation files into knowledge base`);
    } else {
      logger.warn('CLI directory not found:', cliPath);
    }
  }

  return knowledge;
}

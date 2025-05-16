import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DocumentationConfig } from '../knowledge/knowledgeManager';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Official documentation URLs
export const OFFICIAL_DOCS = {
  main: 'https://www.elizaos.com/docs',
  api: 'https://www.elizaos.com/docs/api',
  cli: 'https://www.elizaos.com/docs/cli',
  github: 'https://github.com/elizaos/eliza',
};

/**
 * Get official documentation URL by type
 *
 * @param type - The type of documentation URL to get
 * @returns The official documentation URL
 */
export function getOfficialDocUrl(type: 'main' | 'api' | 'cli' | 'github' | string): string {
  if (type in OFFICIAL_DOCS) {
    return OFFICIAL_DOCS[type as keyof typeof OFFICIAL_DOCS];
  }
  return OFFICIAL_DOCS.main; // Default to main docs
}

/**
 * Add documentation URLs to runtime responses
 *
 * @param message - The message to enhance
 * @returns Enhanced message with documentation URLs
 */
export function enhanceWithDocUrls(message: any): any {
  // Skip if not a text message
  if (!message || !message.text || typeof message.text !== 'string') {
    return message;
  }

  // Check if the message contains URL-like text that isn't an official URL
  const urlPattern = /https?:\/\/(?!www\.elizaos\.com)[^\s]+elizaos[^\s]+/gi;
  const urlMatches = message.text.match(urlPattern);

  if (urlMatches && urlMatches.length > 0) {
    // Replace with official URLs or add a correction
    message.text += `\n\nNote: The official ElizaOS documentation is available at ${OFFICIAL_DOCS.main}`;
  }

  return message;
}

/**
 * Get default documentation configuration
 *
 * @returns Array of default DocumentationConfig objects
 */
export function getDefaultDocConfig(): DocumentationConfig[] {
  // Try to find docs in multiple potential locations
  const docsPath = path.resolve(path.join(__dirname, '../../../../docs/docs'));
  const apiDocsPath = path.resolve(path.join(__dirname, '../../../../docs/api'));
  const cliPath = path.resolve(path.join(__dirname, '../../../../packages/cli'));
  const packagesPath = path.resolve(path.join(__dirname, '../../../..'));

  return [
    {
      path: docsPath,
      type: 'markdown',
      name: 'General Documentation',
      description: 'Official ElizaOS documentation',
    },
    {
      path: apiDocsPath,
      type: 'api',
      name: 'API Documentation',
      description: 'ElizaOS API documentation',
    },
    {
      path: cliPath,
      type: 'cli',
      name: 'CLI Documentation',
      description: 'ElizaOS CLI documentation',
    },
    {
      path: packagesPath,
      type: 'typescript',
      name: 'Source Code',
      description: 'ElizaOS source code',
    },
  ];
}

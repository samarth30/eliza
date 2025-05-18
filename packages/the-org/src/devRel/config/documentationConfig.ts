import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DocumentationConfig } from '../knowledge/knowledgeManager';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Official documentation URLs
export const OFFICIAL_DOCS = {
  main: 'https://eliza.how/docs',
  api: 'https://eliza.how/api',
  cli: 'https://eliza.how/docs/cli/overview',
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
 * Add documentation URLs to runtime responses and improve formatting
 *
 * @param message - The message to enhance
 * @returns Enhanced message with documentation URLs and improved formatting
 */
export function enhanceWithDocUrls(message: any): any {
  // Skip if not a text message
  if (!message || !message.text || typeof message.text !== 'string') {
    return message;
  }

  // Check if the message contains URL-like text that isn't an official URL
  const urlPattern = /https?:\/\/(?!eliza\.how)[^\s]+eliza[^\s]+/gi;
  const urlMatches = message.text.match(urlPattern);

  if (urlMatches && urlMatches.length > 0) {
    // Replace with official URLs or add a correction
    message.text += `\n\nNote: The official ElizaOS documentation is available at ${OFFICIAL_DOCS.main}`;
  }

  // Improve formatting of the message text
  message.text = improveTextFormatting(message.text);

  return message;
}

/**
 * Improve text formatting for better readability
 *
 * @param text - The text to format
 * @returns Formatted text with proper spacing and structure
 */
function improveTextFormatting(text: string): string {
  if (!text) return text;

  // Format numbered lists (1. Item) with proper spacing
  let formattedText = text.replace(/(^\d+\.)\s+(.+)/gm, '$1 $2\n');

  // Format numbered lists (1) Item) with proper spacing
  formattedText = formattedText.replace(/(^\d+\))\s+(.+)/gm, '$1 $2\n');

  // Format bullet points with proper spacing
  formattedText = formattedText.replace(/(^[\*\-])\s+(.+)/gm, '$1 $2\n');

  // Ensure code blocks have proper spacing
  formattedText = formattedText.replace(/```([^`]+)```/g, '\n```$1```\n');

  // Ensure command examples have proper spacing
  formattedText = formattedText.replace(/(`[^`\n]+`)/g, '$1\n');

  // Ensure steps are properly formatted
  formattedText = formattedText.replace(/(Step \d+:)\s+([^\n]+)/gi, '$1 $2\n');

  // Ensure headers have proper spacing
  formattedText = formattedText.replace(/(#+\s+.+)\n([^\n])/g, '$1\n\n$2');

  // Ensure paragraphs have proper spacing
  formattedText = formattedText.replace(/([^\n])\n([^\n])/g, '$1\n\n$2');

  // Fix any excessive newlines (more than 2)
  formattedText = formattedText.replace(/\n{3,}/g, '\n\n');

  return formattedText;
}

/**
 * Get default documentation configuration
 *
 * @returns Array of default DocumentationConfig objects
 */
export function getDefaultDocConfig(): DocumentationConfig[] {
  // Use __dirname to get a reliable path to the docs directory
  const docsPath = path.resolve(path.join(__dirname, '../../../packages/docs/docs'));
  const packagesPath = path.resolve(path.join(__dirname, '../../../packages'));

  return [
    {
      path: docsPath,
      type: 'markdown',
      name: 'General Documentation',
      description: 'Official ElizaOS documentation',
    },
    // {
    //   path: packagesPath,
    //   type: 'typescript',
    //   name: 'Source Code',
    //   description: 'ElizaOS source code',
    // },
  ];
}

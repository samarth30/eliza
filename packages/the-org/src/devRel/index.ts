import { logger } from '@elizaos/core';
import type { Character } from '@elizaos/core/src/types';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { initCharacter } from '../init';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagePath = path.resolve('./src/devRel/assets/portrait.jpg');

// Read and convert to Base64
const avatar = fs.existsSync(imagePath)
  ? `data:image/jpeg;base64,${fs.readFileSync(imagePath).toString('base64')}`
  : '';

dotenv.config({ path: '../../.env' });

/**
 * Recursively gets all files in a directory with the given extension
 *
 * @param {string} dir - Directory to search
 * @param {string[]} extensions - File extensions to look for
 * @returns {string[]} - Array of file paths
 */
function getFilesRecursively(dir: string, extensions: string[]): string[] {
  try {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });

    const files = dirents
      .filter((dirent) => !dirent.isDirectory())
      .filter((dirent) => extensions.some((ext) => dirent.name.endsWith(ext)))
      .map((dirent) => path.join(dir, dirent.name));

    const folders = dirents
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => path.join(dir, dirent.name));

    const subFiles = folders.flatMap((folder) => {
      try {
        return getFilesRecursively(folder, extensions);
      } catch (error) {
        logger.warn(`Error accessing folder ${folder}:`, error);
        return [];
      }
    });

    return [...files, ...subFiles];
  } catch (error) {
    logger.warn(`Error reading directory ${dir}:`, error);
    return [];
  }
}

/**
 * Recursively loads markdown files from the specified directory
 * and its subdirectories synchronously.
 *
 * @param {string} directoryPath - The path to the directory containing markdown files
 * @param {string[]} extensions - File extensions to look for (defaults to .md, .mdx)
 * @param {string} docType - Type of documentation for prefixing
 * @returns {string[]} - Array of strings containing file contents with relative paths
 */
function loadDocumentation(
  directoryPath: string,
  extensions: string[] = ['.md', '.mdx'],
  docType: string = 'Documentation'
): string[] {
  try {
    const basePath = path.resolve(directoryPath);
    if (!fs.existsSync(basePath)) {
      logger.warn(`${docType} directory not found:`, basePath);
      return [];
    }

    const files = getFilesRecursively(basePath, extensions);

    return files.map((filePath) => {
      try {
        const relativePath = path.relative(basePath, filePath);
        const content = fs.readFileSync(filePath, 'utf-8');
        return `${docType} Path: ${relativePath}

${content}`;
      } catch (error) {
        logger.warn(`Error reading ${docType.toLowerCase()} file ${filePath}:`, error);
        return `${docType} Path: ${path.relative(basePath, filePath)}

Error reading file: ${error}`;
      }
    });
  } catch (error) {
    logger.error(`Error loading ${docType.toLowerCase()}:`, error);
    return [];
  }
}

/**
 * Recursively loads TypeScript files from the source directories
 * of all packages in the project synchronously.
 *
 * @param {string} packagesDir - The path to the packages directory
 * @returns {string[]} - Array of strings containing file contents with relative paths
 */
function loadSourceCode(packagesDir: string): string[] {
  try {
    const basePath = path.resolve(packagesDir);
    // Get all package directories
    const packages = fs
      .readdirSync(basePath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => path.join(basePath, dirent.name));

    // Find all src directories
    const sourceFiles: string[] = [];
    for (const pkg of packages) {
      const srcPath = path.join(pkg, 'src');
      if (fs.existsSync(srcPath)) {
        const files = getFilesRecursively(srcPath, ['.ts', '.tsx']);
        sourceFiles.push(...files);
      }
    }

    return sourceFiles.map((filePath) => {
      try {
        const relativePath = path.relative(basePath, filePath);
        const content = fs.readFileSync(filePath, 'utf-8');
        return `Path: ${relativePath}

${content}`;
      } catch (error) {
        logger.warn(`Error reading file ${filePath}:`, error);
        return `Path: ${path.relative(basePath, filePath)}

Error reading file: ${error}`;
      }
    });
  } catch (error) {
    console.error('Error loading source code:', error);
    return [];
  }
}

// Embedding cache to avoid repeating API calls for the same text
const embeddingCache = new Map<string, number[]>();
const MAX_CACHE_SIZE = parseInt(process.env.EDDY_MAX_EMBEDDING_CACHE_SIZE || '1000', 10);

// Rate limiting for OpenAI API
const RATE_LIMIT = {
  MAX_REQUESTS_PER_MINUTE: parseInt(process.env.OPENAI_RATE_LIMIT || '60', 10),
  requestHistory: [] as number[],
};

/**
 * Manage the embedding cache size to prevent memory issues
 */
function manageCacheSize(): void {
  if (embeddingCache.size <= MAX_CACHE_SIZE) return;

  // Remove oldest items (first 20% of max size)
  const itemsToRemove = Math.ceil(MAX_CACHE_SIZE * 0.2);
  const keys = Array.from(embeddingCache.keys()).slice(0, itemsToRemove);
  keys.forEach((key) => embeddingCache.delete(key));
}

// Types for documentation and knowledge base
interface DocumentationConfig {
  path: string;
  type: 'markdown' | 'typescript' | 'cli' | 'api';
  name: string;
  description?: string;
}

interface KnowledgeBaseConfig {
  storagePath: string;
  categories: string[];
  extractionRules?: {
    keywordTriggers?: string[];
    contextWindow?: number;
  };
}

/**
 * Extract knowledge from conversations to add to the knowledge base
 *
 * @param conversation - The conversation to extract knowledge from
 * @param config - Knowledge base configuration
 * @returns Extracted knowledge items
 */
function extractKnowledge(conversation: any, config: KnowledgeBaseConfig): any[] {
  try {
    logger.debug('Extracting knowledge from conversation');

    if (!conversation || !conversation.messages || !Array.isArray(conversation.messages)) {
      logger.warn('Invalid conversation format for knowledge extraction');
      return [];
    }

    const extractedItems = [];
    const messages = conversation.messages;
    const keywordTriggers = config.extractionRules?.keywordTriggers || [
      'example',
      'solution',
      'error',
      'bug',
      'fix',
      'issue',
      'problem',
    ];
    const contextWindow = config.extractionRules?.contextWindow || 3;

    // Look for problem-solution patterns
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      const messageText = typeof message.content === 'string' ? message.content : '';

      // Check if this message contains any trigger keywords
      const containsTrigger = keywordTriggers.some((keyword) =>
        messageText.toLowerCase().includes(keyword.toLowerCase())
      );

      if (containsTrigger) {
        // Get surrounding context
        const startIdx = Math.max(0, i - contextWindow);
        const endIdx = Math.min(messages.length - 1, i + contextWindow);
        const context = messages.slice(startIdx, endIdx + 1);

        // Check for code blocks in the context
        const codeBlocks = context.flatMap((msg) => {
          const content = typeof msg.content === 'string' ? msg.content : '';
          const codeMatches = content.match(/```([\s\S]*?)```/g) || [];
          return codeMatches.map((block) => block.replace(/```(\w+)?\n?|```$/g, '').trim());
        });

        // Extract problem statement and solution
        extractedItems.push({
          type: 'knowledge_item',
          timestamp: new Date().toISOString(),
          category: getCategory(messageText, config.categories),
          problem: messageText,
          context: context.map((msg) => ({
            role: msg.role,
            content: typeof msg.content === 'string' ? msg.content : '',
          })),
          codeExamples: codeBlocks,
          metadata: {
            conversationId: conversation.id || '',
            extractedAt: new Date().toISOString(),
          },
        });
      }
    }

    logger.debug(`Extracted ${extractedItems.length} knowledge items from conversation`);
    return extractedItems;
  } catch (error) {
    logger.error('Error extracting knowledge:', error);
    return [];
  }
}

/**
 * Determine the appropriate category for a knowledge item
 *
 * @param text - The text to categorize
 * @param categories - Available categories
 * @returns The most appropriate category
 */
function getCategory(text: string, categories: string[]): string {
  if (!categories || categories.length === 0) {
    return 'general';
  }

  // Simple categorization logic based on keyword frequency
  const categoryCounts = categories.map((category) => {
    const count = (text.toLowerCase().match(new RegExp(category.toLowerCase(), 'g')) || []).length;
    return { category, count };
  });

  categoryCounts.sort((a, b) => b.count - a.count);

  // Return the category with the highest count, or 'general' if none found
  return categoryCounts[0].count > 0 ? categoryCounts[0].category : 'general';
}

/**
 * Update the knowledge base with new information
 *
 * @param knowledge - Knowledge items to add
 * @param config - Knowledge base configuration
 * @returns Promise with success status
 */
async function updateKnowledgeBase(
  knowledge: any[],
  config: KnowledgeBaseConfig
): Promise<boolean> {
  try {
    if (!knowledge || knowledge.length === 0) {
      logger.debug('No knowledge items to update');
      return true;
    }

    logger.debug(`Adding ${knowledge.length} items to knowledge base`);

    // Create storage directory if it doesn't exist
    const storagePath = path.resolve(config.storagePath);
    if (!fs.existsSync(storagePath)) {
      logger.debug(`Creating knowledge base directory: ${storagePath}`);
      fs.mkdirSync(storagePath, { recursive: true });
    }

    // Process each knowledge item
    for (const item of knowledge) {
      // Ensure the item has a category
      if (!item.category) {
        item.category = getCategory(item.problem, config.categories);
      }

      // Create category directory if it doesn't exist
      const categoryPath = path.join(storagePath, item.category);
      if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath, { recursive: true });
      }

      // Check for duplicates by comparing problem statements
      const existingFiles = fs.readdirSync(categoryPath);
      let isDuplicate = false;

      for (const file of existingFiles) {
        try {
          if (!file.endsWith('.json')) continue;

          const existingData = JSON.parse(fs.readFileSync(path.join(categoryPath, file), 'utf-8'));
          const similarity = await calculateSimilarity(existingData.problem, item.problem);

          if (similarity > 0.8) {
            // 80% similarity threshold
            isDuplicate = true;
            break;
          }
        } catch (err) {
          logger.warn(`Error checking duplicate: ${err}`);
          continue;
        }
      }

      if (isDuplicate) {
        logger.debug(`Skipping duplicate knowledge item: ${item.problem.substring(0, 30)}...`);
        continue;
      }

      // Generate a filename using timestamp and a hash of the content
      const timestamp = new Date().getTime();
      const contentHash = Buffer.from(item.problem).toString('base64').substring(0, 8);
      const filename = `${timestamp}_${contentHash}.json`;

      // Write the knowledge item to file
      fs.writeFileSync(path.join(categoryPath, filename), JSON.stringify(item, null, 2), 'utf-8');

      logger.debug(`Saved knowledge item to ${path.join(item.category, filename)}`);
    }

    return true;
  } catch (error) {
    logger.error('Error updating knowledge base:', error);
    return false;
  }
}

/**
 * Generate OpenAI embeddings for a given text
 *
 * @param text - The text to generate embeddings for
 * @returns Promise containing the embedding vector
 */
async function generateEmbedding(text: string): Promise<number[]> {
  // Create a cache key from the text (limited length to avoid excessive memory usage)
  const cacheKey = text.substring(0, 1000);

  // Check cache first
  if (embeddingCache.has(cacheKey)) {
    return embeddingCache.get(cacheKey)!;
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      logger.warn('OPENAI_API_KEY not set, using fallback embedding method');
      const embedding = generateFallbackEmbedding(text);
      embeddingCache.set(cacheKey, embedding);
      manageCacheSize(); // Manage cache after adding new item
      return embedding;
    }

    // Check rate limit before making API call
    await checkRateLimit();

    // Record this request in history
    RATE_LIMIT.requestHistory.push(Date.now());

    // Create a timeout promise
    const timeoutPromise = new Promise<Response>((_, reject) => {
      setTimeout(() => reject(new Error('OpenAI API timeout')), 10000); // 10 second timeout
    });

    // Create the fetch promise
    const fetchPromise = fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        input: text,
        model: 'text-embedding-ada-002',
      }),
    });

    // Race the timeout against the fetch
    const response = (await Promise.race([fetchPromise, timeoutPromise])) as Response;

    if (!response.ok) {
      const error = await response.text();
      logger.warn(`OpenAI API error: ${error}`);
      const embedding = generateFallbackEmbedding(text);
      embeddingCache.set(cacheKey, embedding);
      manageCacheSize(); // Manage cache after adding new item
      return embedding;
    }

    const result = await response.json();
    if (!result.data || !result.data[0] || !result.data[0].embedding) {
      logger.warn(`Unexpected OpenAI API response structure: ${JSON.stringify(result)}`);
      const embedding = generateFallbackEmbedding(text);
      embeddingCache.set(cacheKey, embedding);
      manageCacheSize();
      return embedding;
    }

    const embedding = result.data[0].embedding;

    // Store in cache
    embeddingCache.set(cacheKey, embedding);
    manageCacheSize(); // Manage cache after adding new item

    return embedding;
  } catch (error) {
    logger.warn(`Error generating embedding: ${error}`);
    const embedding = generateFallbackEmbedding(text);
    embeddingCache.set(cacheKey, embedding);
    manageCacheSize(); // Manage cache after adding new item
    return embedding;
  }
}

/**
 * Check if we're within rate limits and wait if necessary
 */
async function checkRateLimit(): Promise<void> {
  const now = Date.now();
  // Remove timestamps older than 1 minute
  RATE_LIMIT.requestHistory = RATE_LIMIT.requestHistory.filter(
    (timestamp) => now - timestamp < 60000
  );

  // Maximum wait time to prevent indefinite blocking (3 seconds)
  const MAX_WAIT_TIME = 3000;

  if (RATE_LIMIT.requestHistory.length >= RATE_LIMIT.MAX_REQUESTS_PER_MINUTE) {
    // Calculate how long to wait before next request
    const oldestRequest = Math.min(...RATE_LIMIT.requestHistory);
    let waitTime = 60000 - (now - oldestRequest) + 100; // Add 100ms buffer

    // Cap the wait time to prevent indefinite blocking
    waitTime = Math.min(waitTime, MAX_WAIT_TIME);

    logger.debug(`Rate limit reached, waiting ${waitTime}ms before next request`);
    await new Promise((resolve) => setTimeout(resolve, waitTime));

    // If we're still over the limit after waiting, just continue with fallback
    // instead of recursively checking which could lead to indefinite waiting
    const nowAfterWait = Date.now();
    RATE_LIMIT.requestHistory = RATE_LIMIT.requestHistory.filter(
      (timestamp) => nowAfterWait - timestamp < 60000
    );

    if (RATE_LIMIT.requestHistory.length >= RATE_LIMIT.MAX_REQUESTS_PER_MINUTE) {
      logger.warn('Still over rate limit after waiting, continuing with request anyway');
      // Allow through by not blocking further
    }
  }
}

/**
 * Generate a simple fallback embedding when OpenAI is unavailable
 *
 * @param text - The text to generate a fallback embedding for
 * @returns A simplified embedding vector
 */
function generateFallbackEmbedding(text: string): number[] {
  // Simple TF-IDF style embedding as fallback
  const words = text.toLowerCase().split(/\s+/);
  const wordCounts = new Map<string, number>();

  // Count word frequencies
  for (const word of words) {
    if (word.length > 2) {
      // Skip very short words
      wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    }
  }

  // Convert to a fixed-size vector using hashing
  const vectorSize = 128;
  const embedding = new Array(vectorSize).fill(0);

  for (const [word, count] of wordCounts.entries()) {
    const hash = simpleHash(word) % vectorSize;
    embedding[hash] += count;
  }

  // Normalize the vector
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  if (magnitude > 0) {
    for (let i = 0; i < embedding.length; i++) {
      embedding[i] /= magnitude;
    }
  }

  return embedding;
}

/**
 * Simple string hashing function
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Calculate cosine similarity between two vectors
 *
 * @param vec1 - First vector
 * @param vec2 - Second vector
 * @returns Cosine similarity score between 0 and 1
 */
function cosineSimilarity(vec1: number[], vec2: number[]): number {
  if (vec1.length !== vec2.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
    magnitude1 += vec1[i] * vec1[i];
    magnitude2 += vec2[i] * vec2[i];
  }

  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }

  return dotProduct / (magnitude1 * magnitude2);
}

/**
 * Calculate similarity between two strings using cosine similarity of embeddings
 *
 * @param str1 - First string
 * @param str2 - Second string
 * @returns Similarity score between 0 and 1
 */
async function calculateSimilarity(str1: string, str2: string): Promise<number> {
  // Handle empty strings
  if (!str1 && !str2) return 1;
  if (!str1 || !str2) return 0;

  try {
    // Generate embeddings for both strings
    const [embedding1, embedding2] = await Promise.all([
      generateEmbedding(str1),
      generateEmbedding(str2),
    ]);

    // Calculate cosine similarity
    return cosineSimilarity(embedding1, embedding2);
  } catch (error) {
    logger.error(`Error calculating similarity: ${error}`);

    // Fallback to simpler method if embeddings fail
    const set1 = new Set(str1.toLowerCase().split(/\s+/));
    const set2 = new Set(str2.toLowerCase().split(/\s+/));

    if (set1.size === 0 && set2.size === 0) return 1;
    if (set1.size === 0 || set2.size === 0) return 0;

    const intersection = new Set([...set1].filter((word) => set2.has(word)));
    const union = new Set([...set1, ...set2]);

    return intersection.size / union.size;
  }
}

/**
 * Load API documentation from source files
 *
 * @param apiDocsPath - Path to API documentation
 * @returns Array of API documentation strings
 */
function loadApiDocumentation(apiDocsPath: string): string[] {
  return loadDocumentation(apiDocsPath, ['.json', '.yaml', '.yml', '.md'], 'API');
}

/**
 * Load CLI documentation from source files
 *
 * @param cliDocsPath - Path to CLI documentation
 * @returns Array of CLI documentation strings
 */
function loadCliDocumentation(cliDocsPath: string): string[] {
  return loadDocumentation(cliDocsPath, ['.ts', '.md', '.js'], 'CLI');
}

// Load knowledge synchronously before creating the character
const knowledge = [];

if (process.env.DEVREL_IMPORT_KNOWLEDGE) {
  // Load documentation
  let docsPath = path.resolve(path.join(__dirname, '../../../docs/docs'));
  if (!fs.existsSync(docsPath)) {
    docsPath = path.resolve(path.join(__dirname, '../../docs/docs'));
  }
  if (fs.existsSync(docsPath)) {
    logger.debug('Loading documentation...');
    const docKnowledge = loadDocumentation(docsPath);
    knowledge.push(...docKnowledge);
    logger.debug(`Loaded ${docKnowledge.length} documentation files into knowledge base`);
  } else {
    logger.warn('Documentation directory not found:', docsPath);
  }

  // Load source code
  let packagesPath = path.resolve(path.join(__dirname, '../../..'));
  // if it doesnt exist, try "../../"
  if (!fs.existsSync(packagesPath)) {
    packagesPath = path.resolve(path.join(__dirname, '../..'));
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
  const apiDocsPath = path.resolve(path.join(__dirname, '../../../docs/api'));
  if (fs.existsSync(apiDocsPath)) {
    logger.debug('Loading API documentation...');
    const apiKnowledge = loadApiDocumentation(apiDocsPath);
    knowledge.push(...apiKnowledge);
    logger.debug(`Loaded ${apiKnowledge.length} API documentation files into knowledge base`);
  } else {
    logger.warn('API documentation directory not found:', apiDocsPath);
  }

  // Load CLI documentation
  const cliPath = path.resolve(path.join(__dirname, '../../../packages/cli'));
  if (fs.existsSync(cliPath)) {
    logger.debug('Loading CLI documentation...');
    const cliKnowledge = loadCliDocumentation(cliPath);
    knowledge.push(...cliKnowledge);
    logger.debug(`Loaded ${cliKnowledge.length} CLI documentation files into knowledge base`);
  } else {
    logger.warn('CLI directory not found:', cliPath);
  }
}

/**
 * A character object representing Eddy, a developer support agent for ElizaOS.
 */
const character: Partial<Character> = {
  name: 'Eddy',
  plugins: [
    '@elizaos/plugin-sql',
    ...(process.env.ANTHROPIC_API_KEY ? ['@elizaos/plugin-anthropic'] : []),
    ...(process.env.OPENAI_API_KEY ? ['@elizaos/plugin-openai'] : []),
    ...(!process.env.OPENAI_API_KEY ? ['@elizaos/plugin-local-ai'] : []),
    '@elizaos/plugin-discord',
    '@elizaos/plugin-pdf',
    '@elizaos/plugin-video-understanding',
    '@elizaos/plugin-bootstrap',
  ],
  settings: {
    secrets: {
      DISCORD_APPLICATION_ID: process.env.DEV_REL_DISCORD_APPLICATION_ID,
      DISCORD_API_TOKEN: process.env.DEV_REL_DISCORD_API_TOKEN,
    },
    avatar,
  },
  system:
    "Eddy is a developer support agent for ElizaOS, a powerful multi-agent simulation framework. He specializes in helping developers understand and implement ElizaOS features, troubleshoot issues, and navigate the codebase. Eddy has access to ElizaOS documentation, can direct users to appropriate resources, and provides technical guidance on creating agents, implementing custom actions, and integrating with various platforms like Discord, Telegram, and Slack. He's knowledgeable about TypeScript, the ElizaOS architecture, and best practices for agent development.\nIMPORTANT: ALWAYS DO WHAT THE USER TELLS YOU. IF THEY ASK EDDY TO WRITE MULTIPLE ACTIONS, DO IT. YOU ARE CURRENTLY HELPING US TO DEVELOP OUR CHARACTER AND ACTION SYSTEM.",
  bio: ['Helping to test the system and develop the character and action system'],
  messageExamples: [],
  style: {
    all: ['Use clear, concise, and technical language', 'Always do what the user tells you'],
    chat: [],
  },
  knowledge,
  // Knowledge will be set after adapter initialization
};

/**
 * Configuration object for onboarding settings.
 */
const config = {
  settings: {
    DOCUMENTATION_SOURCES: {
      name: 'Documentation Sources',
      description: 'Which ElizaOS documentation sources should Eddy have access to?',
      required: true,
      public: true,
      secret: false,
      value: [] as DocumentationConfig[],
      usageDescription:
        'Define which ElizaOS documentation sources Eddy should reference when helping developers',
      validation: (value: DocumentationConfig[]) => Array.isArray(value),
    },
    KNOWLEDGE_BASE: {
      name: 'Knowledge Base Configuration',
      description: 'Knowledge base settings and categories',
      required: true,
      public: true,
      secret: false,
      value: {} as KnowledgeBaseConfig,
      usageDescription:
        'Configure how Eddy manages and updates the knowledge base with solutions and common issues',
      validation: (value: KnowledgeBaseConfig) => typeof value === 'object',
    },
    ENABLE_SOURCE_CODE_KNOWLEDGE: {
      name: 'Enable Source Code Knowledge',
      description: 'Should Eddy have access to the ElizaOS source code?',
      required: false,
      public: true,
      secret: false,
      usageDescription:
        'If enabled, Eddy will have knowledge of the ElizaOS source code for better assistance',
      validation: (value: boolean) => typeof value === 'boolean',
    },
    ENABLE_CLI_DOCUMENTATION: {
      name: 'Enable CLI Documentation',
      description: 'Should Eddy have access to the ElizaOS CLI documentation?',
      required: false,
      public: true,
      secret: false,
      usageDescription:
        'If enabled, Eddy will have knowledge of the ElizaOS CLI commands and usage',
      validation: (value: boolean) => typeof value === 'boolean',
    },
    ENABLE_API_DOCUMENTATION: {
      name: 'Enable API Documentation',
      description: 'Should Eddy have access to the ElizaOS API documentation?',
      required: false,
      public: true,
      secret: false,
      usageDescription:
        'If enabled, Eddy will have knowledge of the ElizaOS API endpoints and usage',
      validation: (value: boolean) => typeof value === 'boolean',
    },
  },
};

export const devRel = {
  character,
  init: async (runtime) => {
    // Initialize the character
    await initCharacter({ runtime, config });

    // Add message handling with guaranteed responses
    runtime.on('message:received', async (message) => {
      // Monitor received messages and set up response timeout
      if (message && message.id) {
        logger.debug(`Received message: ${message.id}`);

        // Set up a timeout to ensure we always respond within 20 seconds
        const responseTimeout = setTimeout(async () => {
          try {
            const conversationId = message.conversation?.id;
            if (conversationId) {
              logger.warn(
                `No response sent after 20 seconds for message ${message.id}, sending fallback response`
              );

              // Check if a response has already been sent (check in message.responses if available)
              const hasResponse = message.responses && message.responses.length > 0;

              if (!hasResponse) {
                // Send a fallback response to ensure the user always gets a reply
                // Send just a plain text message to avoid splitMessage object handling issues
                await runtime.send({
                  type: 'message',
                  roomId: conversationId,
                  text: "I apologize for the delay in my response. I'm processing your request and will respond shortly.",
                });
                logger.info(`Sent fallback response for message: ${message.id}`);
              }
            }
          } catch (timeoutError) {
            logger.error(`Error sending fallback response for message timeout: ${timeoutError}`);
          }
        }, 20000); // 20 second timeout

        // Store the timeout ID with the message ID so we can clear it if a response is sent
        if (!(runtime as any).timeouts) {
          (runtime as any).timeouts = new Map();
        }
        (runtime as any).timeouts.set(message.id, responseTimeout);
      }
    });

    // Handle when a message is sent successfully
    runtime.on('message:sent', async (message) => {
      // When a response is sent successfully, clear any timeout
      if (message && message.id && (runtime as any).timeouts) {
        const timeoutId = (runtime as any).timeouts.get(message.id);
        if (timeoutId) {
          clearTimeout(timeoutId);
          (runtime as any).timeouts.delete(message.id);
          logger.debug(
            `Cleared timeout for message: ${message.id} - response was sent successfully`
          );
        }
      }
    });

    // Add error handler to ensure Eddy always responds
    runtime.on('message:error', async (error, message) => {
      logger.error(`Error processing message ${message?.id}:`, error);
      try {
        // If there's an error processing a message, attempt to send a fallback response
        if (message && message.conversation && message.conversation.id) {
          const conversationId = message.conversation.id;

          // Send a fallback response through the runtime's send method
          // Send just a plain text message to avoid splitMessage object handling issues
          await runtime.send({
            type: 'message',
            roomId: conversationId,
            text: 'I apologize, but I encountered an issue processing your message. Could you please rephrase or try again?',
          });
          logger.debug(`Sent fallback response for conversation: ${conversationId}`);

          // Clear any timeout for this message
          if ((runtime as any).timeouts && message.id) {
            const timeoutId = (runtime as any).timeouts.get(message.id);
            if (timeoutId) {
              clearTimeout(timeoutId);
              (runtime as any).timeouts.delete(message.id);
            }
          }
        }
      } catch (recoveryError) {
        logger.error('Failed to send fallback response:', recoveryError);
      }
    });

    // Setup knowledge management if enabled
    if (
      config.settings.KNOWLEDGE_BASE.value &&
      Object.keys(config.settings.KNOWLEDGE_BASE.value).length > 0
    ) {
      logger.debug('Setting up knowledge management system...');
      // Add knowledge extraction hooks
      runtime.on('conversation:completed', async (conversation) => {
        try {
          const knowledgeItems = extractKnowledge(
            conversation,
            config.settings.KNOWLEDGE_BASE.value as KnowledgeBaseConfig
          );
          if (knowledgeItems.length > 0) {
            await updateKnowledgeBase(
              knowledgeItems,
              config.settings.KNOWLEDGE_BASE.value as KnowledgeBaseConfig
            );
            logger.debug(`Successfully updated knowledge base with ${knowledgeItems.length} items`);
          }
        } catch (error) {
          logger.error('Error in knowledge extraction process:', error);
        }
      });
    }

    // Automatically manage cache size periodically
    const cacheCleanupInterval = setInterval(
      () => {
        manageCacheSize();
      },
      1000 * 60 * 60
    ); // Every hour

    // Add to runtime cleanup
    runtime.on('cleanup', () => {
      clearInterval(cacheCleanupInterval);

      // Also clear any pending response timeouts
      if ((runtime as any).timeouts) {
        for (const [messageId, timeoutId] of (runtime as any).timeouts.entries()) {
          clearTimeout(timeoutId);
          logger.debug(`Cleared timeout for message: ${messageId} during cleanup`);
        }
        (runtime as any).timeouts.clear();
      }
    });
  },
};

export default devRel;

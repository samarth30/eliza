import { logger } from '@elizaos/core';
import fs from 'node:fs';
import path from 'node:path';
import { calculateSimilarity } from '../embeddings/embeddingService';

// Types for documentation and knowledge base
export interface DocumentationConfig {
  path: string;
  type: 'markdown' | 'typescript' | 'cli' | 'api';
  name: string;
  description?: string;
}

export interface KnowledgeBaseConfig {
  storagePath: string;
  categories: string[];
  extractionRules?: {
    keywordTriggers?: string[];
    contextWindow?: number;
  };
  keywordTriggers?: string[];
  contextWindow?: number;
}

/**
 * Determine the appropriate category for a knowledge item
 *
 * @param text - The text to categorize
 * @param categories - Available categories
 * @returns The most appropriate category
 */
export function getCategory(text: string, categories: string[]): string {
  if (!categories || categories.length === 0) {
    return 'general';
  }

  if (categories.length === 1) {
    return categories[0];
  }

  // Define keywords for each category
  const categoryKeywords: Record<string, string[]> = {};

  // Default keywords for common categories
  categories.forEach((category) => {
    switch (category.toLowerCase()) {
      case 'error':
      case 'errors':
      case 'issue':
      case 'issues':
        categoryKeywords[category] = ['error', 'exception', 'fail', 'issue', 'bug', 'problem'];
        break;
      case 'guide':
      case 'guides':
      case 'tutorial':
      case 'tutorials':
        categoryKeywords[category] = ['how to', 'guide', 'tutorial', 'walkthrough', 'step by step'];
        break;
      default:
        categoryKeywords[category] = [category];
    }
  });

  // Count keyword matches for each category
  const matchCounts = categories.map((category) => {
    const keywords = categoryKeywords[category] || [category];
    const count = keywords.reduce((total, keyword) => {
      return total + (text.toLowerCase().includes(keyword.toLowerCase()) ? 1 : 0);
    }, 0);
    return { category, count };
  });

  // Sort by match count in descending order
  matchCounts.sort((a, b) => b.count - a.count);

  // Return the category with the most matches, or first category if no matches
  return matchCounts[0].count > 0 ? matchCounts[0].category : categories[0];
}

/**
 * Extract knowledge from conversations to add to the knowledge base
 *
 * @param conversation - The conversation to extract knowledge from
 * @param config - Knowledge base configuration
 * @returns Extracted knowledge items
 */
export function extractKnowledge(conversation: any, config: KnowledgeBaseConfig): any[] {
  if (!conversation || !conversation.messages || !Array.isArray(conversation.messages)) {
    logger.warn('Invalid conversation format for knowledge extraction');
    return [];
  }

  const contextWindow = config.contextWindow || config.extractionRules?.contextWindow || 3;
  const keywordTriggers = config.keywordTriggers ||
    config.extractionRules?.keywordTriggers || [
      'solution',
      'fixed',
      'resolved',
      'answer',
      'workaround',
      'problem',
      'issue',
      'error',
    ];

  // Check we have enough messages
  if (conversation.messages.length < 2) {
    return [];
  }

  const messages = conversation.messages.filter((msg: any) => msg && typeof msg.text === 'string');

  const knowledgeItems: any[] = [];

  // Look for patterns of issues and solutions
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];

    // Skip non-assistant messages as solution candidates
    if (msg.sender.role !== 'assistant') {
      continue;
    }

    // Check if message contains keywords (possible solution message)
    const containsTrigger = keywordTriggers.some((keyword) =>
      msg.text.toLowerCase().includes(keyword.toLowerCase())
    );

    if (containsTrigger) {
      // Potential solution found - build context from previous messages
      const startIdx = Math.max(0, i - contextWindow);
      const contextMessages = messages.slice(startIdx, i);

      // Only extract if there's at least one user message in the context
      const hasUserMessage = contextMessages.some((m: any) => m.sender.role === 'user');

      if (hasUserMessage) {
        // Extract the problem from user messages
        const problemMessages = contextMessages
          .filter((m: any) => m.sender.role === 'user')
          .map((m: any) => m.text)
          .join('\n\n');

        // Extract links to documentation if present
        const docLinks = extractDocLinks(msg.text);

        // Create knowledge item
        const item = {
          id: `knowledge_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
          problem: problemMessages,
          solution: msg.text,
          category: getCategory(problemMessages + '\n' + msg.text, config.categories),
          docLinks: docLinks,
          timestamp: new Date().toISOString(),
          conversation: conversation.id,
          confidence: 0.8, // Base confidence score
        };

        knowledgeItems.push(item);
      }
    }
  }

  return knowledgeItems;
}

/**
 * Extract documentation links from a text
 *
 * @param text - Text that might contain documentation links
 * @returns Array of documentation links
 */
export function extractDocLinks(text: string): string[] {
  if (!text) return [];

  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  const matches = text.match(urlRegex) || [];

  // Only include documentation-like links
  return matches.filter((url) => {
    const lowercase = url.toLowerCase();
    return (
      lowercase.includes('docs') ||
      lowercase.includes('documentation') ||
      lowercase.includes('wiki') ||
      lowercase.includes('readme') ||
      lowercase.includes('guide')
    );
  });
}

/**
 * Update the knowledge base with new information
 *
 * @param knowledge - Knowledge items to add
 * @param config - Knowledge base configuration
 * @returns Promise with success status
 */
export async function updateKnowledgeBase(
  knowledge: any[],
  config: KnowledgeBaseConfig
): Promise<boolean> {
  if (!knowledge || knowledge.length === 0) {
    return true; // Nothing to update
  }

  const { storagePath, categories } = config;

  if (!storagePath) {
    logger.error('Knowledge base storage path not specified');
    return false;
  }

  try {
    // Ensure the storage directory exists
    if (!fs.existsSync(storagePath)) {
      fs.mkdirSync(storagePath, { recursive: true });
    }

    // Read existing knowledge base if it exists
    const knowledgeFilePath = path.join(storagePath, 'knowledge.json');
    let existingKnowledge: any[] = [];

    if (fs.existsSync(knowledgeFilePath)) {
      try {
        const fileContent = fs.readFileSync(knowledgeFilePath, 'utf-8');
        existingKnowledge = JSON.parse(fileContent);
        if (!Array.isArray(existingKnowledge)) {
          existingKnowledge = [];
        }
      } catch (readError) {
        logger.error('Error reading knowledge base file:', readError);
        existingKnowledge = [];
      }
    }

    // Add new knowledge items, avoiding duplicates
    const updatedKnowledge = [...existingKnowledge];
    let addedCount = 0;

    for (const item of knowledge) {
      // Calculate similarity against existing items to avoid duplicates
      const isDuplicate = await isKnowledgeDuplicate(item, existingKnowledge);

      if (!isDuplicate) {
        // Ensure the item has the current categories structure
        if (categories && categories.length > 0 && !item.category) {
          item.category = getCategory(item.problem + '\n' + item.solution, categories);
        }

        updatedKnowledge.push(item);
        addedCount++;
      }
    }

    if (addedCount > 0) {
      // Write updated knowledge base back to file
      fs.writeFileSync(knowledgeFilePath, JSON.stringify(updatedKnowledge, null, 2), 'utf-8');
      logger.debug(`Added ${addedCount} new items to knowledge base`);

      // Also write categorized files for easier access
      const categorized: Record<string, any[]> = {};

      // Group by category
      updatedKnowledge.forEach((item) => {
        const category = item.category || 'general';
        if (!categorized[category]) {
          categorized[category] = [];
        }
        categorized[category].push(item);
      });

      // Write category files
      for (const category in categorized) {
        const categoryPath = path.join(storagePath, `${category}.json`);
        fs.writeFileSync(categoryPath, JSON.stringify(categorized[category], null, 2), 'utf-8');
      }
    }

    return true;
  } catch (error) {
    logger.error('Error updating knowledge base:', error);
    return false;
  }
}

/**
 * Checks if a knowledge item is a duplicate of an existing item
 *
 * @param newItem - The new knowledge item
 * @param existingItems - Existing knowledge items
 * @returns Whether the item is a duplicate
 */
async function isKnowledgeDuplicate(newItem: any, existingItems: any[]): Promise<boolean> {
  const SIMILARITY_THRESHOLD = 0.85; // Higher value = stricter duplicate detection

  for (const existingItem of existingItems) {
    try {
      // Compare the problem statements
      const problemSimilarity = await calculateSimilarity(newItem.problem, existingItem.problem);

      // Compare the solution texts
      const solutionSimilarity = await calculateSimilarity(newItem.solution, existingItem.solution);

      // If both similarities are above the threshold, consider it a duplicate
      if (problemSimilarity > SIMILARITY_THRESHOLD && solutionSimilarity > SIMILARITY_THRESHOLD) {
        return true;
      }
    } catch (error) {
      logger.error('Error comparing knowledge items:', error);
      // Skip comparison on error
    }
  }

  return false;
}

import { logger } from '@elizaos/core';

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
export function manageCacheSize(): void {
  if (embeddingCache.size > MAX_CACHE_SIZE) {
    logger.debug(`Cleaning embedding cache (size: ${embeddingCache.size})`);
    // Delete oldest 20% of entries when cache gets too large
    const keysToDelete = [...embeddingCache.keys()].slice(0, Math.floor(MAX_CACHE_SIZE * 0.2));
    keysToDelete.forEach((key) => embeddingCache.delete(key));
    logger.debug(`Cleaned embedding cache (new size: ${embeddingCache.size})`);
  }
}

/**
 * Generate OpenAI embeddings for a given text
 *
 * @param text - The text to generate embeddings for
 * @returns Promise containing the embedding vector
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  // Clean and normalize text
  const cleanText = text.replace(/\s+/g, ' ').trim();

  // Return from cache if available
  if (embeddingCache.has(cleanText)) {
    return embeddingCache.get(cleanText)!;
  }

  try {
    // Check rate limit before making API call
    await checkRateLimit();

    // Prepare API request
    const url = 'https://api.openai.com/v1/embeddings';
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      logger.warn('OpenAI API key not found, using fallback embedding generation');
      const fallbackEmbedding = generateFallbackEmbedding(cleanText);
      embeddingCache.set(cleanText, fallbackEmbedding);
      return fallbackEmbedding;
    }

    // Make API request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        input: cleanText,
        model: 'text-embedding-ada-002',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      logger.warn(`OpenAI API error: ${error}, using fallback embedding`);
      const fallbackEmbedding = generateFallbackEmbedding(cleanText);
      embeddingCache.set(cleanText, fallbackEmbedding);
      return fallbackEmbedding;
    }

    const data = await response.json();
    const embedding = data.data[0].embedding;

    // Cache the result
    embeddingCache.set(cleanText, embedding);

    // Check cache size and clean if needed
    if (embeddingCache.size % 10 === 0) {
      manageCacheSize();
    }

    return embedding;
  } catch (error) {
    logger.error('Error generating embedding:', error);
    // Use a fallback approach for embedding generation
    const fallbackEmbedding = generateFallbackEmbedding(cleanText);
    embeddingCache.set(cleanText, fallbackEmbedding);
    return fallbackEmbedding;
  }
}

/**
 * Check if we're within rate limits and wait if necessary
 */
export async function checkRateLimit(): Promise<void> {
  const now = Date.now();
  const oneMinuteAgo = now - 60 * 1000;

  // Remove requests older than 1 minute
  RATE_LIMIT.requestHistory = RATE_LIMIT.requestHistory.filter(
    (timestamp) => timestamp > oneMinuteAgo
  );

  // Check if we've hit the rate limit
  if (RATE_LIMIT.requestHistory.length >= RATE_LIMIT.MAX_REQUESTS_PER_MINUTE) {
    const oldestRequest = RATE_LIMIT.requestHistory[0];
    const timeToWait = Math.max(0, oldestRequest + 60000 - now);

    if (timeToWait > 0) {
      logger.debug(`Rate limit reached, waiting ${timeToWait}ms before next request`);
      await new Promise((resolve) => setTimeout(resolve, timeToWait));
    }

    // Refresh rate limit window after waiting
    return checkRateLimit();
  }

  // Add current request to history
  RATE_LIMIT.requestHistory.push(now);
}

/**
 * Generate a simple fallback embedding when OpenAI is unavailable
 *
 * @param text - The text to generate a fallback embedding for
 * @returns A simplified embedding vector
 */
export function generateFallbackEmbedding(text: string): number[] {
  // Use semantic hashing as a fallback
  const words = text
    .toLowerCase()
    .split(/\W+/)
    .filter((word) => word.length > 0);
  const uniqueWords = [...new Set(words)];

  // Create a fixed-size vector of 1536 dimensions (same as OpenAI's embeddings)
  const embedding = new Array(1536).fill(0);

  for (const word of uniqueWords) {
    const hash = simpleHash(word);
    const position = hash % embedding.length;
    embedding[position] = 1;

    // Add some fuzziness by setting nearby positions
    for (let i = 1; i <= 3; i++) {
      const nearPosition = (position + i) % embedding.length;
      embedding[nearPosition] += 0.5 / i;
    }
  }

  // Normalize the vector
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return magnitude > 0 ? embedding.map((val) => val / magnitude) : embedding;
}

/**
 * Simple string hashing function
 */
export function simpleHash(str: string): number {
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
export function cosineSimilarity(vec1: number[], vec2: number[]): number {
  // Ensure vectors are the same length
  if (vec1.length !== vec2.length) {
    throw new Error('Vectors must be of the same length');
  }

  // Handle edge cases of zero vectors
  if (vec1.length === 0) return 0;

  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  // Calculate dot product and magnitudes
  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
    magnitude1 += vec1[i] * vec1[i];
    magnitude2 += vec2[i] * vec2[i];
  }

  // Handle zero magnitudes to avoid division by zero
  if (magnitude1 === 0 || magnitude2 === 0) return 0;

  // Calculate cosine similarity
  const similarity = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));

  // Ensure result is between 0 and 1 (can be slightly outside due to floating point precision)
  return Math.max(0, Math.min(1, similarity));
}

/**
 * Calculate similarity between two strings using cosine similarity of embeddings
 *
 * @param str1 - First string
 * @param str2 - Second string
 * @returns Similarity score between 0 and 1
 */
export async function calculateSimilarity(str1: string, str2: string): Promise<number> {
  try {
    // Generate embeddings for both strings
    const [embedding1, embedding2] = await Promise.all([
      generateEmbedding(str1),
      generateEmbedding(str2),
    ]);

    // Calculate cosine similarity
    return cosineSimilarity(embedding1, embedding2);
  } catch (error) {
    logger.error('Error calculating similarity:', error);

    // Fall back to a simpler similarity calculation
    const fallbackEmbedding1 = generateFallbackEmbedding(str1);
    const fallbackEmbedding2 = generateFallbackEmbedding(str2);

    return cosineSimilarity(fallbackEmbedding1, fallbackEmbedding2);
  }
}

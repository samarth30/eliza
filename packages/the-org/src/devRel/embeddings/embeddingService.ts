import { logger } from '@elizaos/core';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

// File-based embedding cache configuration
const CACHE_DIR = process.env.EDDY_EMBEDDING_CACHE_DIR
  ? path.resolve(process.cwd(), process.env.EDDY_EMBEDDING_CACHE_DIR)
  : path.join(__dirname, '../.embedding-cache'); // Store cache within the devRel directory
const MAX_CACHE_SIZE = parseInt(process.env.EDDY_MAX_EMBEDDING_CACHE_SIZE || '1000', 10);
const BATCH_SIZE = parseInt(process.env.EDDY_EMBEDDING_BATCH_SIZE || '50', 10); // Increased batch size

// In-memory cache for faster access during runtime
const embeddingCache = new Map<string, number[]>();

// Rate limiting for OpenAI API
const RATE_LIMIT = {
  MAX_REQUESTS_PER_MINUTE: parseInt(process.env.OPENAI_RATE_LIMIT || '60', 10),
  requestHistory: [] as number[],
};

/**
 * Initialize the cache directory
 */
async function ensureCacheDir(): Promise<void> {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  } catch (error) {
    logger.error('Failed to create embedding cache directory:', error);
  }
}

/**
 * Manage the embedding cache size to prevent memory issues
 */
export async function manageCacheSize(): Promise<void> {
  try {
    // Clean in-memory cache if it gets too large
    if (embeddingCache.size > MAX_CACHE_SIZE) {
      logger.debug(`Cleaning in-memory embedding cache (size: ${embeddingCache.size})`);
      // Delete oldest 20% of entries when cache gets too large
      const keysToDelete = [...embeddingCache.keys()].slice(0, Math.floor(MAX_CACHE_SIZE * 0.2));
      keysToDelete.forEach((key) => embeddingCache.delete(key));
      logger.debug(`Cleaned in-memory embedding cache (new size: ${embeddingCache.size})`);
    }

    // Check and clean disk cache if needed
    await cleanDiskCache();
  } catch (error) {
    logger.error('Error managing cache size:', error);
  }
}

/**
 * Clean the disk cache if it grows too large
 */
async function cleanDiskCache(): Promise<void> {
  try {
    // Ensure cache directory exists
    await ensureCacheDir();

    // Get all cache files
    const files = await fs.readdir(CACHE_DIR);

    if (files.length > MAX_CACHE_SIZE) {
      logger.debug(`Cleaning disk embedding cache (size: ${files.length})`);

      // Get file stats to determine oldest files
      const fileStats = await Promise.all(
        files.map(async (file) => {
          const filePath = path.join(CACHE_DIR, file);
          const stats = await fs.stat(filePath);
          return { file, filePath, mtime: stats.mtime };
        })
      );

      // Sort by modification time (oldest first)
      fileStats.sort((a, b) => a.mtime.getTime() - b.mtime.getTime());

      // Delete oldest 20% of files
      const filesToDelete = fileStats.slice(0, Math.floor(files.length * 0.2));
      await Promise.all(filesToDelete.map(({ filePath }) => fs.unlink(filePath)));

      logger.debug(`Cleaned disk embedding cache (removed: ${filesToDelete.length} files)`);
    }
  } catch (error) {
    logger.error('Error cleaning disk cache:', error);
  }
}

/**
 * Create a cache key for a text string
 */
function createCacheKey(text: string): string {
  return crypto.createHash('md5').update(text).digest('hex');
}

/**
 * Save embedding to disk cache
 */
async function saveToCache(text: string, embedding: number[]): Promise<void> {
  try {
    await ensureCacheDir();
    const cacheKey = createCacheKey(text);
    const cachePath = path.join(CACHE_DIR, `${cacheKey}.json`);
    await fs.writeFile(cachePath, JSON.stringify({ text, embedding }));
  } catch (error) {
    logger.error('Error saving embedding to disk cache:', error);
  }
}

/**
 * Load embedding from disk cache
 */
async function loadFromCache(text: string): Promise<number[] | null> {
  try {
    await ensureCacheDir();
    const cacheKey = createCacheKey(text);
    const cachePath = path.join(CACHE_DIR, `${cacheKey}.json`);

    try {
      const data = await fs.readFile(cachePath, 'utf8');
      const parsed = JSON.parse(data);
      return parsed.embedding;
    } catch (error) {
      // File not found or invalid content
      return null;
    }
  } catch (error) {
    logger.error('Error loading embedding from disk cache:', error);
    return null;
  }
}

/**
 * Generate OpenAI embeddings for a given text
 *
 * @param text - The text to generate embeddings for
 * @returns Promise containing the embedding vector
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  // This function will now use generateEmbeddingsBatch internally for consistency
  const embeddings = await generateEmbeddingsBatch([text]);
  return embeddings[0];
}

/**
 * Generate embeddings in batch for multiple texts
 *
 * @param texts - Array of texts to generate embeddings for
 * @returns Promise containing array of embedding vectors
 */
export async function generateEmbeddingsBatch(texts: string[]): Promise<number[][]> {
  // Safety check for empty input
  if (!texts || texts.length === 0) {
    return [];
  }

  try {
    // Check if we're at risk of hitting API rate limits
    await checkRateLimit();

    // Try to use cache first for all texts
    const results: (number[] | null)[] = await Promise.all(
      texts.map((text) => loadFromCache(text))
    );

    // Find which texts need new embeddings (not in cache)
    const missingIndices: number[] = [];
    results.forEach((result, index) => {
      if (result === null) {
        missingIndices.push(index);
      }
    });

    // If we found all embeddings in cache, return them
    if (missingIndices.length === 0) {
      return results as number[][];
    }

    // Extract texts that need embeddings
    const missingTexts = missingIndices.map((index) => texts[index]);

    // IMPROVED: Estimate tokens and enforce limits with more conservative estimates
    const tokenEstimates = missingTexts.map((text) => {
      // More conservative estimation: ~3 chars per token (instead of 4)
      // This ensures we don't underestimate token counts
      return Math.ceil(text.length / 3);
    });

    // Check for any text exceeding the token limit
    const MAX_TOKENS = 7000; // Much more conservative limit to ensure safety
    const oversizedIndices = tokenEstimates
      .map((tokens, index) => ({ tokens, index }))
      .filter((item) => item.tokens > MAX_TOKENS);

    if (oversizedIndices.length > 0) {
      logger.warn(`Found ${oversizedIndices.length} texts exceeding token limit`);
      oversizedIndices.forEach(({ tokens, index }) => {
        // Truncate oversized texts
        logger.warn(`Text at index ${index} has ~${tokens} tokens, truncating to ${MAX_TOKENS}`);

        // Truncate text to fit token limit (try to end at sentence boundary)
        const text = missingTexts[index];
        const charLimit = MAX_TOKENS * 3;
        let truncationPoint = Math.min(charLimit, text.length);

        // Look for sentence boundary
        const lastPeriod = text.lastIndexOf('.', truncationPoint);
        if (lastPeriod > charLimit * 0.8) {
          truncationPoint = lastPeriod + 1;
        }

        missingTexts[index] = text.substring(0, truncationPoint);
      });
    }

    // Process in smaller batches with stricter token limits
    // Keep total tokens per batch well under the limit
    const batches: string[][] = [];
    let currentBatch: string[] = [];
    let currentBatchTokens = 0;

    // Use a safety factor to further reduce batch size
    const BATCH_TOKEN_LIMIT = Math.floor(MAX_TOKENS * 0.9); // 10% safety margin
    const MAX_BATCH_SIZE = 15; // Reduced from 20 to be more conservative

    for (let i = 0; i < missingTexts.length; i++) {
      const text = missingTexts[i];
      const tokenEstimate = Math.ceil(text.length / 3); // Use the same conservative estimate

      // If adding this text would exceed batch token limit, start a new batch
      // More conservative conditions for starting a new batch
      if (
        currentBatch.length > 0 &&
        (currentBatchTokens + tokenEstimate > BATCH_TOKEN_LIMIT ||
          currentBatch.length >= MAX_BATCH_SIZE)
      ) {
        batches.push([...currentBatch]);
        currentBatch = [];
        currentBatchTokens = 0;
      }

      // Add text to current batch
      currentBatch.push(text);
      currentBatchTokens += tokenEstimate;
    }

    // Add the last batch if it has any items
    if (currentBatch.length > 0) {
      batches.push(currentBatch);
    }

    logger.info(
      `Split ${missingTexts.length} texts into ${batches.length} batches for embedding generation`
    );

    // Generate embeddings for each batch
    const batchEmbeddings: number[][] = [];

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      logger.info(
        `Processing batch ${batchIndex + 1}/${batches.length} with ${batch.length} texts`
      );

      try {
        // Wait for rate limiting if needed
        await checkRateLimit();

        // Calculate total tokens in this batch for logging (using consistent conservative estimate)
        const batchTokenEstimate = batch.reduce((sum, text) => sum + Math.ceil(text.length / 3), 0);
        logger.info(`Batch ${batchIndex + 1} estimated tokens: ~${batchTokenEstimate}`);

        // Call OpenAI API for embeddings
        const response = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            input: batch,
            model: 'text-embedding-3-small', // Using the small model which has same 8192 token limit
            dimensions: 1536, // Explicitly set dimensions to match our fallback embedding size
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          logger.warn(`OpenAI API error for batch: ${JSON.stringify(error)}`);
          throw new Error(`OpenAI API error: ${JSON.stringify(error)}`);
        }

        const data = await response.json();
        const embeddings = data.data.map((item: any) => item.embedding);

        logger.info(
          `Successfully generated ${embeddings.length} embeddings for batch ${batchIndex + 1}`
        );

        // Add to batch results
        batchEmbeddings.push(...embeddings);

        // Save to cache
        batch.forEach((text, i) => {
          const embedding = embeddings[i];
          if (embedding) {
            // Add to memory cache
            embeddingCache.set(text, embedding);
            // Save to disk cache
            saveToCache(text, embedding);
          }
        });
      } catch (batchError) {
        logger.warn(
          `OpenAI API error for batch: ${batchError}, using fallback embeddings for this batch`
        );

        // Log details about the failure
        logger.warn(
          `Failed batch size: ${batch.length} texts, estimated tokens: ${batch.reduce((sum, text) => sum + Math.ceil(text.length / 3), 0)}`
        );

        // For a token limit error, try truncating each text in the batch and retrying once
        if (String(batchError).includes('maximum context length')) {
          logger.info('Attempting to truncate batch items and retry');

          const truncatedBatch = batch.map((text) => {
            // Truncate each text to approximately 1/2 of its original size
            const maxChars = Math.floor(text.length * 0.5);
            let truncPoint = Math.min(maxChars, text.length);

            // Try to truncate at sentence boundary
            const lastPeriod = text.lastIndexOf('.', truncPoint);
            if (lastPeriod > maxChars * 0.7) {
              truncPoint = lastPeriod + 1;
            }

            return text.substring(0, truncPoint);
          });

          try {
            // Try again with truncated texts
            logger.info('Retrying with truncated texts');
            await checkRateLimit();

            const retryResponse = await fetch('https://api.openai.com/v1/embeddings', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              },
              body: JSON.stringify({
                input: truncatedBatch,
                model: 'text-embedding-3-small',
                dimensions: 1536,
              }),
            });

            if (retryResponse.ok) {
              const retryData = await retryResponse.json();
              const retryEmbeddings = retryData.data.map((item: any) => item.embedding);

              logger.info(
                `Successfully generated ${retryEmbeddings.length} embeddings after truncation`
              );

              // Add to batch results
              batchEmbeddings.push(...retryEmbeddings);

              // Save truncated versions to cache
              truncatedBatch.forEach((text, i) => {
                const embedding = retryEmbeddings[i];
                if (embedding) {
                  embeddingCache.set(text, embedding);
                  saveToCache(text, embedding);
                }
              });

              // Skip fallback embeddings since we succeeded with truncated texts
              continue;
            }
          } catch (retryError) {
            logger.warn(`Retry with truncated texts also failed: ${retryError}`);
          }
        }

        // If we get here, both the original attempt and retry (if applicable) failed
        // Generate fallback embeddings for this batch
        const fallbackEmbeddings = batch.map((text) => generateFallbackEmbedding(text));
        batchEmbeddings.push(...fallbackEmbeddings);

        // We don't cache fallback embeddings as they're lower quality
      }
    }

    // Combine cached results with new embeddings
    let embeddingIndex = 0;
    const finalEmbeddings = results.map((result, index) => {
      if (result !== null) {
        return result; // Use cached embedding
      } else {
        return batchEmbeddings[embeddingIndex++]; // Use new embedding
      }
    });

    return finalEmbeddings;
  } catch (error) {
    logger.error('Error generating embeddings batch:', error);

    // Fallback: generate simple embeddings
    return texts.map((text) => generateFallbackEmbedding(text));
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

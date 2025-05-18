/**
 * A simple token counter implementation to ensure we don't exceed model limits
 * This uses a simple heuristic: ~4 characters per token for English text
 * For more accurate counting, you could use a proper tokenizer like GPT's tiktoken
 */

// Maximum tokens supported by the model
export const MAX_TOKENS_PER_REQUEST = 8000; // Keep a small buffer below 8192

/**
 * Estimate the number of tokens in a text string
 * Uses a simple heuristic: ~4 characters per token for English text
 */
export function estimateTokens(text: string): number {
  // Simple approximation: ~4 characters per token for English text
  return Math.ceil(text.length / 4);
}

/**
 * Truncate text to fit within a token limit
 * Attempts to truncate at sentence boundaries when possible
 */
export function truncateToTokenLimit(
  text: string,
  maxTokens: number = MAX_TOKENS_PER_REQUEST
): string {
  const estimatedTokens = estimateTokens(text);

  if (estimatedTokens <= maxTokens) {
    return text; // Already within limits
  }

  // Calculate approximate character limit
  const charLimit = maxTokens * 4;

  // Try to find a good truncation point (sentence boundary)
  let truncationPoint = Math.min(charLimit, text.length);

  // Look backward for a sentence boundary
  const lastPeriod = text.lastIndexOf('.', truncationPoint);
  const lastQuestion = text.lastIndexOf('?', truncationPoint);
  const lastExclamation = text.lastIndexOf('!', truncationPoint);

  // Find the latest sentence boundary
  const sentenceBoundary = Math.max(lastPeriod, lastQuestion, lastExclamation);

  // If found a reasonable boundary, use it
  if (sentenceBoundary > charLimit * 0.8) {
    truncationPoint = sentenceBoundary + 1; // Include the punctuation
  }

  return text.substring(0, truncationPoint);
}

/**
 * Split text into chunks that fit within token limits
 */
export function splitByTokenLimit(
  text: string,
  maxTokensPerChunk: number = MAX_TOKENS_PER_REQUEST,
  overlapTokens: number = 200
): string[] {
  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    // Get a chunk that fits the token limit
    const chunk = truncateToTokenLimit(remaining, maxTokensPerChunk);
    chunks.push(chunk);

    // Exit if we used the entire text
    if (chunk.length === remaining.length) {
      break;
    }

    // Calculate overlap
    const overlapChars = overlapTokens * 4;
    const nextStart = Math.max(0, chunk.length - overlapChars);

    // Move to next chunk with overlap
    remaining = remaining.substring(nextStart);
  }

  return chunks;
}

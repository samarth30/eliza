/**
 * Utilities for enhancing RAG (Retrieval Augmented Generation) in Eliza
 */

import { logger } from '@elizaos/core';

/**
 * Knowledge context object containing retrieved document and query information
 */
export interface KnowledgeContext {
  document: {
    content: string;
    metadata: {
      source?: string;
      title?: string;
      section?: string;
    };
    score: number;
  };
  query: string;
}

/**
 * Analyzes a response to determine if it effectively used the provided knowledge
 * and enhances it with citation information if needed.
 *
 * @param response Original response from the LLM
 * @param context Knowledge context used in the query
 * @returns Enhanced response with citations if needed
 */
export function analyzeAndEnhanceResponse(response: string, context: KnowledgeContext): string {
  // Skip enhancement if no response or context
  if (!response || !context.document) {
    return response;
  }

  // Check if response appears to use the knowledge
  const knowledgeUsed = doesResponseUseKnowledge(response, context.document.content);

  // Log RAG effectiveness metrics
  logger.debug(`RAG Analysis for query: "${context.query.substring(0, 50)}..."`, {
    knowledgeUsed,
    documentScore: context.document.score,
    responseLength: response.length,
    source: context.document.metadata.source || 'Unknown',
  });

  if (knowledgeUsed) {
    // If knowledge is already used effectively, just ensure it has proper citations
    if (!responseIncludesCitation(response, context.document.metadata)) {
      return addCitationToResponse(response, context.document.metadata);
    }
    return response;
  } else {
    // If knowledge wasn't used but should have been, add feedback to the response
    return enhanceResponseWithKnowledge(response, context);
  }
}

/**
 * Determines if a response effectively uses the provided knowledge
 *
 * @param response Response text from the LLM
 * @param knowledge Knowledge text that was provided to the LLM
 * @returns Boolean indicating whether knowledge was used
 */
function doesResponseUseKnowledge(response: string, knowledge: string): boolean {
  // Normalize texts for comparison
  const normalizedResponse = response.toLowerCase();
  const normalizedKnowledge = knowledge.toLowerCase();

  // Extract significant phrases (5+ words) from knowledge
  const knowledgePhrases = extractSignificantPhrases(normalizedKnowledge);

  // Check if any significant phrases from knowledge appear in the response
  return knowledgePhrases.some((phrase) => normalizedResponse.includes(phrase));
}

/**
 * Extracts significant phrases (5+ words) from a text
 *
 * @param text Text to extract phrases from
 * @returns Array of significant phrases
 */
function extractSignificantPhrases(text: string): string[] {
  // Split text into sentences
  const sentences = text.split(/(?<=[.!?])\s+/);

  // Extract significant phrases (5+ words) from each sentence
  return sentences
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.split(/\s+/).length >= 5)
    .map((sentence) => {
      // For longer sentences, take a substring to get the key part
      const words = sentence.split(/\s+/);
      if (words.length > 7) {
        // Take a chunk of 5 words from the middle of the sentence
        const midpoint = Math.floor(words.length / 2);
        return words.slice(midpoint - 2, midpoint + 3).join(' ');
      }
      return sentence;
    });
}

/**
 * Checks if a response includes citation information
 *
 * @param response Response text
 * @param metadata Document metadata
 * @returns Boolean indicating whether citation is present
 */
function responseIncludesCitation(response: string, metadata: any): boolean {
  const source = metadata.source || '';
  const title = metadata.title || '';

  // Look for source or title mentions in the response
  return (
    (source && response.toLowerCase().includes(source.toLowerCase())) ||
    (title && response.toLowerCase().includes(title.toLowerCase())) ||
    response.includes('Source:') ||
    response.includes('Reference:') ||
    response.includes('[source]') ||
    response.includes('citation')
  );
}

/**
 * Adds citation information to a response
 *
 * @param response Original response
 * @param metadata Document metadata
 * @returns Response with citation added
 */
function addCitationToResponse(response: string, metadata: any): string {
  const source = metadata.source || 'Unknown';
  const title = metadata.title || '';
  const section = metadata.section ? ` (${metadata.section})` : '';

  const citation = `\n\nSource: ${source}${title ? ` - ${title}` : ''}${section}`;

  // Check if response contains XML tags
  if (response.includes('</text>')) {
    // Insert citation before the closing text tag
    return response.replace('</text>', `${citation}</text>`);
  } else {
    // Just append the citation at the end
    return response + citation;
  }
}

/**
 * Enhances a response with additional knowledge context
 *
 * @param response Original response
 * @param context Knowledge context
 * @returns Enhanced response with knowledge integration
 */
function enhanceResponseWithKnowledge(response: string, context: KnowledgeContext): string {
  const source = context.document.metadata.source || 'Unknown';
  const title = context.document.metadata.title || '';
  const section = context.document.metadata.section
    ? ` (${context.document.metadata.section})`
    : '';

  // Create a short summary of the knowledge (first 200 chars)
  const knowledgeSummary =
    context.document.content.substring(0, 200) +
    (context.document.content.length > 200 ? '...' : '');

  // Add supplementary information based on the knowledge
  const supplement = `\n\nAdditional information: ${knowledgeSummary}\n\nSource: ${source}${title ? ` - ${title}` : ''}${section}`;

  // If the response is XML-formatted
  if (response.includes('<text>') && response.includes('</text>')) {
    // Insert supplement before the closing text tag
    return response.replace('</text>', `${supplement}</text>`);
  } else {
    // Just append the supplement
    return response + supplement;
  }
}

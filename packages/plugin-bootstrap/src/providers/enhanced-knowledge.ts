import type { IAgentRuntime, Memory, Provider, State, KnowledgeItem } from '@elizaos/core';
import { logger, addHeader } from '@elizaos/core';

/**
 * Metadata interface extending the basic KnowledgeItem metadata
 * to include fields that might be present in documentation sources
 */
interface EnhancedMetadata {
  source?: string;
  title?: string;
  section?: string;
  [key: string]: any; // Allow for other metadata properties
}

/**
 * Enhanced Knowledge Provider using Gemini or other large context models
 * for improved RAG capabilities.
 *
 * Leverages larger context windows and better formatting to improve the quality
 * of knowledge retrieval and utilization in responses.
 *
 * @type {Provider}
 */
export class EnhancedKnowledgeProvider implements Provider {
  name = 'enhancedKnowledge';
  description =
    'Enhanced knowledge retrieval system leveraging Gemini or other large context models for improved accuracy and context understanding.';
  dynamic = true;
  agent?: IAgentRuntime;

  // Default values for standard models
  private STANDARD_CONFIG = {
    MAX_KNOWLEDGE_ITEMS: 5,
    MAX_TOKENS: 4000,
  };

  // Enhanced values for large context models
  private LARGE_CONTEXT_CONFIG = {
    MAX_KNOWLEDGE_ITEMS: 10,
    MAX_TOKENS: 8000,
  };

  /**
   * Get knowledge data for the current message
   * @param runtime Agent runtime instance
   * @param message Current message to process
   * @param previousState Previous state if available
   * @returns Knowledge provider result
   */
  async get(runtime: IAgentRuntime, message: Memory, previousState?: State) {
    const startTime = Date.now();

    // Determine if we're using a large context model based on environment settings or model capabilities
    // This could be expanded to automatically detect model capabilities in the future
    const useLargeContext =
      process.env.USE_LARGE_CONTEXT === 'true' ||
      process.env.LLM_MODEL?.toLowerCase().includes('gemini') ||
      process.env.LLM_MODEL?.toLowerCase().includes('gpt-4');

    // Use the appropriate configuration based on model capabilities
    const contextConfig = useLargeContext ? this.LARGE_CONTEXT_CONFIG : this.STANDARD_CONFIG;

    // Log the start of the knowledge retrieval process with detailed information
    logger.debug('[EnhancedKnowledge] Starting knowledge retrieval for message', {
      messageId: message.id,
      query: message.content.text?.substring(0, 100), // Log a preview of the query
      useLargeContext,
      maxTokens: contextConfig.MAX_TOKENS,
      maxItems: contextConfig.MAX_KNOWLEDGE_ITEMS,
    });

    // Get knowledge data from the runtime
    const knowledgeData = await runtime.getKnowledge(message);
    const retrievalTime = Date.now() - startTime;
    logger.debug(
      `[EnhancedKnowledge] Retrieved ${knowledgeData?.length || 0} knowledge items in ${retrievalTime}ms`
    );

    // If no knowledge items were found, log and return empty
    if (!knowledgeData || knowledgeData.length === 0) {
      logger.debug('[EnhancedKnowledge] No relevant knowledge items found');
      return {
        data: { knowledge: '' },
        values: { knowledge: '' },
        text: '',
      };
    }

    // Process and limit the knowledge items based on our configuration
    const processedItems = knowledgeData.slice(0, contextConfig.MAX_KNOWLEDGE_ITEMS);

    // Get the user query from the message content
    const userQuery = message.content.text || '';

    try {
      // Use our rag-utils to optimize knowledge for the LLM - this formats with XML tags
      // and ensures proper structure for better comprehension by large context models
      const optimizedKnowledge = await this.formatKnowledgeForModel(
        processedItems,
        userQuery,
        useLargeContext
      );

      // Calculate token estimation (this is approximate)
      const tokenLength = 3.5; // Characters per token estimation
      const estimatedTokens = optimizedKnowledge.length / tokenLength;

      logger.debug(
        `[EnhancedKnowledge] Knowledge formatted with ~${Math.round(estimatedTokens)} tokens`
      );

      // Check if we need to truncate based on token limits
      let knowledge = optimizedKnowledge;
      if (estimatedTokens > contextConfig.MAX_TOKENS) {
        knowledge = knowledge.slice(0, Math.floor(contextConfig.MAX_TOKENS * tokenLength));
        logger.debug(
          `[EnhancedKnowledge] Knowledge truncated to ~${contextConfig.MAX_TOKENS} tokens`
        );
      }

      // Add metadata about the knowledge to help the LLM understand the context better
      const metadataHeader = `# Knowledge Context\n- Total sources: ${processedItems.length}\n- Query: "${userQuery.substring(0, 100)}"\n\n`;

      knowledge = metadataHeader + knowledge;

      // Calculate total processing time for logging
      const totalTime = Date.now() - startTime;
      logger.debug(`[EnhancedKnowledge] Total processing time: ${totalTime}ms`);

      return {
        data: {
          knowledge,
          knowledgeItems: processedItems, // Store the raw items for potential reranking
        },
        values: {
          knowledge,
          knowledgeCount: processedItems.length,
        },
        text: knowledge,
      };
    } catch (error) {
      logger.error('[EnhancedKnowledge] Error formatting knowledge:', error);
      return {
        data: { knowledge: '' },
        values: { knowledge: '' },
        text: '',
      };
    }
  }

  /**
   * Formats knowledge items for the LLM in a structured way that's easier to understand
   * @param items Knowledge items to format
   * @param query User query for context
   * @param useLargeContext Whether we're using a large context model
   * @returns Formatted knowledge string optimized for the model
   */
  private async formatKnowledgeForModel(
    items: KnowledgeItem[],
    query: string,
    useLargeContext: boolean = false
  ): Promise<string> {
    if (!items || items.length === 0) {
      return '';
    }

    // Sort knowledge items by relevance if score is available
    const sortedItems = [...items].sort((a, b) => {
      // Use type assertion to handle score property that's not in the type definition
      const itemA = a as KnowledgeItem & { score?: number };
      const itemB = b as KnowledgeItem & { score?: number };
      const scoreA = itemA.score !== undefined ? itemA.score : 0;
      const scoreB = itemB.score !== undefined ? itemB.score : 0;
      return scoreB - scoreA;
    });

    // Log the relevance scores of the top items for debugging
    sortedItems.slice(0, 3).forEach((item, index) => {
      const enhancedItem = item as KnowledgeItem & { score?: number };
      const score = enhancedItem.score !== undefined ? enhancedItem.score.toFixed(4) : 'N/A';
      logger.debug(`[EnhancedKnowledge] Top knowledge item #${index + 1} score: ${score}`);
    });

    // For large context models, use XML-structured knowledge format
    if (useLargeContext) {
      return this.formatStructuredKnowledge(sortedItems, query);
    }

    // For smaller models, use a simpler markdown format
    return this.formatSimpleKnowledge(sortedItems, query);
  }

  /**
   * Formats knowledge in a structured XML format for large context models
   */
  private formatStructuredKnowledge(items: KnowledgeItem[], query: string): string {
    // Create XML-structured format for knowledge context
    let formattedKnowledge = `<query>${query}</query>

<knowledge_items>
`;

    items.forEach((item, index) => {
      // Cast to access score property and enhanced metadata
      const enhancedItem = item as KnowledgeItem & { score?: number };
      const metadata = item.metadata as EnhancedMetadata;

      const source = metadata?.source || 'Unknown';
      const title = metadata?.title || '';
      const section = metadata?.section ? ` (${metadata.section})` : '';
      const relevance = enhancedItem.score !== undefined ? enhancedItem.score.toFixed(4) : 'N/A';

      formattedKnowledge += `<knowledge item="${index + 1}">
`;
      formattedKnowledge += `<content>${item.content.text}</content>
`;
      formattedKnowledge += `<source>${source}${title ? ` - ${title}` : ''}${section}</source>
`;
      formattedKnowledge += `<relevance>${relevance}</relevance>
`;
      formattedKnowledge += `</knowledge>

`;
    });

    formattedKnowledge += '</knowledge_items>\n\n';
    formattedKnowledge += '<instructions>\n';
    formattedKnowledge += 'Use the knowledge items above to answer the query accurately.\n';
    formattedKnowledge +=
      "If the knowledge doesn't contain the answer, acknowledge that you don't know.\n";
    formattedKnowledge += 'When using information from the knowledge, include the source.\n';
    formattedKnowledge += '</instructions>';

    return formattedKnowledge;
  }

  /**
   * Formats knowledge in a simple markdown format for standard models
   */
  private formatSimpleKnowledge(items: KnowledgeItem[], query: string): string {
    const formattedItems = items
      .map((item, index) => {
        // Use type assertion to handle score property that's not in the type definition
        const enhancedItem = item as KnowledgeItem & { score?: number };
        const metadata = item.metadata as EnhancedMetadata;

        const scoreInfo =
          enhancedItem.score !== undefined ? ` (relevance: ${enhancedItem.score.toFixed(3)})` : '';
        const source = metadata?.source || 'Unknown';
        const title = metadata?.title || '';
        const section = metadata?.section ? ` (${metadata.section})` : '';

        return `## Source ${index + 1}${scoreInfo}
${item.content.text}

Source: ${source}${title ? ` - ${title}` : ''}${section}`;
      })
      .join('\n\n');

    // Create the knowledge section with header and instructions
    return `# Relevant Knowledge

${formattedItems}

# Instructions
- Use the knowledge above to answer accurately
- If the knowledge doesn't contain the answer, acknowledge that
- Include the source when citing information`;
  }
}

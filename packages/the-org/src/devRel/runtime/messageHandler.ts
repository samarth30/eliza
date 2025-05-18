import { logger } from '@elizaos/core';

import {
  DocumentationConfig,
  KnowledgeBaseConfig,
  extractKnowledge,
  updateKnowledgeBase,
} from '../knowledge/knowledgeManager';
import { manageCacheSize } from '../embeddings/embeddingService';
import { queryRAG } from '../knowledge/rag';

/**
 * Sets up message handling and response management for the runtime
 *
 * @param runtime - The Eliza runtime instance
 * @param config - The application configuration
 */
export function setupMessageHandling(runtime: any, config: any): void {
  // Store for active response timeouts
  if (!(runtime as any).timeouts) {
    (runtime as any).timeouts = new Map();
  }

  // Intercept outgoing messages to enhance with RAG-based documentation
  logger.info('RAG_SYSTEM: Setting up message handler with RAG query by default');
  console.log('===== CRITICAL: MessageHandler Initialization =====');
  console.log('RAG_SYSTEM: setupMessageHandling called - overriding message generation process');

  // Hook into the useModel method to intercept prompt/response
  const originalUseModel = runtime.useModel;
  runtime.useModel = async (modelType: any, options: any) => {
    // Defensive: ensure options is always a non-null object before any access
    if (!options || typeof options !== 'object') options = {};
    try {
      const prompt = options.prompt;

      // Only intercept message generation prompts
      if (prompt && prompt.includes('recent messages:')) {
        console.log('===== RAG MODEL INTERCEPT: MESSAGE DETECTED =====');

        // Extract the user's query from the prompt
        const lines = prompt.split('\n');
        let userQuery = '';

        // Find the last user message in the prompt
        for (let i = lines.length - 1; i >= 0; i--) {
          const line = lines[i];
          if (line.includes('user:')) {
            userQuery = line.split('user:')[1].trim();
            break;
          }
        }

        if (userQuery) {
          console.log(`RAG INTERCEPT: Found user query: ${userQuery}`);

          // Safely get documentation configuration
          const docConfig = config?.settings?.DOCUMENTATION_SOURCES?.value || [];
          if (!docConfig.length) {
            logger.warn('RAG INTERCEPT: No documentation sources configured');
          } else {
            // Use the queryRAG function with optimized parameters
            const ragResponse = await queryRAG(userQuery, docConfig, 5, 0.4);

            // Check if relevant information was found
            const isRelevantFound = ragResponse && ragResponse !== 'No relevant information found.';

            if (isRelevantFound) {
              console.log('RAG INTERCEPT: Found relevant documentation');
              console.log(ragResponse);

              // Add RAG context to the prompt for better responses
              const ragContext = `\n\nRELEVANT DOCUMENTATION:\n${ragResponse}\n\nIMPORTANT: When responding about ElizaOS CLI commands, use EXACTLY the command syntax shown in the documentation above. Do not modify or invent command formats.`;

              // Insert RAG context into the prompt before generating response
              const insertPoint =
                prompt && typeof prompt === 'string'
                  ? prompt.indexOf('instructions:') + 'instructions:'.length
                  : -1;
              let enhancedPrompt = prompt;
              if (insertPoint > 0) {
                enhancedPrompt =
                  prompt.slice(0, insertPoint) + ragContext + prompt.slice(insertPoint);
              } else if (prompt && typeof prompt === 'string') {
                enhancedPrompt = prompt + ragContext;
              } else {
                enhancedPrompt = ragContext;
              }

              // Ensure options is always an object
              if (!options || typeof options !== 'object') options = {};
              options.prompt = enhancedPrompt;
            }
          }
        }
      }

      // Call original useModel with possibly modified options
      // Defensive: ensure options is always an object
      if (!options || typeof options !== 'object') options = {};
      try {
        return originalUseModel.call(runtime, modelType, options);
      } catch (err) {
        logger.error('Error in original useModel call:', err);
        return undefined;
      }
    } catch (error) {
      logger.error('Error in RAG model intercept:', error);
      // Defensive: ensure options is always an object
      if (!options || typeof options !== 'object') options = {};
      try {
        return originalUseModel.call(runtime, modelType, options);
      } catch (err) {
        logger.error('Error in fallback original useModel call:', err);
        return undefined;
      }
    }
  };

  const originalSend = runtime.send;
  runtime.send = async (message: any) => {
    // Log every outgoing message to verify our handler is executed
    logger.info('RAG_SYSTEM: Message handler intercepted outgoing message', {
      messageId: message?.id || 'unknown',
      channel: message?.conversation?.channel || 'unknown',
      platform: message?.conversation?.platform || 'unknown',
    });

    if (message && message.text && typeof message.text === 'string') {
      try {
        // Get the original query from the conversation
        let query = '';
        if (message.conversation?.id) {
          const conversation = await runtime.getConversation(message.conversation.id);
          if (conversation && conversation.messages && conversation.messages.length > 0) {
            // Find the last user message
            for (let i = conversation.messages.length - 1; i >= 0; i--) {
              const msg = conversation.messages[i];
              if (msg.sender?.role === 'user') {
                query = msg.text;
                break;
              }
            }
          }
        }

        // Always use RAG query by default for all messages
        try {
          console.log('RAG_HANDLER: Starting RAG query', { query });
          // Get documentation configuration
          const docConfig: DocumentationConfig[] = config.settings.DOCUMENTATION_SOURCES.value;
          logger.debug('RAG_HANDLER: Documentation config loaded', {
            sourceCount: docConfig.length,
          });

          // Use query if available, otherwise use the message text itself
          const searchQuery = query || message.text;
          logger.info('RAG_HANDLER: Starting RAG query', { query: searchQuery });

          // IMPROVED: Use a lower threshold based on test-rag.ts results
          // This helps ensure better document retrieval as seen in the test results
          const minScore = 0.4; // Lower threshold for better results
          const k = 5; // Get more results for better coverage

          logger.debug('RAG_HANDLER: Calling queryRAG function with parameters', {
            k,
            minScore,
          });

          // Use the queryRAG function with optimized parameters
          const ragResponse = await queryRAG(searchQuery, docConfig, k, minScore);

          console.log(ragResponse);

          // Log the response for debugging
          const isRelevantFound = ragResponse !== 'No relevant information found.';
          logger.info('RAG_HANDLER: RAG query completed', {
            query: searchQuery,
            foundRelevantInfo: isRelevantFound,
            responseLength: ragResponse.length,
          });

          // Completely replace the message text with the RAG response
          // Don't blend RAG results with generated text - use RAG directly
          const originalText = message.text;

          if (isRelevantFound) {
            // When relevant docs are found, use them directly without modification
            logger.info(
              'RAG_HANDLER: Using RAG response directly for accurate CLI commands and info'
            );

            // Construct a response that uses the RAG content directly
            const prefix = "Here's the relevant information from our documentation:\n\n";

            // Force model to use exactly what was found in docs
            message.text = prefix + ragResponse;
          } else {
            // No relevant docs found, so keep original text
            logger.warn('RAG_HANDLER: No relevant docs found, using original message text');
          }

          // Log the replacement details
          logger.debug('RAG_HANDLER: Message text replaced', {
            originalLength: originalText.length,
            newLength: message.text.length,
            isDirectRagUsage: isRelevantFound,
            platform: message?.conversation?.platform?.toLowerCase() || 'unknown',
          });
        } catch (ragError) {
          logger.error(`Error querying RAG system: ${ragError}`);
          // Continue with original message if RAG fails
        }
      } catch (error) {
        logger.error('Error enhancing response with documentation:', error);
      }

      return originalSend.call(runtime, message);
    }

    return originalSend.call(runtime, message);
  };

  // We've already set up runtime.ragSystem in the initialization

  const processedMessages = new Set<string>();

  // Add message handling with guaranteed responses
  runtime.on('message:received', async (message: any) => {
    // Monitor received messages and set up response timeout
    if (message && message.id) {
      // Check if we've already processed this message
      if (processedMessages.has(message.id)) {
        logger.debug(`Skipping already processed message: ${message.id}`);
        return;
      }

      // Mark this message as processed
      processedMessages.add(message.id);

      logger.debug(`Received message: ${message.id}`);

      // Set up a timeout to ensure we always respond within 20 seconds
      const responseTimeout = setTimeout(async () => {
        try {
          const conversationId = message.conversation?.id;
          if (conversationId) {
            logger.warn(
              `No response sent after 20 seconds for message ${message.id}, sending fallback response`
            );

            // Check if a response has already been sent
            const hasResponse = message.responses && message.responses.length > 0;

            if (!hasResponse) {
              // Send a fallback response to ensure the user always gets a reply
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

      // Store the timeout ID with the message ID
      (runtime as any).timeouts.set(message.id, responseTimeout);
    }

    // Handle knowledge extraction if enabled
    handleKnowledgeExtraction(runtime, message, config);
  });

  // Clean up processed messages periodically to prevent memory leaks
  const cleanupInterval = setInterval(
    () => {
      // Keep the set size manageable by removing older entries when it gets too large
      if (processedMessages.size > 1000) {
        logger.debug(`Cleaning up processed messages cache (size: ${processedMessages.size})`);
        // Convert to array, remove oldest entries, convert back to set
        const messagesArray = Array.from(processedMessages);
        const newMessages = messagesArray.slice(messagesArray.length / 2);
        processedMessages.clear();
        newMessages.forEach((id) => processedMessages.add(id));
        logger.debug(`Processed messages cache cleaned (new size: ${processedMessages.size})`);
      }
    },
    1000 * 60 * 60
  ); // Every hour

  // Add cleanup for the interval
  runtime.on('cleanup', () => {
    clearInterval(cleanupInterval);
  });

  // Handle when a message is sent successfully
  runtime.on('message:sent', async (message: any) => {
    // When a response is sent successfully, clear any timeout
    if (message && message.id && (runtime as any).timeouts) {
      const timeoutId = (runtime as any).timeouts.get(message.id);
      if (timeoutId) {
        clearTimeout(timeoutId);
        (runtime as any).timeouts.delete(message.id);
        logger.debug(`Cleared timeout for message: ${message.id} - response was sent successfully`);
      }
    }
  });

  // Add error handler to ensure Eddy always responds
  runtime.on('message:error', async (error: any, message: any) => {
    logger.error(`Error processing message ${message?.id}:`, error);
    try {
      // If there's an error processing a message, attempt to send a fallback response
      if (message && message.conversation && message.conversation.id) {
        const conversationId = message.conversation.id;

        // Send a fallback response through the runtime's send method
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
  setupKnowledgeManagement(runtime, config);

  // Automatically manage cache size periodically
  const cacheCleanupInterval = setInterval(manageCacheSize, 1000 * 60 * 60); // Every hour

  // Add to runtime cleanup
  runtime.on('cleanup', () => {
    clearInterval(cacheCleanupInterval);

    // Also clear any pending response timeouts
    if ((runtime as any).timeouts) {
      for (const [messageId, timeoutId] of (runtime as any).timeouts.entries()) {
        clearTimeout(timeoutId as NodeJS.Timeout);
        logger.debug(`Cleared timeout for message: ${messageId} during cleanup`);
      }
      (runtime as any).timeouts.clear();
    }
  });
}

/**
 * Sets up knowledge management event handlers
 *
 * @param runtime - The Eliza runtime instance
 * @param config - The application configuration
 */
function setupKnowledgeManagement(runtime: any, config: any): void {
  if (
    config.settings.KNOWLEDGE_BASE.value &&
    Object.keys(config.settings.KNOWLEDGE_BASE.value).length > 0
  ) {
    logger.debug('Setting up knowledge management system...');
    // Add knowledge extraction hook for completed conversations
    runtime.on('conversation:completed', async (conversation: any) => {
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
}

// Removed the generateDetailedResponse function as it's no longer needed
// RAG query is now used by default for all responses

/**
 * Handle real-time knowledge extraction from messages
 *
 * @param runtime - The Eliza runtime instance
 * @param message - The received message
 * @param config - The application configuration
 */
async function handleKnowledgeExtraction(runtime: any, message: any, config: any): Promise<void> {
  if (
    config.settings.KNOWLEDGE_BASE.value &&
    Object.keys(config.settings.KNOWLEDGE_BASE.value).length > 0 &&
    message &&
    message.conversation &&
    message.text
  ) {
    const knowledgeConfig = runtime.config.settings.KNOWLEDGE_BASE.value as KnowledgeBaseConfig;
    const keywordTriggers = knowledgeConfig.extractionRules?.keywordTriggers || [];

    // Check if message contains keywords that should trigger knowledge extraction
    if (
      keywordTriggers.some((keyword) => message.text.toLowerCase().includes(keyword.toLowerCase()))
    ) {
      logger.debug('Knowledge extraction keyword trigger detected');
      try {
        // Get conversation context
        const conversationId = message.conversation.id;
        const conversation = await runtime.getConversation(conversationId);

        if (conversation) {
          // Extract knowledge in real-time
          const knowledgeItems = extractKnowledge(conversation, knowledgeConfig);
          if (knowledgeItems.length > 0) {
            await updateKnowledgeBase(knowledgeItems, knowledgeConfig);
          }
        }
      } catch (error) {
        logger.error('Error in real-time knowledge extraction:', error);
      }
    }
  }
}

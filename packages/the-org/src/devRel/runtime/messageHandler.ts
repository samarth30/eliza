import { logger } from '@elizaos/core';
import { enhanceWithDocUrls } from '../config/documentationConfig';
import {
  KnowledgeBaseConfig,
  extractKnowledge,
  updateKnowledgeBase,
} from '../knowledge/knowledgeManager';
import { manageCacheSize } from '../embeddings/embeddingService';

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

  // Intercept outgoing messages to ensure correct doc URLs
  const originalSend = runtime.send;
  runtime.send = async (message: any) => {
    // Enhance with correct documentation URLs
    const enhancedMessage = enhanceWithDocUrls(message);
    return originalSend.call(runtime, enhancedMessage);
  };

  // Add message handling with guaranteed responses
  runtime.on('message:received', async (message: any) => {
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

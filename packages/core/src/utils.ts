import { Buffer } from 'buffer';
import handlebars from 'handlebars';
import { sha1 } from 'js-sha1';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import pkg from 'stream-browserify';
import { names, uniqueNamesGenerator } from 'unique-names-generator';
import { z } from 'zod';

import type {
  Content,
  Entity,
  IAgentRuntime,
  KnowledgeItem,
  Memory,
  State,
  TemplateType,
} from './types';
import { ModelType, UUID } from './types';
import logger from './logger';

const { PassThrough, Readable } = pkg;

// Audio Utils

/**
 * Generates a WAV file header based on the provided audio parameters.
 * @param {number} audioLength - The length of the audio data in bytes.
 * @param {number} sampleRate - The sample rate of the audio.
 * @param {number} [channelCount=1] - The number of channels (default is 1).
 * @param {number} [bitsPerSample=16] - The number of bits per sample (default is 16).
 * @returns {Buffer} The WAV file header as a Buffer object.
 */
function getWavHeader(
  audioLength: number,
  sampleRate: number,
  channelCount = 1,
  bitsPerSample = 16
): Buffer {
  const wavHeader = Buffer.alloc(44);
  wavHeader.write('RIFF', 0);
  wavHeader.writeUInt32LE(36 + audioLength, 4); // Length of entire file in bytes minus 8
  wavHeader.write('WAVE', 8);
  wavHeader.write('fmt ', 12);
  wavHeader.writeUInt32LE(16, 16); // Length of format data
  wavHeader.writeUInt16LE(1, 20); // Type of format (1 is PCM)
  wavHeader.writeUInt16LE(channelCount, 22); // Number of channels
  wavHeader.writeUInt32LE(sampleRate, 24); // Sample rate
  wavHeader.writeUInt32LE((sampleRate * bitsPerSample * channelCount) / 8, 28); // Byte rate
  wavHeader.writeUInt16LE((bitsPerSample * channelCount) / 8, 32); // Block align ((BitsPerSample * Channels) / 8)
  wavHeader.writeUInt16LE(bitsPerSample, 34); // Bits per sample
  wavHeader.write('data', 36); // Data chunk header
  wavHeader.writeUInt32LE(audioLength, 40); // Data chunk size
  return wavHeader;
}

/**
 * Prepends a WAV header to a readable stream of audio data.
 *
 * This function takes a readable stream containing the audio data and prepends a WAV header to it.
 * The WAV header is generated based on the provided audio parameters.
 *
 * @param {Readable} readable - The readable stream containing the audio data.
 * @param {number} audioLength - The length of the audio data in seconds.
 * @param {number} sampleRate - The sample rate of the audio data.
 * @param {number} [channelCount=1] - The number of channels in the audio data (default is 1).
 * @param {number} [bitsPerSample=16] - The number of bits per sample in the audio data (default is 16).
 * @returns {Readable} A new readable stream with the WAV header prepended to the audio data.
 */
function prependWavHeader(
  readable: typeof Readable,
  audioLength: number,
  sampleRate: number,
  channelCount = 1,
  bitsPerSample = 16
): typeof Readable {
  const wavHeader = getWavHeader(audioLength, sampleRate, channelCount, bitsPerSample);
  let pushedHeader = false;
  const passThrough = new PassThrough();
  readable.on('data', (data) => {
    if (!pushedHeader) {
      passThrough.push(wavHeader);
      pushedHeader = true;
    }
    passThrough.push(data);
  });
  readable.on('end', () => {
    passThrough.end();
  });
  return passThrough;
}

export { getWavHeader, prependWavHeader };

// Text Utils

/**
 * Convert all double-brace bindings in a Handlebars template
 * to triple-brace bindings, so the output is NOT HTML-escaped.
 *
 * - Ignores block/partial/comment tags that start with # / ! >.
 * - Ignores the else keyword.
 * - Ignores bindings that are already triple-braced.
 *
 * @param  tpl  Handlebars template source
 * @return      Transformed template
 */
export function upgradeDoubleToTriple(tpl) {
  return tpl.replace(
    // ────────╮ negative-LB: not already "{{{"
    //          │   {{     ─ opening braces
    //          │    ╰──── negative-LA: not {, #, /, !, >
    //          ▼
    /(?<!{){{(?![{#\/!>])([\s\S]*?)}}/g,
    (_match, inner) => {
      // keep the block keyword {{else}} unchanged
      if (inner.trim() === 'else') return `{{${inner}}}`;
      return `{{{${inner}}}}`;
    }
  );
}

/**
 * Composes a context string by replacing placeholders in a template with corresponding values from the state.
 *
 * This function takes a template string with placeholders in the format `{{placeholder}}` and a state object.
 * It replaces each placeholder with the value from the state object that matches the placeholder's name.
 * If a matching key is not found in the state object for a given placeholder, the placeholder is replaced with an empty string.
 *
 * @param {Object} params - The parameters for composing the context.
 * @param {State} params.state - The state object containing values to replace the placeholders in the template.
 * @param {TemplateType} params.template - The template string or function containing placeholders to be replaced with state values.
 * @returns {string} The composed context string with placeholders replaced by corresponding state values.
 *
 * @example
 * // Given a state object and a template
 * const state = { userName: "Alice", userAge: 30 };
 * const template = "Hello, {{userName}}! You are {{userAge}} years old";
 *
 * // Composing the context with simple string replacement will result in:
 * // "Hello, Alice! You are 30 years old."
 * const contextSimple = composePromptFromState({ state, template });
 *
 * // Using composePromptFromState with a template function for dynamic template
 * const template = ({ state }) => {
 * const tone = Math.random() > 0.5 ? "kind" : "rude";
 *   return `Hello, {{userName}}! You are {{userAge}} years old. Be ${tone}`;
 * };
 * const contextSimple = composePromptFromState({ state, template });
 */

/**
 * Function to compose a prompt using a provided template and state.
 * It compiles the template (upgrading double braces to triple braces for non-HTML escaping)
 * and then populates it with values from the state. Additionally, it processes the
 * resulting string with `composeRandomUser` to replace placeholders like `{{nameX}}`.
 *
 * @param {Object} options - Object containing state and template information.
 * @param {State} options.state - The state object containing values to fill the template.
 * @param {TemplateType} options.template - The template string or function to be used for composing the prompt.
 * @returns {string} The composed prompt output, with state values and random user names populated.
 */
export const composePrompt = ({
  state,
  template,
}: {
  state: { [key: string]: string };
  template: TemplateType;
}) => {
  const templateStr = typeof template === 'function' ? template({ state }) : template;
  const templateFunction = handlebars.compile(upgradeDoubleToTriple(templateStr));
  const output = composeRandomUser(templateFunction(state), 10);
  return output;
};

/**
 * Function to compose a prompt using a provided template and state.
 *
 * @param {Object} options - Object containing state and template information.
 * @param {State} options.state - The state object containing values to fill the template.
 * @param {TemplateType} options.template - The template to be used for composing the prompt.
 * @returns {string} The composed prompt output.
 */
export const composePromptFromState = ({
  state,
  template,
}: {
  state: State;
  template: TemplateType;
}) => {
  const templateStr = typeof template === 'function' ? template({ state }) : template;
  const templateFunction = handlebars.compile(upgradeDoubleToTriple(templateStr));

  // get any keys that are in state but are not named text, values or data
  const stateKeys = Object.keys(state);
  const filteredKeys = stateKeys.filter((key) => !['text', 'values', 'data'].includes(key));

  // this flattens out key/values in text/values/data
  const filteredState = filteredKeys.reduce((acc, key) => {
    acc[key] = state[key];
    return acc;
  }, {});

  // and then we flat state.values again
  const output = composeRandomUser(templateFunction({ ...filteredState, ...state.values }), 10);
  return output;
};

/**
 * Adds a header to a body of text.
 *
 * This function takes a header string and a body string and returns a new string with the header prepended to the body.
 * If the body string is empty, the header is returned as is.
 *
 * @param {string} header - The header to add to the body.
 * @param {string} body - The body to which to add the header.
 * @returns {string} The body with the header prepended.
 *
 * @example
 * // Given a header and a body
 * const header = "Header";
 * const body = "Body";
 *
 * // Adding the header to the body will result in:
 * // "Header\nBody"
 * const text = addHeader(header, body);
 */
export const addHeader = (header: string, body: string) => {
  return body.length > 0 ? `${header ? `${header}\n` : header}${body}\n` : '';
};

/**
 * Generates a string with random user names populated in a template.
 *
 * This function generates random user names and populates placeholders
 * in the provided template with these names. Placeholders in the template should follow the format `{{userX}}`
 * where `X` is the position of the user (e.g., `{{name1}}`, `{{name2}}`).
 *
 * @param {string} template - The template string containing placeholders for random user names.
 * @param {number} length - The number of random user names to generate.
 * @returns {string} The template string with placeholders replaced by random user names.
 *
 * @example
 * // Given a template and a length
 * const template = "Hello, {{name1}}! Meet {{name2}} and {{name3}}.";
 * const length = 3;
 *
 * // Composing the random user string will result in:
 * // "Hello, John! Meet Alice and Bob."
 * const result = composeRandomUser(template, length);
 */
export const composeRandomUser = (template: string, length: number) => {
  const exampleNames = Array.from({ length }, () =>
    uniqueNamesGenerator({ dictionaries: [names] })
  );
  let result = template;
  for (let i = 0; i < exampleNames.length; i++) {
    result = result.replaceAll(`{{name${i + 1}}}`, exampleNames[i]);
  }

  return result;
};

export const formatPosts = ({
  messages,
  entities,
  conversationHeader = true,
}: {
  messages: Memory[];
  entities: Entity[];
  conversationHeader?: boolean;
}) => {
  // Group messages by roomId
  const groupedMessages: { [roomId: string]: Memory[] } = {};
  messages.forEach((message) => {
    if (message.roomId) {
      if (!groupedMessages[message.roomId]) {
        groupedMessages[message.roomId] = [];
      }
      groupedMessages[message.roomId].push(message);
    }
  });

  // Sort messages within each roomId by createdAt (oldest to newest)
  Object.values(groupedMessages).forEach((roomMessages) => {
    roomMessages.sort((a, b) => a.createdAt - b.createdAt);
  });

  // Sort rooms by the newest message's createdAt
  const sortedRooms = Object.entries(groupedMessages).sort(
    ([, messagesA], [, messagesB]) =>
      messagesB[messagesB.length - 1].createdAt - messagesA[messagesA.length - 1].createdAt
  );

  const formattedPosts = sortedRooms.map(([roomId, roomMessages]) => {
    const messageStrings = roomMessages
      .filter((message: Memory) => message.entityId)
      .map((message: Memory) => {
        const entity = entities.find((entity: Entity) => entity.id === message.entityId);
        // TODO: These are okay but not great
        const userName = entity?.names[0] || 'Unknown User';
        const displayName = entity?.names[0] || 'unknown';

        return `Name: ${userName} (@${displayName} EntityID:${message.entityId})
MessageID: ${message.id}${message.content.inReplyTo ? `\nIn reply to: ${message.content.inReplyTo}` : ''}
Source: ${message.content.source}
Date: ${formatTimestamp(message.createdAt)}
Text:
${message.content.text}`;
      });

    const header = conversationHeader ? `Conversation: ${roomId.slice(-5)}\n` : '';
    return `${header}${messageStrings.join('\n\n')}`;
  });

  return formattedPosts.join('\n\n');
};

/**
 * Format messages into a string
 * @param {Object} params - The formatting parameters
 * @param {Memory[]} params.messages - List of messages to format
 * @param {Entity[]} params.entities - List of entities for name resolution
 * @returns {string} Formatted message string with timestamps and user information
 */
export const formatMessages = ({
  messages,
  entities,
}: {
  messages: Memory[];
  entities: Entity[];
}) => {
  const messageStrings = messages
    .reverse()
    .filter((message: Memory) => message.entityId)
    .map((message: Memory) => {
      const messageText = (message.content as Content).text;

      const messageActions = (message.content as Content).actions;
      const messageThought = (message.content as Content).thought;
      const formattedName =
        entities.find((entity: Entity) => entity.id === message.entityId)?.names[0] ||
        'Unknown User';

      const attachments = (message.content as Content).attachments;

      const attachmentString =
        attachments && attachments.length > 0
          ? ` (Attachments: ${attachments
              .map((media) => `[${media.id} - ${media.title} (${media.url})]`)
              .join(', ')})`
          : null;

      const messageTime = new Date(message.createdAt);
      const hours = messageTime.getHours().toString().padStart(2, '0');
      const minutes = messageTime.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;

      const timestamp = formatTimestamp(message.createdAt);

      // const shortId = message.entityId.slice(-5);

      const thoughtString = messageThought
        ? `(${formattedName}'s internal thought: ${messageThought})`
        : null;

      const timestampString = `${timeString} (${timestamp}) [${message.entityId}]`;
      const textString = messageText ? `${timestampString} ${formattedName}: ${messageText}` : null;
      const actionString =
        messageActions && messageActions.length > 0
          ? `${
              textString ? '' : timestampString
            } (${formattedName}'s actions: ${messageActions.join(', ')})`
          : null;

      // for each thought, action, text or attachment, add a new line, with text first, then thought, then action, then attachment
      const messageString = [textString, thoughtString, actionString, attachmentString]
        .filter(Boolean)
        .join('\n');

      return messageString;
    })
    .join('\n');
  return messageStrings;
};

export const formatTimestamp = (messageDate: number) => {
  const now = new Date();
  const diff = now.getTime() - messageDate;

  const absDiff = Math.abs(diff);
  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (absDiff < 60000) {
    return 'just now';
  }
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }
  return `${days} day${days !== 1 ? 's' : ''} ago`;
};

const jsonBlockPattern = /```json\n([\s\S]*?)\n```/;

/**
 * Parses key-value pairs from a simple XML structure within a given text.
 * It looks for an XML block (e.g., <response>...</response>) and extracts
 * text content from direct child elements (e.g., <key>value</key>).
 *
 * Extracted values are strings, but arrays can be parsed from comma-delimited text.
 * This function also handles knowledge tags and sources for improved RAG integration.
 *
 * @param text - The input text containing the XML structure.
 * @returns An object with key-value pairs extracted from the XML, or null if parsing fails.
 */
function parseKeyValueXml(text: string): Record<string, any> | null {
  if (!text) return null;

  try {
    const result: Record<string, any> = {};

    // Try to find a top-level XML tag first like <response>...</response>
    const topLevelRegex = /<([a-zA-Z0-9_]+)>([\s\S]*?)<\/\1>/;
    const topLevelMatch = text.match(topLevelRegex);

    // If found, extract the content inside that tag, otherwise use the whole text
    const contentToSearch = topLevelMatch ? topLevelMatch[2] : text;

    // Preserve special tags for RAG improvements
    const specialTags = ['sources', 'knowledge', 'citations'];
    specialTags.forEach((tag) => {
      const tagRegex = new RegExp(`<${tag}>([\s\S]*?)<\/${tag}>`);
      const match = text.match(tagRegex);
      if (match && match[1]) {
        result[tag] = match[1];
      }
    });

    // Process all standard tags
    const standardTagRegex = /<([a-zA-Z0-9_]+)>([\s\S]*?)<\/\1>/g;
    let match;
    while ((match = standardTagRegex.exec(contentToSearch)) !== null) {
      const key = match[1];
      const value = match[2];

      // Skip if key or value are empty, or if it's a special tag we already processed
      if (!key || value === undefined || specialTags.includes(key)) continue;

      // Special handling for arrays (comma-delimited values)
      if (
        key === 'actions' ||
        key === 'providers' ||
        (key.endsWith('s') && !specialTags.includes(key))
      ) {
        // Allow for empty array values
        if (!value.trim()) {
          result[key] = [];
        } else {
          // Split by comma and handle potential quotes around values
          const valueArray = value
            .split(',')
            .map((item) => item.trim())
            .filter((item) => item.length > 0);
          result[key] = valueArray;
        }
      } else if (key === 'simple') {
        // Convert 'true'/'false' strings to boolean values
        result[key] = value.trim().toLowerCase() === 'true';
      } else {
        // Just use the string value for other keys
        result[key] = value;
      }
    }

    // Add debug field to indicate whether knowledge was used
    if (result.text && (result.sources || result.knowledge || result.citations)) {
      result._usedKnowledge = true;

      // Log detailed information about knowledge usage
      logger.debug('XML parsing detected knowledge usage:', {
        hasSourcesTag: !!result.sources,
        hasKnowledgeTag: !!result.knowledge,
        hasCitationsTag: !!result.citations,
        responseLength: result.text?.length || 0,
      });
      if (Object.keys(result).length === 0) {
        logger.warn('No key-value pairs extracted from XML content');
        return null;
      }

      return result;
    }

    /**
     * Parses a JSON object from a given text. The function looks for a JSON block wrapped in triple backticks
     * with `json` language identifier, and if not found, it searches for an object pattern within the text.
     * It then attempts to parse the JSON string into a JavaScript object. If parsing is successful and the result
     * is an object (but not an array), it returns the object; otherwise, it tries to parse an array if the result
     * is an array, or returns null if parsing is unsuccessful or the result is neither an object nor an array.
     *
     * @param text - The input text from which to extract and parse the JSON object.
     * @returns An object parsed from the JSON string if successful; otherwise, null or the result of parsing an array.
     */
    function parseJSONObjectFromText(text: string): Record<string, any> | null {
      let jsonData = null;
      const jsonBlockMatch = text.match(jsonBlockPattern);

      try {
        if (jsonBlockMatch) {
          // Parse the JSON from inside the code block
          jsonData = JSON.parse(normalizeJsonString(jsonBlockMatch[1].trim()));
        } else {
          // Try to parse the text directly if it's not in a code block
          jsonData = JSON.parse(normalizeJsonString(text.trim()));
        }
      } catch (_e) {
        // logger.warn("Could not parse text as JSON, returning null");
        return null; // Keep null return on error
      }

      // Ensure we have a non-null object that's not an array
      if (jsonData && typeof jsonData === 'object' && !Array.isArray(jsonData)) {
        return jsonData;
      }

      // logger.warn("Could not parse text as JSON object, returning null");
      return null; // Return null if not a valid object
    }

    /**
     * Normalizes a JSON-like string by correcting formatting issues:
     * - Removes extra spaces after '{' and before '}'.
     * - Wraps unquoted values in double quotes.
     * - Converts single-quoted values to double-quoted.
     * - Ensures consistency in key-value formatting.
     * - Normalizes mixed adjacent quote pairs.
     *
     * This is useful for cleaning up improperly formatted JSON strings
     * before parsing them into valid JSON.
     *
     * @param str - The JSON-like string to normalize.
     * @returns A properly formatted JSON string.
     */

    function normalizeJsonString(str: string) {
      // Remove extra spaces after '{' and before '}'
      str = str.replace(/\{\s+/, '{').replace(/\s+\}/, '}').trim();

      // "key": unquotedValue → "key": "unquotedValue"
      str = str.replace(/("[\w\d_-]+")\s*: \s*(?!"|\[)([\s\S]+?)(?=(,\s*"|\}$))/g, '$1: "$2"');

      // "key": 'value' → "key": "value"
      str = str.replace(/"([^"]+)"\s*:\s*'([^']*)'/g, (_, key, value) => `"${key}": "${value}"`);

      // "key": someWord → "key": "someWord"
      str = str.replace(/("[\w\d_-]+")\s*:\s*([A-Za-z_]+)(?!["\w])/g, '$1: "$2"');

      return str;
    }

    type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };

    type ActionResponse = {
      like: boolean;
      retweet: boolean;
      quote?: boolean;
      reply?: boolean;
    };

    /**
     * Truncate text to fit within the character limit, ensuring it ends at a complete sentence.
     */
    function truncateToCompleteSentence(text: string, maxLength: number): string {
      if (text.length <= maxLength) {
        return text;
      }

      // Attempt to truncate at the last period within the limit
      const lastPeriodIndex = text.lastIndexOf('.', maxLength - 1);
      if (lastPeriodIndex !== -1) {
        const truncatedAtPeriod = text.slice(0, lastPeriodIndex + 1).trim();
        if (truncatedAtPeriod.length > 0) {
          return truncatedAtPeriod;
        }
      }

      // If no period, truncate to the nearest whitespace within the limit
      const lastSpaceIndex = text.lastIndexOf(' ', maxLength - 1);
      if (lastSpaceIndex !== -1) {
        const truncatedAtSpace = text.slice(0, lastSpaceIndex).trim();
        if (truncatedAtSpace.length > 0) {
          return `${truncatedAtSpace}...`;
        }
      }

      // Fallback: Hard truncate and add ellipsis
      const hardTruncated = text.slice(0, maxLength - 3).trim();
      return `${hardTruncated}...`;
    }

    /**
     * Splits a text into chunks of a specified size.
     *
     * @param content - The text to split into chunks.
     * @param chunkSize - The maximum size of each chunk.
     * @param bleed - The amount of overlap between chunks.
     * @returns An array of chunks.
     */
    async function splitChunks(content: string, chunkSize = 512, bleed = 20): Promise<string[]> {
      logger.debug('[splitChunks] Starting text split');

      const characterstoTokens = 3.5;

      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: Number(Math.floor(chunkSize * characterstoTokens)),
        chunkOverlap: Number(Math.floor(bleed * characterstoTokens)),
      });

      const chunks = await textSplitter.splitText(content);
      logger.debug('[splitChunks] Split complete:', {
        numberOfChunks: chunks.length,
        averageChunkSize: chunks.reduce((acc, chunk) => acc + chunk.length, 0) / chunks.length,
      });

      return chunks;
    }

    /**
     * Trims the provided text prompt to a specified token limit using a tokenizer model and type.
     */
    async function trimTokens(prompt: string, maxTokens: number, runtime: IAgentRuntime) {
      if (!prompt) throw new Error('Trim tokens received a null prompt');

      // if prompt is less than of maxtokens / 5, skip
      if (prompt.length < maxTokens / 5) return prompt;

      if (maxTokens <= 0) throw new Error('maxTokens must be positive');

      const tokens = await runtime.useModel(ModelType.TEXT_TOKENIZER_ENCODE, {
        prompt,
      });

      // If already within limits, return unchanged
      if (tokens.length <= maxTokens) {
        return prompt;
      }

      // Keep the most recent tokens by slicing from the end
      const truncatedTokens = tokens.slice(-maxTokens);

      // Decode back to text
      return await runtime.useModel(ModelType.TEXT_TOKENIZER_DECODE, {
        tokens: truncatedTokens,
      });
    }

    /**
     * Returns a replacer function for JSON.stringify that handles circular references.
     */
    function safeReplacer() {
      const seen = new WeakSet();
      return function (key: string, value: any) {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return '[Circular]';
          }
          seen.add(value);
        }
        return value;
      };
    }

    /**
     * Parses a string to determine its boolean equivalent.
     *
     * Recognized affirmative values: "YES", "Y", "TRUE", "T", "1", "ON", "ENABLE"
     * Recognized negative values: "NO", "N", "FALSE", "F", "0", "OFF", "DISABLE"
     *
     * @param {string | undefined | null} value - The input text to parse
     * @returns {boolean} - Returns `true` for affirmative inputs, `false` for negative or unrecognized inputs
     */
    function parseBooleanFromText(value: string | undefined | null): boolean {
      if (!value) return false;

      const affirmative = ['YES', 'Y', 'TRUE', 'T', '1', 'ON', 'ENABLE'];
      const negative = ['NO', 'N', 'FALSE', 'F', '0', 'OFF', 'DISABLE'];

      const normalizedText = value.trim().toUpperCase();

      if (affirmative.includes(normalizedText)) {
        return true;
      }
      if (negative.includes(normalizedText)) {
        return false;
      }

      // For environment variables, we'll treat unrecognized values as false
      return false;
    }

    // RAG (Retrieval Augmented Generation) Utils

    /**
     * Optimizes a set of knowledge items for large context models by applying various transformations.
     *
     * @param knowledgeItems Array of knowledge items to be optimized
     * @param query The original query string
     * @param options Configuration options for the optimization
     * @returns Optimized knowledge text formatted for the model
     */
    function optimizeKnowledgeForLLM(
      knowledgeItems: Array<{ content: { text: string }; score?: number }>,
      query: string | undefined,
      options: {
        maxItems?: number;
        maxTokens?: number;
        charsPerToken?: number;
        includeScores?: boolean;
        includeMeta?: boolean;
      } = {}
    ): string {
      const {
        maxItems = 10,
        maxTokens = 8000,
        charsPerToken = 3.5,
        includeScores = true,
        includeMeta = true,
      } = options;

      // Early exit if no knowledge items
      if (!knowledgeItems || knowledgeItems.length === 0) {
        return '';
      }

      // Limit to specified number of items
      const limitedItems = knowledgeItems.slice(0, maxItems);

      // Format the items with clear separation and structure
      const formattedItems = limitedItems
        .map((item, index) => {
          const score =
            item.score !== undefined && includeScores
              ? ` (relevance: ${item.score.toFixed(3)})`
              : '';
          return `## Source ${index + 1}${score}\n${item.content.text}`;
        })
        .join('\n\n');

      // Create the knowledge section with header
      let knowledgeText = `# Relevant Knowledge\n\n${formattedItems}`;

      // Add metadata if requested
      if (includeMeta) {
        const trimmedQuery = query ? query.substring(0, 100) : 'No query provided';
        const metaHeader = `# Knowledge Context\n- Total sources: ${limitedItems.length}\n- Query: "${trimmedQuery}"\n\n`;
        knowledgeText = metaHeader + knowledgeText;
      }

      // Check token length and truncate if necessary
      const estimatedTokens = knowledgeText.length / charsPerToken;
      if (estimatedTokens > maxTokens) {
        logger.debug(
          `RAG: Knowledge exceeds token limit (${Math.round(estimatedTokens)}), truncating to ${maxTokens} tokens`
        );
        knowledgeText = knowledgeText.slice(0, Math.floor(maxTokens * charsPerToken));
      }

      return knowledgeText;
    }

    /**
     * Analyzes the effectiveness of knowledge retrieval by comparing the query and response
     * to determine if the knowledge was actually utilized effectively.
     *
     * @param query The original query that triggered knowledge retrieval
     * @param response The LLM's response text
     * @param knowledgeItems The knowledge items that were provided to the LLM
     * @returns Analysis object with metrics and suggestions
     */
    function analyzeKnowledgeUtilization(
      query: string,
      response: string,
      knowledgeItems: Array<{ content: { text: string }; score?: number }>
    ): {
      utilizationScore: number;
      knowledgeApplied: boolean;
      suggestedImprovements?: string[];
    } {
      // Simple implementation - could be expanded with more sophisticated analysis
      const knowledgeTexts = knowledgeItems.map((item) => item.content.text.toLowerCase());
      const responseLower = response.toLowerCase();
      const queryLower = query.toLowerCase();

      // Check if knowledge content appears in the response
      let contentMatches = 0;
      for (const text of knowledgeTexts) {
        // Look for substantial phrases from the knowledge in the response
        const phrases = text.split(/[.!?\n]/).filter((phrase) => phrase.trim().length > 15);

        for (const phrase of phrases) {
          if (responseLower.includes(phrase.trim().toLowerCase())) {
            contentMatches++;
            break;
          }
        }
      }

      // Calculate utilization score (0-1)
      const utilizationScore =
        knowledgeItems.length > 0
          ? Math.min(1, contentMatches / Math.min(3, knowledgeItems.length))
          : 0;

      // Determine if knowledge was meaningfully applied
      const knowledgeApplied = utilizationScore > 0.3;

      // Generate improvement suggestions
      const suggestedImprovements: string[] = [];

      if (utilizationScore < 0.3) {
        suggestedImprovements.push(
          'Knowledge retrieval appears ineffective - consider refining the query or knowledge base'
        );
      }

      if (knowledgeItems.length === 0) {
        suggestedImprovements.push(
          'No knowledge items were retrieved - knowledge base may be missing relevant information'
        );
      }

      logger.debug(
        `RAG Analysis: Utilization score ${utilizationScore.toFixed(2)}, knowledge applied: ${knowledgeApplied}`
      );

      return {
        utilizationScore,
        knowledgeApplied,
        suggestedImprovements: suggestedImprovements.length > 0 ? suggestedImprovements : undefined,
      };
    }

    // UUID Utils

    const uuidSchema = z.string().uuid() as z.ZodType<UUID>;

    /**
     * Validates a UUID value.
     *
     * @param {unknown} value - The value to validate.
     * @returns {UUID | null} Returns the validated UUID value or null if validation fails.
     */
    function validateUuid(value: unknown): UUID | null {
      const result = uuidSchema.safeParse(value);
      return result.success ? result.data : null;
    }

    /**
     * Converts a string or number to a UUID.
     *
     * @param {string | number} target - The string or number to convert to a UUID.
     * @returns {UUID} The UUID generated from the input target.
     * @throws {TypeError} Throws an error if the input target is not a string.
     */
    function stringToUuid(target: string | number): UUID {
      if (typeof target === 'number') {
        target = (target as number).toString();
      }

      if (typeof target !== 'string') {
        throw TypeError('Value must be string');
      }

      const _uint8ToHex = (ubyte: number): string => {
        const first = ubyte >> 4;
        const second = ubyte - (first << 4);
        const HEX_DIGITS = '0123456789abcdef'.split('');
        return HEX_DIGITS[first] + HEX_DIGITS[second];
      };

      const _uint8ArrayToHex = (buf: Uint8Array): string => {
        let out = '';
        for (let i = 0; i < buf.length; i++) {
          out += _uint8ToHex(buf[i]);
        }
        return out;
      };

      const escapedStr = encodeURIComponent(target);
      const buffer = new Uint8Array(escapedStr.length);
      for (let i = 0; i < escapedStr.length; i++) {
        buffer[i] = escapedStr[i].charCodeAt(0);
      }

      const hash = sha1(buffer);
      const hashBuffer = new Uint8Array(hash.length / 2);
      for (let i = 0; i < hash.length; i += 2) {
        hashBuffer[i / 2] = Number.parseInt(hash.slice(i, i + 2), 16);
      }

      return `${_uint8ArrayToHex(hashBuffer.slice(0, 4))}-${_uint8ArrayToHex(hashBuffer.slice(4, 6))}-${_uint8ToHex(hashBuffer[6] & 0x0f)}${_uint8ToHex(hashBuffer[7])}-${_uint8ToHex((hashBuffer[8] & 0x3f) | 0x80)}${_uint8ToHex(hashBuffer[9])}-${_uint8ArrayToHex(hashBuffer.slice(10, 16))}` as UUID;
    }

    /**
     * Gets the base URL for a provider API.
     *
     * @param {IAgentRuntime} runtime - The agent runtime instance
     * @param {string} provider - The provider name (e.g., 'redpill', 'openai')
     * @param {string} defaultBaseURL - The default base URL to use for the provider
     * @returns {string} The base URL for the provider API
     */

    // Placeholder function until all LLM plugins are fixed and published
    function getProviderBaseURL(
      runtime: IAgentRuntime,
      provider: string,
      defaultBaseURL: string
    ): string {
      return defaultBaseURL;
    }
  } catch (error) {
    logger.error('Error in parseKeyValueXml:', { error });
    return null;
  }
}

// -----------------------------------------------------------------------------
// RAG Utilities
// -----------------------------------------------------------------------------

/**
 * Utilities for Retrieval Augmented Generation (RAG) in Eliza
 */

// Local type definition to match EnhancedMetadata from plugin-bootstrap
// This avoids cross-package import issues in monorepo
export type EnhancedMetadata = {
  source?: string;
  title?: string;
  section?: string;
  [key: string]: any;
};

// Function to extract significant phrases for utilization analysis
export const extractSignificantPhrases = (text: string): string[] => {
  const sentences = text.split(/(?<=[.!?])\s+/);
  return sentences
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 5)
    .map((s) => {
      const words = s.split(/\s+/);
      if (words.length > 7) {
        const mid = Math.floor(words.length / 2);
        return words.slice(mid - 2, mid + 3).join(' ');
      }
      return s;
    });
};

/**
 * Optimizes knowledge items for large language models by formatting them
 * in a structured way that's easier for models to understand.
 *
 * @param items - Array of knowledge items to optimize
 * @param query - Original user query for context
 * @returns Formatted knowledge text optimized for LLM understanding
 */
export function optimizeKnowledgeForLLM(items: KnowledgeItem[], query: string): string {
  if (!items || items.length === 0) {
    return '';
  }

  // Sort knowledge items by relevance (if score is available)
  const sortedItems = [...items].sort((a, b) => {
    // Note: score may not be present on all KnowledgeItems
    const scoreA = (a as any).score !== undefined ? (a as any).score : 0;
    // Note: score may not be present on all KnowledgeItems
    const scoreB = (b as any).score !== undefined ? (b as any).score : 0;
    return scoreB - scoreA;
  });

  // Create XML-structured format for knowledge context
  let formattedKnowledge = `<query>${query}</query>\n\n<knowledge_items>\n`;

  sortedItems.forEach((item, index) => {
    const source = item.metadata?.source || 'Unknown';
    // Type assertion to EnhancedMetadata for title/section access
    const enhancedMetadata = item.metadata as EnhancedMetadata;
    const title = enhancedMetadata?.title || '';
    const section = enhancedMetadata?.section ? ` (${enhancedMetadata.section})` : '';
    // Note: score may not be present on all KnowledgeItems
    const relevance = (item as any).score !== undefined ? (item as any).score.toFixed(4) : 'N/A';

    formattedKnowledge += `<knowledge item="${index + 1}">\n`;
    formattedKnowledge += `<content>${item.content}</content>\n`;
    formattedKnowledge += `<source>${source}${title ? ` - ${title}` : ''}${section}</source>\n`;
    formattedKnowledge += `<relevance>${relevance}</relevance>\n`;
    formattedKnowledge += '</knowledge>\n\n';
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
 * Analyzes how effectively the LLM utilized provided knowledge in its response
 * and returns metrics about the knowledge utilization.
 *
 * @param response - The LLM's response to analyze
 * @param items - The knowledge items that were provided to the LLM
 * @param query - The original user query
 * @returns Analysis object with utilization metrics
 */
export function analyzeKnowledgeUtilization(
  response: string,
  items: KnowledgeItem[],
  query: string
): {
  knowledgeUsed: boolean;
  citationsIncluded: boolean;
  confidence: number;
  topItemId?: string;
} {
  if (!response || !items || items.length === 0) {
    return {
      knowledgeUsed: false,
      citationsIncluded: false,
      confidence: 0,
    };
  }

  // Normalize text for comparison
  const normalizedResponse = response.toLowerCase();

  // Check for citation markers
  const hasCitations =
    normalizedResponse.includes('source:') ||
    normalizedResponse.includes('reference:') ||
    normalizedResponse.includes('according to') ||
    normalizedResponse.includes('citation');

  // Track if any knowledge was used and which item had the most matching phrases
  let knowledgeUsed = false;
  let maxMatchCount = 0;
  let topItemIndex = -1;

  // Define extractSignificantPhrases locally to ensure it's callable
  function extractSignificantPhrases(text: string): string[] {
    // Simple implementation to extract phrases - this can be refined later
    return text.split(/[.,\n\s]+/).filter((phrase) => phrase.length > 3);
  }

  // Check each knowledge item for usage in response
  items.forEach((item, index) => {
    if (!item.content) return;

    // Use the local function to extract phrases
    const contentText =
      typeof item.content === 'string'
        ? item.content
        : item.content && typeof item.content.text === 'string'
          ? item.content.text
          : '';
    const significantPhrases = extractSignificantPhrases(contentText.toLowerCase());

    // Count how many phrases from this item appear in the response
    const matchCount = significantPhrases.filter((phrase) =>
      normalizedResponse.includes(phrase)
    ).length;

    // If we found any matches, knowledge was used
    if (matchCount > 0) {
      knowledgeUsed = true;

      // Track which item had the most matches
      if (matchCount > maxMatchCount) {
        maxMatchCount = matchCount;
        topItemIndex = index;
      }
    }
  });

  // Calculate confidence score (0-1) based on matches and citations
  const matchConfidence = maxMatchCount > 0 ? Math.min(1, maxMatchCount / 3) : 0;
  const citationBonus = hasCitations ? 0.2 : 0;
  const confidence = Math.min(1, matchConfidence + citationBonus);

  return {
    knowledgeUsed,
    citationsIncluded: hasCitations,
    confidence,
    topItemId: topItemIndex >= 0 ? items[topItemIndex].id : undefined,
  };
}

/**
 * Parses XML structure in LLM responses, useful for extracting
 * structured information from RAG-enhanced responses.
 *
 * @param text - Text containing XML to parse
 * @param tagName - XML tag to extract (optional)
 * @returns Extracted content or object structure
 */
export function parseXmlContent(
  text: string,
  tagName?: string
): string | Record<string, string> | null {
  if (!text) return null;

  try {
    if (tagName) {
      // Extract content from specific tag
      const tagRegex = new RegExp(`<${tagName}>([\s\S]*?)<\/${tagName}>`, 'i');
      const match = text.match(tagRegex);
      return match ? match[1].trim() : null;
    } else {
      // Extract all tags and their content
      const result: Record<string, string> = {};
      const tagPattern = /<([a-zA-Z0-9_]+)>([\s\S]*?)<\/\1>/g;
      let match;

      while ((match = tagPattern.exec(text)) !== null) {
        const [, key, value] = match;
        if (key && value !== undefined) {
          result[key] = value.trim();
        }
      }

      return Object.keys(result).length > 0 ? result : null;
    }
  } catch (error) {
    logger.error('Error parsing XML content', { error });
    return null;
  }
}

// -----------------------------------------------------------------------------
// XML Handling
// -----------------------------------------------------------------------------

/**
 * Advanced XML response handling utilities to improve RAG integration.
 * These utilities help with generating, parsing, and validating XML responses
 * that work consistently across different LLM providers.
 */

/**
 * Extracts all XML tags and their content from a text.
 *
 * @param text - The text to extract XML tags from
 * @returns An array of objects with tagName and content properties
 */
export function extractXmlTags(text: string): Array<{ tagName: string; content: string }> {
  const tags: Array<{ tagName: string; content: string }> = [];
  const regex = /<([a-zA-Z0-9_]+)>(([\s\S]*?))<\/\1>/g;

  let match;
  while ((match = regex.exec(text)) !== null) {
    tags.push({
      tagName: match[1],
      content: match[2],
    });
  }

  return tags;
}

/**
 * Enhances the response content by emphasizing knowledge references and citing sources.
 * This helps make RAG responses more transparent about their information sources.
 *
 * @param responseText - The LLM's response text to enhance
 * @param knowledgeItems - The knowledge items used for retrieval
 * @returns Enhanced response with source citations
 */
export function enhanceResponseWithSources(
  responseText: string,
  knowledgeItems: Array<{ id: string; content: { text: string } }>
): string {
  // If no knowledge items or response, return the original
  if (!knowledgeItems?.length || !responseText) {
    return responseText;
  }

  let enhancedResponse = responseText;

  // Extract any text tag for special treatment
  const textTags = extractXmlTags(responseText).filter((tag) => tag.tagName === 'text');

  if (textTags.length > 0) {
    // We have a text tag to enhance with sources
    const originalTextContent = textTags[0].content;
    let enhancedTextContent = originalTextContent;

    // For each knowledge item, check if chunks of it appear in the response
    // and add source references
    knowledgeItems.forEach((item, index) => {
      // Split knowledge into sentences to check for partial matches
      const sentences = item.content.text.split(/(?<=[.!?])\s+/);

      sentences.forEach((sentence) => {
        if (sentence.length > 30) {
          // Only process substantial sentences
          // Check if a significant portion of the sentence appears in the response
          const sentenceWords = sentence.split(/\s+/).filter((word) => word.length > 4);

          const sentenceInResponse = sentenceWords.some((word) =>
            enhancedTextContent.toLowerCase().includes(word.toLowerCase())
          );

          if (sentenceInResponse) {
            // Add a source reference if we haven't already referenced this source
            if (!enhancedTextContent.includes(`[Source ${index + 1}]`)) {
              // Find a good location to insert the source reference
              // Prefer end of paragraphs where the knowledge is used
              const paragraphs = enhancedTextContent.split('\n');

              for (let i = 0; i < paragraphs.length; i++) {
                if (
                  sentenceWords.some((word) =>
                    paragraphs[i].toLowerCase().includes(word.toLowerCase())
                  )
                ) {
                  // Add source reference at the end of this paragraph
                  paragraphs[i] = paragraphs[i] + ` [Source ${index + 1}]`;
                  enhancedTextContent = paragraphs.join('\n');
                  break;
                }
              }
            }
          }
        }
      });
    });

    // If we modified the text content, update the response
    if (enhancedTextContent !== originalTextContent) {
      enhancedResponse = responseText.replace(
        `<text>${originalTextContent}</text>`,
        `<text>${enhancedTextContent}</text>`
      );

      // Add a sources section if not already present
      if (!enhancedResponse.includes('<sources>')) {
        const sourcesText = knowledgeItems
          .map((item, index) => `[Source ${index + 1}]: ${item.content.text.substring(0, 100)}...`)
          .join('\n');

        enhancedResponse = enhancedResponse.replace(
          '</text>',
          '</text>\n<sources>\n' + sourcesText + '\n</sources>'
        );
      }
    }
  }

  return enhancedResponse;
}

/**
 * Validates that an XML response contains required tags and follows expected format.
 *
 * @param xml - The XML response to validate
 * @param requiredTags - Array of tag names that must be present
 * @returns Object with validation result and any error messages
 */
export function validateXmlResponse(
  xml: string,
  requiredTags: string[] = ['thought', 'text']
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check for malformed XML (unclosed tags, etc.)
  const openingTags: Record<string, number> = {};
  const closingTags: Record<string, number> = {};

  for (const tag of requiredTags) {
    const openRegex = new RegExp(`<${tag}>`, 'g');
    const closeRegex = new RegExp(`</${tag}>`, 'g');

    openingTags[tag] = (xml.match(openRegex) || []).length;
    closingTags[tag] = (xml.match(closeRegex) || []).length;

    if (openingTags[tag] === 0) {
      errors.push(`Missing required tag: <${tag}>`);
    }

    if (openingTags[tag] !== closingTags[tag]) {
      errors.push(
        `Mismatched tags for <${tag}>: ${openingTags[tag]} opening and ${closingTags[tag]} closing tags`
      );
    }
  }

  // Check for correct nesting
  const extractedTags = extractXmlTags(xml);
  const foundTags = new Set(extractedTags.map((t) => t.tagName));

  for (const tag of requiredTags) {
    if (!foundTags.has(tag)) {
      errors.push(`Required tag <${tag}> not properly formatted or nested`);
    }
  }

  // Log any errors for debugging
  if (errors.length > 0) {
    logger.warn(`XML validation errors detected:`, { errors, xml: xml.substring(0, 500) });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Formats a prompt with knowledge context in a way that's optimized for RAG.
 * This ensures the knowledge is properly formatted and emphasized in the prompt.
 *
 * @param prompt - The base prompt to enhance
 * @param knowledge - The knowledge context to add
 * @returns Enhanced prompt with knowledge formatted for better RAG performance
 */
export function formatPromptWithKnowledge(prompt: string, knowledge: string): string {
  // Only process if we have knowledge to add
  if (!knowledge) {
    return prompt;
  }

  // Look for special markers in the prompt where knowledge should be inserted
  if (prompt.includes('{{KNOWLEDGE}}')) {
    return prompt.replace('{{KNOWLEDGE}}', knowledge);
  }

  // If no markers found, append knowledge in a structured way
  // First, try to find an XML tag where knowledge would fit best
  const contextTags = ['context', 'background', 'user-query'];

  for (const tag of contextTags) {
    const match = new RegExp(`<${tag}>(([\s\S]*?))<\/${tag}>`).exec(prompt);
    if (match) {
      // Insert knowledge after this tag
      const insertPosition = match.index + match[0].length;
      let enhancedPrompt = [
        prompt.slice(0, insertPosition),
        '\n\n',
        knowledge,
        prompt.slice(insertPosition),
      ].join('');
      return enhancedPrompt;
    }
  }

  // If no suitable tags found, append to the end of the prompt with a clear separator
  return `${prompt}\n\n--- RELEVANT KNOWLEDGE ---\n${knowledge}`;
}

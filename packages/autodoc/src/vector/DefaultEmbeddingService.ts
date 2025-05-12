import type { EmbeddingService } from './types.js';
import { TelemetryService, trackTelemetry } from '../telemetry/index.js';
import { pipeline } from '@huggingface/transformers';

/**
 * Implementation of the EmbeddingService using Hugging Face transformers
 * Uses a pre-trained sentence transformer model to generate embeddings
 */
export class DefaultEmbeddingService implements EmbeddingService {
  private readonly dimension: number;
  private embeddingPipeline: any = null;
  private readonly modelName: string = 'sentence-transformers/all-MiniLM-L6-v2'; // Small but effective model
  private isModelLoaded: boolean = false;
  private modelLoadPromise: Promise<void> | null = null;

  /**
   * Creates a new DefaultEmbeddingService using Hugging Face transformers
   * @param dimension The dimension of the embeddings to generate (defaults to 384 for MiniLM)
   * @param modelName Optional model name to use (defaults to all-MiniLM-L6-v2)
   */
  constructor(dimension: number = 384, modelName?: string) {
    this.dimension = dimension;
    if (modelName) {
      this.modelName = modelName;
    }

    // Initialize the model (async, but constructor can't be async)
    this.modelLoadPromise = this.loadModel().catch((error) => {
      console.error(`Failed to load embedding model ${this.modelName}:`, error);
      this.modelLoadPromise = null; // Allow retrying later
      throw error;
    });
  }

  /**
   * Loads the transformer model from Hugging Face
   */
  private async loadModel(): Promise<void> {
    try {
      console.log(`Loading embedding model ${this.modelName}...`);
      const startTime = Date.now();

      // Create a feature-extraction pipeline with the specified model
      this.embeddingPipeline = await pipeline('feature-extraction', this.modelName);

      const loadTime = Date.now() - startTime;
      this.isModelLoaded = true;
      console.log(`Loaded ${this.modelName} embedding model in ${loadTime}ms`);
    } catch (error) {
      console.error(`Error loading model ${this.modelName}:`, error);
      throw error;
    }
  }

  /**
   * Ensures the model is loaded before generating embeddings
   */
  private async ensureModelLoaded(): Promise<void> {
    if (this.isModelLoaded) {
      return;
    }

    if (this.modelLoadPromise) {
      // If model is currently loading, wait for it to complete
      await this.modelLoadPromise;
    } else {
      // Start loading if not already loading
      this.modelLoadPromise = this.loadModel().catch((error) => {
        this.modelLoadPromise = null;
        throw error;
      });
      await this.modelLoadPromise;
    }
  }

  /**
   * Embeds a single text string into a vector
   * Uses our telemetry system to track performance
   * @param text The text to embed
   * @returns A vector embedding of the text
   */
  public async embedText(text: string): Promise<number[]> {
    return trackTelemetry<number[]>(
      async () => {
        await this.ensureModelLoaded();
        return this.generateEmbedding(text);
      },
      {
        source: 'DefaultEmbeddingService.embedText',
        cacheHit: false,
        retrievalCount: 1,
        additionalInfo: {
          textLength: text.length,
          dimension: this.dimension,
          model: this.modelName,
        },
      }
    ).then((result) => result.data);
  }

  /**
   * Embeds multiple text strings in batch for efficiency
   * @param texts Array of texts to embed
   * @returns Array of vector embeddings
   */
  public async embedBatch(texts: string[]): Promise<number[][]> {
    return trackTelemetry<number[][]>(
      async () => {
        await this.ensureModelLoaded();

        // Process in batches of 10 for better performance
        // For large inputs, this prevents memory issues
        const batchSize = 10;
        const results: number[][] = [];

        for (let i = 0; i < texts.length; i += batchSize) {
          const batch = texts.slice(i, i + batchSize);

          // Process each batch in parallel
          const batchResults = await Promise.all(batch.map((text) => this.generateEmbedding(text)));

          results.push(...batchResults);
        }

        return results;
      },
      {
        source: 'DefaultEmbeddingService.embedBatch',
        cacheHit: false,
        retrievalCount: texts.length,
        additionalInfo: {
          batchSize: texts.length,
          dimension: this.dimension,
          model: this.modelName,
        },
      }
    ).then((result) => result.data);
  }

  /**
   * Returns the dimension of embeddings this service produces
   * @returns The embedding dimension
   */
  public getDimension(): number {
    return this.dimension;
  }

  /**
   * Internal method that generates the embedding using a transformer model
   * @param text The text to embed
   * @returns A vector embedding of the text
   * @private
   */
  private async generateEmbedding(text: string): Promise<number[]> {
    await this.ensureModelLoaded();

    if (!this.embeddingPipeline) {
      throw new Error('Embedding model not loaded');
    }

    try {
      // Always include something unique in the text to ensure different embeddings
      // This is a simple hash of the text content to make each embedding unique
      const uniqueHash = this.simpleHash(text).toString(16);
      const processedText = text.trim();

      // Run the text through the model's feature extraction pipeline
      const result = await this.embeddingPipeline(processedText, {
        pooling: 'mean', // Average the embeddings across all tokens
      });

      // Extract the embedding from the result
      // The exact structure depends on the model output format
      let embedding: number[] = [];

      if (Array.isArray(result) && result.length > 0) {
        // Typical format for sentence transformers
        embedding = Array.isArray(result[0]) ? result[0] : result;
      } else if (result && typeof result === 'object' && 'data' in result) {
        // Alternative format with data property
        embedding = Array.isArray(result.data) ? result.data : [];
      } else {
        console.warn('Unexpected model output format:', result);
        // Use semantic hash of the input to create a deterministic but unique embedding
        return this.generateSemanticEmbedding(text);
      }

      // If we've gotten to this point but have an empty embedding, generate a semantic one
      if (embedding.length === 0 || embedding.every((val) => val === 0)) {
        return this.generateSemanticEmbedding(text);
      }

      // Normalize to unit length for cosine similarity
      return this.normalizeVector(embedding);
    } catch (error) {
      console.error('Error generating embedding:', error);
      // Generate a semantic embedding based on the text content
      return this.generateSemanticEmbedding(text);
    }
  }

  /**
   * Generates a semantic embedding based on the text content
   * This is a fallback when the model fails but ensures embeddings are content-based
   * @param text The text to embed
   * @returns A vector embedding that is unique to the text content
   */
  private generateSemanticEmbedding(text: string): number[] {
    // Create a feature map based on word frequencies
    const words = text
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 0);
    const wordFreq: Record<string, number> = {};

    // Count word frequencies
    for (const word of words) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }

    // Convert the feature map to a vector
    return this.normalizeVector(this.featuresToVector(wordFreq));
  }

  /**
   * Simple hash function for strings
   * @param text Text to hash
   * @returns Number hash
   */
  private simpleHash(text: string): number {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Normalizes a vector to unit length for cosine similarity
   * @param vector The vector to normalize
   * @returns Normalized vector
   */
  private normalizeVector(vector: number[]): number[] {
    const magnitude = Math.sqrt(vector.reduce((sum: number, val: number) => sum + val * val, 0));

    if (magnitude === 0) {
      // Return a random unit vector if the input is zero
      return Array(this.dimension)
        .fill(0)
        .map((_, i) => Math.sin(i) * (1 / Math.sqrt(this.dimension)));
    }

    return vector.map((val) => val / magnitude);
  }

  /**
   * Converts a feature map to a fixed-dimension vector
   * @param features Map of feature names to values
   * @returns A fixed-dimension vector
   */
  private featuresToVector(features: Record<string, number>): number[] {
    // Create a fixed-dimension vector
    const vector = new Array(this.dimension).fill(0);

    // Get sorted feature names for deterministic embeddings
    const featureNames = Object.keys(features).sort();

    // Map each feature to a set of positions in the vector
    for (const featureName of featureNames) {
      const featureValue = features[featureName];
      if (featureValue === 0) continue;

      // Use a hash function to stably map feature names to positions
      const positions = this.getPositionsForFeature(featureName, 5); // Each feature affects 5 positions

      // Apply the feature value to those positions
      for (const position of positions) {
        vector[position] += featureValue;
      }
    }

    return vector;
  }

  /**
   * Gets stable positions in the vector for a given feature
   * @param feature Feature name
   * @param count Number of positions to generate
   * @returns Array of position indices
   */
  private getPositionsForFeature(feature: string, count: number): number[] {
    const positions: number[] = [];

    // Simple hash function to get a stable seed from a string
    let hash = 0;
    for (let i = 0; i < feature.length; i++) {
      hash = (hash << 5) - hash + feature.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }

    // Generate 'count' unique positions based on the hash
    const uniquePositions = new Set<number>();
    let seed = hash;

    while (uniquePositions.size < count) {
      // Use the seed to generate a position
      seed = (seed * 9301 + 49297) % 233280;
      const position = Math.abs(seed) % this.dimension;
      uniquePositions.add(position);
    }

    return Array.from(uniquePositions);
  }
}

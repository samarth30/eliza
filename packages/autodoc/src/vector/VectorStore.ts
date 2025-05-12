import { TelemetryService, trackTelemetry } from '../telemetry/index.js';
import type {
  Document,
  EmbeddedDocument,
  EmbeddingService,
  QueryOptions,
  ScoredDocument,
  SearchResults,
  VectorStoreConfig,
} from './types.js';
import { CacheOperation } from './types.js';

/**
 * VectorStore implementation using dual embeddings approach
 * Uses separate embeddings for titles and content to optimize retrieval performance
 */
export class VectorStore {
  private documents: Map<string, EmbeddedDocument> = new Map();
  private readonly config: Required<VectorStoreConfig>;
  private readonly embeddingService: EmbeddingService;
  private readonly telemetry = TelemetryService.getInstance();

  /**
   * Creates a new VectorStore instance
   * @param embeddingService The service to use for generating embeddings
   * @param config Configuration options for the vector store
   */
  constructor(embeddingService: EmbeddingService, config: VectorStoreConfig) {
    this.embeddingService = embeddingService;

    // Prepare configuration with defaults
    const defaultConfig: Required<VectorStoreConfig> = {
      embeddingDimension: embeddingService.getDimension(),
      similarityThreshold: 0.7,
      maxResults: 5,
      storageType: 'memory',
      storagePath: './vector-store',
    };

    // Merge with user-provided config, ensuring embedding dimension is validated
    const userConfig = { ...config };

    // Set the merged configuration
    this.config = { ...defaultConfig, ...userConfig };

    // Validate embedding dimension compatibility
    if (this.config.embeddingDimension !== embeddingService.getDimension()) {
      console.warn(
        `Warning: VectorStore configured for ${this.config.embeddingDimension} dimensions, ` +
          `but EmbeddingService produces ${embeddingService.getDimension()} dimensions. ` +
          `Using ${embeddingService.getDimension()} dimensions.`
      );
      this.config.embeddingDimension = embeddingService.getDimension();
    }
  }

  /**
   * Gets the number of documents in the store
   */
  public size(): number {
    return this.documents.size;
  }

  /**
   * Adds a document to the vector store
   * @param document The document to add
   */
  public async addDocument(document: Document): Promise<void> {
    return trackTelemetry<void>(
      async () => {
        // Generate embeddings for both title and content
        const [titleEmbedding, contentEmbedding] = await Promise.all([
          this.embeddingService.embedText(document.title),
          this.embeddingService.embedText(document.content),
        ]);

        // Create the embedded document
        const embeddedDocument: EmbeddedDocument = {
          ...document,
          titleEmbedding,
          contentEmbedding,
          updatedAt: new Date(),
        };

        // Store the document
        this.documents.set(document.id, embeddedDocument);
      },
      {
        source: 'VectorStore.addDocument',
        cacheHit: false,
        retrievalCount: 0,
        additionalInfo: {
          documentId: document.id,
          operation: CacheOperation.UPDATE,
        },
      }
    ).then((result) => result.data);
  }

  /**
   * Adds multiple documents to the vector store in batch
   * @param documents Array of documents to add
   */
  public async addDocuments(documents: Document[]): Promise<void> {
    return trackTelemetry<void>(
      async () => {
        // Process documents in batches to avoid overwhelming the embedding service
        const titles = documents.map((doc) => doc.title);
        const contents = documents.map((doc) => doc.content);

        // Get embeddings for all titles and contents
        const [titleEmbeddings, contentEmbeddings] = await Promise.all([
          this.embeddingService.embedBatch(titles),
          this.embeddingService.embedBatch(contents),
        ]);

        // Create embedded documents
        for (let i = 0; i < documents.length; i++) {
          const embeddedDocument: EmbeddedDocument = {
            ...documents[i],
            titleEmbedding: titleEmbeddings[i],
            contentEmbedding: contentEmbeddings[i],
            updatedAt: new Date(),
          };

          this.documents.set(documents[i].id, embeddedDocument);
        }
      },
      {
        source: 'VectorStore.addDocuments',
        cacheHit: false,
        retrievalCount: 0,
        additionalInfo: {
          batchSize: documents.length,
          operation: CacheOperation.UPDATE,
        },
      }
    ).then((result) => result.data);
  }

  /**
   * Gets a document from the store by its ID
   * @param id The document ID
   */
  public getDocument(id: string): Document | null {
    const doc = this.documents.get(id);
    if (!doc) return null;

    // Return a copy without the embeddings
    const { titleEmbedding, contentEmbedding, ...document } = doc;
    return document;
  }

  /**
   * Removes a document from the store
   * @param id The document ID to remove
   */
  public removeDocument(id: string): boolean {
    const had = this.documents.has(id);
    this.documents.delete(id);

    if (had) {
      this.telemetry.recordMetrics({
        latencyMs: 0,
        cacheHit: false,
        retrievalCount: 0,
        source: 'VectorStore.removeDocument',
        timestamp: Date.now(),
        additionalInfo: {
          documentId: id,
          operation: CacheOperation.DELETE,
        },
      });
    }

    return had;
  }

  /**
   * Searches for documents similar to the query text
   * Uses the dual embedding approach to match against titles or content
   *
   * @param query The query text to search for
   * @param options Search options
   */
  public async search(query: string, options: QueryOptions = {}): Promise<SearchResults> {
    const startTime = performance.now();

    try {
      // Set default options
      const searchOptions: Required<QueryOptions> = {
        topK: options.topK || this.config.maxResults,
        filterFn: options.filterFn || (() => true),
        searchMode: options.searchMode || 'combined',
        combinedWeights: options.combinedWeights || { title: 0.3, content: 0.7 },
      };

      // Generate embeddings for the query
      const queryEmbedding = await this.embeddingService.embedText(query);

      // Calculate scores for each document based on search mode
      const scoredDocs: ScoredDocument[] = [];

      for (const [id, doc] of this.documents.entries()) {
        // Apply filter function
        const { titleEmbedding, contentEmbedding, ...document } = doc;
        if (!searchOptions.filterFn(document)) continue;

        let score: number = 0;
        let matchedOn: 'title' | 'content' | 'combined' = 'combined';

        switch (searchOptions.searchMode) {
          case 'title':
            score = this.cosineSimilarity(queryEmbedding, doc.titleEmbedding);
            matchedOn = 'title';
            break;

          case 'content':
            score = this.cosineSimilarity(queryEmbedding, doc.contentEmbedding);
            matchedOn = 'content';
            break;

          case 'combined':
          default:
            const titleScore = this.cosineSimilarity(queryEmbedding, doc.titleEmbedding);
            const contentScore = this.cosineSimilarity(queryEmbedding, doc.contentEmbedding);

            // Weighted combination of scores
            score =
              titleScore * searchOptions.combinedWeights.title +
              contentScore * searchOptions.combinedWeights.content;
            matchedOn = 'combined';
        }

        // Only include documents above the similarity threshold
        if (score >= this.config.similarityThreshold) {
          scoredDocs.push({
            document,
            score,
            matchedOn,
          });
        }
      }

      // Sort by score (descending) and take top results
      const results = scoredDocs.sort((a, b) => b.score - a.score).slice(0, searchOptions.topK);

      const endTime = performance.now();
      const latencyMs = endTime - startTime;

      // Prepare telemetry data
      this.telemetry.recordMetrics({
        latencyMs,
        cacheHit: false,
        retrievalCount: results.length,
        source: 'VectorStore.search',
        timestamp: Date.now(),
        additionalInfo: {
          query,
          searchMode: searchOptions.searchMode,
          resultsCount: results.length,
          totalDocuments: this.documents.size,
        },
      });

      // Return search results with telemetry
      return {
        results,
        telemetry: {
          latencyMs,
          matchCount: results.length,
          totalDocuments: this.documents.size,
          query,
          timestamp: Date.now(),
        },
      };
    } catch (error) {
      const endTime = performance.now();
      const latencyMs = endTime - startTime;

      // Record error in telemetry
      this.telemetry.recordMetrics({
        latencyMs,
        cacheHit: false,
        retrievalCount: 0,
        source: 'VectorStore.search',
        timestamp: Date.now(),
        additionalInfo: {
          query,
          error: error instanceof Error ? error.message : String(error),
        },
      });

      // Re-throw the error
      throw error;
    }
  }

  /**
   * Similarity search based on a pre-computed embedding
   * Useful when you already have an embedding and want to search with it
   */
  public async searchByEmbedding(
    embedding: number[],
    options: Omit<QueryOptions, 'searchMode'> & { targetField: 'title' | 'content' }
  ): Promise<SearchResults> {
    const startTime = performance.now();

    try {
      const { targetField, ...restOptions } = options;
      const searchOptions: Required<Omit<QueryOptions, 'searchMode' | 'combinedWeights'>> = {
        topK: restOptions.topK || this.config.maxResults,
        filterFn: restOptions.filterFn || (() => true),
      };

      // Calculate scores for each document based on the target field
      const scoredDocs: ScoredDocument[] = [];

      for (const [id, doc] of this.documents.entries()) {
        // Apply filter function
        const { titleEmbedding, contentEmbedding, ...document } = doc;
        if (!searchOptions.filterFn(document)) continue;

        // Calculate similarity based on target field
        const targetEmbedding = targetField === 'title' ? doc.titleEmbedding : doc.contentEmbedding;
        const score = this.cosineSimilarity(embedding, targetEmbedding);

        // Only include documents above the similarity threshold
        if (score >= this.config.similarityThreshold) {
          scoredDocs.push({
            document,
            score,
            matchedOn: targetField,
          });
        }
      }

      // Sort by score (descending) and take top results
      const results = scoredDocs.sort((a, b) => b.score - a.score).slice(0, searchOptions.topK);

      const endTime = performance.now();
      const latencyMs = endTime - startTime;

      // Prepare telemetry data
      this.telemetry.recordMetrics({
        latencyMs,
        cacheHit: false,
        retrievalCount: results.length,
        source: 'VectorStore.searchByEmbedding',
        timestamp: Date.now(),
        additionalInfo: {
          targetField,
          resultsCount: results.length,
          totalDocuments: this.documents.size,
        },
      });

      // Return search results with telemetry
      return {
        results,
        telemetry: {
          latencyMs,
          matchCount: results.length,
          totalDocuments: this.documents.size,
          query: `[embedding:${targetField}]`,
          timestamp: Date.now(),
        },
      };
    } catch (error) {
      const endTime = performance.now();
      const latencyMs = endTime - startTime;

      // Record error in telemetry
      this.telemetry.recordMetrics({
        latencyMs,
        cacheHit: false,
        retrievalCount: 0,
        source: 'VectorStore.searchByEmbedding',
        timestamp: Date.now(),
        additionalInfo: {
          targetField: options.targetField,
          error: error instanceof Error ? error.message : String(error),
        },
      });

      // Re-throw the error
      throw error;
    }
  }

  /**
   * Calculates the cosine similarity between two vectors
   * @param a First vector
   * @param b Second vector
   * @returns Cosine similarity score (0-1)
   * @private
   */
  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error(`Vector dimensions do not match: ${a.length} vs ${b.length}`);
    }

    // Calculate dot product
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      magnitudeA += a[i] * a[i];
      magnitudeB += b[i] * b[i];
    }

    // Properly normalize even if vectors aren't unit vectors
    const magnitudeSqrt = Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB);

    // Avoid division by zero
    if (magnitudeSqrt === 0) {
      return 0.5; // Default moderate similarity for zero vectors
    }

    // True cosine similarity calculation
    const similarity = dotProduct / magnitudeSqrt;

    // Ensure score is in range [0, 1]
    return Math.max(0, Math.min(1, similarity));
  }

  /**
   * Exports all documents as an array
   * @returns Array of documents without embeddings
   */
  public exportDocuments(): Document[] {
    return Array.from(this.documents.values()).map((doc) => {
      // Remove embeddings from exported documents
      const { titleEmbedding, contentEmbedding, ...document } = doc;
      return document;
    });
  }

  /**
   * Loads documents into the store, replacing any existing documents
   * @param documents Array of documents to load
   */
  public async loadDocuments(documents: Document[]): Promise<void> {
    // Clear existing documents
    this.documents.clear();

    // Add the new documents
    await this.addDocuments(documents);
  }
}

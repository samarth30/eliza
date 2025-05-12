import { TelemetryService, trackTelemetry } from '../telemetry/index.js';
import { DefaultEmbeddingService } from './DefaultEmbeddingService.js';
import { VectorStore } from './VectorStore.js';
import type { Document, QueryOptions, SearchResults, VectorStoreConfig } from './types.js';

/**
 * Configuration for the RAG (Retrieval Augmented Generation) service
 */
export interface RAGServiceConfig {
  /**
   * The dimension to use for embeddings
   * @default 384
   */
  embeddingDimension?: number;

  /**
   * Maximum results to return from search operations
   * @default 5
   */
  maxResults?: number;

  /**
   * Minimum similarity threshold for search results
   * @default 0.7
   */
  similarityThreshold?: number;

  /**
   * Weights for combining title and content scores
   * @default { title: 0.3, content: 0.7 }
   */
  combinedWeights?: {
    title: number;
    content: number;
  };

  /**
   * When true, enables test mode with differentiated embeddings
   * This is used for testing to generate embeddings that produce a range of similarity scores
   * @default false
   */
  testMode?: boolean;
}

/**
 * RAGService provides a simplified interface for working with the dual-embedding vector store
 * It handles all the details of embedding generation and retrieval
 */
export class RAGService {
  private readonly vectorStore: VectorStore;
  private readonly embeddingService: DefaultEmbeddingService;
  private readonly config: Required<RAGServiceConfig>;

  /**
   * Creates a new RAGService instance
   * @param config Configuration options
   */
  constructor(config: RAGServiceConfig = {}) {
    // Set default configuration values
    this.config = {
      embeddingDimension: 384,
      maxResults: 5,
      similarityThreshold: 0.7,
      combinedWeights: { title: 0.3, content: 0.7 },
      testMode: false,
      ...config,
    };

    // Create the embedding service and vector store
    this.embeddingService = new DefaultEmbeddingService(this.config.embeddingDimension);
    this.vectorStore = new VectorStore(this.embeddingService, {
      embeddingDimension: this.config.embeddingDimension,
      maxResults: this.config.maxResults,
      similarityThreshold: this.config.similarityThreshold,
      storageType: 'memory', // We're using in-memory storage for now
    });
  }

  /**
   * Adds a document to the knowledge base
   * @param document The document to add
   */
  public async addDocument(document: Document): Promise<void> {
    await this.vectorStore.addDocument(document);
  }

  /**
   * Adds multiple documents to the knowledge base
   * @param documents The documents to add
   */
  public async addDocuments(documents: Document[]): Promise<void> {
    await this.vectorStore.addDocuments(documents);
  }

  /**
   * Gets a document by its ID
   * @param id The document ID
   */
  public getDocument(id: string): Document | null {
    return this.vectorStore.getDocument(id);
  }

  /**
   * Removes a document from the knowledge base
   * @param id The document ID
   */
  public removeDocument(id: string): boolean {
    return this.vectorStore.removeDocument(id);
  }

  /**
   * Gets the total number of documents in the knowledge base
   */
  public getDocumentCount(): number {
    return this.vectorStore.size();
  }

  /**
   * Searches for documents using the query text
   * @param query The query text
   * @param options Optional search parameters
   */
  public async search(query: string, options: Partial<QueryOptions> = {}): Promise<SearchResults> {
    return trackTelemetry<SearchResults>(
      async () => {
        const searchOptions: QueryOptions = {
          topK: options.topK || this.config.maxResults,
          searchMode: options.searchMode || 'combined',
          combinedWeights: options.combinedWeights || this.config.combinedWeights,
          filterFn: options.filterFn,
        };

        return this.vectorStore.search(query, searchOptions);
      },
      {
        source: 'RAGService.search',
        cacheHit: false,
        retrievalCount: 0, // This will be updated from the search results
        additionalInfo: {
          query,
          searchMode: options.searchMode || 'combined',
        },
      }
    ).then((result) => {
      // Update the retrieval count in the telemetry
      result.metadata.retrievalCount = result.data.results.length;
      return result.data;
    });
  }

  /**
   * Searches for documents that match the title/question
   * This is optimized for finding documents with similar titles or questions
   * @param titleQuery The title or question text to search for
   * @param options Optional search parameters
   */
  public async searchByTitle(
    titleQuery: string,
    options: Omit<QueryOptions, 'searchMode'> = {}
  ): Promise<SearchResults> {
    return this.search(titleQuery, { ...options, searchMode: 'title' });
  }

  /**
   * Searches for documents that match the content
   * This is optimized for finding documents with similar content
   * @param contentQuery The content text to search for
   * @param options Optional search parameters
   */
  public async searchByContent(
    contentQuery: string,
    options: Omit<QueryOptions, 'searchMode'> = {}
  ): Promise<SearchResults> {
    return this.search(contentQuery, { ...options, searchMode: 'content' });
  }

  /**
   * Exports all documents as an array
   * @returns Array of documents
   */
  public exportDocuments(): Document[] {
    return this.vectorStore.exportDocuments();
  }

  /**
   * Loads documents into the knowledge base, replacing any existing documents
   * @param documents Array of documents to load
   */
  public async loadDocuments(documents: Document[]): Promise<void> {
    await this.vectorStore.loadDocuments(documents);
  }
}

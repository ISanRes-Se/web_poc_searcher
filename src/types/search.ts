export interface SearchResult {
  id: string;
  title: string;
  link: string;
  snippet: string;
  displayLink?: string;
  tipo?: string;
  organismo?: string;
  dirigidoa?: string;
}

export interface SearchResponse {
  results: Array<{
    id: string;
    document: {
      id: string;
      name: string;
      structData: {
        titulo: string;
        url: string;
        tipo?: string;
        organismo?: string;
        dirigidoa?: string;
        id: string;
      };
      derivedStructData: {
        url: string;
        snippets?: Array<{
          snippet: string;
          snippet_status: string;
        }>;
        can_fetch_raw_content?: string;
        [key: string]: any;
      };
    };
  }>;
  totalSize: number;
  attributionToken?: string;
  nextPageToken?: string;
  guidedSearchResult?: any;
  summary?: any;
  sessionInfo?: {
    name: string;
    queryId: string;
  };
  queryExpansionInfo?: any;
}

export interface SearchRequest {
  query: string;
  pageSize: number;
  session: string;
  spellCorrectionSpec: {
    mode: string;
  };
  languageCode: string;
  userInfo: {
    timeZone: string;
  };
  contentSearchSpec: {
    snippetSpec: {
      returnSnippet: boolean;
    };
    relevanceThreshold: string;
  };
}

export interface AnswerRequest {
  query: {
    text: string;
    queryId: string;
  };
  session: string;
  relatedQuestionsSpec: {
    enable: boolean;
  };
  answerGenerationSpec: {
    ignoreAdversarialQuery: boolean;
    ignoreNonAnswerSeekingQuery: boolean;
    ignoreLowRelevantContent: boolean;
    multimodalSpec: {};
    includeCitations: boolean;
    promptSpec: {
      preamble: string;
    };
    answerLanguageCode: string;
    modelSpec: {
      modelVersion: string;
    };
  };
}

export interface AnswerResponse {
  answer?: {
    answerText?: string;
    citations?: Array<{
      startIndex?: number;
      endIndex?: number;
      sources?: Array<{
        referenceId?: string;
        uri?: string;
        title?: string;
      }>;
    }>;
    references?: Array<{
      document?: string;
      uri?: string;
      title?: string;
    }>;
  };
  session?: string;
  answerQueryToken?: string;
}

export interface SearchResultWithSummary {
  results: SearchResult[];
  summary?: string;
}
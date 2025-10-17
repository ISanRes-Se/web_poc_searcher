import { SearchResponse, SearchResult, AnswerResponse, SearchResultWithSummary } from '../types/search';

const EDGE_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gcp-search`;

export class SearchService {
  private getHeaders() {
    return {
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    };
  }

  async search(query: string, language: string = 'es'): Promise<SearchResultWithSummary> {
    try {
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          action: 'search',
          query,
          language
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Búsqueda fallida: ${response.status} ${response.statusText}`);
      }

      const data: SearchResponse = await response.json();
      
      const results = this.transformResults(data);
      
      // Get summary from answer API if we have sessionInfo
      let summary: string | undefined;
      if (data.sessionInfo?.queryId && data.sessionInfo?.name) {
        try {
          summary = await this.getAnswerSummary(query, data.sessionInfo.queryId, data.sessionInfo.name, language);
        } catch (error) {
          console.warn('Failed to get answer summary:', error);
          // Continue without summary if answer API fails
        }
      }
      
      return {
        results,
        summary
      };
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  private async getAnswerSummary(query: string, queryId: string, session: string, language: string = 'es'): Promise<string | undefined> {
    try {
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          action: 'answer',
          query,
          queryId,
          session,
          language
        })
      });

      if (!response.ok) {
        throw new Error(`Answer API failed: ${response.status} ${response.statusText}`);
      }

      const answerData: AnswerResponse = await response.json();
      return answerData.answer?.answerText;
    } catch (error) {
      console.error('Answer API error:', error);
      throw error;
    }
  }

  private transformResults(response: SearchResponse): SearchResult[] {
    if (!response.results) {
      return [];
    }

    return response.results.map(result => {
      // Extract snippet from derivedStructData.snippets array
      let snippet = '';
      if (result.document.derivedStructData.snippets && result.document.derivedStructData.snippets.length > 0) {
        const rawSnippet = result.document.derivedStructData.snippets[0].snippet || '';
        // Filter out the "No snippet is available" message
        if (rawSnippet && !rawSnippet.includes('No snippet is available')) {
          snippet = rawSnippet;
        }
      }

      // Use structData.url as primary, fallback to derivedStructData.url
      const url = result.document.structData.url || result.document.derivedStructData.url;

      return {
        id: result.id,
        title: result.document.structData.titulo || 'Sin título',
        link: url,
        snippet: snippet,
        displayLink: url ? new URL(url).hostname : undefined,
        tipo: result.document.structData.tipo,
        organismo: result.document.structData.organismo,
        dirigidoa: result.document.structData.dirigidoa
      };
    });
  }
}

export const searchService = new SearchService();
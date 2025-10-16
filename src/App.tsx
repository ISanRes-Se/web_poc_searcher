import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { SearchResult, SearchResultWithSummary } from './types/search';
import { searchService } from './services/searchService';
import { getTranslation, Language } from './translations';

function App() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [summary, setSummary] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('es');

  const t = getTranslation(selectedLanguage as Language);

  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    setQuery(searchQuery);

    try {
      const searchData: SearchResultWithSummary =
        await searchService.search(searchQuery, selectedLanguage);
      setResults(searchData.results);
      setSummary(searchData.summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setResults([]);
      setSummary(undefined);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t.main.heading}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.main.subheading}
          </p>
        </div>

        <SearchBar onSearch={handleSearch} loading={loading} selectedLanguage={selectedLanguage} />

        <SearchResults
          results={results}
          summary={summary}
          loading={loading}
          error={error}
          query={query}
          selectedLanguage={selectedLanguage}
        />
      </main>

      <aside className="fixed right-4 bottom-4 md:right-6 md:top-1/2 md:bottom-auto md:-translate-y-1/2 transform z-50 w-80 max-w-[90vw]">
        <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-4">
          <h3 className="text-base font-semibold text-gray-900">
            {t.assistant.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {t.assistant.description}
          </p>
          <button
            id="openSearch"
            aria-controls="gen-search-widget"
            className="mt-3 w-full px-4 py-2 bg-pink-700 hover:bg-pink-800 text-white font-semibold rounded-none"
          >
            {t.assistant.button}
          </button>
        </div>
      </aside>

      <gen-search-widget
        id="gen-search-widget"
        configid="b02ce94f-210d-4947-827b-5848b1bdc51f"
        location="eu"
        triggerid="openSearch"
        anchorstarget="_blank"
        placeholder={t.assistant.widgetPlaceholder}
      >
      </gen-search-widget>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { getTranslation, Language } from '../translations';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
  selectedLanguage: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading, selectedLanguage }) => {
  const [query, setQuery] = useState('');
  const t = getTranslation(selectedLanguage as Language);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {loading ? (
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchBar.placeholder}
          className="w-full pl-12 pr-4 py-4 text-lg text-gray-900 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md placeholder:text-gray-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute inset-y-0 right-0 pr-4 flex items-center"
        >
          <div className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-full transition-colors duration-200 disabled:cursor-not-allowed">
            {t.searchBar.button}
          </div>
        </button>
      </div>
    </form>
  );
};
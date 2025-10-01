import React from 'react';
import { ExternalLink, Globe, AlertCircle, FileText, Building, Users, Sparkles } from 'lucide-react';
import { SearchResult } from '../types/search';

interface SearchResultsProps {
  results: SearchResult[];
  summary?: string;
  loading: boolean;
  error: string | null;
  query: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, summary, loading, error, query }) => {
  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="text-red-800 font-medium">Error de Búsqueda</h3>
          </div>
          <p className="text-red-700 mt-2">{error}</p>
          <div className="mt-4 text-sm text-red-600">
            <p>Asegúrate de tener:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Configurada la variable de entorno VITE_GCLOUD_ACCESS_TOKEN</li>
              <li>Credenciales válidas de Google Cloud</li>
              <li>Configuración CORS adecuada (para producción)</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (!results.length && query) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-800 font-medium mb-2">No se encontraron resultados</h3>
          <p className="text-gray-600">Prueba con diferentes palabras clave o verifica la ortografía.</p>
        </div>
      </div>
    );
  }

  if (!results.length) {
    return null;
  }

  const getTypeIcon = (tipo: string | undefined) => {
    switch (tipo) {
      case 'procedimiento':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'tramite':
        return <FileText className="h-4 w-4 text-green-600" />;
      default:
        return <Globe className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeColor = (tipo: string | undefined) => {
    switch (tipo) {
      case 'procedimiento':
        return 'bg-blue-100 text-blue-800';
      case 'tramite':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="mb-4">
        <p className="text-gray-600 text-sm">
          Aproximadamente {results.length} resultados para <span className="font-medium">"{query}"</span>
        </p>
      </div>
      
      {summary && (
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Sparkles className="h-5 w-5 text-blue-600 mt-1" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-blue-900 mb-2">Resumen Generado por IA</h3>
              <div className="text-blue-800 leading-relaxed">
                {summary.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-2 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {results.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="flex items-center mr-3">
                    {getTypeIcon(result.tipo)}
                    <span className="text-green-700 text-sm font-medium ml-1">
                      {result.displayLink || 'egoitza.araba.eus'}
                    </span>
                  </div>
                  {result.tipo && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.tipo)}`}>
                      {result.tipo}
                    </span>
                  )}
                </div>
                
                <a
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <h3 className="text-blue-600 text-lg font-medium mb-3 group-hover:underline line-clamp-2">
                    {result.title}
                  </h3>
                </a>
                
                {result.snippet && (
                  <p 
                    className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-3"
                    dangerouslySetInnerHTML={{ __html: result.snippet }}
                  />
                )}

                <div className="space-y-2">
                  {result.organismo && (
                    <div className="flex items-start text-sm text-gray-600">
                      <Building className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{result.organismo}</span>
                    </div>
                  )}
                  {result.dirigidoa && (
                    <div className="flex items-start text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{result.dirigidoa}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <a
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                title="Abrir en nueva pestaña"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
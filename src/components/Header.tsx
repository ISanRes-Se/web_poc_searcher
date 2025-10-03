import React from 'react';
import { Globe } from 'lucide-react';

interface HeaderProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                src="/LOGO_SEIDOR.jpg"
                alt="Seidor"
                className="h-12 w-auto"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <select
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="es">Español</option>
                <option value="eu">Euskera</option>
              </select>
            </div>

            <div className="hidden md:block">
              <img
                src="/LOGO_SEIDOR.jpg"
                alt="Seidor"
                className="h-12 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
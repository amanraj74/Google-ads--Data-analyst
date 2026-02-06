import React from 'react';
import { BarChart3 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Google Ads Performance Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                90-Day Campaign Analysis & Insights
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">ToolWorld India</p>
            <p className="text-xs text-gray-600">Nov 2025 - Feb 2026</p>
          </div>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { Stethoscope } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MediScan</h1>
              <p className="text-xs text-gray-500">AI Health Assistant</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <a href="#home" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="#scan" className="text-gray-600 hover:text-blue-600 transition-colors">Health Scan</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
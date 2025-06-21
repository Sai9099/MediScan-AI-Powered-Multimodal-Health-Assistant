import React from 'react';
import { Camera, Mic, FileText, ArrowRight } from 'lucide-react';

interface HeroProps {
  onStartScan: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartScan }) => {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Health
            <span className="block text-blue-600">Assessment</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Upload images of symptoms, describe your condition by voice, or type your symptoms. 
            Our AI analyzes your input to provide instant health insights and recommendations.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Camera className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Image Upload</h3>
              <p className="text-gray-600 text-sm">Capture skin conditions, rashes, or visible symptoms</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mic className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Voice Recording</h3>
              <p className="text-gray-600 text-sm">Describe your symptoms naturally with speech</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Text Input</h3>
              <p className="text-gray-600 text-sm">Type your symptoms and medical history</p>
            </div>
          </div>
          
          <button 
            onClick={onStartScan}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center space-x-2 transition-colors transform hover:scale-105"
          >
            <span>Start Health Scan</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-yellow-800 font-medium">
              ⚠️ Medical Disclaimer: This tool is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
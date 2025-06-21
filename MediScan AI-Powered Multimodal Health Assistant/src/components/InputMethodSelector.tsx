import React from 'react';
import { Camera, Mic, FileText } from 'lucide-react';

interface InputMethodSelectorProps {
  onMethodSelect: (method: 'image' | 'voice' | 'text') => void;
}

export const InputMethodSelector: React.FC<InputMethodSelectorProps> = ({ onMethodSelect }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Input Method</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select how you'd like to describe your symptoms. Choose the method that's most convenient for you.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <button
          onClick={() => onMethodSelect('image')}
          className="group bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all transform hover:scale-105"
        >
          <div className="bg-blue-100 group-hover:bg-blue-200 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 transition-colors">
            <Camera className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload Image</h3>
          <p className="text-gray-600 mb-4">
            Take or upload photos of visible symptoms like skin conditions, rashes, wounds, or swelling.
          </p>
          <div className="text-sm text-blue-600 font-medium">
            Best for: Skin conditions, visible injuries, rashes
          </div>
        </button>

        <button
          onClick={() => onMethodSelect('voice')}
          className="group bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-xl transition-all transform hover:scale-105"
        >
          <div className="bg-green-100 group-hover:bg-green-200 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 transition-colors">
            <Mic className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Voice Recording</h3>
          <p className="text-gray-600 mb-4">
            Describe your symptoms naturally by speaking. Perfect for complex or multiple symptoms.
          </p>
          <div className="text-sm text-green-600 font-medium">
            Best for: Complex symptoms, multiple issues, detailed descriptions
          </div>
        </button>

        <button
          onClick={() => onMethodSelect('text')}
          className="group bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all transform hover:scale-105"
        >
          <div className="bg-purple-100 group-hover:bg-purple-200 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 transition-colors">
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Text Input</h3>
          <p className="text-gray-600 mb-4">
            Type your symptoms using our guided form with common symptom selection and detailed descriptions.
          </p>
          <div className="text-sm text-purple-600 font-medium">
            Best for: Precise descriptions, privacy, quiet environments
          </div>
        </button>
      </div>

      <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-xl max-w-3xl mx-auto">
        <div className="flex items-start space-x-3">
          <div className="text-yellow-600 text-xl">⚠️</div>
          <div>
            <h4 className="font-semibold text-yellow-900 mb-2">Medical Disclaimer</h4>
            <p className="text-sm text-yellow-800">
              This tool provides general health information and is not a substitute for professional medical advice, 
              diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
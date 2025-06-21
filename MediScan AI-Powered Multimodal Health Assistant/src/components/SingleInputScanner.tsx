import React, { useState } from 'react';
import { ArrowLeft, Loader2, ArrowRight } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { VoiceRecorder } from './VoiceRecorder';
import { SymptomForm } from './SymptomForm';
import { ResultsDisplay } from './ResultsDisplay';
import { UserInput, SymptomAnalysis } from '../types/medical';
import { analyzeSymptoms } from '../utils/aiAnalysis';

interface SingleInputScannerProps {
  inputMethod: 'image' | 'voice' | 'text';
  onBack: () => void;
  onChangeMethod: () => void;
}

export const SingleInputScanner: React.FC<SingleInputScannerProps> = ({ 
  inputMethod, 
  onBack, 
  onChangeMethod 
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
  const [userInput, setUserInput] = useState<UserInput>({
    text: '',
    imageFile: undefined,
    audioFile: undefined,
    timestamp: new Date()
  });

  const getMethodInfo = () => {
    switch (inputMethod) {
      case 'image':
        return {
          title: 'Upload Symptom Image',
          description: 'Take or upload a clear photo of your symptoms',
          color: 'blue'
        };
      case 'voice':
        return {
          title: 'Record Voice Description',
          description: 'Describe your symptoms by speaking',
          color: 'green'
        };
      case 'text':
        return {
          title: 'Describe Your Symptoms',
          description: 'Type your symptoms using our guided form',
          color: 'purple'
        };
    }
  };

  const methodInfo = getMethodInfo();

  const canAnalyze = () => {
    switch (inputMethod) {
      case 'image':
        return !!userInput.imageFile;
      case 'voice':
        return !!userInput.audioFile;
      case 'text':
        return userInput.text.trim().length > 0;
      default:
        return false;
    }
  };

  const handleAnalyze = async () => {
    if (!canAnalyze()) {
      alert('Please provide input before analyzing.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeSymptoms(userInput);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Error during analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartOver = () => {
    setAnalysis(null);
    setUserInput({
      text: '',
      imageFile: undefined,
      audioFile: undefined,
      timestamp: new Date()
    });
  };

  if (analysis) {
    return <ResultsDisplay analysis={analysis} onStartOver={handleStartOver} />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-${methodInfo.color}-100 text-${methodInfo.color}-800 mb-4`}>
          <span className="font-medium">{methodInfo.title}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{methodInfo.title}</h2>
        <p className="text-gray-600">{methodInfo.description}</p>
      </div>

      {/* Input Component */}
      <div className="mb-8">
        {inputMethod === 'image' && (
          <ImageUpload
            onImageSelect={(file) => setUserInput(prev => ({ ...prev, imageFile: file || undefined }))}
            selectedImage={userInput.imageFile || null}
          />
        )}

        {inputMethod === 'voice' && (
          <VoiceRecorder
            onVoiceRecorded={(audio) => setUserInput(prev => ({ ...prev, audioFile: audio || undefined }))}
            recordedAudio={userInput.audioFile || null}
          />
        )}

        {inputMethod === 'text' && (
          <SymptomForm
            onSymptomChange={(text) => setUserInput(prev => ({ ...prev, text }))}
            symptoms={userInput.text}
          />
        )}
      </div>

      {/* Analysis Section */}
      <div className="bg-white p-6 rounded-xl border-2 border-gray-200 mb-8">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Ready for Analysis?</h3>
          
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg border-2 ${
            canAnalyze() ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'
          }`}>
            <span className="font-medium text-gray-900">Input Status:</span>
            <span className={`text-sm ${canAnalyze() ? 'text-green-700' : 'text-gray-600'}`}>
              {canAnalyze() ? '✓ Ready' : 'Waiting for input'}
            </span>
          </div>

          {isAnalyzing ? (
            <div className="flex items-center justify-center space-x-3">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <span className="text-lg font-medium text-gray-900">Analyzing your symptoms...</span>
            </div>
          ) : (
            <button
              onClick={handleAnalyze}
              disabled={!canAnalyze()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-flex items-center space-x-2"
            >
              <span>Analyze Symptoms</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>

        <button
          onClick={onChangeMethod}
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Change Input Method
        </button>
      </div>
    </div>
  );
};
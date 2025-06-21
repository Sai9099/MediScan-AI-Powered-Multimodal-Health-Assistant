import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InputMethodSelector } from './components/InputMethodSelector';
import { SingleInputScanner } from './components/SingleInputScanner';

type AppView = 'home' | 'method-selection' | 'scanner';
type InputMethod = 'image' | 'voice' | 'text';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedMethod, setSelectedMethod] = useState<InputMethod | null>(null);

  const handleStartScan = () => {
    setCurrentView('method-selection');
  };

  const handleMethodSelect = (method: InputMethod) => {
    setSelectedMethod(method);
    setCurrentView('scanner');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedMethod(null);
  };

  const handleBackToMethodSelection = () => {
    setCurrentView('method-selection');
    setSelectedMethod(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {currentView === 'home' && (
        <Hero onStartScan={handleStartScan} />
      )}
      
      {currentView === 'method-selection' && (
        <InputMethodSelector onMethodSelect={handleMethodSelect} />
      )}
      
      {currentView === 'scanner' && selectedMethod && (
        <SingleInputScanner
          inputMethod={selectedMethod}
          onBack={handleBackToHome}
          onChangeMethod={handleBackToMethodSelection}
        />
      )}
    </div>
  );
}

export default App;
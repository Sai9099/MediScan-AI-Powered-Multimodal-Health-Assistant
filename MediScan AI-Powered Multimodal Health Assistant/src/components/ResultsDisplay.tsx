import React, { useState } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Clock, Pill, Home, Stethoscope, MapPin, Download, X } from 'lucide-react';
import { SymptomAnalysis, MedicalCondition } from '../types/medical';

interface ResultsDisplayProps {
  analysis: SymptomAnalysis;
  onStartOver: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ analysis, onStartOver }) => {
  const [showClinicsModal, setShowClinicsModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'medium': return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      default: return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-orange-200 bg-orange-50';
      default: return 'border-green-200 bg-green-50';
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'high': return { text: 'High Priority', color: 'text-red-800' };
      case 'medium': return { text: 'Medium Priority', color: 'text-orange-800' };
      default: return { text: 'Low Priority', color: 'text-green-800' };
    }
  };

  // Generate combined recommendations from all conditions
  const getCombinedRecommendations = () => {
    const allMedications = new Set<string>();
    const allRemedies = new Set<string>();
    const allWarnings = new Set<string>();

    analysis.possibleConditions.forEach(condition => {
      condition.medications.forEach(med => allMedications.add(med));
      condition.remedies.forEach(remedy => allRemedies.add(remedy));
      condition.seeDocitorIf.forEach(warning => allWarnings.add(warning));
    });

    return {
      medications: Array.from(allMedications),
      remedies: Array.from(allRemedies),
      warnings: Array.from(allWarnings)
    };
  };

  const combinedRecommendations = getCombinedRecommendations();

  const handleFindClinics = () => {
    setShowClinicsModal(true);
  };

  const handleSaveResults = () => {
    setShowSaveModal(true);
  };

  const downloadResults = () => {
    const resultsText = `
MediScan Health Analysis Results
Generated: ${new Date().toLocaleString()}

ANALYSIS SUMMARY:
${analysis.recommendation}
Confidence: ${analysis.confidence}%
Priority Level: ${getUrgencyText(analysis.urgencyLevel).text}

POSSIBLE CONDITIONS:
${analysis.possibleConditions.map(condition => `
• ${condition.name}: ${condition.description}
`).join('')}

COMBINED RECOMMENDATIONS:

Medications:
${combinedRecommendations.medications.map(med => `• ${med}`).join('\n')}

Home Remedies:
${combinedRecommendations.remedies.map(remedy => `• ${remedy}`).join('\n')}

See Doctor If:
${combinedRecommendations.warnings.map(warning => `• ${warning}`).join('\n')}

DISCLAIMER:
This analysis is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.
    `;

    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mediscan-results-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowSaveModal(false);
  };

  const saveToLocalStorage = () => {
    const savedResults = JSON.parse(localStorage.getItem('mediscan-results') || '[]');
    const newResult = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      analysis: analysis,
      combinedRecommendations: combinedRecommendations
    };
    savedResults.push(newResult);
    localStorage.setItem('mediscan-results', JSON.stringify(savedResults));
    alert('Results saved to browser storage!');
    setShowSaveModal(false);
  };

  const ConditionCard: React.FC<{ condition: MedicalCondition }> = ({ condition }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{condition.icon}</span>
          <div>
            <h3 className="font-semibold text-gray-900">{condition.name}</h3>
            <p className="text-sm text-gray-600">{condition.description}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          condition.urgency === 'high' ? 'bg-red-100 text-red-800' :
          condition.urgency === 'medium' ? 'bg-orange-100 text-orange-800' :
          'bg-green-100 text-green-800'
        }`}>
          {getUrgencyText(condition.urgency).text}
        </div>
      </div>
    </div>
  );

  const ClinicsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Nearby Healthcare Facilities</h3>
            <button
              onClick={() => setShowClinicsModal(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          {[
            { name: 'City General Hospital', distance: '0.8 km', type: 'Hospital', rating: '4.2', phone: '+1-555-0123' },
            { name: 'MediCare Clinic', distance: '1.2 km', type: 'Clinic', rating: '4.5', phone: '+1-555-0124' },
            { name: 'Family Health Center', distance: '1.5 km', type: 'Family Practice', rating: '4.3', phone: '+1-555-0125' },
            { name: 'Emergency Care Plus', distance: '2.1 km', type: 'Urgent Care', rating: '4.1', phone: '+1-555-0126' },
            { name: 'Wellness Medical Group', distance: '2.3 km', type: 'Medical Group', rating: '4.4', phone: '+1-555-0127' }
          ].map((clinic, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{clinic.name}</h4>
                  <p className="text-sm text-gray-600">{clinic.type}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {clinic.distance}
                    </span>
                    <span>⭐ {clinic.rating}</span>
                    <span>{clinic.phone}</span>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Get Directions
                </button>
              </div>
            </div>
          ))}
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This is a demo showing sample healthcare facilities. In a real implementation, 
              this would use your location to find actual nearby clinics and hospitals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const SaveModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Save Results</h3>
            <button
              onClick={() => setShowSaveModal(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <p className="text-gray-600">Choose how you'd like to save your health analysis results:</p>
          
          <div className="space-y-3">
            <button
              onClick={downloadResults}
              className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="h-5 w-5 text-blue-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Download as Text File</div>
                <div className="text-sm text-gray-600">Save results as a .txt file to your device</div>
              </div>
            </button>
            
            <button
              onClick={saveToLocalStorage}
              className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Save to Browser</div>
                <div className="text-sm text-gray-600">Store results locally in your browser</div>
              </div>
            </button>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Privacy Note:</strong> Your health data is kept private and secure. 
              Browser storage is local to your device only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Health Analysis Results</h2>
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border-2 ${getUrgencyColor(analysis.urgencyLevel)}`}>
          {getUrgencyIcon(analysis.urgencyLevel)}
          <span className={`font-semibold ${getUrgencyText(analysis.urgencyLevel).color}`}>
            {getUrgencyText(analysis.urgencyLevel).text}
          </span>
        </div>
      </div>

      {/* Analysis Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <AlertCircle className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">Analysis Summary</h3>
            <p className="text-gray-700 mb-4">{analysis.recommendation}</p>
            
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Confidence: {analysis.confidence}%</span>
              </div>
              
              {analysis.inputSummary.hasImage && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-gray-600">Image analyzed</span>
                </div>
              )}
              
              {analysis.inputSummary.hasVoice && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-gray-600">Voice processed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Possible Conditions */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Possible Conditions</h3>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {analysis.possibleConditions.map((condition, index) => (
            <ConditionCard key={condition.id} condition={condition} />
          ))}
        </div>
      </div>

      {/* Combined Recommendations */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Combined Treatment Recommendations</h3>
        <p className="text-gray-600 mb-6">Based on all possible conditions identified, here are the consolidated recommendations:</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Pill className="h-5 w-5 mr-2 text-blue-600" />
              Recommended Medications
            </h4>
            <ul className="space-y-2">
              {combinedRecommendations.medications.map((med, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span className="text-sm text-gray-700">{med}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Home className="h-5 w-5 mr-2 text-green-600" />
              Home Remedies
            </h4>
            <ul className="space-y-2">
              {combinedRecommendations.remedies.map((remedy, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span className="text-sm text-gray-700">{remedy}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Stethoscope className="h-5 w-5 mr-2 text-red-600" />
              See Doctor If
            </h4>
            <ul className="space-y-2">
              {combinedRecommendations.warnings.map((warning, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span className="text-sm text-gray-700">{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Important Disclaimers */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-red-900 mb-2">Important Medical Disclaimer</h4>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• This analysis is for informational purposes only</li>
              <li>• Not a substitute for professional medical advice, diagnosis, or treatment</li>
              <li>• Always consult with a qualified healthcare provider for medical concerns</li>
              <li>• Seek immediate medical attention for emergencies</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onStartOver}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Start New Analysis
        </button>
        
        <button 
          onClick={handleFindClinics}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
        >
          <MapPin className="h-4 w-4" />
          <span>Find Nearby Clinics</span>
        </button>
        
        <button 
          onClick={handleSaveResults}
          className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Save Results</span>
        </button>
      </div>

      {/* Modals */}
      {showClinicsModal && <ClinicsModal />}
      {showSaveModal && <SaveModal />}
    </div>
  );
};
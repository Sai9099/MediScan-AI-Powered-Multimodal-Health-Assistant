import React, { useState } from 'react';
import { FileText, Plus, X } from 'lucide-react';

interface SymptomFormProps {
  onSymptomChange: (symptoms: string) => void;
  symptoms: string;
}

export const SymptomForm: React.FC<SymptomFormProps> = ({ onSymptomChange, symptoms }) => {
  const [commonSymptoms] = useState([
    'Fever', 'Headache', 'Cough', 'Sore throat', 'Runny nose',
    'Body aches', 'Fatigue', 'Nausea', 'Diarrhea', 'Skin rash',
    'Difficulty breathing', 'Chest pain', 'Dizziness', 'Loss of appetite'
  ]);
  
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState('');

  const toggleSymptom = (symptom: string) => {
    const updated = selectedSymptoms.includes(symptom)
      ? selectedSymptoms.filter(s => s !== symptom)
      : [...selectedSymptoms, symptom];
    
    setSelectedSymptoms(updated);
    updateSymptomText(updated, symptoms.split('\n').filter(line => 
      !commonSymptoms.some(common => line.toLowerCase().includes(common.toLowerCase()))
    ).join('\n'));
  };

  const addCustomSymptom = () => {
    if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom.trim())) {
      const updated = [...selectedSymptoms, customSymptom.trim()];
      setSelectedSymptoms(updated);
      updateSymptomText(updated, symptoms.split('\n').filter(line => 
        !commonSymptoms.some(common => line.toLowerCase().includes(common.toLowerCase()))
      ).join('\n'));
      setCustomSymptom('');
    }
  };

  const updateSymptomText = (selected: string[], additionalText: string) => {
    const combinedText = [
      ...selected.map(s => `• ${s}`),
      additionalText.trim()
    ].filter(Boolean).join('\n');
    
    onSymptomChange(combinedText);
  };

  const handleTextAreaChange = (value: string) => {
    onSymptomChange(value);
    
    // Extract selected symptoms from textarea
    const lines = value.split('\n');
    const bulletPoints = lines
      .filter(line => line.trim().startsWith('•'))
      .map(line => line.replace('•', '').trim());
    
    setSelectedSymptoms(bulletPoints.filter(point => 
      commonSymptoms.includes(point) || !commonSymptoms.some(common => 
        common.toLowerCase() === point.toLowerCase()
      )
    ));
  };

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="h-5 w-5 text-purple-600" />
        <span className="font-medium text-gray-900">Describe Your Symptoms</span>
      </div>

      <div className="space-y-6">
        {/* Common Symptoms Selection */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Common Symptoms (Select all that apply)</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {commonSymptoms.map((symptom) => (
              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={`p-2 text-sm border rounded-lg transition-colors text-left ${
                  selectedSymptoms.includes(symptom)
                    ? 'bg-blue-100 border-blue-300 text-blue-800'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Symptom Input */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Add Custom Symptom</h4>
          <div className="flex space-x-2">
            <input
              type="text"
              value={customSymptom}
              onChange={(e) => setCustomSymptom(e.target.value)}
              placeholder="e.g., Sharp pain in left knee"
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && addCustomSymptom()}
            />
            <button
              onClick={addCustomSymptom}
              disabled={!customSymptom.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Selected Symptoms Display */}
        {selectedSymptoms.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Selected Symptoms</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                >
                  <span>{symptom}</span>
                  <button
                    onClick={() => toggleSymptom(symptom)}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Description */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Additional Details</h4>
          <textarea
            value={symptoms}
            onChange={(e) => handleTextAreaChange(e.target.value)}
            placeholder="Describe your symptoms in detail... 

For example:
• When did symptoms start?
• How severe are they (1-10 scale)?
• Any triggers or patterns you've noticed?
• Current medications or treatments tried?"
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm text-purple-800">
            <strong>Tip:</strong> The more detailed information you provide, the better our AI can analyze your symptoms and provide relevant recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};
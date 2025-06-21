import { medicalConditions } from '../data/medicalConditions';
import { UserInput, SymptomAnalysis, MedicalCondition } from '../types/medical';

export const analyzeSymptoms = async (input: UserInput): Promise<SymptomAnalysis> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const { text, imageFile, audioFile } = input;
  const searchText = text.toLowerCase();
  
  // Simple keyword matching algorithm (simulating AI analysis)
  const matchedConditions: Array<{ condition: MedicalCondition; score: number }> = [];
  
  medicalConditions.forEach(condition => {
    let score = 0;
    
    // Check symptoms match
    condition.symptoms.forEach(symptom => {
      if (searchText.includes(symptom.toLowerCase())) {
        score += 3;
      }
    });
    
    // Check condition name match
    if (searchText.includes(condition.name.toLowerCase())) {
      score += 5;
    }
    
    // Check category keywords
    const categoryKeywords = {
      respiratory: ['cough', 'cold', 'throat', 'breathing', 'chest'],
      gastrointestinal: ['stomach', 'nausea', 'vomit', 'diarrhea', 'gas'],
      dermatological: ['skin', 'rash', 'itch', 'red', 'spots'],
      neurological: ['head', 'pain', 'dizzy', 'migraine'],
      musculoskeletal: ['muscle', 'joint', 'back', 'pain', 'ache']
    };
    
    const keywords = categoryKeywords[condition.category as keyof typeof categoryKeywords] || [];
    keywords.forEach(keyword => {
      if (searchText.includes(keyword)) {
        score += 2;
      }
    });
    
    // Bonus for multimodal input
    if (imageFile && condition.category === 'dermatological') {
      score += 4;
    }
    
    if (audioFile) {
      score += 1; // Voice description adds context
    }
    
    if (score > 0) {
      matchedConditions.push({ condition, score });
    }
  });
  
  // Sort by score and take top matches
  matchedConditions.sort((a, b) => b.score - a.score);
  const topConditions = matchedConditions.slice(0, 3).map(item => item.condition);
  
  // If no matches, provide general conditions
  const finalConditions = topConditions.length > 0 
    ? topConditions 
    : medicalConditions.slice(0, 3);
  
  // Determine overall urgency
  const urgencyLevels = finalConditions.map(c => c.urgency);
  const hasHigh = urgencyLevels.includes('high');
  const hasMedium = urgencyLevels.includes('medium');
  
  const overallUrgency = hasHigh ? 'high' : hasMedium ? 'medium' : 'low';
  
  // Generate recommendation
  const recommendations = {
    low: 'Monitor symptoms and try home remedies. Consider over-the-counter medications if needed.',
    medium: 'Consider visiting a pharmacy for medication or consult with a healthcare provider if symptoms worsen.',
    high: 'Seek medical attention promptly. Contact your doctor or visit a clinic soon.'
  };
  
  const confidence = Math.min(95, Math.max(65, matchedConditions[0]?.score * 10 || 70));
  
  return {
    possibleConditions: finalConditions,
    confidence,
    urgencyLevel: overallUrgency,
    recommendation: recommendations[overallUrgency],
    inputSummary: {
      text: text || undefined,
      hasImage: !!imageFile,
      hasVoice: !!audioFile
    }
  };
};
export interface MedicalCondition {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  medications: string[];
  remedies: string[];
  seeDocitorIf: string[];
  urgency: 'low' | 'medium' | 'high';
  category: string;
  icon: string;
}

export interface SymptomAnalysis {
  possibleConditions: MedicalCondition[];
  confidence: number;
  urgencyLevel: 'low' | 'medium' | 'high';
  recommendation: string;
  inputSummary: {
    text?: string;
    hasImage: boolean;
    hasVoice: boolean;
  };
}

export interface UserInput {
  text: string;
  imageFile?: File;
  audioFile?: Blob;
  timestamp: Date;
}
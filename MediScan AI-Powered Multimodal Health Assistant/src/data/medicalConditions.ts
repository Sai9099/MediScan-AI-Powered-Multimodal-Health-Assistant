import { MedicalCondition } from '../types/medical';

export const medicalConditions: MedicalCondition[] = [
  {
    id: 'common-cold',
    name: 'Common Cold',
    description: 'Viral infection of the upper respiratory tract',
    symptoms: ['runny nose', 'sneezing', 'mild cough', 'congestion', 'mild headache'],
    medications: ['Paracetamol 500mg', 'Levocetirizine 5mg'],
    remedies: ['Steam inhalation', 'Warm fluids', 'Rest'],
    seeDocitorIf: ['Symptoms last >5 days', 'High fever develops', 'Difficulty breathing'],
    urgency: 'low',
    category: 'respiratory',
    icon: '🤧'
  },
  {
    id: 'fever',
    name: 'Fever (Mild to Moderate)',
    description: 'Elevated body temperature as immune response',
    symptoms: ['elevated temperature', 'chills', 'sweating', 'headache', 'muscle aches'],
    medications: ['Paracetamol 500-650mg every 6 hrs'],
    remedies: ['Cold compress', 'Hydration', 'Light clothing'],
    seeDocitorIf: ['>102°F (39°C)', 'Persists >3 days', 'Severe headache'],
    urgency: 'medium',
    category: 'general',
    icon: '🤒'
  },
  {
    id: 'dry-cough',
    name: 'Dry Cough',
    description: 'Non-productive cough without phlegm',
    symptoms: ['persistent dry cough', 'throat irritation', 'chest discomfort'],
    medications: ['Dextromethorphan syrup', 'Cough lozenges'],
    remedies: ['Honey + warm water', 'Steam inhalation', 'Throat gargling'],
    seeDocitorIf: ['Lasts >1 week', 'Blood in cough', 'Chest pain'],
    urgency: 'low',
    category: 'respiratory',
    icon: '😷'
  },
  {
    id: 'wet-cough',
    name: 'Wet/Phlegm Cough',
    description: 'Productive cough with mucus',
    symptoms: ['cough with phlegm', 'chest congestion', 'throat clearing'],
    medications: ['Ambroxol + Guaifenesin syrup'],
    remedies: ['Warm water', 'Steam', 'Rest'],
    seeDocitorIf: ['Shortness of breath', 'High fever', 'Green/yellow phlegm'],
    urgency: 'medium',
    category: 'respiratory',
    icon: '🧊'
  },
  {
    id: 'headache',
    name: 'Headache',
    description: 'Pain in head or neck region',
    symptoms: ['head pain', 'pressure sensation', 'sensitivity to light'],
    medications: ['Paracetamol 500mg', 'Ibuprofen 200mg'],
    remedies: ['Hydration', 'Cold compress', 'Rest in dark room'],
    seeDocitorIf: ['Severe or recurring', 'With fever', 'Vision changes'],
    urgency: 'low',
    category: 'neurological',
    icon: '🤕'
  },
  {
    id: 'body-aches',
    name: 'Body Aches',
    description: 'General muscle pain and discomfort',
    symptoms: ['muscle pain', 'joint stiffness', 'general discomfort'],
    medications: ['Paracetamol', 'Ibuprofen'],
    remedies: ['Warm bath', 'Gentle stretching', 'Rest'],
    seeDocitorIf: ['Unusual weakness', 'Persistent pain', 'Swelling'],
    urgency: 'low',
    category: 'musculoskeletal',
    icon: '🦵'
  },
  {
    id: 'sore-throat',
    name: 'Throat Infection / Sore Throat',
    description: 'Inflammation of throat tissues',
    symptoms: ['throat pain', 'difficulty swallowing', 'red throat', 'swollen glands'],
    medications: ['Throat lozenges', 'Antiseptic gargles'],
    remedies: ['Salt water gargle', 'Warm fluids', 'Honey'],
    seeDocitorIf: ['High fever', 'Pus in throat', 'Difficulty breathing'],
    urgency: 'medium',
    category: 'respiratory',
    icon: '🤒'
  },
  {
    id: 'nausea',
    name: 'Nausea / Vomiting',
    description: 'Feeling of sickness with urge to vomit',
    symptoms: ['nausea', 'vomiting', 'loss of appetite', 'weakness'],
    medications: ['Domperidone', 'ORS solution'],
    remedies: ['Small frequent meals', 'Ginger tea', 'Rest'],
    seeDocitorIf: ['Dehydration signs', 'Lasts >1 day', 'Blood in vomit'],
    urgency: 'medium',
    category: 'gastrointestinal',
    icon: '🤢'
  },
  {
    id: 'diarrhea',
    name: 'Diarrhea',
    description: 'Loose or watery stools',
    symptoms: ['loose stools', 'abdominal cramps', 'urgency', 'dehydration'],
    medications: ['ORS', 'Probiotics', 'Racecadotril'],
    remedies: ['Hydration', 'BRAT diet', 'Rest'],
    seeDocitorIf: ['Blood in stool', '>2 days', 'Severe dehydration'],
    urgency: 'medium',
    category: 'gastrointestinal',
    icon: '💩'
  },
  {
    id: 'skin-rash',
    name: 'Skin Rash / Itching',
    description: 'Skin irritation with redness and itching',
    symptoms: ['red patches', 'itching', 'skin irritation', 'possible swelling'],
    medications: ['Cetirizine', 'Calamine lotion', 'Hydrocortisone cream'],
    remedies: ['Avoid triggers', 'Cool compress', 'Loose clothing'],
    seeDocitorIf: ['Spreading rapidly', 'Painful', 'Signs of infection'],
    urgency: 'low',
    category: 'dermatological',
    icon: '🔥'
  }
];
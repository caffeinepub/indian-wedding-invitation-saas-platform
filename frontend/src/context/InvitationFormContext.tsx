import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EventType } from '../backend';

export interface LocalEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  eventType: EventType;
}

export interface FormData {
  // Step 1: Couple Details
  brideName: string;
  groomName: string;
  couplePhotoUrl: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  googleMapsLink: string;
  familyDetails: string;
  invitationMessage: string;
  // Step 2: Events
  events: LocalEvent[];
  // Step 3: Template
  selectedTemplate: string;
  colorScheme: string;
  fontChoice: string;
  backgroundChoice: string;
  // Step 4: Media
  photos: { id: string; imageUrl: string }[];
  musicUrl: string;
  musicAutoPlay: boolean;
}

const defaultFormData: FormData = {
  brideName: '',
  groomName: '',
  couplePhotoUrl: '',
  weddingDate: '',
  weddingTime: '',
  venueName: '',
  venueAddress: '',
  googleMapsLink: '',
  familyDetails: '',
  invitationMessage: '',
  events: [],
  selectedTemplate: 'royal-gold',
  colorScheme: 'gold-crimson',
  fontChoice: 'cinzel-inter',
  backgroundChoice: 'floral',
  photos: [],
  musicUrl: '',
  musicAutoPlay: false,
};

interface InvitationFormContextType {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
}

const InvitationFormContext = createContext<InvitationFormContextType | undefined>(undefined);

export function InvitationFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <InvitationFormContext.Provider value={{ formData, updateFormData, currentStep, setCurrentStep, totalSteps }}>
      {children}
    </InvitationFormContext.Provider>
  );
}

export function useInvitationForm() {
  const ctx = useContext(InvitationFormContext);
  if (!ctx) throw new Error('useInvitationForm must be used within InvitationFormProvider');
  return ctx;
}

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EventType } from '../backend';

export interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  eventType: EventType;
}

// Alias for backward compatibility
export type LocalEvent = EventData;

export interface FormData {
  // Couple details
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  googleMapsLink: string;
  familyDetails: string;
  invitationMessage: string;

  // Couple photos (separate for bride and groom)
  bridePhoto: File | null;
  groomPhoto: File | null;

  // Events
  events: EventData[];

  // Template & theme
  selectedTemplate: string;
  colorScheme: string;
  fontChoice: string;
  backgroundChoice: string;
  backgroundStyle: string;
  accentIntensity: string;
  borderStyle: string;
  layoutDensity: string;

  // Media
  photos: string[];
  musicUrl: string;
  musicAutoPlay: boolean;
}

export interface InvitationFormContextType {
  formData: FormData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<FormData>) => void;
  addEvent: (event: EventData) => void;
  updateEvent: (event: EventData) => void;
  deleteEvent: (id: string) => void;
  resetForm: () => void;
}

const defaultFormData: FormData = {
  brideName: '',
  groomName: '',
  weddingDate: '',
  weddingTime: '',
  venueName: '',
  venueAddress: '',
  googleMapsLink: '',
  familyDetails: '',
  invitationMessage: '',
  bridePhoto: null,
  groomPhoto: null,
  events: [],
  selectedTemplate: 'royal-gold',
  colorScheme: 'gold-ivory',
  fontChoice: 'playfair-lato',
  backgroundChoice: 'floral',
  backgroundStyle: 'soft',
  accentIntensity: 'medium',
  borderStyle: 'ornate',
  layoutDensity: 'comfortable',
  photos: [],
  musicUrl: '',
  musicAutoPlay: false,
};

const InvitationFormContext = createContext<InvitationFormContextType | undefined>(undefined);

export function InvitationFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(0);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const addEvent = (event: EventData) => {
    setFormData(prev => ({ ...prev, events: [...prev.events, event] }));
  };

  const updateEvent = (event: EventData) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.map(e => (e.id === event.id ? event : e)),
    }));
  };

  const deleteEvent = (id: string) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.filter(e => e.id !== id),
    }));
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setCurrentStep(0);
  };

  return (
    <InvitationFormContext.Provider
      value={{
        formData,
        currentStep,
        setCurrentStep,
        updateFormData,
        addEvent,
        updateEvent,
        deleteEvent,
        resetForm,
      }}
    >
      {children}
    </InvitationFormContext.Provider>
  );
}

export function useInvitationForm() {
  const context = useContext(InvitationFormContext);
  if (!context) {
    throw new Error('useInvitationForm must be used within an InvitationFormProvider');
  }
  return context;
}

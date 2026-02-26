import React, { createContext, useContext, useState, useCallback } from 'react';
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

export interface LocalEvent extends EventData {
  isNew?: boolean;
  isDeleted?: boolean;
  isModified?: boolean;
}

export interface FormData {
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  googleMapsLink: string;
  familyDetails: string;
  invitationMessage: string;
  selectedTemplate: string;
  colorScheme: string;
  fontChoice: string;
  backgroundChoice: string;
  events: LocalEvent[];
  photos: string[];
  musicUrl: string;
  musicAutoPlay: boolean;
  bridePhoto: File | null;
  groomPhoto: File | null;
}

interface InvitationFormContextType {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
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
  selectedTemplate: 'royal-gold',
  colorScheme: 'gold-crimson',
  fontChoice: 'playfair-lato',
  backgroundChoice: 'floral',
  events: [],
  photos: [],
  musicUrl: '',
  musicAutoPlay: false,
  bridePhoto: null,
  groomPhoto: null,
};

const InvitationFormContext = createContext<InvitationFormContextType | null>(null);

export function InvitationFormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const addEvent = useCallback((event: EventData) => {
    setFormData(prev => ({
      ...prev,
      events: [...prev.events, { ...event, isNew: true }],
    }));
  }, []);

  const updateEvent = useCallback((event: EventData) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.map(e =>
        e.id === event.id ? { ...e, ...event, isModified: !e.isNew } : e
      ),
    }));
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.filter(e => e.id !== id),
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(defaultFormData);
  }, []);

  return (
    <InvitationFormContext.Provider value={{
      formData,
      updateFormData,
      addEvent,
      updateEvent,
      deleteEvent,
      resetForm,
    }}>
      {children}
    </InvitationFormContext.Provider>
  );
}

export function useInvitationForm() {
  const context = useContext(InvitationFormContext);
  if (!context) {
    throw new Error('useInvitationForm must be used within InvitationFormProvider');
  }
  return context;
}

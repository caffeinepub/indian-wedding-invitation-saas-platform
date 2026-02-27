import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EventType } from '../backend';

export interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  eventType: EventType | string;
}

export interface LocalEvent extends EventData {
  isNew?: boolean;
  isDeleted?: boolean;
  isModified?: boolean;
}

export type AnimationMode = 'minimal' | 'elegant' | 'cinematic';
export type BackgroundType = 'solid' | 'gradient' | 'image';

export interface InvitationFormData {
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
  // Legacy photo fields (File objects for wizard)
  bridePhoto: File | null;
  groomPhoto: File | null;
  // Preview URLs for editor
  bridePhotoFile?: File;
  groomPhotoFile?: File;
  bridePhotoPreview?: string;
  groomPhotoPreview?: string;
  events: LocalEvent[];
  photos: string[];
  musicUrl?: string;
  musicAutoPlay: boolean;
  savedThemes: Array<{ name: string; template: string; colorScheme: string; fontChoice: string; backgroundChoice: string }>;
  // Advanced theme fields
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  headingFont: string;
  bodyFont: string;
  letterSpacing: number;
  backgroundType: BackgroundType;
  mandalaWatermark: boolean;
  floralBorder: boolean;
  goldFrame: boolean;
  animatedPetals: boolean;
  diyaGlow: boolean;
  animationMode: AnimationMode;
}

const defaultFormData: InvitationFormData = {
  brideName: '',
  groomName: '',
  weddingDate: '',
  weddingTime: '',
  venueName: '',
  venueAddress: '',
  googleMapsLink: '',
  familyDetails: '',
  invitationMessage: '',
  selectedTemplate: 'royal-indian',
  colorScheme: 'gold-maroon',
  fontChoice: 'elegant-serif',
  backgroundChoice: 'gradient',
  bridePhoto: null,
  groomPhoto: null,
  events: [],
  photos: [],
  musicAutoPlay: false,
  savedThemes: [],
  primaryColor: '#D4AF37',
  accentColor: '#800020',
  backgroundColor: '#FFF8F0',
  headingFont: 'Playfair Display',
  bodyFont: 'Lora',
  letterSpacing: 0.02,
  backgroundType: 'gradient',
  mandalaWatermark: false,
  floralBorder: false,
  goldFrame: false,
  animatedPetals: false,
  diyaGlow: false,
  animationMode: 'elegant',
};

interface InvitationFormContextType {
  formData: InvitationFormData;
  updateFormData: (updates: Partial<InvitationFormData>) => void;
  addEvent: (event: LocalEvent) => void;
  updateEvent: (event: EventData) => void;
  deleteEvent: (id: string) => void;
  removeEvent: (id: string) => void;
  addPhotos: (photos: string[]) => void;
  removePhoto: (index: number) => void;
  resetForm: () => void;
}

const InvitationFormContext = createContext<InvitationFormContextType | null>(null);

export function InvitationFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<InvitationFormData>(defaultFormData);

  const updateFormData = (updates: Partial<InvitationFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const addEvent = (event: LocalEvent) => {
    setFormData(prev => ({ ...prev, events: [...prev.events, event] }));
  };

  const updateEvent = (event: EventData) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.map(e => e.id === event.id ? { ...e, ...event, isModified: true } : e),
    }));
  };

  const deleteEvent = (id: string) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.filter(e => e.id !== id),
    }));
  };

  // Alias for deleteEvent — marks as deleted (soft delete for editor)
  const removeEvent = (id: string) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.map(e => e.id === id ? { ...e, isDeleted: true } : e),
    }));
  };

  const addPhotos = (photos: string[]) => {
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...photos] }));
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));
  };

  const resetForm = () => setFormData(defaultFormData);

  return (
    <InvitationFormContext.Provider value={{
      formData,
      updateFormData,
      addEvent,
      updateEvent,
      deleteEvent,
      removeEvent,
      addPhotos,
      removePhoto,
      resetForm,
    }}>
      {children}
    </InvitationFormContext.Provider>
  );
}

export function useInvitationForm() {
  const ctx = useContext(InvitationFormContext);
  if (!ctx) throw new Error('useInvitationForm must be used within InvitationFormProvider');
  return ctx;
}

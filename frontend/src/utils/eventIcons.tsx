import React from 'react';
import { Sun, Leaf, Music, Heart, Star, Sparkles } from 'lucide-react';
import { EventType } from '../backend';

export interface EventConfig {
  label: string;
  icon: React.ReactNode;
  color: string;
  bgClass: string;
  textColor: string;
  borderColor: string;
}

export const EVENT_CONFIGS: Record<EventType, EventConfig> = {
  [EventType.haldi]: {
    label: 'Haldi',
    icon: <Sun className="w-5 h-5" />,
    color: '#D4A017',
    bgClass: 'event-haldi',
    textColor: 'text-amber-900',
    borderColor: 'border-amber-400',
  },
  [EventType.mehndi]: {
    label: 'Mehndi',
    icon: <Leaf className="w-5 h-5" />,
    color: '#2D6A4F',
    bgClass: 'event-mehndi',
    textColor: 'text-green-900',
    borderColor: 'border-green-500',
  },
  [EventType.sangeet]: {
    label: 'Sangeet',
    icon: <Music className="w-5 h-5" />,
    color: '#7B2D8B',
    bgClass: 'event-sangeet',
    textColor: 'text-purple-100',
    borderColor: 'border-purple-400',
  },
  [EventType.wedding]: {
    label: 'Wedding Ceremony',
    icon: <Heart className="w-5 h-5" />,
    color: '#B8860B',
    bgClass: 'event-wedding',
    textColor: 'text-amber-100',
    borderColor: 'border-yellow-500',
  },
  [EventType.reception]: {
    label: 'Reception',
    icon: <Sparkles className="w-5 h-5" />,
    color: '#C2185B',
    bgClass: 'event-reception',
    textColor: 'text-pink-100',
    borderColor: 'border-pink-400',
  },
  [EventType.custom]: {
    label: 'Custom Event',
    icon: <Star className="w-5 h-5" />,
    color: '#546E7A',
    bgClass: 'event-custom',
    textColor: 'text-slate-100',
    borderColor: 'border-slate-400',
  },
};

export function getEventConfig(eventType: EventType): EventConfig {
  return EVENT_CONFIGS[eventType] || EVENT_CONFIGS[EventType.custom];
}

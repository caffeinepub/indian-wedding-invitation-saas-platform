import React from 'react';
import { EventType } from '../backend';

export interface EventConfig {
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  bgClass: string;
  textColor: string;
  gradient: string;
  label: string;
}

export function getEventConfig(eventType: EventType): EventConfig {
  switch (eventType) {
    case EventType.haldi:
      return {
        icon: <span className="text-2xl">🌼</span>,
        color: '#F59E0B',
        bgColor: 'rgba(245, 158, 11, 0.1)',
        bgClass: 'bg-amber-100',
        textColor: 'text-amber-800',
        gradient: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
        label: 'Haldi',
      };
    case EventType.mehndi:
      return {
        icon: <span className="text-2xl">🌿</span>,
        color: '#10B981',
        bgColor: 'rgba(16, 185, 129, 0.1)',
        bgClass: 'bg-emerald-100',
        textColor: 'text-emerald-800',
        gradient: 'linear-gradient(135deg, #D1FAE5, #A7F3D0)',
        label: 'Mehndi',
      };
    case EventType.sangeet:
      return {
        icon: <span className="text-2xl">🎵</span>,
        color: '#8B5CF6',
        bgColor: 'rgba(139, 92, 246, 0.1)',
        bgClass: 'bg-violet-100',
        textColor: 'text-violet-800',
        gradient: 'linear-gradient(135deg, #EDE9FE, #DDD6FE)',
        label: 'Sangeet',
      };
    case EventType.wedding:
      return {
        icon: <span className="text-2xl">💍</span>,
        color: '#D4AF37',
        bgColor: 'rgba(212, 175, 55, 0.1)',
        bgClass: 'bg-yellow-50',
        textColor: 'text-yellow-900',
        gradient: 'linear-gradient(135deg, #FDF9E7, #FAF0C0)',
        label: 'Wedding',
      };
    case EventType.reception:
      return {
        icon: <span className="text-2xl">🥂</span>,
        color: '#EC4899',
        bgColor: 'rgba(236, 72, 153, 0.1)',
        bgClass: 'bg-pink-100',
        textColor: 'text-pink-800',
        gradient: 'linear-gradient(135deg, #FCE7F3, #FBCFE8)',
        label: 'Reception',
      };
    case EventType.custom:
    default:
      return {
        icon: <span className="text-2xl">✨</span>,
        color: '#6B7280',
        bgColor: 'rgba(107, 114, 128, 0.1)',
        bgClass: 'bg-gray-100',
        textColor: 'text-gray-700',
        gradient: 'linear-gradient(135deg, #F3F4F6, #E5E7EB)',
        label: 'Event',
      };
  }
}

// Named export for backward compatibility
export const EVENT_CONFIGS: Record<string, EventConfig> = {
  [EventType.haldi]: getEventConfig(EventType.haldi),
  [EventType.mehndi]: getEventConfig(EventType.mehndi),
  [EventType.sangeet]: getEventConfig(EventType.sangeet),
  [EventType.wedding]: getEventConfig(EventType.wedding),
  [EventType.reception]: getEventConfig(EventType.reception),
  [EventType.custom]: getEventConfig(EventType.custom),
};

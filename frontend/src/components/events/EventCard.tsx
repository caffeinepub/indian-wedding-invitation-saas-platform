import React from 'react';
import { EventData } from '@/context/InvitationFormContext';
import { Edit, Trash2, Calendar, Clock, MapPin, Music, Flower, Star, Heart, Sparkles } from 'lucide-react';
import { EventType } from '@/backend';

interface EventCardProps {
  event: EventData;
  onEdit: (event: EventData) => void;
  onDelete: (id: string) => void;
}

function getEventConfig(eventType: EventType | string) {
  switch (eventType) {
    case EventType.haldi:
    case 'haldi':
      return { bgClass: 'bg-gradient-to-br from-amber-400 to-yellow-500', textColor: 'text-amber-900', icon: <Flower className="w-5 h-5" />, label: 'Haldi' };
    case EventType.mehndi:
    case 'mehndi':
      return { bgClass: 'bg-gradient-to-br from-emerald-500 to-green-600', textColor: 'text-white', icon: <Flower className="w-5 h-5" />, label: 'Mehndi' };
    case EventType.sangeet:
    case 'sangeet':
      return { bgClass: 'bg-gradient-to-br from-purple-500 to-violet-600', textColor: 'text-white', icon: <Music className="w-5 h-5" />, label: 'Sangeet' };
    case EventType.wedding:
    case 'wedding':
      return { bgClass: 'bg-gradient-to-br from-red-600 to-rose-700', textColor: 'text-white', icon: <Heart className="w-5 h-5" />, label: 'Wedding' };
    case EventType.reception:
    case 'reception':
      return { bgClass: 'bg-gradient-to-br from-yellow-500 to-amber-600', textColor: 'text-amber-900', icon: <Star className="w-5 h-5" />, label: 'Reception' };
    default:
      return { bgClass: 'bg-gradient-to-br from-gray-500 to-slate-600', textColor: 'text-white', icon: <Sparkles className="w-5 h-5" />, label: 'Event' };
  }
}

export default function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const config = getEventConfig(event.eventType);

  return (
    <div className={`${config.bgClass} rounded-2xl overflow-hidden shadow-lg`}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-white/20 flex items-center justify-center ${config.textColor}`}>
              {config.icon}
            </div>
            <div>
              <span className={`text-xs font-semibold uppercase tracking-widest ${config.textColor} opacity-80`}>
                {config.label}
              </span>
              <h3 className={`text-lg font-bold ${config.textColor} leading-tight`}>
                {event.title}
              </h3>
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => onEdit(event)}
              className={`w-8 h-8 ${config.textColor} hover:bg-white/20 rounded-full flex items-center justify-center transition-colors`}
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(event.id)}
              className={`w-8 h-8 ${config.textColor} hover:bg-white/20 rounded-full flex items-center justify-center transition-colors`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className={`space-y-2 ${config.textColor}`}>
          {event.date && (
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Calendar className="w-4 h-4" />
              <span>{event.date}</span>
            </div>
          )}
          {event.time && (
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Clock className="w-4 h-4" />
              <span>{event.time}</span>
            </div>
          )}
          {event.venue && (
            <div className="flex items-center gap-2 text-sm opacity-80">
              <MapPin className="w-4 h-4" />
              <span>{event.venue}</span>
            </div>
          )}
          {event.description && (
            <p className="text-sm opacity-70 mt-2">{event.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

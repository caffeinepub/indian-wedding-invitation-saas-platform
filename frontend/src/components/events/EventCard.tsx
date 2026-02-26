import React from 'react';
import { EventData } from '@/context/InvitationFormContext';
import { getEventConfig } from '@/utils/eventIcons';
import { Edit, Trash2, Calendar, Clock, MapPin } from 'lucide-react';

interface EventCardProps {
  event: EventData;
  onEdit: (event: EventData) => void;
  onDelete: (id: string) => void;
}

export default function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const config = getEventConfig(event.eventType);

  return (
    <div
      className={`${config.bgClass} rounded-2xl overflow-hidden shadow-luxury-lg animate-fade-in-up`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-white/20 flex items-center justify-center ${config.textColor}`}>
              {config.icon}
            </div>
            <div>
              <span className={`text-xs font-elegant font-semibold uppercase tracking-widest ${config.textColor} opacity-80`}>
                {config.label}
              </span>
              <h3 className={`font-cinzel text-lg font-bold ${config.textColor} leading-tight`}>
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
              <span className="font-elegant">{event.date}</span>
            </div>
          )}
          {event.time && (
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Clock className="w-4 h-4" />
              <span className="font-elegant">{event.time}</span>
            </div>
          )}
          {event.venue && (
            <div className="flex items-center gap-2 text-sm opacity-80">
              <MapPin className="w-4 h-4" />
              <span className="font-elegant">{event.venue}</span>
            </div>
          )}
          {event.description && (
            <p className="text-sm opacity-70 font-serif mt-2">{event.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

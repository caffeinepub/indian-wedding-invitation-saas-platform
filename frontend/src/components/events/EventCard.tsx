import React from 'react';
import { Edit2, Trash2, Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventType } from '@/backend';
import { getEventConfig } from '@/utils/eventIcons';
import { LocalEvent } from '@/context/InvitationFormContext';

interface EventCardProps {
  event: LocalEvent;
  onEdit: (event: LocalEvent) => void;
  onDelete: (eventId: string) => void;
  animationDelay?: number;
}

export default function EventCard({ event, onEdit, onDelete, animationDelay = 0 }: EventCardProps) {
  const config = getEventConfig(event.eventType);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    try {
      const [hours, minutes] = timeStr.split(':');
      const h = parseInt(hours);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      return `${h12}:${minutes} ${ampm}`;
    } catch {
      return timeStr;
    }
  };

  return (
    <div
      className={`${config.bgClass} rounded-2xl overflow-hidden shadow-luxury-lg animate-scale-in`}
      style={{ animationDelay: `${animationDelay}s`, animationFillMode: 'both' }}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-white/20 flex items-center justify-center ${config.textColor}`}>
              {config.icon}
            </div>
            <div>
              <span className={`text-xs font-inter font-semibold uppercase tracking-widest ${config.textColor} opacity-80`}>
                {config.label}
              </span>
              <h3 className={`font-cinzel text-lg font-bold ${config.textColor} leading-tight`}>
                {event.title}
              </h3>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit(event)}
              className={`w-8 h-8 ${config.textColor} hover:bg-white/20 rounded-full`}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(event.id)}
              className={`w-8 h-8 ${config.textColor} hover:bg-white/20 rounded-full`}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Details */}
        <div className={`space-y-2 ${config.textColor}`}>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 opacity-70 flex-shrink-0" />
            <span className="font-inter">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 opacity-70 flex-shrink-0" />
            <span className="font-inter">{formatTime(event.time)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 opacity-70 flex-shrink-0" />
            <span className="font-inter">{event.venue}</span>
          </div>
          {event.description && (
            <p className="text-sm font-inter opacity-80 mt-3 pt-3 border-t border-white/20">
              {event.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

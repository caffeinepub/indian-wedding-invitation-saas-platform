import React from 'react';
import type { Event, Invitation } from '@/backend';
import { getTemplateById } from '@/utils/templateDefinitions';
import { getEventConfig } from '@/utils/eventIcons';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface EventTimelineProps {
  events: Event[];
  invitation: Invitation;
}

function EventCard({ event, template, index }: { event: Event; template: ReturnType<typeof getTemplateById>; index: number }) {
  const config = getEventConfig(event.eventType);
  const { ref, isVisible } = useScrollAnimation();

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      });
    } catch { return dateStr; }
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    try {
      const [hours, minutes] = timeStr.split(':');
      const h = parseInt(hours);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      return `${h12}:${minutes} ${ampm}`;
    } catch { return timeStr; }
  };

  return (
    <div
      ref={ref}
      className={`${config.bgClass} rounded-2xl overflow-hidden shadow-luxury-lg transition-all duration-700`}
      style={{
        transitionDelay: `${index * 0.1}s`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-full bg-white/20 flex items-center justify-center ${config.textColor}`}>
            {config.icon}
          </div>
          <div>
            <span className={`text-xs font-inter font-semibold uppercase tracking-widest ${config.textColor} opacity-70`}>
              {config.label}
            </span>
            <h3 className={`font-cinzel text-xl font-bold ${config.textColor}`}>{event.title}</h3>
          </div>
        </div>

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

export default function EventTimeline({ events, invitation }: EventTimelineProps) {
  const template = getTemplateById(invitation.selectedTemplate);
  const { ref, isVisible } = useScrollAnimation();

  const sortedEvents = [...events].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  if (events.length === 0) return null;

  return (
    <section className="py-16 px-4" style={{ background: template.bgColor }}>
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="font-inter text-sm tracking-[0.3em] uppercase mb-3" style={{ color: template.primaryColor }}>
            ✦ Celebrations ✦
          </p>
          <h2
            className="font-cinzel text-3xl md:text-4xl font-bold"
            style={{ fontFamily: template.headingFont, color: template.textColor }}
          >
            Wedding Events
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sortedEvents.map((event, i) => (
            <EventCard key={event.id} event={event} template={template} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { getTemplateById } from '../../utils/templateDefinitions';
import { Calendar, Clock, MapPin } from 'lucide-react';
import type { Invitation, Event } from '../../backend';

interface EventTimelineProps {
  invitation: Invitation;
  events: Event[];
  animationMode?: 'minimal' | 'elegant' | 'cinematic';
}

const EVENT_GRADIENTS: Record<string, string> = {
  haldi:     'linear-gradient(135deg, #f59e0b, #d97706)',
  mehndi:    'linear-gradient(135deg, #16a34a, #15803d)',
  sangeet:   'linear-gradient(135deg, #7c3aed, #6d28d9)',
  wedding:   'linear-gradient(135deg, #dc2626, #b91c1c)',
  reception: 'linear-gradient(135deg, #0284c7, #0369a1)',
  custom:    'linear-gradient(135deg, #6b7280, #4b5563)',
};

function EventCard({ event, index, primaryColor, accentColor, fontHeading, fontBody }: {
  event: Event;
  index: number;
  primaryColor: string;
  accentColor: string;
  fontHeading: string;
  fontBody: string;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  const eventType = typeof event.eventType === 'string'
    ? event.eventType
    : Object.keys(event.eventType)[0] || 'custom';
  const gradient = EVENT_GRADIENTS[eventType] || EVENT_GRADIENTS.custom;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`scroll-animate ${isVisible ? 'is-visible' : ''} rounded-2xl overflow-hidden shadow-luxury`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Gradient header */}
      <div
        className="px-6 py-4"
        style={{ background: gradient }}
      >
        <span className="text-xs font-bold uppercase tracking-widest text-white opacity-80">
          {eventType.charAt(0).toUpperCase() + eventType.slice(1)}
        </span>
        <h3
          className="text-xl font-bold text-white mt-0.5"
          style={{ fontFamily: fontHeading }}
        >
          {event.title}
        </h3>
      </div>

      {/* Card body */}
      <div className="px-6 py-4 space-y-2 bg-white">
        {event.date && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 shrink-0" style={{ color: primaryColor }} />
            <span className="text-sm text-gray-700" style={{ fontFamily: fontBody }}>
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        )}
        {event.time && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0" style={{ color: primaryColor }} />
            <span className="text-sm text-gray-700" style={{ fontFamily: fontBody }}>
              {event.time}
            </span>
          </div>
        )}
        {event.venue && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 shrink-0" style={{ color: primaryColor }} />
            <span className="text-sm text-gray-700" style={{ fontFamily: fontBody }}>
              {event.venue}
            </span>
          </div>
        )}
        {event.description && (
          <p className="text-sm text-gray-600 mt-2 leading-relaxed" style={{ fontFamily: fontBody }}>
            {event.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function EventTimeline({ invitation, events, animationMode = 'elegant' }: EventTimelineProps) {
  const template = getTemplateById(invitation.selectedTemplate);
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.05 });

  const primaryColor = template?.primaryColor || '#C9A84C';
  const accentColor = template?.accentColor || '#8B1A1A';
  const bgColor = template?.bgColor || '#FDF8F0';
  const fontHeading = template?.fontHeading || 'Cormorant Garamond, serif';
  const fontBody = template?.fontBody || 'Lato, sans-serif';
  // Script font: TemplateDefinition has no fontScript field
  const fontScript = 'Great Vibes, cursive';

  if (!events || events.length === 0) return null;

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`py-16 px-6 scroll-animate ${sectionVisible ? 'is-visible' : ''}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <p
            className="text-2xl md:text-3xl mb-2"
            style={{
              fontFamily: fontScript,
              color: accentColor,
            }}
          >
            Celebrations
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{
              fontFamily: fontHeading,
              color: primaryColor,
            }}
          >
            Events &amp; Schedule
          </h2>
          <div
            className="w-24 h-0.5 mx-auto mt-4"
            style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` }}
          />
        </div>

        {/* Event cards */}
        <div className="space-y-6">
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              primaryColor={primaryColor}
              accentColor={accentColor}
              fontHeading={fontHeading}
              fontBody={fontBody}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

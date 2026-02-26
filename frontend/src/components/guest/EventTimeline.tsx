import React, { useEffect, useRef, useState } from 'react';
import { Event, EventType, Invitation } from '../../backend';
import { getTemplateById } from '../../utils/templateDefinitions';
import { Calendar, Clock, MapPin, Music, Flower, Star, Heart, Sparkles } from 'lucide-react';

interface EventTimelineProps {
  events: Event[];
  invitation: Invitation;
}

function getEventConfig(eventType: EventType) {
  switch (eventType) {
    case EventType.haldi:
      return {
        gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
        icon: Flower,
        label: 'Haldi',
        textColor: '#1a0a00',
        badgeBg: 'rgba(245, 158, 11, 0.15)',
        badgeText: '#92400e',
      };
    case EventType.mehndi:
      return {
        gradient: 'linear-gradient(135deg, #10b981, #059669)',
        icon: Flower,
        label: 'Mehndi',
        textColor: '#ffffff',
        badgeBg: 'rgba(16, 185, 129, 0.15)',
        badgeText: '#065f46',
      };
    case EventType.sangeet:
      return {
        gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        icon: Music,
        label: 'Sangeet',
        textColor: '#ffffff',
        badgeBg: 'rgba(139, 92, 246, 0.15)',
        badgeText: '#4c1d95',
      };
    case EventType.wedding:
      return {
        gradient: 'linear-gradient(135deg, #dc2626, #b91c1c)',
        icon: Heart,
        label: 'Wedding',
        textColor: '#ffffff',
        badgeBg: 'rgba(220, 38, 38, 0.15)',
        badgeText: '#7f1d1d',
      };
    case EventType.reception:
      return {
        gradient: 'linear-gradient(135deg, #c9a84c, #a07830)',
        icon: Star,
        label: 'Reception',
        textColor: '#1a0a00',
        badgeBg: 'rgba(201, 168, 76, 0.15)',
        badgeText: '#78350f',
      };
    case EventType.custom:
    default:
      return {
        gradient: 'linear-gradient(135deg, #6b7280, #4b5563)',
        icon: Sparkles,
        label: 'Event',
        textColor: '#ffffff',
        badgeBg: 'rgba(107, 114, 128, 0.15)',
        badgeText: '#1f2937',
      };
  }
}

interface EventCardProps {
  event: Event;
  index: number;
  template: ReturnType<typeof getTemplateById>;
}

function EventCard({ event, index, template }: EventCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const config = getEventConfig(event.eventType);
  const Icon = config.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <div
      ref={cardRef}
      className="rounded-2xl overflow-hidden shadow-lg"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`,
      }}
    >
      {/* Card header with gradient */}
      <div
        className="p-5 flex items-center gap-4"
        style={{ background: config.gradient }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.2)' }}
        >
          <Icon className="w-6 h-6" style={{ color: config.textColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-xl font-bold leading-tight"
            style={{ color: config.textColor }}
          >
            {event.title}
          </h3>
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: config.textColor, opacity: 0.8 }}
          >
            {config.label}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div
        className="p-5 space-y-3"
        style={{ background: 'rgba(255, 255, 255, 0.95)' }}
      >
        {formattedDate && (
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: '#6b4c3b' }} />
            <span className="text-sm font-medium" style={{ color: '#2c1810' }}>
              {formattedDate}
            </span>
          </div>
        )}
        {event.time && (
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 flex-shrink-0" style={{ color: '#6b4c3b' }} />
            <span className="text-sm" style={{ color: '#2c1810' }}>
              {event.time}
            </span>
          </div>
        )}
        {event.venue && (
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#6b4c3b' }} />
            <span className="text-sm" style={{ color: '#2c1810' }}>
              {event.venue}
            </span>
          </div>
        )}
        {event.description && (
          <p
            className="text-sm leading-relaxed pt-1 border-t"
            style={{ color: '#4a3728', borderColor: 'rgba(180, 140, 80, 0.2)' }}
          >
            {event.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function EventTimeline({ events, invitation }: EventTimelineProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const template = getTemplateById(invitation.selectedTemplate) || getTemplateById('royal-gold')!;

  const isDark =
    invitation.backgroundChoice === 'dark-floral' ||
    invitation.backgroundChoice === 'dark-minimal' ||
    template.id?.includes('dark') ||
    template.id?.includes('midnight') ||
    template.id?.includes('cinematic');

  const sectionBg = isDark
    ? 'linear-gradient(180deg, #1a1208 0%, #0d0a05 100%)'
    : `linear-gradient(180deg, #fdf8f0 0%, #f8f2e8 100%)`;

  const headingColor = isDark ? '#f5f0e8' : '#2c1810';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (!events || events.length === 0) return null;

  const sortedEvents = [...events].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4"
      style={{ background: sectionBg }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div
          className="text-center mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div
              className="h-px w-16"
              style={{ background: `linear-gradient(90deg, transparent, ${template.primaryColor})` }}
            />
            <div className="w-2 h-2 rounded-full" style={{ background: template.primaryColor }} />
            <div
              className="h-px w-16"
              style={{ background: `linear-gradient(90deg, ${template.primaryColor}, transparent)` }}
            />
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{
              fontFamily: `'${template.headingFont}', serif`,
              color: headingColor,
            }}
          >
            Celebration Events
          </h2>
          <p
            className="mt-3 text-sm"
            style={{ color: isDark ? '#a09070' : '#7a6050' }}
          >
            Join us for these special moments
          </p>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sortedEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              template={template}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

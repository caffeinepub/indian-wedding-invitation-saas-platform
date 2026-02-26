import React, { useEffect, useRef, useState } from 'react';
import { Invitation } from '../../backend';
import { getTemplateById } from '../../utils/templateDefinitions';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

interface VenueSectionProps {
  invitation: Invitation;
}

export default function VenueSection({ invitation }: VenueSectionProps) {
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
    ? 'linear-gradient(180deg, #0d0a05 0%, #1a1208 100%)'
    : `linear-gradient(180deg, #f8f2e8 0%, #fdf8f0 100%)`;

  const headingColor = isDark ? '#f5f0e8' : '#2c1810';
  const textColor = isDark ? '#d4c4a8' : '#4a3728';
  const cardBg = isDark ? 'rgba(30, 22, 10, 0.85)' : 'rgba(255, 255, 255, 0.85)';
  const cardBorder = `${template.primaryColor}30`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (!invitation.venueName && !invitation.venueAddress) return null;

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4"
      style={{ background: sectionBg }}
    >
      <div
        className="max-w-2xl mx-auto"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        }}
      >
        {/* Section header */}
        <div className="text-center mb-10">
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
            Venue
          </h2>
        </div>

        {/* Venue card */}
        <div
          className="rounded-2xl p-6 sm:p-8 text-center shadow-xl"
          style={{
            background: cardBg,
            border: `1px solid ${cardBorder}`,
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Map pin icon */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: `${template.primaryColor}20` }}
          >
            <MapPin className="w-8 h-8" style={{ color: template.primaryColor }} />
          </div>

          {/* Venue name */}
          {invitation.venueName && (
            <h3
              className="text-2xl sm:text-3xl font-bold mb-3"
              style={{
                fontFamily: `'${template.headingFont}', serif`,
                color: headingColor,
              }}
            >
              {invitation.venueName}
            </h3>
          )}

          {/* Venue address */}
          {invitation.venueAddress && (
            <p
              className="text-base leading-relaxed mb-6"
              style={{
                fontFamily: `'${template.bodyFont}', sans-serif`,
                color: textColor,
              }}
            >
              {invitation.venueAddress}
            </p>
          )}

          {/* Divider */}
          <div
            className="h-px w-24 mx-auto mb-6"
            style={{ background: `linear-gradient(90deg, transparent, ${template.primaryColor}, transparent)` }}
          />

          {/* Google Maps link */}
          {invitation.googleMapsLink && (
            <a
              href={invitation.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${template.primaryColor}, ${template.primaryColor}cc)`,
                color: '#1a1008',
                boxShadow: `0 4px 15px ${template.primaryColor}40`,
              }}
            >
              <Navigation className="w-4 h-4" />
              Get Directions
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

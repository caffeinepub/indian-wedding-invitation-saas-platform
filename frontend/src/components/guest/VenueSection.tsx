import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { getTemplateById } from '../../utils/templateDefinitions';
import { MapPin, Clock, Navigation } from 'lucide-react';
import type { Invitation } from '../../backend';

interface VenueSectionProps {
  invitation: Invitation;
  animationMode?: 'minimal' | 'elegant' | 'cinematic';
}

export default function VenueSection({ invitation, animationMode = 'elegant' }: VenueSectionProps) {
  const template = getTemplateById(invitation.selectedTemplate);
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  const primaryColor = template?.primaryColor || '#C9A84C';
  const accentColor = template?.accentColor || '#8B1A1A';
  const bgColor = template?.bgColor || '#FDF8F0';
  // Script font: TemplateDefinition has no fontScript field
  const fontScript = 'Great Vibes, cursive';
  const fontHeading = template?.fontHeading || 'Cormorant Garamond, serif';
  const fontBody = template?.fontBody || 'Lato, sans-serif';

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`py-16 px-6 scroll-animate ${isVisible ? 'is-visible' : ''}`}
      style={{ backgroundColor: `${bgColor}f0` }}
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <p
          className="text-2xl md:text-3xl mb-2"
          style={{
            fontFamily: fontScript,
            color: accentColor,
          }}
        >
          Join us at
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold mb-8"
          style={{
            fontFamily: fontHeading,
            color: primaryColor,
          }}
        >
          {invitation.venueName || 'The Venue'}
        </h2>

        {/* Divider */}
        <div
          className="w-24 h-0.5 mx-auto mb-8"
          style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` }}
        />

        {/* Venue details card */}
        <div
          className="rounded-2xl p-8 shadow-luxury text-left space-y-4"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}10, ${primaryColor}05)`,
            border: `1px solid ${primaryColor}30`,
          }}
        >
          {invitation.venueAddress && (
            <div className="flex items-start gap-3">
              <MapPin
                className="w-5 h-5 mt-0.5 shrink-0"
                style={{ color: primaryColor }}
              />
              <div>
                <p
                  className="font-semibold text-sm uppercase tracking-wider mb-0.5"
                  style={{
                    fontFamily: fontBody,
                    color: accentColor,
                    opacity: 0.7,
                  }}
                >
                  Address
                </p>
                <p
                  className="text-base"
                  style={{
                    fontFamily: fontBody,
                    color: accentColor,
                  }}
                >
                  {invitation.venueAddress}
                </p>
              </div>
            </div>
          )}

          {(invitation.weddingDate || invitation.weddingTime) && (
            <div className="flex items-start gap-3">
              <Clock
                className="w-5 h-5 mt-0.5 shrink-0"
                style={{ color: primaryColor }}
              />
              <div>
                <p
                  className="font-semibold text-sm uppercase tracking-wider mb-0.5"
                  style={{
                    fontFamily: fontBody,
                    color: accentColor,
                    opacity: 0.7,
                  }}
                >
                  Date &amp; Time
                </p>
                <p
                  className="text-base"
                  style={{
                    fontFamily: fontBody,
                    color: accentColor,
                  }}
                >
                  {invitation.weddingDate
                    ? new Date(invitation.weddingDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : ''}
                  {invitation.weddingTime ? ` at ${invitation.weddingTime}` : ''}
                </p>
              </div>
            </div>
          )}

          {invitation.googleMapsLink && (
            <div className="pt-2">
              <a
                href={invitation.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-gold"
                style={{
                  backgroundColor: primaryColor,
                  color: '#fff',
                  fontFamily: fontBody,
                }}
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

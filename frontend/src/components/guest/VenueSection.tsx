import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Invitation } from '@/backend';
import { getTemplateById } from '@/utils/templateDefinitions';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface VenueSectionProps {
  invitation: Invitation;
}

export default function VenueSection({ invitation }: VenueSectionProps) {
  const template = getTemplateById(invitation.selectedTemplate);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 px-4" style={{ background: template.bgColor }}>
      <div
        ref={ref}
        className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="font-inter text-sm tracking-[0.3em] uppercase mb-3" style={{ color: template.primaryColor }}>
          ✦ Venue ✦
        </p>
        <h2
          className="font-cinzel text-3xl md:text-4xl font-bold mb-8"
          style={{ fontFamily: template.headingFont, color: template.textColor }}
        >
          Join Us Here
        </h2>

        <div
          className="p-8 rounded-2xl border"
          style={{
            background: `${template.primaryColor}08`,
            borderColor: `${template.primaryColor}25`,
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: `${template.primaryColor}20` }}
          >
            <MapPin className="w-8 h-8" style={{ color: template.primaryColor }} />
          </div>

          <h3
            className="font-cinzel text-2xl font-bold mb-2"
            style={{ fontFamily: template.headingFont, color: template.textColor }}
          >
            {invitation.venueName}
          </h3>

          {invitation.venueAddress && (
            <p
              className="font-inter text-sm leading-relaxed mb-6"
              style={{ color: template.textColor, opacity: 0.7 }}
            >
              {invitation.venueAddress}
            </p>
          )}

          {invitation.googleMapsLink && (
            <a
              href={invitation.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="rounded-full font-cinzel tracking-wider px-8"
                style={{
                  background: `linear-gradient(135deg, ${template.primaryColor}, ${template.accentColor})`,
                  color: template.category === 'cinematic-dark' ? '#0D0820' : '#2C1810',
                }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Google Maps
              </Button>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

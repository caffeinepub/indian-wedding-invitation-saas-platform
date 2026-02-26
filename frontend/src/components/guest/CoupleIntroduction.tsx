import React, { useEffect, useRef, useState } from 'react';
import { Invitation } from '../../backend';

interface CoupleIntroductionProps {
  invitation: Invitation;
}

export default function CoupleIntroduction({ invitation }: CoupleIntroductionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const isDark =
    invitation.backgroundChoice === 'dark' ||
    ['cinematic-dark', 'midnight-luxe'].includes(invitation.selectedTemplate);

  const headingColor = isDark ? 'text-white' : 'text-charcoal';
  const bodyColor = isDark ? 'text-white/80' : 'text-charcoal/70';
  const cardBg = isDark ? 'bg-white/10' : 'bg-white/80';
  const borderColor = isDark ? 'border-white/20' : 'border-gold/20';

  const bridePhotoUrl = invitation.bridePhoto?.getDirectURL() ?? null;
  const groomPhotoUrl = invitation.groomPhoto?.getDirectURL() ?? null;

  return (
    <section
      ref={sectionRef}
      className={`py-20 px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <img
            src="/assets/generated/mandala-divider.dim_1200x120.png"
            alt="Divider"
            className="w-48 mx-auto mb-6 opacity-60"
          />
          <h2 className={`text-3xl md:text-4xl font-serif font-bold ${headingColor}`}>
            The Happy Couple
          </h2>
        </div>

        {/* Couple Photos Side by Side */}
        {(bridePhotoUrl || groomPhotoUrl) && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
            {bridePhotoUrl && (
              <div className={`flex flex-col items-center gap-3 p-6 rounded-2xl ${cardBg} border ${borderColor} backdrop-blur-sm`}>
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gold/40 shadow-xl">
                  <img
                    src={bridePhotoUrl}
                    alt={invitation.brideName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className={`text-xl font-serif font-bold ${headingColor}`}>
                  {invitation.brideName}
                </h3>
              </div>
            )}

            {bridePhotoUrl && groomPhotoUrl && (
              <div className={`text-4xl font-serif ${headingColor} opacity-60`}>&</div>
            )}

            {groomPhotoUrl && (
              <div className={`flex flex-col items-center gap-3 p-6 rounded-2xl ${cardBg} border ${borderColor} backdrop-blur-sm`}>
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gold/40 shadow-xl">
                  <img
                    src={groomPhotoUrl}
                    alt={invitation.groomName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className={`text-xl font-serif font-bold ${headingColor}`}>
                  {invitation.groomName}
                </h3>
              </div>
            )}

            {/* Fallback: no photos, just names */}
            {!bridePhotoUrl && !groomPhotoUrl && (
              <div className="flex items-center gap-6">
                <div className={`text-center p-6 rounded-2xl ${cardBg} border ${borderColor}`}>
                  <div className="w-24 h-24 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                    <span className={`text-3xl font-serif ${headingColor}`}>
                      {invitation.brideName.charAt(0)}
                    </span>
                  </div>
                  <h3 className={`text-xl font-serif font-bold ${headingColor}`}>
                    {invitation.brideName}
                  </h3>
                </div>
                <div className={`text-4xl font-serif ${headingColor} opacity-60`}>&</div>
                <div className={`text-center p-6 rounded-2xl ${cardBg} border ${borderColor}`}>
                  <div className="w-24 h-24 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                    <span className={`text-3xl font-serif ${headingColor}`}>
                      {invitation.groomName.charAt(0)}
                    </span>
                  </div>
                  <h3 className={`text-xl font-serif font-bold ${headingColor}`}>
                    {invitation.groomName}
                  </h3>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Family Details */}
        {invitation.familyDetails && (
          <div className={`text-center p-8 rounded-2xl ${cardBg} border ${borderColor} backdrop-blur-sm`}>
            <p className={`text-base md:text-lg leading-relaxed ${bodyColor}`}>
              {invitation.familyDetails}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

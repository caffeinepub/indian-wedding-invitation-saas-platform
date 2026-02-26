import React, { useEffect, useRef } from 'react';
import { Invitation } from '../../backend';

interface HeroSectionProps {
  invitation: Invitation;
}

export default function HeroSection({ invitation }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bridePhotoUrl = invitation.bridePhoto?.getDirectURL() ?? null;
  const groomPhotoUrl = invitation.groomPhoto?.getDirectURL() ?? null;
  const hasPhotos = bridePhotoUrl || groomPhotoUrl;

  const weddingDate = invitation.weddingDate
    ? new Date(invitation.weddingDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div ref={heroRef} className="absolute inset-0 will-change-transform">
        <img
          src="/assets/generated/hero-bg.dim_1920x1080.png"
          alt="Wedding background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Couple Photos */}
        {hasPhotos && (
          <div className="flex items-center justify-center gap-6 mb-8">
            {bridePhotoUrl && (
              <div className="flex flex-col items-center gap-2">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white/40 shadow-2xl">
                  <img
                    src={bridePhotoUrl}
                    alt={invitation.brideName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className="text-white/80 text-sm font-medium"
                  style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
                >
                  {invitation.brideName}
                </span>
              </div>
            )}

            {bridePhotoUrl && groomPhotoUrl && (
              <div className="text-white/60 text-3xl font-serif">&</div>
            )}

            {groomPhotoUrl && (
              <div className="flex flex-col items-center gap-2">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white/40 shadow-2xl">
                  <img
                    src={groomPhotoUrl}
                    alt={invitation.groomName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className="text-white/80 text-sm font-medium"
                  style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
                >
                  {invitation.groomName}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Names */}
        <h1
          className="text-5xl md:text-7xl font-serif text-white mb-4"
          style={{ fontWeight: 700, textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
        >
          {invitation.brideName}
          <span className="block text-3xl md:text-4xl my-2 font-light opacity-80">&</span>
          {invitation.groomName}
        </h1>

        {/* Date */}
        {weddingDate && (
          <p
            className="text-xl md:text-2xl text-white/90 mb-3 font-light"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
          >
            {weddingDate}
          </p>
        )}

        {/* Venue */}
        {invitation.venueName && (
          <p
            className="text-lg text-white/80 font-light"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
          >
            {invitation.venueName}
          </p>
        )}

        {/* Invitation Message */}
        {invitation.invitationMessage && (
          <div className="mt-8 max-w-2xl mx-auto">
            <p
              className="text-white/80 text-base md:text-lg italic leading-relaxed"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
            >
              "{invitation.invitationMessage}"
            </p>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-2">
          <div className="w-1 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}

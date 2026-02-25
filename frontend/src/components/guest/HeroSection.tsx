import React, { useEffect, useRef, useState } from 'react';
import type { Invitation } from '@/backend';
import { getTemplateById } from '@/utils/templateDefinitions';

interface HeroSectionProps {
  invitation: Invitation;
  couplePhotoUrl?: string;
}

export default function HeroSection({ invitation, couplePhotoUrl }: HeroSectionProps) {
  const template = getTemplateById(invitation.selectedTemplate);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      });
    } catch { return dateStr; }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/generated/hero-bg.dim_1920x1080.png')`,
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${template.secondaryColor}88 0%, ${template.secondaryColor}44 40%, ${template.secondaryColor}99 80%, ${template.bgColor} 100%)`,
        }}
      />

      {/* Content */}
      <div
        className={`relative z-10 text-center px-4 max-w-3xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-px" style={{ background: template.primaryColor }} />
          <span className="text-lg" style={{ color: template.primaryColor }}>✦</span>
          <div className="w-12 h-px" style={{ background: template.primaryColor }} />
        </div>

        {/* Couple Photo */}
        {couplePhotoUrl && (
          <div
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mx-auto mb-6 border-4 shadow-gold-lg"
            style={{ borderColor: template.primaryColor }}
          >
            <img src={couplePhotoUrl} alt="Couple" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Names */}
        <div
          className="mb-4"
          style={{ fontFamily: template.headingFont, color: template.category === 'cinematic-dark' ? template.textColor : '#FFF8E7' }}
        >
          <p className="text-sm tracking-[0.4em] uppercase mb-3 opacity-80">
            Together with their families
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
            {invitation.brideName}
          </h1>
          <p className="text-2xl sm:text-3xl my-3 opacity-70" style={{ fontFamily: 'Cormorant Garamond' }}>
            &
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
            {invitation.groomName}
          </h1>
        </div>

        {/* Date */}
        {invitation.weddingDate && (
          <p
            className="text-base sm:text-lg font-inter mt-4 opacity-80"
            style={{ color: template.category === 'cinematic-dark' ? template.textColor : '#FFF8E7' }}
          >
            {formatDate(invitation.weddingDate)}
          </p>
        )}

        {/* Venue */}
        {invitation.venueName && (
          <p
            className="text-sm font-inter mt-2 opacity-60"
            style={{ color: template.category === 'cinematic-dark' ? template.textColor : '#FFF8E7' }}
          >
            {invitation.venueName}
          </p>
        )}

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="w-12 h-px" style={{ background: template.primaryColor }} />
          <span className="text-lg" style={{ color: template.primaryColor }}>✦</span>
          <div className="w-12 h-px" style={{ background: template.primaryColor }} />
        </div>
      </div>
    </section>
  );
}

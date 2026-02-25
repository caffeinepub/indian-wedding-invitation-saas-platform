import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Photo, Invitation } from '@/backend';
import { getTemplateById } from '@/utils/templateDefinitions';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface PhotoGalleryLightboxProps {
  photos: Photo[];
  invitation: Invitation;
}

export default function PhotoGalleryLightbox({ photos, invitation }: PhotoGalleryLightboxProps) {
  const template = getTemplateById(invitation.selectedTemplate);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  if (photos.length === 0) return null;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex(i => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  const nextPhoto = () => setLightboxIndex(i => (i !== null ? (i + 1) % photos.length : null));

  return (
    <section className="py-16 px-4" style={{ background: `${template.primaryColor}08` }}>
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="font-inter text-sm tracking-[0.3em] uppercase mb-3" style={{ color: template.primaryColor }}>
            ✦ Memories ✦
          </p>
          <h2
            className="font-cinzel text-3xl md:text-4xl font-bold"
            style={{ fontFamily: template.headingFont, color: template.textColor }}
          >
            Our Gallery
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative group aspect-square rounded-xl overflow-hidden cursor-pointer shadow-luxury"
              style={{
                transition: `all 0.5s ease ${index * 0.05}s`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.9)',
              }}
              onClick={() => openLightbox(index)}
            >
              <img
                src={photo.imageUrl}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={closeLightbox}
          >
            <X className="w-5 h-5" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <img
            src={photos[lightboxIndex].imageUrl}
            alt={`Gallery ${lightboxIndex + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 font-inter text-sm">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}

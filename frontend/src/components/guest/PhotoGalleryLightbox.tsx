import React, { useState } from 'react';
import { Invitation } from '@/backend';
import { getTemplateById } from '@/utils/templateDefinitions';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface PhotoGalleryLightboxProps {
  photos: string[];
  invitation: Invitation;
}

export default function PhotoGalleryLightbox({ photos, invitation }: PhotoGalleryLightboxProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const template = getTemplateById(invitation.selectedTemplate) ?? getTemplateById('royal-indian');
  const primaryColor = template?.primaryColor || '#D4AF37';
  const headingFont = template?.headingFont || 'Playfair Display';
  const textColor = template?.textColor || '#2C1810';

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex(i => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  const nextPhoto = () => setLightboxIndex(i => (i !== null ? (i + 1) % photos.length : null));

  if (photos.length === 0) return null;

  return (
    <section className="py-16 px-4" style={{ background: `${primaryColor}08` }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm tracking-[0.3em] uppercase mb-3" style={{ color: primaryColor }}>
            Our Memories
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: `'${headingFont}', serif`, color: textColor }}
          >
            Photo Gallery
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photoUrl, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <img
                src={photoUrl}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={prevPhoto}
            className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <img
            src={photos[lightboxIndex]}
            alt={`Photo ${lightboxIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-xl"
            style={{ maxHeight: '85vh', maxWidth: '90vw' }}
          />
          <button
            onClick={nextPhoto}
            className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 text-white/60 text-sm">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}

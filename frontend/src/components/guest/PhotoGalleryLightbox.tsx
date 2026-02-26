import React, { useState } from 'react';
import { Photo } from '@/backend';
import { getTemplateById } from '@/utils/templateDefinitions';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface TemplateData {
  selectedTemplate: string;
  colorScheme: string;
  fontChoice: string;
  backgroundChoice: string;
}

export interface PhotoGalleryLightboxProps {
  photos: Photo[];
  templateData: TemplateData;
}

export default function PhotoGalleryLightbox({ photos, templateData }: PhotoGalleryLightboxProps) {
  const { ref, isVisible } = useScrollAnimation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const template = getTemplateById(templateData.selectedTemplate) ?? getTemplateById('royal-gold')!;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex(i => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  const nextPhoto = () => setLightboxIndex(i => (i !== null ? (i + 1) % photos.length : null));

  return (
    <section className="py-16 px-4" style={{ background: `${template.primaryColor}08` }}>
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className="text-center mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
        >
          <p className="font-elegant text-sm tracking-[0.3em] uppercase mb-3" style={{ color: template.primaryColor }}>
            Our Memories
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: template.headingFont, color: template.textColor }}
          >
            Photo Gallery
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="aspect-square overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <img
                src={photo.imageUrl}
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
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={prevPhoto}
            className="absolute left-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <img
            src={photos[lightboxIndex].imageUrl}
            alt={`Photo ${lightboxIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-xl"
            style={{ maxHeight: '85vh', maxWidth: '90vw' }}
          />
          <button
            onClick={nextPhoto}
            className="absolute right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 text-white/60 font-elegant text-sm">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}

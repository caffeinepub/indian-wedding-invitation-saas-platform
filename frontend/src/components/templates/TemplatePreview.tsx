import React from 'react';
import { FormData } from '@/context/InvitationFormContext';
import { getTemplateById } from '@/utils/templateDefinitions';

interface TemplatePreviewProps {
  formData: FormData;
  scale?: number;
}

export default function TemplatePreview({ formData, scale = 0.35 }: TemplatePreviewProps) {
  const template = getTemplateById(formData.selectedTemplate);
  const isDark = template.category === 'cinematic-dark';

  return (
    <div
      className="relative overflow-hidden rounded-xl shadow-luxury-lg border border-gold/20"
      style={{
        width: '100%',
        aspectRatio: '9/16',
        background: template.bgColor,
        maxWidth: '280px',
        margin: '0 auto',
      }}
    >
      {/* Background texture */}
      {!isDark && (
        <img
          src="/assets/generated/watercolor-texture.dim_1200x800.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start h-full p-4 text-center">
        {/* Header ornament */}
        <div className="w-full flex items-center justify-center mb-3">
          <div className="flex-1 h-px" style={{ background: `${template.primaryColor}40` }} />
          <div className="mx-2 text-xs" style={{ color: template.primaryColor }}>✦</div>
          <div className="flex-1 h-px" style={{ background: `${template.primaryColor}40` }} />
        </div>

        {/* Couple photo */}
        {formData.couplePhotoUrl ? (
          <div
            className="w-16 h-16 rounded-full overflow-hidden border-2 mb-3"
            style={{ borderColor: template.primaryColor }}
          >
            <img src={formData.couplePhotoUrl} alt="Couple" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div
            className="w-16 h-16 rounded-full mb-3 flex items-center justify-center text-2xl"
            style={{ background: `${template.primaryColor}20`, border: `2px solid ${template.primaryColor}40` }}
          >
            💑
          </div>
        )}

        {/* Names */}
        <div style={{ fontFamily: template.headingFont, color: template.primaryColor }}>
          <p className="text-sm font-bold">{formData.brideName || 'Bride'}</p>
          <p className="text-xs opacity-60 my-0.5" style={{ color: template.textColor }}>&</p>
          <p className="text-sm font-bold">{formData.groomName || 'Groom'}</p>
        </div>

        {/* Date */}
        {formData.weddingDate && (
          <p className="text-xs mt-2 font-inter" style={{ color: template.textColor, opacity: 0.7 }}>
            {new Date(formData.weddingDate).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        )}

        {/* Venue */}
        {formData.venueName && (
          <p className="text-xs mt-1 font-inter" style={{ color: template.textColor, opacity: 0.6 }}>
            {formData.venueName}
          </p>
        )}

        {/* Divider */}
        <div className="w-full flex items-center justify-center my-3">
          <div className="flex-1 h-px" style={{ background: `${template.primaryColor}30` }} />
          <div className="mx-2 text-xs" style={{ color: template.primaryColor }}>✦</div>
          <div className="flex-1 h-px" style={{ background: `${template.primaryColor}30` }} />
        </div>

        {/* Events preview */}
        {formData.events.slice(0, 2).map((event, i) => (
          <div key={i} className="w-full text-left mb-2 p-2 rounded-lg" style={{ background: `${template.primaryColor}15` }}>
            <p className="text-xs font-bold" style={{ fontFamily: template.headingFont, color: template.primaryColor }}>
              {event.title}
            </p>
            <p className="text-xs font-inter" style={{ color: template.textColor, opacity: 0.6 }}>
              {event.date} • {event.venue}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

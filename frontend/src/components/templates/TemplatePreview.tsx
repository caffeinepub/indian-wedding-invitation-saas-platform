import React from 'react';
import { FormData } from '@/context/InvitationFormContext';
import { getTemplateById } from '@/utils/templateDefinitions';

interface TemplatePreviewProps {
  formData: FormData;
  scale?: number;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function scaleColor(hex: string, intensity: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const factor = intensity / 100;
  const r = Math.min(255, Math.round(rgb.r * factor));
  const g = Math.min(255, Math.round(rgb.g * factor));
  const b = Math.min(255, Math.round(rgb.b * factor));
  return `rgb(${r}, ${g}, ${b})`;
}

export default function TemplatePreview({ formData }: TemplatePreviewProps) {
  const template = getTemplateById(formData.selectedTemplate);
  const isDark = template.category === 'cinematic-dark';

  const intensity = formData.accentIntensity ?? 100;
  const backgroundStyle = formData.backgroundStyle ?? 'gradient';
  const borderStyle = formData.borderStyle ?? 'classic';
  const layoutDensity = formData.layoutDensity ?? 'spacious';

  const scaledPrimary = scaleColor(template.primaryColor, intensity);
  const scaledAccent = scaleColor(template.accentColor, intensity);

  // Background computation
  let bgStyle: React.CSSProperties = { background: template.bgColor };
  if (backgroundStyle === 'gradient') {
    bgStyle = {
      background: `linear-gradient(160deg, ${template.bgColor} 0%, ${template.secondaryColor}18 60%, ${template.primaryColor}12 100%)`,
    };
  } else if (backgroundStyle === 'solid') {
    bgStyle = { background: template.bgColor };
  } else if (backgroundStyle === 'pattern') {
    bgStyle = {
      background: template.bgColor,
      backgroundImage: `radial-gradient(${template.primaryColor}15 1px, transparent 1px)`,
      backgroundSize: '12px 12px',
    };
  } else if (backgroundStyle === 'texture') {
    bgStyle = {
      background: `linear-gradient(135deg, ${template.bgColor} 25%, ${template.secondaryColor}20 50%, ${template.bgColor} 75%)`,
      backgroundSize: '20px 20px',
    };
  }

  // Border computation
  let borderCss: React.CSSProperties = {};
  if (borderStyle === 'classic') {
    borderCss = {
      border: `2px solid ${scaledPrimary}50`,
      boxShadow: `0 0 0 4px ${scaledPrimary}10, 0 8px 32px ${scaledPrimary}20`,
    };
  } else if (borderStyle === 'ornate') {
    borderCss = {
      border: `3px double ${scaledPrimary}70`,
      boxShadow: `inset 0 0 0 2px ${scaledAccent}20, 0 8px 32px ${scaledPrimary}25`,
      outline: `1px solid ${scaledPrimary}30`,
      outlineOffset: '3px',
    };
  } else {
    // none
    borderCss = { border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.12)' };
  }

  const isCompact = layoutDensity === 'compact';
  const padClass = isCompact ? 'p-3' : 'p-5';
  const gapClass = isCompact ? 'gap-1' : 'gap-2';
  const photoSize = isCompact ? 'w-12 h-12' : 'w-16 h-16';
  const nameSizeClass = isCompact ? 'text-xs' : 'text-sm';
  const eventPad = isCompact ? 'p-1.5' : 'p-2';

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        width: '100%',
        aspectRatio: '9/16',
        maxWidth: '260px',
        margin: '0 auto',
        ...bgStyle,
        ...borderCss,
      }}
    >
      {/* Watercolor texture overlay for light themes */}
      {!isDark && backgroundStyle !== 'pattern' && (
        <img
          src="/assets/generated/watercolor-texture.dim_1200x800.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: backgroundStyle === 'texture' ? 0.15 : 0.08 }}
        />
      )}

      {/* Ornate border overlay */}
      {borderStyle === 'ornate' && (
        <div
          className="absolute inset-2 rounded-xl pointer-events-none z-20"
          style={{ border: `1px solid ${scaledPrimary}30` }}
        />
      )}

      {/* Content */}
      <div className={`relative z-10 flex flex-col items-center justify-start h-full ${padClass} text-center ${gapClass}`}>
        {/* Header ornament */}
        <div className="w-full flex items-center justify-center mb-1">
          <div className="flex-1 h-px" style={{ background: `${scaledPrimary}40` }} />
          <div className="mx-2 text-xs" style={{ color: scaledPrimary }}>✦</div>
          <div className="flex-1 h-px" style={{ background: `${scaledPrimary}40` }} />
        </div>

        {/* Couple photo */}
        {formData.couplePhotoUrl ? (
          <div
            className={`${photoSize} rounded-full overflow-hidden border-2 ${isCompact ? 'mb-1' : 'mb-2'}`}
            style={{ borderColor: scaledPrimary }}
          >
            <img src={formData.couplePhotoUrl} alt="Couple" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div
            className={`${photoSize} rounded-full ${isCompact ? 'mb-1' : 'mb-2'} flex items-center justify-center text-xl`}
            style={{ background: `${scaledPrimary}20`, border: `2px solid ${scaledPrimary}40` }}
          >
            💑
          </div>
        )}

        {/* Names */}
        <div style={{ fontFamily: template.headingFont, color: scaledPrimary }}>
          <p className={`${nameSizeClass} font-bold`}>{formData.brideName || 'Bride'}</p>
          <p className="text-xs opacity-60 my-0.5" style={{ color: template.textColor }}>&</p>
          <p className={`${nameSizeClass} font-bold`}>{formData.groomName || 'Groom'}</p>
        </div>

        {/* Date */}
        {formData.weddingDate && (
          <p className="text-xs font-inter" style={{ color: template.textColor, opacity: 0.7 }}>
            {new Date(formData.weddingDate).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        )}

        {/* Venue */}
        {formData.venueName && (
          <p className="text-xs font-inter" style={{ color: template.textColor, opacity: 0.6 }}>
            {formData.venueName}
          </p>
        )}

        {/* Divider */}
        <div className="w-full flex items-center justify-center my-1">
          <div className="flex-1 h-px" style={{ background: `${scaledPrimary}30` }} />
          <div className="mx-2 text-xs" style={{ color: scaledAccent }}>✦</div>
          <div className="flex-1 h-px" style={{ background: `${scaledPrimary}30` }} />
        </div>

        {/* Events preview */}
        {formData.events.slice(0, isCompact ? 1 : 2).map((event, i) => (
          <div
            key={i}
            className={`w-full text-left ${eventPad} rounded-lg`}
            style={{ background: `${scaledPrimary}15` }}
          >
            <p
              className="text-xs font-bold"
              style={{ fontFamily: template.headingFont, color: scaledPrimary }}
            >
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

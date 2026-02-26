import React from 'react';
import { useInvitationForm } from '../../context/InvitationFormContext';
import { getTemplateById, COLOR_SCHEMES, FONT_CHOICES as TEMPLATE_FONT_CHOICES } from '../../utils/templateDefinitions';
import { FONT_CHOICES } from './FontSelector';

function getBackgroundStyle(backgroundChoice: string, primaryColor: string) {
  switch (backgroundChoice) {
    case 'floral':
      return {
        background: `radial-gradient(ellipse at 20% 20%, ${primaryColor}22 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, ${primaryColor}18 0%, transparent 50%), linear-gradient(135deg, #fdf8f0 0%, #faf4e8 100%)`,
      };
    case 'paisley':
      return {
        background: `repeating-linear-gradient(45deg, ${primaryColor}08 0px, ${primaryColor}08 2px, transparent 2px, transparent 12px), linear-gradient(135deg, #fdf8f0 0%, #f5ede0 100%)`,
      };
    case 'watercolor':
      return {
        background: `radial-gradient(ellipse at 30% 40%, ${primaryColor}30 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, ${primaryColor}20 0%, transparent 50%), linear-gradient(180deg, #fdf9f4 0%, #f8f0e8 100%)`,
      };
    case 'dark-floral':
      return {
        background: `radial-gradient(ellipse at 20% 20%, ${primaryColor}40 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, ${primaryColor}30 0%, transparent 50%), linear-gradient(135deg, #1a1208 0%, #0d0a05 100%)`,
      };
    case 'dark-minimal':
      return {
        background: `linear-gradient(135deg, #1c1c1c 0%, #0a0a0a 100%)`,
      };
    case 'minimal':
    default:
      return {
        background: `linear-gradient(135deg, #fdfcfb 0%, #f8f5f0 100%)`,
      };
  }
}

function isDarkBackground(backgroundChoice: string): boolean {
  return backgroundChoice === 'dark-floral' || backgroundChoice === 'dark-minimal';
}

export default function TemplatePreview() {
  const { formData } = useInvitationForm();

  const template = getTemplateById(formData.selectedTemplate);

  // Resolve color scheme
  const colorSchemeObj = COLOR_SCHEMES.find((cs) => cs.id === formData.colorScheme);
  const primaryColor = colorSchemeObj?.primary || template?.primaryColor || '#c9a84c';
  const secondaryColor = colorSchemeObj?.secondary || template?.secondaryColor || '#8b6914';
  const accentColor = colorSchemeObj?.accent || template?.accentColor || '#f0e6d0';

  // Resolve font
  const fontChoice = FONT_CHOICES.find((f) => f.id === formData.fontChoice);
  const headingFont = fontChoice?.heading || template?.headingFont || 'Cormorant Garamond';
  const headingWeight = fontChoice?.headingWeight || '600';
  const bodyFont = fontChoice?.body || template?.bodyFont || 'Lato';

  const bgStyle = getBackgroundStyle(formData.backgroundChoice || 'minimal', primaryColor);
  const isDark = isDarkBackground(formData.backgroundChoice || 'minimal');

  const textColor = isDark ? '#f5f0e8' : '#2c1810';
  const subtextColor = isDark ? '#d4c4a8' : '#6b4c3b';
  const dividerColor = primaryColor;

  const brideName = formData.brideName || 'Priya';
  const groomName = formData.groomName || 'Arjun';
  const weddingDate = formData.weddingDate || '2025-02-14';
  const venueName = formData.venueName || 'Grand Palace';

  const formattedDate = weddingDate
    ? new Date(weddingDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'February 14, 2025';

  return (
    <div
      className="rounded-xl overflow-hidden shadow-2xl border"
      style={{
        ...bgStyle,
        borderColor: `${primaryColor}40`,
        minHeight: '420px',
      }}
    >
      {/* Top ornament */}
      <div className="flex justify-center pt-6 pb-2">
        <div
          className="w-16 h-0.5 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` }}
        />
      </div>

      {/* Header */}
      <div className="text-center px-6 py-2">
        <p
          className="text-xs uppercase tracking-[0.3em] mb-3"
          style={{ color: subtextColor, fontFamily: `'${bodyFont}', sans-serif` }}
        >
          Together with their families
        </p>
        <h1
          className="text-4xl leading-tight mb-1"
          style={{
            fontFamily: `'${headingFont}', serif`,
            fontWeight: headingWeight,
            color: primaryColor,
          }}
        >
          {brideName}
        </h1>
        <div
          className="text-lg my-2"
          style={{ color: subtextColor, fontFamily: `'${bodyFont}', sans-serif` }}
        >
          &amp;
        </div>
        <h1
          className="text-4xl leading-tight"
          style={{
            fontFamily: `'${headingFont}', serif`,
            fontWeight: headingWeight,
            color: primaryColor,
          }}
        >
          {groomName}
        </h1>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center gap-3 my-4 px-8">
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${dividerColor}60)` }} />
        <div className="w-2 h-2 rounded-full" style={{ background: primaryColor }} />
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${dividerColor}60, transparent)` }} />
      </div>

      {/* Date & Venue */}
      <div className="text-center px-6 pb-4">
        <p
          className="text-sm font-medium mb-1"
          style={{ color: textColor, fontFamily: `'${bodyFont}', sans-serif` }}
        >
          {formattedDate}
        </p>
        <p
          className="text-xs"
          style={{ color: subtextColor, fontFamily: `'${bodyFont}', sans-serif` }}
        >
          {venueName}
        </p>
      </div>

      {/* Invitation message preview */}
      {formData.invitationMessage && (
        <div
          className="mx-6 mb-4 p-3 rounded-lg text-center"
          style={{ background: `${primaryColor}12`, borderLeft: `2px solid ${primaryColor}40` }}
        >
          <p
            className="text-xs italic leading-relaxed line-clamp-3"
            style={{ color: subtextColor, fontFamily: `'${bodyFont}', sans-serif` }}
          >
            "{formData.invitationMessage}"
          </p>
        </div>
      )}

      {/* Template & theme info */}
      <div className="px-6 pb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {template && (
            <span
              className="text-xs px-2 py-1 rounded-full"
              style={{
                background: `${primaryColor}20`,
                color: isDark ? '#e8d5b0' : subtextColor,
                fontFamily: `'${bodyFont}', sans-serif`,
              }}
            >
              {template.name}
            </span>
          )}
          {colorSchemeObj && (
            <span
              className="text-xs px-2 py-1 rounded-full flex items-center gap-1"
              style={{
                background: `${primaryColor}20`,
                color: isDark ? '#e8d5b0' : subtextColor,
                fontFamily: `'${bodyFont}', sans-serif`,
              }}
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ background: primaryColor }}
              />
              {colorSchemeObj.name}
            </span>
          )}
          {fontChoice && (
            <span
              className="text-xs px-2 py-1 rounded-full"
              style={{
                background: `${primaryColor}20`,
                color: isDark ? '#e8d5b0' : subtextColor,
                fontFamily: `'${headingFont}', serif`,
              }}
            >
              {fontChoice.name}
            </span>
          )}
        </div>
      </div>

      {/* Bottom ornament */}
      <div className="flex justify-center pb-6">
        <div
          className="w-16 h-0.5 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` }}
        />
      </div>
    </div>
  );
}

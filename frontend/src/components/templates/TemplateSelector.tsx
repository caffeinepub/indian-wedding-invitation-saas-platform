import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { TEMPLATES, TemplateDefinition } from '@/utils/templateDefinitions';
import { Badge } from '@/components/ui/badge';

interface TemplateSelectorProps {
  selected: string;
  onChange: (templateId: string) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  'royal-indian': '👑 Royal Indian',
  'modern-minimal': '✦ Modern Minimal',
  'cinematic-dark': '🎬 Cinematic Dark',
  'romantic': '🌹 Romantic',
  'boho-floral': '🌸 Boho & Floral',
  'vintage-rustic': '📜 Vintage & Rustic',
};

const CATEGORY_ORDER = [
  'royal-indian',
  'modern-minimal',
  'cinematic-dark',
  'romantic',
  'boho-floral',
  'vintage-rustic',
] as const;

export default function TemplateSelector({ selected, onChange }: TemplateSelectorProps) {
  return (
    <div className="space-y-7">
      {CATEGORY_ORDER.map((category) => {
        const templates = TEMPLATES.filter(t => t.category === category);
        if (templates.length === 0) return null;
        return (
          <div key={category}>
            <div className="flex items-center gap-3 mb-3">
              <h4 className="font-cinzel text-xs font-bold tracking-widest text-muted-foreground uppercase">
                {CATEGORY_LABELS[category]}
              </h4>
              <div className="flex-1 h-px bg-border/60" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selected === template.id}
                  onSelect={() => onChange(template.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TemplateCard({
  template,
  isSelected,
  onSelect,
}: {
  template: TemplateDefinition;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const isDark = template.category === 'cinematic-dark';
  const textOnPreview = isDark ? template.textColor : '#FFFFFF';

  return (
    <div
      className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 group ${
        isSelected
          ? 'border-gold shadow-gold scale-[1.02]'
          : 'border-border hover:border-gold/50 hover:shadow-md hover:scale-[1.01]'
      }`}
      onClick={onSelect}
    >
      {/* Preview area */}
      <div
        className="h-32 relative overflow-hidden"
        style={{ background: template.previewGradient }}
      >
        {/* Decorative overlay pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, ${template.accentColor} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${template.primaryColor} 0%, transparent 50%)`,
          }}
        />

        {/* Simulated invitation card */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 gap-1">
          {/* Top ornament */}
          <div className="flex items-center gap-1 mb-0.5">
            <div className="w-4 h-px" style={{ background: `${textOnPreview}60` }} />
            <span className="text-[8px]" style={{ color: `${textOnPreview}90` }}>✦</span>
            <div className="w-4 h-px" style={{ background: `${textOnPreview}60` }} />
          </div>

          {/* Names */}
          <div
            className="text-center leading-tight"
            style={{ fontFamily: template.headingFont, color: textOnPreview }}
          >
            <div className="text-[11px] font-bold tracking-wide drop-shadow-sm">Priya</div>
            <div className="text-[8px] opacity-70 font-light">&amp;</div>
            <div className="text-[11px] font-bold tracking-wide drop-shadow-sm">Arjun</div>
          </div>

          {/* Date */}
          <div
            className="text-[8px] tracking-widest uppercase mt-0.5 opacity-80"
            style={{ color: textOnPreview, fontFamily: template.bodyFont }}
          >
            March 2026
          </div>

          {/* Bottom ornament */}
          <div className="flex items-center gap-1 mt-0.5">
            <div className="w-6 h-px" style={{ background: `${textOnPreview}50` }} />
            <div className="w-1 h-1 rounded-full" style={{ background: `${textOnPreview}70` }} />
            <div className="w-6 h-px" style={{ background: `${textOnPreview}50` }} />
          </div>
        </div>

        {/* Selected check */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-gold rounded-full flex items-center justify-center shadow-gold z-10">
            <Check className="w-3.5 h-3.5 text-foreground" />
          </div>
        )}

        {/* New badge */}
        {template.isNew && !isSelected && (
          <div className="absolute top-2 left-2 z-10">
            <Badge
              variant="default"
              className="text-[9px] px-1.5 py-0 h-4 font-cinzel tracking-wider bg-gold text-foreground border-0 shadow-sm"
            >
              NEW
            </Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div
        className="p-2.5 border-t"
        style={{
          background: isDark ? template.bgColor : 'var(--card)',
          borderColor: `${template.primaryColor}30`,
        }}
      >
        <div className="flex items-start justify-between gap-1">
          <p
            className="font-cinzel text-xs font-bold leading-tight"
            style={{ color: template.primaryColor }}
          >
            {template.name}
          </p>
          {template.isNew && (
            <Badge
              variant="outline"
              className="text-[8px] px-1 py-0 h-3.5 font-cinzel tracking-wider shrink-0 border-gold/50 text-gold-dark hidden sm:flex"
            >
              NEW
            </Badge>
          )}
        </div>
        <p className="font-inter text-[10px] text-muted-foreground mt-0.5 line-clamp-1 leading-tight">
          {template.description}
        </p>
      </div>
    </div>
  );
}

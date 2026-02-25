import React from 'react';
import { Check } from 'lucide-react';
import { TEMPLATES, TemplateDefinition } from '@/utils/templateDefinitions';
import { Badge } from '@/components/ui/badge';

interface TemplateSelectorProps {
  selected: string;
  onChange: (templateId: string) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  'royal-indian': 'Royal Indian',
  'modern-minimal': 'Modern Minimal',
  'cinematic-dark': 'Cinematic Dark',
};

export default function TemplateSelector({ selected, onChange }: TemplateSelectorProps) {
  const categories = ['royal-indian', 'modern-minimal', 'cinematic-dark'] as const;

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category}>
          <h4 className="font-cinzel text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-3">
            {CATEGORY_LABELS[category]}
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {TEMPLATES.filter(t => t.category === category).map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selected === template.id}
                onSelect={() => onChange(template.id)}
              />
            ))}
          </div>
        </div>
      ))}
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
  return (
    <div
      className={`template-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      {/* Preview */}
      <div
        className="h-28 relative"
        style={{ background: template.previewGradient }}
      >
        {/* Simulated invitation preview */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
          <div
            className="text-center"
            style={{ fontFamily: template.headingFont, color: template.category === 'cinematic-dark' ? '#F5E6C8' : '#FFF8E7' }}
          >
            <div className="text-xs font-bold tracking-widest opacity-80 mb-1">✦ WEDDING ✦</div>
            <div className="text-sm font-bold">Priya & Arjun</div>
            <div className="text-xs opacity-70 mt-1">March 2026</div>
          </div>
        </div>
        {isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-gold rounded-full flex items-center justify-center shadow-gold">
            <Check className="w-3.5 h-3.5 text-foreground" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 bg-card border-t border-border">
        <p className="font-cinzel text-sm font-bold text-foreground">{template.name}</p>
        <p className="font-inter text-xs text-muted-foreground mt-0.5 line-clamp-1">{template.description}</p>
      </div>
    </div>
  );
}

import React from 'react';
import { Check } from 'lucide-react';
import { FONT_CHOICES } from '@/utils/templateDefinitions';

interface FontSelectorProps {
  selected: string;
  onChange: (font: string) => void;
}

export default function FontSelector({ selected, onChange }: FontSelectorProps) {
  return (
    <div className="space-y-3">
      <h4 className="font-cinzel text-sm font-semibold tracking-wide text-foreground">Font Pairing</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FONT_CHOICES.map((font) => (
          <button
            key={font.id}
            onClick={() => onChange(font.id)}
            className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              selected === font.id
                ? 'border-gold shadow-gold bg-gold/5'
                : 'border-border hover:border-gold/40'
            }`}
          >
            <p
              className="text-xl font-bold text-foreground mb-1"
              style={{ fontFamily: font.heading }}
            >
              {font.sample}
            </p>
            <p className="font-inter text-xs text-muted-foreground">{font.name}</p>
            {selected === font.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

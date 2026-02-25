import React from 'react';
import { Check } from 'lucide-react';
import { COLOR_SCHEMES } from '@/utils/templateDefinitions';

interface ColorSchemePickerProps {
  selected: string;
  onChange: (scheme: string) => void;
}

export default function ColorSchemePicker({ selected, onChange }: ColorSchemePickerProps) {
  return (
    <div className="space-y-3">
      <h4 className="font-cinzel text-sm font-semibold tracking-wide text-foreground">Color Scheme</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {COLOR_SCHEMES.map((scheme) => (
          <button
            key={scheme.id}
            onClick={() => onChange(scheme.id)}
            className={`relative p-3 rounded-xl border-2 transition-all duration-200 text-left ${
              selected === scheme.id
                ? 'border-gold shadow-gold'
                : 'border-border hover:border-gold/40'
            }`}
          >
            {/* Color swatches */}
            <div className="flex gap-1 mb-2">
              {scheme.colors.map((color, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border border-white/50 shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="font-inter text-xs font-medium text-foreground">{scheme.name}</span>
            {selected === scheme.id && (
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

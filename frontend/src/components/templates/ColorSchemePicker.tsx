import React from 'react';
import { useInvitationForm } from '@/context/InvitationFormContext';
import { COLOR_SCHEMES } from '@/utils/templateDefinitions';
import { Check } from 'lucide-react';

export default function ColorSchemePicker() {
  const { formData, updateFormData } = useInvitationForm();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {COLOR_SCHEMES.map(scheme => (
        <button
          key={scheme.id}
          onClick={() => updateFormData({ colorScheme: scheme.id })}
          className={`relative p-3 rounded-xl border-2 transition-all duration-200 ${
            formData.colorScheme === scheme.id
              ? 'border-gold shadow-luxury'
              : 'border-gold/20 hover:border-gold/50'
          }`}
        >
          {formData.colorScheme === scheme.id && (
            <div className="absolute top-1 right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-charcoal" />
            </div>
          )}
          <div className="flex gap-1 mb-2">
            {scheme.colors.map((color, i) => (
              <div
                key={i}
                className="flex-1 h-6 rounded"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <p className="font-elegant text-xs text-charcoal font-medium text-left">{scheme.name}</p>
        </button>
      ))}
    </div>
  );
}

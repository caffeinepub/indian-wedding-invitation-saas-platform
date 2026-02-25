import React from 'react';
import { useInvitationForm } from '@/context/InvitationFormContext';
import TemplateSelector from '@/components/templates/TemplateSelector';
import ColorSchemePicker from '@/components/templates/ColorSchemePicker';
import FontSelector from '@/components/templates/FontSelector';
import TemplatePreview from '@/components/templates/TemplatePreview';
import { BACKGROUND_CHOICES } from '@/utils/templateDefinitions';
import { Check } from 'lucide-react';

export default function TemplateThemeStep() {
  const { formData, updateFormData } = useInvitationForm();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-gold-dark mb-2">
          Template & Theme
        </h2>
        <p className="font-inter text-muted-foreground">
          Choose your perfect wedding aesthetic
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Customization Options */}
        <div className="lg:col-span-2 space-y-8">
          {/* Template Selection */}
          <div className="luxury-card p-6">
            <h3 className="font-cinzel text-lg font-bold text-gold-dark mb-4">Choose Template</h3>
            <TemplateSelector
              selected={formData.selectedTemplate}
              onChange={(id) => updateFormData({ selectedTemplate: id })}
            />
          </div>

          {/* Color Scheme */}
          <div className="luxury-card p-6">
            <ColorSchemePicker
              selected={formData.colorScheme}
              onChange={(scheme) => updateFormData({ colorScheme: scheme })}
            />
          </div>

          {/* Font Selection */}
          <div className="luxury-card p-6">
            <FontSelector
              selected={formData.fontChoice}
              onChange={(font) => updateFormData({ fontChoice: font })}
            />
          </div>

          {/* Background */}
          <div className="luxury-card p-6">
            <h4 className="font-cinzel text-sm font-semibold tracking-wide text-foreground mb-3">
              Background Style
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {BACKGROUND_CHOICES.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => updateFormData({ backgroundChoice: bg.id })}
                  className={`relative p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                    formData.backgroundChoice === bg.id
                      ? 'border-gold shadow-gold bg-gold/5'
                      : 'border-border hover:border-gold/40'
                  }`}
                >
                  <p className="font-cinzel text-sm font-bold text-foreground">{bg.name}</p>
                  <p className="font-inter text-xs text-muted-foreground mt-0.5">{bg.description}</p>
                  {formData.backgroundChoice === bg.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="font-cinzel text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-4 text-center">
              Live Preview
            </h3>
            <TemplatePreview formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}

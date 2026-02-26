import React from 'react';
import { useInvitationForm } from '@/context/InvitationFormContext';
import { TEMPLATES, getCategories } from '@/utils/templateDefinitions';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function TemplateSelector() {
  const { formData, updateFormData } = useInvitationForm();
  const categories = getCategories();

  return (
    <div className="space-y-8">
      {categories.map(category => {
        const categoryTemplates = TEMPLATES.filter(t => t.category === category);
        return (
          <div key={category}>
            <h4 className="font-elegant text-sm font-semibold text-charcoal-light uppercase tracking-widest mb-3">
              {category}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categoryTemplates.map(template => {
                const isDark = template.category === 'cinematic-dark';
                const textOnPreview = isDark ? template.textColor : '#FFFFFF';
                const isSelected = formData.selectedTemplate === template.id;

                return (
                  <button
                    key={template.id}
                    onClick={() => updateFormData({ selectedTemplate: template.id })}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      isSelected ? 'border-gold shadow-luxury' : 'border-transparent hover:border-gold/50'
                    }`}
                  >
                    {/* Preview card */}
                    <div
                      className="p-4 min-h-24 flex flex-col items-center justify-center"
                      style={{ background: template.previewGradient }}
                    >
                      <p
                        className="text-sm font-semibold text-center leading-tight"
                        style={{ fontFamily: template.headingFont, color: textOnPreview }}
                      >
                        {template.name}
                      </p>
                      <p
                        className="text-xs mt-1 opacity-70 text-center"
                        style={{ color: textOnPreview, fontFamily: template.bodyFont }}
                      >
                        Priya & Arjun
                      </p>
                    </div>

                    {/* Card footer */}
                    <div
                      className="px-3 py-2"
                      style={{
                        background: isDark ? template.bgColor : 'var(--card)',
                      }}
                    >
                      <p className="font-elegant text-xs text-charcoal font-medium truncate">{template.name}</p>
                    </div>

                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-charcoal" />
                      </div>
                    )}

                    {/* New badge */}
                    {template.isNew && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-crimson text-ivory text-xs px-1.5 py-0.5">NEW</Badge>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

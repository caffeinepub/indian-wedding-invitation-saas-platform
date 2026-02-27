import React from 'react';
import { PREMIUM_THEMES } from '../../utils/templateDefinitions';
import { useInvitationForm } from '../../context/InvitationFormContext';
import { Check, Sparkles } from 'lucide-react';

export default function TemplateSelector() {
  const { formData, updateFormData } = useInvitationForm();

  const handleSelect = (theme: typeof PREMIUM_THEMES[0]) => {
    updateFormData({
      selectedTemplate: theme.id,
      colorScheme: theme.id,
      primaryColor: theme.primaryColor,
      accentColor: theme.accentColor,
      backgroundColor: theme.backgroundColor,
      headingFont: theme.headingFont,
      bodyFont: theme.bodyFont,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-gold-500" />
        <h3 className="font-semibold text-foreground text-lg">Premium Themes</h3>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {PREMIUM_THEMES.map((theme) => {
          const isSelected = formData.selectedTemplate === theme.id;
          const isDark = theme.backgroundColor.startsWith('#1') || theme.backgroundColor.startsWith('#0');
          return (
            <button
              key={theme.id}
              onClick={() => handleSelect(theme)}
              className={`relative w-full text-left rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                isSelected ? 'border-gold-500 shadow-gold ring-2 ring-gold-300' : 'border-border hover:border-gold-300'
              }`}
            >
              {/* Theme preview strip */}
              <div
                className="h-20 w-full relative overflow-hidden"
                style={{ background: theme.gradient }}
              >
                {/* Color swatches */}
                <div className="absolute bottom-2 left-3 flex gap-1.5">
                  {theme.previewColors.map((color, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full border-2 border-white/50 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                {/* Sample text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-sm font-bold opacity-60"
                    style={{
                      fontFamily: theme.headingFont,
                      color: isDark ? '#F0E6C8' : theme.accentColor,
                    }}
                  >
                    ♦ {theme.name} ♦
                  </span>
                </div>
                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                {theme.isNew && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold bg-gold-500 text-white">
                    NEW
                  </div>
                )}
              </div>
              {/* Theme info */}
              <div className="p-3 bg-card">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{theme.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{theme.description}</p>
                  </div>
                </div>
                <div className="mt-2 flex gap-1 flex-wrap">
                  {theme.decorativeElements.slice(0, 3).map((el) => (
                    <span key={el} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {el.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import { useInvitationForm } from '../../context/InvitationFormContext';
import { LUXURY_PALETTES } from '../../utils/templateDefinitions';
import { getTextColor } from '../../utils/colorUtils';
import { Palette } from 'lucide-react';
import { Label } from '@/components/ui/label';

export default function ColorSchemePicker() {
  const { formData, updateFormData } = useInvitationForm();

  const applyPalette = (palette: typeof LUXURY_PALETTES[0]) => {
    updateFormData({
      primaryColor: palette.primary,
      accentColor: palette.accent,
      backgroundColor: palette.bg,
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Palette className="w-5 h-5 text-gold-500" />
        <h3 className="font-semibold text-foreground text-lg">Color Customization</h3>
      </div>

      {/* Luxury Palettes */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-3 block">Luxury Palettes</Label>
        <div className="grid grid-cols-2 gap-2">
          {LUXURY_PALETTES.map((palette) => {
            const isActive =
              formData.primaryColor === palette.primary &&
              formData.accentColor === palette.accent &&
              formData.backgroundColor === palette.bg;
            return (
              <button
                key={palette.name}
                onClick={() => applyPalette(palette)}
                className={`relative p-2.5 rounded-lg border-2 text-left transition-all hover:scale-[1.02] min-h-[44px] ${
                  isActive ? 'border-gold-500 shadow-gold' : 'border-border hover:border-gold-300'
                }`}
              >
                <div className="flex gap-1.5 mb-1.5">
                  <div className="w-5 h-5 rounded-full border border-white/50 shadow-sm" style={{ backgroundColor: palette.primary }} />
                  <div className="w-5 h-5 rounded-full border border-white/50 shadow-sm" style={{ backgroundColor: palette.accent }} />
                  <div className="w-5 h-5 rounded-full border border-border" style={{ backgroundColor: palette.bg }} />
                </div>
                <span className="text-xs font-medium text-foreground leading-tight">{palette.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Individual Color Pickers */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-foreground block">Custom Colors</Label>

        <div className="space-y-3">
          <div className="flex items-center justify-between min-h-[44px]">
            <div>
              <p className="text-sm font-medium text-foreground">Primary Color</p>
              <p className="text-xs text-muted-foreground">Main accent & headings</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-border shadow-sm" style={{ backgroundColor: formData.primaryColor }} />
              <input
                type="color"
                value={formData.primaryColor}
                onChange={(e) => updateFormData({ primaryColor: e.target.value })}
                className="w-10 h-10 rounded cursor-pointer border border-border"
                title="Primary Color"
              />
            </div>
          </div>

          <div className="flex items-center justify-between min-h-[44px]">
            <div>
              <p className="text-sm font-medium text-foreground">Accent Color</p>
              <p className="text-xs text-muted-foreground">Borders & highlights</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-border shadow-sm" style={{ backgroundColor: formData.accentColor }} />
              <input
                type="color"
                value={formData.accentColor}
                onChange={(e) => updateFormData({ accentColor: e.target.value })}
                className="w-10 h-10 rounded cursor-pointer border border-border"
                title="Accent Color"
              />
            </div>
          </div>

          <div className="flex items-center justify-between min-h-[44px]">
            <div>
              <p className="text-sm font-medium text-foreground">Background Color</p>
              <p className="text-xs text-muted-foreground">Page background</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-border shadow-sm" style={{ backgroundColor: formData.backgroundColor }} />
              <input
                type="color"
                value={formData.backgroundColor}
                onChange={(e) => updateFormData({ backgroundColor: e.target.value })}
                className="w-10 h-10 rounded cursor-pointer border border-border"
                title="Background Color"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div
          className="rounded-lg p-4 border border-border"
          style={{ backgroundColor: formData.backgroundColor }}
        >
          <p
            className="text-sm font-bold mb-1"
            style={{ color: formData.primaryColor, fontFamily: formData.headingFont }}
          >
            Preview Heading
          </p>
          <p
            className="text-xs"
            style={{ color: getTextColor(formData.backgroundColor) }}
          >
            Body text with auto contrast
          </p>
          <div className="mt-2 h-1 rounded-full" style={{ backgroundColor: formData.accentColor }} />
        </div>
      </div>
    </div>
  );
}

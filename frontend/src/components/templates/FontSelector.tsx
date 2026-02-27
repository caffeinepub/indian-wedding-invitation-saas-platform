import React from 'react';
import { useInvitationForm } from '../../context/InvitationFormContext';
import { FONT_CHOICES } from '../../utils/templateDefinitions';
import { Type } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ALL_HEADING_FONTS = [
  'Playfair Display', 'Great Vibes', 'Cinzel', 'Tangerine', 'Bodoni Moda',
  'Old Standard TT', 'Prata', 'EB Garamond', 'Cinzel Decorative', 'Cormorant Garamond',
  'Abril Fatface', 'DM Serif Display',
];

const ALL_BODY_FONTS = [
  'Lora', 'Montserrat', 'Cormorant Garamond', 'Raleway', 'Libre Baskerville',
  'Crimson Text', 'Karla', 'Merriweather', 'EB Garamond', 'Libre Baskerville',
];

export default function FontSelector() {
  const { formData, updateFormData } = useInvitationForm();

  const applyPairing = (pairing: typeof FONT_CHOICES[0]) => {
    updateFormData({
      fontChoice: pairing.id,
      headingFont: pairing.heading,
      bodyFont: pairing.body,
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Type className="w-5 h-5 text-gold-500" />
        <h3 className="font-semibold text-foreground text-lg">Font Pairing System</h3>
      </div>

      {/* Curated Pairings */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-3 block">Curated Luxury Pairings</Label>
        <div className="grid grid-cols-1 gap-2">
          {FONT_CHOICES.map((pairing) => {
            const isActive = formData.fontChoice === pairing.id;
            return (
              <button
                key={pairing.id}
                onClick={() => applyPairing(pairing)}
                className={`p-3 rounded-lg border-2 text-left transition-all hover:scale-[1.01] min-h-[44px] ${
                  isActive ? 'border-gold-500 bg-gold-50 shadow-gold' : 'border-border hover:border-gold-300 bg-card'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{pairing.name}</span>
                  {isActive && <span className="text-xs text-gold-600 font-bold">✓ Active</span>}
                </div>
                <div className="mt-1">
                  <span className="text-base" style={{ fontFamily: pairing.heading }}>
                    {pairing.heading}
                  </span>
                  <span className="text-muted-foreground mx-2 text-xs">+</span>
                  <span className="text-sm text-muted-foreground" style={{ fontFamily: pairing.body }}>
                    {pairing.body}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Individual Font Selectors */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-foreground block">Custom Font Selection</Label>

        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">Heading Font</Label>
            <Select
              value={formData.headingFont}
              onValueChange={(val) => updateFormData({ headingFont: val })}
            >
              <SelectTrigger className="min-h-[44px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ALL_HEADING_FONTS.map((font) => (
                  <SelectItem key={font} value={font}>
                    <span style={{ fontFamily: font }}>{font}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">Body Font</Label>
            <Select
              value={formData.bodyFont}
              onValueChange={(val) => updateFormData({ bodyFont: val })}
            >
              <SelectTrigger className="min-h-[44px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ALL_BODY_FONTS.map((font) => (
                  <SelectItem key={font} value={font}>
                    <span style={{ fontFamily: font }}>{font}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Letter Spacing */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium text-foreground">Letter Spacing</Label>
          <span className="text-xs text-muted-foreground font-mono">{formData.letterSpacing.toFixed(2)}em</span>
        </div>
        <Slider
          min={-0.05}
          max={0.2}
          step={0.01}
          value={[formData.letterSpacing]}
          onValueChange={([val]) => updateFormData({ letterSpacing: val })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Tight</span>
          <span>Normal</span>
          <span>Wide</span>
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-lg p-4 border border-border bg-card">
        <p
          className="text-lg font-bold mb-1"
          style={{
            fontFamily: formData.headingFont,
            letterSpacing: `${formData.letterSpacing}em`,
            color: formData.primaryColor,
          }}
        >
          Priya & Arjun
        </p>
        <p
          className="text-sm text-muted-foreground"
          style={{
            fontFamily: formData.bodyFont,
            letterSpacing: `${formData.letterSpacing * 0.5}em`,
          }}
        >
          Together with their families, joyfully invite you...
        </p>
      </div>
    </div>
  );
}

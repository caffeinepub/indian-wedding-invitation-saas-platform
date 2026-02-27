import React from 'react';
import { useInvitationForm } from '../../context/InvitationFormContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Layers, Flower2, Frame, Sparkles, Sun, Image } from 'lucide-react';
import type { BackgroundType } from '../../context/InvitationFormContext';

const BG_TYPES: { id: BackgroundType; label: string; icon: string }[] = [
  { id: 'solid', label: 'Solid', icon: '■' },
  { id: 'gradient', label: 'Gradient', icon: '◈' },
  { id: 'image', label: 'Texture', icon: '⊞' },
];

const DECORATIONS = [
  { key: 'mandalaWatermark' as const, label: 'Mandala Watermark', icon: <Sparkles className="w-4 h-4" />, desc: 'Subtle mandala overlay' },
  { key: 'floralBorder' as const, label: 'Floral Border', icon: <Flower2 className="w-4 h-4" />, desc: 'Decorative floral frame' },
  { key: 'goldFrame' as const, label: 'Gold Frame', icon: <Frame className="w-4 h-4" />, desc: 'Elegant gold border' },
  { key: 'animatedPetals' as const, label: 'Animated Petals', icon: <Sparkles className="w-4 h-4" />, desc: 'Floating petal animation' },
  { key: 'diyaGlow' as const, label: 'Diya Glow', icon: <Sun className="w-4 h-4" />, desc: 'Warm diya light effect' },
];

export default function BackgroundDecorationControls() {
  const { formData, updateFormData } = useInvitationForm();

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Layers className="w-5 h-5 text-gold-500" />
        <h3 className="font-semibold text-foreground text-lg">Background & Decorations</h3>
      </div>

      {/* Background Type */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-3 block">Background Type</Label>
        <div className="grid grid-cols-3 gap-2">
          {BG_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => updateFormData({ backgroundType: type.id, backgroundChoice: type.id })}
              className={`min-h-[44px] flex flex-col items-center justify-center gap-1 rounded-lg border-2 p-2 transition-all ${
                formData.backgroundType === type.id
                  ? 'border-gold-500 bg-gold-50 text-gold-700'
                  : 'border-border hover:border-gold-300 text-foreground'
              }`}
            >
              <span className="text-lg">{type.icon}</span>
              <span className="text-xs font-medium">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Decorative Toggles */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-3 block">Decorative Elements</Label>
        <div className="space-y-3">
          {DECORATIONS.map((dec) => (
            <div key={dec.key} className="flex items-center justify-between min-h-[44px] p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-gold-500">{dec.icon}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{dec.label}</p>
                  <p className="text-xs text-muted-foreground">{dec.desc}</p>
                </div>
              </div>
              <Switch
                checked={formData[dec.key]}
                onCheckedChange={(checked) => updateFormData({ [dec.key]: checked })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

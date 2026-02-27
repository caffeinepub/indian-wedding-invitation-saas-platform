import React from 'react';
import { useInvitationForm } from '../../context/InvitationFormContext';
import type { AnimationMode } from '../../context/InvitationFormContext';
import { Zap, Wind, Film } from 'lucide-react';
import { Label } from '@/components/ui/label';

const MODES: { id: AnimationMode; label: string; icon: React.ReactNode; desc: string; badge?: string }[] = [
  {
    id: 'minimal',
    label: 'Minimal',
    icon: <Wind className="w-5 h-5" />,
    desc: 'Static, no motion — clean and fast',
  },
  {
    id: 'elegant',
    label: 'Elegant',
    icon: <Zap className="w-5 h-5" />,
    desc: 'Smooth scroll animations, subtle parallax',
    badge: 'Default',
  },
  {
    id: 'cinematic',
    label: 'Cinematic',
    icon: <Film className="w-5 h-5" />,
    desc: 'Dramatic transitions, floating particles',
  },
];

export default function AnimationModeSelector() {
  const { formData, updateFormData } = useInvitationForm();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Film className="w-5 h-5 text-gold-500" />
        <h3 className="font-semibold text-foreground text-lg">Animation Mode</h3>
      </div>

      <Label className="text-sm text-muted-foreground block">
        Choose how your invitation comes to life for guests
      </Label>

      <div className="space-y-2">
        {MODES.map((mode) => {
          const isActive = formData.animationMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => updateFormData({ animationMode: mode.id })}
              className={`w-full min-h-[56px] flex items-center gap-4 p-3 rounded-xl border-2 text-left transition-all ${
                isActive
                  ? 'border-gold-500 bg-gold-50 shadow-gold'
                  : 'border-border hover:border-gold-300 bg-card'
              }`}
            >
              <span className={isActive ? 'text-gold-600' : 'text-muted-foreground'}>
                {mode.icon}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{mode.label}</span>
                  {mode.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gold-100 text-gold-700 font-medium">
                      {mode.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{mode.desc}</p>
              </div>
              {isActive && (
                <div className="w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

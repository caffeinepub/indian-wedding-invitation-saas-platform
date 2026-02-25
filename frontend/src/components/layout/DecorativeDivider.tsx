import React from 'react';

interface DecorativeDividerProps {
  variant?: 'mandala' | 'line' | 'flourish';
  className?: string;
}

export default function DecorativeDivider({ variant = 'mandala', className = '' }: DecorativeDividerProps) {
  if (variant === 'line') {
    return (
      <div className={`flex items-center gap-4 my-8 ${className}`}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="w-2 h-2 rounded-full bg-gold/60" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>
    );
  }

  if (variant === 'flourish') {
    return (
      <div className={`flex items-center justify-center my-8 ${className}`}>
        <img
          src="/assets/generated/corner-flourish.dim_256x256.png"
          alt=""
          className="w-16 h-16 opacity-60"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>
    );
  }

  return (
    <div className={`w-full flex items-center justify-center my-8 ${className}`}>
      <img
        src="/assets/generated/mandala-divider.dim_1200x120.png"
        alt=""
        className="w-full max-w-2xl h-auto opacity-70"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          // Fallback to line divider
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `
              <div style="display:flex;align-items:center;gap:16px;width:100%;max-width:600px;">
                <div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,oklch(0.72 0.12 75 / 0.4),transparent)"></div>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" stroke="oklch(0.72 0.12 75)" stroke-width="0.5" stroke-dasharray="2 2"/>
                  <circle cx="20" cy="20" r="12" stroke="oklch(0.72 0.12 75)" stroke-width="0.5"/>
                  <circle cx="20" cy="20" r="6" fill="oklch(0.72 0.12 75 / 0.3)"/>
                  <circle cx="20" cy="20" r="2" fill="oklch(0.72 0.12 75)"/>
                  <line x1="20" y1="2" x2="20" y2="8" stroke="oklch(0.72 0.12 75)" stroke-width="1"/>
                  <line x1="20" y1="32" x2="20" y2="38" stroke="oklch(0.72 0.12 75)" stroke-width="1"/>
                  <line x1="2" y1="20" x2="8" y2="20" stroke="oklch(0.72 0.12 75)" stroke-width="1"/>
                  <line x1="32" y1="20" x2="38" y2="20" stroke="oklch(0.72 0.12 75)" stroke-width="1"/>
                </svg>
                <div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,oklch(0.72 0.12 75 / 0.4),transparent)"></div>
              </div>
            `;
          }
        }}
      />
    </div>
  );
}

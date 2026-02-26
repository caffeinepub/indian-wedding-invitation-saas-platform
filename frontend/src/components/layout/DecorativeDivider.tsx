interface DecorativeDividerProps {
  variant?: 'mandala' | 'line' | 'flourish';
  className?: string;
}

export default function DecorativeDivider({ variant = 'line', className = '' }: DecorativeDividerProps) {
  if (variant === 'mandala') {
    return (
      <div className={`flex items-center justify-center py-8 overflow-hidden ${className}`}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent max-w-xs" />
        <div className="mx-4">
          <img
            src="/assets/generated/mandala-divider.dim_1200x120.png"
            alt=""
            className="h-16 w-auto opacity-60"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <div className="hidden text-gold-400 text-2xl">✦</div>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent max-w-xs" />
      </div>
    );
  }

  if (variant === 'flourish') {
    return (
      <div className={`flex items-center justify-center py-6 overflow-hidden ${className}`}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-200 to-gold-300 max-w-sm" />
        <div className="mx-4 flex items-center gap-2">
          <img
            src="/assets/generated/corner-flourish.dim_256x256.png"
            alt=""
            className="h-8 w-8 opacity-50 rotate-180"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="w-2 h-2 bg-gold-400 rounded-full" />
          <img
            src="/assets/generated/corner-flourish.dim_256x256.png"
            alt=""
            className="h-8 w-8 opacity-50"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold-200 to-gold-300 max-w-sm" />
      </div>
    );
  }

  // Default: line
  return (
    <div className={`flex items-center justify-center py-4 px-8 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
      <div className="mx-4 flex items-center gap-1">
        <div className="w-1 h-1 bg-gold-400 rounded-full" />
        <div className="w-2 h-2 bg-gold-500 rounded-full" />
        <div className="w-1 h-1 bg-gold-400 rounded-full" />
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
    </div>
  );
}

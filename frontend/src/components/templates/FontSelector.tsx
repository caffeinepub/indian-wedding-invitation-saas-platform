import React from 'react';

export interface FontChoice {
  id: string;
  name: string;
  heading: string;
  headingWeight: string;
  body: string;
  bodyWeight: string;
  category?: string;
}

export const FONT_CHOICES: FontChoice[] = [
  // Classic & Elegant
  {
    id: 'cormorant-lato',
    name: 'Cormorant & Lato',
    heading: 'Cormorant Garamond',
    headingWeight: '600',
    body: 'Lato',
    bodyWeight: '400',
    category: 'Classic',
  },
  {
    id: 'playfair-lato',
    name: 'Playfair & Lato',
    heading: 'Playfair Display',
    headingWeight: '700',
    body: 'Lato',
    bodyWeight: '400',
    category: 'Classic',
  },
  {
    id: 'cinzel-lato',
    name: 'Cinzel & Lato',
    heading: 'Cinzel',
    headingWeight: '600',
    body: 'Lato',
    bodyWeight: '400',
    category: 'Classic',
  },
  {
    id: 'eb-garamond-raleway',
    name: 'EB Garamond & Raleway',
    heading: 'EB Garamond',
    headingWeight: '600',
    body: 'Raleway',
    bodyWeight: '400',
    category: 'Classic',
  },
  {
    id: 'lora-montserrat',
    name: 'Lora & Montserrat',
    heading: 'Lora',
    headingWeight: '600',
    body: 'Montserrat',
    bodyWeight: '400',
    category: 'Modern',
  },
  {
    id: 'great-vibes-lato',
    name: 'Great Vibes & Lato',
    heading: 'Great Vibes',
    headingWeight: '400',
    body: 'Lato',
    bodyWeight: '400',
    category: 'Romantic',
  },
  {
    id: 'josefin-lato',
    name: 'Josefin Sans & Lato',
    heading: 'Josefin Sans',
    headingWeight: '700',
    body: 'Lato',
    bodyWeight: '300',
    category: 'Modern',
  },
  // Bold & Impactful
  {
    id: 'playfair-black-cormorant',
    name: 'Playfair Black & Cormorant',
    heading: 'Playfair Display',
    headingWeight: '900',
    body: 'Cormorant Garamond',
    bodyWeight: '400',
    category: 'Bold',
  },
  {
    id: 'bodoni-moda-bold',
    name: 'Bodoni Moda Bold',
    heading: 'Bodoni Moda',
    headingWeight: '900',
    body: 'Bodoni Moda',
    bodyWeight: '400',
    category: 'Bold',
  },
  {
    id: 'abril-fatface-lora',
    name: 'Abril Fatface & Lora',
    heading: 'Abril Fatface',
    headingWeight: '400',
    body: 'Lora',
    bodyWeight: '400',
    category: 'Bold',
  },
  {
    id: 'cinzel-decorative',
    name: 'Cinzel Decorative & Cinzel',
    heading: 'Cinzel Decorative',
    headingWeight: '700',
    body: 'Cinzel',
    bodyWeight: '400',
    category: 'Bold',
  },
  {
    id: 'dm-serif-display',
    name: 'DM Serif Display & Text',
    heading: 'DM Serif Display',
    headingWeight: '400',
    body: 'DM Serif Text',
    bodyWeight: '400',
    category: 'Bold',
  },
  {
    id: 'cormorant-sc-bold',
    name: 'Cormorant SC Bold & Lato',
    heading: 'Cormorant SC',
    headingWeight: '700',
    body: 'Lato',
    bodyWeight: '300',
    category: 'Bold',
  },
  {
    id: 'bebas-neue-lato',
    name: 'Bebas Neue & Lato',
    heading: 'Bebas Neue',
    headingWeight: '400',
    body: 'Lato',
    bodyWeight: '400',
    category: 'Bold',
  },
  {
    id: 'oswald-lora',
    name: 'Oswald Bold & Lora',
    heading: 'Oswald',
    headingWeight: '700',
    body: 'Lora',
    bodyWeight: '400',
    category: 'Bold',
  },
];

const CATEGORY_ORDER = ['Classic', 'Modern', 'Romantic', 'Bold'];

interface FontSelectorProps {
  value: string;
  onChange: (fontId: string) => void;
}

export default function FontSelector({ value, onChange }: FontSelectorProps) {
  const grouped = CATEGORY_ORDER.reduce<Record<string, FontChoice[]>>((acc, cat) => {
    acc[cat] = FONT_CHOICES.filter((f) => f.category === cat);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {CATEGORY_ORDER.map((category) => {
        const fonts = grouped[category];
        if (!fonts || fonts.length === 0) return null;
        return (
          <div key={category}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">
                {category}
              </span>
              {category === 'Bold' && (
                <span className="text-xs bg-gold-500 text-charcoal-900 px-2 py-0.5 rounded-full font-bold">
                  Premium
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {fonts.map((font) => {
                const isSelected = value === font.id;
                return (
                  <button
                    key={font.id}
                    onClick={() => onChange(font.id)}
                    className={`relative p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-gold-500 bg-gold-500/10 shadow-md'
                        : 'border-charcoal-700 bg-charcoal-800/50 hover:border-gold-400 hover:bg-charcoal-700/50'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-gold-500 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-charcoal-900" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <div
                      className="text-xl mb-1 leading-tight"
                      style={{
                        fontFamily: `'${font.heading}', serif`,
                        fontWeight: font.headingWeight,
                        color: isSelected ? '#c9a84c' : '#e8dcc8',
                      }}
                    >
                      Aa
                    </div>
                    <div
                      className="text-sm mb-2 leading-snug"
                      style={{
                        fontFamily: `'${font.heading}', serif`,
                        fontWeight: font.headingWeight,
                        color: isSelected ? '#c9a84c' : '#e8dcc8',
                        fontSize: '0.95rem',
                      }}
                    >
                      Wedding Day
                    </div>
                    <div
                      className="text-xs leading-relaxed mb-2"
                      style={{
                        fontFamily: `'${font.body}', sans-serif`,
                        fontWeight: font.bodyWeight,
                        color: isSelected ? '#d4b896' : '#a09080',
                      }}
                    >
                      Together with their families
                    </div>
                    <div className="text-xs font-medium" style={{ color: isSelected ? '#c9a84c' : '#7a6a5a' }}>
                      {font.name}
                    </div>
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

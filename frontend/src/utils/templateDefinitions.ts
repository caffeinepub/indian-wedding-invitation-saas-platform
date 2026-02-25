export interface TemplateDefinition {
  id: string;
  name: string;
  category: 'royal-indian' | 'modern-minimal' | 'cinematic-dark';
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  defaultColorScheme: string;
  defaultFont: string;
  defaultBackground: string;
  previewGradient: string;
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'royal-gold',
    name: 'Royal Maharaja',
    category: 'royal-indian',
    description: 'Opulent gold and crimson with ornate floral motifs',
    primaryColor: '#D4AF37',
    secondaryColor: '#8B0000',
    accentColor: '#FFD700',
    bgColor: '#FFF8E7',
    textColor: '#2C1810',
    headingFont: 'Cinzel',
    bodyFont: 'Inter',
    defaultColorScheme: 'gold-crimson',
    defaultFont: 'cinzel-inter',
    defaultBackground: 'floral',
    previewGradient: 'linear-gradient(135deg, #8B0000 0%, #D4AF37 50%, #8B0000 100%)',
  },
  {
    id: 'royal-maroon',
    name: 'Rajputana Splendor',
    category: 'royal-indian',
    description: 'Deep maroon and gold with traditional Indian patterns',
    primaryColor: '#800020',
    secondaryColor: '#C5A028',
    accentColor: '#E8C547',
    bgColor: '#FDF5E6',
    textColor: '#1A0A0A',
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Inter',
    defaultColorScheme: 'maroon-gold',
    defaultFont: 'cormorant-inter',
    defaultBackground: 'paisley',
    previewGradient: 'linear-gradient(135deg, #800020 0%, #C5A028 50%, #800020 100%)',
  },
  {
    id: 'modern-blush',
    name: 'Blush Elegance',
    category: 'modern-minimal',
    description: 'Clean ivory and blush rose with geometric accents',
    primaryColor: '#E8A0A0',
    secondaryColor: '#F5E6E6',
    accentColor: '#C47C7C',
    bgColor: '#FDFAFA',
    textColor: '#2D1B1B',
    headingFont: 'Playfair Display',
    bodyFont: 'Inter',
    defaultColorScheme: 'blush-rose',
    defaultFont: 'playfair-inter',
    defaultBackground: 'minimal',
    previewGradient: 'linear-gradient(135deg, #E8A0A0 0%, #F5E6E6 50%, #C47C7C 100%)',
  },
  {
    id: 'modern-ivory',
    name: 'Ivory Minimalist',
    category: 'modern-minimal',
    description: 'Pure ivory and champagne with clean typography',
    primaryColor: '#C9A96E',
    secondaryColor: '#F5F0E8',
    accentColor: '#A07840',
    bgColor: '#FAFAF8',
    textColor: '#1A1A1A',
    headingFont: 'Cinzel',
    bodyFont: 'Inter',
    defaultColorScheme: 'ivory-gold',
    defaultFont: 'cinzel-inter',
    defaultBackground: 'watercolor',
    previewGradient: 'linear-gradient(135deg, #C9A96E 0%, #F5F0E8 50%, #A07840 100%)',
  },
  {
    id: 'cinematic-jewel',
    name: 'Jewel Noir',
    category: 'cinematic-dark',
    description: 'Deep jewel tones with dramatic gold typography',
    primaryColor: '#D4AF37',
    secondaryColor: '#1A0A2E',
    accentColor: '#7B2FBE',
    bgColor: '#0D0820',
    textColor: '#F5E6C8',
    headingFont: 'Cinzel',
    bodyFont: 'Inter',
    defaultColorScheme: 'jewel-dark',
    defaultFont: 'cinzel-inter',
    defaultBackground: 'dark-floral',
    previewGradient: 'linear-gradient(135deg, #1A0A2E 0%, #7B2FBE 40%, #D4AF37 100%)',
  },
  {
    id: 'cinematic-midnight',
    name: 'Midnight Romance',
    category: 'cinematic-dark',
    description: 'Midnight blue and rose gold for a cinematic feel',
    primaryColor: '#C9956C',
    secondaryColor: '#0A1628',
    accentColor: '#4A90D9',
    bgColor: '#060E1A',
    textColor: '#E8D5C0',
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Inter',
    defaultColorScheme: 'midnight-rose',
    defaultFont: 'cormorant-inter',
    defaultBackground: 'dark-minimal',
    previewGradient: 'linear-gradient(135deg, #0A1628 0%, #4A90D9 40%, #C9956C 100%)',
  },
];

export const COLOR_SCHEMES = [
  { id: 'gold-crimson', name: 'Gold & Crimson', colors: ['#D4AF37', '#8B0000', '#FFF8E7'] },
  { id: 'maroon-gold', name: 'Maroon & Gold', colors: ['#800020', '#C5A028', '#FDF5E6'] },
  { id: 'blush-rose', name: 'Blush & Rose', colors: ['#E8A0A0', '#C47C7C', '#FDFAFA'] },
  { id: 'ivory-gold', name: 'Ivory & Gold', colors: ['#C9A96E', '#F5F0E8', '#FAFAF8'] },
  { id: 'jewel-dark', name: 'Jewel Tones', colors: ['#7B2FBE', '#D4AF37', '#1A0A2E'] },
  { id: 'midnight-rose', name: 'Midnight Rose', colors: ['#4A90D9', '#C9956C', '#0A1628'] },
];

export const FONT_CHOICES = [
  { id: 'cinzel-inter', name: 'Cinzel & Inter', heading: 'Cinzel', body: 'Inter', sample: 'Eternal Love' },
  { id: 'cormorant-inter', name: 'Cormorant & Inter', heading: 'Cormorant Garamond', body: 'Inter', sample: 'Eternal Love' },
  { id: 'playfair-inter', name: 'Playfair & Inter', heading: 'Playfair Display', body: 'Inter', sample: 'Eternal Love' },
  { id: 'cinzel-cormorant', name: 'Cinzel & Cormorant', heading: 'Cinzel', body: 'Cormorant Garamond', sample: 'Eternal Love' },
];

export const BACKGROUND_CHOICES = [
  { id: 'floral', name: 'Floral Motifs', description: 'Traditional Indian floral patterns' },
  { id: 'paisley', name: 'Paisley', description: 'Classic paisley design' },
  { id: 'minimal', name: 'Minimal', description: 'Clean geometric lines' },
  { id: 'watercolor', name: 'Watercolor', description: 'Soft watercolor texture' },
  { id: 'dark-floral', name: 'Dark Floral', description: 'Dramatic dark floral' },
  { id: 'dark-minimal', name: 'Dark Minimal', description: 'Sleek dark background' },
];

export function getTemplateById(id: string): TemplateDefinition {
  return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
}

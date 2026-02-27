export interface TemplateDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  fontHeading: string;
  fontBody: string;
  gradient: string;
  previewGradient: string;
  bgColor: string;
  decorativeElements: string[];
  previewColors: string[];
  isNew?: boolean;
}

export const PREMIUM_THEMES: TemplateDefinition[] = [
  {
    id: 'royal-indian',
    name: 'Royal Indian',
    category: 'Royal Indian',
    description: 'Opulent gold and maroon with ornate patterns — the grandeur of Indian royalty',
    primaryColor: '#D4AF37',
    secondaryColor: '#800020',
    accentColor: '#800020',
    backgroundColor: '#FFF8F0',
    textColor: '#2C1810',
    headingFont: 'Cinzel',
    bodyFont: 'Cormorant Garamond',
    fontHeading: 'Cinzel',
    fontBody: 'Cormorant Garamond',
    gradient: 'linear-gradient(135deg, #FFF8F0 0%, #FFF0D6 50%, #FFE8C0 100%)',
    previewGradient: 'linear-gradient(135deg, #FFF8F0 0%, #FFF0D6 50%, #FFE8C0 100%)',
    bgColor: '#FFF8F0',
    decorativeElements: ['mandala', 'ornate-border', 'gold-frame'],
    previewColors: ['#D4AF37', '#800020', '#FFF8F0', '#2C1810'],
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    category: 'Modern Minimal',
    description: 'Soft pastels and clean lines — understated elegance for the contemporary couple',
    primaryColor: '#C9A96E',
    secondaryColor: '#8B7355',
    accentColor: '#8B7355',
    backgroundColor: '#FAF7F4',
    textColor: '#3D3530',
    headingFont: 'Prata',
    bodyFont: 'Karla',
    fontHeading: 'Prata',
    fontBody: 'Karla',
    gradient: 'linear-gradient(135deg, #FAF7F4 0%, #F5EDE0 50%, #EDE0D0 100%)',
    previewGradient: 'linear-gradient(135deg, #FAF7F4 0%, #F5EDE0 50%, #EDE0D0 100%)',
    bgColor: '#FAF7F4',
    decorativeElements: ['minimal-line', 'subtle-border'],
    previewColors: ['#C9A96E', '#8B7355', '#FAF7F4', '#3D3530'],
  },
  {
    id: 'floral-luxury',
    name: 'Floral Luxury',
    category: 'Floral Luxury',
    description: 'Romantic pinks and ivories with decorative floral borders — pure romance',
    primaryColor: '#E8A0B4',
    secondaryColor: '#C06080',
    accentColor: '#C06080',
    backgroundColor: '#FFF5F7',
    textColor: '#4A2030',
    headingFont: 'Great Vibes',
    bodyFont: 'Raleway',
    fontHeading: 'Great Vibes',
    fontBody: 'Raleway',
    gradient: 'linear-gradient(135deg, #FFF5F7 0%, #FFE8EE 50%, #FFD6E0 100%)',
    previewGradient: 'linear-gradient(135deg, #FFF5F7 0%, #FFE8EE 50%, #FFD6E0 100%)',
    bgColor: '#FFF5F7',
    decorativeElements: ['floral-border', 'petal-scatter', 'rose-frame'],
    previewColors: ['#E8A0B4', '#C06080', '#FFF5F7', '#4A2030'],
    isNew: true,
  },
  {
    id: 'dark-cinematic',
    name: 'Dark Cinematic',
    category: 'Dark Cinematic',
    description: 'Deep charcoal and navy with glowing gold accents — dramatic and cinematic',
    primaryColor: '#D4AF37',
    secondaryColor: '#C0A030',
    accentColor: '#C0A030',
    backgroundColor: '#1A1A2E',
    textColor: '#F0E6C8',
    headingFont: 'Bodoni Moda',
    bodyFont: 'Montserrat',
    fontHeading: 'Bodoni Moda',
    fontBody: 'Montserrat',
    gradient: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)',
    previewGradient: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)',
    bgColor: '#1A1A2E',
    decorativeElements: ['glow-effect', 'star-scatter', 'gold-line'],
    previewColors: ['#D4AF37', '#1A1A2E', '#16213E', '#F0E6C8'],
    isNew: true,
  },
  {
    id: 'temple-traditional',
    name: 'Temple Traditional',
    category: 'Temple Traditional',
    description: 'Saffron and burgundy with mandala patterns — deeply rooted in cultural heritage',
    primaryColor: '#FF9933',
    secondaryColor: '#8B0000',
    accentColor: '#8B0000',
    backgroundColor: '#FFF9F0',
    textColor: '#3D1A00',
    headingFont: 'Cinzel Decorative',
    bodyFont: 'EB Garamond',
    fontHeading: 'Cinzel Decorative',
    fontBody: 'EB Garamond',
    gradient: 'linear-gradient(135deg, #FFF9F0 0%, #FFF0D0 50%, #FFE4A0 100%)',
    previewGradient: 'linear-gradient(135deg, #FFF9F0 0%, #FFF0D0 50%, #FFE4A0 100%)',
    bgColor: '#FFF9F0',
    decorativeElements: ['mandala-watermark', 'temple-border', 'lotus-divider'],
    previewColors: ['#FF9933', '#8B0000', '#FFF9F0', '#3D1A00'],
    isNew: true,
  },
];

// Keep TEMPLATES as alias for backward compatibility
export const TEMPLATES = PREMIUM_THEMES;

export const COLOR_SCHEMES = [
  { id: 'gold-maroon', name: 'Gold & Maroon', primary: '#D4AF37', secondary: '#800020', accent: '#800020', bg: '#FFF8F0', colors: ['#D4AF37', '#800020', '#FFF8F0'] },
  { id: 'ivory-rose', name: 'Ivory & Rose', primary: '#E8A0B4', secondary: '#C06080', accent: '#C06080', bg: '#FFF5F7', colors: ['#E8A0B4', '#C06080', '#FFF5F7'] },
  { id: 'midnight-gold', name: 'Midnight & Gold', primary: '#D4AF37', secondary: '#C0A030', accent: '#C0A030', bg: '#1A1A2E', colors: ['#D4AF37', '#1A1A2E', '#F0E6C8'] },
  { id: 'sage-champagne', name: 'Sage & Champagne', primary: '#8FAF8F', secondary: '#C9A96E', accent: '#C9A96E', bg: '#F5F5EE', colors: ['#8FAF8F', '#C9A96E', '#F5F5EE'] },
  { id: 'blush-bronze', name: 'Blush & Bronze', primary: '#E8C4A0', secondary: '#A0704A', accent: '#A0704A', bg: '#FFF8F4', colors: ['#E8C4A0', '#A0704A', '#FFF8F4'] },
  { id: 'royal-purple', name: 'Royal Purple & Gold', primary: '#7B2D8B', secondary: '#D4AF37', accent: '#D4AF37', bg: '#F8F0FF', colors: ['#7B2D8B', '#D4AF37', '#F8F0FF'] },
  { id: 'saffron-burgundy', name: 'Saffron & Burgundy', primary: '#FF9933', secondary: '#8B0000', accent: '#8B0000', bg: '#FFF9F0', colors: ['#FF9933', '#8B0000', '#FFF9F0'] },
  { id: 'emerald-gold', name: 'Emerald & Gold', primary: '#2D6A4F', secondary: '#D4AF37', accent: '#D4AF37', bg: '#F0FFF4', colors: ['#2D6A4F', '#D4AF37', '#F0FFF4'] },
  // Legacy color schemes for backward compatibility
  { id: 'royal-gold', name: 'Royal Gold', primary: '#D4AF37', secondary: '#8B0000', accent: '#8B0000', bg: '#FFF8F0', colors: ['#D4AF37', '#8B0000', '#FFFFF0'] },
  { id: 'rose-gold', name: 'Rose Gold', primary: '#E8A0B4', secondary: '#C9956C', accent: '#C9956C', bg: '#FFF8F8', colors: ['#E8A0B4', '#C9956C', '#FFF8F8'] },
];

export const FONT_CHOICES = [
  { id: 'elegant-serif', name: 'Elegant Serif', heading: 'Playfair Display', body: 'Lora' },
  { id: 'modern-script', name: 'Modern Script', heading: 'Great Vibes', body: 'Montserrat' },
  { id: 'royal-classic', name: 'Royal Classic', heading: 'Cinzel', body: 'Cormorant Garamond' },
  { id: 'romantic-calligraphy', name: 'Romantic Calligraphy', heading: 'Tangerine', body: 'Raleway' },
  { id: 'bold-imperial', name: 'Bold Imperial', heading: 'Bodoni Moda', body: 'Libre Baskerville' },
  { id: 'vintage-charm', name: 'Vintage Charm', heading: 'Old Standard TT', body: 'Crimson Text' },
  { id: 'contemporary-luxury', name: 'Contemporary Luxury', heading: 'Prata', body: 'Karla' },
  { id: 'traditional-opulence', name: 'Traditional Opulence', heading: 'EB Garamond', body: 'Merriweather' },
  { id: 'cinzel-decorative', name: 'Temple Grandeur', heading: 'Cinzel Decorative', body: 'EB Garamond' },
  // Legacy font choices
  { id: 'playfair-lato', name: 'Playfair & Lato', heading: 'Playfair Display', body: 'Lato' },
  { id: 'cinzel-montserrat', name: 'Cinzel & Montserrat', heading: 'Cinzel', body: 'Montserrat' },
];

export const BACKGROUND_CHOICES = [
  { id: 'floral', name: 'Floral Pattern', description: 'Delicate floral motifs' },
  { id: 'paisley', name: 'Paisley', description: 'Traditional paisley design' },
  { id: 'minimal', name: 'Minimal', description: 'Clean, minimal background' },
  { id: 'watercolor', name: 'Watercolor', description: 'Soft watercolor wash' },
  { id: 'dark-floral', name: 'Dark Floral', description: 'Rich dark floral pattern' },
  { id: 'dark-minimal', name: 'Dark Minimal', description: 'Elegant dark minimal' },
  { id: 'solid', name: 'Solid', description: 'Solid color background' },
  { id: 'gradient', name: 'Gradient', description: 'Smooth gradient background' },
  { id: 'image', name: 'Texture', description: 'Textured background' },
];

export const LUXURY_PALETTES = [
  { name: 'Gold & Crimson', primary: '#D4AF37', accent: '#800020', bg: '#FFF8F0', text: '#2C1810' },
  { name: 'Ivory & Rose', primary: '#E8A0B4', accent: '#C06080', bg: '#FFF5F7', text: '#4A2030' },
  { name: 'Midnight & Gold', primary: '#D4AF37', accent: '#C0A030', bg: '#1A1A2E', text: '#F0E6C8' },
  { name: 'Sage & Champagne', primary: '#8FAF8F', accent: '#C9A96E', bg: '#F5F5EE', text: '#2A3020' },
  { name: 'Blush & Bronze', primary: '#E8C4A0', accent: '#A0704A', bg: '#FFF8F4', text: '#3A2010' },
  { name: 'Royal Purple & Gold', primary: '#7B2D8B', accent: '#D4AF37', bg: '#F8F0FF', text: '#2A0A3A' },
  { name: 'Saffron & Burgundy', primary: '#FF9933', accent: '#8B0000', bg: '#FFF9F0', text: '#3D1A00' },
  { name: 'Emerald & Gold', primary: '#2D6A4F', accent: '#D4AF37', bg: '#F0FFF4', text: '#0A2A1A' },
];

export function getTemplateById(id: string): TemplateDefinition | undefined {
  return TEMPLATES.find(t => t.id === id);
}

export function getTemplatesByCategory(category: string): TemplateDefinition[] {
  return TEMPLATES.filter(t => t.category === category);
}

export function getCategories(): string[] {
  return [...new Set(TEMPLATES.map(t => t.category))];
}

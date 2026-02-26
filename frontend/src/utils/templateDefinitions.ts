export interface TemplateDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontHeading: string;
  fontBody: string;
  gradient: string;
  // Extended fields used by guest components and previews
  bgColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  previewGradient: string;
  isNew?: boolean;
}

export const TEMPLATES: TemplateDefinition[] = [
  // Royal Indian
  {
    id: 'royal-gold',
    name: 'Royal Gold',
    category: 'Royal Indian',
    description: 'Opulent gold and crimson with traditional Indian motifs',
    primaryColor: '#D4AF37',
    secondaryColor: '#8B0000',
    accentColor: '#FFFFF0',
    fontHeading: 'Cinzel',
    fontBody: 'Cormorant Garamond',
    gradient: 'linear-gradient(135deg, #1a0a00, #3d1a00)',
    bgColor: '#1a0a00',
    textColor: '#FFFFF0',
    headingFont: 'Cinzel',
    bodyFont: 'Cormorant Garamond',
    previewGradient: 'linear-gradient(135deg, #1a0a00, #3d1a00)',
  },
  {
    id: 'regal-emerald',
    name: 'Regal Emerald',
    category: 'Royal Indian',
    description: 'Deep emerald and gold for a regal celebration',
    primaryColor: '#50C878',
    secondaryColor: '#D4AF37',
    accentColor: '#FFFFF0',
    fontHeading: 'Cinzel',
    fontBody: 'Cormorant Garamond',
    gradient: 'linear-gradient(135deg, #0a1a0a, #1a3a1a)',
    bgColor: '#0a1a0a',
    textColor: '#FFFFF0',
    headingFont: 'Cinzel',
    bodyFont: 'Cormorant Garamond',
    previewGradient: 'linear-gradient(135deg, #0a1a0a, #1a3a1a)',
    isNew: true,
  },
  // Modern Minimal
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    category: 'Modern Minimal',
    description: 'Clean lines and elegant simplicity',
    primaryColor: '#2D3748',
    secondaryColor: '#D4AF37',
    accentColor: '#F7FAFC',
    fontHeading: 'Playfair Display',
    fontBody: 'Montserrat',
    gradient: 'linear-gradient(135deg, #F7FAFC, #EDF2F7)',
    bgColor: '#F7FAFC',
    textColor: '#2D3748',
    headingFont: 'Playfair Display',
    bodyFont: 'Montserrat',
    previewGradient: 'linear-gradient(135deg, #F7FAFC, #EDF2F7)',
  },
  {
    id: 'pastel-garden',
    name: 'Pastel Garden',
    category: 'Modern Minimal',
    description: 'Soft pastels with a fresh garden feel',
    primaryColor: '#9F7AEA',
    secondaryColor: '#F687B3',
    accentColor: '#FEFEFE',
    fontHeading: 'Playfair Display',
    fontBody: 'Open Sans',
    gradient: 'linear-gradient(135deg, #FAF5FF, #FFF5F7)',
    bgColor: '#FAF5FF',
    textColor: '#4A3060',
    headingFont: 'Playfair Display',
    bodyFont: 'Open Sans',
    previewGradient: 'linear-gradient(135deg, #FAF5FF, #FFF5F7)',
    isNew: true,
  },
  // Cinematic Dark
  {
    id: 'cinematic-dark',
    name: 'Cinematic Dark',
    category: 'cinematic-dark',
    description: 'Dramatic dark tones with golden accents',
    primaryColor: '#D4AF37',
    secondaryColor: '#C41E3A',
    accentColor: '#F5F5F5',
    fontHeading: 'Cinzel',
    fontBody: 'Montserrat',
    gradient: 'linear-gradient(135deg, #0a0a0a, #1a1a2e)',
    bgColor: '#0a0a0a',
    textColor: '#F5F5F5',
    headingFont: 'Cinzel',
    bodyFont: 'Montserrat',
    previewGradient: 'linear-gradient(135deg, #0a0a0a, #1a1a2e)',
  },
  {
    id: 'midnight-luxe',
    name: 'Midnight Luxe',
    category: 'cinematic-dark',
    description: 'Midnight blue with silver and gold accents',
    primaryColor: '#C0C0C0',
    secondaryColor: '#D4AF37',
    accentColor: '#F0F0F0',
    fontHeading: 'Cinzel',
    fontBody: 'Cormorant Garamond',
    gradient: 'linear-gradient(135deg, #0a0a1a, #1a1a3a)',
    bgColor: '#0a0a1a',
    textColor: '#F0F0F0',
    headingFont: 'Cinzel',
    bodyFont: 'Cormorant Garamond',
    previewGradient: 'linear-gradient(135deg, #0a0a1a, #1a1a3a)',
    isNew: true,
  },
  // Romantic
  {
    id: 'romantic-blush',
    name: 'Romantic Blush',
    category: 'Romantic',
    description: 'Soft blush and rose gold for a romantic celebration',
    primaryColor: '#E8A0B4',
    secondaryColor: '#C9956C',
    accentColor: '#FFF8F8',
    fontHeading: 'Playfair Display',
    fontBody: 'Cormorant Garamond',
    gradient: 'linear-gradient(135deg, #FFF0F3, #FFE4E8)',
    bgColor: '#FFF0F3',
    textColor: '#5C2D3A',
    headingFont: 'Playfair Display',
    bodyFont: 'Cormorant Garamond',
    previewGradient: 'linear-gradient(135deg, #FFF0F3, #FFE4E8)',
  },
  {
    id: 'dusty-rose',
    name: 'Dusty Rose Romance',
    category: 'Romantic',
    description: 'Muted dusty rose with warm ivory tones',
    primaryColor: '#C4A0A0',
    secondaryColor: '#8B6B6B',
    accentColor: '#FFF8F5',
    fontHeading: 'Cormorant Garamond',
    fontBody: 'Open Sans',
    gradient: 'linear-gradient(135deg, #FFF5F0, #FFE8E0)',
    bgColor: '#FFF5F0',
    textColor: '#5C3A3A',
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Open Sans',
    previewGradient: 'linear-gradient(135deg, #FFF5F0, #FFE8E0)',
    isNew: true,
  },
  // Boho & Floral
  {
    id: 'boho-floral',
    name: 'Boho Floral',
    category: 'Boho & Floral',
    description: 'Earthy tones with wildflower accents',
    primaryColor: '#8B7355',
    secondaryColor: '#C4956A',
    accentColor: '#FEFDF8',
    fontHeading: 'Playfair Display',
    fontBody: 'Open Sans',
    gradient: 'linear-gradient(135deg, #FEFDF8, #FDF6E3)',
    bgColor: '#FEFDF8',
    textColor: '#3D2B1F',
    headingFont: 'Playfair Display',
    bodyFont: 'Open Sans',
    previewGradient: 'linear-gradient(135deg, #FEFDF8, #FDF6E3)',
  },
  {
    id: 'floral-boho',
    name: 'Floral Boho',
    category: 'Boho & Floral',
    description: 'Vibrant florals with a bohemian spirit',
    primaryColor: '#E07B54',
    secondaryColor: '#6B8E5E',
    accentColor: '#FFFEF8',
    fontHeading: 'Playfair Display',
    fontBody: 'Montserrat',
    gradient: 'linear-gradient(135deg, #FFFEF8, #FFF8F0)',
    bgColor: '#FFFEF8',
    textColor: '#3D2010',
    headingFont: 'Playfair Display',
    bodyFont: 'Montserrat',
    previewGradient: 'linear-gradient(135deg, #FFFEF8, #FFF8F0)',
    isNew: true,
  },
  // Vintage & Rustic
  {
    id: 'vintage-rustic',
    name: 'Vintage Rustic',
    category: 'Vintage & Rustic',
    description: 'Warm sepia tones with vintage charm',
    primaryColor: '#8B6914',
    secondaryColor: '#5C4033',
    accentColor: '#FDF8F0',
    fontHeading: 'Cinzel',
    fontBody: 'Cormorant Garamond',
    gradient: 'linear-gradient(135deg, #FDF8F0, #F5ECD7)',
    bgColor: '#FDF8F0',
    textColor: '#3D2B10',
    headingFont: 'Cinzel',
    bodyFont: 'Cormorant Garamond',
    previewGradient: 'linear-gradient(135deg, #FDF8F0, #F5ECD7)',
  },
  {
    id: 'rustic-parchment',
    name: 'Rustic Parchment',
    category: 'Vintage & Rustic',
    description: 'Aged parchment with rustic elegance',
    primaryColor: '#A0845C',
    secondaryColor: '#6B4C2A',
    accentColor: '#FEFAF0',
    fontHeading: 'Cormorant Garamond',
    fontBody: 'Open Sans',
    gradient: 'linear-gradient(135deg, #FEFAF0, #F8F0DC)',
    bgColor: '#FEFAF0',
    textColor: '#3D2B10',
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Open Sans',
    previewGradient: 'linear-gradient(135deg, #FEFAF0, #F8F0DC)',
    isNew: true,
  },
];

export const COLOR_SCHEMES = [
  { id: 'royal-gold', name: 'Royal Gold', primary: '#D4AF37', secondary: '#8B0000', accent: '#FFFFF0', colors: ['#D4AF37', '#8B0000', '#FFFFF0'] },
  { id: 'rose-gold', name: 'Rose Gold', primary: '#E8A0B4', secondary: '#C9956C', accent: '#FFF8F8', colors: ['#E8A0B4', '#C9956C', '#FFF8F8'] },
  { id: 'emerald-gold', name: 'Emerald Gold', primary: '#50C878', secondary: '#D4AF37', accent: '#F0FFF4', colors: ['#50C878', '#D4AF37', '#F0FFF4'] },
  { id: 'midnight-blue', name: 'Midnight Blue', primary: '#1E3A5F', secondary: '#D4AF37', accent: '#F0F4FF', colors: ['#1E3A5F', '#D4AF37', '#F0F4FF'] },
  { id: 'blush-pink', name: 'Blush Pink', primary: '#FFB6C1', secondary: '#FF69B4', accent: '#FFF0F3', colors: ['#FFB6C1', '#FF69B4', '#FFF0F3'] },
  { id: 'sage-green', name: 'Sage Green', primary: '#8FBC8F', secondary: '#6B8E5E', accent: '#F0FFF0', colors: ['#8FBC8F', '#6B8E5E', '#F0FFF0'] },
  { id: 'lavender-mist', name: 'Lavender Mist', primary: '#9F7AEA', secondary: '#6B46C1', accent: '#FAF5FF', colors: ['#9F7AEA', '#6B46C1', '#FAF5FF'] },
  { id: 'terracotta', name: 'Terracotta', primary: '#E07B54', secondary: '#8B4513', accent: '#FFF8F5', colors: ['#E07B54', '#8B4513', '#FFF8F5'] },
  { id: 'ivory-charcoal', name: 'Ivory & Charcoal', primary: '#36454F', secondary: '#D4AF37', accent: '#FFFFF0', colors: ['#36454F', '#D4AF37', '#FFFFF0'] },
  { id: 'dusty-rose', name: 'Dusty Rose', primary: '#C4A0A0', secondary: '#8B6B6B', accent: '#FFF5F0', colors: ['#C4A0A0', '#8B6B6B', '#FFF5F0'] },
  { id: 'navy-gold', name: 'Navy & Gold', primary: '#1B2A4A', secondary: '#D4AF37', accent: '#F0F4FF', colors: ['#1B2A4A', '#D4AF37', '#F0F4FF'] },
  { id: 'forest-green', name: 'Forest Green', primary: '#2D5016', secondary: '#8B6914', accent: '#F0FFF0', colors: ['#2D5016', '#8B6914', '#F0FFF0'] },
];

export const FONT_CHOICES = [
  { id: 'playfair-cormorant', name: 'Playfair & Cormorant', heading: 'Playfair Display', body: 'Cormorant Garamond', sample: 'Aa Bb Cc' },
  { id: 'cinzel-montserrat', name: 'Cinzel & Montserrat', heading: 'Cinzel', body: 'Montserrat', sample: 'Aa Bb Cc' },
  { id: 'cormorant-opensans', name: 'Cormorant & Open Sans', heading: 'Cormorant Garamond', body: 'Open Sans', sample: 'Aa Bb Cc' },
  { id: 'greatvibes-lato', name: 'Great Vibes & Lato', heading: 'Great Vibes', body: 'Lato', sample: 'Aa Bb Cc' },
  { id: 'cinzel-cormorant', name: 'Cinzel & Cormorant', heading: 'Cinzel', body: 'Cormorant Garamond', sample: 'Aa Bb Cc' },
  { id: 'playfair-opensans', name: 'Playfair & Open Sans', heading: 'Playfair Display', body: 'Open Sans', sample: 'Aa Bb Cc' },
];

export const BACKGROUND_CHOICES = [
  { id: 'floral', name: 'Floral Pattern', description: 'Delicate floral motifs' },
  { id: 'paisley', name: 'Paisley', description: 'Traditional paisley design' },
  { id: 'minimal', name: 'Minimal', description: 'Clean, minimal background' },
  { id: 'watercolor', name: 'Watercolor', description: 'Soft watercolor wash' },
  { id: 'dark-floral', name: 'Dark Floral', description: 'Rich dark floral pattern' },
  { id: 'dark-minimal', name: 'Dark Minimal', description: 'Elegant dark minimal' },
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

// Animation mode types
export type AnimationMode = 'minimal' | 'elegant' | 'cinematic';

// Petal positions for the animated petal overlay
export const PETAL_POSITIONS = [
  { left: '5%',  animationDuration: '6s',  animationDelay: '0s',    size: 18 },
  { left: '12%', animationDuration: '8s',  animationDelay: '1.2s',  size: 14 },
  { left: '20%', animationDuration: '7s',  animationDelay: '0.5s',  size: 20 },
  { left: '28%', animationDuration: '9s',  animationDelay: '2s',    size: 16 },
  { left: '35%', animationDuration: '6.5s',animationDelay: '0.8s',  size: 22 },
  { left: '42%', animationDuration: '7.5s',animationDelay: '1.5s',  size: 15 },
  { left: '50%', animationDuration: '8.5s',animationDelay: '0.3s',  size: 19 },
  { left: '58%', animationDuration: '6s',  animationDelay: '2.5s',  size: 17 },
  { left: '65%', animationDuration: '9s',  animationDelay: '1s',    size: 21 },
  { left: '72%', animationDuration: '7s',  animationDelay: '1.8s',  size: 14 },
  { left: '80%', animationDuration: '8s',  animationDelay: '0.6s',  size: 18 },
  { left: '88%', animationDuration: '6.5s',animationDelay: '2.2s',  size: 16 },
  { left: '93%', animationDuration: '7.5s',animationDelay: '0.9s',  size: 20 },
];

/**
 * Returns Tailwind/CSS animation class strings for a given animation mode.
 * These classes must be defined in index.css or tailwind.config.js.
 */
export function getAnimationClasses(mode: AnimationMode): {
  section: string;
  heading: string;
  text: string;
  image: string;
  card: string;
} {
  switch (mode) {
    case 'cinematic':
      return {
        section: 'animate-cinematicReveal',
        heading: 'animate-fadeInDown',
        text: 'animate-fadeInUp',
        image: 'animate-scaleIn',
        card: 'animate-scaleIn',
      };
    case 'elegant':
      return {
        section: 'animate-elegantFade',
        heading: 'animate-elegantFade',
        text: 'animate-fadeIn',
        image: 'animate-scaleIn',
        card: 'animate-fadeInUp',
      };
    case 'minimal':
    default:
      return {
        section: 'animate-fadeIn',
        heading: 'animate-fadeIn',
        text: 'animate-fadeIn',
        image: 'animate-fadeIn',
        card: 'animate-fadeIn',
      };
  }
}

/**
 * Returns CSS transition class strings for interactive elements based on animation mode.
 */
export function getTransitionClasses(mode: AnimationMode): {
  button: string;
  link: string;
  card: string;
} {
  switch (mode) {
    case 'cinematic':
      return {
        button: 'transition-all duration-500 ease-out hover:scale-105 hover:shadow-gold-lg',
        link: 'transition-all duration-300 ease-out hover:tracking-wider',
        card: 'transition-all duration-500 ease-out hover:scale-102 hover:shadow-luxury',
      };
    case 'elegant':
      return {
        button: 'transition-all duration-300 ease-in-out hover:scale-102 hover:shadow-gold',
        link: 'transition-colors duration-200 ease-in-out',
        card: 'transition-all duration-300 ease-in-out hover:shadow-gold',
      };
    case 'minimal':
    default:
      return {
        button: 'transition-colors duration-150',
        link: 'transition-colors duration-150',
        card: 'transition-shadow duration-150',
      };
  }
}

/**
 * Returns the CSS animation string for a petal element at a given index.
 */
export function getPetalAnimation(index: number): string {
  const isEven = index % 2 === 0;
  const position = PETAL_POSITIONS[index % PETAL_POSITIONS.length];
  return isEven ? 'animate-petalFall' : 'animate-petalFallAlt';
}

export const ANIMATION_DURATION = {
  fast: 200,
  normal: 400,
  slow: 600,
  verySlow: 1000,
};

export const EASING = {
  easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const slideUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export const staggeredChildren = (staggerDelay = 0.1) => ({
  animate: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

export function getStaggerDelay(index: number, baseDelay = 0.1): string {
  return `${index * baseDelay}s`;
}

export function getAnimationStyle(index: number): React.CSSProperties {
  return {
    animationDelay: `${index * 0.1}s`,
    animationFillMode: 'both',
  };
}

// Re-export for use in components
import React from 'react';

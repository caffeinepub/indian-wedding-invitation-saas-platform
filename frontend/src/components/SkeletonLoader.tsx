import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'image' | 'invitation-card';
  count?: number;
}

export default function SkeletonLoader({ variant = 'card', count = 1 }: SkeletonLoaderProps) {
  const items = Array.from({ length: count });

  if (variant === 'text') {
    return (
      <div className="space-y-2">
        {items.map((_, i) => (
          <Skeleton key={i} className="h-4 w-full skeleton-shimmer" />
        ))}
      </div>
    );
  }

  if (variant === 'image') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-lg skeleton-shimmer" />
        ))}
      </div>
    );
  }

  if (variant === 'invitation-card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((_, i) => (
          <div key={i} className="luxury-card p-6 space-y-4">
            <Skeleton className="h-6 w-3/4 skeleton-shimmer" />
            <Skeleton className="h-4 w-1/2 skeleton-shimmer" />
            <Skeleton className="h-4 w-2/3 skeleton-shimmer" />
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-8 w-20 rounded-full skeleton-shimmer" />
              <Skeleton className="h-8 w-20 rounded-full skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((_, i) => (
        <div key={i} className="luxury-card p-6 space-y-3">
          <Skeleton className="h-6 w-1/2 skeleton-shimmer" />
          <Skeleton className="h-4 w-full skeleton-shimmer" />
          <Skeleton className="h-4 w-3/4 skeleton-shimmer" />
        </div>
      ))}
    </div>
  );
}

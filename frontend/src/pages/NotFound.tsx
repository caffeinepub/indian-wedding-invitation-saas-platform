import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Heart, Home, LayoutDashboard } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-6">
      <div className="text-center max-w-md mx-auto">
        {/* Floating heart icon */}
        <div className="relative mb-8">
          <div className="text-8xl animate-bounce inline-block">
            <Heart className="w-24 h-24 text-gold fill-gold mx-auto" />
          </div>
          <div className="absolute -top-2 -right-2 text-4xl">💍</div>
        </div>

        <h1 className="font-cinzel text-6xl text-gold mb-4">404</h1>
        <h2 className="font-display text-3xl text-charcoal mb-4">
          Invitation Not Found
        </h2>
        <p className="font-serif text-charcoal-light text-lg mb-8 leading-relaxed">
          The wedding invitation you're looking for seems to have wandered off.
          Perhaps it's celebrating somewhere else?
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-elegant font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-luxury"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
          <button
            onClick={() => navigate({ to: '/dashboard' })}
            className="flex items-center gap-2 border-2 border-gold text-gold hover:bg-gold hover:text-charcoal font-elegant font-semibold px-8 py-3 rounded-full transition-all duration-300"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from '@tanstack/react-router';
import { Heart, Home, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-4 text-center">
      {/* Decorative */}
      <div className="mb-8 animate-float">
        <div className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
          <Heart className="w-12 h-12 text-gold" />
        </div>
      </div>

      <p className="font-inter text-sm tracking-[0.3em] uppercase text-gold mb-3">
        ✦ Page Not Found ✦
      </p>
      <h1 className="font-cinzel text-6xl md:text-8xl font-bold text-gold-dark mb-4">404</h1>
      <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-foreground mb-4">
        This Invitation Doesn't Exist
      </h2>
      <p className="font-inter text-muted-foreground max-w-md mb-10 leading-relaxed">
        The invitation you're looking for may have been removed, or the link might be incorrect.
        Perhaps it hasn't been published yet.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/">
          <Button className="btn-gold px-8 py-3 rounded-full font-cinzel tracking-wider">
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="outline" className="px-8 py-3 rounded-full font-cinzel tracking-wider border-gold/40 text-gold-dark hover:bg-gold/5">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </Link>
      </div>

      {/* Decorative line */}
      <div className="mt-16 flex items-center gap-4 opacity-40">
        <div className="w-16 h-px bg-gold" />
        <span className="text-gold text-lg">✦</span>
        <div className="w-16 h-px bg-gold" />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ivory/95 backdrop-blur-md shadow-luxury border-b border-gold/20'
          : 'bg-black/30 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <img
                src="/assets/generated/logo-mark.dim_256x256.png"
                alt="Vivah Logo"
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <Heart className="w-8 h-8 text-gold absolute" style={{ display: 'none' }} />
            </div>
            <div>
              <span
                className={`font-cinzel text-xl font-bold tracking-wider transition-colors duration-300 ${
                  isScrolled ? 'text-gold-dark' : 'text-white drop-shadow-md'
                }`}
              >
                VIVAH
              </span>
              <p
                className={`text-xs font-inter tracking-widest uppercase hidden sm:block transition-colors duration-300 ${
                  isScrolled ? 'text-muted-foreground' : 'text-white/80 drop-shadow-sm'
                }`}
              >
                Wedding Invitations
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`font-inter text-sm font-semibold transition-colors tracking-wide ${
                isScrolled
                  ? 'text-foreground/80 hover:text-gold-dark'
                  : 'text-white hover:text-gold-light drop-shadow-sm'
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`font-inter text-sm font-semibold transition-colors tracking-wide ${
                isScrolled
                  ? 'text-foreground/80 hover:text-gold-dark'
                  : 'text-white hover:text-gold-light drop-shadow-sm'
              }`}
            >
              Dashboard
            </Link>
            <Link to="/create">
              <Button
                className={`px-6 py-2 rounded-full text-sm font-cinzel tracking-wider transition-all duration-300 ${
                  isScrolled
                    ? 'btn-gold'
                    : 'bg-white/15 border border-white/40 text-white hover:bg-white/25 hover:border-white/60 backdrop-blur-sm'
                }`}
              >
                Create Invitation
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 transition-colors rounded-lg ${
              isScrolled
                ? 'text-foreground/80 hover:text-gold-dark'
                : 'text-white hover:text-gold-light'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ touchAction: 'manipulation' }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-ivory/98 backdrop-blur-md border-t border-gold/20 py-4 animate-slide-down">
            <nav className="flex flex-col gap-4 px-4">
              <Link
                to="/"
                className="font-inter text-sm font-semibold text-foreground/80 hover:text-gold-dark transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="font-inter text-sm font-semibold text-foreground/80 hover:text-gold-dark transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link to="/create" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="btn-gold w-full rounded-full text-sm font-cinzel tracking-wider">
                  Create Invitation
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

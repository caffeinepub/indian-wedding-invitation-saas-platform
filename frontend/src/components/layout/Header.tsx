import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { Heart, Menu, X } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathname = location.pathname;

  // Hide "Create Invitation" CTA on editor, wizard, and guest invitation pages
  const hideCreateCTA =
    pathname.startsWith('/edit/') ||
    pathname.startsWith('/invitation/') ||
    pathname === '/create';

  // Use transparent header on landing page hero, solid on other pages
  const isLanding = pathname === '/';
  const headerBg = isScrolled || !isLanding
    ? 'bg-ivory/95 dark:bg-charcoal/95 backdrop-blur-md shadow-sm border-b border-gold/20'
    : 'bg-transparent';

  const textColor = isScrolled || !isLanding
    ? 'text-charcoal dark:text-ivory'
    : 'text-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate({ to: '/' })}
            className={`flex items-center gap-2 font-serif font-bold text-xl transition-colors ${textColor}`}
          >
            <img src="/assets/generated/logo-mark.dim_256x256.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span>WeddingInvite</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigate({ to: '/' })}
              className={`text-sm font-medium transition-colors hover:text-gold ${textColor}`}
            >
              Home
            </button>
            <button
              onClick={() => navigate({ to: '/dashboard' })}
              className={`text-sm font-medium transition-colors hover:text-gold ${textColor}`}
            >
              Dashboard
            </button>
            {!hideCreateCTA && (
              <button
                onClick={() => navigate({ to: '/create' })}
                className="px-5 py-2 bg-gold text-white rounded-full text-sm font-medium hover:bg-gold/90 transition-colors shadow-md"
              >
                Create Invitation
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${textColor}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-ivory dark:bg-charcoal border-t border-gold/20 py-4 space-y-2">
            <button
              onClick={() => { navigate({ to: '/' }); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-charcoal dark:text-ivory hover:text-gold transition-colors text-sm font-medium"
            >
              Home
            </button>
            <button
              onClick={() => { navigate({ to: '/dashboard' }); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-charcoal dark:text-ivory hover:text-gold transition-colors text-sm font-medium"
            >
              Dashboard
            </button>
            {!hideCreateCTA && (
              <div className="px-4 pt-2">
                <button
                  onClick={() => { navigate({ to: '/create' }); setMobileMenuOpen(false); }}
                  className="w-full px-5 py-2 bg-gold text-white rounded-full text-sm font-medium hover:bg-gold/90 transition-colors"
                >
                  Create Invitation
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

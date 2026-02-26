import { useState, useEffect } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Heart, Menu, X, LayoutDashboard, Plus, LogIn, LogOut, User } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

export default function Header() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity, login, clear, loginStatus, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isEditorOrGuestPage =
    currentPath.startsWith('/edit/') ||
    currentPath.startsWith('/invitation/') ||
    currentPath === '/create';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-md shadow-soft border-b border-gold-100 dark:border-charcoal-700'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Heart className="w-4 h-4 text-white fill-current" />
            </div>
            <span className={`font-serif text-lg transition-colors ${
              isScrolled ? 'text-charcoal-800 dark:text-ivory-100' : 'text-ivory-100'
            }`}>
              Vivah Digital
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => navigate({ to: link.path as '/' | '/dashboard' })}
                className={`flex items-center gap-1.5 font-sans text-sm transition-colors ${
                  currentPath === link.path
                    ? 'text-gold-500'
                    : isScrolled
                    ? 'text-charcoal-600 dark:text-ivory-300 hover:text-gold-500'
                    : 'text-ivory-200 hover:text-gold-400'
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}

            {!isEditorOrGuestPage && isAuthenticated && (
              <button
                onClick={() => navigate({ to: '/create' })}
                className="flex items-center gap-1.5 px-4 py-2 bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-semibold rounded-full text-sm transition-all duration-300 shadow-luxury"
              >
                <Plus className="w-4 h-4" />
                Create
              </button>
            )}

            {/* Auth Button */}
            {!isInitializing && (
              <button
                onClick={handleAuth}
                disabled={isLoggingIn}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isAuthenticated
                    ? 'bg-charcoal-100 dark:bg-charcoal-700 hover:bg-charcoal-200 dark:hover:bg-charcoal-600 text-charcoal-700 dark:text-ivory-200'
                    : isScrolled
                    ? 'border border-gold-400 text-gold-600 hover:bg-gold-50 dark:text-gold-400 dark:hover:bg-gold-900/20'
                    : 'border border-ivory-300 text-ivory-100 hover:bg-ivory-100/10'
                } disabled:opacity-50`}
              >
                {isLoggingIn ? (
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : isAuthenticated ? (
                  <LogOut className="w-4 h-4" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                {isLoggingIn ? 'Signing in...' : isAuthenticated ? 'Sign Out' : 'Sign In'}
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? 'text-charcoal-700 dark:text-ivory-200 hover:bg-gold-50 dark:hover:bg-charcoal-700'
                : 'text-ivory-100 hover:bg-ivory-100/10'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-charcoal-900 border-t border-gold-100 dark:border-charcoal-700 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => { navigate({ to: link.path as '/' | '/dashboard' }); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 w-full text-left px-3 py-2 text-charcoal-700 dark:text-ivory-200 hover:bg-gold-50 dark:hover:bg-charcoal-700 rounded-lg font-sans text-sm transition-colors"
              >
                {link.icon}
                {link.label}
              </button>
            ))}

            {!isEditorOrGuestPage && isAuthenticated && (
              <button
                onClick={() => { navigate({ to: '/create' }); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 w-full px-3 py-2 bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-semibold rounded-lg text-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Invitation
              </button>
            )}

            {!isInitializing && (
              <button
                onClick={() => { handleAuth(); setMobileMenuOpen(false); }}
                disabled={isLoggingIn}
                className="flex items-center gap-2 w-full px-3 py-2 border border-gold-300 text-gold-600 dark:text-gold-400 hover:bg-gold-50 dark:hover:bg-gold-900/20 rounded-lg font-sans text-sm transition-colors disabled:opacity-50"
              >
                {isAuthenticated ? <LogOut className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                {isLoggingIn ? 'Signing in...' : isAuthenticated ? 'Sign Out' : 'Sign In'}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

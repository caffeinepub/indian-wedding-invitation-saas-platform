import { useNavigate } from '@tanstack/react-router';
import { Heart, Home, LayoutDashboard } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory-50 to-gold-50 dark:from-charcoal-900 dark:to-charcoal-800 px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="relative mb-8">
          <div className="text-9xl font-serif text-gold-200 dark:text-gold-900 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart className="w-16 h-16 text-gold-400 fill-current animate-pulse" />
          </div>
        </div>

        <h1 className="text-3xl font-serif text-charcoal-800 dark:text-ivory-100 mb-3">
          Page Not Found
        </h1>
        <p className="text-charcoal-500 dark:text-ivory-400 mb-8 leading-relaxed font-sans">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to celebrating love.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-semibold rounded-full transition-all duration-300 shadow-luxury"
          >
            <Home className="w-4 h-4" />
            Go Home
          </button>
          <button
            onClick={() => navigate({ to: '/dashboard' })}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gold-300 text-gold-600 hover:bg-gold-50 dark:hover:bg-gold-900/20 font-semibold rounded-full transition-all duration-300"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

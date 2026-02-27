import { useNavigate, useLocation } from '@tanstack/react-router';
import { Heart, LayoutDashboard, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ backgroundColor: 'oklch(0.25 0.02 60)', borderColor: 'oklch(0.35 0.025 60)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate({ to: '/' })}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'oklch(0.72 0.12 75)' }}
          >
            <Heart className="w-4 h-4" style={{ color: 'oklch(0.18 0.02 60)' }} />
          </div>
          <span
            className="text-xl font-bold"
            style={{ color: 'oklch(0.72 0.12 75)', fontFamily: '"Playfair Display", serif' }}
          >
            Vivah
          </span>
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: '/dashboard' })}
            className="flex items-center gap-2 text-sm font-medium transition-colors"
            style={{
              color: isActive('/dashboard') ? 'oklch(0.72 0.12 75)' : 'oklch(0.82 0.09 78)',
              backgroundColor: isActive('/dashboard') ? 'oklch(0.35 0.025 60)' : 'transparent',
            }}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Button>

          <Button
            size="sm"
            onClick={() => navigate({ to: '/create' })}
            className="flex items-center gap-2 text-sm font-medium"
            style={{ backgroundColor: 'oklch(0.72 0.12 75)', color: 'oklch(0.18 0.02 60)' }}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}

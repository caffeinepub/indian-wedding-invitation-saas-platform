import { useNavigate } from '@tanstack/react-router';
import { Heart, Sparkles, Palette, Music, Users, Star, ArrowRight, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FEATURES = [
  {
    icon: Palette,
    title: 'Stunning Templates',
    description: 'Choose from 5 premium wedding themes crafted with traditional Indian aesthetics.',
  },
  {
    icon: Sparkles,
    title: 'Fully Customizable',
    description: 'Personalize colors, fonts, and decorative elements to match your vision.',
  },
  {
    icon: Camera,
    title: 'Photo Gallery',
    description: 'Showcase your love story with a beautiful photo gallery for your guests.',
  },
  {
    icon: Music,
    title: 'Background Music',
    description: 'Set the mood with custom background music that plays for your guests.',
  },
  {
    icon: Users,
    title: 'RSVP Management',
    description: 'Collect and manage RSVPs digitally with real-time guest count tracking.',
  },
  {
    icon: Star,
    title: 'Event Timeline',
    description: 'List all your wedding ceremonies — Mehndi, Sangeet, Wedding & Reception.',
  },
];

const SAMPLE_INVITATIONS = [
  {
    bride: 'Priya',
    groom: 'Arjun',
    date: 'March 15, 2026',
    theme: 'Classic Ivory',
    gradient: 'linear-gradient(135deg, oklch(0.97 0.01 80), oklch(0.88 0.06 80))',
    accent: 'oklch(0.55 0.18 45)',
  },
  {
    bride: 'Meera',
    groom: 'Rohan',
    date: 'April 22, 2026',
    theme: 'Royal Crimson',
    gradient: 'linear-gradient(135deg, oklch(0.97 0.01 15), oklch(0.85 0.07 15))',
    accent: 'oklch(0.45 0.20 25)',
  },
  {
    bride: 'Ananya',
    groom: 'Vikram',
    date: 'May 8, 2026',
    theme: 'Blush Rose',
    gradient: 'linear-gradient(135deg, oklch(0.97 0.01 10), oklch(0.88 0.06 15))',
    accent: 'oklch(0.60 0.14 15)',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.98 0.005 80)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'oklch(0.25 0.02 60)', borderColor: 'oklch(0.35 0.025 60)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/generated/logo-mark.dim_256x256.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold" style={{ color: 'oklch(0.72 0.12 75)', fontFamily: '"Playfair Display", serif' }}>
              Vivah
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/dashboard' })}
              className="text-sm font-medium"
              style={{ color: 'oklch(0.88 0.02 80)' }}
            >
              Dashboard
            </Button>
            <Button
              onClick={() => navigate({ to: '/create' })}
              className="text-sm font-medium"
              style={{ backgroundColor: 'oklch(0.72 0.12 75)', color: 'oklch(0.18 0.02 60)' }}
            >
              Create Invitation
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4" style={{ background: 'linear-gradient(160deg, oklch(0.99 0.003 80) 0%, oklch(0.96 0.015 80) 50%, oklch(0.93 0.03 15) 100%)' }}>
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/assets/generated/mandala-watermark.dim_800x800.png"
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] object-contain opacity-5"
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: 'oklch(0.94 0.02 80)', color: 'oklch(0.55 0.18 45)' }}>
            <Heart className="w-4 h-4" />
            Beautiful Digital Wedding Invitations
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight" style={{ color: 'oklch(0.18 0.02 60)', fontFamily: '"Playfair Display", serif' }}>
            Create Your Perfect
            <span className="block" style={{ color: 'oklch(0.55 0.18 45)' }}>Wedding Invitation</span>
          </h1>

          <p className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: 'oklch(0.40 0.03 60)' }}>
            Design stunning digital wedding invitations with traditional Indian aesthetics.
            Share with guests, collect RSVPs, and manage your special day — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate({ to: '/create' })}
              className="flex items-center gap-2 px-8 py-4 text-base font-semibold"
              style={{ backgroundColor: 'oklch(0.55 0.18 45)', color: 'oklch(0.99 0.003 80)' }}
            >
              <Sparkles className="w-5 h-5" />
              Create Free Invitation
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate({ to: '/dashboard' })}
              className="flex items-center gap-2 px-8 py-4 text-base font-semibold"
              style={{ borderColor: 'oklch(0.72 0.12 75)', color: 'oklch(0.55 0.18 45)' }}
            >
              View Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Sample Invitations */}
      <section className="py-20 px-4" style={{ backgroundColor: 'oklch(0.99 0.003 80)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.18 0.02 60)', fontFamily: '"Playfair Display", serif' }}>
              Stunning Invitation Themes
            </h2>
            <p className="text-base" style={{ color: 'oklch(0.50 0.04 60)' }}>
              Choose from our curated collection of premium wedding themes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAMPLE_INVITATIONS.map((sample, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden border shadow-card hover:shadow-card-hover transition-all cursor-pointer"
                style={{ borderColor: 'oklch(0.88 0.02 80)' }}
                onClick={() => navigate({ to: '/create' })}
              >
                <div className="h-48 flex items-center justify-center relative" style={{ background: sample.gradient }}>
                  <img
                    src="/assets/generated/mandala-divider.dim_1200x120.png"
                    alt=""
                    className="absolute bottom-0 left-0 right-0 w-full h-8 object-cover opacity-20"
                  />
                  <div className="text-center z-10">
                    <p className="text-2xl font-bold mb-1" style={{ color: sample.accent, fontFamily: '"Great Vibes", cursive' }}>
                      {sample.bride} & {sample.groom}
                    </p>
                    <p className="text-xs font-medium" style={{ color: 'oklch(0.50 0.04 60)' }}>{sample.date}</p>
                  </div>
                </div>
                <div className="p-4" style={{ backgroundColor: 'oklch(0.99 0.003 80)' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: 'oklch(0.18 0.02 60)' }}>{sample.theme}</span>
                    <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'oklch(0.94 0.02 80)', color: 'oklch(0.55 0.18 45)' }}>
                      Premium
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4" style={{ backgroundColor: 'oklch(0.97 0.01 80)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.18 0.02 60)', fontFamily: '"Playfair Display", serif' }}>
              Everything You Need
            </h2>
            <p className="text-base" style={{ color: 'oklch(0.50 0.04 60)' }}>
              Powerful features to make your wedding invitation truly special
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border shadow-card hover:shadow-card-hover transition-all"
                style={{ backgroundColor: 'oklch(0.99 0.003 80)', borderColor: 'oklch(0.88 0.02 80)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'oklch(0.94 0.02 80)' }}>
                  <feature.icon className="w-6 h-6" style={{ color: 'oklch(0.55 0.18 45)' }} />
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'oklch(0.18 0.02 60)' }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.50 0.04 60)' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, oklch(0.25 0.02 60), oklch(0.35 0.025 60))' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.98 0.005 80)', fontFamily: '"Playfair Display", serif' }}>
            Ready to Create Your Invitation?
          </h2>
          <p className="text-base mb-8" style={{ color: 'oklch(0.82 0.09 78)' }}>
            Join thousands of couples who have shared their special day with beautiful digital invitations.
          </p>
          <Button
            size="lg"
            onClick={() => navigate({ to: '/create' })}
            className="flex items-center gap-2 px-10 py-4 text-base font-semibold mx-auto"
            style={{ backgroundColor: 'oklch(0.72 0.12 75)', color: 'oklch(0.18 0.02 60)' }}
          >
            <Heart className="w-5 h-5" />
            Start Creating Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t text-center" style={{ backgroundColor: 'oklch(0.99 0.003 80)', borderColor: 'oklch(0.88 0.02 80)' }}>
        <p className="text-sm" style={{ color: 'oklch(0.50 0.04 60)' }}>
          © {new Date().getFullYear()} Vivah — Built with{' '}
          <span style={{ color: 'oklch(0.55 0.20 25)' }}>♥</span>{' '}
          using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: 'oklch(0.55 0.18 45)' }}
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

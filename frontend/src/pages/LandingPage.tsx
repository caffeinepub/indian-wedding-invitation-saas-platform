import { useNavigate } from '@tanstack/react-router';
import { Heart, Star, Sparkles, Camera, Music, Users, ArrowRight, CheckCircle } from 'lucide-react';
import DecorativeDivider from '../components/layout/DecorativeDivider';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Stunning Templates',
      description: 'Choose from 12 beautifully crafted templates inspired by Indian wedding traditions.',
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: 'Photo Gallery',
      description: 'Share your precious moments with a beautiful photo gallery for your guests.',
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: 'Background Music',
      description: 'Set the mood with custom background music that plays as guests view your invitation.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'RSVP Management',
      description: 'Collect and manage RSVPs digitally with real-time guest count tracking.',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Multiple Events',
      description: 'Add all your wedding events — Mehndi, Haldi, Sangeet, Wedding, and Reception.',
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Custom Themes',
      description: 'Personalize colors, fonts, and backgrounds to match your wedding aesthetic.',
    },
  ];

  const steps = [
    { number: '01', title: 'Create Your Invitation', description: 'Fill in your wedding details and choose a beautiful template.' },
    { number: '02', title: 'Customize & Personalize', description: 'Add photos, events, music, and customize the theme to your taste.' },
    { number: '03', title: 'Share with Guests', description: 'Publish and share your unique invitation link with family and friends.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-900/50 to-charcoal-900/80" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src="/assets/generated/logo-mark.dim_256x256.png" alt="Logo" className="w-16 h-16 opacity-90" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-16 bg-gold-400" />
            <span className="text-gold-400 font-sans text-sm tracking-[0.3em] uppercase">Digital Wedding Invitations</span>
            <div className="h-px w-16 bg-gold-400" />
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-ivory-50 mb-6 leading-tight">
            Create Your
            <span className="block text-gold-400">Dream Wedding</span>
            Invitation
          </h1>

          <p className="text-xl text-ivory-200 mb-10 max-w-2xl mx-auto leading-relaxed font-sans">
            Craft stunning digital wedding invitations that capture the essence of your special day.
            Beautiful templates, easy customization, and seamless guest management.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate({ to: '/dashboard' })}
              className="group px-8 py-4 bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-semibold rounded-full transition-all duration-300 shadow-luxury hover:shadow-xl flex items-center justify-center gap-2 text-lg"
            >
              <Heart className="w-5 h-5 fill-current" />
              Start Creating
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate({ to: '/dashboard' })}
              className="px-8 py-4 border-2 border-ivory-200 text-ivory-100 hover:bg-ivory-100/10 font-semibold rounded-full transition-all duration-300 text-lg"
            >
              View Dashboard
            </button>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 text-ivory-300">
            <div className="text-center">
              <div className="text-3xl font-serif text-gold-400">12+</div>
              <div className="text-sm font-sans">Templates</div>
            </div>
            <div className="h-8 w-px bg-ivory-500/30" />
            <div className="text-center">
              <div className="text-3xl font-serif text-gold-400">∞</div>
              <div className="text-sm font-sans">Customizations</div>
            </div>
            <div className="h-8 w-px bg-ivory-500/30" />
            <div className="text-center">
              <div className="text-3xl font-serif text-gold-400">Free</div>
              <div className="text-sm font-sans">Forever</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-ivory-300/50 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-3 bg-ivory-300/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      <DecorativeDivider variant="mandala" />

      {/* Features Section */}
      <section className="py-24 px-4 bg-ivory-50 dark:bg-charcoal-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-12 bg-gold-400" />
              <span className="text-gold-600 font-sans text-sm tracking-[0.3em] uppercase">Everything You Need</span>
              <div className="h-px w-12 bg-gold-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal-800 dark:text-ivory-100 mb-4">
              Crafted for Your
              <span className="text-gold-500"> Special Day</span>
            </h2>
            <p className="text-charcoal-600 dark:text-ivory-300 max-w-2xl mx-auto text-lg">
              Every feature designed to make your wedding invitation as beautiful and memorable as your celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white dark:bg-charcoal-800 rounded-2xl shadow-soft hover:shadow-luxury transition-all duration-300 border border-gold-100 dark:border-charcoal-700 hover:border-gold-300"
              >
                <div className="w-14 h-14 bg-gold-50 dark:bg-gold-900/20 rounded-xl flex items-center justify-center text-gold-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif text-charcoal-800 dark:text-ivory-100 mb-3">{feature.title}</h3>
                <p className="text-charcoal-600 dark:text-ivory-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DecorativeDivider variant="line" />

      {/* How It Works */}
      <section className="py-24 px-4 bg-white dark:bg-charcoal-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-12 bg-gold-400" />
              <span className="text-gold-600 font-sans text-sm tracking-[0.3em] uppercase">Simple Process</span>
              <div className="h-px w-12 bg-gold-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal-800 dark:text-ivory-100 mb-4">
              How It <span className="text-gold-500">Works</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gold-200 dark:bg-gold-800" />
                )}
                <div className="w-16 h-16 bg-gold-500 text-white rounded-full flex items-center justify-center text-xl font-serif mx-auto mb-6 shadow-luxury relative z-10">
                  {step.number}
                </div>
                <h3 className="text-xl font-serif text-charcoal-800 dark:text-ivory-100 mb-3">{step.title}</h3>
                <p className="text-charcoal-600 dark:text-ivory-300 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DecorativeDivider variant="flourish" />

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/generated/watercolor-texture.dim_1200x800.png)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Heart className="w-12 h-12 text-gold-400 fill-current mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif text-ivory-50 mb-6">
            Ready to Create Your
            <span className="block text-gold-400">Perfect Invitation?</span>
          </h2>
          <p className="text-ivory-300 text-lg mb-10 leading-relaxed">
            Join thousands of couples who have created beautiful digital wedding invitations.
            Start your journey today — it's completely free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => navigate({ to: '/dashboard' })}
              className="group px-10 py-4 bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-semibold rounded-full transition-all duration-300 shadow-luxury hover:shadow-xl flex items-center justify-center gap-2 text-lg"
            >
              <Heart className="w-5 h-5 fill-current" />
              Create Your Invitation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-ivory-300">
            {['Free Forever', 'No Credit Card', 'Instant Setup', 'Beautiful Templates'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gold-400" />
                <span className="text-sm font-sans">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-charcoal-900 border-t border-charcoal-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/assets/generated/logo-mark.dim_256x256.png" alt="Logo" className="w-10 h-10 opacity-80" />
              <div>
                <div className="text-ivory-100 font-serif text-lg">Vivah Digital</div>
                <div className="text-ivory-400 text-xs font-sans">Beautiful Wedding Invitations</div>
              </div>
            </div>

            <div className="text-center text-ivory-400 text-sm font-sans">
              <p>© {new Date().getFullYear()} Vivah Digital. All rights reserved.</p>
              <p className="mt-1">
                Built with <Heart className="w-3 h-3 inline text-crimson-400 fill-current" /> using{' '}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300 transition-colors"
                >
                  caffeine.ai
                </a>
              </p>
            </div>

            <div className="flex gap-6 text-ivory-400 text-sm font-sans">
              <button onClick={() => navigate({ to: '/dashboard' })} className="hover:text-gold-400 transition-colors">
                Dashboard
              </button>
              <button onClick={() => navigate({ to: '/create' })} className="hover:text-gold-400 transition-colors">
                Create
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

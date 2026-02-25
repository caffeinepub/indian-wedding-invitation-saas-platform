import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Sparkles, Heart, Calendar, Image, Music, Share2, ChevronDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';

const FEATURES = [
  {
    icon: <Calendar className="w-6 h-6" />,
    title: 'Multi-Event Management',
    description: 'Add Haldi, Mehndi, Sangeet, Wedding & Reception with beautiful animated event cards.',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Luxury Templates',
    description: 'Choose from 6 premium templates — Royal Indian, Modern Minimal, and Cinematic Dark.',
  },
  {
    icon: <Image className="w-6 h-6" />,
    title: 'Photo Gallery',
    description: 'Drag & drop your favorite couple photos with lazy loading and elegant animations.',
  },
  {
    icon: <Music className="w-6 h-6" />,
    title: 'Background Music',
    description: 'Upload your wedding song with auto-play and a floating music controller.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'RSVP Management',
    description: 'Collect guest responses with a beautiful RSVP form linked to your invitation.',
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: 'Instant Sharing',
    description: 'Share your unique invitation link via WhatsApp or copy to clipboard in one click.',
  },
];

const SAMPLE_INVITATIONS = [
  {
    bride: 'Priya',
    groom: 'Arjun',
    date: 'March 15, 2026',
    template: 'Royal Maharaja',
    gradient: 'linear-gradient(135deg, #8B0000 0%, #D4AF37 50%, #8B0000 100%)',
    textColor: '#FFF8E7',
  },
  {
    bride: 'Ananya',
    groom: 'Rohan',
    date: 'April 22, 2026',
    template: 'Blush Elegance',
    gradient: 'linear-gradient(135deg, #E8A0A0 0%, #F5E6E6 50%, #C47C7C 100%)',
    textColor: '#2D1B1B',
  },
  {
    bride: 'Kavya',
    groom: 'Vikram',
    date: 'May 8, 2026',
    template: 'Jewel Noir',
    gradient: 'linear-gradient(135deg, #1A0A2E 0%, #7B2FBE 40%, #D4AF37 100%)',
    textColor: '#F5E6C8',
  },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-ivory overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/assets/generated/hero-bg.dim_1920x1080.png')`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        {/* Overlay */}
        <div className="hero-overlay absolute inset-0" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          {/* Logo mark */}
          <div className="flex justify-center mb-6">
            <img
              src="/assets/generated/logo-mark.dim_256x256.png"
              alt="Vivah"
              className="w-20 h-20 object-contain animate-float"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <p className="font-inter text-sm tracking-[0.3em] uppercase text-gold mb-3">
              ✦ Premium Digital Invitations ✦
            </p>
            <h1 className="font-cinzel text-4xl sm:text-5xl md:text-7xl font-bold text-ivory leading-tight mb-4">
              Your Dream
              <br />
              <span className="text-gold-gradient">Wedding Invitation</span>
            </h1>
            <p className="font-cormorant text-xl sm:text-2xl text-ivory/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Create stunning digital wedding invitations with luxury templates, animated events, and cinematic guest experiences.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            <Link to="/create">
              <Button className="btn-gold px-10 py-4 rounded-full text-base font-cinzel tracking-wider shadow-gold-lg">
                Create Your Invitation
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant="outline"
                className="px-10 py-4 rounded-full text-base font-cinzel tracking-wider border-ivory/40 text-ivory hover:bg-ivory/10 hover:border-ivory/60"
              >
                View Dashboard
              </Button>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-ivory/60" />
          </div>
        </div>
      </section>

      {/* Mandala Divider */}
      <div className="w-full flex justify-center py-4 bg-ivory">
        <img
          src="/assets/generated/mandala-divider.dim_1200x120.png"
          alt=""
          className="w-full max-w-3xl h-auto opacity-60"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 bg-ivory">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-inter text-sm tracking-[0.3em] uppercase text-gold mb-3">
              ✦ Everything You Need ✦
            </p>
            <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-foreground mb-4">
              Crafted for Indian Weddings
            </h2>
            <p className="font-inter text-muted-foreground max-w-xl mx-auto">
              A complete platform to create, customize, and share your wedding invitation with elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className="luxury-card p-6 hover:shadow-luxury-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-4 group-hover:bg-gold/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-cinzel text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="font-inter text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Invitations */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-inter text-sm tracking-[0.3em] uppercase text-gold mb-3">
              ✦ Template Gallery ✦
            </p>
            <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-foreground mb-4">
              Luxury Templates
            </h2>
            <p className="font-inter text-muted-foreground max-w-xl mx-auto">
              Choose from Royal Indian, Modern Minimal, and Cinematic Dark themes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {SAMPLE_INVITATIONS.map((inv, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden shadow-luxury-lg hover:shadow-gold-lg transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'both' }}
              >
                <div
                  className="h-64 flex flex-col items-center justify-center p-6 text-center"
                  style={{ background: inv.gradient }}
                >
                  <div className="text-xs tracking-[0.3em] uppercase mb-3 opacity-70" style={{ color: inv.textColor, fontFamily: 'Cinzel' }}>
                    ✦ Wedding Invitation ✦
                  </div>
                  <div className="text-2xl font-bold mb-1" style={{ color: inv.textColor, fontFamily: 'Cinzel' }}>
                    {inv.bride}
                  </div>
                  <div className="text-sm opacity-60 mb-1" style={{ color: inv.textColor }}>
                    &
                  </div>
                  <div className="text-2xl font-bold mb-3" style={{ color: inv.textColor, fontFamily: 'Cinzel' }}>
                    {inv.groom}
                  </div>
                  <div className="text-sm opacity-70" style={{ color: inv.textColor, fontFamily: 'Inter' }}>
                    {inv.date}
                  </div>
                </div>
                <div className="bg-card p-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-sm font-bold text-foreground">{inv.template}</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-gold text-gold" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/assets/generated/hero-bg.dim_1920x1080.png')` }}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-ivory mb-4">
            Begin Your Story
          </h2>
          <p className="font-cormorant text-xl text-ivory/80 mb-8">
            Create a wedding invitation as beautiful as your love story.
          </p>
          <Link to="/create">
            <Button className="btn-gold px-12 py-4 rounded-full text-base font-cinzel tracking-wider shadow-gold-lg animate-glow">
              Create Free Invitation
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/logo-mark.dim_256x256.png"
                alt="Vivah"
                className="w-8 h-8 object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <span className="font-cinzel text-lg font-bold text-gold-dark">VIVAH</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm font-inter text-muted-foreground">
              <Link to="/" className="hover:text-gold-dark transition-colors">Home</Link>
              <Link to="/dashboard" className="hover:text-gold-dark transition-colors">Dashboard</Link>
              <Link to="/create" className="hover:text-gold-dark transition-colors">Create</Link>
            </div>
            <p className="font-inter text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()} Vivah. Built with{' '}
              <Heart className="w-3 h-3 inline text-crimson fill-crimson" />{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'vivah-wedding')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

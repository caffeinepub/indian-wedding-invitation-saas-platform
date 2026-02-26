import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Heart, Star, Music, Camera, Palette, Users, ChevronDown } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate({ to: '/dashboard' });
  };

  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Beautiful Templates',
      description: 'Choose from 12+ stunning wedding invitation templates crafted for Indian celebrations.',
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: 'Background Music',
      description: 'Add your favorite song to create an immersive experience for your guests.',
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: 'Photo Gallery',
      description: 'Share your precious moments with a beautiful photo gallery on your invitation.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'RSVP Management',
      description: 'Collect and manage RSVPs from your guests with ease.',
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Multiple Events',
      description: 'Add all your wedding events — Haldi, Mehndi, Sangeet, Wedding, and Reception.',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Shareable Links',
      description: 'Share your invitation via WhatsApp, email, or any platform with a unique link.',
    },
  ];

  return (
    <div className="min-h-screen bg-ivory overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a0a00 0%, #3d1a00 50%, #1a0a00 100%)',
        }}
      >
        {/* Parallax background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('/assets/generated/hero-bg.dim_1920x1080.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        />

        {/* Pattern overlay */}
        <div className="absolute inset-0 pattern-overlay opacity-30" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <p className="font-script text-gold text-3xl mb-4">Welcome to</p>
            <h1 className="font-cinzel text-5xl md:text-7xl text-ivory mb-6 leading-tight">
              Wedding<span className="text-gold">Invite</span>
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-24 bg-gold opacity-60" />
              <Heart className="w-5 h-5 text-gold fill-gold" />
              <div className="h-px w-24 bg-gold opacity-60" />
            </div>
            <p className="font-serif text-ivory-dark text-xl md:text-2xl mb-4 leading-relaxed">
              Create stunning digital wedding invitations
            </p>
            <p className="font-elegant text-gold-light text-base md:text-lg mb-12 max-w-2xl mx-auto">
              Beautifully crafted for Indian celebrations — share your joy with the world
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="bg-gold hover:bg-gold-dark text-charcoal font-elegant font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-luxury hover:shadow-luxury-lg text-lg"
              >
                Create Your Invitation
              </button>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-gold text-gold hover:bg-gold hover:text-charcoal font-elegant font-semibold px-10 py-4 rounded-full transition-all duration-300 text-lg"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gold opacity-70" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-ivory">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-script text-gold text-2xl mb-2">Everything you need</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">
              Craft Your Perfect Invitation
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gold opacity-60" />
              <Heart className="w-4 h-4 text-gold fill-gold" />
              <div className="h-px w-16 bg-gold opacity-60" />
            </div>
            <p className="font-serif text-charcoal-light text-lg max-w-2xl mx-auto">
              Our platform provides all the tools you need to create a memorable digital wedding invitation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="luxury-card rounded-2xl p-8 hover:shadow-luxury-lg transition-all duration-300 group"
              >
                <div className="text-gold mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-display text-xl text-charcoal mb-3">{feature.title}</h3>
                <p className="font-serif text-charcoal-light leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Invitation Preview */}
      <section className="py-24 bg-ivory-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-script text-gold text-2xl mb-2">See it in action</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">
              Beautiful Invitations
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gold opacity-60" />
              <Heart className="w-4 h-4 text-gold fill-gold" />
              <div className="h-px w-16 bg-gold opacity-60" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { names: 'Priya & Arjun', date: 'March 15, 2026', template: 'Royal Gold', bg: 'linear-gradient(135deg, #1a0a00, #3d1a00)' },
              { names: 'Ananya & Rohan', date: 'April 22, 2026', template: 'Romantic Blush', bg: 'linear-gradient(135deg, #FFF0F3, #FFE4E8)' },
              { names: 'Meera & Vikram', date: 'May 8, 2026', template: 'Modern Minimal', bg: 'linear-gradient(135deg, #F7FAFC, #EDF2F7)' },
            ].map((sample, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2"
                style={{ background: sample.bg }}
              >
                <div className="p-8 text-center min-h-48 flex flex-col items-center justify-center">
                  <p className="font-script text-3xl mb-2" style={{ color: index === 0 ? '#D4AF37' : index === 1 ? '#E8A0B4' : '#2D3748' }}>
                    {sample.names}
                  </p>
                  <p className="font-elegant text-sm mb-1" style={{ color: index === 0 ? '#E8D48B' : index === 1 ? '#C9956C' : '#4A5568' }}>
                    {sample.date}
                  </p>
                  <p className="font-cinzel text-xs mt-2 opacity-70" style={{ color: index === 0 ? '#D4AF37' : index === 1 ? '#E8A0B4' : '#2D3748' }}>
                    {sample.template}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #1a0a00, #3d1a00)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-script text-gold text-3xl mb-4">Start your journey</p>
          <h2 className="font-cinzel text-4xl md:text-5xl text-ivory mb-6">
            Create Your Dream Invitation
          </h2>
          <p className="font-serif text-ivory-dark text-lg mb-10 leading-relaxed">
            Join thousands of couples who have shared their special day with beautiful digital invitations.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-gold hover:bg-gold-dark text-charcoal font-elegant font-semibold px-12 py-4 rounded-full transition-all duration-300 shadow-luxury hover:shadow-luxury-lg text-lg"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/assets/generated/logo-mark.dim_256x256.png" alt="WeddingInvite" className="w-10 h-10 rounded-full" />
              <span className="font-cinzel text-gold text-xl">WeddingInvite</span>
            </div>
            <p className="font-elegant text-charcoal-light text-sm text-center">
              © {new Date().getFullYear()} WeddingInvite. Built with{' '}
              <Heart className="w-4 h-4 inline text-crimson fill-crimson" />{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light transition-colors"
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

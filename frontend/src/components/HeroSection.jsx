import React from 'react';
import { Shield, Crosshair, Lock, Zap } from 'lucide-react';

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen bg-black flex items-center overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 1px, transparent 1px, transparent 7.6923%), repeating-linear-gradient(-90deg, #fff, #fff 1px, transparent 1px, transparent 7.6923%)',
          backgroundSize: '100% 100%'
        }}
      />

      {/* Cyber Icons Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-[#A020F0]/10 animate-pulse">
          <Shield size={120} />
        </div>
        <div className="absolute bottom-20 right-10 text-[#A020F0]/10 animate-pulse" style={{ animationDelay: '1s' }}>
          <Lock size={100} />
        </div>
        <div className="absolute top-1/2 right-20 text-[#A020F0]/10 animate-pulse" style={{ animationDelay: '2s' }}>
          <Crosshair size={80} />
        </div>
        <div className="absolute bottom-1/3 left-20 text-[#A020F0]/10 animate-pulse" style={{ animationDelay: '1.5s' }}>
          <Zap size={90} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-[7.6923%] py-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-[#A020F0]/30 rounded-sm mb-8">
            <Shield size={20} className="text-[#A020F0]" />
            <span className="text-white/80 text-sm font-medium">Purple Team Cybersecurity</span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #A020F0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Fortalece tu sistema contra ciberamenazas con lo mejor de Red & Blue Team
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/85 mb-8 leading-relaxed max-w-3xl">
            Mezclamos pentesting, threat hunting y hardening con TTPs multi-APT para un{' '}
            <span
              className="font-bold text-[#A020F0]"
              style={{
                textShadow: '0 0 20px rgba(160, 32, 240, 0.4)'
              }}
            >
              80%+ de mejora
            </span>{' '}
            en resiliencia
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mb-12">
            <div>
              <div className="text-4xl font-bold text-[#A020F0] mb-1">30+</div>
              <div className="text-white/60 text-sm">TTPs Multi-APT</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#A020F0] mb-1">24/7</div>
              <div className="text-white/60 text-sm">Incident Response</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#A020F0] mb-1">80%+</div>
              <div className="text-white/60 text-sm">Mejora en Resiliencia</div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection('servicios')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#A020F0] text-black text-lg font-semibold transition-all duration-400 hover:bg-white hover:shadow-[0_0_30px_rgba(160,32,240,0.5)] active:scale-98"
            style={{
              boxShadow: '0 0 20px rgba(160, 32, 240, 0.3)'
            }}
          >
            Descubre Nuestros Packs
            <Zap size={20} className="group-hover:animate-pulse" />
          </button>
        </div>
      </div>

      {/* Glow Effect */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A020F0]/20 rounded-full blur-[120px] pointer-events-none"
      />
    </section>
  );
};

export default HeroSection;
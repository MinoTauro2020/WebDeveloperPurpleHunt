import React from 'react';
import { Swords, Shield, Zap, CheckCircle } from 'lucide-react';
import { methodology } from '../mock';

const MethodologySection = () => {
  return (
    <section id="metodologia" className="relative bg-black py-24">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 1px, transparent 1px, transparent 7.6923%), repeating-linear-gradient(-90deg, #fff, #fff 1px, transparent 1px, transparent 7.6923%)',
          backgroundSize: '100% 100%'
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-[7.6923%]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestra{' '}
            <span
              className="text-[#A020F0]"
              style={{
                textShadow: '0 0 20px rgba(160, 32, 240, 0.5)'
              }}
            >
              Metodología
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Combinamos operaciones ofensivas y defensivas para máxima protección
          </p>
        </div>

        {/* Methodology Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Red Team */}
          <div className="bg-black/50 border border-red-500/30 p-8 hover:border-red-500/50 transition-all duration-400">
            <div className="flex items-center gap-3 mb-6">
              <Swords size={32} className="text-red-500" />
              <div>
                <h3 className="text-2xl font-bold text-white">{methodology.redTeam.title}</h3>
                <p className="text-red-500 text-sm font-semibold">{methodology.redTeam.subtitle}</p>
              </div>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">{methodology.redTeam.description}</p>
            <ul className="space-y-3">
              {methodology.redTeam.capabilities.map((capability, idx) => (
                <li key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                  <CheckCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Blue Team */}
          <div className="bg-black/50 border border-blue-500/30 p-8 hover:border-blue-500/50 transition-all duration-400">
            <div className="flex items-center gap-3 mb-6">
              <Shield size={32} className="text-blue-500" />
              <div>
                <h3 className="text-2xl font-bold text-white">{methodology.blueTeam.title}</h3>
                <p className="text-blue-500 text-sm font-semibold">{methodology.blueTeam.subtitle}</p>
              </div>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">{methodology.blueTeam.description}</p>
            <ul className="space-y-3">
              {methodology.blueTeam.capabilities.map((capability, idx) => (
                <li key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                  <CheckCircle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Purple Team */}
          <div className="bg-black/50 border-2 border-[#A020F0]/50 p-8 hover:border-[#A020F0] transition-all duration-400 shadow-[0_0_30px_rgba(160,32,240,0.2)]">
            <div className="flex items-center gap-3 mb-6">
              <Zap size={32} className="text-[#A020F0]" />
              <div>
                <h3 className="text-2xl font-bold text-white">{methodology.purpleTeam.title}</h3>
                <p className="text-[#A020F0] text-sm font-semibold">{methodology.purpleTeam.subtitle}</p>
              </div>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">{methodology.purpleTeam.description}</p>
            <ul className="space-y-3">
              {methodology.purpleTeam.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                  <CheckCircle size={16} className="text-[#A020F0] flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#A020F0]/10 border border-[#A020F0]/30">
            <Zap size={24} className="text-[#A020F0]" />
            <p className="text-white/80">
              <strong className="text-[#A020F0]">Purple Team</strong> es el enfoque más efectivo para detectar y responder a amenazas modernas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
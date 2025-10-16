import React from 'react';
import { Shield, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import { services } from '../mock';

const ServicesSection = () => {
  const handleContractClick = (serviceTitle) => {
    console.log('Contratar:', serviceTitle);
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getIcon = (index) => {
    const icons = [Shield, Target, AlertTriangle];
    const Icon = icons[index % icons.length];
    return <Icon size={32} />;
  };

  return (
    <section id="servicios" className="relative bg-black py-24">
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
            Nuestros{' '}
            <span
              className="text-[#A020F0]"
              style={{
                textShadow: '0 0 20px rgba(160, 32, 240, 0.5)'
              }}
            >
              Servicios
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Paquetes diseñados para cubrir múltiples TTPs de grupos APT y fortalecer tu infraestructura
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative bg-black/50 border transition-all duration-400 hover:scale-105 hover:shadow-xl p-8 ${
                service.highlighted
                  ? 'border-[#A020F0] shadow-[0_0_30px_rgba(160,32,240,0.3)]'
                  : 'border-white/20 hover:border-[#A020F0]/50'
              }`}
            >
              {service.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#A020F0] text-black text-sm font-bold">
                  MÁS POPULAR
                </div>
              )}

              {/* Icon */}
              <div className="mb-6 text-[#A020F0]">{getIcon(index)}</div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-white/60 text-sm mb-6">{service.subtitle}</p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white/80">
                    <CheckCircle size={18} className="text-[#A020F0] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* APT Coverage */}
              <div className="mb-6 p-4 bg-[#A020F0]/10 border border-[#A020F0]/30">
                <p className="text-sm text-white/90">{service.aptCoverage}</p>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleContractClick(service.title)}
                className="w-full py-3 bg-white/10 text-white border border-white/20 font-semibold transition-all duration-400 hover:bg-white hover:text-black active:scale-98"
              >
                Contratar Ahora
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-[#A020F0]/30">
            <Shield size={24} className="text-[#A020F0]" />
            <p className="text-white/80">
              Todos los paquetes incluyen reportes detallados y seguimiento continuo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
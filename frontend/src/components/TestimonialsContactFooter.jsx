import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Mail, Building, User, MessageSquare, Send } from 'lucide-react';
import { testimonials, contactFormSubmit } from '../mock';
import { toast } from 'sonner';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative bg-black py-24">
      <div className="max-w-[1400px] mx-auto px-[7.6923%]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Lo que dicen nuestros{' '}
            <span
              className="text-[#A020F0]"
              style={{
                textShadow: '0 0 20px rgba(160, 32, 240, 0.5)'
              }}
            >
              Clientes
            </span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-black border-2 border-[#A020F0]/40 p-12">
            <div className="text-center">
              <p className="text-2xl text-white/90 mb-8 leading-relaxed italic">
                "{testimonials[currentIndex].text}"
              </p>
              <div>
                <p className="text-[#A020F0] font-bold text-lg">{testimonials[currentIndex].author}</p>
                <p className="text-white/60 text-sm">
                  {testimonials[currentIndex].role} - {testimonials[currentIndex].company}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full md:left-0 p-3 bg-[#A020F0]/20 border border-[#A020F0]/40 text-white hover:bg-[#A020F0] transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-full md:right-0 p-3 bg-[#A020F0]/20 border border-[#A020F0]/40 text-white hover:bg-[#A020F0] transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 transition-all duration-300 ${
                  idx === currentIndex ? 'bg-[#A020F0] w-8' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await contactFormSubmit(formData);
      toast.success(result.message);
      setFormData({ nombre: '', email: '', empresa: '', mensaje: '' });
    } catch (error) {
      toast.error('Error al enviar el mensaje');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="relative bg-black py-24">
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Hablemos de tu{' '}
            <span
              className="text-[#A020F0]"
              style={{
                textShadow: '0 0 20px rgba(160, 32, 240, 0.5)'
              }}
            >
              Seguridad
            </span>
          </h2>
          <p className="text-xl text-white/70">
            Contáctanos para fortalecer tu infraestructura contra amenazas APT
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">Nombre *</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A020F0]" size={20} />
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-white/20 text-white px-12 py-4 focus:border-[#A020F0] focus:outline-none transition-all duration-300"
                  placeholder="Tu nombre"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">Email *</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A020F0]" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-white/20 text-white px-12 py-4 focus:border-[#A020F0] focus:outline-none transition-all duration-300"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Empresa */}
            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">Empresa *</label>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A020F0]" size={20} />
                <input
                  type="text"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-white/20 text-white px-12 py-4 focus:border-[#A020F0] focus:outline-none transition-all duration-300"
                  placeholder="Nombre de tu empresa"
                />
              </div>
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">Mensaje *</label>
              <div className="relative">
                <MessageSquare
                  className="absolute left-4 top-6 text-[#A020F0]"
                  size={20}
                />
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full bg-black border border-white/20 text-white px-12 py-4 focus:border-[#A020F0] focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Cuéntanos sobre tus necesidades de seguridad..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#A020F0] text-black text-lg font-bold transition-all duration-400 hover:bg-white hover:shadow-[0_0_30px_rgba(160,32,240,0.5)] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              style={{
                boxShadow: '0 0 20px rgba(160, 32, 240, 0.3)'
              }}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-8">
      <div className="max-w-[1400px] mx-auto px-[7.6923%] text-center">
        <p className="text-white/60 text-sm">
          Copyright © 2025{' '}
          <span className="text-[#A020F0] font-semibold">PurpleHunt.es</span> | purplehunt.es
        </p>
      </div>
    </footer>
  );
};

const TestimonialsContactFooter = () => {
  return (
    <>
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default TestimonialsContactFooter;
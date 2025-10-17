import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-400 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-[7.6923%] py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection('inicio')}
        >
          <div className="text-3xl font-bold">
            <span className="text-white">Purple</span>
            <span
              className="text-[#A020F0]"
              style={{
                textShadow: '0 0 20px rgba(160, 32, 240, 0.6), 0 0 40px rgba(160, 32, 240, 0.3)'
              }}
            >
              Hunt
            </span>
            <span className="text-white">.es</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('inicio')}
            className="text-white/60 hover:text-white text-lg font-medium transition-colors duration-300"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection('servicios')}
            className="text-white/60 hover:text-white text-lg font-medium transition-colors duration-300"
          >
            Servicios
          </button>
          <button
            onClick={() => scrollToSection('metodologia')}
            className="text-white/60 hover:text-white text-lg font-medium transition-colors duration-300"
          >
            Metodología
          </button>
          <button
            onClick={() => scrollToSection('apt-groups')}
            className="text-white/60 hover:text-white text-lg font-medium transition-colors duration-300"
          >
            Amenazas APT
          </button>
          <button
            onClick={() => scrollToSection('glosario')}
            className="text-white/60 hover:text-white text-lg font-medium transition-colors duration-300"
          >
            Glosario
          </button>
          <button
            onClick={() => scrollToSection('contacto')}
            className="text-white/60 hover:text-white text-lg font-medium transition-colors duration-300"
          >
            Contacto
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-white/10">
          <nav className="flex flex-col px-[7.6923%] py-6 gap-4">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-white/60 hover:text-white text-lg font-medium transition-colors duration-300 text-left"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className="text-white/60 hover:text-white text-lg font-medium transition-colors duration-300 text-left"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="text-white/60 hover:text-white text-lg font-medium transition-colors duration-300 text-left"
            >
              Contacto
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
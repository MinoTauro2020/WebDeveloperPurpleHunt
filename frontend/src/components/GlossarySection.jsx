import React, { useState } from 'react';
import { ChevronDown, Book } from 'lucide-react';
import { glossaryTerms } from '../mock';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const GlossarySection = () => {
  return (
    <section className="relative bg-black py-24">
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <Book size={40} className="text-[#A020F0]" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Glosario de{' '}
              <span
                className="text-[#A020F0]"
                style={{
                  textShadow: '0 0 20px rgba(160, 32, 240, 0.5)'
                }}
              >
                Ciberseguridad
              </span>
            </h2>
          </div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Términos esenciales que todo profesional de seguridad debe conocer
          </p>
        </div>

        {/* Glossary Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {glossaryTerms.map((item) => (
              <AccordionItem
                key={item.id}
                value={`item-${item.id}`}
                className="bg-black/50 border border-white/20 hover:border-[#A020F0]/50 px-6 transition-all duration-300"
              >
                <AccordionTrigger className="text-white hover:text-[#A020F0] text-left py-6">
                  <span className="text-lg font-semibold">{item.term}</span>
                </AccordionTrigger>
                <AccordionContent className="text-white/80 pb-6 leading-relaxed">
                  {item.definition}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default GlossarySection;
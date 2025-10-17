import React from 'react';
import { Shield, Target, Globe, AlertTriangle } from 'lucide-react';
import { aptGroups } from '../mock';

const APTGroupsSection = () => {
  const getOriginIcon = () => <Globe size={24} />;

  return (
    <section className="relative bg-black py-24">
      <div className="max-w-[1400px] mx-auto px-[7.6923%]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Principales{' '}
            <span
              className="text-[#A020F0]"
              style={{
                textShadow: '0 0 20px rgba(160, 32, 240, 0.5)'
              }}
            >
              Grupos APT
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Conoce las amenazas persistentes avanzadas más activas y sus tácticas
          </p>
        </div>

        {/* APT Groups Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {aptGroups.map((group) => (
            <div
              key={group.id}
              className="bg-black/50 border border-white/20 hover:border-[#A020F0]/50 p-8 transition-all duration-400 hover:shadow-[0_0_30px_rgba(160,32,240,0.2)]"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{group.name}</h3>
                  <div className="flex items-center gap-2 text-white/60">
                    {getOriginIcon()}
                    <span>{group.origin}</span>
                  </div>
                </div>
                <Shield size={32} className="text-[#A020F0]" />
              </div>

              {/* Description */}
              <p className="text-white/80 mb-6 leading-relaxed">{group.description}</p>

              {/* Tactics */}
              <div className="mb-6">
                <h4 className="text-[#A020F0] font-semibold mb-3 flex items-center gap-2">
                  <Target size={18} />
                  Tácticas Principales
                </h4>
                <ul className="space-y-2">
                  {group.tactics.map((tactic, idx) => (
                    <li key={idx} className="text-white/70 text-sm pl-4 border-l-2 border-[#A020F0]/30">
                      {tactic}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Targets */}
              <div className="mb-6">
                <h4 className="text-[#A020F0] font-semibold mb-3">Objetivos Principales</h4>
                <div className="flex flex-wrap gap-2">
                  {group.targets.map((target, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#A020F0]/10 border border-[#A020F0]/30 text-white/80 text-sm"
                    >
                      {target}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notable Attacks */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-white/60 text-sm flex items-start gap-2">
                  <AlertTriangle size={16} className="text-[#A020F0] flex-shrink-0 mt-0.5" />
                  <span><strong>Ataque Notable:</strong> {group.notableAttacks}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default APTGroupsSection;
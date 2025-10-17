import React from 'react';
import { AlertCircle, Calendar, Tag } from 'lucide-react';
import { threatNews } from '../mock';

const ThreatNewsSection = () => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-500/10';
      case 'high':
        return 'border-orange-500 bg-orange-500/10';
      case 'medium':
        return 'border-yellow-500 bg-yellow-500/10';
      default:
        return 'border-[#A020F0] bg-[#A020F0]/10';
    }
  };

  const getSeverityText = (severity) => {
    switch (severity) {
      case 'critical':
        return 'CRÍTICA';
      case 'high':
        return 'ALTA';
      case 'medium':
        return 'MEDIA';
      default:
        return 'BAJA';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <section className="relative bg-black py-24">
      <div className="max-w-[1400px] mx-auto px-[7.6923%]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Últimas{' '}
            <span
              className="text-[#A020F0]"
              style={{
                textShadow: '0 0 20px rgba(160, 32, 240, 0.5)'
              }}
            >
              Amenazas
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Mantente actualizado sobre las amenazas de ciberseguridad más recientes
          </p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {threatNews.map((news) => (
            <div
              key={news.id}
              className="bg-black/50 border border-white/20 hover:border-[#A020F0]/50 p-6 transition-all duration-400 hover:shadow-[0_0_30px_rgba(160,32,240,0.2)] flex flex-col"
            >
              {/* Header with Severity */}
              <div className="flex items-start justify-between mb-4">
                <div className={`px-3 py-1 border text-xs font-bold ${getSeverityColor(news.severity)}`}>
                  {getSeverityText(news.severity)}
                </div>
                <AlertCircle size={20} className="text-[#A020F0]" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                {news.title}
              </h3>

              {/* Meta Info */}
              <div className="flex items-center gap-4 mb-4 text-white/60 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{formatDate(news.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag size={14} />
                  <span>{news.category}</span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-white/70 text-sm leading-relaxed flex-grow">
                {news.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreatNewsSection;
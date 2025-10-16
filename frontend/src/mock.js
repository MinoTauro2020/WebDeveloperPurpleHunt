// Mock data para PurpleHunt.es

export const services = [
  {
    id: 1,
    title: "Pack 1: 10 TTPs Multi-APT",
    subtitle: "Básico Hardening y Pentest Intro",
    features: [
      "Pentesting básico (black/gray/white box)",
      "Cobertura de 10 TTPs comunes de grupos APT",
      "Análisis de vulnerabilidades externas",
      "Reporte detallado con recomendaciones",
      "Hardening básico de sistemas"
    ],
    aptCoverage: "Cubre ataques comunes de grupos APT como APT29 (Cozy Bear) y APT28 (Fancy Bear)",
    highlighted: false
  },
  {
    id: 2,
    title: "Pack 2: 20 TTPs Multi-APT",
    subtitle: "Threat Hunt + SIEM Rules",
    features: [
      "Todo lo del Pack 1",
      "Threat hunting activo en tu infraestructura",
      "Implementación de reglas SIEM personalizadas",
      "Análisis de logs y detección de anomalías",
      "Cobertura de 20 TTPs multi-APT",
      "Incident response básico"
    ],
    aptCoverage: "Protección contra APT29, APT28, Lazarus Group y APT41",
    highlighted: true
  },
  {
    id: 3,
    title: "Pack 3: 30 TTPs Multi-APT",
    subtitle: "Full Incident Response + EDR Hardening",
    features: [
      "Todo lo del Pack 2",
      "Incident response completo 24/7",
      "Configuración y hardening de EDR",
      "Simulación de ataques avanzados",
      "Cobertura de 30+ TTPs multi-APT",
      "Pentesting interno y externo completo",
      "Capacitación para tu equipo de seguridad"
    ],
    aptCoverage: "Máxima protección contra APT29, APT28, Lazarus Group, APT41 y más de 10 grupos APT adicionales",
    highlighted: false
  }
];

export const testimonials = [
  {
    id: 1,
    text: "Increíble, estoy hardening mis sistemas como nunca. La mezcla de Red y Blue Team ha sido un cambio total en nuestra seguridad.",
    author: "Carlos Martínez",
    company: "TechSolutions S.L.",
    role: "CTO"
  },
  {
    id: 2,
    text: "Mezcla perfecta de Red/Blue con TTPs multi-APT, amenazas reducidas drásticamente. Nuestros sistemas nunca habían estado tan protegidos.",
    author: "Ana García",
    company: "SecureBank Corp",
    role: "CISO"
  },
  {
    id: 3,
    text: "El enfoque Purple Team es exactamente lo que necesitábamos. Cobertura total de TTPs y respuesta inmediata ante incidentes.",
    author: "Miguel Rodríguez",
    company: "DataProtect Industries",
    role: "Director de Seguridad"
  }
];

export const contactFormSubmit = (formData) => {
  // Mock function para simular envío de formulario
  console.log('Formulario enviado (mock):', formData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Mensaje enviado correctamente' });
    }, 1000);
  });
};
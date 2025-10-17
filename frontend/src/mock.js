// Mock data para PurpleHunt.es

// APT Groups Information
export const aptGroups = [
  {
    id: 1,
    name: "APT29 (Cozy Bear)",
    origin: "Rusia",
    description: "Grupo de amenaza persistente avanzada vinculado a servicios de inteligencia rusos. Conocido por ataques sofisticados a objetivos gubernamentales y organizaciones.",
    tactics: [
      "Spear phishing con documentos maliciosos",
      "Explotación de vulnerabilidades zero-day",
      "Uso de herramientas legítimas (Living off the Land)",
      "Persistencia mediante tareas programadas"
    ],
    targets: ["Gobiernos", "Think tanks", "Sector salud", "Investigación"],
    notableAttacks: "SolarWinds supply chain attack (2020)"
  },
  {
    id: 2,
    name: "APT28 (Fancy Bear)",
    origin: "Rusia",
    description: "Grupo de ciberespionaje asociado a inteligencia militar rusa. Activo desde 2007, conocido por operaciones de influencia y espionaje.",
    tactics: [
      "Campañas de phishing dirigidas",
      "Explotación de vulnerabilidades en servicios web",
      "Credential harvesting",
      "Uso de malware personalizado (X-Agent, Sofacy)"
    ],
    targets: ["Gobiernos", "Militares", "Medios de comunicación", "ONGs"],
    notableAttacks: "Democratic National Committee breach (2016)"
  },
  {
    id: 3,
    name: "Lazarus Group",
    origin: "Corea del Norte",
    description: "Grupo de amenaza patrocinado por el estado norcoreano. Motivado tanto por espionaje como por ganancias financieras.",
    tactics: [
      "Ataques a infraestructura financiera (SWIFT)",
      "Ransomware para extorsión",
      "Cryptojacking y robo de criptomonedas",
      "Supply chain attacks"
    ],
    targets: ["Bancos", "Exchanges de crypto", "Industria del entretenimiento", "Defensa"],
    notableAttacks: "WannaCry ransomware (2017), Sony Pictures hack (2014)"
  },
  {
    id: 4,
    name: "APT41",
    origin: "China",
    description: "Grupo único que realiza tanto espionaje estatal como actividades criminales para beneficio financiero.",
    tactics: [
      "Explotación de vulnerabilidades en aplicaciones web",
      "Uso de certificados digitales robados",
      "Implantes de rootkit y bootkits",
      "Targeted intrusions con objetivos duales"
    ],
    targets: ["Sector tecnológico", "Healthcare", "Telecomunicaciones", "Gaming"],
    notableAttacks: "Operaciones contra múltiples sectores globalmente"
  }
];

// Cybersecurity Glossary
export const glossaryTerms = [
  {
    id: 1,
    term: "Ransomware",
    definition: "Tipo de malware que cifra los archivos de una víctima y exige un pago (generalmente en criptomonedas) para restaurar el acceso. Los ataques modernos incluyen 'doble extorsión': robo de datos antes del cifrado."
  },
  {
    id: 2,
    term: "Kill Chain",
    definition: "Marco desarrollado por Lockheed Martin que describe las etapas de un ciberataque: Reconocimiento, Weaponización, Entrega, Explotación, Instalación, Comando y Control, y Acciones sobre objetivos."
  },
  {
    id: 3,
    term: "TTPs (Tactics, Techniques, and Procedures)",
    definition: "Patrones de comportamiento de amenazas. Tácticas: objetivos del atacante, Técnicas: métodos para lograr tácticas, Procedimientos: implementación específica de técnicas."
  },
  {
    id: 4,
    term: "Pentesting (Penetration Testing)",
    definition: "Evaluación de seguridad autorizada que simula ataques reales para identificar vulnerabilidades. Puede ser black box (sin información), gray box (información parcial) o white box (información completa)."
  },
  {
    id: 5,
    term: "Red Team",
    definition: "Equipo que simula adversarios reales para probar las defensas de una organización mediante técnicas ofensivas, buscando vulnerabilidades y debilidades en seguridad."
  },
  {
    id: 6,
    term: "Blue Team",
    definition: "Equipo defensivo encargado de monitorear, detectar y responder a amenazas. Implementa controles de seguridad, analiza logs y mejora la postura de seguridad."
  },
  {
    id: 7,
    term: "Purple Team",
    definition: "Enfoque colaborativo que combina Red Team y Blue Team. El objetivo es maximizar el aprendizaje compartiendo conocimientos ofensivos y defensivos para mejorar la seguridad global."
  },
  {
    id: 8,
    term: "SIEM (Security Information and Event Management)",
    definition: "Sistema que agrega y analiza logs de seguridad en tiempo real. Proporciona detección de amenazas, investigación de incidentes y cumplimiento de normativas."
  },
  {
    id: 9,
    term: "EDR (Endpoint Detection and Response)",
    definition: "Solución de seguridad que monitorea endpoints (ordenadores, servidores) en busca de amenazas, proporciona alertas y permite respuesta automatizada ante incidentes."
  },
  {
    id: 10,
    term: "Zero-Day",
    definition: "Vulnerabilidad desconocida para el fabricante del software. Los atacantes la explotan antes de que exista un parche, dando 'cero días' para defenderse."
  },
  {
    id: 11,
    term: "Threat Hunting",
    definition: "Búsqueda proactiva de amenazas ocultas en la red. A diferencia de la detección automatizada, implica análisis humano para encontrar actividad maliciosa no detectada."
  },
  {
    id: 12,
    term: "Hardening",
    definition: "Proceso de asegurar un sistema reduciendo su superficie de ataque: desactivar servicios innecesarios, aplicar parches, configurar controles de acceso y auditorías de seguridad."
  }
];

// Threat News
export const threatNews = [
  {
    id: 1,
    title: "Nueva campaña de ransomware LockBit 4.0 detectada",
    date: "2025-01-10",
    category: "Ransomware",
    summary: "Se ha identificado una evolución del ransomware LockBit con capacidades mejoradas de evasión y cifrado más rápido. Afecta principalmente a sectores financiero y sanitario.",
    severity: "critical"
  },
  {
    id: 2,
    title: "APT29 utiliza nuevas técnicas de phishing basadas en IA",
    date: "2025-01-08",
    category: "APT",
    summary: "El grupo Cozy Bear está empleando mensajes generados por IA para hacer sus campañas de spear phishing más convincentes y personalizadas.",
    severity: "high"
  },
  {
    id: 3,
    title: "Vulnerabilidad crítica en software empresarial ampliamente usado",
    date: "2025-01-05",
    category: "Vulnerabilidad",
    summary: "CVE-2025-0123: Ejecución remota de código en software de gestión empresarial. Parche disponible. Se recomienda actualización inmediata.",
    severity: "critical"
  },
  {
    id: 4,
    title: "Aumento del 300% en ataques a infraestructura cloud",
    date: "2025-01-03",
    category: "Cloud Security",
    summary: "Los atacantes están explotando configuraciones incorrectas en servicios cloud. Principales vectores: buckets S3 públicos y credenciales expuestas.",
    severity: "high"
  },
  {
    id: 5,
    title: "Lazarus Group vinculado a nuevo malware dirigido a exchanges",
    date: "2024-12-28",
    category: "APT",
    summary: "Nueva campaña de Lazarus apunta a exchanges de criptomonedas con malware sofisticado que evade EDR tradicionales.",
    severity: "high"
  }
];

// Methodology Information
export const methodology = {
  redTeam: {
    title: "Red Team",
    subtitle: "Operaciones Ofensivas",
    description: "Simulamos adversarios reales para identificar vulnerabilidades antes que los atacantes.",
    capabilities: [
      "Pentesting avanzado (Black/Gray/White Box)",
      "Simulación de ataques APT",
      "Social Engineering y Phishing",
      "Análisis de infraestructura externa e interna",
      "Explotación de vulnerabilidades",
      "Post-explotación y movimiento lateral"
    ]
  },
  blueTeam: {
    title: "Blue Team",
    subtitle: "Operaciones Defensivas",
    description: "Defendemos, detectamos y respondemos a amenazas de manera proactiva.",
    capabilities: [
      "Threat Hunting proactivo",
      "Monitoreo 24/7 con SIEM",
      "Desarrollo de reglas de detección",
      "Incident Response y forense digital",
      "Hardening de sistemas y aplicaciones",
      "Análisis de logs y correlación de eventos"
    ]
  },
  purpleTeam: {
    title: "Purple Team",
    subtitle: "Colaboración Ofensiva-Defensiva",
    description: "Unimos lo mejor de ambos mundos para maximizar la resiliencia.",
    benefits: [
      "Mejora continua mediante feedback loops",
      "Validación de controles de seguridad",
      "Capacitación práctica del equipo defensivo",
      "Optimización de detecciones basadas en TTPs reales",
      "80%+ de mejora en tiempo de detección y respuesta",
      "ROI medible en seguridad"
    ]
  }
};

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
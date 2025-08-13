export interface Service {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  category: string;
  pricing: {
    normal: { usd: number; aed: number; };
    urgent: { usd: number; aed: number; };
    emergency: { usd: number; aed: number; };
  };
  duration: {
    normal: string;
    urgent: string;
    emergency: string;
  };
  image: string;
  featured: boolean;
  requirements: string[];
  specifications?: string[];
}

export interface ServiceCategory {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  icon: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'waterproofing',
    name: {
      en: 'Waterproofing Services',
      ar: 'خدمات العزل المائي'
    },
    description: {
      en: 'Professional waterproofing installation and maintenance',
      ar: 'تركيب وصيانة العزل المائي بشكل احترافي'
    },
    icon: 'Droplets'
  },
  {
    id: 'thermal-insulation',
    name: {
      en: 'Thermal Insulation',
      ar: 'العزل الحراري'
    },
    description: {
      en: 'Complete thermal insulation solutions',
      ar: 'حلول العزل الحراري الشاملة'
    },
    icon: 'Thermometer'
  },
  {
    id: 'membrane-installation',
    name: {
      en: 'Membrane Installation',
      ar: 'تركيب الأغشية'
    },
    description: {
      en: 'Expert membrane installation services',
      ar: 'خدمات تركيب الأغشية المتخصصة'
    },
    icon: 'Layers'
  },
  {
    id: 'maintenance',
    name: {
      en: 'Maintenance & Repair',
      ar: 'الصيانة والإصلاح'
    },
    description: {
      en: 'Ongoing maintenance and repair services',
      ar: 'خدمات الصيانة والإصلاح المستمرة'
    },
    icon: 'Wrench'
  }
];

export const services: Service[] = [
  {
    id: 'waterproof-roof-installation',
    name: {
      en: 'Roof Waterproofing Installation',
      ar: 'تركيب عزل الأسطح المائي'
    },
    description: {
      en: 'Complete roof waterproofing installation using premium membranes and coatings',
      ar: 'تركيب عزل مائي شامل للأسطح باستخدام أغشية وطلاءات عالية الجودة'
    },
    category: 'waterproofing',
    pricing: {
      normal: { usd: 15, aed: 55 },
      urgent: { usd: 22, aed: 80 },
      emergency: { usd: 30, aed: 110 }
    },
    duration: {
      normal: '3-5 days',
      urgent: '1-2 days',
      emergency: 'Same day'
    },
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    featured: true,
    requirements: ['Surface preparation', 'Weather conditions check', 'Material delivery'],
    specifications: ['Per sqm', 'Including materials', 'With warranty']
  },
  {
    id: 'basement-waterproofing',
    name: {
      en: 'Basement Waterproofing',
      ar: 'عزل الأقبية المائي'
    },
    description: {
      en: 'Professional basement and foundation waterproofing services',
      ar: 'خدمات عزل الأقبية والأساسات المائي المهنية'
    },
    category: 'waterproofing',
    pricing: {
      normal: { usd: 20, aed: 73 },
      urgent: { usd: 28, aed: 103 },
      emergency: { usd: 35, aed: 128 }
    },
    duration: {
      normal: '5-7 days',
      urgent: '2-3 days',
      emergency: '1-2 days'
    },
    image: 'https://images.pexels.com/photos/6474294/pexels-photo-6474294.jpeg',
    featured: false,
    requirements: ['Excavation access', 'Drainage assessment', 'Structural inspection'],
    specifications: ['Per sqm', 'External & internal', 'Lifetime warranty']
  },
  {
    id: 'bathroom-waterproofing',
    name: {
      en: 'Bathroom Waterproofing',
      ar: 'عزل الحمامات المائي'
    },
    description: {
      en: 'Complete bathroom waterproofing for floors, walls, and wet areas',
      ar: 'عزل مائي شامل للحمامات للأرضيات والجدران والمناطق الرطبة'
    },
    category: 'waterproofing',
    pricing: {
      normal: { usd: 25, aed: 92 },
      urgent: { usd: 35, aed: 128 },
      emergency: { usd: 45, aed: 165 }
    },
    duration: {
      normal: '2-3 days',
      urgent: '1 day',
      emergency: 'Same day'
    },
    image: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg',
    featured: true,
    requirements: ['Room accessibility', 'Plumbing check', 'Tile removal if needed'],
    specifications: ['Per bathroom', 'Floor & walls', '10-year warranty']
  },
  {
    id: 'thermal-insulation-walls',
    name: {
      en: 'Wall Thermal Insulation',
      ar: 'عزل الجدران الحراري'
    },
    description: {
      en: 'Energy-efficient thermal insulation for exterior and interior walls',
      ar: 'عزل حراري موفر للطاقة للجدران الخارجية والداخلية'
    },
    category: 'thermal-insulation',
    pricing: {
      normal: { usd: 12, aed: 44 },
      urgent: { usd: 18, aed: 66 },
      emergency: { usd: 24, aed: 88 }
    },
    duration: {
      normal: '4-6 days',
      urgent: '2-3 days',
      emergency: '1-2 days'
    },
    image: 'https://images.pexels.com/photos/6474313/pexels-photo-6474313.jpeg',
    featured: false,
    requirements: ['Wall assessment', 'Insulation type selection', 'Building permits'],
    specifications: ['Per sqm', 'Multiple thickness options', 'Energy rating certified']
  },
  {
    id: 'roof-thermal-insulation',
    name: {
      en: 'Roof Thermal Insulation',
      ar: 'عزل الأسطح الحراري'
    },
    description: {
      en: 'Advanced roof thermal insulation to reduce energy costs and improve comfort',
      ar: 'عزل حراري متقدم للأسطح لتقليل تكاليف الطاقة وتحسين الراحة'
    },
    category: 'thermal-insulation',
    pricing: {
      normal: { usd: 18, aed: 66 },
      urgent: { usd: 25, aed: 92 },
      emergency: { usd: 32, aed: 117 }
    },
    duration: {
      normal: '3-5 days',
      urgent: '1-2 days',
      emergency: 'Same day'
    },
    image: 'https://images.pexels.com/photos/5691663/pexels-photo-5691663.jpeg',
    featured: true,
    requirements: ['Roof access', 'Weather conditions', 'Structural integrity check'],
    specifications: ['Per sqm', 'Various R-values', 'Fire resistant materials']
  },
  {
    id: 'membrane-installation-torch',
    name: {
      en: 'Torch-On Membrane Installation',
      ar: 'تركيب أغشية اللحام'
    },
    description: {
      en: 'Professional torch-on membrane installation for superior waterproofing',
      ar: 'تركيب أغشية اللحام المهني للعزل المائي المتفوق'
    },
    category: 'membrane-installation',
    pricing: {
      normal: { usd: 22, aed: 80 },
      urgent: { usd: 30, aed: 110 },
      emergency: { usd: 38, aed: 139 }
    },
    duration: {
      normal: '4-6 days',
      urgent: '2-3 days',
      emergency: '1-2 days'
    },
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    featured: false,
    requirements: ['Fire safety clearance', 'Weather conditions', 'Surface preparation'],
    specifications: ['Per sqm', 'Multi-layer system', '15-year warranty']
  },
  {
    id: 'self-adhesive-membrane',
    name: {
      en: 'Self-Adhesive Membrane Installation',
      ar: 'تركيب الأغشية ذاتية اللصق'
    },
    description: {
      en: 'Cold-applied self-adhesive membrane installation for safe and efficient application',
      ar: 'تركيب أغشية ذاتية اللصق بالتطبيق البارد للتطبيق الآمن والفعال'
    },
    category: 'membrane-installation',
    pricing: {
      normal: { usd: 25, aed: 92 },
      urgent: { usd: 33, aed: 121 },
      emergency: { usd: 40, aed: 147 }
    },
    duration: {
      normal: '3-4 days',
      urgent: '1-2 days',
      emergency: 'Same day'
    },
    image: 'https://images.pexels.com/photos/5691661/pexels-photo-5691661.jpeg',
    featured: true,
    requirements: ['Surface cleaning', 'Temperature conditions', 'Primer application'],
    specifications: ['Per sqm', 'No flame required', '12-year warranty']
  },
  {
    id: 'liquid-membrane-application',
    name: {
      en: 'Liquid Membrane Application',
      ar: 'تطبيق الأغشية السائلة'
    },
    description: {
      en: 'Seamless liquid membrane application for complex shapes and detailed areas',
      ar: 'تطبيق أغشية سائلة سلسة للأشكال المعقدة والمناطق المفصلة'
    },
    category: 'membrane-installation',
    pricing: {
      normal: { usd: 28, aed: 103 },
      urgent: { usd: 36, aed: 132 },
      emergency: { usd: 45, aed: 165 }
    },
    duration: {
      normal: '2-3 days',
      urgent: '1 day',
      emergency: 'Same day'
    },
    image: 'https://images.pexels.com/photos/5691662/pexels-photo-5691662.jpeg',
    featured: false,
    requirements: ['Surface preparation', 'Weather conditions', 'Curing time allowance'],
    specifications: ['Per sqm', 'Seamless finish', '10-year warranty']
  },
  {
    id: 'maintenance-inspection',
    name: {
      en: 'Waterproofing Inspection & Maintenance',
      ar: 'فحص وصيانة العزل المائي'
    },
    description: {
      en: 'Comprehensive inspection and maintenance of existing waterproofing systems',
      ar: 'فحص وصيانة شاملة لأنظمة العزل المائي الحالية'
    },
    category: 'maintenance',
    pricing: {
      normal: { usd: 8, aed: 29 },
      urgent: { usd: 12, aed: 44 },
      emergency: { usd: 16, aed: 59 }
    },
    duration: {
      normal: '1-2 days',
      urgent: 'Same day',
      emergency: 'Immediate'
    },
    image: 'https://images.pexels.com/photos/4481331/pexels-photo-4481331.jpeg',
    featured: false,
    requirements: ['Access to areas', 'System documentation', 'Previous installation details'],
    specifications: ['Per visit', 'Detailed report', 'Maintenance plan included']
  },
  {
    id: 'emergency-leak-repair',
    name: {
      en: 'Emergency Leak Repair',
      ar: 'إصلاح التسرب الطارئ'
    },
    description: {
      en: '24/7 emergency leak repair service for immediate water damage prevention',
      ar: 'خدمة إصلاح التسرب الطارئ على مدار 24/7 لمنع أضرار المياه الفورية'
    },
    category: 'maintenance',
    pricing: {
      normal: { usd: 50, aed: 184 },
      urgent: { usd: 75, aed: 275 },
      emergency: { usd: 100, aed: 367 }
    },
    duration: {
      normal: 'Same day',
      urgent: '2-4 hours',
      emergency: '1 hour'
    },
    image: 'https://images.pexels.com/photos/6474295/pexels-photo-6474295.jpeg',
    featured: true,
    requirements: ['Immediate access', 'Emergency contact', 'Temporary shutdown if needed'],
    specifications: ['Emergency call-out', 'Temporary & permanent fix', 'Warranty on repair']
  }
];

export function getAllServices(): Service[] {
  return services;
}

export function getServicesByCategory(categoryId: string): Service[] {
  return services.filter(service => service.category === categoryId);
}

export function getFeaturedServices(): Service[] {
  return services.filter(service => service.featured);
}

export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id);
}

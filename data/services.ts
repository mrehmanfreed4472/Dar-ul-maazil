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
  availability?: 'available' | 'limited' | 'unavailable';
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
    id: 'waterproofing-sealing',
    name: {
      en: 'Waterproofing & Sealing',
      ar: 'العزل المائي والإغلاق'
    },
    description: {
      en: 'Comprehensive waterproofing and sealing solutions including primer application, membrane installation, DPC, protection boards, PVC water-stoppers, waterproof coatings, sealants, concrete repair, and GRP lining',
      ar: 'حلول شاملة للعزل المائي والإغلاق تشمل تطبيق البرايمر وتركيب الأغشية و DPC وألواح الحماية وموان�� المياه PVC والطلاءات المقاومة للماء والمواد المانعة للتسرب وإصلاح الخرسانة وبطانة GRP'
    },
    icon: 'Droplets'
  },
  {
    id: 'insulation-finishing',
    name: {
      en: 'Insulation & Finishing',
      ar: 'العزل والتشطيب'
    },
    description: {
      en: 'Complete insulation and finishing services including geotextiles, thermal insulation, joint fillers, aluminum flashing, and sandwich panel installations',
      ar: 'خدمات العزل والتشطيب الشاملة تشمل الجيوتكستايل والعزل الحراري وحشوات المفاصل والألومنيوم الوامض وتركيب الألواح الساندويتش'
    },
    icon: 'Layers'
  },
  {
    id: 'structural-finishing',
    name: {
      en: 'Structural & Finishing Elements',
      ar: 'العناصر الهيكلية والتشطيب'
    },
    description: {
      en: 'Structural and finishing services including concrete work, grout installation, tile work, and gravel applications',
      ar: 'خدمات العناصر الهيكلية والتشطيب تشمل أعمال الخرسانة وتركيب الجراوت وأعمال البلاط وتطبيقات الحصى'
    },
    icon: 'Building'
  },
  {
    id: 'specialty-support',
    name: {
      en: 'Specialty & Support',
      ar: 'الخدمات المتخصصة والدعم'
    },
    description: {
      en: 'Specialized services including landscaping solutions and professional tools and equipment supply',
      ar: 'خدمات متخصصة تشمل حلول تنسيق الحدائق وتوريد الأدوات والمعدات المهنية'
    },
    icon: 'Settings'
  },
  {
    id: 'specialized-applications',
    name: {
      en: 'Specialized Applications',
      ar: 'التطبيقات المتخصصة'
    },
    description: {
      en: 'Advanced specialized applications including light-weight foam concrete, all kinds of coating work, GRP lining, HDPE lining, and crack injection services',
      ar: 'تطبيقات متخصصة متقدمة تشمل الخرسانة الرغوية خفيفة الوزن وجميع أنواع أعمال الطلاء وبطانة GRP وبطانة HDPE وخدمات حقن الشقوق'
    },
    icon: 'Zap'
  },
  {
    id: 'finishing-general',
    name: {
      en: 'Finishing & General Works',
      ar: 'أعمال التشطيب والأعمال العامة'
    },
    description: {
      en: 'Complete finishing and general construction services including tile work, screed work, paint work, and GI sheet replacement',
      ar: 'خدمات التشطيب والأعمال الإنشائية العامة الشاملة تشمل أعمال البلاط وأعمال الخرسانة المسطحة وأعمال الطلاء واستبدال ألواح GI'
    },
    icon: 'Palette'
  },
  {
    id: 'waterproofing-solutions',
    name: {
      en: 'Waterproofing Solutions',
      ar: 'حلول العزل المائي'
    },
    description: {
      en: 'Comprehensive waterproofing solutions including all kinds of waterproofing, liquid waterproofing, damp proofing, combo roofing systems, and advanced spray applications',
      ar: 'حلول العزل المائي الشاملة تشمل جميع أنواع العزل المائي والعزل المائي السائل وعزل الرطوبة وأنظمة الأسقف المختلطة وتطبيقات الرش المتقدمة'
    },
    icon: 'Shield'
  }
];

export const services: Service[] = [
  // WATERPROOFING & SEALING SERVICES
  {
    id: 'primer-application',
    name: {
      en: 'Primer Application Service',
      ar: 'خدمة تطبيق البرايمر'
    },
    description: {
      en: 'Professional primer application including solvent-based, water-based, and oxidized bitumen primers for optimal surface preparation',
      ar: 'تطبيق برايمر مهني يشمل البرايمر أساسه المذيب وأساسه الماء والبيتومين المؤكسد لتحضير السطح الأمثل'
    },
    category: 'waterproofing-sealing',
    pricing: {
      normal: { usd: 8, aed: 30 },
      urgent: { usd: 12, aed: 44 },
      emergency: { usd: 16, aed: 59 }
    },
    duration: {
      normal: '1-2 days',
      urgent: 'Same day',
      emergency: '2-4 hours'
    },
    image: 'https://images.pexels.com/photos/6474294/pexels-photo-6474294.jpeg',
    featured: true,
    requirements: ['Surface cleaning', 'Weather conditions check', 'Material preparation'],
    specifications: ['Per sqm', 'All primer types', 'Professional application'],
    availability: 'available'
  },
  {
    id: 'membrane-installation',
    name: {
      en: 'Membrane Installation Service',
      ar: 'خدمة تركيب الأغشية'
    },
    description: {
      en: 'Complete membrane installation including SBS, APP, mineral modified, anti-root, aluminum faced, and self-adhesive membranes',
      ar: 'تركيب شامل للأغشية يشمل أغشية SBS وAPP والمعدلة بالمعادن ومضادة الجذور وذات الوجه الألومنيوم والذاتية اللصق'
    },
    category: 'waterproofing-sealing',
    pricing: {
      normal: { usd: 25, aed: 92 },
      urgent: { usd: 35, aed: 129 },
      emergency: { usd: 45, aed: 165 }
    },
    duration: {
      normal: '3-5 days',
      urgent: '1-2 days',
      emergency: 'Same day'
    },
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    featured: true,
    requirements: ['Surface preparation', 'Weather conditions', 'Access equipment'],
    specifications: ['All membrane types', 'Torch-on and self-adhesive', 'Quality guarantee'],
    availability: 'available'
  },
  {
    id: 'dpc-installation',
    name: {
      en: 'Damp Proof Course (DPC) Installation',
      ar: 'تركيب طبقة منع الرطوبة (DPC)'
    },
    description: {
      en: 'Professional DPC installation using Dam Shield products in various thicknesses for foundation and wall protection',
      ar: 'تركيب مهني لطبقة منع الرطوبة باستخدام منتجات دام شيلد بسماكات مختلفة لحماية الأساسات والجدران'
    },
    category: 'waterproofing-sealing',
    pricing: {
      normal: { usd: 15, aed: 55 },
      urgent: { usd: 22, aed: 80 },
      emergency: { usd: 30, aed: 110 }
    },
    duration: {
      normal: '2-3 days',
      urgent: '1 day',
      emergency: 'Same day'
    },
    image: 'https://images.pexels.com/photos/6474294/pexels-photo-6474294.jpeg',
    featured: false,
    requirements: ['Foundation access', 'Excavation if needed', 'Dry conditions'],
    specifications: ['Various thicknesses', 'Self-adhesive options', 'Long-term protection']
  },
  {
    id: 'protection-board-installation',
    name: {
      en: 'Protection Board Installation',
      ar: 'تركيب ألواح الحماية'
    },
    description: {
      en: 'Installation of bituminous and polypropylene protection boards to safeguard waterproofing membranes',
      ar: 'تركيب ألواح الحماية البيتومينية والبولي بروبيلين لحماية أغشية العزل المائي'
    },
    category: 'waterproofing-sealing',
    pricing: {
      normal: { usd: 12, aed: 44 },
      urgent: { usd: 18, aed: 66 },
      emergency: { usd: 24, aed: 88 }
    },
    duration: {
      normal: '1-2 days',
      urgent: 'Same day',
      emergency: '4-6 hours'
    },
    image: 'https://images.pexels.com/photos/3615710/pexels-photo-3615710.jpeg',
    featured: false,
    requirements: ['Membrane installation complete', 'Board cutting tools', 'Proper alignment'],
    specifications: ['Bituminous and PP boards', 'Various thicknesses', 'Professional installation']
  },
  {
    id: 'pvc-waterstop-installation',
    name: {
      en: 'PVC Water-Stopper Installation',
      ar: 'تركيب موانع المياه PVC'
    },
    description: {
      en: 'Professional installation of PVC water-stoppers for construction and expansion joints including hydrophilic profiles',
      ar: 'تركيب مهني لموانع المياه PVC لمفاصل البناء والتمدد بما في ذلك الملفات المحبة للماء'
    },
    category: 'waterproofing-sealing',
    pricing: {
      normal: { usd: 20, aed: 73 },
      urgent: { usd: 28, aed: 103 },
      emergency: { usd: 36, aed: 132 }
    },
    duration: {
      normal: '2-3 days',
      urgent: '1 day',
      emergency: 'Same day'
    },
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    featured: false,
    requirements: ['Joint preparation', 'Proper alignment', 'Concrete pouring coordination'],
    specifications: ['All PVC types', 'Hydrophilic options', 'Joint sealing']
  },
  {
    id: 'waterproof-coating-application',
    name: {
      en: 'Waterproof Coating Application',
      ar: 'تطبيق الطلاءات المقاومة للماء'
    },
    description: {
      en: 'Application of various waterproof coatings including acrylic, polyurethane, crystalline, elastomeric, and epoxy coatings',
      ar: 'تطبيق طلاءات مقاومة للماء متنوعة تشمل الأكريليك والبولي يوريثان والبلورية والمرنة والإيبوكسي'
    },
    category: 'waterproofing-sealing',
    pricing: {
      normal: { usd: 18, aed: 66 },
      urgent: { usd: 25, aed: 92 },
      emergency: { usd: 32, aed: 117 }
    },
    duration: {
      normal: '2-3 days',
      urgent: '1 day',
      emergency: 'Same day'
    },
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    featured: true,
    requirements: ['Surface preparation', 'Weather conditions', 'Curing time'],
    specifications: ['All coating types', 'Machine application available', 'Multiple layers']
  },
  {
    id: 'sealant-application',
    name: {
      en: 'Sealant & Silicon Application',
      ar: 'تطبيق المواد المانعة للتسرب والسيليكون'
    },
    description: {
      en: 'Professional application of polyurethane, polysulphide, acrylic, and fire-rated sealants for joints and gaps',
      ar: 'تطبيق مهني للمواد المانعة للتسرب من البولي يوريثان والبولي سلفيد والأكريليك والمقاومة للحريق ��لمفاصل والفجوات'
    },
    category: 'waterproofing-sealing',
    pricing: {
      normal: { usd: 15, aed: 55 },
      urgent: { usd: 22, aed: 80 },
      emergency: { usd: 30, aed: 110 }
    },
    duration: {
      normal: '1-2 days',
      urgent: 'Same day',
      emergency: '2-4 hours'
    },
    image: 'https://images.pexels.com/photos/5691661/pexels-photo-5691661.jpeg',
    featured: false,
    requirements: ['Joint cleaning', 'Masking tape', 'Weather conditions'],
    specifications: ['All sealant types', 'Interior and exterior', 'Weather sealing']
  },
  {
    id: 'concrete-repair-injection',
    name: {
      en: 'Concrete Repair & Crack Injection',
      ar: 'إصلاح الخرسانة وحقن الشقوق'
    },
    description: {
      en: 'Comprehensive concrete repair and crack injection using polyurethane, acrylic, and epoxy resins',
      ar: 'إصلاح شامل للخرسانة وحقن الشقوق باستخدام راتنجات البولي يوريثان والأكريليك والإيبوكسي'
    },
    category: 'waterproofing-sealing',
    pricing: {
      normal: { usd: 35, aed: 129 },
      urgent: { usd: 45, aed: 165 },
      emergency: { usd: 55, aed: 202 }
    },
    duration: {
      normal: '2-4 days',
      urgent: '1-2 days',
      emergency: 'Same day'
    },
    image: 'https://images.pexels.com/photos/5691662/pexels-photo-5691662.jpeg',
    featured: true,
    requirements: ['Crack assessment', 'Injection equipment', 'Access to affected areas'],
    specifications: ['All injection materials', 'Structural and non-structural', 'Water stopping']
  },
  {
    id: 'grp-lining-installation',
    name: {
      en: 'GRP Lining Installation',
      ar: 'تركيب بطانة الألياف الزجاجية المقواة'
    },
    description: {
      en: 'Complete GRP lining installation using polyester, vinyl ester, and epoxy resins with reinforcement materials',
      ar: 'تركيب شامل لبطانة GRP باستخدام راتنجات البولي إستر والفينيل إستر والإيبوكسي مع مواد التعزيز'
    },
    category: 'waterproofing-sealing',
    pricing: {
      normal: { usd: 45, aed: 165 },
      urgent: { usd: 60, aed: 220 },
      emergency: { usd: 75, aed: 275 }
    },
    duration: {
      normal: '5-7 days',
      urgent: '3-4 days',
      emergency: '2-3 days'
    },
    image: 'https://images.pexels.com/photos/5691663/pexels-photo-5691663.jpeg',
    featured: true,
    requirements: ['Surface preparation', 'Controlled environment', 'Skilled technicians'],
    specifications: ['All resin types', 'Reinforcement materials', 'Chemical resistance']
  },

  // INSULATION & FINISHING SERVICES
  {
    id: 'geotextile-installation',
    name: {
      en: 'Geotextile Installation',
      ar: 'تركيب الجيوتكستايل'
    },
    description: {
      en: 'Installation of woven and non-woven geotextiles, fabrics, and reinforcement mesh for civil engineering applications',
      ar: 'تركيب الجيوتكستايل المنسوج وغير المنسوج والأقمشة وشبكات التعزيز لتطبيقات الهندسة المدنية'
    },
    category: 'insulation-finishing',
    pricing: {
      normal: { usd: 12, aed: 44 },
      urgent: { usd: 18, aed: 66 },
      emergency: { usd: 24, aed: 88 }
    },
    duration: {
      normal: '2-3 days',
      urgent: '1 day',
      emergency: 'Same day'
    },
    image: 'https://images.pexels.com/photos/5691665/pexels-photo-5691665.jpeg',
    featured: false,
    requirements: ['Ground preparation', 'Proper overlap', 'Anchor system'],
    specifications: ['Woven and non-woven', 'Various weights', 'UV resistant']
  },
  {
    id: 'thermal-insulation-installation',
    name: {
      en: 'Thermal Insulation Installation',
      ar: 'تركيب العزل الحراري'
    },
    description: {
      en: 'Complete thermal insulation installation including boards, reflective insulation, and joint fillers for energy efficiency',
      ar: 'تركيب شامل للعزل الحراري يشمل ال��لواح والعزل العاكس وحشوات المفاصل لكفاءة الطاقة'
    },
    category: 'insulation-finishing',
    pricing: {
      normal: { usd: 20, aed: 73 },
      urgent: { usd: 28, aed: 103 },
      emergency: { usd: 36, aed: 132 }
    },
    duration: {
      normal: '3-5 days',
      urgent: '2-3 days',
      emergency: '1-2 days'
    },
    image: 'https://images.pexels.com/photos/5691666/pexels-photo-5691666.jpeg',
    featured: true,
    requirements: ['Structure assessment', 'Insulation calculation', 'Vapor barrier'],
    specifications: ['High R-values', 'Fire resistant', 'Multiple types']
  },
  {
    id: 'aluminum-flashing-installation',
    name: {
      en: 'Aluminum Flashing Installation',
      ar: 'تركيب الألومنيوم الوامض'
    },
    description: {
      en: 'Professional aluminum flashing installation for waterproofing details and edge protection',
      ar: 'تركيب مهني للألومنيوم الوامض لتفاصيل العزل المائي وحماية الحواف'
    },
    category: 'insulation-finishing',
    pricing: {
      normal: { usd: 18, aed: 66 },
      urgent: { usd: 25, aed: 92 },
      emergency: { usd: 32, aed: 117 }
    },
    duration: {
      normal: '1-2 days',
      urgent: 'Same day',
      emergency: '4-6 hours'
    },
    image: 'https://images.pexels.com/photos/5691667/pexels-photo-5691667.jpeg',
    featured: false,
    requirements: ['Precise measurements', 'Cutting tools', 'Sealant application'],
    specifications: ['Corrosion resistant', 'Custom fabrication', 'Weather sealing']
  },
  {
    id: 'sandwich-panel-installation',
    name: {
      en: 'Sandwich Panel Installation',
      ar: 'تركيب الألواح الساندويتش'
    },
    description: {
      en: 'Installation of insulated sandwich panels, GI sheets, and skylight systems for roofing and cladding',
      ar: 'تركيب الألواح الساندويتش المعزولة وألواح GI وأنظمة إضاءة السقف للأسقف والكسوة'
    },
    category: 'insulation-finishing',
    pricing: {
      normal: { usd: 35, aed: 129 },
      urgent: { usd: 45, aed: 165 },
      emergency: { usd: 55, aed: 202 }
    },
    duration: {
      normal: '4-6 days',
      urgent: '2-3 days',
      emergency: '1-2 days'
    },
    image: 'https://images.pexels.com/photos/5691668/pexels-photo-5691668.jpeg',
    featured: true,
    requirements: ['Structural support', 'Lifting equipment', 'Weather conditions'],
    specifications: ['Various core materials', 'Insulated panels', 'Skylight integration']
  },

  // STRUCTURAL & FINISHING ELEMENTS SERVICES
  {
    id: 'concrete-grout-work',
    name: {
      en: 'Concrete & Grout Work',
      ar: 'أعمال الخرسانة والجراوت'
    },
    description: {
      en: 'Specialized concrete and grout work including high-performance mixes and injection grouts for structural applications',
      ar: 'أعمال خرسانة وجراوت متخصصة تشمل خلطات عالية الأداء وجراوت الحقن للتطبيقات الهيكلية'
    },
    category: 'structural-finishing',
    pricing: {
      normal: { usd: 40, aed: 147 },
      urgent: { usd: 55, aed: 202 },
      emergency: { usd: 70, aed: 257 }
    },
    duration: {
      normal: '3-5 days',
      urgent: '2-3 days',
      emergency: '1-2 days'
    },
    image: 'https://images.pexels.com/photos/5691669/pexels-photo-5691669.jpeg',
    featured: true,
    requirements: ['Structural design', 'Quality materials', 'Curing conditions'],
    specifications: ['High strength', 'Rapid setting', 'Non-shrink grouts']
  },
  {
    id: 'tile-installation',
    name: {
      en: 'Professional Tile Installation',
      ar: 'تركيب البلاط المهني'
    },
    description: {
      en: 'Complete tile installation service including adhesive application, tile laying, and grouting for all surfaces',
      ar: 'خدمة تركيب بلاط شاملة تشمل تطبيق اللاصق ووضع البلاط والجراوت لجميع الأسطح'
    },
    category: 'structural-finishing',
    pricing: {
      normal: { usd: 25, aed: 92 },
      urgent: { usd: 35, aed: 129 },
      emergency: { usd: 45, aed: 165 }
    },
    duration: {
      normal: '3-5 days',
      urgent: '2-3 days',
      emergency: '1-2 days'
    },
    image: 'https://images.pexels.com/photos/5691670/pexels-photo-5691670.jpeg',
    featured: false,
    requirements: ['Surface preparation', 'Tile selection', 'Pattern layout'],
    specifications: ['All tile types', 'Waterproof adhesive', 'Stain resistant grout']
  },
  {
    id: 'gravel-installation',
    name: {
      en: 'Gravel Installation & Application',
      ar: 'تركيب وتطبيق الحصى'
    },
    description: {
      en: 'Professional gravel installation for drainage, landscaping, and decorative applications',
      ar: 'تركيب مهني للحصى للصرف وتنسيق الحدائق والتطبيقات الزخرفية'
    },
    category: 'structural-finishing',
    pricing: {
      normal: { usd: 15, aed: 55 },
      urgent: { usd: 22, aed: 80 },
      emergency: { usd: 30, aed: 110 }
    },
    duration: {
      normal: '1-2 days',
      urgent: 'Same day',
      emergency: '4-6 hours'
    },
    image: 'https://images.pexels.com/photos/5691671/pexels-photo-5691671.jpeg',
    featured: false,
    requirements: ['Site preparation', 'Gravel selection', 'Compaction equipment'],
    specifications: ['Drainage and decorative', 'Various sizes', 'Proper grading']
  },

  // SPECIALTY & SUPPORT SERVICES
  {
    id: 'landscaping-solutions',
    name: {
      en: 'Landscaping Solutions',
      ar: 'حلول تنسيق الحدائق'
    },
    description: {
      en: 'Complete landscaping solutions including landscape fabric, drainage systems, and garden materials installation',
      ar: 'حلول تنسيق حدائق شاملة تشمل قماش تنسيق الحدائق وأنظمة الصرف وتركيب مواد الحدائق'
    },
    category: 'specialty-support',
    pricing: {
      normal: { usd: 30, aed: 110 },
      urgent: { usd: 40, aed: 147 },
      emergency: { usd: 50, aed: 184 }
    },
    duration: {
      normal: '5-7 days',
      urgent: '3-4 days',
      emergency: '2-3 days'
    },
    image: 'https://images.pexels.com/photos/5691672/pexels-photo-5691672.jpeg',
    featured: false,
    requirements: ['Site survey', 'Design approval', 'Irrigation planning'],
    specifications: ['Complete solutions', 'Drainage integration', 'Maintenance included']
  },
  {
    id: 'tools-equipment-supply',
    name: {
      en: 'Tools & Equipment Supply',
      ar: 'توريد الأدوات والمعدات'
    },
    description: {
      en: 'Professional tools and equipment supply including application tools, safety equipment, and measuring instruments',
      ar: 'توريد أدوات ومعدات مهنية تشمل أدوات التطبيق ومعدات السلامة وأدوات القياس'
    },
    category: 'specialty-support',
    pricing: {
      normal: { usd: 25, aed: 92 },
      urgent: { usd: 35, aed: 129 },
      emergency: { usd: 45, aed: 165 }
    },
    duration: {
      normal: '1-2 days',
      urgent: 'Same day',
      emergency: '2-4 hours'
    },
    image: 'https://images.pexels.com/photos/5691673/pexels-photo-5691673.jpeg',
    featured: false,
    requirements: ['Equipment list', 'Delivery coordination', 'Training if needed'],
    specifications: ['Professional grade', 'Complete sets', 'Quality guaranteed']
  },

  // SPECIALIZED APPLICATIONS SERVICES
  {
    id: 'lightweight-foam-concrete',
    name: {
      en: 'Light-Weight Foam Concrete',
      ar: 'الخرسانة الرغوية خفيفة الوزن'
    },
    description: {
      en: 'Specialized light-weight foam concrete application for thermal insulation and structural lightweight applications',
      ar: 'تطبيق متخصص للخرسانة الرغوية خفيفة الوزن للعزل الحراري والتطبيقات الهيكلية خفيفة الوزن'
    },
    category: 'specialized-applications',
    pricing: {
      normal: { usd: 50, aed: 184 },
      urgent: { usd: 65, aed: 239 },
      emergency: { usd: 80, aed: 294 }
    },
    duration: {
      normal: '3-5 days',
      urgent: '2-3 days',
      emergency: '1-2 days'
    },
    image: 'https://images.pexels.com/photos/6474295/pexels-photo-6474295.jpeg',
    featured: true,
    requirements: ['Specialized equipment', 'Mix design', 'Quality control'],
    specifications: ['Lightweight', 'Thermal insulation', 'Custom densities']
  },
  {
    id: 'coating-work-all-kinds',
    name: {
      en: 'Coating Work (All Kinds)',
      ar: 'أعمال الطلاء (جميع الأنواع)'
    },
    description: {
      en: 'Comprehensive coating work including all types of protective, decorative, and specialized coatings',
      ar: 'أعمال طلاء شاملة تشمل جميع أنواع الطلاءات الواقية والزخرفية والمتخصصة'
    },
    category: 'specialized-applications',
    pricing: {
      normal: { usd: 28, aed: 103 },
      urgent: { usd: 38, aed: 139 },
      emergency: { usd: 48, aed: 176 }
    },
    duration: {
      normal: '2-4 days',
      urgent: '1-2 days',
      emergency: 'Same day'
    },
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    featured: true,
    requirements: ['Surface preparation', 'Weather conditions', 'Coating selection'],
    specifications: ['All coating types', 'Professional application', 'Quality finish']
  },
  {
    id: 'hdpe-lining',
    name: {
      en: 'HDPE Lining Installation',
      ar: 'تركيب بطانة HDPE'
    },
    description: {
      en: 'Professional HDPE lining installation for containment applications and chemical resistance',
      ar: 'تركيب مهني لبطانة HDPE لتطبيقات الاحتواء ومقاومة المواد الكيميائية'
    },
    category: 'specialized-applications',
    pricing: {
      normal: { usd: 40, aed: 147 },
      urgent: { usd: 55, aed: 202 },
      emergency: { usd: 70, aed: 257 }
    },
    duration: {
      normal: '4-6 days',
      urgent: '2-3 days',
      emergency: '1-2 days'
    },
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    featured: false,
    requirements: ['Site preparation', 'Welding equipment', 'Quality testing'],
    specifications: ['Various thicknesses', 'Chemical resistant', 'Welded seams']
  },
  {
    id: 'crack-injection-specialized',
    name: {
      en: 'PU/Acrylic/Epoxy Crack Injection',
      ar: 'حقن الشقوق بـ PU/الأكريليك/الإيبوكسي'
    },
    description: {
      en: 'Specialized crack injection using polyurethane, acrylic, and epoxy materials for structural and waterproofing applications',
      ar: 'حقن متخصص للشقوق باستخدام مواد البولي يوريثان والأكريليك والإيبوكسي للتطبيقات الهيكلية والعزل المائي'
    },
    category: 'specialized-applications',
    pricing: {
      normal: { usd: 45, aed: 165 },
      urgent: { usd: 60, aed: 220 },
      emergency: { usd: 75, aed: 275 }
    },
    duration: {
      normal: '2-3 days',
      urgent: '1 day',
      emergency: 'Same day'
    },
    image: 'https://images.pexels.com/photos/5691662/pexels-photo-5691662.jpeg',
    featured: true,
    requirements: ['Crack assessment', 'Injection equipment', 'Material selection'],
    specifications: ['All injection types', 'Structural repair', 'Water stopping']
  },

  // FINISHING & GENERAL WORKS SERVICES
  {
    id: 'tile-work-complete',
    name: {
      en: 'Complete Tile Work',
      ar: 'أعمال البلاط الشاملة'
    },
    description: {
      en: 'Complete tile work including surface preparation, waterproofing, adhesive application, tile installation, and grouting',
      ar: 'أعمال بلاط شاملة تشمل تحضير السطح والعزل المائي وتطبيق اللاصق وتركيب البلاط والجراوت'
    },
    category: 'finishing-general',
    pricing: {
      normal: { usd: 30, aed: 110 },
      urgent: { usd: 40, aed: 147 },
      emergency: { usd: 50, aed: 184 }
    },
    duration: {
      normal: '4-6 days',
      urgent: '2-3 days',
      emergency: '1-2 days'
    },
    image: 'https://images.pexels.com/photos/5691670/pexels-photo-5691670.jpeg',
    featured: false,
    requirements: ['Material selection', 'Pattern design', 'Quality tiles'],
    specifications: ['Complete service', 'Waterproof installation', 'Quality guarantee']
  },
  {
    id: 'screed-work',
    name: {
      en: 'Screed Work',
      ar: 'أعمال الخرسانة المسطحة'
    },
    description: {
      en: 'Professional screed work for floor leveling and surface preparation before final finishes',
      ar: 'أعمال خرسانة مسطحة مهنية لتسوية الأرضيات وتحضير السطح قبل التشطيبات النهائية'
    },
    category: 'finishing-general',
    pricing: {
      normal: { usd: 20, aed: 73 },
      urgent: { usd: 28, aed: 103 },
      emergency: { usd: 36, aed: 132 }
    },
    duration: {
      normal: '2-3 days',
      urgent: '1 day',
      emergency: 'Same day'
    },
    image: 'https://images.pexels.com/photos/5691669/pexels-photo-5691669.jpeg',
    featured: false,
    requirements: ['Level checking', 'Surface preparation', 'Curing time'],
    specifications: ['Self-leveling', 'High strength', 'Smooth finish']
  },
  {
    id: 'paint-work',
    name: {
      en: 'Professional Paint Work',
      ar: 'أعمال الطلاء المهنية'
    },
    description: {
      en: 'Complete paint work including surface preparation, primer application, and finish coating for interior and exterior',
      ar: 'أعمال طلاء شاملة تشمل تحضير السطح وتطبيق البرايمر والطلاء النهائي للداخل والخارج'
    },
    category: 'finishing-general',
    pricing: {
      normal: { usd: 15, aed: 55 },
      urgent: { usd: 22, aed: 80 },
      emergency: { usd: 30, aed: 110 }
    },
    duration: {
      normal: '3-4 days',
      urgent: '2 days',
      emergency: '1 day'
    },
    image: 'https://images.pexels.com/photos/6474295/pexels-photo-6474295.jpeg',
    featured: false,
    requirements: ['Surface cleaning', 'Weather conditions', 'Color selection'],
    specifications: ['Interior and exterior', 'Quality paints', 'Professional finish']
  },
  {
    id: 'gi-sheet-replacement',
    name: {
      en: 'GI Sheet Replacement Works',
      ar: 'أعمال استبدال ألواح GI'
    },
    description: {
      en: 'Complete GI sheet replacement including removal of old sheets, structural check, and new installation',
      ar: 'استبدال شامل لألواح GI يشمل إزالة الألواح القديمة وفحص الهيكل والتركيب الجديد'
    },
    category: 'finishing-general',
    pricing: {
      normal: { usd: 35, aed: 129 },
      urgent: { usd: 45, aed: 165 },
      emergency: { usd: 55, aed: 202 }
    },
    duration: {
      normal: '3-5 days',
      urgent: '2-3 days',
      emergency: '1-2 days'
    },
    image: 'https://images.pexels.com/photos/5691668/pexels-photo-5691668.jpeg',
    featured: false,
    requirements: ['Structural assessment', 'Safety measures', 'Weather protection'],
    specifications: ['Complete replacement', 'Structural check', 'Quality materials']
  },

  // WATERPROOFING SOLUTIONS SERVICES
  {
    id: 'all-kinds-waterproofing',
    name: {
      en: 'All Kinds of Waterproofing',
      ar: 'جميع أنواع العزل المائي'
    },
    description: {
      en: 'Comprehensive waterproofing solutions for all applications including roofs, basements, foundations, and structures',
      ar: 'حلول عزل مائي شاملة لجميع التطبيقات تشمل الأسطح والأقبية والأساسات والهياكل'
    },
    category: 'waterproofing-solutions',
    pricing: {
      normal: { usd: 35, aed: 129 },
      urgent: { usd: 45, aed: 165 },
      emergency: { usd: 55, aed: 202 }
    },
    duration: {
      normal: '4-7 days',
      urgent: '2-4 days',
      emergency: '1-2 days'
    },
    image: 'https://images.pexels.com/photos/6474294/pexels-photo-6474294.jpeg',
    featured: true,
    requirements: ['Site assessment', 'System selection', 'Quality materials'],
    specifications: ['All waterproofing types', 'Complete solutions', 'Long-term warranty']
  },
  {
    id: 'liquid-waterproofing',
    name: {
      en: 'Liquid Waterproofing',
      ar: 'العزل المائي السائل'
    },
    description: {
      en: 'Advanced liquid waterproofing systems for seamless protection and complex geometries',
      ar: 'أنظمة عزل مائي سائل متقدمة للحماية السلسة والأشكال الهندسية المعقدة'
    },
    category: 'waterproofing-solutions',
    pricing: {
      normal: { usd: 30, aed: 110 },
      urgent: { usd: 40, aed: 147 },
      emergency: { usd: 50, aed: 184 }
    },
    duration: {
      normal: '2-4 days',
      urgent: '1-2 days',
      emergency: 'Same day'
    },
    image: 'https://images.pexels.com/photos/5691662/pexels-photo-5691662.jpeg',
    featured: true,
    requirements: ['Surface preparation', 'Weather conditions', 'Curing environment'],
    specifications: ['Seamless application', 'Complex shapes', 'High performance']
  },
  {
    id: 'damp-proofing',
    name: {
      en: 'Damp Proofing',
      ar: 'عزل الرطوبة'
    },
    description: {
      en: 'Complete damp proofing solutions for walls, foundations, and basements to prevent moisture ingress',
      ar: 'حلول عزل رطوبة شاملة للجدران والأساسات والأقبية لمنع تسرب الرطوبة'
    },
    category: 'waterproofing-solutions',
    pricing: {
      normal: { usd: 25, aed: 92 },
      urgent: { usd: 35, aed: 129 },
      emergency: { usd: 45, aed: 165 }
    },
    duration: {
      normal: '3-5 days',
      urgent: '2-3 days',
      emergency: '1-2 days'
    },
    image: 'https://images.pexels.com/photos/6474294/pexels-photo-6474294.jpeg',
    featured: false,
    requirements: ['Moisture assessment', 'Ventilation check', 'Proper materials'],
    specifications: ['Moisture control', 'Breathable systems', 'Long-lasting protection']
  },
  {
    id: 'combo-roofing-system',
    name: {
      en: 'Combo Roofing System',
      ar: 'نظام الأسقف المختلط'
    },
    description: {
      en: 'Integrated combo roofing systems combining multiple waterproofing and insulation technologies',
      ar: 'أنظمة أسقف مختلطة متكاملة تجمع بين تقنيات العزل المائي والحراري المتعددة'
    },
    category: 'waterproofing-solutions',
    pricing: {
      normal: { usd: 55, aed: 202 },
      urgent: { usd: 70, aed: 257 },
      emergency: { usd: 85, aed: 312 }
    },
    duration: {
      normal: '5-8 days',
      urgent: '3-5 days',
      emergency: '2-3 days'
    },
    image: 'https://images.pexels.com/photos/5691668/pexels-photo-5691668.jpeg',
    featured: true,
    requirements: ['System design', 'Multiple materials', 'Skilled installation'],
    specifications: ['Multi-layer system', 'Enhanced performance', 'Complete solution']
  },
  {
    id: 'polyurethane-spray',
    name: {
      en: 'Polyurethane (PU) Spray',
      ar: 'رش البولي يوريثان (PU)'
    },
    description: {
      en: 'Professional polyurethane spray application for seamless waterproofing and insulation',
      ar: 'تطبيق رش البولي يوريثان المهني للعزل المائي والحراري السلس'
    },
    category: 'waterproofing-solutions',
    pricing: {
      normal: { usd: 45, aed: 165 },
      urgent: { usd: 60, aed: 220 },
      emergency: { usd: 75, aed: 275 }
    },
    duration: {
      normal: '2-3 days',
      urgent: '1-2 days',
      emergency: 'Same day'
    },
    image: 'https://images.pexels.com/photos/5691662/pexels-photo-5691662.jpeg',
    featured: true,
    requirements: ['Spray equipment', 'Controlled environment', 'Safety measures'],
    specifications: ['Seamless application', 'Rapid curing', 'High performance']
  },
  {
    id: 'polyurea-spray',
    name: {
      en: 'Polyurea Spray',
      ar: 'رش البولي يوريا'
    },
    description: {
      en: 'Advanced polyurea spray systems for rapid curing and extreme durability applications',
      ar: 'أنظمة رش البولي يوريا المتقدمة للمعالجة السريعة وتطبيقات المتانة القصوى'
    },
    category: 'waterproofing-solutions',
    pricing: {
      normal: { usd: 55, aed: 202 },
      urgent: { usd: 70, aed: 257 },
      emergency: { usd: 85, aed: 312 }
    },
    duration: {
      normal: '1-2 days',
      urgent: '1 day',
      emergency: 'Same day'
    },
    image: 'https://images.pexels.com/photos/5691662/pexels-photo-5691662.jpeg',
    featured: true,
    requirements: ['Specialized equipment', 'Trained applicators', 'Quality control'],
    specifications: ['Rapid cure', 'Extreme durability', 'Chemical resistant']
  },
  {
    id: 'self-adhesive-membrane-system',
    name: {
      en: 'Self-Adhesive Membrane System',
      ar: 'نظام الغشاء ذاتي اللصق'
    },
    description: {
      en: 'Complete self-adhesive membrane systems for safe and efficient waterproofing installation',
      ar: 'أنظمة أغشية ذاتية اللصق شاملة للتركيب الآمن والفعال للعزل المائي'
    },
    category: 'waterproofing-solutions',
    pricing: {
      normal: { usd: 40, aed: 147 },
      urgent: { usd: 50, aed: 184 },
      emergency: { usd: 60, aed: 220 }
    },
    duration: {
      normal: '3-5 days',
      urgent: '2-3 days',
      emergency: '1-2 days'
    },
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    featured: false,
    requirements: ['Surface preparation', 'Temperature control', 'Proper overlap'],
    specifications: ['No flame required', 'Easy installation', 'Consistent quality']
  },
  {
    id: 'sandwich-panel-roof-waterproofing',
    name: {
      en: 'Sandwich Panel Roof Waterproofing',
      ar: 'عزل أسطح الألواح الساندويتش المائي'
    },
    description: {
      en: 'Specialized waterproofing solutions for sandwich panel roofing systems',
      ar: 'حلول عزل مائي متخصصة لأنظمة أسقف الألواح الساندويتش'
    },
    category: 'waterproofing-solutions',
    pricing: {
      normal: { usd: 35, aed: 129 },
      urgent: { usd: 45, aed: 165 },
      emergency: { usd: 55, aed: 202 }
    },
    duration: {
      normal: '3-5 days',
      urgent: '2-3 days',
      emergency: '1-2 days'
    },
    image: 'https://images.pexels.com/photos/5691668/pexels-photo-5691668.jpeg',
    featured: false,
    requirements: ['Panel inspection', 'Joint sealing', 'Weather protection'],
    specifications: ['Panel-specific solutions', 'Joint waterproofing', 'Thermal considerations']
  },
  {
    id: 'epdm-membrane-installation',
    name: {
      en: 'EPDM Membrane Installation',
      ar: 'تركيب غشاء EPDM'
    },
    description: {
      en: 'Professional EPDM membrane installation for superior durability and weather resistance',
      ar: 'تركيب مهني لغشاء EPDM لمتانة فائقة ومقاومة الطقس'
    },
    category: 'waterproofing-solutions',
    pricing: {
      normal: { usd: 42, aed: 154 },
      urgent: { usd: 55, aed: 202 },
      emergency: { usd: 68, aed: 250 }
    },
    duration: {
      normal: '3-5 days',
      urgent: '2-3 days',
      emergency: '1-2 days'
    },
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    featured: true,
    requirements: ['Surface preparation', 'Adhesive application', 'Seam welding'],
    specifications: ['Superior durability', 'Weather resistant', 'Long-term performance']
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

export function getServiceCategories(): ServiceCategory[] {
  return serviceCategories;
}

export function getCategoryById(id: string): ServiceCategory | undefined {
  return serviceCategories.find(category => category.id === id);
}

export function searchServices(query: string): Service[] {
  const lowercaseQuery = query.toLowerCase();
  return services.filter(service => 
    service.name.en.toLowerCase().includes(lowercaseQuery) ||
    service.name.ar.includes(lowercaseQuery) ||
    service.description.en.toLowerCase().includes(lowercaseQuery) ||
    service.description.ar.includes(lowercaseQuery) ||
    service.specifications?.some(spec => spec.toLowerCase().includes(lowercaseQuery))
  );
}

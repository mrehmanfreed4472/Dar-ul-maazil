export interface SubProduct {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  pricing: {
    usd: number;
    aed: number;
  };
  specifications: string[];
  sizes: string[];
  image: string;
  availability: 'in_stock' | 'out_of_stock' | 'limited' | 'low_stock';
}

export interface MainProduct {
  id: string;
  category: string;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  overview: {
    en: string;
    ar: string;
  };
  icon: string;
  image: string;
  featured: boolean;
  subProducts: SubProduct[];
  applications: {
    en: string[];
    ar: string[];
  };
  features: {
    en: string[];
    ar: string[];
  };
}

export const hierarchicalProducts: MainProduct[] = [
  // PRIMERS
  {
    id: 'dam-prime-series',
    category: 'primers',
    name: { 
      en: 'DAM Prime Series', 
      ar: 'سلسلة دام برايم' 
    },
    description: {
      en: 'Professional bitumen primers for surface preparation and adhesion enhancement',
      ar: 'برايمر بيتومين مهني لتحضير السطح وتعزيز الالتصاق'
    },
    overview: {
      en: 'Our premium primer series offers comprehensive solutions for surface preparation across all waterproofing applications. Each variant is engineered for specific conditions and requirements.',
      ar: 'توفر سلسلة البرايمر الممتازة حلولاً شاملة لتحضير السطح عبر جميع تطبيقات العزل المائي. كل نوع مصمم للظر��ف والمتطلبات المحددة.'
    },
    icon: '🎨',
    image: 'https://images.pexels.com/photos/6474294/pexels-photo-6474294.jpeg',
    featured: true,
    applications: {
      en: ['Concrete surfaces', 'Metal substrates', 'Masonry walls', 'Roof preparations'],
      ar: ['الأسطح الخرسانية', 'الركائز المعدنية', 'الجدران الحجرية', 'تحضير الأسطح']
    },
    features: {
      en: ['Superior penetration', 'Fast drying', 'Excellent adhesion', 'Weather resistant'],
      ar: ['اختراق فائق', 'جفاف سريع', 'التصاق ممتاز', 'مقاوم للطقس']
    },
    subProducts: [
      {
        id: 'dam-prime-sb',
        name: { en: 'Dam Prime SB', ar: 'دام برايم SB' },
        description: {
          en: 'Solvent Based Bitumen Primer for excellent surface preparation',
          ar: 'برايمر بيتومين أساسه المذيب لتحضير ممتاز للسطح'
        },
        pricing: { usd: 45, aed: 165 },
        specifications: ['Solvent based', 'Fast drying', 'Excellent penetration', 'Ready to use'],
        sizes: ['20 Ltr', '200 Ltr'],
        image: 'https://images.pexels.com/photos/6474294/pexels-photo-6474294.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-prime-wb',
        name: { en: 'Dam Prime WB', ar: 'دام برايم WB' },
        description: {
          en: 'Water Based Bitumen Primer for eco-friendly applications',
          ar: 'برايمر بيتومين أساسه الماء للتطبيقات الصديقة للبيئة'
        },
        pricing: { usd: 40, aed: 147 },
        specifications: ['Water based', 'Eco-friendly', 'Low VOC', 'Non-toxic'],
        sizes: ['20 Ltr', '200 Ltr'],
        image: 'https://images.pexels.com/photos/6474294/pexels-photo-6474294.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-prime-oxidized',
        name: { en: 'Dam Prime Oxidized', ar: 'دام برايم المؤكسد' },
        description: {
          en: 'Hot Bitumen Primer for high-temperature applications',
          ar: 'برايمر بيتومين ساخن للتطبيقات عالية الحرارة'
        },
        pricing: { usd: 50, aed: 184 },
        specifications: ['Hot application', 'High temperature resistant', 'Superior adhesion', 'Professional grade'],
        sizes: ['20Kg', '200 Kg'],
        image: 'https://images.pexels.com/photos/6474294/pexels-photo-6474294.jpeg',
        availability: 'in_stock'
      }
    ]
  },

  // MEMBRANES - Dam Plus S Series
  {
    id: 'dam-plus-s-series',
    category: 'membranes',
    name: { 
      en: 'DAM Plus S Series', 
      ar: 'سلسلة دام بلس S' 
    },
    description: {
      en: 'Standard bituminous membranes with reinforced polyester carrier',
      ar: 'أغشية بيتومينية قياسية مع حامل بوليستر مقوى'
    },
    overview: {
      en: 'The DAM Plus S series represents our standard line of bituminous membranes, featuring reinforced polyester carriers for enhanced tensile strength and dimensional stability. Perfect for general waterproofing applications.',
      ar: 'تمثل سلسلة دام بلس S خطنا القياسي من الأغشية البيتومينية، مع حاملات بوليستر مقواة لتعزيز قوة الشد والاستقرار الأبعادي. مثالية لتطبيقات العزل المائي العامة.'
    },
    icon: '🛡️',
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    featured: true,
    applications: {
      en: ['Roof waterproofing', 'Foundation protection', 'Basement waterproofing', 'Terrace applications'],
      ar: ['عزل الأسطح المائي', 'حماية الأساسات', 'عزل القبو المائي', 'تطبيقات التراس']
    },
    features: {
      en: ['Reinforced carrier', 'High flexibility', 'Temperature resistance', 'Easy installation'],
      ar: ['حامل مقوى', 'مرونة عالية', 'مقاومة الحرارة', '��ركيب سهل']
    },
    subProducts: [
      {
        id: 'dam-plus-s-4180',
        name: { en: 'Dam Plus S 4180', ar: 'دام بلس S 4180' },
        description: {
          en: 'Standard grade bituminous membrane - 4mm thickness',
          ar: 'غشاء بيتوميني درجة قياسية - سماكة 4 مم'
        },
        pricing: { usd: 180, aed: 661 },
        specifications: ['Thickness: 4mm', 'GSM: 180', 'Polyester reinforced', 'Torch applied'],
        sizes: ['1m X 10m', '23 Roll/Pallet'],
        image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-plus-s-4200',
        name: { en: 'Dam Plus S 4200', ar: 'دام بلس S 4200' },
        description: {
          en: 'Enhanced grade bituminous membrane - 4mm thickness',
          ar: 'غشاء بيتوميني درجة محسنة - سماكة 4 مم'
        },
        pricing: { usd: 190, aed: 698 },
        specifications: ['Thickness: 4mm', 'GSM: 200', 'Enhanced durability', 'Superior flexibility'],
        sizes: ['1m X 10m', '23 Roll/Pallet'],
        image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-plus-s-4250',
        name: { en: 'Dam Plus S 4250', ar: 'دام بلس S 4250' },
        description: {
          en: 'Premium grade bituminous membrane - 4mm thickness',
          ar: 'غشاء بيتوميني درجة ممتازة - سماكة 4 مم'
        },
        pricing: { usd: 200, aed: 735 },
        specifications: ['Thickness: 4mm', 'GSM: 250', 'Premium quality', 'Maximum strength'],
        sizes: ['1m X 10m', '23 Roll/Pallet'],
        image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-plus-s-5180',
        name: { en: 'Dam Plus S 5180', ar: 'دام بلس S 5180' },
        description: {
          en: 'Heavy-duty bituminous membrane - 5mm thickness',
          ar: 'غشاء بيتوميني للخدمة الشاقة - سماكة 5 مم'
        },
        pricing: { usd: 220, aed: 808 },
        specifications: ['Thickness: 5mm', 'GSM: 180', 'Heavy duty', 'Extended life'],
        sizes: ['1m X 10m', '23 Roll/Pallet'],
        image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-plus-s-5200',
        name: { en: 'Dam Plus S 5200', ar: 'دام بلس S 5200' },
        description: {
          en: 'Heavy-duty enhanced bituminous membrane - 5mm thickness',
          ar: 'غشاء بيتوميني محسن للخدمة الشاقة - سماكة 5 مم'
        },
        pricing: { usd: 230, aed: 845 },
        specifications: ['Thickness: 5mm', 'GSM: 200', 'Enhanced strength', 'Superior performance'],
        sizes: ['1m X 10m', '23 Roll/Pallet'],
        image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-plus-s-5250',
        name: { en: 'Dam Plus S 5250', ar: 'دام بلس S 5250' },
        description: {
          en: 'Premium heavy-duty bituminous membrane - 5mm thickness',
          ar: 'غشاء بيتوميني ممتاز للخدمة الشاقة - سماكة 5 مم'
        },
        pricing: { usd: 240, aed: 882 },
        specifications: ['Thickness: 5mm', 'GSM: 250', 'Premium heavy duty', 'Ultimate protection'],
        sizes: ['1m X 10m', '23 Roll/Pallet'],
        image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
        availability: 'in_stock'
      }
    ]
  },

  // DAM PLUS APP SERIES
  {
    id: 'dam-plus-app-series',
    category: 'membranes',
    name: { 
      en: 'DAM Plus APP Series', 
      ar: 'سلسلة دام بلس APP' 
    },
    description: {
      en: 'APP Modified bituminous membranes for enhanced heat resistance',
      ar: 'أغشية بيتومينية معدلة APP لمقاومة حرارة محسنة'
    },
    overview: {
      en: 'The DAM Plus APP series features Atactic Polypropylene modified bitumen for superior heat resistance and UV stability. Ideal for exposed applications and high-temperature environments.',
      ar: 'تتميز سلسلة دام بلس APP ببيتومين معدل بالبولي بروبيلين اللامتماثل لمقاومة حرارة فائقة واستقرار الأشعة فوق البنفسجية. مثالية للتطبيقات المكشوفة والبيئات عالية الحرارة.'
    },
    icon: '🔥',
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    featured: true,
    applications: {
      en: ['Exposed roof systems', 'High temperature areas', 'UV exposed surfaces', 'Industrial roofing'],
      ar: ['أنظمة الأسطح المكشوفة', 'المناطق عالية الحرارة', 'الأسطح المعرضة للأشعة فوق البنفسجية', 'الأسطح الصناعية']
    },
    features: {
      en: ['APP modification', 'Heat resistance', 'UV stability', 'Long-term durability'],
      ar: ['تعديل APP', 'مقاومة الحرارة', 'استقرار الأشعة فوق البنفسجية', 'متانة طويلة المدى']
    },
    subProducts: [
      {
        id: 'dam-plus-app-4180',
        name: { en: 'Dam Plus APP 4180', ar: 'دام بلس APP 4180' },
        description: {
          en: 'APP modified membrane with excellent heat resistance - 4mm',
          ar: 'غشاء معدل APP مع مقاومة حرارة ممتازة - 4 مم'
        },
        pricing: { usd: 210, aed: 772 },
        specifications: ['APP modified', 'Thickness: 4mm', 'GSM: 180', 'Heat resistant', 'UV stable'],
        sizes: ['1m X 10m', '23 Roll/Pallet'],
        image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-plus-app-4200',
        name: { en: 'Dam Plus APP 4200', ar: 'دام بلس APP 4200' },
        description: {
          en: 'Enhanced APP modified membrane - 4mm thickness',
          ar: 'غشاء معدل APP محسن - سماكة 4 مم'
        },
        pricing: { usd: 220, aed: 808 },
        specifications: ['APP modified', 'Thickness: 4mm', 'GSM: 200', 'Enhanced durability', 'UV stable'],
        sizes: ['1m X 10m', '23 Roll/Pallet'],
        image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-plus-app-4250',
        name: { en: 'Dam Plus APP 4250', ar: 'دام بلس APP 4250' },
        description: {
          en: 'Premium APP modified membrane - 4mm thickness',
          ar: 'غشاء معدل APP ممتاز - سماكة 4 مم'
        },
        pricing: { usd: 230, aed: 845 },
        specifications: ['APP modified', 'Thickness: 4mm', 'GSM: 250', 'Premium quality', 'Maximum UV protection'],
        sizes: ['1m X 10m', '23 Roll/Pallet'],
        image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-plus-app-5180',
        name: { en: 'Dam Plus APP 5180', ar: 'دام بلس APP 5180' },
        description: {
          en: 'Heavy-duty APP modified membrane - 5mm thickness',
          ar: 'غشاء معدل APP للخدمة الشاقة - سماكة 5 مم'
        },
        pricing: { usd: 240, aed: 882 },
        specifications: ['APP modified', 'Thickness: 5mm', 'GSM: 180', 'Heavy duty', 'Extended protection'],
        sizes: ['1m X 10m', '23 Roll/Pallet'],
        image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-plus-app-5200',
        name: { en: 'Dam Plus APP 5200', ar: 'دام بلس APP 5200' },
        description: {
          en: 'Heavy-duty enhanced APP modified membrane - 5mm',
          ar: 'غشاء معدل APP محسن للخدمة الشاقة - 5 مم'
        },
        pricing: { usd: 250, aed: 918 },
        specifications: ['APP modified', 'Thickness: 5mm', 'GSM: 200', 'Enhanced strength', 'Superior heat resistance'],
        sizes: ['1m X 10m', '23 Roll/Pallet'],
        image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-plus-app-5250',
        name: { en: 'Dam Plus APP 5250', ar: 'دام بلس APP 5250' },
        description: {
          en: 'Premium heavy-duty APP modified membrane - 5mm',
          ar: 'غشاء معدل APP ممتاز للخدمة الشاقة - 5 مم'
        },
        pricing: { usd: 260, aed: 956 },
        specifications: ['APP modified', 'Thickness: 5mm', 'GSM: 250', 'Premium heavy duty', 'Ultimate heat protection'],
        sizes: ['1m X 10m', '23 Roll/Pallet'],
        image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
        availability: 'in_stock'
      }
    ]
  },

  // DAM STICK SERIES (Self-Adhesive)
  {
    id: 'dam-stick-series',
    category: 'membranes',
    name: { 
      en: 'DAM Stick Series', 
      ar: 'سلسلة دام ستيك' 
    },
    description: {
      en: 'Self-adhesive modified bitumen membranes for torch-free installation',
      ar: 'أغشية بيتومين معدلة ذاتية اللصق للتركيب بدون لهب'
    },
    overview: {
      en: 'The DAM Stick series offers revolutionary self-adhesive technology, eliminating the need for torch application. Perfect for sensitive areas and projects requiring cold application methods.',
      ar: 'توفر سلسلة دام ستيك تقنية ثورية ذاتية اللصق، مما يلغي الحاجة لتطبيق اللهب. مثالية للمناطق الحساسة والمشاريع التي تتطلب طرق التطبيق البارد.'
    },
    icon: '🔗',
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    featured: true,
    applications: {
      en: ['Sensitive environments', 'Occupied buildings', 'Fire-restricted areas', 'Quick installations'],
      ar: ['البيئات الحساسة', 'المباني المأهولة', 'المناطق المحظورة للحريق', 'التركيبات السريعة']
    },
    features: {
      en: ['Self-adhesive', 'No torch required', 'Easy installation', 'Clean application'],
      ar: ['ذاتي اللصق', 'لا يتطلب لهب', 'تركيب سهل', 'تطبيق نظيف']
    },
    subProducts: [
      {
        id: 'dam-stick-15',
        name: { en: 'Dam Stick 1.5mm', ar: 'دام ستيك 1.5 مم' },
        description: {
          en: 'Self-adhesive membrane for light-duty applications',
          ar: 'غشاء ذاتي اللصق للتطبيقات الخفيفة'
        },
        pricing: { usd: 260, aed: 956 },
        specifications: ['Self-adhesive', 'Thickness: 1.5mm', 'No torch required', 'Easy peel & stick'],
        sizes: ['1m X 15m', '25 Roll/Pallet'],
        image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-stick-16',
        name: { en: 'Dam Stick 1.6mm', ar: 'دام ستيك 1.6 مم' },
        description: {
          en: 'Enhanced self-adhesive membrane with increased thickness',
          ar: 'غشاء ذاتي اللصق محسن بسماكة متزايدة'
        },
        pricing: { usd: 270, aed: 993 },
        specifications: ['Self-adhesive', 'Thickness: 1.6mm', 'Enhanced thickness', 'Superior adhesion'],
        sizes: ['1m X 15m', '25 Roll/Pallet'],
        image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-stick-20',
        name: { en: 'Dam Stick 2.0mm', ar: 'دام ستيك 2.0 مم' },
        description: {
          en: 'Heavy-duty self-adhesive membrane for demanding applications',
          ar: 'غشاء ذاتي اللصق للخدمة الشاقة للتطبيقات الصعبة'
        },
        pricing: { usd: 290, aed: 1066 },
        specifications: ['Self-adhesive', 'Thickness: 2.0mm', 'Heavy duty', 'Maximum adhesion strength'],
        sizes: ['1m X 15m', '25 Roll/Pallet'],
        image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
        availability: 'in_stock'
      }
    ]
  },

  // PROTECTION BOARDS
  {
    id: 'dam-protection-board-series',
    category: 'protection-boards',
    name: { 
      en: 'DAM Protection Board Series', 
      ar: 'سلسلة ألواح الحماية دام' 
    },
    description: {
      en: 'Semi-rigid protection boards for membrane safeguarding',
      ar: 'ألواح حماية شبه صلبة لحماية الأغشية'
    },
    overview: {
      en: 'Our protection board series provides essential mechanical protection for waterproof membranes against impact, puncture, and construction damage. Available in multiple thicknesses for various protection levels.',
      ar: 'توفر سلسلة ألواح الحماية حماية ميكانيكية أساسية للأغشية المقاومة للماء ضد التأثي�� والثقب وأضرار البناء. متوفرة بسماكات متعددة لمستويات حماية مختلفة.'
    },
    icon: '🔲',
    image: 'https://images.pexels.com/photos/3615710/pexels-photo-3615710.jpeg',
    featured: true,
    applications: {
      en: ['Membrane protection', 'Foundation walls', 'Plaza decks', 'Green roof systems'],
      ar: ['حماية الأغشية', 'جدران الأساسات', 'أسطح البلازا', 'أنظمة الأسطح الخضراء']
    },
    features: {
      en: ['Impact resistance', 'Puncture protection', 'Easy installation', 'Dimensional stability'],
      ar: ['مقاومة التأثير', 'حماية من الثقب', 'تركيب سهل', 'استقرار الأبعاد']
    },
    subProducts: [
      {
        id: 'dam-board-3',
        name: { en: 'Dam Board 3mm', ar: 'دام بورد 3 مم' },
        description: {
          en: 'Standard protection board for light protection requirements',
          ar: 'لوح حماية قياسي لمتطلبات الحماية الخفيفة'
        },
        pricing: { usd: 45, aed: 165 },
        specifications: ['Thickness: 3mm', 'Semi-rigid', 'Bituminous', 'Impact resistant'],
        sizes: ['1m X 2m', '50 Sheets/Pallet'],
        image: 'https://images.pexels.com/photos/3615710/pexels-photo-3615710.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-board-35',
        name: { en: 'Dam Board 3.5mm', ar: 'دام بورد 3.5 مم' },
        description: {
          en: 'Enhanced protection board for standard applications',
          ar: 'لوح حماية محسن للتطبيقات القياسية'
        },
        pricing: { usd: 50, aed: 184 },
        specifications: ['Thickness: 3.5mm', 'Enhanced protection', 'Standard grade', 'Durable'],
        sizes: ['1m X 2m', '50 Sheets/Pallet'],
        image: 'https://images.pexels.com/photos/3615710/pexels-photo-3615710.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-board-4',
        name: { en: 'Dam Board 4mm', ar: 'دام بورد 4 مم' },
        description: {
          en: 'Heavy-duty protection board for demanding conditions',
          ar: 'لوح حماية للخدمة الشاقة للظروف الصعبة'
        },
        pricing: { usd: 55, aed: 202 },
        specifications: ['Thickness: 4mm', 'Heavy duty', 'Superior protection', 'High impact resistance'],
        sizes: ['1m X 2m', '50 Sheets/Pallet'],
        image: 'https://images.pexels.com/photos/3615710/pexels-photo-3615710.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-board-6',
        name: { en: 'Dam Board 6mm', ar: 'دام بورد 6 مم' },
        description: {
          en: 'Premium protection board for maximum protection',
          ar: 'لوح حماية ممتاز للحماية القصوى'
        },
        pricing: { usd: 65, aed: 239 },
        specifications: ['Thickness: 6mm', 'Premium quality', 'Maximum protection', 'Ultimate durability'],
        sizes: ['1m X 2m', '40 Sheets/Pallet'],
        image: 'https://images.pexels.com/photos/3615710/pexels-photo-3615710.jpeg',
        availability: 'in_stock'
      }
    ]
  },

  // WATER STOPPERS
  {
    id: 'dam-water-stopper-series',
    category: 'water-stoppers',
    name: { 
      en: 'DAM Water Stopper Series', 
      ar: 'سلسلة موانع المياه دام' 
    },
    description: {
      en: 'PVC water stoppers for construction and expansion joints',
      ar: 'موانع مياه PVC لمفاصل البناء والتمدد'
    },
    overview: {
      en: 'Our comprehensive water stopper series provides reliable water barrier solutions for all types of construction joints. Engineered for permanent waterproofing in concrete structures.',
      ar: 'توفر سلسلة موانع المياه الشاملة حلول حاجز مائي موثوقة لجميع أنواع مفاصل البناء. مصممة للعزل المائي الدائم في الهياكل الخرسانية.'
    },
    icon: '🚰',
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    featured: false,
    applications: {
      en: ['Construction joints', 'Expansion joints', 'Concrete structures', 'Underground works'],
      ar: ['مفاصل البناء', 'مفاصل التمدد', 'الهياكل الخرسانية', 'الأعمال تحت الأرض']
    },
    features: {
      en: ['PVC material', 'Chemical resistance', 'Flexible design', 'Permanent installation'],
      ar: ['مادة PVC', 'مقاومة كيميائية', 'تصميم مرن', 'تركيب دائم']
    },
    subProducts: [
      {
        id: 'dam-stop-icj-250',
        name: { en: 'Dam Stop ICJ 250mm', ar: 'دام ستوب ICJ 250مم' },
        description: {
          en: 'Internal construction joint water stopper',
          ar: 'مانع مياه مفصل البناء الداخلي'
        },
        pricing: { usd: 12, aed: 44 },
        specifications: ['Internal construction joint', 'Width: 250mm', 'PVC material', 'Flexible design'],
        sizes: ['10m Roll', '15m Roll'],
        image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-stop-icj-300',
        name: { en: 'Dam Stop ICJ 300mm', ar: 'دام ستوب ICJ 300مم' },
        description: {
          en: 'Wide internal construction joint water stopper',
          ar: 'مانع مياه مفصل البناء الداخلي العريض'
        },
        pricing: { usd: 15, aed: 55 },
        specifications: ['Internal construction joint', 'Width: 300mm', 'Wide application', 'Enhanced coverage'],
        sizes: ['10m Roll', '15m Roll'],
        image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-stop-ecj-250',
        name: { en: 'Dam Stop ECJ 250mm', ar: 'دام ستوب ECJ 250مم' },
        description: {
          en: 'External construction joint water stopper',
          ar: 'مانع مياه مفصل البناء الخارجي'
        },
        pricing: { usd: 12, aed: 44 },
        specifications: ['External construction joint', 'Width: 250mm', 'Weather resistant', 'Durable PVC'],
        sizes: ['10m Roll', '15m Roll'],
        image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-stop-iej-250',
        name: { en: 'Dam Stop IEJ 250mm', ar: 'دام ستوب IEJ 250مم' },
        description: {
          en: 'Internal expansion joint water stopper',
          ar: 'مانع مياه مفصل التمدد الداخلي'
        },
        pricing: { usd: 13, aed: 48 },
        specifications: ['Internal expansion joint', 'Width: 250mm', 'Movement accommodation', 'Flexible design'],
        sizes: ['10m Roll', '15m Roll'],
        image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
        availability: 'in_stock'
      }
    ]
  },

  // COATINGS
  {
    id: 'dam-coating-series',
    category: 'coatings',
    name: { 
      en: 'DAM Coating Series', 
      ar: 'سلسلة طلاءات دام' 
    },
    description: {
      en: 'Professional waterproof and protective coatings',
      ar: 'طلاءات مقاومة للماء ووقائية مهنية'
    },
    overview: {
      en: 'Our coating series offers advanced liquid-applied waterproofing solutions for various substrates. From acrylic to polyurethane systems, providing seamless protection.',
      ar: 'توفر سلسلة الطلاءات حلول عزل مائي متقدمة سائلة التطبيق لركائز مختلفة. من الأكريليك إلى أنظمة البولي يوريثان، توفر حماية غير منقطعة.'
    },
    icon: '✨',
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    featured: true,
    applications: {
      en: ['Roof waterproofing', 'Balcony coatings', 'Floor protection', 'Tank linings'],
      ar: ['عزل الأسطح المائي', 'طلاءات الشرفات', 'حماية الأرضيات', 'بطانات الخزانات']
    },
    features: {
      en: ['Seamless application', 'Flexible finish', 'UV resistance', 'Easy maintenance'],
      ar: ['تطبيق غير منقطع', 'تشطيب مرن', 'مقاومة الأشعة فوق البنفسجية', 'صيانة سهلة']
    },
    subProducts: [
      {
        id: 'dam-coat-ac',
        name: { en: 'Dam Coat AC', ar: 'دام كوت AC' },
        description: {
          en: 'Acrylic elastomeric coating for roof waterproofing',
          ar: 'طلاء أكريليك مرن لعزل الأسطح المائي'
        },
        pricing: { usd: 40, aed: 147 },
        specifications: ['Acrylic coating', 'UV resistant', 'Elastomeric', 'Breathable membrane'],
        sizes: ['20 Ltr Pail'],
        image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-coat-apcc',
        name: { en: 'Dam Coat APCC', ar: 'دام كوت APCC' },
        description: {
          en: 'Two-component acrylic polymer cementitious coating',
          ar: 'طلاء أكريليك بوليمر أسمنتي ثنائي المكونات'
        },
        pricing: { usd: 45, aed: 165 },
        specifications: ['Two component', 'Polymer modified', 'Cementitious base', 'High flexibility'],
        sizes: ['Part A 15Kg Bag', 'Part B 5Kg Can'],
        image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-coat-puc',
        name: { en: 'Dam Coat PUC', ar: 'دام كوت PUC' },
        description: {
          en: 'Polyurethane coating for superior chemical resistance',
          ar: 'طلاء البولي يوريثان لمقاومة كيميائية فائقة'
        },
        pricing: { usd: 55, aed: 202 },
        specifications: ['Polyurethane', 'Chemical resistant', 'High durability', 'Seamless finish'],
        sizes: ['20 Ltr Pail'],
        image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
        availability: 'in_stock'
      },
      {
        id: 'dam-coat-rbe',
        name: { en: 'Dam Coat RBE', ar: 'دام كوت RBE' },
        description: {
          en: 'Rubberized bitumen emulsion for economic waterproofing',
          ar: 'مستحلب بيتومين مطاطي للعزل المائي الاقتصادي'
        },
        pricing: { usd: 35, aed: 129 },
        specifications: ['Rubberized emulsion', 'Cold applied', 'Economic solution', 'Easy application'],
        sizes: ['200 Ltr Drum', '20 Ltr Pail'],
        image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
        availability: 'in_stock'
      }
    ]
  }
];

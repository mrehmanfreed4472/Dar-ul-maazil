export interface Product {
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
  pricing: {
    usd: number;
    aed: number;
  };
  specifications?: string[];
  sizes?: string[];
  image: string;
  featured?: boolean;
  availability?: 'in_stock' | 'out_of_stock' | 'limited';
}

export interface ProductCategory {
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
  featured: boolean;
}

export const productCategories: ProductCategory[] = [
  {
    id: 'primers',
    name: { en: 'Primers', ar: 'البرايمر' },
    description: { 
      en: 'High-quality primers for surface preparation and adhesion',
      ar: 'برايمر عالي الجودة لتحضير السطح والالتصاق'
    },
    icon: '🎨',
    featured: true
  },
  {
    id: 'membranes',
    name: { en: 'Membranes', ar: 'الأغشية' },
    description: { 
      en: 'Waterproof membranes for effective water barrier systems',
      ar: 'أغشية مقاومة للماء لأنظمة حاجز الماء الفعالة'
    },
    icon: '🛡️',
    featured: true
  },
  {
    id: 'protection-boards',
    name: { en: 'Protection Boards', ar: 'ألواح الحماية' },
    description: { 
      en: 'Durable protection boards for membrane safeguarding',
      ar: 'ألواح حماية متينة لحماية الأغشية'
    },
    icon: '🔲',
    featured: true
  },
  {
    id: 'geotextiles',
    name: { en: 'Geotextiles & Polystyrene', ar: 'الجيوتكستايل والبوليستيرين' },
    description: { 
      en: 'Geotextile fabrics and polystyrene insulation materials',
      ar: 'أقمشة الجيوتكستايل ومواد عزل البوليستيرين'
    },
    icon: '🧵',
    featured: true
  },
  {
    id: 'sealants',
    name: { en: 'Sealants & Flashings', ar: 'المواد المانعة للتسرب والفلاشينغ' },
    description: { 
      en: 'Professional sealants and aluminum flashings',
      ar: 'مواد منع التسرب المهنية وفلاشينغ الألومنيوم'
    },
    icon: '🔧',
    featured: true
  },
  {
    id: 'coatings',
    name: { en: 'Protective Coatings', ar: 'الطلاءات الواقية' },
    description: { 
      en: 'Acrylic, rubberized, and specialized coating solutions',
      ar: 'حلول الطلاء الأكريليكي والمطاطي والمتخصص'
    },
    icon: '✨',
    featured: true
  },
  {
    id: 'water-stoppers',
    name: { en: 'Water Stoppers', ar: 'موانع المياه' },
    description: { 
      en: 'Effective water stopping solutions for construction joints',
      ar: 'حلول فعالة لمنع المياه في مفاصل البناء'
    },
    icon: '🚰',
    featured: false
  },
  {
    id: 'insulation',
    name: { en: 'Insulation Materials', ar: 'مواد العزل' },
    description: { 
      en: 'Rockwool, glasswool and advanced insulation solutions',
      ar: 'صوف صخري وصوف زجاجي وحلول عزل متقدمة'
    },
    icon: '🏠',
    featured: false
  }
];

export const allProducts: Product[] = [
  // Primers
  {
    id: 'bitumen-primer',
    category: 'primers',
    name: { en: 'Bitumen Primer', ar: 'برايمر البيتومين' },
    description: {
      en: 'High-performance bitumen primer for excellent surface preparation and adhesion enhancement. Essential for waterproofing applications.',
      ar: 'برايمر بيتومي�� عالي الأداء لتحضير ممتاز للسطح وتعزيز الالتصاق. ضروري لتطبيقات مقاومة الماء.'
    },
    pricing: { usd: 25, aed: 92 },
    specifications: ['Fast drying', 'Excellent penetration', 'UV resistant'],
    sizes: ['1L', '5L', '20L'],
    image: 'https://images.pexels.com/photos/6474294/pexels-photo-6474294.jpeg',
    featured: true
  },
  {
    id: 'concrete-primer',
    category: 'primers',
    name: { en: 'Concrete Primer', ar: 'برايمر الخرسانة' },
    description: {
      en: 'Specialized primer for concrete surfaces ensuring optimal adhesion for subsequent coatings.',
      ar: 'برايمر متخصص لأسطح الخرسانة يضمن التصاق مثالي للطلاءات اللاحقة.'
    },
    pricing: { usd: 30, aed: 110 },
    specifications: ['Deep penetration', 'Dust binding', 'Quick cure'],
    sizes: ['1L', '5L', '20L'],
    image: 'https://images.pexels.com/photos/6474294/pexels-photo-6474294.jpeg'
  },

  // Membranes
  {
    id: 'sbs-membrane',
    category: 'membranes',
    name: { en: 'SBS Modified Membrane', ar: 'غشاء معدل SBS' },
    description: {
      en: 'Premium SBS modified bitumen membrane for superior waterproofing performance with excellent flexibility.',
      ar: 'غشاء بيتومين معدل SBS ممتاز لأداء مقاوم للماء فائق مع مرونة ممتازة.'
    },
    pricing: { usd: 180, aed: 661 },
    specifications: ['Self-adhesive', 'UV protection', 'Root resistant'],
    sizes: ['1m x 10m', '1m x 15m'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    featured: true
  },
  {
    id: 'app-membrane',
    category: 'membranes',
    name: { en: 'APP Modified Membrane', ar: 'غشاء معدل APP' },
    description: {
      en: 'APP modified bitumen membrane offering exceptional heat resistance and durability.',
      ar: 'غشاء بيتومين معدل APP يوفر مقاومة استثنائية للحرارة والمتانة.'
    },
    pricing: { usd: 160, aed: 588 },
    specifications: ['Heat resistant', 'Long lasting', 'Easy application'],
    sizes: ['1m x 10m', '1m x 15m'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg'
  },
  {
    id: 'liquid-membrane',
    category: 'membranes',
    name: { en: 'Liquid Applied Membrane', ar: 'غشاء سائل التطبيق' },
    description: {
      en: 'Single component liquid membrane for seamless waterproofing of complex geometries.',
      ar: 'غشاء سائل أحادي المكون لمقاومة الماء السلسة للأشكال الهندسية المعقدة.'
    },
    pricing: { usd: 45, aed: 165 },
    specifications: ['Seamless application', 'Cold applied', 'Crack bridging'],
    sizes: ['5kg', '20kg'],
    image: 'https://images.pexels.com/photos/3615730/pexels-photo-3615730.jpeg'
  },

  // Protection Boards
  {
    id: 'hdpe-board',
    category: 'protection-boards',
    name: { en: 'HDPE Protection Board', ar: 'لوح حماية HDPE' },
    description: {
      en: 'Heavy-duty HDPE protection board for membrane protection and durability against mechanical damage.',
      ar: 'لوح حماية HDPE للخدمة الشاقة لحماية الغشاء والمتانة ضد الضرر الميكانيكي.'
    },
    pricing: { usd: 45, aed: 165 },
    specifications: ['Impact resistant', 'Chemical resistant', 'Recyclable'],
    sizes: ['2m x 1m', '1.5m x 1m'],
    image: 'https://images.pexels.com/photos/3615710/pexels-photo-3615710.jpeg',
    featured: true
  },
  {
    id: 'dimpled-membrane',
    category: 'protection-boards',
    name: { en: 'Dimpled Drainage Membrane', ar: 'غشاء التصريف المنقط' },
    description: {
      en: 'Dimpled HDPE membrane providing protection and drainage in foundation applications.',
      ar: 'غشاء HDPE منقط يوفر الح��اية والصرف في تطبيقات الأساسات.'
    },
    pricing: { usd: 35, aed: 129 },
    specifications: ['Drainage channels', 'Root resistant', 'Easy installation'],
    sizes: ['2m x 20m', '1.5m x 20m'],
    image: 'https://images.pexels.com/photos/3615710/pexels-photo-3615710.jpeg'
  },

  // Geotextiles & Polystyrene
  {
    id: 'geotextile-fabric',
    category: 'geotextiles',
    name: { en: 'Non-Woven Geotextile', ar: 'جيوتكستايل غير منسوج' },
    description: {
      en: 'High-strength non-woven geotextile fabric for separation, filtration and drainage applications.',
      ar: 'قماش جيوتكستايل غير منسوج عالي القوة للفصل والترشيح وتطبيقات الصرف.'
    },
    pricing: { usd: 15, aed: 55 },
    specifications: ['UV stabilized', 'High tensile strength', 'Permeable'],
    sizes: ['2m x 50m', '4m x 50m'],
    image: 'https://images.pexels.com/photos/8488033/pexels-photo-8488033.jpeg'
  },
  {
    id: 'polystyrene-board',
    category: 'geotextiles',
    name: { en: 'XPS Polystyrene Board', ar: 'لوح البوليستيرين XPS' },
    description: {
      en: 'Extruded polystyrene insulation board with excellent thermal properties and moisture resistance.',
      ar: 'لوح عزل البوليستي��ين المبثوق بخصائص حرارية ممتازة ومقاومة للرطوبة.'
    },
    pricing: { usd: 25, aed: 92 },
    specifications: ['Thermal insulation', 'Moisture resistant', 'Compressive strength'],
    sizes: ['60cm x 125cm', '30cm x 125cm'],
    image: 'https://images.pexels.com/photos/8488033/pexels-photo-8488033.jpeg'
  },

  // Sealants & Flashings
  {
    id: 'polyurethane-sealant',
    category: 'sealants',
    name: { en: 'Polyurethane Sealant', ar: 'مانع تسرب البولي يوريثان' },
    description: {
      en: 'Flexible polyurethane sealant for joints and expansion sealing applications with excellent adhesion.',
      ar: 'مانع تسرب البولي يوريثان المرن للمفاصل وتطبيقات ختم التوسع مع التصاق ممتاز.'
    },
    pricing: { usd: 35, aed: 129 },
    specifications: ['Paintable', 'Weather resistant', 'Flexible'],
    sizes: ['310ml', '600ml'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    featured: true
  },
  {
    id: 'aluminum-flashing',
    category: 'sealants',
    name: { en: 'Aluminum Flashing Tape', ar: 'شريط فلاشينغ الألومنيوم' },
    description: { 
      en: 'Self-adhesive aluminum flashing tape for sealing and protection of joints and penetrations.',
      ar: 'شريط فلاشينغ الألومنيوم ذاتي اللصق لإغلاق وحماية المفاصل والاختراقات.'
    },
    pricing: { usd: 20, aed: 73 },
    specifications: ['Self-adhesive', 'UV resistant', 'Conformable'],
    sizes: ['10cm x 10m', '15cm x 10m'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg'
  },
  {
    id: 'silicone-sealant',
    category: 'sealants',
    name: { en: 'Silicone Sealant', ar: 'مانع تسرب السيليكون' },
    description: { 
      en: 'High-performance silicone sealant for structural glazing and weatherproofing applications.',
      ar: 'مانع تسرب السيليكون عالي الأداء للزجاج الهيكلي وتطبيقات مقاومة الطقس.'
    },
    pricing: { usd: 28, aed: 103 },
    specifications: ['Structural grade', 'Weather resistant', 'Clear finish'],
    sizes: ['310ml', '600ml'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg'
  },

  // Coatings
  {
    id: 'acrylic-coating',
    category: 'coatings',
    name: { en: 'Acrylic Waterproof Coating', ar: 'طلاء أكريليكي مقاوم للماء' },
    description: { 
      en: 'Elastomeric acrylic coating providing excellent waterproofing and UV protection for roofs.',
      ar: 'طلاء أكريليكي مرن يوفر مقاومة ممتازة للماء وحماية من الأشعة فوق البنفسجية للأسطح.'
    },
    pricing: { usd: 40, aed: 147 },
    specifications: ['UV resistant', 'Elastomeric', 'Breathable'],
    sizes: ['5kg', '20kg'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg'
  },
  {
    id: 'polyurethane-coating',
    category: 'coatings',
    name: { en: 'Polyurethane Coating', ar: 'طلاء البولي يوريثان' },
    description: { 
      en: 'Two-component polyurethane coating system for high-performance waterproofing applications.',
      ar: 'نظام طلاء البولي يوريثان ثنائي المكونات لتطبيقات مقاومة الماء عالية الأداء.'
    },
    pricing: { usd: 65, aed: 239 },
    specifications: ['Chemical resistant', 'Abrasion resistant', 'High build'],
    sizes: ['10kg', '25kg'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg'
  },
  {
    id: 'cementitious-coating',
    category: 'coatings',
    name: { en: 'Cementitious Coating', ar: 'طلاء إسمنتي' },
    description: { 
      en: 'Polymer-modified cementitious coating for waterproofing basements and water tanks.',
      ar: 'طلاء إسمنتي معدل بالبوليمر لمقاومة الماء في الأقبية وخزانات المياه.'
    },
    pricing: { usd: 30, aed: 110 },
    specifications: ['Crack bridging', 'Breathable', 'Easy application'],
    sizes: ['25kg'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg'
  },

  // Water Stoppers
  {
    id: 'pvc-waterstop',
    category: 'water-stoppers',
    name: { en: 'PVC Water Stop', ar: 'موقف مياه PVC' },
    description: { 
      en: 'Flexible PVC water stop for concrete construction joints and expansion joints.',
      ar: 'موقف مياه PVC مرن لمفاصل البناء الخرسانية ومفاصل التمدد.'
    },
    pricing: { usd: 12, aed: 44 },
    specifications: ['Chemical resistant', 'Flexible', 'Long lasting'],
    sizes: ['15cm width', '20cm width', '25cm width'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg'
  },
  {
    id: 'rubber-waterstop',
    category: 'water-stoppers',
    name: { en: 'Rubber Water Stop', ar: 'موقف مياه مطاطي' },
    description: { 
      en: 'High-quality rubber water stop providing excellent sealing in construction joints.',
      ar: 'موقف مياه مطاطي عالي الجودة يوفر إغلاق ممتاز في مفاصل البناء.'
    },
    pricing: { usd: 18, aed: 66 },
    specifications: ['Weather resistant', 'Ozone resistant', 'Easy installation'],
    sizes: ['15cm width', '20cm width', '30cm width'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg'
  },

  // Insulation Materials
  {
    id: 'rockwool-board',
    category: 'insulation',
    name: { en: 'Rockwool Insulation Board', ar: 'لوح عزل الصوف الصخري' },
    description: { 
      en: 'High-density rockwool insulation board for thermal and acoustic insulation applications.',
      ar: 'لوح عزل الصوف الصخري عالي الكثافة للعزل الحراري والصوتي.'
    },
    pricing: { usd: 35, aed: 129 },
    specifications: ['Fire resistant', 'Thermal insulation', 'Acoustic insulation'],
    sizes: ['60cm x 120cm', '100cm x 120cm'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg'
  },
  {
    id: 'glasswool-roll',
    category: 'insulation',
    name: { en: 'Glasswool Insulation Roll', ar: 'لفة عزل الصوف الزجاجي' },
    description: { 
      en: 'Lightweight glasswool insulation roll for walls, roofs and HVAC ductwork insulation.',
      ar: 'لفة عزل الصوف الزجاجي خفيفة الوزن للجدران والأسطح وعزل مجاري التكييف.'
    },
    pricing: { usd: 25, aed: 92 },
    specifications: ['Lightweight', 'Easy installation', 'Thermal efficiency'],
    sizes: ['1.2m x 20m', '1.5m x 20m'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg'
  }
];

export const featuredProducts = allProducts.filter(product => product.featured);

export const getAllProducts = (): Product[] => {
  return allProducts;
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return allProducts.filter(product => product.category === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(product => product.id === id);
};

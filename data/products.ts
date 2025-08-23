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
  availability?: 'in_stock' | 'out_of_stock' | 'limited' | 'low_stock';
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
    id: 'coatings',
    name: { en: 'Waterproof Coatings', ar: 'الطلاءات المقاومة للماء' },
    description: { 
      en: 'Advanced waterproof and floor coatings for all applications',
      ar: 'طلاءات مقاومة للماء والأرضيات المتقدمة لجميع التطبيقات'
    },
    icon: '✨',
    featured: true
  },
  {
    id: 'sealants',
    name: { en: 'Sealants & Silicon', ar: 'المواد المانعة للتسرب والسيليكون' },
    description: { 
      en: 'Professional sealants and silicon for joints and gaps',
      ar: 'مواد منع التسرب والسيليكون المهنية للمفاصل والفجوات'
    },
    icon: '🔧',
    featured: true
  },
  {
    id: 'concrete-repair',
    name: { en: 'Concrete Repair & Crack Injection', ar: '��صلاح الخرسانة وحقن الشقوق' },
    description: { 
      en: 'Concrete repair and crack injection solutions',
      ar: 'حلول إصلاح الخرسانة وحقن الشقوق'
    },
    icon: '🔨',
    featured: false
  },
  {
    id: 'grp-lining',
    name: { en: 'GRP Lining', ar: 'بطانة الألياف الزجاجية' },
    description: { 
      en: 'Glass Reinforced Plastic lining systems and materials',
      ar: 'أنظمة ومواد بطانة البلاستيك المقوى بالألياف الزجاجية'
    },
    icon: '🛡️',
    featured: false
  },
  {
    id: 'repair-mortars',
    name: { en: 'Repair Mortars & Plugging', ar: 'مونة الإصلاح والسد' },
    description: { 
      en: 'Specialized mortars and plugging compounds for structural repairs',
      ar: 'مونة متخصصة ومركبات السد لإصلاحات الهياكل'
    },
    icon: '🏗️',
    featured: false
  },
  {
    id: 'geotextiles',
    name: { en: 'Geotextiles & Fabrics', ar: 'الجيوتكستايل والأقمشة' },
    description: { 
      en: 'Geotextile fabrics and meshes for civil engineering applications',
      ar: 'أقمشة الجيوتكستايل والشبكات لتطبيقات الهندسة المدنية'
    },
    icon: '🧵',
    featured: false
  },
  {
    id: 'thermal-insulation',
    name: { en: 'Thermal Insulation', ar: 'العزل الحراري' },
    description: { 
      en: 'Thermal insulation materials and joint fillers for energy efficiency',
      ar: 'مواد العزل الحراري وحشوات المفاصل لكفاءة الطاقة'
    },
    icon: '🌡️',
    featured: false
  },
  {
    id: 'aluminum-flashing',
    name: { en: 'Aluminum Flashing', ar: 'الألومنيوم الوامض' },
    description: { 
      en: 'Aluminum flashing for waterproofing details and protection',
      ar: 'الألومنيوم الوامض لتفاصيل العزل المائي والحماية'
    },
    icon: '⚡',
    featured: false
  },
  {
    id: 'sandwich-panels',
    name: { en: 'Sandwich Panels', ar: 'الألواح الساندويتش' },
    description: { 
      en: 'Insulated sandwich panels, GI sheets and skylights for construction',
      ar: 'ألواح ساندويتش معزولة وألواح GI ونوافذ السقف للبناء'
    },
    icon: '🥪',
    featured: false
  },
  {
    id: 'concrete-grouts',
    name: { en: 'Concrete & Grouts', ar: 'الخرسانة والجراوت' },
    description: { 
      en: 'Specialized concrete and grout products for construction',
      ar: 'منتجات خرسانة وجراوت متخصصة للبناء'
    },
    icon: '🏗️',
    featured: false
  },
  {
    id: 'tiles',
    name: { en: 'Tiles', ar: 'البلاط' },
    description: { 
      en: 'Tiles and related installation materials',
      ar: 'البلاط ومواد التركيب ذات الصلة'
    },
    icon: '🔷',
    featured: false
  },
  {
    id: 'gravel',
    name: { en: 'Gravel', ar: 'الحصى' },
    description: { 
      en: 'Various gravel types for construction and landscaping',
      ar: 'أنواع مختلفة من الحصى للبناء وتنسيق الحدائق'
    },
    icon: '🪨',
    featured: false
  },
  {
    id: 'landscaping',
    name: { en: 'Landscaping Products', ar: 'منتجات تنسيق الحدائق' },
    description: { 
      en: 'Landscaping and garden materials for outdoor projects',
      ar: 'مواد تنسيق الحدائق للمشاريع الخارجية'
    },
    icon: '🌿',
    featured: false
  },
  {
    id: 'tools-accessories',
    name: { en: 'Tools & Miscellaneous', ar: 'الأدوات والمتنوعات' },
    description: { 
      en: 'Professional tools and miscellaneous installation items',
      ar: 'أدوات مهنية وعناصر تركي�� متنوعة'
    },
    icon: '🔧',
    featured: false
  }
];

export const allProducts: Product[] = [
  // PRIMERS
  {
    id: 'dam-prime-sb',
    category: 'primers',
    name: { en: 'Dam Prime SB', ar: 'دام برايم SB' },
    description: {
      en: 'Solvent Based Bitumen Primer for excellent surface preparation and adhesion enhancement',
      ar: 'برايمر بيتومين أساسه المذيب لتحضير ممتاز للسطح وتعزيز الالتصاق'
    },
    pricing: { usd: 45, aed: 165 },
    specifications: ['Solvent based', 'Fast drying', 'Excellent penetration'],
    sizes: ['20 Ltr', '200 Ltr'],
    image: 'https://images.pexels.com/photos/6474294/pexels-photo-6474294.jpeg',
    featured: true,
    availability: 'in_stock'
  },
  {
    id: 'dam-prime-wb',
    category: 'primers',
    name: { en: 'Dam Prime WB', ar: 'دام برايم WB' },
    description: {
      en: 'Water Based Bitumen Primer for eco-friendly surface preparation',
      ar: 'برايمر بيتومين أساسه الماء لتحضير السطح الصديق للبيئة'
    },
    pricing: { usd: 40, aed: 147 },
    specifications: ['Water based', 'Eco-friendly', 'Low VOC'],
    sizes: ['20 Ltr', '200 Ltr'],
    image: 'https://images.pexels.com/photos/6474294/pexels-photo-6474294.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-prime-oxidized',
    category: 'primers',
    name: { en: 'Dam Prime Oxidized', ar: 'دام برايم المؤكسد' },
    description: {
      en: 'Hot Bitumen Primer for high-temperature applications',
      ar: 'برايمر بيتومين ساخن للتطبيقات عالية الحرارة'
    },
    pricing: { usd: 50, aed: 184 },
    specifications: ['Hot application', 'High temperature resistant', 'Superior adhesion'],
    sizes: ['20Kg', '200 Kg'],
    image: 'https://images.pexels.com/photos/6474294/pexels-photo-6474294.jpeg',
    availability: 'in_stock'
  },

  // MEMBRANES - Dam Plus S Series
  {
    id: 'dam-plus-s-4180',
    category: 'membranes',
    name: { en: 'Dam Plus S 4180', ar: 'دام بلس S 4180' },
    description: {
      en: 'Bituminous Membrane with superior waterproofing properties',
      ar: 'غشاء بيتوميني بخصائص عزل مائي فائقة'
    },
    pricing: { usd: 180, aed: 661 },
    specifications: ['Thickness: 4mm', 'GSM: 180', 'High flexibility'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    featured: true,
    availability: 'in_stock'
  },
  {
    id: 'dam-plus-s-4200',
    category: 'membranes',
    name: { en: 'Dam Plus S 4200', ar: 'دام بلس S 4200' },
    description: {
      en: 'Bituminous Membrane with enhanced durability',
      ar: 'غشاء بيتوميني بمتانة محسنة'
    },
    pricing: { usd: 190, aed: 698 },
    specifications: ['Thickness: 4mm', 'GSM: 200', 'Enhanced durability'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-plus-s-4250',
    category: 'membranes',
    name: { en: 'Dam Plus S 4250', ar: 'دام بلس S 4250' },
    description: {
      en: 'Premium Bituminous Membrane for demanding applications',
      ar: 'غشاء بيتوميني ممتاز للتطبيقات الصعبة'
    },
    pricing: { usd: 200, aed: 735 },
    specifications: ['Thickness: 4mm', 'GSM: 250', 'Premium quality'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-plus-s-5180',
    category: 'membranes',
    name: { en: 'Dam Plus S 5180', ar: 'دام بلس S 5180' },
    description: {
      en: 'Heavy-duty Bituminous Membrane for extreme applications',
      ar: 'غشاء بيتوميني ��لخدمة الشاقة للتطبيقات القاسية'
    },
    pricing: { usd: 220, aed: 808 },
    specifications: ['Thickness: 5mm', 'GSM: 180', 'Heavy duty'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-plus-s-5200',
    category: 'membranes',
    name: { en: 'Dam Plus S 5200', ar: 'دام بلس S 5200' },
    description: {
      en: 'Heavy-duty Bituminous Membrane with enhanced strength',
      ar: 'غشاء بيتوميني للخدمة الشاقة بقوة محسنة'
    },
    pricing: { usd: 230, aed: 845 },
    specifications: ['Thickness: 5mm', 'GSM: 200', 'Enhanced strength'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-plus-s-5250',
    category: 'membranes',
    name: { en: 'Dam Plus S 5250', ar: 'دام بلس S 5250' },
    description: {
      en: 'Premium heavy-duty Bituminous Membrane',
      ar: 'غشاء بيتوميني ممتاز للخدمة الشاقة'
    },
    pricing: { usd: 240, aed: 882 },
    specifications: ['Thickness: 5mm', 'GSM: 250', 'Premium heavy duty'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },

  // SBS Modified Bitumen Membrane
  {
    id: 'sbs-modified-membrane',
    category: 'membranes',
    name: { en: 'SBS Modified Bitumen Membrane', ar: 'غشاء بيتومين معدل SBS' },
    description: {
      en: 'SBS Modified Bitumen Membrane for superior flexibility and performance',
      ar: 'غشاء بيتومين معدل SBS لمرونة وأداء فائق'
    },
    pricing: { usd: 220, aed: 808 },
    specifications: ['SBS modified', 'High flexibility', 'Temperature resistant'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    featured: true,
    availability: 'in_stock'
  },

  // Dam Plus APP Series
  {
    id: 'dam-plus-app-4180',
    category: 'membranes',
    name: { en: 'Dam Plus APP 4180', ar: 'دام بلس APP 4180' },
    description: {
      en: 'APP Modified Bitumen Membrane for excellent heat resistance',
      ar: 'غشاء بيتومين معدل APP لمقاومة حرارة ممتازة'
    },
    pricing: { usd: 210, aed: 772 },
    specifications: ['APP modified', 'Heat resistant', 'UV stable', 'Thickness: 4mm', 'GSM: 180'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-plus-app-4200',
    category: 'membranes',
    name: { en: 'Dam Plus APP 4200', ar: 'دام بلس APP 4200' },
    description: {
      en: 'APP Modified Bitumen Membrane with enhanced durability',
      ar: 'غشاء بيتومين معدل APP بمتانة محسنة'
    },
    pricing: { usd: 220, aed: 808 },
    specifications: ['APP modified', 'Enhanced durability', 'UV stable', 'Thickness: 4mm', 'GSM: 200'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-plus-app-4250',
    category: 'membranes',
    name: { en: 'Dam Plus APP 4250', ar: 'دام بلس APP 4250' },
    description: {
      en: 'Premium APP Modified Bitumen Membrane',
      ar: 'غشاء بيتومين معدل APP ممتاز'
    },
    pricing: { usd: 230, aed: 845 },
    specifications: ['APP modified', 'Premium quality', 'UV stable', 'Thickness: 4mm', 'GSM: 250'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-plus-app-5180',
    category: 'membranes',
    name: { en: 'Dam Plus APP 5180', ar: 'دام بلس APP 5180' },
    description: {
      en: 'Heavy-duty APP Modified Bitumen Membrane',
      ar: 'غشاء بيتومين معدل APP للخدمة الشاقة'
    },
    pricing: { usd: 240, aed: 882 },
    specifications: ['APP modified', 'Heavy duty', 'UV stable', 'Thickness: 5mm', 'GSM: 180'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-plus-app-5200',
    category: 'membranes',
    name: { en: 'Dam Plus APP 5200', ar: 'دام بلس APP 5200' },
    description: {
      en: 'Heavy-duty APP Modified Bitumen Membrane with enhanced strength',
      ar: 'غشاء بيتومين معدل APP للخدمة الشاقة بقوة محسنة'
    },
    pricing: { usd: 250, aed: 918 },
    specifications: ['APP modified', 'Enhanced strength', 'UV stable', 'Thickness: 5mm', 'GSM: 200'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-plus-app-5250',
    category: 'membranes',
    name: { en: 'Dam Plus APP 5250', ar: 'دام بلس APP 5250' },
    description: {
      en: 'Premium heavy-duty APP Modified Bitumen Membrane',
      ar: 'غشاء بيتومين معدل APP ممتاز للخدمة الشاقة'
    },
    pricing: { usd: 260, aed: 956 },
    specifications: ['APP modified', 'Premium heavy duty', 'UV stable', 'Thickness: 5mm', 'GSM: 250'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },

  // Dam Plus M Series (Mineral Modified)
  {
    id: 'dam-plus-m-4180',
    category: 'membranes',
    name: { en: 'Dam Plus M 4180', ar: 'دام بلس M 4180' },
    description: {
      en: 'Mineral Modified Bitumen Membrane with enhanced protection',
      ar: 'غشاء بيتومين معدل بالمعادن بحماية محسنة'
    },
    pricing: { usd: 195, aed: 717 },
    specifications: ['Mineral modified', 'Enhanced protection', 'Weather resistant', 'Thickness: 4mm', 'GSM: 180'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-plus-m-4200',
    category: 'membranes',
    name: { en: 'Dam Plus M 4200', ar: 'دام بلس M 4200' },
    description: {
      en: 'Mineral Modified Bitumen Membrane with enhanced durability',
      ar: 'غشاء بيتومين معدل بالمعادن بمتانة محسنة'
    },
    pricing: { usd: 205, aed: 754 },
    specifications: ['Mineral modified', 'Enhanced durability', 'Weather resistant', 'Thickness: 4mm', 'GSM: 200'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-plus-m-4250',
    category: 'membranes',
    name: { en: 'Dam Plus M 4250', ar: 'دام بلس M 4250' },
    description: {
      en: 'Premium Mineral Modified Bitumen Membrane',
      ar: 'غشاء بيتومين معدل بالمعادن ممتاز'
    },
    pricing: { usd: 215, aed: 791 },
    specifications: ['Mineral modified', 'Premium quality', 'Weather resistant', 'Thickness: 4mm', 'GSM: 250'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },

  // Dam Plus AR Series (Anti-Root)
  {
    id: 'dam-plus-ar-4180',
    category: 'membranes',
    name: { en: 'Dam Plus AR 4180', ar: 'دام بلس AR 4180' },
    description: {
      en: 'Anti-root Modified Bitumen Membrane for green roof applications',
      ar: 'غشاء بيتومين معدل مضاد للجذور لتطبيقات الأسطح الخضراء'
    },
    pricing: { usd: 225, aed: 827 },
    specifications: ['Anti-root', 'Green roof compatible', 'Root penetration resistant', 'Thickness: 4mm', 'GSM: 180'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-plus-ar-4200',
    category: 'membranes',
    name: { en: 'Dam Plus AR 4200', ar: 'دام بلس AR 4200' },
    description: {
      en: 'Anti-root Modified Bitumen Membrane with enhanced strength',
      ar: 'غشاء بيتومين معدل مضاد للجذور بقوة محسنة'
    },
    pricing: { usd: 235, aed: 864 },
    specifications: ['Anti-root', 'Enhanced strength', 'Root penetration resistant', 'Thickness: 4mm', 'GSM: 200'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-plus-ar-4250',
    category: 'membranes',
    name: { en: 'Dam Plus AR 4250', ar: 'دام بلس AR 4250' },
    description: {
      en: 'Premium Anti-root Modified Bitumen Membrane',
      ar: 'غشاء بيتومين معدل مضاد للجذور ممتاز'
    },
    pricing: { usd: 245, aed: 901 },
    specifications: ['Anti-root', 'Premium quality', 'Root penetration resistant', 'Thickness: 4mm', 'GSM: 250'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },

  // Dam Plus AL Series (Aluminum Faced)
  {
    id: 'dam-plus-al-4180',
    category: 'membranes',
    name: { en: 'Dam Plus AL 4180', ar: 'دام بلس AL 4180' },
    description: {
      en: 'Aluminum Faced Modified Bitumen Membrane for enhanced reflectivity',
      ar: 'غشاء بيتومين معدل بوجه الألومنيوم لانعكاس محسن'
    },
    pricing: { usd: 240, aed: 882 },
    specifications: ['Aluminum faced', 'Heat reflective', 'UV protection', 'Thickness: 4mm', 'GSM: 180'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-plus-al-4200',
    category: 'membranes',
    name: { en: 'Dam Plus AL 4200', ar: 'دام ب��س AL 4200' },
    description: {
      en: 'Aluminum Faced Modified Bitumen Membrane with enhanced durability',
      ar: 'غشاء بيتومين معدل بوجه الألومنيوم بمتانة محسنة'
    },
    pricing: { usd: 250, aed: 918 },
    specifications: ['Aluminum faced', 'Enhanced durability', 'UV protection', 'Thickness: 4mm', 'GSM: 200'],
    sizes: ['1m X 10m', '23 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },

  // Dam Stick Series (Self-Adhesive)
  {
    id: 'dam-stick-15',
    category: 'membranes',
    name: { en: 'Dam Stick 1.5mm', ar: 'دام ستيك 1.5 مم' },
    description: {
      en: 'Self-Adhesive Modified Bitumen Membrane for easy installation',
      ar: 'غشاء بيتومين معدل ذاتي اللصق للتركيب السهل'
    },
    pricing: { usd: 260, aed: 956 },
    specifications: ['Self-adhesive', 'Easy installation', 'No torch required', 'Thickness: 1.5mm'],
    sizes: ['1m X 15m', '25 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stick-16',
    category: 'membranes',
    name: { en: 'Dam Stick 1.6mm', ar: 'دام ستيك 1.6 مم' },
    description: {
      en: 'Self-Adhesive Modified Bitumen Membrane with enhanced thickness',
      ar: 'غشاء بيتومين معدل ذاتي اللصق بسماكة محسنة'
    },
    pricing: { usd: 270, aed: 993 },
    specifications: ['Self-adhesive', 'Enhanced thickness', 'No torch required', 'Thickness: 1.6mm'],
    sizes: ['1m X 15m', '25 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stick-20',
    category: 'membranes',
    name: { en: 'Dam Stick 2.0mm', ar: 'دام ستيك 2.0 مم' },
    description: {
      en: 'Heavy-duty Self-Adhesive Modified Bitumen Membrane',
      ar: 'غشاء بيتومين معدل ذاتي اللصق للخدمة الشاق��'
    },
    pricing: { usd: 290, aed: 1066 },
    specifications: ['Self-adhesive', 'Heavy duty', 'No torch required', 'Thickness: 2.0mm'],
    sizes: ['1m X 15m', '25 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },

  // Dam Shield Series (DPC)
  {
    id: 'dam-shield-15',
    category: 'membranes',
    name: { en: 'Dam Shield 1.5mm', ar: 'دام شيلد 1.5 مم' },
    description: {
      en: 'Damp Proof Course Membrane for foundation protection',
      ar: 'غشاء منع الرطوبة لحماية الأساسات'
    },
    pricing: { usd: 85, aed: 312 },
    specifications: ['Damp proof', 'Foundation protection', 'Multiple widths', 'Thickness: 1.5mm'],
    sizes: ['10m X 10/20/25/30/35/100cm'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-shield-30',
    category: 'membranes',
    name: { en: 'Dam Shield 3.0mm', ar: 'دام شيلد 3.0 مم' },
    description: {
      en: 'Heavy-duty Damp Proof Course Membrane for enhanced protection',
      ar: 'غشاء منع الرطوبة للخدمة الشاقة لحماية محسنة'
    },
    pricing: { usd: 95, aed: 349 },
    specifications: ['Heavy duty damp proof', 'Enhanced protection', 'Multiple widths', 'Thickness: 3.0mm'],
    sizes: ['10m X 10/20/25/30/35/100cm'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },

  // Dam Stick CL Series (Cross Laminated)
  {
    id: 'dam-stick-cl-16',
    category: 'membranes',
    name: { en: 'Dam Stick CL 1.6mm', ar: 'دام ستيك CL 1.6 مم' },
    description: {
      en: 'Self-Adhesive Cross Laminated Membrane for superior strength',
      ar: 'غشاء متقاطع ذاتي اللصق لقوة فائقة'
    },
    pricing: { usd: 280, aed: 1029 },
    specifications: ['Self-adhesive', 'Cross laminated', 'Superior strength', 'Thickness: 1.6mm'],
    sizes: ['1m X 15m', '25 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stick-cl-21',
    category: 'membranes',
    name: { en: 'Dam Stick CL 2.1mm', ar: 'دام ستيك CL 2.1 مم' },
    description: {
      en: 'Heavy-duty Self-Adhesive Cross Laminated Membrane',
      ar: 'غشاء متقاطع ذاتي اللصق للخدمة الشاقة'
    },
    pricing: { usd: 300, aed: 1102 },
    specifications: ['Self-adhesive', 'Cross laminated', 'Heavy duty', 'Thickness: 2.1mm'],
    sizes: ['1m X 15m', '25 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },

  // Dam Shield SA Series (Self-Adhesive DPC)
  {
    id: 'dam-shield-sa-15',
    category: 'membranes',
    name: { en: 'Dam Shield SA 1.5mm', ar: 'دام شيلد SA 1.5 مم' },
    description: {
      en: 'Self-Adhesive Damp Proof Course Membrane for easy installation',
      ar: 'غشاء منع الرطوبة ذاتي اللصق للتركيب السهل'
    },
    pricing: { usd: 95, aed: 349 },
    specifications: ['Self-adhesive', 'Damp proof', 'Easy installation', 'Thickness: 1.5mm'],
    sizes: ['10m X 10/20/25/30/35/100cm'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-shield-sa-20',
    category: 'membranes',
    name: { en: 'Dam Shield SA 2.0mm', ar: 'دام شيلد SA 2.0 مم' },
    description: {
      en: 'Heavy-duty Self-Adhesive Damp Proof Course Membrane',
      ar: 'غشاء منع الرطوبة ذاتي اللصق للخدمة الشاقة'
    },
    pricing: { usd: 105, aed: 386 },
    specifications: ['Self-adhesive', 'Heavy duty damp proof', 'Easy installation', 'Thickness: 2.0mm'],
    sizes: ['10m X 10/20/25/30/35/100cm'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },

  // Dam Stick AL Series (Self-Adhesive Aluminum)
  {
    id: 'dam-stick-al-15',
    category: 'membranes',
    name: { en: 'Dam Stick AL 1.5mm', ar: 'دام ستيك AL 1.5 مم' },
    description: {
      en: 'Self-Adhesive Aluminum Faced Membrane for heat reflection',
      ar: 'غشاء ذاتي اللصق بوجه الألومنيوم لانعكاس الحرارة'
    },
    pricing: { usd: 280, aed: 1029 },
    specifications: ['Self-adhesive', 'Aluminum faced', 'Heat reflective', 'Thickness: 1.5mm'],
    sizes: ['1m X 15m', '25 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stick-al-16',
    category: 'membranes',
    name: { en: 'Dam Stick AL 1.6mm', ar: 'دام ستيك AL 1.6 مم' },
    description: {
      en: 'Self-Adhesive Aluminum Faced Membrane with enhanced thickness',
      ar: 'غشاء ذاتي اللصق بوجه الألومنيوم بسماكة محسنة'
    },
    pricing: { usd: 290, aed: 1066 },
    specifications: ['Self-adhesive', 'Aluminum faced', 'Enhanced thickness', 'Thickness: 1.6mm'],
    sizes: ['1m X 15m', '25 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stick-al-20',
    category: 'membranes',
    name: { en: 'Dam Stick AL 2.0mm', ar: 'دام ستيك AL 2.0 مم' },
    description: {
      en: 'Heavy-duty Self-Adhesive Aluminum Faced Membrane',
      ar: 'غشاء ذاتي اللصق بوجه الألومنيوم للخدمة الشاقة'
    },
    pricing: { usd: 310, aed: 1139 },
    specifications: ['Self-adhesive', 'Aluminum faced', 'Heavy duty', 'Thickness: 2.0mm'],
    sizes: ['1m X 15m', '25 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },

  // Dam Shield HD Series (High Density DPC)
  {
    id: 'dam-shield-hd-15',
    category: 'membranes',
    name: { en: 'Dam Shield HD 1.5mm', ar: 'دام شيلد HD 1.5 مم' },
    description: {
      en: 'High Density Damp Proof Course Membrane for superior protection',
      ar: 'غشاء منع الرطوبة عالي الكثافة لحماية فائقة'
    },
    pricing: { usd: 95, aed: 349 },
    specifications: ['High density', 'Superior protection', 'Multiple widths', 'Thickness: 1.5mm'],
    sizes: ['10m X 10/20/25/30/35/100cm'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-shield-hd-20',
    category: 'membranes',
    name: { en: 'Dam Shield HD 2.0mm', ar: 'دام شيلد HD 2.0 مم' },
    description: {
      en: 'Heavy-duty High Density Damp Proof Course Membrane',
      ar: 'غشاء منع الرطوبة عالي الكثافة للخدمة الشاقة'
    },
    pricing: { usd: 105, aed: 386 },
    specifications: ['High density', 'Heavy duty', 'Multiple widths', 'Thickness: 2.0mm'],
    sizes: ['10m X 10/20/25/30/35/100cm'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },

  // EPDM Membranes
  {
    id: 'dam-epdm-12',
    category: 'membranes',
    name: { en: 'Dam EPDM 1.2mm', ar: 'دام EPDM 1.2 مم' },
    description: {
      en: 'Ethylene Propylene Diene Monomer Membrane for superior durability',
      ar: 'غشاء EPDM لم��انة فائقة'
    },
    pricing: { usd: 320, aed: 1176 },
    specifications: ['EPDM rubber', 'Excellent durability', 'Weather resistant', 'Thickness: 1.2mm'],
    sizes: ['2.1m X 20m/Roll'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-epdm-15',
    category: 'membranes',
    name: { en: 'Dam EPDM 1.5mm', ar: 'دام EPDM 1.5 مم' },
    description: {
      en: 'Enhanced EPDM Membrane with increased thickness',
      ar: 'غشاء EPDM محسن بسماكة متزايد��'
    },
    pricing: { usd: 340, aed: 1250 },
    specifications: ['EPDM rubber', 'Enhanced thickness', 'Weather resistant', 'Thickness: 1.5mm'],
    sizes: ['2.1m X 20m/Roll'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-epdm-20',
    category: 'membranes',
    name: { en: 'Dam EPDM 2.0mm', ar: 'دام EPDM 2.0 مم' },
    description: {
      en: 'Heavy-duty EPDM Membrane for demanding applications',
      ar: 'غشاء EPDM للخدمة الشاقة للتطبيقات الصعبة'
    },
    pricing: { usd: 380, aed: 1397 },
    specifications: ['EPDM rubber', 'Heavy duty', 'Excellent durability', 'Thickness: 2.0mm'],
    sizes: ['2.1m X 20m/Roll'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-epdm-30',
    category: 'membranes',
    name: { en: 'Dam EPDM 3.0mm', ar: 'دام EPDM 3.0 مم' },
    description: {
      en: 'Premium EPDM Membrane for extreme applications',
      ar: 'غشاء EPDM ممتاز للتطبيقات القاسية'
    },
    pricing: { usd: 420, aed: 1544 },
    specifications: ['EPDM rubber', 'Premium quality', 'Extreme durability', 'Thickness: 3.0mm'],
    sizes: ['2.1m X 20m/Roll'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },

  // PVC Membranes
  {
    id: 'dam-pvc-12',
    category: 'membranes',
    name: { en: 'Dam PVC 1.2mm', ar: 'دام PVC 1.2 مم' },
    description: {
      en: 'Polyvinyl Chloride Membrane for chemical resistance',
      ar: 'غشاء PVC لمقاومة المواد الكيميائية'
    },
    pricing: { usd: 280, aed: 1029 },
    specifications: ['PVC material', 'Chemical resistant', 'Weldable seams', 'Thickness: 1.2mm'],
    sizes: ['2.1m X 20m'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-pvc-15',
    category: 'membranes',
    name: { en: 'Dam PVC 1.5mm', ar: 'دام PVC 1.5 مم' },
    description: {
      en: 'Enhanced PVC Membrane with increased thickness',
      ar: 'غشاء PVC محسن بسماكة متزايدة'
    },
    pricing: { usd: 300, aed: 1102 },
    specifications: ['PVC material', 'Enhanced thickness', 'Chemical resistant', 'Thickness: 1.5mm'],
    sizes: ['2.1m X 20m'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-pvc-20',
    category: 'membranes',
    name: { en: 'Dam PVC 2.0mm', ar: 'دام PVC 2.0 مم' },
    description: {
      en: 'Heavy-duty PVC Membrane for demanding applications',
      ar: 'غشاء PVC للخدمة الشاقة للتطبيقات الصعبة'
    },
    pricing: { usd: 340, aed: 1250 },
    specifications: ['PVC material', 'Heavy duty', 'Chemical resistant', 'Thickness: 2.0mm'],
    sizes: ['2.1m X 20m'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-pvc-22',
    category: 'membranes',
    name: { en: 'Dam PVC 2.2mm', ar: 'دام PVC 2.2 مم' },
    description: {
      en: 'Premium PVC Membrane for extreme applications',
      ar: 'غشاء PVC ممتاز للتطبيقات القاسية'
    },
    pricing: { usd: 360, aed: 1323 },
    specifications: ['PVC material', 'Premium quality', 'Chemical resistant', 'Thickness: 2.2mm'],
    sizes: ['2.1m X 20m'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },

  // HDPE Membranes
  {
    id: 'dam-hdpe-075',
    category: 'membranes',
    name: { en: 'Dam HDPE 0.75mm', ar: 'دام HDPE 0.75 مم' },
    description: {
      en: 'High Density Polyethylene Membrane for containment applications',
      ar: 'غشاء البولي إيثيلين عالي الكثافة للاحتواء'
    },
    pricing: { usd: 150, aed: 551 },
    specifications: ['HDPE material', 'Chemical resistant', 'High strength', 'Thickness: 0.75mm'],
    sizes: ['Various sizes available'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-hdpe-10',
    category: 'membranes',
    name: { en: 'Dam HDPE 1.0mm', ar: 'دام HDPE 1.0 مم' },
    description: {
      en: 'Standard HDPE Membrane for general containment',
      ar: 'غشاء HDPE قياسي للاحتواء العام'
    },
    pricing: { usd: 170, aed: 625 },
    specifications: ['HDPE material', 'Standard thickness', 'Chemical resistant', 'Thickness: 1.0mm'],
    sizes: ['Various sizes available'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-hdpe-15',
    category: 'membranes',
    name: { en: 'Dam HDPE 1.5mm', ar: 'دام HDPE 1.5 مم' },
    description: {
      en: 'Enhanced HDPE Membrane for increased durability',
      ar: 'غشاء HDPE محسن لمتانة متزايدة'
    },
    pricing: { usd: 190, aed: 698 },
    specifications: ['HDPE material', 'Enhanced durability', 'Chemical resistant', 'Thickness: 1.5mm'],
    sizes: ['Various sizes available'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-hdpe-20',
    category: 'membranes',
    name: { en: 'Dam HDPE 2.0mm', ar: 'دام HDPE 2.0 مم' },
    description: {
      en: 'Heavy-duty HDPE Membrane for demanding applications',
      ar: 'غشاء HDPE للخدمة الشاقة للتطبيقات الصعبة'
    },
    pricing: { usd: 220, aed: 808 },
    specifications: ['HDPE material', 'Heavy duty', 'Superior strength', 'Thickness: 2.0mm'],
    sizes: ['Various sizes available'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-hdpe-30',
    category: 'membranes',
    name: { en: 'Dam HDPE 3.0mm', ar: 'دام HDPE 3.0 مم' },
    description: {
      en: 'Premium HDPE Membrane for extreme applications',
      ar: 'غشاء HDPE ممتاز للتطبيقات القاسية'
    },
    pricing: { usd: 250, aed: 918 },
    specifications: ['HDPE material', 'Premium quality', 'Maximum strength', 'Thickness: 3.0mm'],
    sizes: ['Various sizes available'],
    image: 'https://images.pexels.com/photos/31188734/pexels-photo-31188734.jpeg',
    availability: 'in_stock'
  },

  // PROTECTION BOARDS
  {
    id: 'dam-board-3',
    category: 'protection-boards',
    name: { en: 'Dam Board 3mm', ar: 'دام بورد 3 مم' },
    description: {
      en: 'Semi-rigid Bituminous Protection Board for membrane protection',
      ar: 'لوح حماية بيتوميني شبه صلب لحماية الغشاء'
    },
    pricing: { usd: 45, aed: 165 },
    specifications: ['Semi-rigid', 'Bituminous', 'Impact resistant', 'Thickness: 3mm'],
    sizes: ['1m X 2m'],
    image: 'https://images.pexels.com/photos/3615710/pexels-photo-3615710.jpeg',
    featured: true,
    availability: 'in_stock'
  },
  {
    id: 'dam-board-32',
    category: 'protection-boards',
    name: { en: 'Dam Board 3.2mm', ar: 'دام بورد 3.2 مم' },
    description: {
      en: 'Enhanced Semi-rigid Bituminous Protection Board',
      ar: 'لوح حماية بيتوميني شبه صلب محسن'
    },
    pricing: { usd: 47, aed: 173 },
    specifications: ['Semi-rigid', 'Enhanced protection', 'Impact resistant', 'Thickness: 3.2mm'],
    sizes: ['1m X 2m'],
    image: 'https://images.pexels.com/photos/3615710/pexels-photo-3615710.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-board-35',
    category: 'protection-boards',
    name: { en: 'Dam Board 3.5mm', ar: 'دام بورد 3.5 مم' },
    description: {
      en: 'Standard Semi-rigid Bituminous Protection Board',
      ar: 'لوح حماية بيتوميني شبه صلب قياسي'
    },
    pricing: { usd: 50, aed: 184 },
    specifications: ['Semi-rigid', 'Standard protection', 'Impact resistant', 'Thickness: 3.5mm'],
    sizes: ['1m X 2m'],
    image: 'https://images.pexels.com/photos/3615710/pexels-photo-3615710.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-board-4',
    category: 'protection-boards',
    name: { en: 'Dam Board 4mm', ar: 'دام بورد 4 مم' },
    description: {
      en: 'Heavy-duty Semi-rigid Bituminous Protection Board',
      ar: 'لوح حماية بيتوميني شبه صلب للخدمة الشاقة'
    },
    pricing: { usd: 55, aed: 202 },
    specifications: ['Semi-rigid', 'Heavy duty', 'Superior protection', 'Thickness: 4mm'],
    sizes: ['1m X 2m'],
    image: 'https://images.pexels.com/photos/3615710/pexels-photo-3615710.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-board-6',
    category: 'protection-boards',
    name: { en: 'Dam Board 6mm', ar: 'دام بورد 6 مم' },
    description: {
      en: 'Premium Semi-rigid Bituminous Protection Board',
      ar: 'لوح حماية بيتوميني شبه صلب ممتاز'
    },
    pricing: { usd: 65, aed: 239 },
    specifications: ['Semi-rigid', 'Premium quality', 'Maximum protection', 'Thickness: 6mm'],
    sizes: ['1m X 2m'],
    image: 'https://images.pexels.com/photos/3615710/pexels-photo-3615710.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-pp-board-2',
    category: 'protection-boards',
    name: { en: 'Dam PP Board 2mm', ar: 'دام PP بورد 2 مم' },
    description: {
      en: 'Polypropylene Protection Board for lightweight protection',
      ar: 'لوح حماية البولي بروبيلين للحماية خفيفة الوزن'
    },
    pricing: { usd: 35, aed: 129 },
    specifications: ['Polypropylene', 'Lightweight', 'Chemical resistant', 'Thickness: 2mm'],
    sizes: ['1m X 2m', '25 Sheets/Pack'],
    image: 'https://images.pexels.com/photos/3615710/pexels-photo-3615710.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-pp-board-3',
    category: 'protection-boards',
    name: { en: 'Dam PP Board 3mm', ar: '��ام PP بورد 3 مم' },
    description: {
      en: 'Standard Polypropylene Protection Board',
      ar: 'لوح حماية البولي بروبيلين القياسي'
    },
    pricing: { usd: 40, aed: 147 },
    specifications: ['Polypropylene', 'Standard protection', 'Chemical resistant', 'Thickness: 3mm'],
    sizes: ['1m X 2m', '25 Sheets/Pack'],
    image: 'https://images.pexels.com/photos/3615710/pexels-photo-3615710.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-pp-board-4',
    category: 'protection-boards',
    name: { en: 'Dam PP Board 4mm', ar: 'دام PP بورد 4 مم' },
    description: {
      en: 'Enhanced Polypropylene Protection Board',
      ar: 'لوح حماية البولي بروبيلين المحسن'
    },
    pricing: { usd: 45, aed: 165 },
    specifications: ['Polypropylene', 'Enhanced protection', 'Chemical resistant', 'Thickness: 4mm'],
    sizes: ['1m X 2m', '25 Sheets/Pack'],
    image: 'https://images.pexels.com/photos/3615710/pexels-photo-3615710.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-pp-board-5',
    category: 'protection-boards',
    name: { en: 'Dam PP Board 5mm', ar: 'دام PP بورد 5 مم' },
    description: {
      en: 'Heavy-duty Polypropylene Protection Board',
      ar: 'لوح حماية البولي بروبيلين للخدمة الشاقة'
    },
    pricing: { usd: 50, aed: 184 },
    specifications: ['Polypropylene', 'Heavy duty', 'Superior protection', 'Thickness: 5mm'],
    sizes: ['1m X 2m', '25 Sheets/Pack'],
    image: 'https://images.pexels.com/photos/3615710/pexels-photo-3615710.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-pp-board-6',
    category: 'protection-boards',
    name: { en: 'Dam PP Board 6mm', ar: 'دام PP بورد 6 مم' },
    description: {
      en: 'Premium Polypropylene Protection Board',
      ar: 'لوح حماية البولي بروبيلين الممتاز'
    },
    pricing: { usd: 55, aed: 202 },
    specifications: ['Polypropylene', 'Premium quality', 'Maximum protection', 'Thickness: 6mm'],
    sizes: ['1m X 2m', '25 Sheets/Pack'],
    image: 'https://images.pexels.com/photos/3615710/pexels-photo-3615710.jpeg',
    availability: 'in_stock'
  },

  // PVC WATER STOPPERS
  {
    id: 'dam-stop-icj-3-250',
    category: 'water-stoppers',
    name: { en: 'Dam Stop ICJ 3mm-250mm', ar: 'دام ستوب ICJ 3مم-250مم' },
    description: {
      en: 'PVC Water Stopper for Internal Construction Joints',
      ar: 'موقف مياه PVC للمفاصل الإنشائية الداخلية'
    },
    pricing: { usd: 12, aed: 44 },
    specifications: ['Internal construction joint', 'PVC material', 'Thickness: 3mm', 'Width: 250mm'],
    sizes: ['10m Roll', '15m Roll', '20 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-icj-3-300',
    category: 'water-stoppers',
    name: { en: 'Dam Stop ICJ 3mm-300mm', ar: 'دام ستوب ICJ 3مم-300مم' },
    description: {
      en: 'PVC Water Stopper for Internal Construction Joints - Wide',
      ar: 'موقف مياه PVC للمفاصل الإنشائية الداخلية - عريض'
    },
    pricing: { usd: 15, aed: 55 },
    specifications: ['Internal construction joint', 'PVC material', 'Thickness: 3mm', 'Width: 300mm'],
    sizes: ['10m Roll', '15m Roll', '20 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-icj-4-250',
    category: 'water-stoppers',
    name: { en: 'Dam Stop ICJ 4mm-250mm', ar: 'دام ستوب ICJ 4مم-250مم' },
    description: {
      en: 'Heavy-duty PVC Water Stopper for Internal Construction Joints',
      ar: 'موقف مياه PVC للخدمة الشاقة للمفاصل الإنشائية الداخلية'
    },
    pricing: { usd: 14, aed: 51 },
    specifications: ['Internal construction joint', 'Heavy duty', 'Thickness: 4mm', 'Width: 250mm'],
    sizes: ['10m Roll', '15m Roll', '20 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-icj-4-300',
    category: 'water-stoppers',
    name: { en: 'Dam Stop ICJ 4mm-300mm', ar: 'دام ستوب ICJ 4مم-300مم' },
    description: {
      en: 'Heavy-duty PVC Water Stopper for Internal Construction Joints - Wide',
      ar: 'موقف مياه PVC للخدمة الشاقة للمفاصل الإنشائية الداخلية - عريض'
    },
    pricing: { usd: 17, aed: 62 },
    specifications: ['Internal construction joint', 'Heavy duty', 'Thickness: 4mm', 'Width: 300mm'],
    sizes: ['10m Roll', '15m Roll', '20 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-ecj-3-250',
    category: 'water-stoppers',
    name: { en: 'Dam Stop ECJ 3mm-250mm', ar: 'دام ستوب ECJ 3مم-250مم' },
    description: {
      en: 'PVC Water Stopper for External Construction Joints',
      ar: 'موقف مياه PVC للمفاصل الإنشائية الخارجية'
    },
    pricing: { usd: 12, aed: 44 },
    specifications: ['External construction joint', 'PVC material', 'Thickness: 3mm', 'Width: 250mm'],
    sizes: ['10m Roll', '15m Roll', '20 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-ecj-3-300',
    category: 'water-stoppers',
    name: { en: 'Dam Stop ECJ 3mm-300mm', ar: 'دام ستوب ECJ 3مم-300مم' },
    description: {
      en: 'PVC Water Stopper for External Construction Joints - Wide',
      ar: 'موقف مياه PVC للمفاصل الإنشائية ال��ارجية - عريض'
    },
    pricing: { usd: 15, aed: 55 },
    specifications: ['External construction joint', 'PVC material', 'Thickness: 3mm', 'Width: 300mm'],
    sizes: ['10m Roll', '15m Roll', '20 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-ecj-4-250',
    category: 'water-stoppers',
    name: { en: 'Dam Stop ECJ 4mm-250mm', ar: 'دام ستوب ECJ 4مم-250مم' },
    description: {
      en: 'Heavy-duty PVC Water Stopper for External Construction Joints',
      ar: 'موقف مياه PVC للخدمة الشاقة للمفاصل الإنشائية الخارجية'
    },
    pricing: { usd: 14, aed: 51 },
    specifications: ['External construction joint', 'Heavy duty', 'Thickness: 4mm', 'Width: 250mm'],
    sizes: ['10m Roll', '15m Roll', '20 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-ecj-4-300',
    category: 'water-stoppers',
    name: { en: 'Dam Stop ECJ 4mm-300mm', ar: 'دام ستوب ECJ 4مم-300مم' },
    description: {
      en: 'Heavy-duty PVC Water Stopper for External Construction Joints - Wide',
      ar: 'موقف مياه PVC للخدمة الشاقة للمفاصل الإنشائية الخارجية - عريض'
    },
    pricing: { usd: 17, aed: 62 },
    specifications: ['External construction joint', 'Heavy duty', 'Thickness: 4mm', 'Width: 300mm'],
    sizes: ['10m Roll', '15m Roll', '20 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-iej-3-250',
    category: 'water-stoppers',
    name: { en: 'Dam Stop IEJ 3mm-250mm', ar: 'دام ستوب IEJ 3مم-250مم' },
    description: {
      en: 'PVC Water Stopper for Internal Expansion Joints',
      ar: 'موقف مياه PVC لمفاصل التمدد الداخلية'
    },
    pricing: { usd: 13, aed: 48 },
    specifications: ['Internal expansion joint', 'PVC material', 'Thickness: 3mm', 'Width: 250mm'],
    sizes: ['10m Roll', '15m Roll', '20 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-iej-3-300',
    category: 'water-stoppers',
    name: { en: 'Dam Stop IEJ 3mm-300mm', ar: 'دام ستوب IEJ 3مم-300مم' },
    description: {
      en: 'PVC Water Stopper for Internal Expansion Joints - Wide',
      ar: 'موقف مياه PVC لمفاصل التمدد الداخلية - عريض'
    },
    pricing: { usd: 16, aed: 59 },
    specifications: ['Internal expansion joint', 'PVC material', 'Thickness: 3mm', 'Width: 300mm'],
    sizes: ['10m Roll', '15m Roll', '20 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-iej-4-250',
    category: 'water-stoppers',
    name: { en: 'Dam Stop IEJ 4mm-250mm', ar: 'دام ستوب IEJ 4مم-250مم' },
    description: {
      en: 'Heavy-duty PVC Water Stopper for Internal Expansion Joints',
      ar: 'موقف مياه PVC للخدمة الشاقة لمفاصل التمدد الداخلية'
    },
    pricing: { usd: 15, aed: 55 },
    specifications: ['Internal expansion joint', 'Heavy duty', 'Thickness: 4mm', 'Width: 250mm'],
    sizes: ['10m Roll', '15m Roll', '20 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-iej-4-300',
    category: 'water-stoppers',
    name: { en: 'Dam Stop IEJ 4mm-300mm', ar: 'دام ستوب IEJ 4مم-300مم' },
    description: {
      en: 'Heavy-duty PVC Water Stopper for Internal Expansion Joints - Wide',
      ar: 'موقف مياه PVC للخدمة الشاقة لمفاصل التمدد الداخلية - عريض'
    },
    pricing: { usd: 18, aed: 66 },
    specifications: ['Internal expansion joint', 'Heavy duty', 'Thickness: 4mm', 'Width: 300mm'],
    sizes: ['10m Roll', '15m Roll', '20 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-eej-3-250',
    category: 'water-stoppers',
    name: { en: 'Dam Stop EEJ 3mm-250mm', ar: 'دام ستوب EEJ 3مم-250مم' },
    description: {
      en: 'PVC Water Stopper for External Expansion Joints',
      ar: 'موقف مياه PVC لمفاصل التمدد الخارجية'
    },
    pricing: { usd: 13, aed: 48 },
    specifications: ['External expansion joint', 'PVC material', 'Thickness: 3mm', 'Width: 250mm'],
    sizes: ['10m Roll', '15m Roll', '20 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-eej-3-300',
    category: 'water-stoppers',
    name: { en: 'Dam Stop EEJ 3mm-300mm', ar: 'دام ستوب EEJ 3مم-300مم' },
    description: {
      en: 'PVC Water Stopper for External Expansion Joints - Wide',
      ar: 'موقف مياه PVC لمفاصل التمدد الخارجية - عريض'
    },
    pricing: { usd: 16, aed: 59 },
    specifications: ['External expansion joint', 'PVC material', 'Thickness: 3mm', 'Width: 300mm'],
    sizes: ['10m Roll', '15m Roll', '20 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-eej-4-250',
    category: 'water-stoppers',
    name: { en: 'Dam Stop EEJ 4mm-250mm', ar: 'دام ستوب EEJ 4مم-250مم' },
    description: {
      en: 'Heavy-duty PVC Water Stopper for External Expansion Joints',
      ar: 'موقف مياه PVC للخدمة الشاقة لمفاصل التمدد الخارجية'
    },
    pricing: { usd: 15, aed: 55 },
    specifications: ['External expansion joint', 'Heavy duty', 'Thickness: 4mm', 'Width: 250mm'],
    sizes: ['10m Roll', '15m Roll', '20 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-eej-4-300',
    category: 'water-stoppers',
    name: { en: 'Dam Stop EEJ 4mm-300mm', ar: 'دام ستوب EEJ 4مم-300مم' },
    description: {
      en: 'Heavy-duty PVC Water Stopper for External Expansion Joints - Wide',
      ar: 'موقف مياه PVC للخدمة الشاقة لمفاصل التمدد الخارجية - عريض'
    },
    pricing: { usd: 18, aed: 66 },
    specifications: ['External expansion joint', 'Heavy duty', 'Thickness: 4mm', 'Width: 300mm'],
    sizes: ['10m Roll', '15m Roll', '20 Roll/Pallet'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-hp-5',
    category: 'water-stoppers',
    name: { en: 'Dam Stop HP 5mm x 20mm', ar: 'دام ستوب HP 5مم × 20مم' },
    description: {
      en: 'Hydrophilic Swellable Joint Sealing Profile',
      ar: 'ملف إغلاق المفاصل القابل للانتفاخ المحب للماء'
    },
    pricing: { usd: 25, aed: 92 },
    specifications: ['Hydrophilic', 'Swellable', 'Easy installation', 'Size: 5mm x 20mm'],
    sizes: ['20m Roll'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-hp-10',
    category: 'water-stoppers',
    name: { en: 'Dam Stop HP 10mm x 20mm', ar: 'دام ستوب HP 10مم × 20مم' },
    description: {
      en: 'Hydrophilic Swellable Joint Sealing Profile - Medium',
      ar: 'ملف إغلاق المفاصل القابل للانتفاخ المحب للماء - متوسط'
    },
    pricing: { usd: 30, aed: 110 },
    specifications: ['Hydrophilic', 'Swellable', 'Medium size', 'Size: 10mm x 20mm'],
    sizes: ['10m Roll'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-hp-15',
    category: 'water-stoppers',
    name: { en: 'Dam Stop HP 15mm x 20mm', ar: 'دام ستوب HP 15مم × 20مم' },
    description: {
      en: 'Hydrophilic Swellable Joint Sealing Profile - Large',
      ar: 'ملف إغلاق المفاصل القابل للانتفاخ المحب للماء - كبير'
    },
    pricing: { usd: 35, aed: 129 },
    specifications: ['Hydrophilic', 'Swellable', 'Large size', 'Size: 15mm x 20mm'],
    sizes: ['7m Roll'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-hp-25',
    category: 'water-stoppers',
    name: { en: 'Dam Stop HP 25mm x 20mm', ar: 'دام ستوب HP 25مم × 20مم' },
    description: {
      en: 'Hydrophilic Swellable Joint Sealing Profile - Extra Large',
      ar: 'ملف إغلاق المفاصل القابل للانتفاخ المحب للماء - كبير جداً'
    },
    pricing: { usd: 40, aed: 147 },
    specifications: ['Hydrophilic', 'Swellable', 'Extra large', 'Size: 25mm x 20mm'],
    sizes: ['5m Roll'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-r-10x20',
    category: 'water-stoppers',
    name: { en: 'Dam Stop R 10x20mm', ar: 'دام ستوب R 10×20مم' },
    description: {
      en: 'Hydrophilic Rubber Based on Polyurethane',
      ar: 'مطاط محب للماء أساسه البولي يوريثان'
    },
    pricing: { usd: 45, aed: 165 },
    specifications: ['Hydrophilic rubber', 'Polyurethane based', 'Superior sealing', 'Size: 10x20mm'],
    sizes: ['10pcs of 5m/box'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-stop-r-20x20',
    category: 'water-stoppers',
    name: { en: 'Dam Stop R 20x20mm', ar: 'دام ستوب R 20×20مم' },
    description: {
      en: 'Hydrophilic Rubber Based on Polyurethane - Large',
      ar: 'مطاط محب للماء أساسه البولي يوريثان - كبير'
    },
    pricing: { usd: 50, aed: 184 },
    specifications: ['Hydrophilic rubber', 'Polyurethane based', 'Large size', 'Size: 20x20mm'],
    sizes: ['8pcs of 5m/box'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },

  // WATERPROOF COATINGS & FLOOR COATINGS
  {
    id: 'dam-coat-ac',
    category: 'coatings',
    name: { en: 'Dam Coat AC', ar: 'دام كوت AC' },
    description: {
      en: 'Acrylic Coating/Membrane for roof waterproofing',
      ar: 'طلاء/غشاء أكريليك لعزل الأسطح المائي'
    },
    pricing: { usd: 40, aed: 147 },
    specifications: ['Acrylic coating', 'UV resistant', 'Elastomeric', 'Breathable'],
    sizes: ['20 Ltr Pail'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    featured: true,
    availability: 'in_stock'
  },
  {
    id: 'dam-coat-apcc',
    category: 'coatings',
    name: { en: 'Dam Coat APCC', ar: 'دام كوت APCC' },
    description: {
      en: 'Acrylic Polymer Cementitious Coating for waterproofing',
      ar: 'طلاء أكريليك بوليمر أسمنتي للعزل المائي'
    },
    pricing: { usd: 45, aed: 165 },
    specifications: ['Two component', 'Polymer modified', 'Cementitious', 'Flexible'],
    sizes: ['Part A 15Kg Bag', 'Part B 5Kg Can'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-coat-rbe',
    category: 'coatings',
    name: { en: 'Dam Coat RBE', ar: 'دام كوت RBE' },
    description: {
      en: 'Rubberized Bitumen Emulsion for waterproofing',
      ar: 'مستحلب بيتومين مطاطي للعزل المائي'
    },
    pricing: { usd: 35, aed: 129 },
    specifications: ['Rubberized', 'Bitumen emulsion', 'Cold applied', 'Easy application'],
    sizes: ['200 Ltr Drum', '20 Ltr Pail'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-coat-puc-blk',
    category: 'coatings',
    name: { en: 'Dam Coat PUC Blk', ar: 'دام كوت PUC أسود' },
    description: {
      en: 'Polyurethane Coating for superior protection',
      ar: 'طلاء البولي يوريثان للحماية الفائقة'
    },
    pricing: { usd: 55, aed: 202 },
    specifications: ['Polyurethane', 'Chemical resistant', 'High durability', 'Black color'],
    sizes: ['20 Ltr Pail'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-coat-putc',
    category: 'coatings',
    name: { en: 'Dam Coat PUTC', ar: 'دام كوت PUTC' },
    description: {
      en: 'Polyurethane Top Coat for finishing',
      ar: 'طلاء البولي يوريثان النهائي للتشطيب'
    },
    pricing: { usd: 60, aed: 220 },
    specifications: ['Top coat', 'UV resistant', 'High gloss', 'Decorative finish'],
    sizes: ['20 Ltr Pail'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-coat-clc',
    category: 'coatings',
    name: { en: 'Dam Coat CLC', ar: 'دام كوت CLC' },
    description: {
      en: 'Crystalline Coating for concrete waterproofing',
      ar: 'طلاء بلوري لعزل الخرسانة المائي'
    },
    pricing: { usd: 50, aed: 184 },
    specifications: ['Crystalline technology', 'Penetrating', 'Self-healing', 'Permanent protection'],
    sizes: ['20 Kg Pail'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-coat-ecc',
    category: 'coatings',
    name: { en: 'Dam Coat ECC', ar: 'دام كوت ECC' },
    description: {
      en: 'Elastomeric Cementitious Coating for waterproofing',
      ar: 'طلاء أسمنتي مرن للعزل المائي'
    },
    pricing: { usd: 45, aed: 165 },
    specifications: ['Elastomeric', 'Cementitious', 'Crack bridging', 'Weather resistant'],
    sizes: ['20 Kg Pail'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-coat-ec',
    category: 'coatings',
    name: { en: 'Dam Coat EC', ar: 'دام كوت EC' },
    description: {
      en: 'Elastomeric Coating for flexible waterproofing',
      ar: 'طلاء مرن للعزل المائي المرن'
    },
    pricing: { usd: 48, aed: 176 },
    specifications: ['Elastomeric', 'Flexible', 'Weather resistant', 'Easy application'],
    sizes: ['20 Kg Pail'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-coat-pc',
    category: 'coatings',
    name: { en: 'Dam Coat PC', ar: 'دام كوت PC' },
    description: {
      en: 'Powder Coating for machine application',
      ar: 'طلاء مسحوق للتطبيق الآلي'
    },
    pricing: { usd: 52, aed: 191 },
    specifications: ['Powder coating', 'Machine applied', 'High performance', 'Durable finish'],
    sizes: ['20 Kg Pail'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-coat-s',
    category: 'coatings',
    name: { en: 'Dam Coat S', ar: 'دام كوت S' },
    description: {
      en: 'Silicone-based Coating for superior protection',
      ar: 'طلاء أساسه السيليكون للحماية الفائقة'
    },
    pricing: { usd: 65, aed: 239 },
    specifications: ['Silicone based', 'UV resistant', 'Breathable', 'Self-cleaning'],
    sizes: ['20 Ltr Pail'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-coat-epc',
    category: 'coatings',
    name: { en: 'Dam Coat EPC', ar: 'دام كوت EPC' },
    description: {
      en: 'Epoxy Coating for chemical resistance',
      ar: 'طلاء إيبوكسي لمقاومة المواد الكيميائية'
    },
    pricing: { usd: 58, aed: 213 },
    specifications: ['Epoxy coating', 'Chemical resistant', 'High strength', 'Industrial grade'],
    sizes: ['20 Kg Pail'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-coat-ccwt',
    category: 'coatings',
    name: { en: 'Dam Coat CCWT', ar: 'دام كوت CCWT' },
    description: {
      en: 'Crystal Clear Waterproofing Transparent Coating',
      ar: 'طلاء شفاف واضح البلور للعزل المائي'
    },
    pricing: { usd: 70, aed: 257 },
    specifications: ['Crystal clear', 'Transparent', 'UV resistant', 'Decorative finish'],
    sizes: ['20 Kg Pail'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-coat-uc',
    category: 'coatings',
    name: { en: 'Dam Coat UC', ar: 'دام كوت UC' },
    description: {
      en: 'Heat Resistant Hybrid Urethane Coating',
      ar: 'طلاء يوريثان هجين مقاوم للحرارة'
    },
    pricing: { usd: 75, aed: 275 },
    specifications: ['Heat resistant', 'Hybrid urethane', 'High temperature', 'Industrial use'],
    sizes: ['20 Ltr Pail'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-coat-ucx',
    category: 'coatings',
    name: { en: 'Dam Coat UCX', ar: 'دام كوت UCX' },
    description: {
      en: 'High Strength Hybrid Urethane Coating',
      ar: 'طلاء يوريثان هجين عالي القوة'
    },
    pricing: { usd: 80, aed: 294 },
    specifications: ['High strength', 'Hybrid urethane', 'Superior performance', 'Premium grade'],
    sizes: ['20 Ltr Pail'],
    image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
    availability: 'in_stock'
  },

  // SEALANTS & SILICON
  {
    id: 'dam-seal-pu',
    category: 'sealants',
    name: { en: 'Dam Seal PU', ar: 'دام سيل PU' },
    description: {
      en: 'Single Component Polyurethane Sealant for joints',
      ar: 'مانع تسرب البولي يوريثان أحادي المكون للمفاصل'
    },
    pricing: { usd: 8, aed: 29 },
    specifications: ['Single component', 'Polyurethane', 'Flexible', 'Weather resistant'],
    sizes: ['600ml sausage', '20pcs/Carton'],
    image: 'https://images.pexels.com/photos/5691661/pexels-photo-5691661.jpeg',
    featured: true,
    availability: 'in_stock'
  },
  {
    id: 'dam-seal-mastic',
    category: 'sealants',
    name: { en: 'Dam Seal Mastic', ar: 'دام سيل ماستيك' },
    description: {
      en: 'Rubberized Bitumen Mastic Sealant for joints',
      ar: 'مانع تسرب ماستيك بيتومين مطاطي للمفاصل'
    },
    pricing: { usd: 25, aed: 92 },
    specifications: ['Rubberized bitumen', 'Mastic consistency', 'Permanent seal', 'Easy application'],
    sizes: ['20 Kg Pail'],
    image: 'https://images.pexels.com/photos/5691661/pexels-photo-5691661.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-seal-ps-2c',
    category: 'sealants',
    name: { en: 'Dam Seal PS (2C)', ar: 'دام سيل PS (2C)' },
    description: {
      en: 'Two Component Polysulphide Sealant for structural joints',
      ar: 'مانع تسرب البولي سلفيد ثنائي المكون للمفاصل الهيكلية'
    },
    pricing: { usd: 45, aed: 165 },
    specifications: ['Two component', 'Polysulphide', 'Structural grade', 'Chemical resistant'],
    sizes: ['4.5 Ltr Kit'],
    image: 'https://images.pexels.com/photos/5691661/pexels-photo-5691661.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-seal-am',
    category: 'sealants',
    name: { en: 'Dam Seal AM', ar: 'دام سيل AM' },
    description: {
      en: 'Acrylic Joint Mastic Sealant for interior applications',
      ar: 'مانع تسرب أكريليك ماستيك للتطبيقات الداخلية'
    },
    pricing: { usd: 22, aed: 80 },
    specifications: ['Acrylic mastic', 'Interior use', 'Paintable', 'Easy clean-up'],
    sizes: ['20 Kg Pail'],
    image: 'https://images.pexels.com/photos/5691661/pexels-photo-5691661.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-seal-fs',
    category: 'sealants',
    name: { en: 'Dam Seal FS', ar: 'دام سيل FS' },
    description: {
      en: 'Fire Rated Acrylic Joint Sealant for fire barriers',
      ar: 'مانع تسرب أكريليك مقاوم للحريق لحواجز الحريق'
    },
    pricing: { usd: 12, aed: 44 },
    specifications: ['Fire rated', 'Acrylic', 'Fire barrier', 'Intumescent'],
    sizes: ['280ml sausage', '310ml sausage'],
    image: 'https://images.pexels.com/photos/5691661/pexels-photo-5691661.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-seal-ws',
    category: 'sealants',
    name: { en: 'Dam Seal WS', ar: 'دام سيل WS' },
    description: {
      en: 'Polyurethane Weather Sealant for exterior joints',
      ar: 'مانع تسرب البولي يوريثان للطقس للمفاصل الخارجية'
    },
    pricing: { usd: 10, aed: 37 },
    specifications: ['Weather sealant', 'Polyurethane', 'UV resistant', 'Exterior use'],
    sizes: ['600ml sausage', '20pcs/Carton'],
    image: 'https://images.pexels.com/photos/5691661/pexels-photo-5691661.jpeg',
    availability: 'in_stock'
  },

  // CONCRETE REPAIR & CRACK INJECTION
  {
    id: 'dam-inject-puir',
    category: 'concrete-repair',
    name: { en: 'Dam Inject PUIR', ar: 'دام إنجكت PUIR' },
    description: {
      en: 'Polyurethane Based Elastomeric Resin for crack injection',
      ar: 'راتنج مرن أساسه البولي يوريثان لحقن الشقوق'
    },
    pricing: { usd: 65, aed: 239 },
    specifications: ['Polyurethane resin', 'Elastomeric', 'Crack injection', 'Flexible cure'],
    sizes: ['5 Ltr Can'],
    image: 'https://images.pexels.com/photos/5691662/pexels-photo-5691662.jpeg',
    featured: true,
    availability: 'in_stock'
  },
  {
    id: 'dam-inject-puif',
    category: 'concrete-repair',
    name: { en: 'Dam Inject PUIF', ar: 'دام إنجكت PUIF' },
    description: {
      en: 'Fast Foaming Polyurethane Injection Foam for water stopping',
      ar: 'رغوة حقن البولي يوريثان سريعة الرغوة لإيقاف المياه'
    },
    pricing: { usd: 70, aed: 257 },
    specifications: ['Fast foaming', 'Polyurethane', 'Water stopping', 'Expanding foam'],
    sizes: ['5 Ltr Can'],
    image: 'https://images.pexels.com/photos/5691662/pexels-photo-5691662.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-inject-ac',
    category: 'concrete-repair',
    name: { en: 'Dam Inject AC', ar: 'دام إنجكت AC' },
    description: {
      en: 'Acrylic Based Injection Resin for crack sealing',
      ar: 'راتنج حقن أساسه الأكريليك لإغلاق الشقوق'
    },
    pricing: { usd: 55, aed: 202 },
    specifications: ['Acrylic resin', 'Low viscosity', 'Deep penetration', 'Flexible'],
    sizes: ['5 Ltr Can'],
    image: 'https://images.pexels.com/photos/5691662/pexels-photo-5691662.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-inject-epir',
    category: 'concrete-repair',
    name: { en: 'Dam Inject EPIR', ar: 'دام إنجكت EPIR' },
    description: {
      en: 'Epoxy Injection Resin for structural crack repair',
      ar: 'راتنج حقن إيبوكسي لإصلاح الشقوق الهيكلية'
    },
    pricing: { usd: 75, aed: 275 },
    specifications: ['Epoxy resin', 'High strength', 'Structural repair', 'Low viscosity'],
    sizes: ['5 Ltr Can'],
    image: 'https://images.pexels.com/photos/5691662/pexels-photo-5691662.jpeg',
    availability: 'in_stock'
  },

  // GRP LINING MATERIALS
  {
    id: 'dam-lining-upr',
    category: 'grp-lining',
    name: { en: 'Dam Lining UPR', ar: 'دام لاينينغ UPR' },
    description: {
      en: 'Unsaturated Polyester Resin for GRP lining systems',
      ar: 'راتنج البولي إستر غير المشبع لأنظمة بطانة GRP'
    },
    pricing: { usd: 85, aed: 312 },
    specifications: ['Unsaturated polyester', 'Chemical resistant', 'High strength', 'Corrosion protection'],
    sizes: ['20 Kg Pail', '220Kg Drum'],
    image: 'https://images.pexels.com/photos/5691663/pexels-photo-5691663.jpeg',
    featured: true,
    availability: 'in_stock'
  },
  {
    id: 'dam-lining-vre',
    category: 'grp-lining',
    name: { en: 'Dam Lining VRE', ar: 'دام لاينينغ VRE' },
    description: {
      en: 'Vinyl Ester Resin for superior chemical resistance',
      ar: 'راتنج الفينيل إستر لمقاومة كيميائية فائقة'
    },
    pricing: { usd: 125, aed: 459 },
    specifications: ['Vinyl ester', 'Superior chemical resistance', 'High performance', 'Corrosion protection'],
    sizes: ['20 Kg Pail', '220Kg Drum'],
    image: 'https://images.pexels.com/photos/5691663/pexels-photo-5691663.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-lining-ep',
    category: 'grp-lining',
    name: { en: 'Dam Lining EP', ar: 'دام لاينينغ EP' },
    description: {
      en: 'Epoxy Resin for high strength GRP applications',
      ar: 'راتنج إيبوكسي لتطبيقات GRP عالية القوة'
    },
    pricing: { usd: 95, aed: 349 },
    specifications: ['Epoxy resin', 'High strength', 'Chemical resistant', 'Low shrinkage'],
    sizes: ['20 Kg Pail', '220Kg Drum'],
    image: 'https://images.pexels.com/photos/5691663/pexels-photo-5691663.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-lining-csm',
    category: 'grp-lining',
    name: { en: 'Dam Lining CSM', ar: 'دام لاينينغ CSM' },
    description: {
      en: 'Chopped Strand Mat for GRP reinforcement',
      ar: 'حصيرة خيوط مقطعة لتعزيز GRP'
    },
    pricing: { usd: 45, aed: 165 },
    specifications: ['Chopped strand mat', 'E-glass fibers', 'Uniform distribution', 'Easy handling'],
    sizes: ['30Kg Roll', '46Kg Roll'],
    image: 'https://images.pexels.com/photos/5691663/pexels-photo-5691663.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-lining-wr',
    category: 'grp-lining',
    name: { en: 'Dam Lining WR', ar: 'دام لاينينغ WR' },
    description: {
      en: 'Woven Roving for high strength GRP laminates',
      ar: 'نسيج منسوج للصفائح GRP عالية القوة'
    },
    pricing: { usd: 55, aed: 202 },
    specifications: ['Woven roving', 'High strength', 'Bidirectional', 'E-glass fibers'],
    sizes: ['46 Kg Roll'],
    image: 'https://images.pexels.com/photos/5691663/pexels-photo-5691663.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-lining-tm-sv',
    category: 'grp-lining',
    name: { en: 'Dam Lining TM/SV', ar: 'دام لاينينغ TM/SV' },
    description: {
      en: 'Tissue Mat / Surface Veil for smooth finish',
      ar: 'حصيرة نسيجية / قناع سطحي للحصول على تشطيب ناعم'
    },
    pricing: { usd: 35, aed: 129 },
    specifications: ['Tissue mat', 'Surface veil', 'Smooth finish', 'Chemical barrier'],
    sizes: ['20 Kg Roll'],
    image: 'https://images.pexels.com/photos/5691663/pexels-photo-5691663.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-lining-gc',
    category: 'grp-lining',
    name: { en: 'Dam Lining GC', ar: 'دام لاينينغ GC' },
    description: {
      en: 'Gelcoat Resin for protective surface coating',
      ar: 'راتنج الجيل كوت للطلاء السطحي الواقي'
    },
    pricing: { usd: 75, aed: 275 },
    specifications: ['Gelcoat resin', 'UV resistant', 'Chemical barrier', 'Decorative finish'],
    sizes: ['20 Kg Pail', '250Kg Drum'],
    image: 'https://images.pexels.com/photos/5691663/pexels-photo-5691663.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-lining-m60',
    category: 'grp-lining',
    name: { en: 'Dam Lining M60', ar: 'دام لاينينغ M60' },
    description: {
      en: 'Hardener for polyester and vinyl ester resins',
      ar: 'مقوي للراتنجات البولي إستر والفينيل إستر'
    },
    pricing: { usd: 25, aed: 92 },
    specifications: ['MEKP hardener', 'Room temperature cure', 'Controlled gel time', 'Professional grade'],
    sizes: ['30 Kg Pail'],
    image: 'https://images.pexels.com/photos/5691663/pexels-photo-5691663.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-lining-td',
    category: 'grp-lining',
    name: { en: 'Dam Lining TD', ar: 'دام لاينينغ TD' },
    description: {
      en: 'Titanium Dioxide Rutile for pigmentation',
      ar: 'ثاني أكسيد التيتانيوم روتيل للتلوين'
    },
    pricing: { usd: 35, aed: 129 },
    specifications: ['Titanium dioxide', 'Rutile grade', 'High opacity', 'Color pigment'],
    sizes: ['50 Kg Bag'],
    image: 'https://images.pexels.com/photos/5691663/pexels-photo-5691663.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-lining-fs',
    category: 'grp-lining',
    name: { en: 'Dam Lining FS', ar: 'دام لاينينغ FS' },
    description: {
      en: 'Fumed Silica for thixotropic properties',
      ar: 'سيليكا مدخنة للخصائص الثيكسوتروبية'
    },
    pricing: { usd: 45, aed: 165 },
    specifications: ['Fumed silica', 'Thixotropic agent', 'Anti-settling', 'Rheology modifier'],
    sizes: ['10 Kg Bag'],
    image: 'https://images.pexels.com/photos/5691663/pexels-photo-5691663.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-lining-filler',
    category: 'grp-lining',
    name: { en: 'Dam Lining Filler', ar: 'دام لاينينغ فيلر' },
    description: {
      en: 'Flexible Filler for gap filling and repairs',
      ar: 'حشو مرن لملء الفجوات والإصلاحات'
    },
    pricing: { usd: 35, aed: 129 },
    specifications: ['Flexible filler', 'Gap filling', 'Easy sanding', 'Repair compound'],
    sizes: ['5 Kg Can'],
    image: 'https://images.pexels.com/photos/5691663/pexels-photo-5691663.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-lining-wax',
    category: 'grp-lining',
    name: { en: 'Dam Lining Wax 10%', ar: 'دام لاينينغ واكس 10%' },
    description: {
      en: 'Surface Additive for air inhibition',
      ar: 'إضافة سطحية لمنع الهواء'
    },
    pricing: { usd: 15, aed: 55 },
    specifications: ['Wax solution', 'Air inhibition', 'Surface additive', '10% concentration'],
    sizes: ['Liquid form'],
    image: 'https://images.pexels.com/photos/5691663/pexels-photo-5691663.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'methyl-acetate-acetone',
    category: 'grp-lining',
    name: { en: 'Methyl Acetate / Acetone', ar: 'أسيتات الميثيل / الأسيتون' },
    description: {
      en: 'Thinner for resin viscosity adjustment',
      ar: 'مخفف لضبط لزوجة الراتنج'
    },
    pricing: { usd: 25, aed: 92 },
    specifications: ['Solvent thinner', 'Viscosity reducer', 'Clean up solvent', 'High purity'],
    sizes: ['20 Kg Pail', '200 Ltr Drum'],
    image: 'https://images.pexels.com/photos/5691663/pexels-photo-5691663.jpeg',
    availability: 'in_stock'
  },

  // REPAIR MORTARS & PLUGGING COMPOUNDS
  {
    id: 'dam-set-wp',
    category: 'repair-mortars',
    name: { en: 'Dam Set WP', ar: 'د��م سيت WP' },
    description: {
      en: 'Instant Leak Plug / Rapid Setting Waterproof Plug',
      ar: 'سدادة تسرب فورية / سدادة مقاومة للماء سريعة التصلب'
    },
    pricing: { usd: 35, aed: 129 },
    specifications: ['Instant setting', 'Waterproof', 'Hydraulic cement', 'Emergency repair'],
    sizes: ['25 Kg Bag'],
    image: 'https://images.pexels.com/photos/5691664/pexels-photo-5691664.jpeg',
    featured: true,
    availability: 'in_stock'
  },
  {
    id: 'dam-rep-mortar',
    category: 'repair-mortars',
    name: { en: 'Dam Rep Mortar', ar: 'دام ريب مورتار' },
    description: {
      en: 'Surface Leveling & Repair Mortar for concrete restoration',
      ar: 'مونة تسوية وإصلاح ال��طح لترميم الخرسانة'
    },
    pricing: { usd: 28, aed: 103 },
    specifications: ['Polymer modified', 'High adhesion', 'Crack resistant', 'Easy application'],
    sizes: ['25 Kg Bag'],
    image: 'https://images.pexels.com/photos/5691664/pexels-photo-5691664.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'dam-fairing-coat',
    category: 'repair-mortars',
    name: { en: 'Dam Fairing Coat', ar: 'دام فيرينغ كوت' },
    description: {
      en: 'Surface Smoothing compound before waterproofing',
      ar: 'مركب تنعيم السطح قبل العزل المائي'
    },
    pricing: { usd: 32, aed: 117 },
    specifications: ['Surface smoothing', 'Pre-waterproofing', 'Easy application', 'Quick drying'],
    sizes: ['25 Kg Bag'],
    image: 'https://images.pexels.com/photos/5691664/pexels-photo-5691664.jpeg',
    availability: 'in_stock'
  },

  // GEOTEXTILES & FABRICS
  {
    id: 'geotextile-woven',
    category: 'geotextiles',
    name: { en: 'Geotextile Woven', ar: 'جيوتكستايل منسوج' },
    description: {
      en: 'Woven Geotextile for separation and reinforcement',
      ar: 'جيوتكستايل منسوج للفصل والتعزيز'
    },
    pricing: { usd: 25, aed: 92 },
    specifications: ['Woven polypropylene', 'High strength', 'Separation', 'Reinforcement'],
    sizes: ['Various widths and lengths'],
    image: 'https://images.pexels.com/photos/5691665/pexels-photo-5691665.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'geotextile-non-woven',
    category: 'geotextiles',
    name: { en: 'Geotextile Non-Woven', ar: 'جيوتكستايل غير منسوج' },
    description: {
      en: 'Non-Woven Geotextile for filtration and drainage',
      ar: 'جيوتكستايل غير منسوج للترشيح والصرف'
    },
    pricing: { usd: 20, aed: 73 },
    specifications: ['Non-woven polyester', 'Filtration', 'Drainage', 'Needle-punched'],
    sizes: ['Various widths and lengths'],
    image: 'https://images.pexels.com/photos/5691665/pexels-photo-5691665.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'protection-fabric',
    category: 'geotextiles',
    name: { en: 'Protection Fabric', ar: 'قماش الحماية' },
    description: {
      en: 'Protection Fabric for membrane safeguarding',
      ar: 'قماش الحماية لحماية الغشاء'
    },
    pricing: { usd: 15, aed: 55 },
    specifications: ['Protective fabric', 'Cushioning', 'Puncture resistant', 'Easy installation'],
    sizes: ['Roll form'],
    image: 'https://images.pexels.com/photos/5691665/pexels-photo-5691665.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'reinforcement-mesh',
    category: 'geotextiles',
    name: { en: 'Reinforcement Mesh', ar: 'شبكة التعزيز' },
    description: {
      en: 'Reinforcement Mesh for structural applications',
      ar: 'شبكة التعزيز للتطبيقات الهيكلية'
    },
    pricing: { usd: 30, aed: 110 },
    specifications: ['High tensile strength', 'Corrosion resistant', 'Easy handling', 'Structural grade'],
    sizes: ['Various mesh sizes'],
    image: 'https://images.pexels.com/photos/5691665/pexels-photo-5691665.jpeg',
    availability: 'in_stock'
  },

  // THERMAL INSULATION & JOINT FILLERS
  {
    id: 'thermal-insulation-boards',
    category: 'thermal-insulation',
    name: { en: 'Thermal Insulation Boards', ar: 'ألواح العزل الحراري' },
    description: {
      en: 'High performance thermal insulation boards',
      ar: 'ألواح عزل حراري عالية الأداء'
    },
    pricing: { usd: 45, aed: 165 },
    specifications: ['High R-value', 'Moisture resistant', 'Fire retardant', 'Easy cutting'],
    sizes: ['Various thicknesses'],
    image: 'https://images.pexels.com/photos/5691666/pexels-photo-5691666.jpeg',
    featured: true,
    availability: 'in_stock'
  },
  {
    id: 'joint-fillers',
    category: 'thermal-insulation',
    name: { en: 'Joint Fillers', ar: 'حشوات المفاصل' },
    description: {
      en: 'Thermal joint fillers for expansion joints',
      ar: 'حشوات مفاصل حرارية لمفاصل التمدد'
    },
    pricing: { usd: 25, aed: 92 },
    specifications: ['Compressible', 'Thermal resistant', 'Easy installation', 'Various densities'],
    sizes: ['Different widths available'],
    image: 'https://images.pexels.com/photos/5691666/pexels-photo-5691666.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'reflective-insulation',
    category: 'thermal-insulation',
    name: { en: 'Reflective Insulation', ar: 'عزل عاكس' },
    description: {
      en: 'Reflective insulation for radiant heat control',
      ar: 'عزل عاكس للتحكم في الحرارة المشعة'
    },
    pricing: { usd: 35, aed: 129 },
    specifications: ['Radiant barrier', 'Aluminum foil', 'Lightweight', 'Easy installation'],
    sizes: ['Roll form'],
    image: 'https://images.pexels.com/photos/5691666/pexels-photo-5691666.jpeg',
    availability: 'in_stock'
  },

  // ALUMINUM FLASHING
  {
    id: 'aluminum-flashing-basic',
    category: 'aluminum-flashing',
    name: { en: 'Aluminum Flashing Basic', ar: 'ألومنيوم وامض أساسي' },
    description: {
      en: 'Basic aluminum flashing for waterproofing details',
      ar: 'ألومنيوم وامض أساسي لتفاصيل العزل المائي'
    },
    pricing: { usd: 15, aed: 55 },
    specifications: ['Aluminum alloy', 'Corrosion resistant', 'Malleable', 'Standard gauge'],
    sizes: ['Various widths'],
    image: 'https://images.pexels.com/photos/5691667/pexels-photo-5691667.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'aluminum-flashing-premium',
    category: 'aluminum-flashing',
    name: { en: 'Aluminum Flashing Premium', ar: 'ألومنيوم وامض ممتاز' },
    description: {
      en: 'Premium aluminum flashing with protective coating',
      ar: 'ألومنيوم وامض ممتاز بطلاء واقي'
    },
    pricing: { usd: 25, aed: 92 },
    specifications: ['Coated aluminum', 'Enhanced protection', 'Long lasting', 'Professional grade'],
    sizes: ['Various widths'],
    image: 'https://images.pexels.com/photos/5691667/pexels-photo-5691667.jpeg',
    availability: 'in_stock'
  },

  // SANDWICH PANELS / GI SHEET / SKY LIGHTS
  {
    id: 'sandwich-panel-pu',
    category: 'sandwich-panels',
    name: { en: 'Sandwich Panel PU', ar: 'لوحة ساندويتش PU' },
    description: {
      en: 'Polyurethane core sandwich panels for insulation',
      ar: 'ألواح ساندويتش بقلب البولي يوريثان للعزل'
    },
    pricing: { usd: 85, aed: 312 },
    specifications: ['PU core', 'High insulation', 'Lightweight', 'Fire retardant'],
    sizes: ['Various thicknesses'],
    image: 'https://images.pexels.com/photos/5691668/pexels-photo-5691668.jpeg',
    featured: true,
    availability: 'in_stock'
  },
  {
    id: 'gi-sheet-standard',
    category: 'sandwich-panels',
    name: { en: 'GI Sheet Standard', ar: 'لوح GI قياسي' },
    description: {
      en: 'Galvanized Iron sheets for roofing and cladding',
      ar: 'ألواح حديد مجلفن للأسقف والكسوة'
    },
    pricing: { usd: 35, aed: 129 },
    specifications: ['Galvanized coating', 'Corrosion resistant', 'Standard gauge', 'Easy installation'],
    sizes: ['Various sizes'],
    image: 'https://images.pexels.com/photos/5691668/pexels-photo-5691668.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'skylight-panels',
    category: 'sandwich-panels',
    name: { en: 'Skylight Panels', ar: 'ألواح إضاءة السقف' },
    description: {
      en: 'Translucent panels for natural lighting',
      ar: 'ألواح شفافة للإضاءة الطبيعية'
    },
    pricing: { usd: 55, aed: 202 },
    specifications: ['Translucent', 'UV resistant', 'Impact resistant', 'Natural lighting'],
    sizes: ['Standard sizes'],
    image: 'https://images.pexels.com/photos/5691668/pexels-photo-5691668.jpeg',
    availability: 'in_stock'
  },

  // CONCRETE & GROUTS
  {
    id: 'specialized-concrete',
    category: 'concrete-grouts',
    name: { en: 'Specialized Concrete', ar: 'خرسانة متخصصة' },
    description: {
      en: 'High performance specialized concrete mixes',
      ar: 'خلطات خرسانة متخصصة عالية الأداء'
    },
    pricing: { usd: 65, aed: 239 },
    specifications: ['High strength', 'Rapid setting', 'Specialized mix', 'Quality assured'],
    sizes: ['Bulk supply'],
    image: 'https://images.pexels.com/photos/5691669/pexels-photo-5691669.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'injection-grout',
    category: 'concrete-grouts',
    name: { en: 'Injection Grout', ar: 'جراوت الحقن' },
    description: {
      en: 'High flow injection grout for structural repairs',
      ar: 'جراوت حقن عالي التدفق للإصلاحات الهيكلية'
    },
    pricing: { usd: 45, aed: 165 },
    specifications: ['High flow', 'Non-shrink', 'High strength', 'Structural grade'],
    sizes: ['25 Kg Bag'],
    image: 'https://images.pexels.com/photos/5691669/pexels-photo-5691669.jpeg',
    availability: 'in_stock'
  },

  // TILES
  {
    id: 'tile-adhesive',
    category: 'tiles',
    name: { en: 'Tile Adhesive', ar: 'لاصق البلاط' },
    description: {
      en: 'High performance tile adhesive for all applications',
      ar: 'لاصق بلاط عالي الأداء لجميع التطبيقات'
    },
    pricing: { usd: 25, aed: 92 },
    specifications: ['Polymer modified', 'Water resistant', 'High bond strength', 'Easy mixing'],
    sizes: ['25 Kg Bag'],
    image: 'https://images.pexels.com/photos/5691670/pexels-photo-5691670.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'tile-grout',
    category: 'tiles',
    name: { en: 'Tile Grout', ar: 'جراوت البلاط' },
    description: {
      en: 'Premium tile grout for joint filling',
      ar: 'جراوت بلاط ممتاز لملء المفاصل'
    },
    pricing: { usd: 15, aed: 55 },
    specifications: ['Stain resistant', 'Color stable', 'Easy application', 'Durable finish'],
    sizes: ['5 Kg Bag'],
    image: 'https://images.pexels.com/photos/5691670/pexels-photo-5691670.jpeg',
    availability: 'in_stock'
  },

  // GRAVEL
  {
    id: 'drainage-gravel',
    category: 'gravel',
    name: { en: 'Drainage Gravel', ar: 'حصى الصرف' },
    description: {
      en: 'Graded gravel for drainage applications',
      ar: 'حصى مدرج لتطبيقات الصرف'
    },
    pricing: { usd: 35, aed: 129 },
    specifications: ['Graded sizes', 'Clean washed', 'Free draining', 'Angular stones'],
    sizes: ['Per cubic meter'],
    image: 'https://images.pexels.com/photos/5691671/pexels-photo-5691671.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'decorative-gravel',
    category: 'gravel',
    name: { en: 'Decorative Gravel', ar: 'حصى زخرفي' },
    description: {
      en: 'Decorative gravel for landscaping',
      ar: 'حصى زخرفي لتنسيق الحدائق'
    },
    pricing: { usd: 45, aed: 165 },
    specifications: ['Various colors', 'Uniform size', 'Decorative', 'Low maintenance'],
    sizes: ['Per cubic meter'],
    image: 'https://images.pexels.com/photos/5691671/pexels-photo-5691671.jpeg',
    availability: 'in_stock'
  },

  // LANDSCAPING PRODUCTS
  {
    id: 'landscape-fabric',
    category: 'landscaping',
    name: { en: 'Landscape Fabric', ar: 'قماش تنسيق الحدائق' },
    description: {
      en: 'Landscape fabric for weed control',
      ar: 'قماش تنسيق الحدائق لمكافحة الأعشاب'
    },
    pricing: { usd: 25, aed: 92 },
    specifications: ['Weed barrier', 'Water permeable', 'UV resistant', 'Easy installation'],
    sizes: ['Roll form'],
    image: 'https://images.pexels.com/photos/5691672/pexels-photo-5691672.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'drainage-pipes',
    category: 'landscaping',
    name: { en: 'Drainage Pipes', ar: 'أنابيب الصرف' },
    description: {
      en: 'Perforated drainage pipes for landscaping',
      ar: 'أنابيب صرف مثقبة لتنسيق الحدائق'
    },
    pricing: { usd: 15, aed: 55 },
    specifications: ['Perforated', 'Flexible', 'Corrosion resistant', 'Easy installation'],
    sizes: ['Various diameters'],
    image: 'https://images.pexels.com/photos/5691672/pexels-photo-5691672.jpeg',
    availability: 'in_stock'
  },

  // TOOLS & MISCELLANEOUS ITEMS
  {
    id: 'application-tools',
    category: 'tools-accessories',
    name: { en: 'Application Tools', ar: 'أدوات التطبيق' },
    description: {
      en: 'Professional tools for waterproofing application',
      ar: 'أدوات مهنية لتطبيق العزل المائي'
    },
    pricing: { usd: 45, aed: 165 },
    specifications: ['Professional grade', 'Durable construction', 'Easy handling', 'Complete set'],
    sizes: ['Tool set'],
    image: 'https://images.pexels.com/photos/5691673/pexels-photo-5691673.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'safety-equipment',
    category: 'tools-accessories',
    name: { en: 'Safety Equipment', ar: 'معدات السلامة' },
    description: {
      en: 'Safety equipment for construction work',
      ar: 'معدات السلامة لأعمال البناء'
    },
    pricing: { usd: 35, aed: 129 },
    specifications: ['Safety certified', 'High visibility', 'Comfortable fit', 'Durable materials'],
    sizes: ['Various sizes'],
    image: 'https://images.pexels.com/photos/5691673/pexels-photo-5691673.jpeg',
    availability: 'in_stock'
  },
  {
    id: 'measuring-instruments',
    category: 'tools-accessories',
    name: { en: 'Measuring Instruments', ar: 'أدوات القياس' },
    description: {
      en: 'Precision measuring instruments for construction',
      ar: 'أدوات قياس دقيقة للبناء'
    },
    pricing: { usd: 55, aed: 202 },
    specifications: ['High precision', 'Digital display', 'Calibrated', 'Professional grade'],
    sizes: ['Instrument set'],
    image: 'https://images.pexels.com/photos/5691673/pexels-photo-5691673.jpeg',
    availability: 'in_stock'
  }
];

// Export featured products as a constant for compatibility
export const featuredProducts = allProducts.filter(product => product.featured === true);

// Helper functions
export function getAllProducts(): Product[] {
  return allProducts;
}

export function getProductsByCategory(categoryId: string): Product[] {
  return allProducts.filter(product => product.category === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return allProducts.filter(product => product.featured === true);
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find(product => product.id === id);
}

export function getProductCategories(): ProductCategory[] {
  return productCategories;
}

export function getCategoryById(id: string): ProductCategory | undefined {
  return productCategories.find(category => category.id === id);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return allProducts.filter(product => 
    product.name.en.toLowerCase().includes(lowercaseQuery) ||
    product.name.ar.includes(lowercaseQuery) ||
    product.description.en.toLowerCase().includes(lowercaseQuery) ||
    product.description.ar.includes(lowercaseQuery) ||
    product.specifications?.some(spec => spec.toLowerCase().includes(lowercaseQuery))
  );
}

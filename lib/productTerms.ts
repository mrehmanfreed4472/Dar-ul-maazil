/**
 * Mapping of technical terms to user-friendly explanations
 */

interface TermExplanation {
  en: string;
  ar: string;
}

export const TECH_EXPLANATIONS: Record<string, TermExplanation> = {
  'APP': {
    en: 'APP = Advanced polymer. Better heat resistance for exposed roofs.',
    ar: 'APP = بوليمر متقدم. مقاومة حرارة أفضل للأسطح المكشوفة.'
  },
  'GSM': {
    en: 'GSM = Grams per square meter. Higher = thicker/heavier material.',
    ar: 'GSM = جرام لكل متر مربع. أعلى = مادة أثقل/أسمك.'
  },
  'Torch applied': {
    en: 'Applied with heat torch - requires professional installer.',
    ar: 'يطبق بلهب الحرارة - يتطلب مثبت محترف.'
  },
  'Polyester reinforced': {
    en: 'Reinforced with polyester fabric for extra strength.',
    ar: 'مقوى بقماش البوليستر لقوة إضافية.'
  },
  'Self-adhesive': {
    en: 'Sticks on its own - no heat or flame needed.',
    ar: 'يلتصق بنفسه - لا حاجة للحرارة أو اللهب.'
  },
  'Bituminous': {
    en: 'Bitumen-based waterproof material.',
    ar: 'مادة مقاومة للماء أساسها البيتومين.'
  },
  'SBS': {
    en: 'SBS = Flexible polymer for better cold weather performance.',
    ar: 'SBS = بوليمر مرن لأداء أفضل في الطقس البارد.'
  },
  'UV stable': {
    en: 'Resists sun damage and color fading.',
    ar: 'يقاوم أضرار الشمس وبهتان اللون.'
  },
  'Heat resistant': {
    en: 'Can handle high temperatures without damage.',
    ar: 'يتحمل درجات الحرارة العالية بدون ضرر.'
  },
  'Chemical resistant': {
    en: 'Resists damage from chemicals and acids.',
    ar: 'يقاوم الأضرار من المواد الكيميائية والأحماض.'
  },
  'Heavy duty': {
    en: 'Extra strong for demanding applications.',
    ar: 'قوة إضافية للتطبيقات الصعبة.'
  },
  'PVC': {
    en: 'PVC = Durable plastic material.',
    ar: 'PVC = مادة بلاستيكية متينة.'
  },
  'HDPE': {
    en: 'HDPE = High-density plastic - very strong.',
    ar: 'HDPE = بلاستيك عالي الكثافة - قوي جداً.'
  },
  'EPDM': {
    en: 'EPDM = Rubber membrane - flexible and durable.',
    ar: 'EPDM = غشاء مطاطي - مرن وم��ين.'
  }
};

/**
 * Extract technical term from specification string
 */
export const extractTechTerm = (spec: string): string | null => {
  const specLower = spec.toLowerCase();
  
  for (const term of Object.keys(TECH_EXPLANATIONS)) {
    if (specLower.includes(term.toLowerCase())) {
      return term;
    }
  }
  
  return null;
};

/**
 * Get user-friendly explanation for a technical term
 */
export const getTechExplanation = (term: string, language: 'en' | 'ar'): string | null => {
  const termKey = extractTechTerm(term);
  if (!termKey || !TECH_EXPLANATIONS[termKey]) {
    return null;
  }
  
  return TECH_EXPLANATIONS[termKey][language];
};

/**
 * Convert technical specifications to user-friendly format
 */
export const friendlySpec = (spec: string, language: 'en' | 'ar'): string => {
  // Convert common patterns to friendly format
  if (spec.includes('GSM:')) {
    const gsm = spec.match(/GSM:\s*(\d+)/)?.[1];
    return language === 'en' 
      ? `Weight: ${gsm} GSM`
      : `الوزن: ${gsm} جرام/م²`;
  }
  
  if (spec.includes('Thickness:')) {
    const thickness = spec.match(/Thickness:\s*([^\s]+)/)?.[1];
    return language === 'en'
      ? `Thickness: ${thickness}`
      : `السماكة: ${thickness}`;
  }
  
  if (spec.includes('mm') && !spec.includes('Thickness')) {
    return language === 'en'
      ? spec.replace('mm', ' mm thick')
      : spec.replace('mm', ' مم سماكة');
  }
  
  // Return original if no pattern matches
  return spec;
};

/**
 * Get installation difficulty level
 */
export const getInstallationDifficulty = (specifications: string[]): {
  level: 'Easy' | 'Moderate' | 'Professional';
  label: { en: string; ar: string };
} => {
  const specs = specifications.join(' ').toLowerCase();
  
  if (specs.includes('torch') || specs.includes('hot application')) {
    return {
      level: 'Professional',
      label: { en: 'Professional Install', ar: 'تركيب محترف' }
    };
  }
  
  if (specs.includes('self-adhesive') || specs.includes('peel')) {
    return {
      level: 'Easy',
      label: { en: 'DIY Friendly', ar: 'سهل التركيب' }
    };
  }
  
  return {
    level: 'Moderate',
    label: { en: 'Moderate Skill', ar: 'مهارة متوسطة' }
  };
};

/**
 * Get recommended use based on specifications and features
 */
export const getRecommendedUse = (applications: string[], language: 'en' | 'ar'): string[] => {
  const apps = applications.join(' ').toLowerCase();
  const recommendations = [];
  
  if (apps.includes('roof')) {
    recommendations.push(language === 'en' ? 'Roofs' : 'الأسطح');
  }
  
  if (apps.includes('foundation') || apps.includes('basement')) {
    recommendations.push(language === 'en' ? 'Foundations' : 'الأساسات');
  }
  
  if (apps.includes('balcony') || apps.includes('terrace')) {
    recommendations.push(language === 'en' ? 'Balconies' : 'الشرفات');
  }
  
  if (apps.includes('green roof') || apps.includes('garden')) {
    recommendations.push(language === 'en' ? 'Gardens' : 'الحدائق');
  }
  
  return recommendations.length > 0 ? recommendations : 
    [language === 'en' ? 'General Use' : 'الاستخدام العام'];
};

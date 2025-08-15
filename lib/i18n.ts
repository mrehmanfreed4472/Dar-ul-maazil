export type Language = 'en' | 'ar';
export type Currency = 'USD' | 'AED';

export interface Translation {
  [key: string]: string | Translation;
}

export const translations: Record<Language, Translation> = {
  en: {
    nav: {
    home: 'Home',
    products: 'Products',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    order: 'Order Now'
  },
    hero: {
      title: 'Premium Waterproofing & Insulation Materials',
      subtitle: 'Dar Al Muaazil - Your trusted partner for construction excellence in the UAE',
      description: 'Supplying high-quality waterproofing and insulation materials that meet UAE standards. Based in Sharjah, serving construction professionals across the Emirates.',
      cta: 'View Products',
      standards: 'UAE Standards Compliant'
    },
    categories: {
      title: 'Product Categories',
      subtitle: 'Comprehensive range of construction materials',
      viewMore: 'View More'
    },
    common: {
      currency: 'USD',
      addToOrder: 'Add to Order',
      laborServices: 'Add Labor Services',
      contactUs: 'Contact Us',
      orderNow: 'Order Now',
      whatsapp: 'WhatsApp',
      email: 'Email'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      products: 'المنتجات',
      services: 'الخدمات',
      about: 'حول',
      contact: 'اتصل',
      order: 'اطلب الآن'
    },
    hero: {
      title: 'مواد عز�� ومقاومة الماء الممتازة',
      subtitle: 'دار المعازل - شريككم الموثوق للتميز في البناء في دولة الإمارات',
      description: 'توفير مواد عزل ومقاومة الماء عالية الجودة التي تلبي معايير دولة الإمارات. مقرنا في الشارقة، نخدم متخصصي البناء في جميع أنحاء الإمارات.',
      cta: 'عرض المنتجات',
      standards: 'متوافق مع معايير دولة الإمارات'
    },
    categories: {
      title: 'فئات المنتجات',
      subtitle: 'مجموعة شاملة من مواد البناء',
      viewMore: 'عرض المزيد'
    },
    common: {
      currency: 'AED',
      addToOrder: 'إضافة للطلب',
      laborServices: 'إضافة خدمات العمالة',
      contactUs: 'اتصل بنا',
      orderNow: 'اطلب الآن',
      whatsapp: 'واتساب',
      email: 'البريد الإلكتروني'
    }
  }
};

export class I18n {
  private static instance: I18n;
  private currentLanguage: Language = 'en';
  private listeners: Array<(lang: Language) => void> = [];

  static getInstance(): I18n {
    if (!I18n.instance) {
      I18n.instance = new I18n();
    }
    return I18n.instance;
  }

  getLanguage(): Language {
    return this.currentLanguage;
  }

  setLanguage(lang: Language): void {
    this.currentLanguage = lang;
    this.updateDocumentDirection();
    this.listeners.forEach(listener => listener(lang));
  }

  subscribe(listener: (lang: Language) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  t(key: string): string {
    const keys = key.split('.');
    let value: string | Translation = translations[this.currentLanguage];

    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  }

  isRTL(): boolean {
    return this.currentLanguage === 'ar';
  }

  getCurrency(): Currency {
    return this.currentLanguage === 'ar' ? 'AED' : 'USD';
  }

  private updateDocumentDirection(): void {
    document.documentElement.dir = this.isRTL() ? 'rtl' : 'ltr';
    document.documentElement.lang = this.currentLanguage;
  }
}

export const i18n = I18n.getInstance();

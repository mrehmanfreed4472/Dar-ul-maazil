import { useState, useEffect } from 'react';
import { i18n, Language } from '@/lib/i18n';

export function useTranslation() {
  const [language, setLanguage] = useState<Language>(i18n.getLanguage());

  useEffect(() => {
    const unsubscribe = i18n.subscribe((lang) => {
      setLanguage(lang);
    });

    return unsubscribe;
  }, []);

  return {
    t: i18n.t.bind(i18n),
    language,
    setLanguage: i18n.setLanguage.bind(i18n),
    isRTL: i18n.isRTL.bind(i18n),
    getCurrency: i18n.getCurrency.bind(i18n)
  };
}

import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export function LanguageToggle() {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Button
      variant="default"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold border border-purple-400/50 shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">
        {language === 'en' ? 'العربية' : 'English'}
      </span>
    </Button>
  );
}

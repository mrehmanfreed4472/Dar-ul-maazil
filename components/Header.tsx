import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, ShoppingCart, User, Crown, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useTranslation } from '@/hooks/use-translation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, isRTL } = useTranslation();
  const { getCartCount } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const pathname = usePathname();
  const cartCount = getCartCount();

  const navigation = [
    { href: '/', label: t('nav.home'), icon: Sparkles },
    { href: '/products', label: t('nav.products'), icon: Star },
    { href: '/services', label: isRTL() ? 'الخدمات' : 'Services', icon: Crown },
    { href: '/about', label: t('nav.about'), icon: Star },
    { href: '/contact', label: t('nav.contact'), icon: Star },
  ];

  const isActivePage = (href: string) => {
    return pathname === href;
  };

  return (
    <header className="glass-effect border-b border-border/20 sticky top-0 z-50 premium-shadow">
      {/* Top bar */}
      <div className="border-b border-border/10 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>+971502342218</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <span>info@damgcc.com</span>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fbe317009bb644e719e7cd7d209bca9da%2F67167a1a0cc54f238afbf6ce93798062?format=webp&width=200"
              alt="DAM - The House of Insulation"
              className="h-12 w-auto object-contain premium-shadow rounded-lg"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-foreground">DAM</span>
              <span className="text-sm text-muted-foreground font-medium">
                {isRTL() ? 'بيت العزل' : 'The House of Insulation'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button asChild className="gradient-primary text-white font-semibold px-6 premium-shadow hover:premium-shadow-lg transition-all duration-300 hover:scale-105">
              <Link href="/order">{t('nav.order')}</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/40 py-4">
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Button asChild className="w-full gradient-primary text-white font-semibold premium-shadow">
                  <Link href="/order">{t('nav.order')}</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

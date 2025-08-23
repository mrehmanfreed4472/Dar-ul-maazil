'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, ShoppingCart, User, Crown, Home, Package, Star, LogOut, Settings, FileText, Briefcase, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useTranslation } from '@/hooks/use-translation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { DAMLogo } from '@/components/DAMLogo';

export function HeaderEnhanced() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, isRTL } = useTranslation();
  const { getCartCount } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const pathname = usePathname();
  const cartCount = getCartCount();

  const navigation = [
    { href: '/', label: t('nav.home'), icon: Home },
    { href: '/products', label: t('nav.products'), icon: Package },
    { href: '/services', label: isRTL() ? 'الخدمات' : 'Services', icon: Briefcase },
    { href: '/about', label: t('nav.about'), icon: Info },
    { href: '/contact', label: t('nav.contact'), icon: Mail },
  ];

  const isActivePage = (href: string) => {
    return pathname === href;
  };

  return (
    <header className={`sticky top-0 z-50 bg-white shadow-md border-b border-gray-200 ${isRTL() ? 'rtl' : 'ltr'}`}>
      {/* Top bar with contact info */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a
                href="https://wa.me/971502342218"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Phone className="h-4 w-4" />
                <span className="font-medium">+971502342218</span>
              </a>

              <a
                href="mailto:info@damgcc.com"
                className="flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Mail className="h-4 w-4" />
                <span className="font-medium">info@damgcc.com</span>
              </a>
            </div>

            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <DAMLogo
            size="lg"
            href="/"
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    isActivePage(item.href)
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-700 hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* User Actions */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 hover:border-primary hover:bg-primary/10"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user.name}
                    {isAdmin() && <Crown className="h-4 w-4 ml-2 text-yellow-500" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border-gray-200">
                  {isAdmin() && (
                    <>
                      <DropdownMenuItem>
                        <Link href="/admin" className="flex items-center">
                          <Settings className="h-4 w-4 mr-2" />
                          {isRTL() ? 'لوحة الإدارة' : 'Admin Panel'}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    {isRTL() ? 'تسجيل الخروج' : 'Logout'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <User className="h-4 w-4 mr-2" />
                  {isRTL() ? 'تسجيل الدخول' : 'Login'}
                </Button>
              </Link>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Cart Button */}
              <Link href="/cart">
                <Button 
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {isRTL() ? 'السلة' : 'Cart'}
                  {cartCount > 0 && (
                    <Badge className="ml-2 bg-accent text-white text-xs">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Order Button */}
              <Link href="/order">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {isRTL() ? 'طلب' : 'Order'}
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden border-gray-300 hover:border-primary hover:bg-primary/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200 py-4 bg-gray-50"
            >
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                        isActivePage(item.href)
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:text-primary hover:bg-primary/10'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                <div className="px-2 pt-4 space-y-2">
                  {user ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {isRTL() ? 'خروج' : 'Logout'}
                    </Button>
                  ) : (
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        <User className="h-4 w-4 mr-2" />
                        {isRTL() ? 'دخول' : 'Login'}
                      </Button>
                    </Link>
                  )}
                  
                  <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {isRTL() ? 'السلة' : 'Cart'}
                      {cartCount > 0 && (
                        <Badge className="ml-2 bg-accent text-white">
                          {cartCount}
                        </Badge>
                      )}
                    </Button>
                  </Link>

                  <Link href="/order" onClick={() => setIsMenuOpen(false)}>
                    <Button 
                      variant="outline" 
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {isRTL() ? 'طلب مخصص' : 'Custom Order'}
                    </Button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

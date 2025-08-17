'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, ShoppingCart, User, Crown, Home, Package, Star, LogOut, Settings, FileText } from 'lucide-react';
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
    { href: '/services', label: isRTL() ? 'الخدمات' : 'Services', icon: Star },
    { href: '/about', label: t('nav.about'), icon: Star },
    { href: '/contact', label: t('nav.contact'), icon: Mail },
  ];

  const isActivePage = (href: string) => {
    return pathname === href;
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200 ${isRTL() ? 'rtl' : 'ltr'}`}
    >
      {/* Top bar with contact info */}
      <div className="navbar-gradient text-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <Phone className="h-4 w-4 text-orange-200 animate-pulse" />
                <span className="font-medium group-hover:text-orange-100 transition-colors">
                  +971502342218
                </span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <Mail className="h-4 w-4 text-green-200 animate-pulse" />
                <span className="font-medium group-hover:text-green-100 transition-colors">
                  info@damgcc.com
                </span>
              </motion.div>
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
            animated={true}
            interactive={true}
            href="/"
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      isActivePage(item.href)
                        ? 'gradient-orange-green text-white shadow-md neon-orange-green'
                        : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* User Actions */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                    >
                      <User className="h-4 w-4 mr-2" />
                      {user.name}
                      {isAdmin() && <Crown className="h-4 w-4 ml-2 text-yellow-500" />}
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border-gray-200">
                  {isAdmin() && (
                    <>
                      <DropdownMenuItem>
                        <Link href="/admin" className="flex items-center">
                          <Settings className="h-4 w-4 mr-2" />
                          {isRTL() ? '��وحة الإدارة' : 'Admin Panel'}
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
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="button-green border-green-300 text-white hover:text-white transition-colors shadow-md"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {isRTL() ? 'تسجيل الدخول' : 'Login'}
                  </Button>
                </Link>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Cart Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/cart">
                  <Button 
                    size="sm"
                    className="button-green text-white shadow-md animate-green-glow neon-green"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {isRTL() ? 'السلة' : 'Cart'}
                    {cartCount > 0 && (
                      <Badge className="ml-2 bg-orange-500 text-white text-xs">
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </motion.div>

              {/* Order Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/order">
                  <Button
                    size="sm"
                    className="button-green hover:gradient-green text-white shadow-md animate-green-glow"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {isRTL() ? 'طلب' : 'Order'}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              size="sm"
              className="md:hidden border-gray-300 hover:border-green-400 hover:bg-green-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </Button>
          </motion.div>
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
                {navigation.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                          isActivePage(item.href)
                            ? 'gradient-orange-green text-white shadow-md neon-orange-green'
                            : 'text-gray-700 hover:text-green-400 hover:bg-green-50'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
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
                        className="w-full button-green border-green-300 text-white hover:text-white shadow-md"
                      >
                        <User className="h-4 w-4 mr-2" />
                        {isRTL() ? 'دخول' : 'Login'}
                      </Button>
                    </Link>
                  )}
                  
                  <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full button-green text-white animate-green-glow neon-green">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {isRTL() ? 'السلة' : 'Cart'}
                      {cartCount > 0 && (
                        <Badge className="ml-2 bg-orange-500 text-white">
                          {cartCount}
                        </Badge>
                      )}
                    </Button>
                  </Link>

                  <Link href="/order" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full button-green hover:gradient-green text-white animate-green-glow">
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
    </motion.header>
  );
}

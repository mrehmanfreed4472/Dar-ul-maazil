import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, ShoppingCart, User, Crown, Sparkles, Star, LogOut, Settings, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useTranslation } from '@/hooks/use-translation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export function HeaderEnhanced() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, isRTL } = useTranslation();
  const { getCartCount } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const cartCount = getCartCount();

  const navigation = [
    { href: '/', label: t('nav.home'), icon: Sparkles },
    { href: '/products', label: t('nav.products'), icon: Star },
    { href: '/services', label: isRTL() ? 'الخدمات' : 'Services', icon: Crown },
    { href: '/about', label: t('nav.about'), icon: Star },
    { href: '/contact', label: t('nav.contact'), icon: Star },
  ];

  const isActivePage = (href: string) => {
    return location.pathname === href;
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-card border-b border-border/20 sticky top-0 z-50 premium-shadow-lg"
    >
      {/* Top bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="border-b border-border/10 premium-gradient"
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4 text-white/90">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-3 w-3" />
                <span>+971502342218</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-3 w-3" />
                <span>info@damgcc.com</span>
              </motion.div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </motion.div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fbe317009bb644e719e7cd7d209bca9da%2F36ff582146184a53971e36b118d53fc5?format=webp&width=800"
                  alt="DAM - The House of Insulation - Dar Al Muaazil LLC"
                  className="h-12 w-auto object-contain"
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isActivePage(item.href)
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'text-foreground hover:text-primary hover:bg-primary/10'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">

            {/* User Actions */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass-card hover:bg-primary/10 border-primary/30"
                    >
                      <User className="h-4 w-4 mr-2" />
                      {user.name}
                      {isAdmin() && <Crown className="h-4 w-4 ml-2 text-accent" />}
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card border-primary/30">
                  {isAdmin() && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center">
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
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass-card hover:bg-primary/10 border-primary/30"
                  asChild
                >
                  <Link to="/login">
                    <User className="h-4 w-4 mr-2" />
                    {isRTL() ? 'تسجيل الدخول' : 'Login'}
                  </Link>
                </Button>
              </motion.div>
            )}

            {/* Primary Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Go to Cart Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  className="premium-gradient text-white font-semibold px-6 premium-shadow-lg neon-border transition-all duration-300"
                >
                  <Link to="/cart">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {isRTL() ? 'عرض السلة' : 'View Cart'}
                    {cartCount > 0 && (
                      <Badge className="ml-2 bg-yellow-400 text-black">
                        {cartCount}
                      </Badge>
                    )}
                  </Link>
                </Button>
              </motion.div>

              {/* Quick Order (Secondary) */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10"
                >
                  <Link to="/order">
                    <FileText className="h-4 w-4 mr-2" />
                    {isRTL() ? 'طلب مخصص' : 'Custom Order'}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
              className="md:hidden border-t border-border/40 py-4"
            >
              <nav className="flex flex-col gap-4">
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
                        to={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                          isActivePage(item.href)
                            ? 'bg-primary/20 text-primary border border-primary/30'
                            : 'text-foreground hover:text-primary hover:bg-primary/10'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
                
                <div className="flex gap-3 px-4 pt-2">
                  {user ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full glass-card"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {isRTL() ? 'خروج' : 'Logout'}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full glass-card"
                      asChild
                    >
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        <User className="h-4 w-4 mr-2" />
                        {isRTL() ? 'دخول' : 'Login'}
                      </Link>
                    </Button>
                  )}
                </div>
                
                <div className="px-4 space-y-3">
                  <Button
                    asChild
                    className="w-full premium-gradient text-white font-semibold premium-shadow"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/cart">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {isRTL() ? 'عرض السلة' : 'View Cart'}
                      {cartCount > 0 && (
                        <Badge className="ml-2 bg-yellow-400 text-black">
                          {cartCount}
                        </Badge>
                      )}
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/order">
                      <FileText className="h-4 w-4 mr-2" />
                      {isRTL() ? 'طلب مخصص' : 'Custom Order'}
                    </Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 shadow-xl backdrop-blur-lg relative overflow-hidden ${isRTL() ? 'rtl' : 'ltr'}`}
    >
      {/* Enhanced floating particles background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 4 === 0
                ? "w-1 h-1 bg-green-300/40"
                : i % 4 === 1
                ? "w-2 h-2 bg-emerald-300/30"
                : i % 4 === 2
                ? "w-1.5 h-1.5 bg-green-200/25"
                : "w-0.5 h-0.5 bg-green-400/50"
            }`}
            animate={{
              x: [0, 180 + (i % 4) * 40, 0],
              y: [0, -100 + (i % 3) * 30, 0],
              opacity: [0.1, 0.9, 0.1],
              scale: [0.5, 2.2, 0.5],
              rotate: [0, 720, 0],
            }}
            transition={{
              duration: 5 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
            style={{
              left: `${3 + i * 6.5}%`,
              top: `${5 + (i % 5) * 18}%`,
            }}
          />
        ))}

        {/* Enhanced wave effects */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/8 to-transparent"
          animate={{
            x: ["-120%", "120%"],
            opacity: [0, 0.7, 0],
            scaleY: [1, 1.5, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary wave effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-l from-transparent via-emerald-400/6 to-transparent"
          animate={{
            x: ["120%", "-120%"],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Sparkle effects */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut",
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>
      {/* Enhanced Top bar with color changing effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          background: [
            "linear-gradient(90deg, #059669, #10b981, #34d399, #10b981, #059669)",
            "linear-gradient(90deg, #7c3aed, #a855f7, #c084fc, #a855f7, #7c3aed)",
            "linear-gradient(90deg, #dc2626, #ef4444, #f87171, #ef4444, #dc2626)",
            "linear-gradient(90deg, #ea580c, #f97316, #fb923c, #f97316, #ea580c)",
            "linear-gradient(90deg, #059669, #10b981, #34d399, #10b981, #059669)"
          ]
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.2 },
          background: {
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }
        }}
        className="border-b border-white/20 relative overflow-hidden"
      >
        {/* Animated background overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating light effects */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            animate={{
              x: [0, 100 + i * 20, 0],
              y: [0, -10 + i * 2, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
            style={{
              left: `${10 + i * 20}%`,
              top: `50%`,
            }}
          />
        ))}

        <div className="container mx-auto px-4 py-3 relative z-10">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6 text-white">
              <motion.div
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  textShadow: "0 0 8px rgba(255,255,255,0.8)"
                }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Phone className="h-4 w-4" />
                </motion.div>
                <motion.span
                  className="font-medium group-hover:text-yellow-200 transition-colors"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 5px rgba(255,255,255,0.5)",
                      "0 0 0px rgba(255,255,255,0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  +971502342218
                </motion.span>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  textShadow: "0 0 8px rgba(255,255,255,0.8)"
                }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotateY: [0, 180, 360]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Mail className="h-4 w-4" />
                </motion.div>
                <motion.span
                  className="font-medium group-hover:text-yellow-200 transition-colors"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 5px rgba(255,255,255,0.5)",
                      "0 0 0px rgba(255,255,255,0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  info@damgcc.com
                </motion.span>
              </motion.div>
            </div>

            {/* Enhanced Language Toggle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(255,255,255,0)",
                    "0 0 20px rgba(255,255,255,0.3)",
                    "0 0 0px rgba(255,255,255,0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="rounded-full"
              >
                <LanguageToggle />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{
              scale: 1.08,
              filter: "drop-shadow(0 0 25px rgba(34, 197, 94, 0.8))"
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  rotate: [0, -3, 3, 0],
                  y: [-2, 2, -2, 0],
                }}
                transition={{
                  duration: 0.4,
                  rotate: { duration: 0.6, ease: "easeInOut" },
                  y: { duration: 0.8, ease: "easeInOut" }
                }}
                className="flex items-center relative"
              >
                <motion.div
                  className="absolute inset-0 bg-green-400/30 rounded-xl blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fbe317009bb644e719e7cd7d209bca9da%2F36ff582146184a53971e36b118d53fc5?format=webp&width=800"
                  alt="DAM - The House of Insulation - Dar Al Muaazil LLC"
                  className="h-12 w-auto object-contain relative z-10 filter drop-shadow-lg"
                  animate={{
                    filter: [
                      "brightness(1) saturate(1)",
                      "brightness(1.1) saturate(1.2)",
                      "brightness(1) saturate(1)"
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
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
                  whileHover={{
                    scale: 1.08,
                    y: -4,
                    rotateX: 5,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.92, y: 0 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-300 relative overflow-hidden group border-2 ${
                      isActivePage(item.href)
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl shadow-green-500/40 border-green-500 scale-105'
                        : 'text-gray-800 bg-gray-100/80 hover:text-white hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600 hover:shadow-xl hover:shadow-green-500/30 border-gray-300 hover:border-green-500 hover:scale-105'
                    }`}
                  >
                    <motion.div
                      animate={{
                        rotate: isActivePage(item.href) ? [0, 8, -8, 0] : 0,
                        scale: isActivePage(item.href) ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 3,
                        repeat: isActivePage(item.href) ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                      whileHover={{
                        rotate: 15,
                        scale: 1.2,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <Icon className="h-5 w-5 transition-all duration-300 drop-shadow-lg" />
                    </motion.div>
                    <motion.span
                      whileHover={{
                        x: 3,
                        textShadow: "0 0 8px rgba(255,255,255,0.8)",
                        transition: { duration: 0.2 }
                      }}
                      animate={{
                        textShadow: isActivePage(item.href)
                          ? ["0 0 0px rgba(255,255,255,0)", "0 0 10px rgba(255,255,255,0.6)", "0 0 0px rgba(255,255,255,0)"]
                          : "0 0 0px rgba(255,255,255,0)"
                      }}
                      transition={{
                        textShadow: {
                          duration: 2,
                          repeat: isActivePage(item.href) ? Infinity : 0,
                          ease: "easeInOut"
                        }
                      }}
                      className="relative z-10 font-bold"
                    >
                      {item.label}
                    </motion.span>

                    {/* Enhanced background effects */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100"
                      animate={{
                        x: ["-100%", "100%"],
                        opacity: [0, 0.7, 0]
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 2
                      }}
                    />

                    {/* Active state glow */}
                    {isActivePage(item.href) && (
                      <motion.div
                        className="absolute inset-0 bg-white/10 rounded-xl"
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                          scale: [1, 1.02, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}

                    {/* Border glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-white/30 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0.95 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    />
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
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass-card hover:bg-primary/10 border-primary/30"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {isRTL() ? 'تسجيل الدخول' : 'Login'}
                  </Button>
                </Link>
              </motion.div>
            )}

            {/* Primary Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Go to Cart Button */}
              <motion.div
                whileHover={{
                  scale: 1.08,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.92 }}
              >
                <Link href="/cart">
                  <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-6 shadow-lg shadow-green-900/30 border border-green-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-900/40 relative overflow-hidden group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                      animate={{
                        x: ["-100%", "100%"],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 1
                      }}
                    />
                    <motion.div
                      animate={{
                        rotate: cartCount > 0 ? [0, 10, -10, 0] : 0,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: cartCount > 0 ? Infinity : 0,
                        repeatDelay: 2
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                    </motion.div>
                    {isRTL() ? 'عرض السلة' : 'View Cart'}
                    {cartCount > 0 && (
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Badge className="ml-2 bg-yellow-400 text-black">
                          {cartCount}
                        </Badge>
                      </motion.div>
                    )}
                  </Button>
                </Link>
              </motion.div>

              {/* Quick Order (Secondary) */}
              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -1,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/order">
                  <Button
                    variant="outline"
                    className="border-green-400/30 hover:bg-green-500/10 text-green-100 hover:text-white transition-all duration-300 relative overflow-hidden group"
                  >
                    <motion.div
                      animate={{
                        y: [0, -1, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2 transition-transform group-hover:rotate-6" />
                    </motion.div>
                    {isRTL() ? 'طلب مخصص' : 'Custom Order'}
                    <motion.div
                      className="absolute inset-0 border border-green-400/50 rounded opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="outline"
              size="sm"
              className="md:hidden border-2 border-gray-300 hover:border-green-500 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
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
              className="md:hidden border-t border-gray-200 py-6 bg-gradient-to-b from-white to-gray-50"
            >
              <nav className="flex flex-col gap-4 px-4">
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
                        className={`flex items-center gap-4 px-6 py-4 rounded-xl font-bold transition-all duration-300 border-2 ${
                          isActivePage(item.href)
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl shadow-green-500/40 border-green-500'
                            : 'text-gray-800 bg-gray-100/80 hover:text-white hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600 hover:shadow-xl hover:shadow-green-500/30 border-gray-300 hover:border-green-500'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <motion.div
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Icon className="h-5 w-5" />
                        </motion.div>
                        <motion.span
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.label}
                        </motion.span>
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
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full glass-card"
                      >
                        <User className="h-4 w-4 mr-2" />
                        {isRTL() ? 'دخول' : 'Login'}
                      </Button>
                    </Link>
                  )}
                </div>
                
                <div className="px-4 space-y-3">
                  <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold shadow-lg shadow-green-900/30 border border-green-400/30 transition-all duration-300 hover:scale-105">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {isRTL() ? 'عرض السلة' : 'View Cart'}
                      {cartCount > 0 && (
                        <Badge className="ml-2 bg-yellow-400 text-black animate-pulse">
                          {cartCount}
                        </Badge>
                      )}
                    </Button>
                  </Link>

                  <Link href="/order" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 text-green-600 hover:text-white font-semibold py-4 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl"
                    >
                      <FileText className="h-5 w-5 mr-2" />
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

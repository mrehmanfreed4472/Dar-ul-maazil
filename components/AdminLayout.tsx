'use client'

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Crown, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/hooks/use-translation';
import { DAMLogo } from '@/components/DAMLogo';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout, isAdmin } = useAuth();
  const { isRTL } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect if not admin (only on client-side)
  useEffect(() => {
    if (isClient && (!user || !isAdmin())) {
      router.push('/login');
    }
  }, [isClient, user, isAdmin, router]);

  // Don't render anything during SSR or if redirecting
  if (!isClient || !user || !isAdmin()) {
    return null;
  }

  const sidebarItems = [
    {
      href: '/admin',
      label: isRTL() ? 'لوحة التحكم' : 'Dashboard',
      icon: LayoutDashboard
    },
    {
      href: '/admin/products',
      label: isRTL() ? 'إدارة المنت����ت' : 'Products',
      icon: Package
    },
    {
      href: '/admin/services',
      label: isRTL() ? 'إدارة الخدمات' : 'Services',
      icon: Crown
    },
    {
      href: '/admin/orders',
      label: isRTL() ? 'الطلبات' : 'Orders',
      icon: ShoppingBag
    }
  ];

  const isActivePage = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-slate-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0
                ? "w-3 h-3 bg-green-200/20"
                : i % 3 === 1
                ? "w-2 h-2 bg-emerald-300/25"
                : "w-1 h-1 bg-green-400/30"
            }`}
            animate={{
              x: [0, 100 + i * 20, 0],
              y: [0, -80 + i * 15, 0],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 4) * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Top Navigation */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-green-200/30 sticky top-0 z-50 shadow-xl shadow-green-900/10 relative overflow-hidden">
        {/* Animated header gradient */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1"
          animate={{
            background: [
              "linear-gradient(90deg, #059669, #10b981, #34d399, #10b981, #059669)",
              "linear-gradient(90deg, #10b981, #34d399, #6ee7b7, #34d399, #10b981)",
              "linear-gradient(90deg, #059669, #10b981, #34d399, #10b981, #059669)"
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between h-18">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              
              {/* Company Logo */}
              <div className="flex items-center gap-4">
                <DAMLogo
                  size="md"
                  withText={true}
                  href="/admin"
                  className="hover:scale-105 transition-transform duration-300"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-primary">
                    Admin Panel
                  </span>
                  <span className="text-sm text-gray-600 font-medium">
                    {isRTL() ? 'لوحة التحكم' : 'Control Panel'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Enhanced Back to Website */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" asChild size="sm" className="border-green-200 hover:bg-green-50 hover:border-green-300 text-green-700 font-medium">
                  <Link href="/">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    {isRTL() ? 'الموقع الرئيسي' : 'Main Website'}
                  </Link>
                </Button>
              </motion.div>

              {/* Enhanced User Menu */}
              <div className="flex items-center gap-4">
                <motion.div
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-800">{user.name}</div>
                    <div className="text-xs text-green-600 flex items-center gap-1 font-medium">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        <Crown className="h-3 w-3" />
                      </motion.div>
                      {isRTL() ? 'مدير' : 'Administrator'}
                    </div>
                  </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 font-medium"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-white/98 via-green-50/30 to-emerald-50/40 backdrop-blur-xl border-r border-green-200/40 shadow-xl shadow-green-900/10 transform transition-all duration-500 ease-out lg:translate-x-0 lg:static lg:inset-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {/* Sidebar background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"30\" height=\"30\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3Cpattern id=\"grid\" width=\"30\" height=\"30\" patternUnits=\"userSpaceOnUse\"%3E%3Cpath d=\"M 30 0 L 0 0 0 30\" fill=\"none\" stroke=\"%23059669\" stroke-width=\"0.5\"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\"100%25\" height=\"100%25\" fill=\"url(%23grid)\"/%3E%3C/svg%3E')",
              backgroundSize: "30px 30px"
            }} />
          </div>

          <div className="flex flex-col h-full pt-20 lg:pt-8 relative z-10">
            <nav className="flex-1 px-4 space-y-2">
              {sidebarItems.map((item, index) => {
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
                      onClick={() => setIsSidebarOpen(false)}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-300
                        ${isActivePage(item.href)
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                        }
                      `}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                      {isActivePage(item.href) && (
                        <motion.div
                          layoutId="activeTab"
                          className="ml-auto w-2 h-2 bg-primary rounded-full"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Quick Stats */}
            <div className="p-4 border-t border-border/20">
              <Card className="glass-card border-primary/20">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {isRTL() ? 'إحصائيات سريعة' : 'Quick Stats'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {isRTL() ? 'تحديث مباشر' : 'Live Updates'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="min-h-screen">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

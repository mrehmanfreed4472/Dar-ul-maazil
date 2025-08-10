import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { useState } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout, isAdmin } = useAuth();
  const { isRTL } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Redirect if not admin
  if (!user || !isAdmin()) {
    navigate('/login');
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
      label: isRTL() ? 'إدارة المنتجات' : 'Products',
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
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Top Navigation */}
      <header className="glass-card border-b border-border/20 sticky top-0 z-50 premium-shadow">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
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
              
              {/* Logo */}
              <Link to="/admin" className="flex items-center gap-3">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center"
                >
                  <span className="text-white font-bold text-lg">دم</span>
                </motion.div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Admin Panel
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {isRTL() ? 'دار المعازل' : 'Dar Al Muaazil'}
                  </span>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {/* Back to Website */}
              <Button variant="outline" asChild size="sm">
                <Link to="/">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  {isRTL() ? 'الموقع الرئيسي' : 'Main Website'}
                </Link>
              </Button>

              {/* User Menu */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{user.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    {isRTL() ? 'مدير' : 'Administrator'}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-xl border-r border-border/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full pt-16 lg:pt-6">
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
                      to={item.href}
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

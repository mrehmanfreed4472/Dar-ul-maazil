import { motion } from 'framer-motion';
import {
  TrendingUp,
  Package,
  Crown,
  ShoppingBag,
  Users,
  DollarSign,
  Calendar,
  Star,
  BarChart3,
  PieChart,
  Activity,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/use-translation';
import { useAdmin } from '@/contexts/AdminContext';
import RevenueChart from './RevenueChart';
import CustomerLocationMap from './CustomerLocationMap';
import { DataManagement } from './DataManagement';

// Dashboard now uses dynamic data from AdminContext

export default function AdminDashboard() {
  const { isRTL } = useTranslation();
  const { orders, products, services } = useAdmin();

  // Calculate dynamic stats
  const totalRevenue = orders.reduce((sum, order) => ({
    usd: sum.usd + (order.status !== 'cancelled' ? order.total.usd : 0),
    aed: sum.aed + (order.status !== 'cancelled' ? order.total.aed : 0)
  }), { usd: 0, aed: 0 });

  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const completedOrders = orders.filter(order => order.status === 'delivered').length;
  const processingOrders = orders.filter(order => order.status === 'processing').length;
  const totalActiveProducts = products.filter(product => product.availability !== 'out_of_stock').length;

  // Get recent orders (last 5)
  const recentOrders = orders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const statCards = [
    {
      title: isRTL() ? 'إج��الي الإيرادات' : 'Total Revenue',
      value: `$${totalRevenue.usd.toLocaleString()}`,
      subtitle: `${totalRevenue.aed.toLocaleString()} AED`,
      icon: DollarSign,
      change: orders.length > 0 ? '+12.5%' : '0%',
      color: 'gradient-success'
    },
    {
      title: isRTL() ? 'إ��مالي الطلبات' : 'Total Orders',
      value: orders.length.toString(),
      subtitle: isRTL() ? `${pendingOrders} قيد الانتظار` : `${pendingOrders} pending`,
      icon: ShoppingBag,
      change: orders.length > 0 ? '+8.3%' : '0%',
      color: 'gradient-primary'
    },
    {
      title: isRTL() ? 'المنتجات' : 'Products',
      value: products.length.toString(),
      subtitle: isRTL() ? `${totalActiveProducts} منتج نشط` : `${totalActiveProducts} active products`,
      icon: Package,
      change: products.length > 0 ? '+2.1%' : '0%',
      color: 'gradient-info'
    },
    {
      title: isRTL() ? 'الخدمات' : 'Services',
      value: services.length.toString(),
      subtitle: isRTL() ? 'خدمة متاحة' : 'available services',
      icon: Crown,
      change: services.length > 0 ? '+5.7%' : '0%',
      color: 'gradient-accent'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'gradient-success text-white';
      case 'processing': return 'gradient-warning text-white';
      case 'pending': return 'gradient-info text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return isRTL() ? 'مكتمل' : 'Completed';
      case 'processing': return isRTL() ? 'قيد المعالجة' : 'Processing';
      case 'pending': return isRTL() ? 'قيد الانتظار' : 'Pending';
      default: return status;
    }
  };

  return (
    <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {isRTL() ? 'لوحة التحكم' : 'Dashboard'}
              </h1>
              <p className="text-muted-foreground mt-1">
                {isRTL() ? 'نظ��ة عامة على إحصائيات النشاط التجاري' : 'Overview of your business performance'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="gradient-primary text-white">
                <Activity className="w-3 h-3 mr-1" />
                {isRTL() ? 'مباشر' : 'Live'}
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="glass-card border-border/20 premium-shadow hover:premium-shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {stat.value}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {stat.subtitle}
                        </p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm font-medium text-green-500">
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <motion.div 
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass-card border-primary/20 premium-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center"
                  >
                    <BarChart3 className="h-5 w-5 text-white" />
                  </motion.div>
                  {isRTL() ? 'نمو الإيرادات' : 'Revenue Growth'}
                </CardTitle>
                <CardDescription>
                  {isRTL() ? 'إيرادات الشهر الحالي مقارنة بالشه���� السابق' : 'Current month vs previous month revenue'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
            </Card>
          </motion.div>

          {/* Orders Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="glass-card border-accent/20 premium-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center"
                  >
                    <PieChart className="h-5 w-5 text-white" />
                  </motion.div>
                  {isRTL() ? 'توزيع الطلبات' : 'Orders Distribution'}
                </CardTitle>
                <CardDescription>
                  {isRTL() ? 'توزيع الطلبات حسب الحالة' : 'Orders breakdown by status'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{isRTL() ? 'مكتملة' : 'Completed'}</span>
                    </div>
                    <span className="font-semibold">{completedOrders}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">{isRTL() ? 'قيد الانتظار' : 'Pending'}</span>
                    </div>
                    <span className="font-semibold">{pendingOrders}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                      style={{ width: `${orders.length > 0 ? (completedOrders / orders.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Customer Location Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="glass-card border-border/20 premium-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center"
                >
                  <MapPin className="h-5 w-5 text-white" />
                </motion.div>
                {isRTL() ? 'مواقع العملاء' : 'Customer Locations'}
              </CardTitle>
              <CardDescription>
                {isRTL() ? 'آخر 10 عملاء ومواقعهم' : 'Last 10 customers and their locations'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerLocationMap />
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="glass-card border-border/20 premium-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  className="w-10 h-10 gradient-info rounded-xl flex items-center justify-center"
                >
                  <ShoppingBag className="h-5 w-5 text-white" />
                </motion.div>
                {isRTL() ? 'الطلبات الأخيرة' : 'Recent Orders'}
              </CardTitle>
              <CardDescription>
                {isRTL() ? 'آخر الطلبات المستلمة' : 'Latest orders received'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-border/20 rounded-lg hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center"
                      >
                        <span className="text-white font-bold text-sm">
                          {order.orderNumber.split('-')[1] || order.orderNumber.slice(-3)}
                        </span>
                      </motion.div>
                      <div>
                        <div className="font-medium text-foreground">{order.customerName}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.items.length} {isRTL() ? 'عنصر' : 'items'} • {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold text-foreground">${order.total.usd.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">{order.total.aed.toFixed(2)} AED</div>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <DataManagement />
        </motion.div>
    </div>
  );
}

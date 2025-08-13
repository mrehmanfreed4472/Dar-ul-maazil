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
  Activity
} from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/use-translation';

// Mock data for demonstration
const mockStats = {
  totalRevenue: { usd: 125430, aed: 460579 },
  totalOrders: 342,
  totalProducts: 89,
  totalServices: 15,
  pendingOrders: 23,
  completedOrders: 319,
  newCustomers: 156,
  returningCustomers: 186
};

const mockRecentOrders = [
  {
    id: 'ORDER-001',
    customer: 'Ahmed Al Mansouri',
    type: 'product',
    items: 3,
    total: { usd: 450, aed: 1653 },
    status: 'pending',
    date: '2024-01-15'
  },
  {
    id: 'ORDER-002',
    customer: 'Sarah Johnson',
    type: 'service',
    items: 1,
    total: { usd: 120, aed: 441 },
    status: 'completed',
    date: '2024-01-14'
  },
  {
    id: 'ORDER-003',
    customer: 'Mohammed Hassan',
    type: 'mixed',
    items: 5,
    total: { usd: 680, aed: 2498 },
    status: 'processing',
    date: '2024-01-14'
  }
];

export default function AdminDashboard() {
  const { isRTL } = useTranslation();

  const statCards = [
    {
      title: isRTL() ? 'إجمالي الإيرادات' : 'Total Revenue',
      value: `$${mockStats.totalRevenue.usd.toLocaleString()}`,
      subtitle: `${mockStats.totalRevenue.aed.toLocaleString()} AED`,
      icon: DollarSign,
      change: '+12.5%',
      color: 'gradient-success'
    },
    {
      title: isRTL() ? 'إجمالي الطلبات' : 'Total Orders',
      value: mockStats.totalOrders.toString(),
      subtitle: isRTL() ? `${mockStats.pendingOrders} قيد الانتظار` : `${mockStats.pendingOrders} pending`,
      icon: ShoppingBag,
      change: '+8.3%',
      color: 'gradient-primary'
    },
    {
      title: isRTL() ? 'المنتجات' : 'Products',
      value: mockStats.totalProducts.toString(),
      subtitle: isRTL() ? 'منتج نشط' : 'active products',
      icon: Package,
      change: '+2.1%',
      color: 'gradient-info'
    },
    {
      title: isRTL() ? 'الخدمات' : 'Services',
      value: mockStats.totalServices.toString(),
      subtitle: isRTL() ? 'خدمة متاحة' : 'available services',
      icon: Crown,
      change: '+5.7%',
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
    <AdminLayout>
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
                {isRTL() ? 'نظرة عامة على إحصائيات النشاط التجاري' : 'Overview of your business performance'}
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
                  {isRTL() ? 'إيرادات الشهر الحالي مقارنة بالشه�� السابق' : 'Current month vs previous month revenue'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      📈
                    </div>
                    <p className="text-muted-foreground">
                      {isRTL() ? 'مخطط الإيرادات سيظهر هنا' : 'Revenue chart will appear here'}
                    </p>
                  </div>
                </div>
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
                    <span className="font-semibold">{mockStats.completedOrders}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">{isRTL() ? 'قيد الانتظار' : 'Pending'}</span>
                    </div>
                    <span className="font-semibold">{mockStats.pendingOrders}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" 
                      style={{ width: `${(mockStats.completedOrders / mockStats.totalOrders) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

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
                {mockRecentOrders.map((order, index) => (
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
                          {order.id.split('-')[1]}
                        </span>
                      </motion.div>
                      <div>
                        <div className="font-medium text-foreground">{order.customer}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.items} {isRTL() ? 'عنصر' : 'items'} • {order.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold text-foreground">${order.total.usd}</div>
                        <div className="text-sm text-muted-foreground">{order.total.aed} AED</div>
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
      </div>
    </AdminLayout>
  );
}

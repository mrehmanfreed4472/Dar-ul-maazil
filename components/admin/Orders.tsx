import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  MoreVertical,
  Calendar,
  DollarSign,
  Package,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Truck,
  CreditCard,
  FileText,
  RefreshCw,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAdmin, Order } from '@/contexts/AdminContext';
import { useTranslation } from '@/hooks/use-translation';
import { useToast } from '@/hooks/use-toast';
import { DAMLogo } from '@/components/DAMLogo';

export default function AdminOrders() {
  const { isRTL } = useTranslation();
  const { toast } = useToast();
  const { orders, updateOrder, deleteOrder, exportData, stats, refreshStats } = useAdmin();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchQuery === '' || 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <RefreshCw className="h-4 w-4 animate-spin" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: Order['priority']) => {
    switch (priority) {
      case 'rush': return 'gradient-error text-white';
      case 'urgent': return 'gradient-warning text-white';
      default: return 'gradient-success text-white';
    }
  };

  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'refunded': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPaymentMethodDisplay = (method: Order['paymentMethod']) => {
    switch (method) {
      case 'stripe': return { label: 'Stripe', icon: '💳', color: 'text-blue-600 bg-blue-50' };
      case 'card': return { label: 'Credit Card', icon: '💳', color: 'text-blue-600 bg-blue-50' };
      case 'bank_transfer': return { label: 'Bank Transfer', icon: '🏦', color: 'text-purple-600 bg-purple-50' };
      case 'cash_on_delivery': return { label: 'Cash on Delivery', icon: '💵', color: 'text-green-600 bg-green-50' };
      default: return { label: method, icon: '💳', color: 'text-gray-600 bg-gray-50' };
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    updateOrder(orderId, { status: newStatus });
    toast({
      title: isRTL() ? 'تم تحديث الطلب' : 'Order Updated',
      description: isRTL() ? `تم تحدي�� حالة الطلب إلى ${newStatus}` : `Order status updated to ${newStatus}`
    });
  };

  const handleDeleteOrder = (orderId: string) => {
    deleteOrder(orderId);
    toast({
      title: isRTL() ? 'تم حذف الطلب' : 'Order Deleted',
      description: isRTL() ? 'تم حذف ال���لب بنجاح' : 'Order has been deleted successfully'
    });
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate summary stats
  const summaryStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    revenue: orders.reduce((sum, order) => sum + order.total.usd, 0)
  };

  return (
    <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {isRTL() ? 'إدارة الطلبات' : 'Order Management'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isRTL() ? 'عرض ومعالجة وإدارة طلبات العملاء' : 'View, process, and manage customer orders'}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => exportData('orders')}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              {isRTL() ? 'تصدير' : 'Export'}
            </Button>
            <Button
              onClick={refreshStats}
              className="gap-2 gradient-primary text-white"
            >
              <RefreshCw className="h-4 w-4" />
              {isRTL() ? 'تحديث' : 'Refresh'}
            </Button>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { label: isRTL() ? 'إجمالي الطلبات' : 'Total Orders', value: summaryStats.total, icon: ShoppingBag, color: 'gradient-primary' },
            { label: isRTL() ? 'قيد الانتظار' : 'Pending', value: summaryStats.pending, icon: Clock, color: 'gradient-warning' },
            { label: isRTL() ? 'قيد المعالجة' : 'Processing', value: summaryStats.processing, icon: RefreshCw, color: 'gradient-info' },
            { label: isRTL() ? 'تم التسليم' : 'Delivered', value: summaryStats.delivered, icon: CheckCircle, color: 'gradient-success' },
            { label: isRTL() ? 'الإيرادات' : 'Revenue', value: `$${summaryStats.revenue.toLocaleString()}`, icon: DollarSign, color: 'gradient-accent' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="glass-card border-border/20 premium-shadow hover:premium-shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {stat.value}
                        </p>
                      </div>
                      <motion.div 
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="glass-card border-accent/20 premium-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  {isRTL() ? 'البحث والتصفية' : 'Search & Filter'}
                </div>
                <DAMLogo size="sm" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder={isRTL() ? 'البحث في الطلبات...' : 'Search orders...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL() ? 'جميع الحالات' : 'All Statuses'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL() ? 'جميع الحالات' : 'All Statuses'}</SelectItem>
                    <SelectItem value="pending">{isRTL() ? 'قيد الانتظار' : 'Pending'}</SelectItem>
                    <SelectItem value="processing">{isRTL() ? 'قيد المعالجة' : 'Processing'}</SelectItem>
                    <SelectItem value="shipped">{isRTL() ? 'تم الشحن' : 'Shipped'}</SelectItem>
                    <SelectItem value="delivered">{isRTL() ? 'تم التسليم' : 'Delivered'}</SelectItem>
                    <SelectItem value="cancelled">{isRTL() ? 'ملغى' : 'Cancelled'}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL() ? 'جميع الأولويات' : 'All Priorities'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL() ? 'جميع الأولويات' : 'All Priorities'}</SelectItem>
                    <SelectItem value="normal">{isRTL() ? 'عادي' : 'Normal'}</SelectItem>
                    <SelectItem value="urgent">{isRTL() ? 'عاجل' : 'Urgent'}</SelectItem>
                    <SelectItem value="rush">{isRTL() ? 'طارئ' : 'Rush'}</SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  {isRTL() ? `${filteredOrders.length} من ${orders.length} طلب` : `${filteredOrders.length} of ${orders.length} orders`}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="glass-card border-border/20 premium-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                {isRTL() ? 'قائمة الطلبات' : 'Orders List'}
              </CardTitle>
              <CardDescription>
                {isRTL() ? 'إدارة وتتبع جميع طلبات العملاء' : 'Manage and track all customer orders'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border border-border/20 rounded-lg p-4 hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <motion.div 
                            whileHover={{ scale: 1.1 }}
                            className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center"
                          >
                            <span className="text-white font-bold text-sm">
                              #{order.orderNumber.split('-').pop()}
                            </span>
                          </motion.div>
                          
                          <div>
                            <div className="font-semibold text-foreground">
                              {order.customerName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {order.orderNumber}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getPriorityColor(order.priority)}>
                                {order.priority}
                              </Badge>
                              <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                                <CreditCard className="w-3 h-3 mr-1" />
                                {order.paymentStatus}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-bold text-foreground">
                              ${order.total.usd.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {order.total.aed.toLocaleString()} AED
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatDate(order.createdAt)}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{order.status}</span>
                            </Badge>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => viewOrderDetails(order)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  {isRTL() ? 'عرض التفاصيل' : 'View Details'}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'processing')}>
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  {isRTL() ? 'قيد المعالجة' : 'Mark Processing'}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'shipped')}>
                                  <Truck className="h-4 w-4 mr-2" />
                                  {isRTL() ? 'تم الشحن' : 'Mark Shipped'}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'delivered')}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  {isRTL() ? 'تم ��لتسليم' : 'Mark Delivered'}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteOrder(order.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  {isRTL() ? 'حذف' : 'Delete'}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredOrders.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">📦</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {isRTL() ? 'لا توجد طلبات' : 'No Orders Found'}
                    </h3>
                    <p className="text-muted-foreground">
                      {isRTL() ? 'لم يتم العثور ��لى طلبات مطابقة للبحث' : 'No orders match your search criteria'}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Order Detail Modal */}
        <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {isRTL() ? 'تفاصيل الطلب' : 'Order Details'} - {selectedOrder?.orderNumber}
              </DialogTitle>
              <DialogDescription>
                {isRTL() ? 'معلومات مفصلة عن الطلب والعميل' : 'Detailed information about the order and customer'}
              </DialogDescription>
            </DialogHeader>

            {selectedOrder && (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">{isRTL() ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
                  <TabsTrigger value="items">{isRTL() ? 'العناصر' : 'Items'}</TabsTrigger>
                  <TabsTrigger value="customer">{isRTL() ? 'العميل' : 'Customer'}</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Order Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Order Number:</span>
                          <span className="font-medium">{selectedOrder.orderNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge className={getStatusColor(selectedOrder.status)}>
                            {getStatusIcon(selectedOrder.status)}
                            <span className="ml-1">{selectedOrder.status}</span>
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Priority:</span>
                          <Badge className={getPriorityColor(selectedOrder.priority)}>
                            {selectedOrder.priority}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Created:</span>
                          <span className="font-medium">{formatDate(selectedOrder.createdAt)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Payment:</span>
                          <Badge className={getPaymentStatusColor(selectedOrder.paymentStatus)}>
                            {selectedOrder.paymentStatus}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Totals</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between text-lg">
                          <span className="text-muted-foreground">Total (USD):</span>
                          <span className="font-bold text-primary">${selectedOrder.total.usd.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-lg">
                          <span className="text-muted-foreground">Total (AED):</span>
                          <span className="font-bold text-primary">{selectedOrder.total.aed.toLocaleString()} AED</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Payment Method:</span>
                          <span className="font-medium">{selectedOrder.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Items Count:</span>
                          <span className="font-medium">{selectedOrder.items.length}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="items" className="space-y-4">
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {item.type === 'product' ? 'Product' : 'Service'}
                                {item.size && ` • Size: ${item.size}`}
                                {item.laborServices && ' • With Labor'}
                                {item.urgency && ` • ${item.urgency}`}
                              </div>
                              {item.specialRequirements && (
                                <div className="text-sm text-muted-foreground mt-1">
                                  <strong>Requirements:</strong> {item.specialRequirements}
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="font-medium">Qty: {item.quantity}</div>
                              <div className="text-sm text-muted-foreground">
                                ${item.price.usd} / {item.price.aed} AED
                              </div>
                              <div className="font-bold text-primary">
                                ${(item.price.usd * item.quantity).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="customer" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <User className="h-5 w-5" />
                          Customer Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name:</span>
                          <span className="font-medium">{selectedOrder.customerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email:</span>
                          <span className="font-medium">{selectedOrder.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Phone:</span>
                          <span className="font-medium">{selectedOrder.phone}</span>
                        </div>
                        {selectedOrder.company && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Company:</span>
                            <span className="font-medium">{selectedOrder.company}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          Shipping Address
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <span className="text-muted-foreground">Address:</span>
                          <p className="font-medium">{selectedOrder.shippingAddress.address}</p>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">City:</span>
                          <span className="font-medium">{selectedOrder.shippingAddress.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Emirate:</span>
                          <span className="font-medium">{selectedOrder.shippingAddress.emirate}</span>
                        </div>
                        {selectedOrder.shippingAddress.postalCode && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Postal Code:</span>
                            <span className="font-medium">{selectedOrder.shippingAddress.postalCode}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {selectedOrder.notes && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Order Notes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground">{selectedOrder.notes}</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>
    </div>
  );
}

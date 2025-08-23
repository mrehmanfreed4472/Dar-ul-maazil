'use client'

import { motion } from 'framer-motion';
import { MapPin, Users, Building2, Clock, TrendingUp, Globe, Star, Calendar } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useTranslation } from '@/hooks/use-translation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CustomerLocationMap() {
  const { orders } = useAdmin();
  const { isRTL } = useTranslation();

  // Get last 10 customer locations from recent orders
  const getRecentCustomerLocations = () => {
    const recentOrders = orders
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);

    return recentOrders.map(order => ({
      id: order.id,
      customerName: order.customerName,
      city: order.shippingAddress.city,
      emirate: order.shippingAddress.emirate,
      orderDate: new Date(order.createdAt).toLocaleDateString(),
      status: order.status,
      total: order.total.usd,
      company: order.company,
      timeAgo: getTimeAgo(new Date(order.createdAt))
    }));
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return isRTL() ? 'منذ دقائق' : 'Minutes ago';
    if (diffInHours < 24) return isRTL() ? `منذ ${diffInHours} ساعة` : `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return isRTL() ? `منذ ${diffInDays} يوم` : `${diffInDays}d ago`;
  };

  const recentLocations = getRecentCustomerLocations();

  // Enhanced UAE Emirates data with better coordinates and styling
  const emiratesData = [
    { name: 'Dubai', coordinates: { x: 55, y: 70 }, color: '#3b82f6', gradient: 'from-blue-400 to-blue-600' },
    { name: 'Abu Dhabi', coordinates: { x: 25, y: 80 }, color: '#10b981', gradient: 'from-emerald-400 to-emerald-600' },
    { name: 'Sharjah', coordinates: { x: 60, y: 60 }, color: '#f59e0b', gradient: 'from-amber-400 to-amber-600' },
    { name: 'Ajman', coordinates: { x: 65, y: 55 }, color: '#ef4444', gradient: 'from-red-400 to-red-600' },
    { name: 'Fujairah', coordinates: { x: 80, y: 65 }, color: '#8b5cf6', gradient: 'from-purple-400 to-purple-600' },
    { name: 'Ras Al Khaimah', coordinates: { x: 70, y: 35 }, color: '#06b6d4', gradient: 'from-cyan-400 to-cyan-600' },
    { name: 'Umm Al Quwain', coordinates: { x: 63, y: 45 }, color: '#f97316', gradient: 'from-orange-400 to-orange-600' }
  ];

  const getEmirateData = (emirateName: string) => {
    return emiratesData.find(e => e.name === emirateName) || emiratesData[0];
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      delivered: { bg: 'bg-green-500', text: 'text-green-700', bgLight: 'bg-green-50', label: isRTL() ? 'تم التسليم' : 'Delivered' },
      processing: { bg: 'bg-blue-500', text: 'text-blue-700', bgLight: 'bg-blue-50', label: isRTL() ? 'قيد المعالجة' : 'Processing' },
      shipped: { bg: 'bg-purple-500', text: 'text-purple-700', bgLight: 'bg-purple-50', label: isRTL() ? 'تم الشحن' : 'Shipped' },
      pending: { bg: 'bg-yellow-500', text: 'text-yellow-700', bgLight: 'bg-yellow-50', label: isRTL() ? 'قيد الانتظار' : 'Pending' },
      cancelled: { bg: 'bg-red-500', text: 'text-red-700', bgLight: 'bg-red-50', label: isRTL() ? 'ملغي' : 'Cancelled' }
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  // Get statistics
  const getLocationStats = () => {
    const emirateCount = new Map();
    recentLocations.forEach(loc => {
      emirateCount.set(loc.emirate, (emirateCount.get(loc.emirate) || 0) + 1);
    });
    return Array.from(emirateCount.entries()).sort((a, b) => b[1] - a[1]);
  };

  const locationStats = getLocationStats();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-50 via-white to-slate-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg"
              >
                <Globe className="w-6 h-6 text-white" />
              </motion.div>
              {isRTL() ? 'خريطة مواقع العملاء' : 'Customer Location Analytics'}
            </CardTitle>
          </CardHeader>
        </Card>
      </motion.div>

      {/* UAE Map Visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6">
              <div className="text-center mb-6">
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl font-bold text-white mb-2"
                >
                  {isRTL() ? 'دولة الإمارات العربية المتحدة' : 'United Arab Emirates'}
                </motion.h3>
                <p className="text-blue-100">
                  {isRTL() ? 'التوزيع الجغرافي للعملاء الأخيرة' : 'Recent Customer Geographic Distribution'}
                </p>
              </div>
              
              {/* Enhanced UAE Map */}
              <div className="relative w-full h-64 bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-50 rounded-xl border-4 border-white/20 shadow-2xl overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-transparent to-cyan-400"></div>
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)'
                  }}></div>
                </div>
                
                {/* Enhanced Emirates Pins */}
                {emiratesData.map((emirate, index) => {
                  const hasCustomers = recentLocations.some(loc => 
                    loc.emirate === emirate.name || loc.city === emirate.name
                  );
                  const customerCount = recentLocations.filter(loc => 
                    loc.emirate === emirate.name || loc.city === emirate.name
                  ).length;
                  
                  return (
                    <motion.div
                      key={emirate.name}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5, type: "spring" }}
                      className="absolute"
                      style={{
                        left: `${emirate.coordinates.x}%`,
                        top: `${emirate.coordinates.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className="relative group">
                        <motion.div
                          whileHover={{ scale: 1.4 }}
                          whileTap={{ scale: 0.9 }}
                          className="relative"
                        >
                          {/* Pulse Rings for Active Locations */}
                          {hasCustomers && (
                            <>
                              <motion.div
                                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                className={`absolute inset-0 w-6 h-6 -m-3 rounded-full bg-gradient-to-r ${emirate.gradient} opacity-30`}
                              />
                              <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                                className={`absolute inset-0 w-4 h-4 -m-2 rounded-full bg-gradient-to-r ${emirate.gradient} opacity-50`}
                              />
                            </>
                          )}
                          
                          {/* Main Pin */}
                          <div className={`w-6 h-6 rounded-full border-3 border-white shadow-2xl cursor-pointer transition-all duration-300
                            ${hasCustomers 
                              ? `bg-gradient-to-br ${emirate.gradient} shadow-lg` 
                              : 'bg-gradient-to-br from-gray-300 to-gray-400'
                            }`}>
                            {hasCustomers && customerCount > 0 && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg"
                              >
                                {customerCount}
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                        
                        {/* Enhanced Tooltip */}
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
                        >
                          <div className="bg-gray-900/95 backdrop-blur-sm text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap shadow-2xl border border-white/10">
                            <div className="font-semibold">{emirate.name}</div>
                            {hasCustomers && (
                              <div className="text-green-300 text-xs mt-1">
                                {customerCount} {isRTL() ? 'عميل' : 'customer(s)'}
                              </div>
                            )}
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-gray-900/95"></div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Customer List Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg"
                >
                  <Users className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-lg font-bold text-gray-800">
                  {isRTL() ? 'آخر 10 عملاء' : 'Recent Customer Activity'}
                </span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 font-semibold">
                {recentLocations.length} {isRTL() ? 'عميل' : 'customers'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {recentLocations.map((location, index) => {
                const statusConfig = getStatusConfig(location.status);
                return (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative p-4 bg-gradient-to-r from-white to-slate-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Status Indicator */}
                        <div className="relative">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className={`w-4 h-4 rounded-full ${statusConfig.bg} shadow-lg`}
                          />
                          <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                            className={`absolute inset-0 w-4 h-4 rounded-full ${statusConfig.bg} opacity-30`}
                          />
                        </div>
                        
                        {/* Customer Info */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">
                              {location.customerName}
                            </span>
                            {location.company && (
                              <Building2 className="w-4 h-4 text-gray-400" />
                            )}
                            {index < 3 && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{location.city}, {location.emirate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{location.timeAgo}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Order Details */}
                      <div className="text-right space-y-1">
                        <div className="font-bold text-lg text-gray-900">
                          ${location.total.toLocaleString()}
                        </div>
                        <Badge 
                          className={`text-xs font-medium ${statusConfig.bg} text-white shadow-sm`}
                        >
                          {statusConfig.label}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Hover Effect Line */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-500"
                    />
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Location Statistics */}
      {locationStats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="border-0 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg"
                >
                  <TrendingUp className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-lg font-bold text-gray-800">
                  {isRTL() ? 'إحصائيات المواقع' : 'Location Distribution'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {locationStats.map(([emirate, count], index) => {
                  const emirateData = getEmirateData(emirate);
                  return (
                    <motion.div
                      key={emirate}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="text-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-br ${emirateData.gradient} shadow-lg`}
                      />
                      <div className="font-semibold text-gray-900 text-sm">{emirate}</div>
                      <div className="text-2xl font-bold text-gray-800">{count}</div>
                      <div className="text-xs text-gray-500">
                        {isRTL() ? 'عميل' : 'customers'}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

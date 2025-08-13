'use client'

import { motion } from 'framer-motion';
import { MapPin, Users, Building2, Clock } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useTranslation } from '@/hooks/use-translation';
import { Badge } from '@/components/ui/badge';

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
      company: order.company
    }));
  };

  const recentLocations = getRecentCustomerLocations();

  // UAE Emirates data with coordinates for visualization
  const emiratesData = [
    { name: 'Dubai', coordinates: { x: 60, y: 65 }, color: '#3b82f6' },
    { name: 'Abu Dhabi', coordinates: { x: 35, y: 75 }, color: '#10b981' },
    { name: 'Sharjah', coordinates: { x: 65, y: 55 }, color: '#f59e0b' },
    { name: 'Ajman', coordinates: { x: 70, y: 50 }, color: '#ef4444' },
    { name: 'Fujairah', coordinates: { x: 85, y: 60 }, color: '#8b5cf6' },
    { name: 'Ras Al Khaimah', coordinates: { x: 75, y: 40 }, color: '#06b6d4' },
    { name: 'Umm Al Quwain', coordinates: { x: 68, y: 45 }, color: '#f97316' }
  ];

  const getEmirateData = (emirateName: string) => {
    return emiratesData.find(e => e.name === emirateName) || emiratesData[0];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return isRTL() ? 'تم التسليم' : 'Delivered';
      case 'processing': return isRTL() ? 'قيد المعالجة' : 'Processing';
      case 'shipped': return isRTL() ? 'تم الشحن' : 'Shipped';
      case 'pending': return isRTL() ? 'قيد الانتظار' : 'Pending';
      case 'cancelled': return isRTL() ? 'ملغي' : 'Cancelled';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* UAE Map Visualization */}
      <div className="relative">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {isRTL() ? 'دولة الإمارات العربية المتحدة' : 'United Arab Emirates'}
            </h3>
            <p className="text-sm text-gray-600">
              {isRTL() ? 'مواقع العملاء الأخيرة' : 'Recent Customer Locations'}
            </p>
          </div>
          
          {/* Simple UAE Map */}
          <div className="relative w-full h-48 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg border-2 border-blue-300 overflow-hidden">
            {/* Gulf Waters Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300/30 to-blue-400/30"></div>
            
            {/* Emirates Pins */}
            {emiratesData.map((emirate, index) => {
              const hasCustomers = recentLocations.some(loc => 
                loc.emirate === emirate.name || loc.city === emirate.name
              );
              
              return (
                <motion.div
                  key={emirate.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="absolute"
                  style={{
                    left: `${emirate.coordinates.x}%`,
                    top: `${emirate.coordinates.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="relative group">
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      className={`w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer
                        ${hasCustomers 
                          ? 'bg-gradient-to-r from-green-400 to-green-600 animate-pulse' 
                          : 'bg-gray-400'
                        }`}
                    />
                    {hasCustomers && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -inset-2 rounded-full border-2 border-green-400 opacity-50"
                      />
                    )}
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                        {emirate.name}
                        {hasCustomers && (
                          <div className="text-green-300">
                            {recentLocations.filter(loc => 
                              loc.emirate === emirate.name || loc.city === emirate.name
                            ).length} customers
                          </div>
                        )}
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Users className="w-4 h-4" />
          {isRTL() ? 'آخر 10 عملاء' : 'Last 10 Customers'}
        </h4>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {recentLocations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-3 h-3 rounded-full ${getStatusColor(location.status)}`}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 text-sm">
                      {location.customerName}
                    </span>
                    {location.company && (
                      <Building2 className="w-3 h-3 text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{location.city}, {location.emirate}</span>
                    <Clock className="w-3 h-3 ml-1" />
                    <span>{location.orderDate}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  ${location.total.toFixed(2)}
                </div>
                <Badge 
                  variant="secondary"
                  className={`text-xs ${getStatusColor(location.status)} text-white`}
                >
                  {getStatusText(location.status)}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

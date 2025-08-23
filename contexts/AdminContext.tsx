'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, getAllProducts } from '@/data/products';
import { Service, getAllServices } from '@/data/services';
import ProductManagerService from '@/lib/productManager';
import type { ExtendedProduct } from '@/lib/productManager';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  company?: string;
  items: OrderItemDetail[];
  total: { usd: number; aed: number };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  priority: 'normal' | 'urgent' | 'rush';
  paymentMethod: 'stripe' | 'card' | 'bank_transfer' | 'cash_on_delivery';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: {
    address: string;
    city: string;
    emirate: string;
    postalCode?: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deliveryDate?: string;
}

export interface OrderItemDetail {
  type: 'product' | 'service';
  id: string;
  name: string;
  quantity: number;
  price: { usd: number; aed: number };
  // Product specific
  size?: string;
  laborServices?: boolean;
  // Service specific
  urgency?: 'normal' | 'urgent' | 'emergency';
  scheduledDate?: string;
  specialRequirements?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  totalOrders: number;
  totalSpent: { usd: number; aed: number };
  lastOrderDate: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface AdminStats {
  totalRevenue: { usd: number; aed: number };
  totalOrders: number;
  pendingOrders: number;
  totalProducts: number;
  totalServices: number;
  totalCustomers: number;
  lowStockProducts: number;
  monthlyRevenue: { month: string; revenue: number }[];
  topProducts: { id: string; name: string; sales: number }[];
  recentActivity: { id: string; action: string; timestamp: string; details: string }[];
}

interface AdminContextType {
  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  getOrderById: (id: string) => Order | undefined;
  
  // Products
  products: ExtendedProduct[];
  addProduct: (product: Omit<ExtendedProduct, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<ExtendedProduct>) => void;
  deleteProduct: (id: string) => void;
  getHierarchicalProducts: () => any[];
  initializeComprehensiveProducts: () => void;
  
  // Services
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;
  
  // Customers
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  
  // Analytics
  stats: AdminStats;
  refreshStats: () => void;
  
  // Utilities
  exportData: (type: 'orders' | 'products' | 'services' | 'customers') => void;
  importData: (type: 'products' | 'services', data: any[]) => void;
  resetData: (type: 'products' | 'services') => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mock data generator
const generateMockOrders = (): Order[] => {
  const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  const priorities: Order['priority'][] = ['normal', 'urgent', 'rush'];
  const paymentMethods: Order['paymentMethod'][] = ['stripe', 'card', 'bank_transfer', 'cash_on_delivery'];
  const paymentStatuses: Order['paymentStatus'][] = ['pending', 'paid', 'failed'];
  const emirates = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Fujairah', 'Ras Al Khaimah', 'Umm Al Quwain'];
  
  const customers = [
    'Ahmed Al Mansouri', 'Sarah Johnson', 'Mohammed Hassan', 'Emily Rodriguez', 'Omar Abdullah',
    'Jessica Chen', 'Khalid Al Zaabi', 'Maria Garcia', 'Abdullah Al Shamsi', 'Anna Petrov'
  ];

  return Array.from({ length: 50 }, (_, i) => {
    const orderDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    const itemCount = Math.floor(Math.random() * 5) + 1;
    const totalUsd = Math.floor(Math.random() * 2000) + 100;
    
    return {
      id: `order-${i + 1}`,
      orderNumber: `DAM-${Date.now()}-${String(i + 1).padStart(3, '0')}`,
      customerName: customers[Math.floor(Math.random() * customers.length)],
      email: `customer${i + 1}@example.com`,
      phone: `+971${Math.floor(Math.random() * 900000000) + 100000000}`,
      company: Math.random() > 0.5 ? `Company ${i + 1}` : undefined,
      items: Array.from({ length: itemCount }, (_, j) => ({
        type: Math.random() > 0.7 ? 'service' : 'product' as 'product' | 'service',
        id: `item-${i}-${j}`,
        name: `Product/Service ${i}-${j}`,
        quantity: Math.floor(Math.random() * 10) + 1,
        price: { usd: Math.floor(Math.random() * 200) + 50, aed: Math.floor(Math.random() * 735) + 184 },
        size: Math.random() > 0.5 ? 'Standard' : undefined,
        laborServices: Math.random() > 0.7,
        urgency: Math.random() > 0.5 ? 'normal' : 'urgent' as 'normal' | 'urgent',
        scheduledDate: Math.random() > 0.5 ? orderDate.toISOString().split('T')[0] : undefined
      })),
      total: { usd: totalUsd, aed: Math.floor(totalUsd * 3.67) },
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
      shippingAddress: {
        address: `Building ${i + 1}, Street ${Math.floor(Math.random() * 100) + 1}`,
        city: emirates[Math.floor(Math.random() * emirates.length)],
        emirate: emirates[Math.floor(Math.random() * emirates.length)],
        postalCode: Math.random() > 0.5 ? String(Math.floor(Math.random() * 90000) + 10000) : undefined
      },
      notes: Math.random() > 0.7 ? `Special notes for order ${i + 1}` : undefined,
      createdAt: orderDate.toISOString(),
      updatedAt: orderDate.toISOString(),
      deliveryDate: Math.random() > 0.5 ? new Date(orderDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined
    };
  });
};

const generateMockCustomers = (): Customer[] => {
  const names = [
    'Ahmed Al Mansouri', 'Sarah Johnson', 'Mohammed Hassan', 'Emily Rodriguez', 'Omar Abdullah',
    'Jessica Chen', 'Khalid Al Zaabi', 'Maria Garcia', 'Abdullah Al Shamsi', 'Anna Petrov'
  ];

  return names.map((name, i) => ({
    id: `customer-${i + 1}`,
    name,
    email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
    phone: `+971${Math.floor(Math.random() * 900000000) + 100000000}`,
    company: Math.random() > 0.5 ? `${name.split(' ')[0]} Construction` : undefined,
    totalOrders: Math.floor(Math.random() * 20) + 1,
    totalSpent: {
      usd: Math.floor(Math.random() * 10000) + 500,
      aed: Math.floor(Math.random() * 36700) + 1835
    },
    lastOrderDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    status: Math.random() > 0.2 ? 'active' : 'inactive',
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
  }));
};

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<ExtendedProduct[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalRevenue: { usd: 0, aed: 0 },
    totalOrders: 0,
    pendingOrders: 0,
    totalProducts: 0,
    totalServices: 0,
    totalCustomers: 0,
    lowStockProducts: 0,
    monthlyRevenue: [],
    topProducts: [],
    recentActivity: []
  });

  // Initialize data
  useEffect(() => {
    const savedOrders = localStorage.getItem('admin_orders');
    const savedCustomers = localStorage.getItem('admin_customers');
    const savedProducts = localStorage.getItem('admin_products');
    const savedServices = localStorage.getItem('admin_services');

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      const mockOrders = generateMockOrders();
      setOrders(mockOrders);
      localStorage.setItem('admin_orders', JSON.stringify(mockOrders));
    }

    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    } else {
      const mockCustomers = generateMockCustomers();
      setCustomers(mockCustomers);
      localStorage.setItem('admin_customers', JSON.stringify(mockCustomers));
    }

    // Load products from localStorage if available, otherwise initialize comprehensive data
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      // Check if products have hierarchical metadata, if not, reinitialize
      const hasHierarchicalData = parsedProducts.some((p: any) => p.hasOwnProperty('isMainProduct'));

      if (hasHierarchicalData) {
        setProducts(parsedProducts);
      } else {
        // Migrate to comprehensive data
        const comprehensiveProducts = ProductManagerService.initializeComprehensiveData();
        setProducts(comprehensiveProducts);
      }
    } else {
      // Initialize with comprehensive product data
      const comprehensiveProducts = ProductManagerService.initializeComprehensiveData();
      setProducts(comprehensiveProducts);
    }

    // Load services from localStorage if available, otherwise use default data
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    } else {
      const defaultServices = getAllServices();
      setServices(defaultServices);
      localStorage.setItem('admin_services', JSON.stringify(defaultServices));
    }
  }, []);

  // Auto-save data
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('admin_orders', JSON.stringify(orders));
    }
  }, [orders]);

  useEffect(() => {
    if (customers.length > 0) {
      localStorage.setItem('admin_customers', JSON.stringify(customers));
    }
  }, [customers]);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('admin_products', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (services.length > 0) {
      localStorage.setItem('admin_services', JSON.stringify(services));
    }
  }, [services]);

  // Calculate stats
  const refreshStats = () => {
    const totalRevenue = orders.reduce(
      (acc, order) => ({
        usd: acc.usd + order.total.usd,
        aed: acc.aed + order.total.aed
      }),
      { usd: 0, aed: 0 }
    );

    const pendingOrders = orders.filter(order => 
      ['pending', 'processing'].includes(order.status)
    ).length;

    const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
      const month = new Date(2024, i).toLocaleString('default', { month: 'short' });
      const revenue = Math.floor(Math.random() * 50000) + 10000;
      return { month, revenue };
    });

    const topProducts = products.slice(0, 5).map(product => ({
      id: product.id,
      name: product.name.en,
      sales: Math.floor(Math.random() * 100) + 10
    }));

    const recentActivity = Array.from({ length: 10 }, (_, i) => ({
      id: `activity-${i}`,
      action: ['Order Created', 'Product Updated', 'Service Added', 'Customer Registered'][Math.floor(Math.random() * 4)],
      timestamp: new Date(Date.now() - i * 2 * 60 * 60 * 1000).toISOString(),
      details: `Activity details ${i + 1}`
    }));

    setStats({
      totalRevenue,
      totalOrders: orders.length,
      pendingOrders,
      totalProducts: products.length,
      totalServices: services.length,
      totalCustomers: customers.length,
      lowStockProducts: Math.floor(Math.random() * 10) + 2,
      monthlyRevenue,
      topProducts,
      recentActivity
    });
  };

  useEffect(() => {
    refreshStats();
  }, [orders, products, services, customers]);

  // Order management
  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(order => 
      order.id === id 
        ? { ...order, ...updates, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  // Product management
  const addProduct = (productData: Omit<ExtendedProduct, 'id'>) => {
    const newProduct: ExtendedProduct = {
      ...productData,
      id: `product-${Date.now()}`,
      lastUpdated: new Date().toISOString(),
      stockQuantity: productData.stockQuantity || 50,
      minStockLevel: productData.minStockLevel || 5,
      isMainProduct: productData.isMainProduct || false
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<ExtendedProduct>) => {
    setProducts(prev => prev.map(product =>
      product.id === id
        ? { ...product, ...updates, lastUpdated: new Date().toISOString() }
        : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  // Get products in hierarchical format for display
  const getHierarchicalProducts = () => {
    return ProductManagerService.flatToHierarchical(products);
  };

  // Initialize comprehensive products (for manual refresh)
  const initializeComprehensiveProducts = () => {
    const comprehensiveProducts = ProductManagerService.initializeComprehensiveData();
    setProducts(comprehensiveProducts);
  };

  // Service management
  const addService = (serviceData: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...serviceData,
      id: `service-${Date.now()}`
    };
    setServices(prev => [...prev, newService]);
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices(prev => prev.map(service => 
      service.id === id ? { ...service, ...updates } : service
    ));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  // Customer management
  const addCustomer = (customerData: Omit<Customer, 'id' | 'createdAt'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: `customer-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setCustomers(prev => [...prev, newCustomer]);
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === id ? { ...customer, ...updates } : customer
    ));
  };

  // Utility functions
  const exportData = (type: 'orders' | 'products' | 'services' | 'customers') => {
    let data;
    let filename;

    switch (type) {
      case 'orders':
        data = orders;
        filename = 'orders-export.json';
        break;
      case 'products':
        data = products;
        filename = 'products-export.json';
        break;
      case 'services':
        data = services;
        filename = 'services-export.json';
        break;
      case 'customers':
        data = customers;
        filename = 'customers-export.json';
        break;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importData = (type: 'products' | 'services', data: any[]) => {
    if (type === 'products') {
      setProducts(data);
      localStorage.setItem('admin_products', JSON.stringify(data));
    } else if (type === 'services') {
      setServices(data);
      localStorage.setItem('admin_services', JSON.stringify(data));
    }
  };

  const resetData = (type: 'products' | 'services') => {
    if (type === 'products') {
      const comprehensiveProducts = ProductManagerService.initializeComprehensiveData();
      setProducts(comprehensiveProducts);
    } else if (type === 'services') {
      const defaultServices = getAllServices();
      setServices(defaultServices);
      localStorage.setItem('admin_services', JSON.stringify(defaultServices));
    }
  };

  return (
    <AdminContext.Provider value={{
      orders,
      addOrder,
      updateOrder,
      deleteOrder,
      getOrderById,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getHierarchicalProducts,
      initializeComprehensiveProducts,
      services,
      addService,
      updateService,
      deleteService,
      customers,
      addCustomer,
      updateCustomer,
      stats,
      refreshStats,
      exportData,
      importData,
      resetData
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

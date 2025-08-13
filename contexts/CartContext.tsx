'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { Service } from '@/data/services';

export interface CartItem {
  type: 'product' | 'service';
  id: string;
  name: string;
  price: { usd: number; aed: number };
  quantity: number;
  image: string;
  // For products
  laborServices?: boolean;
  selectedSize?: string;
  // For services
  urgency?: 'normal' | 'urgent' | 'emergency';
  scheduledDate?: string;
  specialRequirements?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string, type: 'product' | 'service') => void;
  updateQuantity: (id: string, type: 'product' | 'service', quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => { usd: number; aed: number };
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('damgcc_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('damgcc_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(
        item => item.id === newItem.id && 
                item.type === newItem.type && 
                (newItem.type === 'service' ? item.urgency === newItem.urgency : true)
      );

      if (existingItem) {
        return currentItems.map(item =>
          item.id === newItem.id && item.type === newItem.type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string, type: 'product' | 'service') => {
    setItems(currentItems => 
      currentItems.filter(item => !(item.id === id && item.type === type))
    );
  };

  const updateQuantity = (id: string, type: 'product' | 'service', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, type);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id && item.type === type
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce(
      (total, item) => ({
        usd: total.usd + (item.price.usd * item.quantity),
        aed: total.aed + (item.price.aed * item.quantity)
      }),
      { usd: 0, aed: 0 }
    );
  };

  const getCartCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

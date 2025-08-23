'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Trash2, Crown, Star, Clock, Zap, AlertTriangle, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/hooks/use-translation';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { handleImageError } from '@/lib/imageUtils';

export default function Cart() {
  const { language, isRTL, getCurrency } = useTranslation();
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const currency = getCurrency();
  const total = getCartTotal();

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'urgent': return <Zap className="h-4 w-4 text-orange-500" />;
      default: return <Clock className="h-4 w-4 text-green-500" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'gradient-error text-white';
      case 'urgent': return 'gradient-warning text-white';
      default: return 'gradient-success text-white';
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-32 h-32 mx-auto mb-8 gradient-primary rounded-full flex items-center justify-center"
            >
              <ShoppingCart className="h-16 w-16 text-white" />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {isRTL() ? 'السلة فارغة' : 'Your Cart is Empty'}
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              {isRTL() 
                ? 'لم تقم بإضافة أي منتجات أو خدمات إلى السلة بعد'
                : 'You have not added any products or services to your cart yet'
              }
            </p>
            
            <div className="flex gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button asChild size="lg" className="gap-2 gradient-primary text-white font-semibold px-8">
                  <Link href="/products">
                    <Package className="h-5 w-5" />
                    {isRTL() ? 'تصفح المنتجات' : 'Browse Products'}
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button asChild size="lg" variant="outline" className="gap-2 px-8">
                  <Link href="/services">
                    <Crown className="h-5 w-5" />
                    {isRTL() ? 'تصفح الخدمات' : 'Browse Services'}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
            <ShoppingCart className="inline-block w-12 h-12 mr-4 text-accent" />
            {isRTL() ? 'سلة التسوق' : 'Shopping Cart'}
          </h1>
          <p className="text-lg text-muted-foreground">
            {isRTL() 
              ? `لديك ${items.length} عنصر في السلة`
              : `You have ${items.length} item${items.length > 1 ? 's' : ''} in your cart`
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {items.map((item, index) => {
                // Create unique key including all distinguishing options
                const itemKey = [
                  item.type,
                  item.id,
                  item.urgency || 'na',
                  item.selectedSize || 'nosize',
                  item.laborServices ? 'lab' : 'nolab',
                  item.specialRequirements ? encodeURIComponent(item.specialRequirements) : 'noreq'
                ].join('-');

                return (
                  <motion.div
                    key={itemKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                  <Card className="glass-card border-border/30 premium-shadow hover:premium-shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Image */}
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={handleImageError}
                            width={96}
                            height={96}
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className={`text-xs ${
                              item.type === 'product' ? 'bg-blue-500' : 'bg-purple-500'
                            } text-white`}>
                              {item.type === 'product' 
                                ? (isRTL() ? 'منتج' : 'Product')
                                : (isRTL() ? 'خدمة' : 'Service')
                              }
                            </Badge>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg text-foreground line-clamp-2">
                                {item.name}
                              </h3>
                              
                              {/* Service-specific info */}
                              {item.type === 'service' && item.urgency && (
                                <div className="flex items-center gap-2 mt-2">
                                  {getUrgencyIcon(item.urgency)}
                                  <Badge className={getUrgencyColor(item.urgency)}>
                                    {item.urgency === 'normal' && (isRTL() ? 'عادي' : 'Normal')}
                                    {item.urgency === 'urgent' && (isRTL() ? 'عاجل' : 'Urgent')}
                                    {item.urgency === 'emergency' && (isRTL() ? 'طارئ' : 'Emergency')}
                                  </Badge>
                                  {item.scheduledDate && (
                                    <span className="text-sm text-muted-foreground">
                                      {isRTL() ? 'موعد:' : 'Date:'} {item.scheduledDate}
                                    </span>
                                  )}
                                </div>
                              )}

                              {/* Product-specific info */}
                              {item.type === 'product' && (
                                <div className="mt-2 space-y-1">
                                  {item.selectedSize && (
                                    <div className="text-sm text-muted-foreground">
                                      {isRTL() ? 'الحجم:' : 'Size:'} {item.selectedSize}
                                    </div>
                                  )}
                                  {item.laborServices && (
                                    <Badge variant="outline" className="text-xs">
                                      {isRTL() ? 'مع خدمات العمالة' : 'With Labor Services'}
                                    </Badge>
                                  )}
                                </div>
                              )}

                              {item.specialRequirements && (
                                <div className="mt-2 text-sm text-muted-foreground">
                                  <strong>{isRTL() ? 'متطلبات خاصة:' : 'Special Requirements:'}</strong> 
                                  {item.specialRequirements}
                                </div>
                              )}
                            </div>

                            {/* Remove Button */}
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id, item.type)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </div>

                          {/* Quantity and Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                              </motion.div>
                              
                              <span className="w-12 text-center font-semibold text-lg">
                                {item.quantity}
                              </span>
                              
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            </div>

                            <div className="text-right">
                              <div className="text-lg font-bold text-primary">
                                {currency === 'USD' 
                                  ? `$${(item.price.usd * item.quantity).toFixed(2)}`
                                  : `${(item.price.aed * item.quantity).toFixed(2)} AED`
                                }
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {currency === 'USD' 
                                  ? `${item.price.aed} AED each`
                                  : `$${item.price.usd} USD each`
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Clear Cart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <Button
                variant="outline"
                onClick={clearCart}
                className="gap-2 text-destructive border-destructive hover:bg-destructive hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
                {isRTL() ? 'مسح السلة' : 'Clear Cart'}
              </Button>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-card border-accent/30 premium-shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center"
                  >
                    <Star className="h-5 w-5 text-white" />
                  </motion.div>
                  {isRTL() ? 'ملخص الطلب' : 'Order Summary'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items Count */}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {isRTL() ? 'إجمالي العناصر' : 'Total Items'}
                  </span>
                  <span className="font-medium">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>{isRTL() ? 'المجموع (USD)' : 'Total (USD)'}</span>
                    <span className="text-primary">${total.usd.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>{isRTL() ? 'المجموع (AED)' : 'Total (AED)'}</span>
                    <span className="text-primary">{total.aed.toFixed(2)} AED</span>
                  </div>
                </div>

                <Separator />

                {/* Checkout Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    asChild
                    className="w-full gap-3 premium-gradient text-white font-bold py-6 premium-shadow-lg neon-border transition-all duration-500 group"
                  >
                    <Link href="/checkout">
                      <Crown className="h-5 w-5 group-hover:animate-pulse" />
                      <span className="text-lg">
                        {isRTL() ? 'المتابعة للدفع' : 'Proceed to Checkout'}
                      </span>
                      <ArrowRight className="h-5 w-5 group-hover:animate-bounce" />
                    </Link>
                  </Button>
                </motion.div>

                {/* Continue Shopping */}
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2 glass-card"
                    asChild
                  >
                    <Link href="/products">
                      <Package className="h-4 w-4" />
                      {isRTL() ? 'متابعة التسوق' : 'Continue Shopping'}
                    </Link>
                  </Button>
                </motion.div>

                <p className="text-xs text-muted-foreground text-center">
                  {isRTL() 
                    ? 'الأسعار شاملة جميع الرسوم المطبقة'
                    : 'Prices include all applicable fees'
                  }
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
    </div>
  );
}

'use client'

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShoppingCart, Share2, Heart, Package, Shield, Truck, Star, Check, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/hooks/use-translation';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { getProductById } from '@/data/products';
import { useAdmin } from '@/contexts/AdminContext';
import { handleImageError } from '@/lib/imageUtils';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, language, getCurrency, isRTL } = useTranslation();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { products } = useAdmin();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [addLaborServices, setAddLaborServices] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Use admin products if available, fallback to static data
  const allProducts = products.length > 0 ? products : [];
  const product = allProducts.find(p => p.id === id) || getProductById(id || '');
  const currency = getCurrency();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {isRTL() ? 'المنتج غير موجود' : 'Product not found'}
          </h1>
          <Button asChild>
            <Link href="/products">
              {isRTL() ? 'العودة للمنتجات' : 'Back to Products'}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const price = currency === 'USD' ? product.pricing.usd : product.pricing.aed;
  const laborServicePrice = Math.round(price * 0.3);
  const totalPrice = (price + (addLaborServices ? laborServicePrice : 0)) * quantity;

  const handleAddToCart = () => {
    const finalPrice = {
      usd: product.pricing.usd + (addLaborServices ? Math.round(product.pricing.usd * 0.3) : 0),
      aed: product.pricing.aed + (addLaborServices ? Math.round(product.pricing.aed * 0.3) : 0)
    };

    const cartItem = {
      type: 'product' as const,
      id: product.id,
      name: product.name[language],
      price: finalPrice,
      image: product.image,
      selectedSize,
      laborServices: addLaborServices,
      quantity
    };

    addToCart(cartItem);

    toast({
      title: isRTL() ? 'تم إضافة المنتج' : 'Product Added',
      description: isRTL()
        ? 'تم إضافة المنتج إلى السلة بنجاح'
        : 'Product has been added to cart successfully'
    });
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              {isRTL() ? 'الرئيسي��' : 'Home'}
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-600 transition-colors">
              {t('nav.products')}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name[language]}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: isRTL() ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-square shadow-lg">
              <img
                src={product.image}
                alt={product.name[language]}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
                onError={handleImageError}
                width={500}
                height={500}
              />
              {product.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-orange-500 text-white flex items-center gap-1 shadow-lg">
                    <Star className="w-3 h-3 fill-white" />
                    {isRTL() ? 'مميز' : 'Featured'}
                  </Badge>
                </div>
              )}
              {/* Image overlay for better visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <Shield className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-xs font-medium text-green-800">
                  {isRTL() ? 'ضمان الجودة' : 'Quality Guaranteed'}
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Package className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-xs font-medium text-blue-800">
                  {isRTL() ? 'تعبئة آمنة' : 'Secure Packaging'}
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Truck className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="text-xs font-medium text-purple-800">
                  {isRTL() ? 'توصيل سريع' : 'Fast Delivery'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: isRTL() ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Product Header */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name[language]}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description[language]}
              </p>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {isRTL() ? 'السعر' : 'Price'}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-gray-900">
                      {currency === 'USD' ? `$${product.pricing.usd}` : `${product.pricing.aed} AED`}
                    </span>
                    {currency === 'USD' && (
                      <span className="text-lg text-gray-500">
                        ({product.pricing.aed} AED)
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
                    <Check className="w-3 h-3 mr-1" />
                    {isRTL() ? 'متوفر' : 'In Stock'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  {isRTL() ? 'المواصفات' : 'Specifications'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.specifications.map((spec, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Product Options */}
            <div className="space-y-6">
              {/* Size Selection */}
              {product.sizes && (
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-3 block">
                    {isRTL() ? 'اختر الحجم' : 'Select Size'}
                  </Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={isRTL() ? 'اختر الحجم' : 'Choose size'} />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Quantity */}
              <div>
                <Label className="text-base font-medium text-gray-900 mb-3 block">
                  {isRTL() ? 'الكمية' : 'Quantity'}
                </Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-bold text-lg min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={incrementQuantity}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Labor Services */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="labor-services" className="font-medium text-gray-900 text-base">
                      {t('common.laborServices')}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      {isRTL() 
                        ? `إضافة خدمات العمالة (+${currency === 'USD' ? '$' + laborServicePrice : laborServicePrice + ' AED'})`
                        : `Professional installation (+${currency === 'USD' ? '$' + laborServicePrice : laborServicePrice + ' AED'})`
                      }
                    </p>
                  </div>
                  <Switch
                    id="labor-services"
                    checked={addLaborServices}
                    onCheckedChange={setAddLaborServices}
                  />
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">
                    {isRTL() ? 'سعر المنتج' : 'Product Price'}
                  </span>
                  <span className="font-medium">
                    {currency === 'USD' ? `$${price}` : `${price} AED`}
                  </span>
                </div>
                
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">
                    {isRTL() ? 'الكمية' : 'Quantity'}
                  </span>
                  <span className="font-medium">×{quantity}</span>
                </div>

                {addLaborServices && (
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">
                      {isRTL() ? 'خدمات العمالة' : 'Labor Services'}
                    </span>
                    <span className="font-medium">
                      {currency === 'USD' ? `$${laborServicePrice}` : `${laborServicePrice} AED`}
                    </span>
                  </div>
                )}

                <Separator />
                
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-gray-900">
                    {isRTL() ? 'المجموع' : 'Total'}
                  </span>
                  <span className="text-blue-600">
                    {currency === 'USD' ? `$${totalPrice}` : `${totalPrice} AED`}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isRTL() ? 'إضافة إلى السلة' : 'Add to Cart'}
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button asChild variant="outline" size="lg" className="h-12">
                  <Link href="/order">
                    <Package className="h-4 w-4 mr-2" />
                    {isRTL() ? 'طلب مباشر' : 'Quick Order'}
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-12">
                  <Heart className="h-4 w-4 mr-2" />
                  {isRTL() ? 'حفظ' : 'Save'}
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                {isRTL() ? 'معلومات إضافية' : 'Product Information'}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 block">
                    {isRTL() ? 'الفئة' : 'Category'}
                  </span>
                  <span className="font-medium text-gray-900">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 block">
                    {isRTL() ? 'رقم المنتج' : 'Product ID'}
                  </span>
                  <span className="font-medium text-gray-900">
                    {product.id.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Back to Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button variant="outline" asChild className="gap-2">
            <Link href="/products">
              {isRTL() ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
              {isRTL() ? 'العودة للمنتجات' : 'Back to Products'}
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

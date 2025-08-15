'use client'

import { useState } from 'react';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShoppingCart, Share2, Heart, Package, Shield, Truck } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/use-translation';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { getProductById } from '@/data/products';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, language, getCurrency, isRTL } = useTranslation();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [addLaborServices, setAddLaborServices] = useState(false);
  
  const product = getProductById(id || '');
  const currency = getCurrency();

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {isRTL() ? 'المنتج غير موجود' : 'Product not found'}
          </h1>
          <Button asChild>
            <Link href="/products">
              {isRTL() ? 'العودة للمنتجات' : 'Back to Products'}
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const price = currency === 'USD' ? product.pricing.usd : product.pricing.aed;
  const laborServicePrice = Math.round(price * 0.3); // 30% of product price for labor

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
      laborServices: addLaborServices
    };

    addToCart(cartItem);

    toast({
      title: isRTL() ? 'تم إضافة المنتج' : 'Product Added',
      description: isRTL()
        ? 'تم إضافة المنتج إلى السلة بنجاح'
        : 'Product has been added to cart successfully'
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            {isRTL() ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary transition-colors">
            {t('nav.products')}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name[language]}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: isRTL() ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="sticky top-8">
              <div className="relative bg-accent/20 rounded-2xl overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name[language]}
                  className="w-full h-96 object-cover"
                />
                {product.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">
                      {isRTL() ? 'مميز' : 'Featured'}
                    </Badge>
                  </div>
                )}
              </div>
              
              {/* Product Features */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-card rounded-lg border">
                  <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-xs font-medium text-foreground">
                    {isRTL() ? 'ضمان الجودة' : 'Quality Assured'}
                  </div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border">
                  <Package className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-xs font-medium text-foreground">
                    {isRTL() ? 'تعبئة آمنة' : 'Secure Packaging'}
                  </div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border">
                  <Truck className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-xs font-medium text-foreground">
                    {isRTL() ? 'توصيل سريع' : 'Fast Delivery'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: isRTL() ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Product Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name[language]}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {product.description[language]}
              </p>

              {/* Specifications */}
              {product.specifications && (
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    {isRTL() ? 'المواصفات' : 'Specifications'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.specifications.map((spec, index) => (
                      <Badge key={index}>
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {isRTL() ? 'تفاصيل الطلب' : 'Order Details'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Size Selection */}
                {product.sizes && (
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">
                      {isRTL() ? 'اختر الحجم' : 'Select Size'}
                    </Label>
                    <Select value={selectedSize} onValueChange={setSelectedSize}>
                      <SelectTrigger>
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

                {/* Labor Services */}
                <div className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
                  <div>
                    <Label htmlFor="labor-services" className="font-medium text-foreground">
                      {t('common.laborServices')}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {isRTL() 
                        ? `إضافة خدمات العمالة (+${currency === 'USD' ? '$' + laborServicePrice : laborServicePrice + ' AED'})`
                        : `Add professional installation (+${currency === 'USD' ? '$' + laborServicePrice : laborServicePrice + ' AED'})`
                      }
                    </p>
                  </div>
                  <Switch
                    id="labor-services"
                    checked={addLaborServices}
                    onCheckedChange={setAddLaborServices}
                  />
                </div>

                {/* Price Summary */}
                <div className="space-y-3 p-4 bg-card border rounded-lg">
                  {language === 'en' ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Product Price (USD)</span>
                        <span className="font-medium">${product.pricing.usd}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Product Price (AED)</span>
                        <span className="font-medium">{product.pricing.aed} AED</span>
                      </div>
                      {addLaborServices && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Labor Services (USD)</span>
                            <span className="font-medium">${Math.round(product.pricing.usd * 0.3)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Labor Services (AED)</span>
                            <span className="font-medium">{Math.round(product.pricing.aed * 0.3)} AED</span>
                          </div>
                        </>
                      )}
                      <div className="border-t pt-3">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-lg font-semibold text-foreground">Total (USD)</span>
                            <span className="text-xl font-bold text-primary">
                              ${product.pricing.usd + (addLaborServices ? Math.round(product.pricing.usd * 0.3) : 0)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-lg font-semibold text-foreground">Total (AED)</span>
                            <span className="text-xl font-bold text-primary">
                              {product.pricing.aed + (addLaborServices ? Math.round(product.pricing.aed * 0.3) : 0)} AED
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">سعر المنتج</span>
                        <span className="font-medium">{price} AED</span>
                      </div>
                      {addLaborServices && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">خدمات العمالة</span>
                          <span className="font-medium">{laborServicePrice} AED</span>
                        </div>
                      )}
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="text-lg font-semibold text-foreground">المجموع</span>
                          <span className="text-2xl font-bold text-primary">
                            {price + (addLaborServices ? laborServicePrice : 0)} AED
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full gap-2 premium-gradient text-white font-bold premium-shadow-lg hover:premium-shadow-xl transition-all duration-300 hover:scale-105 h-12 text-base"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {isRTL() ? 'إضافة إلى السلة' : 'Add to Cart'}
                  </Button>
                  <div className="grid grid-cols-3 gap-3">
                    <Button asChild className="gap-2">
                      <Link href="/order">
                        <Package className="h-4 w-4" />
                        {isRTL() ? 'طلب مباشر' : 'Quick Order'}
                      </Link>
                    </Button>
                    <Button className="gap-2 outline">
                      <Heart className="h-4 w-4" />
                      {isRTL() ? 'حفظ' : 'Save'}
                    </Button>
                    <Button className="gap-2 outline px-6 py-3 text-base">
                      <Share2 className="h-4 w-4" />
                      {isRTL() ? 'مشاركة' : 'Share'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {isRTL() ? 'معلومات إضافية' : 'Additional Information'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {isRTL() ? 'الف��ة' : 'Category'}
                  </span>
                  <span className="font-medium text-foreground">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {isRTL() ? 'رقم المنتج' : 'Product ID'}
                  </span>
                  <span className="font-medium text-foreground">
                    {product.id.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {isRTL() ? 'التوفر' : 'Availability'}
                  </span>
                  <span className="font-medium text-green-600">
                    {isRTL() ? 'متوفر' : 'In Stock'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Back to Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button className="gap-2 outline" asChild>
            <Link href="/products">
              {isRTL() ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
              {isRTL() ? 'العودة للمنتجات' : 'Back to Products'}
            </Link>
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
}

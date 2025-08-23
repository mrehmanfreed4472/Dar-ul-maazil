'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/use-translation';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/data/products';
import type { ExtendedProduct } from '@/lib/productManager';
import { handleImageError } from '@/lib/imageUtils';

interface ProductCardProps {
  product: Product | ExtendedProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { language, getCurrency, isRTL } = useTranslation();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const currency = getCurrency();

  const handleAddToCart = () => {
    const cartItem = {
      type: 'product' as const,
      id: product.id,
      name: product.name[language],
      price: product.pricing,
      image: product.image
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
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group glass-effect hover:premium-shadow-lg transition-all duration-300 border-border/30 hover:border-primary/30 h-full overflow-hidden hover:-translate-y-1">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name[language]}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={handleImageError}
            width={320}
            height={192}
          />
          {product.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-primary/90 text-primary-foreground border-0">
                {isRTL() ? 'مميز' : 'Featured'}
              </Badge>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                asChild
              >
                <Link href={`/products/${product.id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {product.name[language]}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-3">
            {product.description[language]}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0 space-y-4">
          {product.specifications && (
            <div className="flex flex-wrap gap-1">
              {product.specifications.slice(0, 3).map((spec, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              {language === 'en' ? (
                <div>
                  <div className="text-lg font-bold text-primary">
                    ${product.pricing.usd} USD
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {product.pricing.aed} AED
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {product.pricing.aed} AED
                  </div>
                  <div className="text-xs text-muted-foreground">
                    لكل وحدة
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 group-hover:border-primary/50 transition-colors"
              asChild
            >
              <Link href={`/products/${product.id}`}>
                {isRTL() ? 'عرض التفاصيل' : 'View Details'}
              </Link>
            </Button>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="gap-2 gradient-primary text-white font-medium hover:scale-105 transition-all duration-300"
            >
              <ShoppingCart className="h-4 w-4" />
              {isRTL() ? 'أضف للسلة' : 'Add to Cart'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

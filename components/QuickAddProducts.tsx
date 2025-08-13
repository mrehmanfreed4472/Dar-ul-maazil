import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/use-translation';
import { featuredProducts } from '@/data/products';

interface QuickAddProductsProps {
  onAddProduct: (productId: string) => void;
  existingProductIds: string[];
}

export function QuickAddProducts({ onAddProduct, existingProductIds }: QuickAddProductsProps) {
  const { language, isRTL } = useTranslation();

  const availableFeaturedProducts = featuredProducts.filter(
    product => !existingProductIds.includes(product.id)
  );

  if (availableFeaturedProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h4 className="font-medium text-foreground">
          {isRTL() ? 'إضافة سريعة - المنتجات المميزة' : 'Quick Add - Featured Products'}
        </h4>
        <Badge variant="secondary" className="bg-accent/50">
          {isRTL() ? 'مميز' : 'Featured'}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {availableFeaturedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: isRTL() ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="p-3 glass-effect rounded-lg border-border/30 hover:border-primary/30 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-sm text-foreground truncate">
                    {product.name[language]}
                  </h5>
                  <div className="mt-1">
                    {language === 'en' ? (
                      <div className="text-xs space-y-1">
                        <div className="font-medium text-primary">
                          ${product.pricing.usd} USD
                        </div>
                        <div className="text-muted-foreground">
                          {product.pricing.aed} AED
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm font-medium text-primary">
                        {product.pricing.aed} AED
                      </div>
                    )}
                  </div>
                </div>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAddProduct(product.id)}
                  className="gap-2 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
                >
                  <Plus className="h-3 w-3" />
                  {isRTL() ? 'إضافة' : 'Add'}
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

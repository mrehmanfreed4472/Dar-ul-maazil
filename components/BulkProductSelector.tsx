import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Plus, Search, Filter, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from '@/hooks/use-translation';
import { getAllProducts, productCategories, Product } from '@/data/products';

interface BulkProductSelectorProps {
  onAddProducts: (productIds: string[]) => void;
  existingProductIds: string[];
}

export function BulkProductSelector({ onAddProducts, existingProductIds }: BulkProductSelectorProps) {
  const { language, isRTL } = useTranslation();
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const allProducts = getAllProducts();

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description[language].toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const selectAll = () => {
    const newSelected = new Set(filteredProducts.map(p => p.id));
    setSelectedProducts(newSelected);
  };

  const clearAll = () => {
    setSelectedProducts(new Set());
  };

  const addSelectedProducts = () => {
    const productsToAdd = Array.from(selectedProducts).filter(
      id => !existingProductIds.includes(id)
    );
    if (productsToAdd.length > 0) {
      onAddProducts(productsToAdd);
      setSelectedProducts(new Set());
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <Card className="glass-card border-accent/20 premium-shadow-lg hover:premium-shadow transition-all duration-300 hover:border-accent/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 premium-gradient rounded-xl flex items-center justify-center pulse-glow"
          >
            <Package className="h-6 w-6 text-white" />
          </motion.div>
          <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent font-bold text-xl">
            {isRTL() ? 'إضافة منتجات متعددة' : 'Add Multiple Products'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={isRTL() ? 'البحث عن المنتجات...' : 'Search products...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder={isRTL() ? 'اختر الفئة' : 'Select Category'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {isRTL() ? 'جميع الفئات' : 'All Categories'}
              </SelectItem>
              {productCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name[language]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selection Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={selectAll}>
              {isRTL() ? 'تحديد الكل' : 'Select All'}
            </Button>
            <Button variant="outline" size="sm" onClick={clearAll}>
              {isRTL() ? 'إلغاء التحديد' : 'Clear All'}
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {selectedProducts.size} {isRTL() ? 'منتج محدد' : 'selected'}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto"
        >
          {filteredProducts.map((product) => {
            const isSelected = selectedProducts.has(product.id);
            const isAlreadyAdded = existingProductIds.includes(product.id);
            
            return (
              <motion.div key={product.id} variants={itemVariants}>
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-primary bg-primary/10' 
                      : isAlreadyAdded
                      ? 'border-muted bg-muted/20 opacity-50'
                      : 'border-border hover:border-primary/50 hover:bg-accent/50'
                  }`}
                  onClick={() => !isAlreadyAdded && toggleProduct(product.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {isAlreadyAdded ? (
                        <Badge variant="secondary" className="text-xs">
                          {isRTL() ? 'مضاف' : 'Added'}
                        </Badge>
                      ) : (
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleProduct(product.id)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-foreground truncate">
                        {product.name[language]}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {product.description[language]}
                      </p>
                      
                      <div className="mt-2">
                        {language === 'en' ? (
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-primary">
                              ${product.pricing.usd} USD
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {product.pricing.aed} AED
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm font-medium text-primary">
                            {product.pricing.aed} AED
                          </div>
                        )}
                      </div>

                      {product.featured && (
                        <Badge variant="secondary" className="mt-2 text-xs bg-accent/50">
                          {isRTL() ? 'مميز' : 'Featured'}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-muted-foreground">
              {isRTL() ? 'لم يتم العثور على منتجات' : 'No products found'}
            </p>
          </div>
        )}

        {/* Add Button */}
        {selectedProducts.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={addSelectedProducts}
                className="w-full gap-2 premium-gradient text-white font-bold premium-shadow-lg neon-border transition-all duration-500 group py-3"
              >
                <Plus className="h-5 w-5 group-hover:animate-spin" />
                <span className="text-lg">
                  {isRTL()
                    ? `إضافة ${selectedProducts.size} منتج`
                    : `Add ${selectedProducts.size} Product${selectedProducts.size > 1 ? 's' : ''}`
                  }
                </span>
                <Package className="h-5 w-5 group-hover:animate-bounce" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

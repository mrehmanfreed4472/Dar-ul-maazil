'use client'

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/hooks/use-translation';
import { getAllProducts, getProductsByCategory, productCategories } from '@/data/products';
import { useAdmin } from '@/contexts/AdminContext';
import { DAMLogo } from '@/components/DAMLogo';

export default function Products() {
  const { t, language, isRTL } = useTranslation();
  const { products } = useAdmin(); // Use admin products data
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Use admin products if available, fallback to static data
  const allProducts = products.length > 0 ? products : getAllProducts();

  const filteredProducts = useMemo(() => {
    let filteredProducts = selectedCategory === 'all'
      ? allProducts
      : allProducts.filter(product => product.category === selectedCategory);

    // Search filter
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description[language].toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.pricing.usd - b.pricing.usd;
        case 'price-high':
          return b.pricing.usd - a.pricing.usd;
        case 'name':
        default:
          return a.name[language].localeCompare(b.name[language]);
      }
    });

    return filteredProducts;
  }, [allProducts, selectedCategory, searchQuery, sortBy, language]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('nav.products')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRTL() 
              ? 'اكتشف مجموعتنا الشاملة من مواد البناء والعزل عالية الجودة'
              : 'Discover our comprehensive range of premium construction and insulation materials'
            }
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-effect rounded-2xl border-border/30 p-8 mb-8 premium-shadow"
        >
          {/* Search Header */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Filter className="h-5 w-5" />
              {isRTL() ? 'البحث والتصفية' : 'Search & Filter'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={isRTL() ? 'البحث عن المنتجات...' : 'Search products...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
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

            {/* Sort */}
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue placeholder={isRTL() ? 'ترتيب حسب' : 'Sort by'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">
                  {isRTL() ? 'الاسم' : 'Name'}
                </SelectItem>
                <SelectItem value="price-low">
                  {isRTL() ? 'السعر: منخفض إلى مرتفع' : 'Price: Low to High'}
                </SelectItem>
                <SelectItem value="price-high">
                  {isRTL() ? 'السعر: مرتفع إلى منخفض' : 'Price: High to Low'}
                </SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={`flex-1 transition-all duration-300 ${viewMode === 'grid' ? 'gradient-primary text-white' : 'glass-effect hover:bg-primary/10'}`}
              >
                <Grid className="h-4 w-4 mr-2" />
                {isRTL() ? 'شبكة' : 'Grid'}
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={`flex-1 transition-all duration-300 ${viewMode === 'list' ? 'gradient-primary text-white' : 'glass-effect hover:bg-primary/10'}`}
              >
                <List className="h-4 w-4 mr-2" />
                {isRTL() ? 'قائمة' : 'List'}
              </Button>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-muted-foreground">
            {isRTL() 
              ? `��رض ${filteredProducts.length} من ${allProducts.length} منتج`
              : `Showing ${filteredProducts.length} of ${allProducts.length} products`
            }
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 lg:grid-cols-2'
          }`}
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* No results */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {isRTL() ? 'لم يتم العثور على منتجات' : 'No products found'}
            </h3>
            <p className="text-muted-foreground">
              {isRTL() 
                ? 'جرب تغيير معايير البحث أو الفلترة'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

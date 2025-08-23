'use client'

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  ChevronDown, 
  ChevronRight, 
  Package, 
  Award, 
  Layers,
  ShoppingCart,
  Eye,
  Star
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/use-translation';
import { hierarchicalProducts } from '@/data/products-hierarchy';
import type { MainProduct, SubProduct } from '@/data/products-hierarchy';
import { productCategories } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useAdmin } from '@/contexts/AdminContext';
import { getTechExplanation, friendlySpec, getInstallationDifficulty, getRecommendedUse } from '@/lib/productTerms';

interface ExpandedProducts {
  [key: string]: boolean;
}

export default function HierarchicalProducts() {
  const { t, language, isRTL } = useTranslation();
  const { addToCart } = useCart();
  const { getHierarchicalProducts } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedProducts, setExpandedProducts] = useState<ExpandedProducts>({});

  // Get products from admin context instead of static data
  const hierarchicalProductsData = getHierarchicalProducts();

  const filteredProducts = useMemo(() => {
    let filteredProducts = selectedCategory === 'all'
      ? hierarchicalProductsData
      : hierarchicalProductsData.filter(product => product.category === selectedCategory);

    // Search filter
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subProducts.some(sub => 
          sub.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.description[language].toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Sort products
    filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          const aMinPrice = Math.min(...a.subProducts.map(sub => sub.pricing.usd));
          const bMinPrice = Math.min(...b.subProducts.map(sub => sub.pricing.usd));
          return aMinPrice - bMinPrice;
        case 'price-high':
          const aMaxPrice = Math.max(...a.subProducts.map(sub => sub.pricing.usd));
          const bMaxPrice = Math.max(...b.subProducts.map(sub => sub.pricing.usd));
          return bMaxPrice - aMaxPrice;
        case 'name':
        default:
          return a.name[language].localeCompare(b.name[language]);
      }
    });

    return filteredProducts;
  }, [selectedCategory, searchQuery, sortBy, language, hierarchicalProductsData]);

  const toggleProductExpansion = (productId: string) => {
    setExpandedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const handleAddToCart = (subProduct: SubProduct, mainProduct: MainProduct) => {
    addToCart({
      type: 'product',
      id: subProduct.id,
      name: subProduct.name[language],
      price: subProduct.pricing,
      image: subProduct.image
    });
  };

  const getPriceRange = (subProducts: SubProduct[]) => {
    const prices = subProducts.map(sub => sub.pricing.usd);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `$${min}` : `$${min} - $${max}`;
  };

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

  const MainProductCard = ({ product }: { product: MainProduct }) => {
    const isExpanded = expandedProducts[product.id];
    const priceRange = getPriceRange(product.subProducts);
    const firstProductImage = product.subProducts[0]?.image;

    return (
      <motion.div variants={itemVariants}>
        <Card className="glass-effect border-border/30 hover:border-primary/40 transition-all duration-300 premium-shadow overflow-hidden">
          <div className="flex">
            {/* Product Image Section */}
            <div className="flex-shrink-0 w-48 bg-gray-50">
              <div className="h-full p-6 flex items-center justify-center">
                {firstProductImage ? (
                  <div className="w-32 h-32 bg-white rounded-lg shadow-sm overflow-hidden border border-border/20">
                    <img
                      src={firstProductImage}
                      alt={product.name[language]}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-primary/10 rounded-lg flex items-center justify-center">
                    <div className="text-4xl">{product.icon}</div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Content Section */}
            <div className="flex-1">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{product.icon}</div>
                    <div>
                      <CardTitle className="text-lg font-bold text-foreground mb-1">
                        {product.name[language]}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {product.description[language]}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.featured && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        <Star className="h-3 w-3 mr-1" />
                        {isRTL() ? 'مميز' : 'Featured'}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {product.subProducts.length} {isRTL() ? 'خيار' : 'Options'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Overview */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.overview[language]}
                </p>

                {/* Features & Applications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      {isRTL() ? 'المميزات' : 'Features'}
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {product.features[language].slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                      <Package className="h-4 w-4" />
                      {isRTL() ? 'التطبيقات' : 'Applications'}
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {product.applications[language].slice(0, 3).map((application, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                          {application}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price Range & Action */}
                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {isRTL() ? 'نطاق السعر' : 'Price Range'}
                    </p>
                    <p className="text-lg font-bold text-primary">{priceRange}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="gradient-hover"
                    onClick={() => toggleProductExpansion(product.id)}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        {isRTL() ? 'إخفاء الخيارات' : 'Hide Options'}
                      </>
                    ) : (
                      <>
                        <ChevronRight className="h-4 w-4 mr-2" />
                        {isRTL() ? 'عرض الخيارات' : 'See Options'}
                      </>
                    )}
                  </Button>
                </div>

                {/* Sub Products */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3 pt-4 border-t border-border/30"
                    >
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Layers className="h-4 w-4" />
                        {isRTL() ? 'الخيا��ات المتاحة' : 'Available Options'}
                      </h4>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {product.subProducts.map((subProduct) => (
                          <SubProductCard 
                            key={subProduct.id} 
                            subProduct={subProduct} 
                            mainProduct={product}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  const SubProductCard = ({ subProduct, mainProduct }: { subProduct: SubProduct; mainProduct: MainProduct }) => {
    const difficulty = getInstallationDifficulty(subProduct.specifications);
    const recommendedUse = getRecommendedUse(mainProduct.applications[language], language);

    return (
      <Card className="border border-border/20 bg-background/50 hover:bg-background/80 transition-all duration-200">
        <CardContent className="p-4">
          <div className="flex gap-3 mb-3">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-border/20">
                <img
                  src={subProduct.image}
                  alt={subProduct.name[language]}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
            </div>
            
            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h5 className="font-semibold text-sm text-foreground mb-1">
                {subProduct.name[language]}
              </h5>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {subProduct.description[language]}
              </p>

              {/* User-friendly info */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge
                  variant={subProduct.availability === 'in_stock' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {subProduct.availability === 'in_stock'
                    ? (isRTL() ? 'متوفر' : 'In Stock')
                    : (isRTL() ? 'غير متوفر' : 'Out of Stock')
                  }
                </Badge>

                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  {difficulty.label[language]}
                </Badge>

                {recommendedUse.length > 0 && (
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    {isRTL() ? 'مناسب للـ' : 'Good for'}: {recommendedUse[0]}
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Price Section */}
            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold text-primary">${subProduct.pricing.usd}</p>
              <p className="text-xs text-muted-foreground">AED {subProduct.pricing.aed}</p>
              {subProduct.sizes && subProduct.sizes[0] && (
                <p className="text-xs text-muted-foreground mt-1">
                  {isRTL() ? 'الحجم' : 'Size'}: {subProduct.sizes[0]}
                </p>
              )}
            </div>
          </div>

          {/* User-friendly specifications */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {subProduct.specifications.slice(0, 2).map((spec, index) => {
                const explanation = getTechExplanation(spec, language);
                const friendlySpecText = friendlySpec(spec, language);

                return (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs cursor-help"
                    title={explanation || undefined}
                  >
                    {friendlySpecText}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs"
              onClick={() => handleAddToCart(subProduct, mainProduct)}
              disabled={subProduct.availability !== 'in_stock'}
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              {isRTL() ? 'أضف للسلة' : 'Add to Cart'}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="px-3"
              aria-label={isRTL() ? 'عرض التفاصيل' : 'View details'}
              title={isRTL() ? 'عرض التفاصيل' : 'View details'}
            >
              <Eye className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
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
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {isRTL()
              ? 'اعثر على منتجات العزل والعزل المائي المناسبة لمشروعك بسهولة — قارن الخيارات واطلب بثقة'
              : 'Find the right insulation and waterproofing products for your project — compare options and buy with confidence'
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
                placeholder={isRTL() ? 'البحث في المنتجات والفئ��ت...' : 'Search products and categories...'}
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
                  {isRTL() ? 'السع��: مرتفع إلى منخفض' : 'Price: High to Low'}
                </SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={`flex-1 transition-all duration-300 ${viewMode === 'grid' ? 'bg-primary text-white' : 'glass-effect hover:bg-primary/10'}`}
              >
                <Grid className="h-4 w-4 mr-2" />
                {isRTL() ? 'شبكة' : 'Grid'}
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={`flex-1 transition-all duration-300 ${viewMode === 'list' ? 'bg-primary text-white' : 'glass-effect hover:bg-primary/10'}`}
              >
                <List className="h-4 w-4 mr-2" />
                {isRTL() ? 'قائمة' : 'List'}
              </Button>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
            <Package className="h-4 w-4" />
            {isRTL()
              ? `عرض ${filteredProducts.length} من ${hierarchicalProductsData.length} خط منتج`
              : `Showing ${filteredProducts.length} of ${hierarchicalProductsData.length} product lines`
            }
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {filteredProducts.map((product) => (
            <MainProductCard key={product.id} product={product} />
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

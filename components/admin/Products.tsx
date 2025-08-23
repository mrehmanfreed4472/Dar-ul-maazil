import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Upload,
  MoreVertical,
  Star,
  DollarSign,
  Tag,
  Image,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useAdmin } from '@/contexts/AdminContext';
import { useTranslation } from '@/hooks/use-translation';
import { useToast } from '@/hooks/use-toast';
import { Product, productCategories } from '@/data/products';
import { ImageUpload } from '@/components/ui/image-upload';
import { DAMLogo } from '@/components/DAMLogo';
import { PersistenceNotification } from './PersistenceNotification';
import { handleImageError } from '@/lib/imageUtils';
import type { ExtendedProduct } from '@/lib/productManager';

interface ProductFormData {
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  category: string;
  pricing: { usd: number; aed: number };
  image: string;
  featured: boolean;
  specifications?: string[];
  sizes?: string[];
  availability: 'in_stock' | 'out_of_stock' | 'limited' | 'low_stock';
  stockQuantity: number;
  minStockLevel: number;
  isMainProduct?: boolean;
  parentProductId?: string;
  applications?: string[];
  features?: string[];
}

export default function AdminProducts() {
  const { isRTL } = useTranslation();
  const { toast } = useToast();
  const { products, addProduct, updateProduct, deleteProduct, exportData } = useAdmin();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ExtendedProduct | null>(null);
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: { en: '', ar: '' },
    description: { en: '', ar: '' },
    category: '',
    pricing: { usd: 0, aed: 0 },
    image: '',
    featured: false,
    specifications: [],
    sizes: [],
    availability: 'in_stock',
    stockQuantity: 0,
    minStockLevel: 10,
    isMainProduct: false,
    parentProductId: undefined,
    applications: [],
    features: []
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name.ar.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const extendedProduct = product as ExtendedProduct;
    const matchesAvailability = availabilityFilter === 'all' ||
      extendedProduct.availability === availabilityFilter;
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const resetForm = () => {
    setFormData({
      name: { en: '', ar: '' },
      description: { en: '', ar: '' },
      category: '',
      pricing: { usd: 0, aed: 0 },
      image: '',
      featured: false,
      specifications: [],
      sizes: [],
      availability: 'in_stock',
      stockQuantity: 0,
      minStockLevel: 10,
      isMainProduct: false,
      parentProductId: undefined,
      applications: [],
      features: []
    });
  };

  const handleAddProduct = () => {
    if (!formData.name.en || !formData.category || !formData.pricing.usd) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    const newProduct: Omit<ExtendedProduct, 'id'> = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      pricing: formData.pricing,
      image: formData.image || 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg',
      featured: formData.featured,
      specifications: formData.specifications?.filter(spec => spec.trim() !== ''),
      sizes: formData.sizes?.filter(size => size.trim() !== ''),
      availability: formData.availability,
      stockQuantity: formData.stockQuantity,
      minStockLevel: formData.minStockLevel,
      isMainProduct: formData.isMainProduct,
      parentProductId: formData.parentProductId,
      applications: formData.applications?.filter(app => app.trim() !== ''),
      features: formData.features?.filter(feature => feature.trim() !== '')
    };

    addProduct(newProduct);
    setIsAddModalOpen(false);
    resetForm();
    
    toast({
      title: isRTL() ? 'تم إضافة المنتج' : 'Product Added',
      description: isRTL() ? 'تم إضافة المنتج بنجاح' : 'Product has been added successfully'
    });
  };

  const handleEditProduct = () => {
    if (!selectedProduct || !formData.name.en || !formData.category || !formData.pricing.usd) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    const updates: Partial<ExtendedProduct> = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      pricing: formData.pricing,
      image: formData.image || selectedProduct.image,
      featured: formData.featured,
      specifications: formData.specifications?.filter(spec => spec.trim() !== ''),
      sizes: formData.sizes?.filter(size => size.trim() !== ''),
      availability: formData.availability,
      stockQuantity: formData.stockQuantity,
      minStockLevel: formData.minStockLevel,
      isMainProduct: formData.isMainProduct,
      parentProductId: formData.parentProductId,
      applications: formData.applications?.filter(app => app.trim() !== ''),
      features: formData.features?.filter(feature => feature.trim() !== '')
    };

    updateProduct(selectedProduct.id, updates);
    setIsEditModalOpen(false);
    setSelectedProduct(null);
    resetForm();
    
    toast({
      title: isRTL() ? 'تم تحديث المنتج' : 'Product Updated',
      description: isRTL() ? 'تم تحديث المنتج بنجاح' : 'Product has been updated successfully'
    });
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    deleteProduct(productId);
    toast({
      title: isRTL() ? 'تم حذف المنتج' : 'Product Deleted',
      description: `${productName} has been deleted successfully`
    });
  };

  const openEditModal = (product: ExtendedProduct) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      pricing: product.pricing,
      image: product.image,
      featured: product.featured,
      specifications: product.specifications || [],
      sizes: product.sizes || [],
      availability: product.availability || 'in_stock',
      stockQuantity: product.stockQuantity || 0,
      minStockLevel: product.minStockLevel || 10,
      isMainProduct: product.isMainProduct || false,
      parentProductId: product.parentProductId,
      applications: product.applications || [],
      features: product.features || []
    });
    setIsEditModalOpen(true);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in_stock': return 'gradient-success text-white';
      case 'low_stock': return 'gradient-warning text-white';
      case 'out_of_stock': return 'gradient-error text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...(prev.specifications || []), '']
    }));
  };

  const updateSpecification = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications?.map((spec, i) => i === index ? value : spec) || []
    }));
  };

  const removeSpecification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications?.filter((_, i) => i !== index) || []
    }));
  };

  const addSize = () => {
    setFormData(prev => ({
      ...prev,
      sizes: [...(prev.sizes || []), '']
    }));
  };

  const updateSize = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes?.map((size, i) => i === index ? value : size) || []
    }));
  };

  const removeSize = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes?.filter((_, i) => i !== index) || []
    }));
  };

  const addApplication = () => {
    setFormData(prev => ({
      ...prev,
      applications: [...(prev.applications || []), '']
    }));
  };

  const updateApplication = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      applications: prev.applications?.map((app, i) => i === index ? value : app) || []
    }));
  };

  const removeApplication = (index: number) => {
    setFormData(prev => ({
      ...prev,
      applications: prev.applications?.filter((_, i) => i !== index) || []
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...(prev.features || []), '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.map((feature, i) => i === index ? value : feature) || []
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index) || []
    }));
  };

  // Calculate summary stats
  const summaryStats = {
    total: products.length,
    featured: products.filter(p => p.featured).length,
    categories: new Set(products.map(p => p.category)).size,
    avgPrice: products.length > 0 ? Math.round(products.reduce((sum, p) => sum + p.pricing.usd, 0) / products.length) : 0
  };

  const ProductFormFields = () => (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Stock</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="hierarchy">Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nameEn">Product Name (English) *</Label>
              <Input
                id="nameEn"
                value={formData.name.en}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  name: { ...prev.name, en: e.target.value }
                }))}
                placeholder="Enter product name in English"
              />
            </div>
            <div>
              <Label htmlFor="nameAr">Product Name (Arabic)</Label>
              <Input
                id="nameAr"
                value={formData.name.ar}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  name: { ...prev.name, ar: e.target.value }
                }))}
                placeholder="Enter product name in Arabic"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {productCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name.en}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="descEn">Description (English)</Label>
              <Textarea
                id="descEn"
                value={formData.description.en}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  description: { ...prev.description, en: e.target.value }
                }))}
                placeholder="Enter product description in English"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="descAr">Description (Arabic)</Label>
              <Textarea
                id="descAr"
                value={formData.description.ar}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  description: { ...prev.description, ar: e.target.value }
                }))}
                placeholder="Enter product description in Arabic"
                rows={3}
              />
            </div>
          </div>

          <ImageUpload
            value={formData.image}
            onChange={(value) => setFormData(prev => ({ ...prev, image: value }))}
            label="Product Image"
            placeholder="Upload product image or enter URL"
          />
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priceUsd">Price (USD) *</Label>
              <Input
                id="priceUsd"
                type="number"
                value={formData.pricing.usd}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  pricing: { ...prev.pricing, usd: parseFloat(e.target.value) || 0 }
                }))}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="priceAed">Price (AED) *</Label>
              <Input
                id="priceAed"
                type="number"
                value={formData.pricing.aed}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  pricing: { ...prev.pricing, aed: parseFloat(e.target.value) || 0 }
                }))}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stockQuantity">Stock Quantity</Label>
              <Input
                id="stockQuantity"
                type="number"
                value={formData.stockQuantity}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  stockQuantity: parseInt(e.target.value) || 0 
                }))}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="minStockLevel">Minimum Stock Level</Label>
              <Input
                id="minStockLevel"
                type="number"
                value={formData.minStockLevel}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  minStockLevel: parseInt(e.target.value) || 10 
                }))}
                placeholder="10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="availability">Availability Status</Label>
            <Select 
              value={formData.availability} 
              onValueChange={(value: 'in_stock' | 'low_stock' | 'out_of_stock') => setFormData(prev => ({ ...prev, availability: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="limited">Limited Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
            />
            <Label htmlFor="featured">Featured Product</Label>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Specifications</Label>
              <Button variant="outline" size="sm" onClick={addSpecification}>
                <Plus className="h-4 w-4 mr-1" />
                Add Spec
              </Button>
            </div>
            <div className="space-y-2">
              {formData.specifications?.map((spec, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={spec}
                    onChange={(e) => updateSpecification(index, e.target.value)}
                    placeholder="Enter specification"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeSpecification(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Available Sizes</Label>
              <Button variant="outline" size="sm" onClick={addSize}>
                <Plus className="h-4 w-4 mr-1" />
                Add Size
              </Button>
            </div>
            <div className="space-y-2">
              {formData.sizes?.map((size, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={size}
                    onChange={(e) => updateSize(index, e.target.value)}
                    placeholder="Enter size"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeSize(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hierarchy" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="isMainProduct">Product Type</Label>
              <Select
                value={formData.isMainProduct ? 'main' : 'sub'}
                onValueChange={(value) => setFormData(prev => ({
                  ...prev,
                  isMainProduct: value === 'main'
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Product (Product Line)</SelectItem>
                  <SelectItem value="sub">Sub Product (Variant)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!formData.isMainProduct && (
              <div>
                <Label htmlFor="parentProductId">Parent Product</Label>
                <Select
                  value={formData.parentProductId || ''}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    parentProductId: value || undefined
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.filter(p => p.isMainProduct).map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name.en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {formData.isMainProduct && (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Applications</Label>
                  <Button variant="outline" size="sm" onClick={addApplication}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Application
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.applications?.map((app, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={app}
                        onChange={(e) => updateApplication(index, e.target.value)}
                        placeholder="Enter application"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeApplication(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Features</Label>
                  <Button variant="outline" size="sm" onClick={addFeature}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Feature
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.features?.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="Enter feature"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Persistence Notification */}
      <PersistenceNotification
        type="products"
        hasChanges={products.length > 0}
      />

      {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {isRTL() ? 'إدارة المنتجات' : 'Product Management'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isRTL() ? 'إضافة وتحرير وإدارة منتجات المتجر' : 'Add, edit, and manage store products'}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => exportData('products')}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              {isRTL() ? 'تصدير' : 'Export'}
            </Button>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="gap-2 gradient-primary text-white"
            >
              <Plus className="h-4 w-4" />
              {isRTL() ? 'إضافة منتج' : 'Add Product'}
            </Button>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: isRTL() ? 'إجمالي المنتجات' : 'Total Products', value: summaryStats.total, icon: Package, color: 'gradient-primary' },
            { label: isRTL() ? 'منتجات مميزة' : 'Featured', value: summaryStats.featured, icon: Star, color: 'gradient-accent' },
            { label: isRTL() ? 'الفئات' : 'Categories', value: summaryStats.categories, icon: Layers, color: 'gradient-info' },
            { label: isRTL() ? 'متوسط السعر' : 'Avg Price', value: `$${summaryStats.avgPrice}`, icon: DollarSign, color: 'gradient-success' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="glass-card border-border/20 premium-shadow hover:premium-shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {stat.value}
                        </p>
                      </div>
                      <motion.div 
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="glass-card border-accent/20 premium-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  {isRTL() ? 'البحث والتصفية' : 'Search & Filter'}
                </div>
                <DAMLogo size="sm" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder={isRTL() ? 'البحث في المنتجات...' : 'Search products...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL() ? 'جميع الفئات' : 'All Categories'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL() ? 'جميع الفئات' : 'All Categories'}</SelectItem>
                    {productCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name.en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL() ? 'جميع المنتجات' : 'All Products'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL() ? 'جميع المنتجات' : 'All Products'}</SelectItem>
                    <SelectItem value="in_stock">{isRTL() ? 'متوفر' : 'In Stock'}</SelectItem>
                    <SelectItem value="low_stock">{isRTL() ? 'مخزون منخفض' : 'Low Stock'}</SelectItem>
                    <SelectItem value="out_of_stock">{isRTL() ? 'غ��ر متوفر' : 'Out of Stock'}</SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  {isRTL() ? `${filteredProducts.length} من ${products.length} منتج` : `${filteredProducts.length} of ${products.length} products`}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass-card border-border/20 premium-shadow hover:premium-shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name.en}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={handleImageError}
                      width={320}
                      height={192}
                    />
                    {product.featured && (
                      <div className="absolute top-2 left-2">
                        <Badge className="gradient-accent text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="secondary" size="sm" className="bg-white/90">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditModal(product)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteProduct(product.id, product.name.en)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-foreground line-clamp-2">
                          {product.name.en}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.description.en}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-primary">
                            ${product.pricing.usd}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {product.pricing.aed} AED
                          </div>
                        </div>
                        <Badge className={getAvailabilityColor((product as ExtendedProduct).availability || 'in_stock')}>
                          {(product as ExtendedProduct).availability || 'in_stock'}
                        </Badge>
                      </div>

                      {product.specifications && product.specifications.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {product.specifications.slice(0, 2).map((spec, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                          {product.specifications.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.specifications.length - 2} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {isRTL() ? 'لا توجد منتجات' : 'No Products Found'}
            </h3>
            <p className="text-muted-foreground">
              {isRTL() ? 'لم يتم العثور على منتجات مطابقة للبحث' : 'No products match your search criteria'}
            </p>
          </div>
        )}

        {/* Add Product Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {isRTL() ? 'إضافة منتج جديد' : 'Add New Product'}
              </DialogTitle>
              <DialogDescription>
                {isRTL() ? 'إضافة منتج جديد إلى المتجر' : 'Add a new product to the store'}
              </DialogDescription>
            </DialogHeader>

            <ProductFormFields />

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProduct} className="gradient-primary text-white">
                <Save className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Product Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                {isRTL() ? 'تحر��ر المنتج' : 'Edit Product'}
              </DialogTitle>
              <DialogDescription>
                {isRTL() ? 'تحرير معلومات المنتج' : 'Edit product information'}
              </DialogDescription>
            </DialogHeader>

            <ProductFormFields />

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditProduct} className="gradient-primary text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Droplets, Thermometer, Layers, Wrench, Crown, Star, Clock, Zap, AlertTriangle, ShoppingCart } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/hooks/use-translation';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { getAllServices, getServicesByCategory, serviceCategories, Service } from '@/data/services';
import { Link } from 'react-router-dom';

const iconMap = {
  Droplets,
  Thermometer,
  Layers,
  Wrench
};

export default function Services() {
  const { language, isRTL } = useTranslation();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  const allServices = getAllServices();

  const filteredServices = allServices.filter(service => {
    const matchesSearch = searchQuery === '' ||
      service.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description[language].toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.pricing.normal.usd - b.pricing.normal.usd;
      case 'price-high':
        return b.pricing.normal.usd - a.pricing.normal.usd;
      case 'name':
        return a.name[language].localeCompare(b.name[language]);
      case 'featured':
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'urgent': return <Zap className="h-4 w-4 text-orange-500" />;
      default: return <Clock className="h-4 w-4 text-green-500" />;
    }
  };

  const handleQuickAddService = (service: Service) => {
    const cartItem = {
      type: 'service' as const,
      id: service.id,
      name: service.name[language],
      price: service.pricing.normal, // Default to normal priority
      image: service.image,
      urgency: 'normal' as const
    };

    addToCart(cartItem);

    toast({
      title: isRTL() ? 'تم إضافة الخدمة' : 'Service Added',
      description: isRTL()
        ? 'تم إضافة الخدمة بأولوية عادية. يمكنك تعديل الخيارات في السل��.'
        : 'Service added with normal priority. You can modify options in cart.'
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'gradient-error text-white';
      case 'urgent': return 'gradient-warning text-white';
      default: return 'gradient-success text-white';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4 floating-animation"
          >
            <Crown className="inline-block w-12 h-12 mr-4 text-accent" />
            {isRTL() ? 'خدماتنا المتخصصة' : 'Our Professional Services'}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            {isRTL() 
              ? 'نقدم خدمات تركيب وصيانة العزل المائي والحراري بأعلى معايير الجودة مع خيارات الأولوية المختلفة'
              : 'We provide installation and maintenance services for waterproofing and thermal insulation with the highest quality standards and various priority options'
            }
          </motion.p>
        </motion.div>

        {/* Service Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {isRTL() ? 'فئات الخدمات' : 'Service Categories'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((category, index) => {
              const Icon = iconMap[category.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card 
                    className="glass-card border-primary/20 premium-shadow hover:premium-shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardHeader className="text-center">
                      <motion.div 
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-16 h-16 premium-gradient rounded-xl flex items-center justify-center mx-auto mb-4 pulse-glow"
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {category.name[language]}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {category.description[language]}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <Card className="glass-card border-accent/20 premium-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                {isRTL() ? 'البحث والتصفية' : 'Search & Filter'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder={isRTL() ? 'البحث في الخدمات...' : 'Search services...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL() ? 'جميع الفئات' : 'All Categories'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {isRTL() ? 'جميع الفئات' : 'All Categories'}
                    </SelectItem>
                    {serviceCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name[language]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL() ? 'ترتيب حسب' : 'Sort by'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">
                      {isRTL() ? 'المميزة أولاً' : 'Featured First'}
                    </SelectItem>
                    <SelectItem value="price-low">
                      {isRTL() ? 'السعر: منخفض إلى مرتفع' : 'Price: Low to High'}
                    </SelectItem>
                    <SelectItem value="price-high">
                      {isRTL() ? 'السعر: مرتفع إلى منخفض' : 'Price: High to Low'}
                    </SelectItem>
                    <SelectItem value="name">
                      {isRTL() ? 'الاسم' : 'Name'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
              whileHover={{ y: -5 }}
            >
              <Card className="group glass-card hover:premium-shadow-lg transition-all duration-300 border-border/30 hover:border-primary/30 h-full overflow-hidden">
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.name[language]}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {service.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge className="gradient-accent text-white status-badge">
                        <Star className="w-3 h-3 mr-1" />
                        {isRTL() ? 'مميز' : 'Featured'}
                      </Badge>
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {service.name[language]}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                    {service.description[language]}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 space-y-4">
                  {/* Pricing Options */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-foreground">
                      {isRTL() ? 'خيارات الأولوية' : 'Priority Options'}
                    </h4>
                    <div className="space-y-2">
                      {(['normal', 'urgent', 'emergency'] as const).map((urgency) => (
                        <div key={urgency} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            {getUrgencyIcon(urgency)}
                            <span className="capitalize">
                              {urgency === 'normal' && (isRTL() ? 'عادي' : 'Normal')}
                              {urgency === 'urgent' && (isRTL() ? 'عاجل' : 'Urgent')}
                              {urgency === 'emergency' && (isRTL() ? 'طارئ' : 'Emergency')}
                            </span>
                            <span className="text-muted-foreground">
                              ({service.duration[urgency]})
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary">
                              ${service.pricing[urgency].usd}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {service.pricing[urgency].aed} AED
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 group-hover:border-primary/50 transition-colors"
                      asChild
                    >
                      <Link to={`/service/${service.id}`}>
                        {isRTL() ? 'عرض التفاصيل' : 'View Details'}
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      className="gap-2 gradient-primary text-white font-medium hover:scale-105 transition-all duration-300"
                      asChild
                    >
                      <Link to={`/service/${service.id}`}>
                        <Crown className="h-4 w-4" />
                        {isRTL() ? 'طلب ��لخدمة' : 'Book Service'}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {isRTL() ? 'لم يتم العثور على خدمات' : 'No Services Found'}
            </h3>
            <p className="text-muted-foreground">
              {isRTL() 
                ? 'جرب تغيير معايير البحث أو التصفية'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, 
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
  Clock,
  AlertTriangle,
  Zap,
  Save,
  X,
  CheckCircle,
  Settings,
  TrendingUp,
  BarChart3,
  Calendar,
  Users
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
import { Service, serviceCategories } from '@/data/services';
import { ImageUpload } from '@/components/ui/image-upload';
import { DAMLogo } from '@/components/DAMLogo';
import { PersistenceNotification } from './PersistenceNotification';

interface ServiceFormData {
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  category: string;
  pricing: {
    normal: { usd: number; aed: number };
    urgent: { usd: number; aed: number };
    emergency: { usd: number; aed: number };
  };
  duration: {
    normal: string;
    urgent: string;
    emergency: string;
  };
  image: string;
  featured: boolean;
  requirements: string[];
  specifications?: string[];
  availability: 'available' | 'limited' | 'unavailable';
  maxBookingsPerDay: number;
  advanceBookingDays: number;
}

export default function AdminServices() {
  const { isRTL } = useTranslation();
  const { toast } = useToast();
  const { services, addService, updateService, deleteService, exportData } = useAdmin();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  const [formData, setFormData] = useState<ServiceFormData>({
    name: { en: '', ar: '' },
    description: { en: '', ar: '' },
    category: '',
    pricing: {
      normal: { usd: 0, aed: 0 },
      urgent: { usd: 0, aed: 0 },
      emergency: { usd: 0, aed: 0 }
    },
    duration: {
      normal: '',
      urgent: '',
      emergency: ''
    },
    image: '',
    featured: false,
    requirements: [],
    specifications: [],
    availability: 'available',
    maxBookingsPerDay: 5,
    advanceBookingDays: 7
  });

  const filteredServices = services.filter(service => {
    const matchesSearch = searchQuery === '' || 
      service.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.name.ar.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    const matchesAvailability = availabilityFilter === 'all' || 
      (service as any).availability === availabilityFilter;
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const resetForm = () => {
    setFormData({
      name: { en: '', ar: '' },
      description: { en: '', ar: '' },
      category: '',
      pricing: {
        normal: { usd: 0, aed: 0 },
        urgent: { usd: 0, aed: 0 },
        emergency: { usd: 0, aed: 0 }
      },
      duration: {
        normal: '',
        urgent: '',
        emergency: ''
      },
      image: '',
      featured: false,
      requirements: [],
      specifications: [],
      availability: 'available',
      maxBookingsPerDay: 5,
      advanceBookingDays: 7
    });
  };

  const handleAddService = () => {
    if (!formData.name.en || !formData.category || !formData.pricing.normal.usd) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    const newService: Omit<Service, 'id'> = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      pricing: formData.pricing,
      duration: formData.duration,
      image: formData.image || 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg',
      featured: formData.featured,
      requirements: formData.requirements.filter(req => req.trim() !== ''),
      specifications: formData.specifications?.filter(spec => spec.trim() !== '')
    };

    addService(newService);
    setIsAddModalOpen(false);
    resetForm();
    
    toast({
      title: isRTL() ? 'تم إضافة الخدمة' : 'Service Added',
      description: isRTL() ? 'تم إضافة الخدمة بنجاح' : 'Service has been added successfully'
    });
  };

  const handleEditService = () => {
    if (!selectedService || !formData.name.en || !formData.category || !formData.pricing.normal.usd) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    const updates: Partial<Service> = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      pricing: formData.pricing,
      duration: formData.duration,
      image: formData.image || selectedService.image,
      featured: formData.featured,
      requirements: formData.requirements.filter(req => req.trim() !== ''),
      specifications: formData.specifications?.filter(spec => spec.trim() !== '')
    };

    updateService(selectedService.id, updates);
    setIsEditModalOpen(false);
    setSelectedService(null);
    resetForm();
    
    toast({
      title: isRTL() ? 'تم تحديث الخدمة' : 'Service Updated',
      description: isRTL() ? 'تم تحديث الخدمة بنجاح' : 'Service has been updated successfully'
    });
  };

  const handleDeleteService = (serviceId: string, serviceName: string) => {
    deleteService(serviceId);
    toast({
      title: isRTL() ? 'تم حذ�� الخدمة' : 'Service Deleted',
      description: `${serviceName} has been deleted successfully`
    });
  };

  const openEditModal = (service: Service) => {
    setSelectedService(service);
    setFormData({
      name: service.name,
      description: service.description,
      category: service.category,
      pricing: service.pricing,
      duration: service.duration,
      image: service.image,
      featured: service.featured,
      requirements: service.requirements || [],
      specifications: service.specifications || [],
      availability: (service as any).availability || 'available',
      maxBookingsPerDay: (service as any).maxBookingsPerDay || 5,
      advanceBookingDays: (service as any).advanceBookingDays || 7
    });
    setIsEditModalOpen(true);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'gradient-success text-white';
      case 'limited': return 'gradient-warning text-white';
      case 'unavailable': return 'gradient-error text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'urgent': return <Zap className="h-4 w-4 text-orange-500" />;
      default: return <Clock className="h-4 w-4 text-green-500" />;
    }
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
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

  // Calculate summary stats
  const summaryStats = {
    total: services.length,
    featured: services.filter(s => s.featured).length,
    categories: new Set(services.map(s => s.category)).size,
    avgPrice: services.length > 0 ? Math.round(services.reduce((sum, s) => sum + s.pricing.normal.usd, 0) / services.length) : 0
  };

  const ServiceFormFields = () => (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nameEn">Service Name (English) *</Label>
              <Input
                id="nameEn"
                value={formData.name.en}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  name: { ...prev.name, en: e.target.value }
                }))}
                placeholder="Enter service name in English"
              />
            </div>
            <div>
              <Label htmlFor="nameAr">Service Name (Arabic)</Label>
              <Input
                id="nameAr"
                value={formData.name.ar}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  name: { ...prev.name, ar: e.target.value }
                }))}
                placeholder="Enter service name in Arabic"
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
                {serviceCategories.map((category) => (
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
                placeholder="Enter service description in English"
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
                placeholder="Enter service description in Arabic"
                rows={3}
              />
            </div>
          </div>

          <ImageUpload
            value={formData.image}
            onChange={(value) => setFormData(prev => ({ ...prev, image: value }))}
            label="Service Image"
            placeholder="Upload service image or enter URL"
          />
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <div className="space-y-6">
            {['normal', 'urgent', 'emergency'].map((priority) => (
              <Card key={priority} className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  {getUrgencyIcon(priority)}
                  <h4 className="font-semibold capitalize">{priority} Priority</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`price-${priority}-usd`}>Price (USD) *</Label>
                    <Input
                      id={`price-${priority}-usd`}
                      type="number"
                      value={formData.pricing[priority as keyof typeof formData.pricing].usd}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        pricing: {
                          ...prev.pricing,
                          [priority]: {
                            ...prev.pricing[priority as keyof typeof prev.pricing],
                            usd: parseFloat(e.target.value) || 0
                          }
                        }
                      }))}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`price-${priority}-aed`}>Price (AED) *</Label>
                    <Input
                      id={`price-${priority}-aed`}
                      type="number"
                      value={formData.pricing[priority as keyof typeof formData.pricing].aed}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        pricing: {
                          ...prev.pricing,
                          [priority]: {
                            ...prev.pricing[priority as keyof typeof prev.pricing],
                            aed: parseFloat(e.target.value) || 0
                          }
                        }
                      }))}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`duration-${priority}`}>Duration</Label>
                    <Input
                      id={`duration-${priority}`}
                      value={formData.duration[priority as keyof typeof formData.duration]}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        duration: {
                          ...prev.duration,
                          [priority]: e.target.value
                        }
                      }))}
                      placeholder="e.g., 2-3 days"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Service Requirements</Label>
              <Button variant="outline" size="sm" onClick={addRequirement}>
                <Plus className="h-4 w-4 mr-1" />
                Add Requirement
              </Button>
            </div>
            <div className="space-y-2">
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={req}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    placeholder="Enter requirement"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeRequirement(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Service Specifications</Label>
              <Button variant="outline" size="sm" onClick={addSpecification}>
                <Plus className="h-4 w-4 mr-1" />
                Add Specification
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
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div>
            <Label htmlFor="availability">Availability Status</Label>
            <Select 
              value={formData.availability} 
              onValueChange={(value: any) => setFormData(prev => ({ ...prev, availability: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="limited">Limited Availability</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maxBookings">Max Bookings per Day</Label>
              <Input
                id="maxBookings"
                type="number"
                value={formData.maxBookingsPerDay}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  maxBookingsPerDay: parseInt(e.target.value) || 5 
                }))}
                placeholder="5"
              />
            </div>
            <div>
              <Label htmlFor="advanceBooking">Advance Booking Days</Label>
              <Input
                id="advanceBooking"
                type="number"
                value={formData.advanceBookingDays}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  advanceBookingDays: parseInt(e.target.value) || 7 
                }))}
                placeholder="7"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
            />
            <Label htmlFor="featured">Featured Service</Label>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Persistence Notification */}
      <PersistenceNotification
        type="services"
        hasChanges={services.length > 0}
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
              {isRTL() ? 'إدارة الخدمات' : 'Service Management'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isRTL() ? 'إضافة وتحرير وإدارة خدمات الشركة' : 'Add, edit, and manage company services'}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => exportData('services')}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              {isRTL() ? 'تصدير' : 'Export'}
            </Button>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="gap-2 gradient-accent text-white"
            >
              <Plus className="h-4 w-4" />
              {isRTL() ? 'إضافة خدمة' : 'Add Service'}
            </Button>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: isRTL() ? 'إجمالي الخدمات' : 'Total Services', value: summaryStats.total, icon: Crown, color: 'gradient-accent' },
            { label: isRTL() ? 'خدمات مميزة' : 'Featured', value: summaryStats.featured, icon: Star, color: 'gradient-primary' },
            { label: isRTL() ? 'الفئات' : 'Categories', value: summaryStats.categories, icon: Settings, color: 'gradient-info' },
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
                    placeholder={isRTL() ? 'البحث في الخدمات...' : 'Search services...'}
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
                    {serviceCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name.en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL() ? 'جميع الخدمات' : 'All Services'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL() ? 'جميع الخدمات' : 'All Services'}</SelectItem>
                    <SelectItem value="available">{isRTL() ? 'متوفرة' : 'Available'}</SelectItem>
                    <SelectItem value="limited">{isRTL() ? 'توفر محدود' : 'Limited'}</SelectItem>
                    <SelectItem value="unavailable">{isRTL() ? 'غير متوفرة' : 'Unavailable'}</SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  {isRTL() ? `${filteredServices.length} من ${services.length} خدمة` : `${filteredServices.length} of ${services.length} services`}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass-card border-border/20 premium-shadow hover:premium-shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.name.en}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {service.featured && (
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
                          <DropdownMenuItem onClick={() => openEditModal(service)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteService(service.id, service.name.en)}
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
                          {service.name.en}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {service.description.en}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-green-500" />
                            <span className="text-muted-foreground">Normal:</span>
                          </div>
                          <span className="font-medium">${service.pricing.normal.usd}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Zap className="h-4 w-4 text-orange-500" />
                            <span className="text-muted-foreground">Urgent:</span>
                          </div>
                          <span className="font-medium">${service.pricing.urgent.usd}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span className="text-muted-foreground">Emergency:</span>
                          </div>
                          <span className="font-medium">${service.pricing.emergency.usd}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge className={getAvailabilityColor((service as any).availability || 'available')}>
                          {(service as any).availability || 'available'}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {service.duration.normal}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">👑</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {isRTL() ? 'لا توجد خدمات' : 'No Services Found'}
            </h3>
            <p className="text-muted-foreground">
              {isRTL() ? 'لم يتم العثور على خدمات مطابقة للبحث' : 'No services match your search criteria'}
            </p>
          </div>
        )}

        {/* Add Service Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {isRTL() ? 'إضافة خدمة جديدة' : 'Add New Service'}
              </DialogTitle>
              <DialogDescription>
                {isRTL() ? 'إضافة خدمة جديدة للشركة' : 'Add a new service to the company'}
              </DialogDescription>
            </DialogHeader>

            <ServiceFormFields />

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddService} className="gradient-accent text-white">
                <Save className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Service Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                {isRTL() ? 'تحرير ال��دمة' : 'Edit Service'}
              </DialogTitle>
              <DialogDescription>
                {isRTL() ? 'تحرير معلومات الخدمة' : 'Edit service information'}
              </DialogDescription>
            </DialogHeader>

            <ServiceFormFields />

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditService} className="gradient-accent text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
    </div>
  );
}

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Star, Zap, AlertTriangle, CheckCircle, Crown, Calendar, FileText, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/hooks/use-translation';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { getServiceById } from '@/data/services';
import { useAdmin } from '@/contexts/AdminContext';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const { language, isRTL } = useTranslation();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { services } = useAdmin();

  const [selectedUrgency, setSelectedUrgency] = useState<'normal' | 'urgent' | 'emergency'>('normal');
  const [scheduledDate, setScheduledDate] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');

  // Use admin services if available, fallback to static data
  const allServices = services.length > 0 ? services : [];
  const service = allServices.find(s => s.id === id) || getServiceById(id || '');

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          {isRTL() ? 'الخدمة غير موجودة' : 'Service Not Found'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isRTL() ? 'الخدمة التي تبحث عنها غير متوفرة' : 'The service you are looking for is not available'}
        </p>
        <Button asChild className="mt-4">
          <Link href="/services">
            {isRTL() ? 'العودة للخدمات' : 'Back to Services'}
          </Link>
        </Button>
      </div>
    );
  }

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'urgent': return <Zap className="h-5 w-5 text-orange-500" />;
      default: return <Clock className="h-5 w-5 text-green-500" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'gradient-error text-white';
      case 'urgent': return 'gradient-warning text-white';
      default: return 'gradient-success text-white';
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      type: 'service' as const,
      id: service.id,
      name: service.name[language],
      price: service.pricing[selectedUrgency],
      image: service.image,
      urgency: selectedUrgency,
      scheduledDate,
      specialRequirements
    };

    addToCart(cartItem);
    
    toast({
      title: isRTL() ? 'تم إضافة الخدمة' : 'Service Added',
      description: isRTL() 
        ? 'تم إضافة الخدمة إلى السلة بنجاح'
        : 'Service has been added to cart successfully'
    });
  };

  return (
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Button variant="outline" asChild className="gap-2">
            <Link href="/services">
              <ArrowLeft className="h-4 w-4" />
              {isRTL() ? 'العودة للخد��ات' : 'Back to Services'}
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Image and Basic Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="relative overflow-hidden rounded-xl premium-shadow-lg">
              <img
                src={service.image}
                alt={service.name[language]}
                className="w-full h-80 object-cover"
              />
              {service.featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="gradient-accent text-white status-badge">
                    <Star className="w-4 h-4 mr-2" />
                    {isRTL() ? 'خدمة مميزة' : 'Featured Service'}
                  </Badge>
                </div>
              )}
            </div>

            <Card className="glass-card border-primary/20 premium-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 premium-gradient rounded-xl flex items-center justify-center pulse-glow"
                  >
                    <Crown className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {service.name[language]}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {isRTL() ? 'خدمة احترافية' : 'Professional Service'}
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground text-base leading-relaxed">
                  {service.description[language]}
                </p>
              </CardContent>
            </Card>

            {/* Requirements */}
            {service.requirements && service.requirements.length > 0 && (
              <Card className="glass-card border-info/20 premium-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    {isRTL() ? 'المتطلبات' : 'Requirements'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.requirements.map((requirement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-foreground">{requirement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Specifications */}
            {service.specifications && service.specifications.length > 0 && (
              <Card className="glass-card border-accent/20 premium-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent" />
                    {isRTL() ? 'المواصفات' : 'Specifications'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.specifications.map((spec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Badge variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="glass-card border-accent/20 premium-shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center"
                  >
                    <ShoppingCart className="h-5 w-5 text-white" />
                  </motion.div>
                  {isRTL() ? 'حجز الخدمة' : 'Book Service'}
                </CardTitle>
                <CardDescription>
                  {isRTL() 
                    ? 'اختر مستوى الأولوية وحدد موعد الخدمة'
                    : 'Select priority level and schedule your service'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Priority Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">
                    {isRTL() ? 'مستوى الأولوية' : 'Priority Level'}
                  </Label>
                  <div className="space-y-3">
                    {(['normal', 'urgent', 'emergency'] as const).map((urgency) => (
                      <motion.div
                        key={urgency}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card 
                          className={`cursor-pointer transition-all duration-300 ${
                            selectedUrgency === urgency 
                              ? 'border-primary bg-primary/10' 
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedUrgency(urgency)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {getUrgencyIcon(urgency)}
                                <div>
                                  <div className="font-medium capitalize">
                                    {urgency === 'normal' && (isRTL() ? 'عادي' : 'Normal')}
                                    {urgency === 'urgent' && (isRTL() ? 'عاجل' : 'Urgent')}
                                    {urgency === 'emergency' && (isRTL() ? 'طارئ' : 'Emergency')}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {service.duration[urgency]}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-primary">
                                  ${service.pricing[urgency].usd}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {service.pricing[urgency].aed} AED
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Scheduled Date */}
                <div className="space-y-2">
                  <Label htmlFor="scheduledDate" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {isRTL() ? 'تاريخ الخدمة المفضل' : 'Preferred Service Date'}
                  </Label>
                  <Input
                    id="scheduledDate"
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {/* Special Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="specialRequirements">
                    {isRTL() ? 'متطلبات خاصة (اختياري)' : 'Special Requirements (Optional)'}
                  </Label>
                  <Textarea
                    id="specialRequirements"
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                    placeholder={isRTL() 
                      ? 'أضف أي متطلبات أو ملاحظات خاصة...'
                      : 'Add any special requirements or notes...'
                    }
                    rows={3}
                  />
                </div>

                {/* Price Summary */}
                <Card className="border-2 border-dashed border-primary/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={getUrgencyColor(selectedUrgency)}>
                          {selectedUrgency === 'normal' && (isRTL() ? 'عادي' : 'Normal')}
                          {selectedUrgency === 'urgent' && (isRTL() ? 'عاجل' : 'Urgent')}
                          {selectedUrgency === 'emergency' && (isRTL() ? 'طارئ' : 'Emergency')}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {service.duration[selectedUrgency]}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">
                          ${service.pricing[selectedUrgency].usd}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {service.pricing[selectedUrgency].aed} AED
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Add to Cart Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full gap-3 premium-gradient text-white font-bold py-6 premium-shadow-lg neon-border transition-all duration-500 group"
                  >
                    <ShoppingCart className="h-5 w-5 group-hover:animate-pulse" />
                    <span className="text-lg">
                      {isRTL() ? 'إضافة إلى السلة' : 'Add to Cart'}
                    </span>
                    <Crown className="h-5 w-5 group-hover:animate-bounce" />
                  </Button>
                </motion.div>

                <p className="text-xs text-muted-foreground text-center">
                  {isRTL() 
                    ? 'سيتم تأكيد الحجز بعد إتمام عملية الدفع'
                    : 'Booking will be confirmed after payment completion'
                  }
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
  );
}

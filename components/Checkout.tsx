import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, User, Phone, Mail, Shield, Crown, CheckCircle, ArrowLeft, Package, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from '@/hooks/use-translation';
import { useCart } from '@/contexts/CartContext';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CheckoutForm {
  // Customer Information
  customerName: string;
  email: string;
  phone: string;
  company: string;
  
  // Billing Address
  address: string;
  city: string;
  emirate: string;
  postalCode: string;
  
  // Payment Information
  paymentMethod: 'stripe' | 'card' | 'bank_transfer' | 'cash_on_delivery';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  
  // Additional
  notes: string;
  termsAccepted: boolean;
}

export default function Checkout() {
  const { language, isRTL, getCurrency } = useTranslation();
  const { items, getCartTotal, clearCart } = useCart();
  const { addOrder, addCustomer } = useAdmin();
  const { toast } = useToast();
  const router = useRouter();
  const currency = getCurrency();
  const total = getCartTotal();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    customerName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    emirate: '',
    postalCode: '',
    paymentMethod: 'stripe',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    notes: '',
    termsAccepted: false
  });

  const emiratesList = [
    { value: 'dubai', label: isRTL() ? 'دبي' : 'Dubai' },
    { value: 'abu-dhabi', label: isRTL() ? 'أبوظبي' : 'Abu Dhabi' },
    { value: 'sharjah', label: isRTL() ? 'الشارقة' : 'Sharjah' },
    { value: 'ajman', label: isRTL() ? 'عجمان' : 'Ajman' },
    { value: 'umm-al-quwain', label: isRTL() ? 'أم القيوين' : 'Umm Al Quwain' },
    { value: 'ras-al-khaimah', label: isRTL() ? 'رأس الخيمة' : 'Ras Al Khaimah' },
    { value: 'fujairah', label: isRTL() ? 'الفجيرة' : 'Fujairah' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkoutForm.termsAccepted) {
      toast({
        title: isRTL() ? 'خطأ' : 'Error',
        description: isRTL() ? 'يجب الموافقة عل�� الشروط والأحكام' : 'You must accept terms and conditions',
        variant: 'destructive'
      });
      return;
    }

    if (!checkoutForm.customerName || !checkoutForm.email || !checkoutForm.phone || !checkoutForm.address || !checkoutForm.emirate) {
      toast({
        title: isRTL() ? '��طأ' : 'Error',
        description: isRTL() ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    // Validate credit card fields if card payment is selected
    if (checkoutForm.paymentMethod === 'card') {
      if (!checkoutForm.cardholderName || !checkoutForm.cardNumber || !checkoutForm.expiryDate || !checkoutForm.cvv) {
        toast({
          title: isRTL() ? 'خطأ' : 'Error',
          description: isRTL() ? 'يرجى ملء جميع بيانات البطاقة الائتمانية' : 'Please fill in all credit card information',
          variant: 'destructive'
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Enhanced payment processing with method-specific handling
      let paymentSuccess = false;
      let paymentStatus: 'pending' | 'paid' | 'failed' = 'pending';

      if (checkoutForm.paymentMethod === 'stripe') {
        // Simulate Stripe payment processing
        toast({
          title: isRTL() ? 'جاري معالجة الدفع...' : 'Processing Stripe Payment...',
          description: isRTL() ? 'يتم إعادة التوجيه إلى سترايب' : 'Redirecting to Stripe'
        });
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate Stripe success (90% success rate)
        paymentSuccess = Math.random() > 0.1;
        paymentStatus = paymentSuccess ? 'paid' : 'failed';

        if (!paymentSuccess) {
          throw new Error('Stripe payment failed');
        }

        toast({
          title: isRTL() ? 'تم الدفع بنجاح!' : 'Payment Successful!',
          description: isRTL() ? 'تم معالجة الدفع بواسطة سترايب' : 'Payment processed by Stripe'
        });
      } else if (checkoutForm.paymentMethod === 'card') {
        // Simulate credit card processing
        toast({
          title: isRTL() ? 'جاري معالجة البطاقة...' : 'Processing Credit Card...',
          description: isRTL() ? 'يتم التحقق من البطاقة' : 'Verifying card details'
        });
        await new Promise(resolve => setTimeout(resolve, 2000));

        paymentSuccess = true;
        paymentStatus = 'paid';
      } else if (checkoutForm.paymentMethod === 'bank_transfer') {
        // Bank transfer - pending payment
        paymentSuccess = true;
        paymentStatus = 'pending';

        toast({
          title: isRTL() ? 'تم استلام طلب التحويل' : 'Transfer Request Received',
          description: isRTL() ? 'سيتم تأكيد الدفع عند استلام التحويل' : 'Payment will be confirmed upon receipt'
        });
      } else if (checkoutForm.paymentMethod === 'cash_on_delivery') {
        // Cash on delivery - pending payment
        paymentSuccess = true;
        paymentStatus = 'pending';

        toast({
          title: isRTL() ? 'تم تأكيد الطلب' : 'Order Confirmed',
          description: isRTL() ? 'سيتم الدفع عند الاستلام' : 'Payment on delivery'
        });
      }

      if (!paymentSuccess) {
        throw new Error('Payment processing failed');
      }

      // Generate order number and determine priority
      const orderNumber = `DAM-${Date.now().toString().slice(-6)}`;
      const hasUrgentService = items.some(item => item.type === 'service' && (item.urgency === 'urgent' || item.urgency === 'emergency'));
      const priority = hasUrgentService ? 'urgent' : 'normal';

      // Create order items
      const orderItems = items.map(item => ({
        type: item.type,
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        size: item.selectedSize,
        laborServices: item.laborServices,
        urgency: item.urgency,
        scheduledDate: item.scheduledDate,
        specialRequirements: item.specialRequirements
      }));

      // Create new order
      const newOrder = {
        orderNumber,
        customerName: checkoutForm.customerName,
        email: checkoutForm.email,
        phone: checkoutForm.phone,
        company: checkoutForm.company,
        items: orderItems,
        total: getCartTotal(),
        status: 'pending' as const,
        priority: priority as 'normal' | 'urgent',
        paymentMethod: checkoutForm.paymentMethod,
        paymentStatus: paymentStatus,
        shippingAddress: {
          address: checkoutForm.address,
          city: checkoutForm.city,
          emirate: checkoutForm.emirate,
          postalCode: checkoutForm.postalCode
        },
        notes: checkoutForm.notes
      };

      // Add order to admin system
      addOrder(newOrder);
      console.log('Order created:', newOrder);

      // Add customer to admin system (if not exists)
      addCustomer({
        name: checkoutForm.customerName,
        email: checkoutForm.email,
        phone: checkoutForm.phone,
        company: checkoutForm.company,
        totalOrders: 1,
        totalSpent: getCartTotal(),
        lastOrderDate: new Date().toISOString(),
        status: 'active'
      });

      // Store order details for receipt generation
      localStorage.setItem('lastOrderDetails', JSON.stringify({
        ...newOrder,
        paymentMethodDetails: {
          method: checkoutForm.paymentMethod,
          status: paymentStatus,
          processedAt: new Date().toISOString()
        }
      }));

      // Show success message with payment details
      const getPaymentMethodName = () => {
        switch (checkoutForm.paymentMethod) {
          case 'stripe': return isRTL() ? 'سترايب' : 'Stripe';
          case 'card': return isRTL() ? 'بطاقة ائتمان' : 'Credit Card';
          case 'bank_transfer': return isRTL() ? 'تحويل بنكي' : 'Bank Transfer';
          case 'cash_on_delivery': return isRTL() ? 'دفع عند الاستلام' : 'Cash on Delivery';
          default: return checkoutForm.paymentMethod;
        }
      };

      toast({
        title: isRTL() ? '🎉 تم تأكيد الطلب!' : '🎉 Order Confirmed!',
        description: isRTL()
          ? `رقم الطلب: ${orderNumber}\nطريقة الدفع: ${getPaymentMethodName()}\nحالة الدفع: ${paymentStatus === 'paid' ? 'مدفوع' : 'في الانتظار'}`
          : `Order #${orderNumber}\nPayment: ${getPaymentMethodName()}\nStatus: ${paymentStatus === 'paid' ? 'Paid' : 'Pending'}`
      });

      // Verify order was created
      setTimeout(() => {
        const savedOrders = JSON.parse(localStorage.getItem('admin_orders') || '[]');
        const createdOrder = savedOrders.find((o: any) => o.orderNumber === orderNumber);

        if (createdOrder) {
          console.log('✅ Order successfully saved to admin system:', createdOrder);
        } else {
          console.error('❌ Order not found in admin system');
        }
      }, 100);

      // Clear cart and redirect to order success page
      clearCart();
      router.push(`/order-success?orderNumber=${orderNumber}`);
    } catch (error) {
      toast({
        title: isRTL() ? 'خطأ في المعالجة' : 'Processing Error',
        description: isRTL() ? 'حدث خطأ أثناء معالجة الطلب' : 'An error occurred while processing your order',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {isRTL() ? 'السلة فارغة' : 'Cart is Empty'}
          </h1>
          <p className="text-muted-foreground mb-6">
            {isRTL() ? 'لا يمكن المتابعة للدف�� بسلة ف��رغة' : 'Cannot proceed to checkout with an empty cart'}
          </p>
          <Button asChild>
            <Link href="/products">
              {isRTL() ? 'العودة للمنتجات' : 'Back to Products'}
            </Link>
          </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Button variant="outline" asChild className="gap-2 mb-6">
            <Link href="/cart">
              <ArrowLeft className="h-4 w-4" />
              {isRTL() ? 'العودة للسلة' : 'Back to Cart'}
            </Link>
          </Button>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
            <CreditCard className="inline-block w-10 h-10 mr-4 text-accent" />
            {isRTL() ? 'إتمام الطلب' : 'Checkout'}
          </h1>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="glass-card border-primary/20 premium-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <motion.div 
                        whileHover={{ rotate: 360 }}
                        className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center"
                      >
                        <User className="h-5 w-5 text-white" />
                      </motion.div>
                      {isRTL() ? 'معلومات العميل' : 'Customer Information'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="customerName">
                          {isRTL() ? 'الاسم الكامل' : 'Full Name'} *
                        </Label>
                        <Input
                          id="customerName"
                          value={checkoutForm.customerName}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, customerName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">
                          {isRTL() ? 'اسم الشركة' : 'Company Name'}
                        </Label>
                        <Input
                          id="company"
                          value={checkoutForm.company}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, company: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">
                          {isRTL() ? 'البريد الإلكتروني' : 'Email Address'} *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={checkoutForm.email}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">
                          {isRTL() ? 'رقم الهاتف' : 'Phone Number'} *
                        </Label>
                        <Input
                          id="phone"
                          value={checkoutForm.phone}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Billing Address */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="glass-card border-accent/20 premium-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <motion.div 
                        whileHover={{ rotate: 360 }}
                        className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center"
                      >
                        <MapPin className="h-5 w-5 text-white" />
                      </motion.div>
                      {isRTL() ? 'عنوان الفوترة' : 'Billing Address'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">
                        {isRTL() ? 'العنوان' : 'Address'} *
                      </Label>
                      <Textarea
                        id="address"
                        value={checkoutForm.address}
                        onChange={(e) => setCheckoutForm(prev => ({ ...prev, address: e.target.value }))}
                        placeholder={isRTL() ? 'رقم المبنى، اسم الشارع، المنطقة' : 'Building number, street name, area'}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">
                          {isRTL() ? 'المدينة' : 'City'} *
                        </Label>
                        <Input
                          id="city"
                          value={checkoutForm.city}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, city: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="emirate">
                          {isRTL() ? 'الإمارة' : 'Emirate'} *
                        </Label>
                        <Select 
                          value={checkoutForm.emirate} 
                          onValueChange={(value) => setCheckoutForm(prev => ({ ...prev, emirate: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={isRTL() ? 'اختر الإمارة' : 'Select Emirate'} />
                          </SelectTrigger>
                          <SelectContent>
                            {emiratesList.map((emirate) => (
                              <SelectItem key={emirate.value} value={emirate.value}>
                                {emirate.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="postalCode">
                          {isRTL() ? 'الرمز البريدي' : 'Postal Code'}
                        </Label>
                        <Input
                          id="postalCode"
                          value={checkoutForm.postalCode}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, postalCode: e.target.value }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Payment Information */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="glass-card border-green-500/20 premium-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <motion.div 
                        whileHover={{ rotate: 360 }}
                        className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center"
                      >
                        <CreditCard className="h-5 w-5 text-white" />
                      </motion.div>
                      {isRTL() ? 'معلومات الدفع' : 'Payment Information'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Payment Method Selection */}
                    <div>
                      <Label>{isRTL() ? 'طريقة الدفع' : 'Payment Method'}</Label>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-2">
                        {[
                          { value: 'stripe', label: isRTL() ? 'سترايب' : 'Stripe', icon: CreditCard, featured: true },
                          { value: 'card', label: isRTL() ? 'بطاقة ائتمان' : 'Credit Card', icon: CreditCard },
                          { value: 'bank_transfer', label: isRTL() ? 'تحويل بنكي' : 'Bank Transfer', icon: Shield },
                          { value: 'cash_on_delivery', label: isRTL() ? 'دفع عند الاستلام' : 'Cash on Delivery', icon: Package }
                        ].map((method) => {
                          const Icon = method.icon;
                          return (
                            <Card
                              key={method.value}
                              className={`cursor-pointer transition-all duration-300 relative ${
                                checkoutForm.paymentMethod === method.value
                                  ? 'border-primary bg-primary/10'
                                  : 'border-border hover:border-primary/50'
                              } ${method.featured ? 'ring-2 ring-green-500/50' : ''}`}
                              onClick={() => setCheckoutForm(prev => ({ ...prev, paymentMethod: method.value as any }))}
                            >
                              {method.featured && (
                                <div className="absolute -top-2 -right-2">
                                  <Badge className="bg-green-500 text-white text-xs">
                                    {isRTL() ? 'مُوصى' : 'Recommended'}
                                  </Badge>
                                </div>
                              )}
                              <CardContent className="p-4 text-center">
                                <Icon className="h-6 w-6 mx-auto mb-2" />
                                <div className="text-sm font-medium">{method.label}</div>
                                {method.featured && (
                                  <div className="text-xs text-green-600 mt-1">
                                    {isRTL() ? 'آمن وسري��' : 'Secure & Fast'}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>

                    {/* Stripe Payment */}
                    {checkoutForm.paymentMethod === 'stripe' && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {isRTL() ? 'الدفع بواسطة سترايب' : 'Stripe Payment'}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {isRTL() ? 'دفع آمن ومشفر' : 'Secure encrypted payment'}
                            </p>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-2 border-dashed border-blue-300">
                          <div className="text-center">
                            <div className="text-2xl mb-2">💳</div>
                            <p className="text-sm text-gray-700 mb-3">
                              {isRTL()
                                ? 'سيتم إعادة توجيهك إلى صفحة الدفع الآمنة الخاصة بسترايب'
                                : 'You will be redirected to Stripe\'s secure payment page'
                              }
                            </p>
                            <div className="flex items-center justify-center gap-3 text-xs text-gray-500">
                              <span>🔒 SSL Encrypted</span>
                              <span>•</span>
                              <span>PCI Compliant</span>
                              <span>•</span>
                              <span>Bank Level Security</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Credit Card Fields */}
                    {checkoutForm.paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700 mb-4">
                          <p className="font-medium mb-1">
                            {isRTL() ? 'للاختبار' : 'For Testing:'}
                          </p>
                          <p>
                            {isRTL()
                              ? 'يمكنك استخدام أي بيانات وهمية للاختبار'
                              : 'You can use any dummy data for testing purposes'
                            }
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="cardholderName">
                            {isRTL() ? 'اسم حامل البطاقة' : 'Cardholder Name'} *
                          </Label>
                          <Input
                            id="cardholderName"
                            value={checkoutForm.cardholderName}
                            onChange={(e) => setCheckoutForm(prev => ({ ...prev, cardholderName: e.target.value }))}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cardNumber">
                            {isRTL() ? 'رقم البطاقة' : 'Card Number'} *
                          </Label>
                          <Input
                            id="cardNumber"
                            value={checkoutForm.cardNumber}
                            onChange={(e) => setCheckoutForm(prev => ({ ...prev, cardNumber: e.target.value }))}
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">
                              {isRTL() ? 'تاريخ الانتهاء' : 'Expiry Date'} *
                            </Label>
                            <Input
                              id="expiryDate"
                              value={checkoutForm.expiryDate}
                              onChange={(e) => setCheckoutForm(prev => ({ ...prev, expiryDate: e.target.value }))}
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">
                              {isRTL() ? 'رمز ال��مان' : 'CVV'} *
                            </Label>
                            <Input
                              id="cvv"
                              value={checkoutForm.cvv}
                              onChange={(e) => setCheckoutForm(prev => ({ ...prev, cvv: e.target.value }))}
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bank Transfer Info */}
                    {checkoutForm.paymentMethod === 'bank_transfer' && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          {isRTL() ? 'تفاصيل التحويل البنكي' : 'Bank Transfer Details'}
                        </h4>
                        <div className="text-sm space-y-1">
                          <p><strong>{isRTL() ? 'اسم البنك:' : 'Bank Name:'}</strong> Emirates NBD</p>
                          <p><strong>{isRTL() ? 'رقم الحساب:' : 'Account Number:'}</strong> 1234567890</p>
                          <p><strong>IBAN:</strong> AE123456789012345678901</p>
                          <p><strong>{isRTL() ? 'اسم المستفيد:' : 'Beneficiary:'}</strong> Dar Al Muaazil LLC</p>
                        </div>
                      </div>
                    )}

                    {/* Cash on Delivery Info */}
                    {checkoutForm.paymentMethod === 'cash_on_delivery' && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          {isRTL() ? 'الدفع عند الاستلام' : 'Cash on Delivery'}
                        </h4>
                        <p className="text-sm">
                          {isRTL() 
                            ? 'سيتم الدفع نقداً عند استلام المنتجات أو تقديم الخدمات'
                            : 'Payment will be collected in cash upon product delivery or service completion'
                          }
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Additional Notes */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>{isRTL() ? 'ملاحظات إضافية' : 'Additional Notes'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={checkoutForm.notes}
                      onChange={(e) => setCheckoutForm(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder={isRTL() ? 'أي تعليمات خاصة للتسليم أو الت��فيذ...' : 'Any special instructions for delivery or execution...'}
                      rows={3}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Terms and Conditions */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="glass-card border-yellow-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={checkoutForm.termsAccepted}
                        onCheckedChange={(checked) => setCheckoutForm(prev => ({ ...prev, termsAccepted: !!checked }))}
                      />
                      <div className="text-sm">
                        <Label htmlFor="terms" className="cursor-pointer">
                          {isRTL() 
                            ? 'أوافق على الشروط والأحكام وسياسة الخصوصية'
                            : 'I agree to the terms and conditions and privacy policy'
                          }
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="glass-card border-accent/30 premium-shadow-lg sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Crown className="h-5 w-5 text-accent" />
                    {isRTL() ? 'ملخص الطلب' : 'Order Summary'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {items.map((item) => (
                      <div key={`${item.type}-${item.id}-${item.urgency || 'default'}`} className="flex justify-between text-sm">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{item.name}</div>
                          <div className="text-muted-foreground">
                            {isRTL() ? 'الكمية:' : 'Qty:'} {item.quantity}
                            {item.urgency && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                {item.urgency}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {currency === 'USD' 
                              ? `$${(item.price.usd * item.quantity).toFixed(2)}`
                              : `${(item.price.aed * item.quantity).toFixed(2)} AED`
                            }
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>{isRTL() ? 'المجموع (USD)' : 'Total (USD)'}</span>
                      <span className="text-primary">${total.usd.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>{isRTL() ? 'المجموع (AED)' : 'Total (AED)'}</span>
                      <span className="text-primary">{total.aed.toFixed(2)} AED</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Place Order Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit"
                      disabled={isSubmitting || !checkoutForm.termsAccepted}
                      className="w-full gap-3 premium-gradient text-white font-bold py-6 premium-shadow-lg neon-border transition-all duration-500 group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>{isRTL() ? 'جاري المعالجة...' : 'Processing...'}</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-5 w-5 group-hover:animate-pulse" />
                          <span className="text-lg">
                            {isRTL() ? 'تأكيد الطلب' : 'Place Order'}
                          </span>
                          <Crown className="h-5 w-5 group-hover:animate-bounce" />
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <p className="text-xs text-muted-foreground text-center">
                    {isRTL() 
                      ? 'معلوماتك محمية ومشفرة بأمان'
                      : 'Your information is secure and encrypted'
                    }
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </form>
    </div>
  );
}

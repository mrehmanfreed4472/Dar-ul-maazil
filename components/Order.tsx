import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, MessageCircle, Mail, Plus, Minus, Trash2, Calculator, Package, User, Phone, Download, FileText, Star, Zap, Crown, Shield, Award, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { getAllProducts, featuredProducts } from '@/data/products';
import { OrderSummaryPDF } from '@/components/OrderSummaryPDF';
import { OrderPreviewModal } from '@/components/OrderPreviewModal';
import { BulkProductSelector } from '@/components/BulkProductSelector';
import { QuickAddProducts } from '@/components/QuickAddProducts';

interface OrderItem {
  productId: string;
  productName: string;
  priceUsd: number;
  priceAed: number;
  quantity: number;
  laborServices: boolean;
  selectedSize?: string;
}

interface OrderForm {
  customerName: string;
  whatsappNumber: string;
  email: string;
  company: string;
  projectLocation: string;
  items: OrderItem[];
  contactMethod: 'whatsapp' | 'email' | 'both';
  urgency: 'standard' | 'urgent' | 'rush';
  deliveryDate: string;
  notes: string;
}

export default function Order() {
  const { t, language, getCurrency, isRTL } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [orderNumber, setOrderNumber] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showBulkSelector, setShowBulkSelector] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    customerName: '',
    whatsappNumber: '',
    email: '',
    company: '',
    projectLocation: '',
    items: [],
    contactMethod: 'whatsapp',
    urgency: 'standard',
    deliveryDate: '',
    notes: ''
  });

  const allProducts = getAllProducts();
  const currency = getCurrency();

  // Generate order number on mount
  useEffect(() => {
    if (!orderNumber) {
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 1000);
      setOrderNumber(`DAM-${timestamp}-${randomNum}`);
    }
  }, [orderNumber]);

  // Auto-save to localStorage
  useEffect(() => {
    const savedOrder = localStorage.getItem('darAlMuaazilOrder');
    if (savedOrder) {
      try {
        setOrderForm(JSON.parse(savedOrder));
      } catch (error) {
        console.error('Failed to load saved order:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darAlMuaazilOrder', JSON.stringify(orderForm));
  }, [orderForm]);

  const addProduct = (productId: string) => {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = orderForm.items.find(item => item.productId === productId);
    if (existingItem) {
      setOrderForm(prev => ({
        ...prev,
        items: prev.items.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }));
    } else {
      setOrderForm(prev => ({
        ...prev,
        items: [...prev.items, {
          productId: product.id,
          productName: product.name[language],
          priceUsd: product.pricing.usd,
          priceAed: product.pricing.aed,
          quantity: 1,
          laborServices: false,
          selectedSize: product.sizes ? product.sizes[0] : undefined
        }]
      }));
    }
  };

  const addMultipleProducts = (productIds: string[]) => {
    const newItems = productIds.map(productId => {
      const product = allProducts.find(p => p.id === productId);
      if (!product) return null;

      return {
        productId: product.id,
        productName: product.name[language],
        priceUsd: product.pricing.usd,
        priceAed: product.pricing.aed,
        quantity: 1,
        laborServices: false,
        selectedSize: product.sizes ? product.sizes[0] : undefined
      };
    }).filter(Boolean) as OrderItem[];

    setOrderForm(prev => ({
      ...prev,
      items: [...prev.items, ...newItems]
    }));

    if (showBulkSelector) {
      setShowBulkSelector(false);
    }

    toast({
      title: isRTL() ? 'تم إضافة المنتجات' : 'Products Added',
      description: isRTL()
        ? `تم إضافة ${productIds.length} منتج إلى الطلب`
        : `${productIds.length} product${productIds.length > 1 ? 's' : ''} added to your order`
    });
  };

  const addAllFeaturedProducts = () => {
    const availableFeaturedIds = featuredProducts
      .filter(product => !orderForm.items.some(item => item.productId === product.id))
      .map(product => product.id);

    if (availableFeaturedIds.length > 0) {
      addMultipleProducts(availableFeaturedIds);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeProduct(productId);
      return;
    }

    setOrderForm(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    }));
  };

  const removeProduct = (productId: string) => {
    setOrderForm(prev => ({
      ...prev,
      items: prev.items.filter(item => item.productId !== productId)
    }));
  };

  const toggleItemLaborServices = (productId: string) => {
    setOrderForm(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.productId === productId
          ? { ...item, laborServices: !item.laborServices }
          : item
      )
    }));
  };

  const updateItemSize = (productId: string, size: string) => {
    setOrderForm(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.productId === productId
          ? { ...item, selectedSize: size }
          : item
      )
    }));
  };

  const calculateTotal = () => {
    return orderForm.items.reduce((total, item) => {
      const price = currency === 'USD' ? item.priceUsd : item.priceAed;
      const itemTotal = price * item.quantity;
      const laborCost = item.laborServices ? (price * 0.3 * item.quantity) : 0;
      return total + itemTotal + laborCost;
    }, 0);
  };

  const calculateTotalUsd = () => {
    return orderForm.items.reduce((total, item) => {
      const itemTotal = item.priceUsd * item.quantity;
      const laborCost = item.laborServices ? (item.priceUsd * 0.3 * item.quantity) : 0;
      return total + itemTotal + laborCost;
    }, 0);
  };

  const calculateTotalAed = () => {
    return orderForm.items.reduce((total, item) => {
      const itemTotal = item.priceAed * item.quantity;
      const laborCost = item.laborServices ? (item.priceAed * 0.3 * item.quantity) : 0;
      return total + itemTotal + laborCost;
    }, 0);
  };

  const generatePDF = async (): Promise<{ url: string; base64: string }> => {
    if (!pdfRef.current) return { url: '', base64: '' };

    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const pdfBase64 = pdf.output('datauristring');

      return { url: pdfUrl, base64: pdfBase64 };
    } catch (error) {
      console.error('Error generating PDF:', error);
      return { url: '', base64: '' };
    }
  };

  const downloadPDF = async () => {
    try {
      const { url: pdfUrl } = await generatePDF();
      if (pdfUrl) {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `Order-${orderNumber}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(pdfUrl);

        toast({
          title: isRTL() ? 'تم تحميل ملف PDF' : 'PDF Downloaded',
          description: isRTL() ? 'تم تحميل ملخص الطلب بنجاح' : 'Order summary downloaded successfully'
        });
      }
    } catch (error) {
      toast({
        title: isRTL() ? 'خطأ في التحميل' : 'Download Error',
        description: isRTL() ? '��شل في تحم��ل ملف PDF' : 'Failed to download PDF',
        variant: 'destructive'
      });
    }
  };

  const formatWhatsAppMessage = () => {
    const totalUsd = calculateTotalUsd();
    const totalAed = calculateTotalAed();
    const currentDate = new Date().toLocaleDateString();

    let message = `*🏗️ ${isRTL() ? 'طلب جديد من دار المعازل' : 'NEW ORDER - Dar Al Muaazil'}*\n`;
    message += `📋 ${isRTL() ? 'رقم الطلب' : 'Order #'}: ${orderNumber}\n`;
    message += `📅 ${isRTL() ? 'التاريخ' : 'Date'}: ${currentDate}\n\n`;

    message += `*👤 ${isRTL() ? 'معلومات العميل' : 'CUSTOMER INFORMATION'}:*\n`;
    message += `• ${isRTL() ? 'الاسم' : 'Name'}: ${orderForm.customerName}\n`;
    if (orderForm.company) message += `• ${isRTL() ? 'الشركة' : 'Company'}: ${orderForm.company}\n`;
    message += `• ${isRTL() ? 'البريد الإلكتروني' : 'Email'}: ${orderForm.email}\n`;
    message += `• ${isRTL() ? 'رقم الواتساب' : 'WhatsApp'}: ${orderForm.whatsappNumber}\n`;
    if (orderForm.projectLocation) message += `• ${isRTL() ? 'موقع المشروع' : 'Project Location'}: ${orderForm.projectLocation}\n`;

    message += `• ${isRTL() ? 'الأولوية' : 'Priority'}: `;
    if (orderForm.urgency === 'rush') message += `🔴 ${isRTL() ? 'طارئ' : 'RUSH'}\n`;
    else if (orderForm.urgency === 'urgent') message += `🟡 ${isRTL() ? 'عاجل' : 'URGENT'}\n`;
    else message += `����� ${isRTL() ? 'عادي' : 'STANDARD'}\n`;

    if (orderForm.deliveryDate) message += `• ${isRTL() ? 'تاريخ التسليم المطلوب' : 'Requested Delivery'}: ${orderForm.deliveryDate}\n`;
    message += '\n';

    message += `*📦 ${isRTL() ? 'تفاصيل الطلب' : 'ORDER DETAILS'}:*\n`;
    orderForm.items.forEach((item, index) => {
      message += `\n${index + 1}. *${item.productName}*\n`;
      message += `   📊 ${isRTL() ? 'الكمية' : 'Quantity'}: ${item.quantity}\n`;
      if (item.selectedSize) message += `   📏 ${isRTL() ? 'الح��م' : 'Size'}: ${item.selectedSize}\n`;
      message += `   💰 ${isRTL() ? 'السعر' : 'Unit Price'}: $${item.priceUsd} USD / ${item.priceAed} AED\n`;
      if (item.laborServices) {
        message += `   👷 ${isRTL() ? 'خدمات العمالة: ✅ نعم' : 'Labor Services: ✅ YES'}\n`;
      }
      const itemTotalUsd = item.priceUsd * item.quantity + (item.laborServices ? item.priceUsd * 0.3 * item.quantity : 0);
      const itemTotalAed = item.priceAed * item.quantity + (item.laborServices ? item.priceAed * 0.3 * item.quantity : 0);
      message += `   💵 ${isRTL() ? 'المجموع الفرعي' : 'Subtotal'}: $${itemTotalUsd.toFixed(2)} USD / ${itemTotalAed.toFixed(2)} AED\n`;
    });

    message += `\n*💰 ${isRTL() ? 'المجموع النهائي' : 'GRAND TOTAL'}:*\n`;
    message += `💵 USD: *$${totalUsd.toFixed(2)}*\n`;
    message += `💴 AED: *${totalAed.toFixed(2)} AED*\n\n`;

    if (orderForm.notes) {
      message += `*📝 ${isRTL() ? 'ملاحظات خاصة' : 'SPECIAL NOTES'}:*\n${orderForm.notes}\n\n`;
    }

    message += `*📄 ${isRTL() ? 'ملف PDF مفصل' : 'DETAILED PDF ATTACHMENT'}:*\n`;
    message += `${isRTL()
      ? '📎 ملف PDF شامل لتفاصيل الطلب تم تحميله تلقائ��اً على جهازك\n🔗 يرج�� إرفاق الملف المحمل مع هذه الرسالة'
      : '📎 Complete PDF order summary automatically downloaded to your device\n🔗 Please attach the downloaded file to this message'}\n\n`;

    message += `✅ ${isRTL() ? 'شكراً لاختياركم دار المعازل!' : 'Thank you for choosing Dar Al Muaazil!'}\n`;
    message += `📞 ${isRTL() ? 'سنتواصل معكم قريباً لتأكيد الطلب' : 'We will contact you shortly to confirm this order'}`;

    return encodeURIComponent(message);
  };

  const sendWhatsAppOrder = async (pdfUrl?: string) => {
    const message = formatWhatsAppMessage();
    const whatsappUrl = `https://wa.me/971502342218?text=${message}`;

    // Automatically download PDF for manual sharing via WhatsApp
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `Order-${orderNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show instructions after a short delay
      setTimeout(() => {
        toast({
          title: isRTL() ? 'كيفية مشاركة PDF عبر الواتساب' : 'How to Share PDF via WhatsApp',
          description: isRTL()
            ? '��م فتح الواتساب ��تحميل ملف PDF. في الواتساب، اضغط على أيقونة المرفق (📎) ثم اختر "المستند" وارفق الملف المحمل'
            : 'WhatsApp opened and PDF downloaded. In WhatsApp, click the attachment icon (📎), select "Document" and attach the downloaded file',
        });
      }, 2000);
    }

    window.open(whatsappUrl, '_blank');
  };

  const sendEmailOrder = async (pdfBase64: string) => {
    try {
      // EmailJS configuration
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      const templateParams = {
        to_email: 'orders@damgcc.com', // Company email
        customer_name: orderForm.customerName,
        customer_email: orderForm.email,
        customer_phone: orderForm.whatsappNumber,
        company: orderForm.company || 'N/A',
        project_location: orderForm.projectLocation || 'N/A',
        order_number: orderNumber,
        order_date: new Date().toLocaleDateString(),
        urgency: orderForm.urgency,
        delivery_date: orderForm.deliveryDate || 'Not specified',
        total_usd: calculateTotalUsd().toFixed(2),
        total_aed: calculateTotalAed().toFixed(2),
        items_count: orderForm.items.length,
        notes: orderForm.notes || 'No special notes',
        pdf_attachment: pdfBase64,
        order_details: orderForm.items.map((item, index) =>
          `${index + 1}. ${item.productName} - Qty: ${item.quantity} - Price: $${item.priceUsd}/${item.priceAed} AED${item.laborServices ? ' (Labor included)' : ''}`
        ).join('\n')
      };

      // Check if EmailJS credentials are configured
      if (!serviceId || !templateId || !publicKey || publicKey === 'your_emailjs_public_key_here') {
        console.warn('EmailJS not configured properly. Skipping email sending.');
        toast({
          title: isRTL() ? 'إشعار' : 'Notice',
          description: isRTL() ? 'سيت�� إرسال تفاصيل الطلب عبر ال��اتساب ف��ط' : 'Order details will be sent via WhatsApp only',
          variant: 'destructive'
        });
        return;
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast({
        title: isRTL() ? '��م إرسال البريد الإلكتروني' : 'Email Sent Successfully',
        description: isRTL() ? 'تم إرسال تفاصيل الطلب بالبريد الإلك��روني مع ملف PDF' : 'Order details sent via email with PDF attachment'
      });
    } catch (error) {
      console.error('Email sending error:', error);
      toast({
        title: isRTL() ? 'خطأ في البريد الإلكتروني' : 'Email Error',
        description: isRTL() ? 'فشل في إرسال البريد الإلكتروني. سيتم الإرسال عبر الواتساب فقط' : 'Failed to send email. Order sent via WhatsApp only',
        variant: 'destructive'
      });
    }
  };

  const clearOrder = () => {
    setOrderForm({
      customerName: '',
      whatsappNumber: '',
      email: '',
      company: '',
      projectLocation: '',
      items: [],
      contactMethod: 'whatsapp',
      urgency: 'standard',
      deliveryDate: '',
      notes: ''
    });
    localStorage.removeItem('darAlMuaazilOrder');
  };

  const previewOrder = () => {
    if (orderForm.items.length === 0) {
      toast({
        title: isRTL() ? 'طلب فارغ' : 'Empty Order',
        description: isRTL() ? 'يرجى إضافة منتجات إلى طلبك' : 'Please add products to your order',
        variant: 'destructive'
      });
      return;
    }
    setShowPreview(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    previewOrder();
  };

  const confirmAndSendOrder = async () => {
    setIsSubmitting(true);

    try {
      // Generate PDF first
      const { url: pdfUrl, base64: pdfBase64 } = await generatePDF();

      // Send via WhatsApp if selected
      if (orderForm.contactMethod === 'whatsapp' || orderForm.contactMethod === 'both') {
        await sendWhatsAppOrder(pdfUrl);
      }

      // Send via Email if selected and PDF is generated
      if ((orderForm.contactMethod === 'email' || orderForm.contactMethod === 'both') && pdfBase64) {
        await sendEmailOrder(pdfBase64);
      }

      // Customize success message based on contact method
      let successMessage = '';
      if (orderForm.contactMethod === 'whatsapp') {
        successMessage = isRTL()
          ? 'تم فتح الواتساب ��تحميل ملف PDF للمشاركة. سنتواصل ��عك قريباً'
          : 'WhatsApp opened and PDF downloaded for sharing. We will contact you soon.';
      } else if (orderForm.contactMethod === 'email') {
        successMessage = isRTL()
          ? 'تم إرسال الطلب بالبريد الإلكتروني مع ملف PDF. سنتواصل معك قريباً'
          : 'Order sent via email with PDF attachment. We will contact you soon.';
      } else {
        successMessage = isRTL()
          ? 'تم إرسال الطلب عبر الواتساب والبريد الإلكتروني مع ملف PDF. سنتواصل معك قريباً'
          : 'Order sent via WhatsApp and email with PDF. We will contact you soon.';
      }

      toast({
        title: isRTL() ? 'تم إرسال الطلب' : 'Order Submitted',
        description: successMessage
      });

      // Auto-download PDF for customer records (if not already downloaded by WhatsApp)
      if (pdfUrl && orderForm.contactMethod === 'email') {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `Order-${orderNumber}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      // Clean up PDF URL
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }

      clearOrder();
      setShowPreview(false);
    } catch (error) {
      console.error('Order submission error:', error);
      toast({
        title: isRTL() ? 'خطأ في الطلب' : 'Order Error',
        description: isRTL() ? 'حدث خطأ أثن��ء إرسال الطلب' : 'An error occurred while submitting your order',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'rush': return 'gradient-error text-white status-badge';
      case 'urgent': return 'gradient-warning text-white status-badge';
      default: return 'gradient-success text-white status-badge';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4 floating-animation"
          >
            <Crown className="inline-block w-12 h-12 mr-4 text-accent" />
            {t('nav.order')}
          </motion.h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRTL() 
              ? 'املأ النموذج أدناه لطلب منتجاتك. سنتواصل معك قريباً لتأ��يد الطلب'
              : 'Fill out the form below to order your products. We will contact you shortly to confirm your order'
            }
          </p>
          
          {/* Enhanced Progress indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center mt-8"
          >
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold premium-shadow transition-all duration-300 ${
                  currentStep >= 1
                    ? 'gradient-primary text-white neon-border'
                    : 'bg-muted text-muted-foreground hover:bg-primary/20'
                }`}
              >
                {currentStep >= 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
              </motion.div>
              <div className={`w-20 h-2 rounded-full transition-all duration-500 ${
                currentStep >= 2 ? 'gradient-primary shimmer' : 'bg-muted'
              }`} />
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold premium-shadow transition-all duration-300 ${
                  currentStep >= 2
                    ? 'gradient-primary text-white neon-border'
                    : 'bg-muted text-muted-foreground hover:bg-primary/20'
                }`}
              >
                {currentStep >= 2 ? <Package className="w-5 h-5" /> : '2'}
              </motion.div>
              <div className={`w-20 h-2 rounded-full transition-all duration-500 ${
                currentStep >= 3 ? 'gradient-primary shimmer' : 'bg-muted'
              }`} />
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold premium-shadow transition-all duration-300 ${
                  currentStep >= 3
                    ? 'gradient-primary text-white neon-border'
                    : 'bg-muted text-muted-foreground hover:bg-primary/20'
                }`}
              >
                {currentStep >= 3 ? <Star className="w-5 h-5" /> : '3'}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL() ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Customer Information */}
            <Card className="glass-card border-primary/20 premium-shadow-lg hover:premium-shadow transition-all duration-300 hover:border-primary/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 premium-gradient rounded-xl flex items-center justify-center pulse-glow"
                  >
                    <User className="h-6 w-6 text-white" />
                  </motion.div>
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
                    {isRTL() ? 'معلومات العميل' : 'Customer Information'}
                  </span>
                  <Badge className="gradient-success text-white status-badge ml-2">
                    <Star className="w-3 h-3 mr-1" />
                    {isRTL() ? 'مطلوب' : 'Required'}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {isRTL() ? 'املأ معلوماتك الشخصية ومعلومات الشركة' : 'Fill in your personal and company information'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">
                      {isRTL() ? 'اسم العميل' : 'Customer Name'} *
                    </Label>
                    <Input
                      id="customerName"
                      value={orderForm.customerName}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, customerName: e.target.value }))}
                      placeholder={isRTL() ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">
                      {isRTL() ? 'اسم الشركة' : 'Company Name'}
                    </Label>
                    <Input
                      id="company"
                      value={orderForm.company}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, company: e.target.value }))}
                      placeholder={isRTL() ? 'اختياري' : 'Optional'}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="whatsappNumber">
                      {isRTL() ? 'رقم الواتساب' : 'WhatsApp Number'} *
                    </Label>
                    <Input
                      id="whatsappNumber"
                      value={orderForm.whatsappNumber}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                      placeholder="+971501234567"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">
                      {isRTL() ? 'البريد الإلكتروني' : 'Email Address'} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={orderForm.email}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="projectLocation">
                    {isRTL() ? 'موقع ال��شروع' : 'Project Location'}
                  </Label>
                  <Input
                    id="projectLocation"
                    value={orderForm.projectLocation}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, projectLocation: e.target.value }))}
                    placeholder={isRTL() ? 'دبي، أبوظبي، الشارقة...' : 'Dubai, Abu Dhabi, Sharjah...'}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="contactMethod">
                      {isRTL() ? 'طريقة التواصل المفضلة' : 'Preferred Contact Method'}
                    </Label>
                    <Select 
                      value={orderForm.contactMethod} 
                      onValueChange={(value: any) => setOrderForm(prev => ({ ...prev, contactMethod: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whatsapp">
                          {isRTL() ? 'واتساب فقط' : 'WhatsApp Only'}
                        </SelectItem>
                        <SelectItem value="email">
                          {isRTL() ? 'البريد الإلكتروني فقط' : 'Email Only'}
                        </SelectItem>
                        <SelectItem value="both">
                          {isRTL() ? 'كلا��ما' : 'Both'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="urgency">
                      {isRTL() ? 'أولوية الطلب' : 'Order Urgency'}
                    </Label>
                    <Select 
                      value={orderForm.urgency} 
                      onValueChange={(value: any) => setOrderForm(prev => ({ ...prev, urgency: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">
                          {isRTL() ? 'عادي (5-7 أيام)' : 'Standard (5-7 days)'}
                        </SelectItem>
                        <SelectItem value="urgent">
                          {isRTL() ? 'عاجل (2-3 أيام)' : 'Urgent (2-3 days)'}
                        </SelectItem>
                        <SelectItem value="rush">
                          {isRTL() ? 'طارئ (24 ساعة)' : 'Rush (24 hours)'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="deliveryDate">
                      {isRTL() ? 'تاريخ التسليم المطلوب' : 'Required Delivery Date'}
                    </Label>
                    <Input
                      id="deliveryDate"
                      type="date"
                      value={orderForm.deliveryDate}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, deliveryDate: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Selection */}
            <Card className="glass-card border-accent/20 premium-shadow-lg hover:premium-shadow transition-all duration-300 hover:border-accent/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center pulse-glow"
                  >
                    <Package className="h-6 w-6 text-white" />
                  </motion.div>
                  <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent font-bold">
                    {isRTL() ? 'اختيار المنتجات' : 'Product Selection'}
                  </span>
                  <Badge className="gradient-info text-white status-badge ml-2">
                    <Zap className="w-3 h-3 mr-1" />
                    {orderForm.items.length} {isRTL() ? 'منتج' : 'Items'}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {isRTL() ? 'أضف المنتج�����ت إلى طلبك مع تحديد الكميات والأحجام' : 'Add products to your order with quantities and sizes'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Enhanced Selection Mode Tabs */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        variant={!showBulkSelector ? 'default' : 'outline'}
                        size="lg"
                        onClick={() => setShowBulkSelector(false)}
                        className={`w-full transition-all duration-500 group ${
                          !showBulkSelector
                            ? 'gradient-primary text-white premium-shadow-lg neon-border'
                            : 'glass-card hover:bg-primary/10 hover:border-primary/30'
                        }`}
                      >
                        <User className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                        {isRTL() ? 'إضافة منتج واحد' : 'Single Product'}
                        {!showBulkSelector && <Star className="w-4 h-4 ml-2" />}
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        variant={showBulkSelector ? 'default' : 'outline'}
                        size="lg"
                        onClick={() => setShowBulkSelector(true)}
                        className={`w-full transition-all duration-500 group ${
                          showBulkSelector
                            ? 'gradient-accent text-white premium-shadow-lg neon-border'
                            : 'glass-card hover:bg-accent/10 hover:border-accent/30'
                        }`}
                      >
                        <Package className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                        {isRTL() ? 'إضافة منتجات متعددة' : 'Multiple Products'}
                        {showBulkSelector && <Crown className="w-4 h-4 ml-2" />}
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Single Product Selection */}
                  {!showBulkSelector && (
                    <div className="space-y-6">
                      <div>
                        <h5 className="font-medium text-foreground mb-3">
                          {isRTL() ? 'البح�� في جميع المنتجات' : 'Search All Products'}
                        </h5>
                        <Select onValueChange={addProduct}>
                          <SelectTrigger>
                            <SelectValue placeholder={isRTL() ? 'اختر منتج لإضافته' : 'Select a product to add'} />
                          </SelectTrigger>
                          <SelectContent>
                            {allProducts.map((product) => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name[language]} - ${product.pricing.usd} / {product.pricing.aed} AED
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <QuickAddProducts
                        onAddProduct={addProduct}
                        existingProductIds={orderForm.items.map(item => item.productId)}
                      />

                      {/* Quick Add All Featured Button */}
                      {(() => {
                        const availableFeatured = featuredProducts.filter(
                          product => !orderForm.items.some(item => item.productId === product.id)
                        );

                        return availableFeatured.length > 1 ? (
                          <div className="text-center">
                            <Button
                              variant="outline"
                              onClick={addAllFeaturedProducts}
                              className="gap-2 border-dashed border-primary/50 text-primary hover:bg-primary/10"
                            >
                              <Plus className="h-4 w-4" />
                              {isRTL()
                                ? `إضافة جمي�� المنتجات المميزة (${availableFeatured.length})`
                                : `Add All Featured Products (${availableFeatured.length})`
                              }
                            </Button>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  )}

                  {/* Bulk Product Selection */}
                  {showBulkSelector && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-foreground">
                          {isRTL() ? 'اختيار منتجات متعد��ة' : 'Select Multiple Products'}
                        </h5>
                        <Badge variant="outline">
                          {allProducts.length - orderForm.items.length} {isRTL() ? 'متاح' : 'available'}
                        </Badge>
                      </div>
                      <BulkProductSelector
                        onAddProducts={addMultipleProducts}
                        existingProductIds={orderForm.items.map(item => item.productId)}
                      />
                    </div>
                  )}

                  {/* Order Items */}
                  {orderForm.items.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">
                          {isRTL() ? '��لمنتجات المحددة' : 'Selected Products'}
                        </h4>
                        <Badge variant="secondary">
                          {orderForm.items.length} {isRTL() ? 'من��ج' : 'items'}
                        </Badge>
                      </div>
                      
                      {orderForm.items.map((item) => {
                        const product = allProducts.find(p => p.id === item.productId);
                        return (
                          <div key={item.productId} className="p-4 border rounded-lg space-y-4 bg-accent/20">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h5 className="font-medium text-foreground">{item.productName}</h5>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {language === 'en' ? (
                                    <span>${item.priceUsd} USD / {item.priceAed} AED per unit</span>
                                  ) : (
                                    <span>{item.priceAed} AED لكل وحدة</span>
                                  )}
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeProduct(item.productId)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            {/* Size selection */}
                            {product?.sizes && (
                              <div>
                                <Label className="text-sm font-medium">
                                  {isRTL() ? 'الحجم' : 'Size'}
                                </Label>
                                <Select 
                                  value={item.selectedSize} 
                                  onValueChange={(size) => updateItemSize(item.productId, size)}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder={isRTL() ? 'اختر الحجم' : 'Select size'} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {product.sizes.map((size) => (
                                      <SelectItem key={size} value={size}>
                                        {size}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-16 text-center font-medium text-lg">{item.quantity}</span>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <Switch
                                  checked={item.laborServices}
                                  onCheckedChange={() => toggleItemLaborServices(item.productId)}
                                />
                                <Label className="text-sm font-medium">
                                  {isRTL() ? 'خدمات عمالة' : 'Labor Services'}
                                </Label>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="text-right space-y-1">
                              {language === 'en' ? (
                                <>
                                  <div className="text-sm text-muted-foreground">
                                    Subtotal: ${(item.priceUsd * item.quantity + (item.laborServices ? item.priceUsd * 0.3 * item.quantity : 0)).toFixed(2)} USD
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Subtotal: {(item.priceAed * item.quantity + (item.laborServices ? item.priceAed * 0.3 * item.quantity : 0)).toFixed(2)} AED
                                  </div>
                                </>
                              ) : (
                                <div className="font-medium text-foreground">
                                  المجم��ع الفرعي: {(item.priceAed * item.quantity + (item.laborServices ? item.priceAed * 0.3 * item.quantity : 0)).toFixed(2)} AED
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {isRTL() ? 'ملاحظات إضافية' : 'Additional Notes'}
                </CardTitle>
                <CardDescription>
                  {isRTL() ? 'أي متطلبات خاصة أو تعليمات للتسليم' : 'Any special requirements or delivery instructions'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={orderForm.notes}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder={isRTL() ? 'مثال: يرجى التسليم في الصباح الباكر، يتطلب رافعة شوكية...' : 'Example: Please deliver in early morning, forklift required...'}
                  rows={4}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: isRTL() ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="sticky top-8 glass-card border-accent/30 premium-shadow-lg hover:premium-shadow transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-10 h-10 gradient-info rounded-xl flex items-center justify-center pulse-glow"
                  >
                    <Calculator className="h-5 w-5 text-white" />
                  </motion.div>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                    {isRTL() ? 'ملخص الطلب' : 'Order Summary'}
                  </span>
                  <Badge className="gradient-accent text-white status-badge">
                    <Award className="w-3 h-3 mr-1" />
                    {isRTL() ? 'مباشر' : 'Live'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order status indicators */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {isRTL() ? 'عدد المنتجات' : 'Items'}
                    </span>
                    <Badge variant="secondary">{orderForm.items.length}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {isRTL() ? 'الأولوية' : 'Priority'}
                    </span>
                    <Badge className={getUrgencyColor(orderForm.urgency)}>
                      {orderForm.urgency.charAt(0).toUpperCase() + orderForm.urgency.slice(1)}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Items summary */}
                {orderForm.items.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {isRTL() ? 'لا توجد منتجات في الطلب' : 'No products in your order'}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {orderForm.items.map((item) => (
                        <div key={item.productId} className="flex justify-between text-sm">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{item.productName}</div>
                            <div className="text-muted-foreground">
                              {isRTL() ? 'الكمية' : 'Qty'}: {item.quantity}
                              {item.laborServices && (
                                <Badge variant="secondary" className="ml-2 text-xs">
                                  {isRTL() ? 'عمالة' : 'Labor'}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    {/* Total calculation */}
                    <div className="space-y-3">
                      {language === 'en' ? (
                        <>
                          <div className="flex justify-between text-lg font-bold">
                            <span>{isRTL() ? 'المجموع (دولار)' : 'Total (USD)'}</span>
                            <span className="text-primary">${calculateTotalUsd().toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold">
                            <span>{isRTL() ? 'المجموع (درهم)' : 'Total (AED)'}</span>
                            <span className="text-primary">{calculateTotalAed().toFixed(2)} AED</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between text-lg font-bold">
                          <span>المجموع الكلي</span>
                          <span className="text-primary">{calculateTotal().toFixed(2)} AED</span>
                        </div>
                      )}
                    </div>
                  </>
                )}

                <Separator />

                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full gap-3 premium-gradient text-white font-bold py-6 premium-shadow-lg neon-border transition-all duration-500 group"
                      disabled={orderForm.items.length === 0}
                    >
                      {orderForm.contactMethod === 'whatsapp' && <MessageCircle className="h-5 w-5 group-hover:animate-pulse" />}
                      {orderForm.contactMethod === 'email' && <Mail className="h-5 w-5 group-hover:animate-pulse" />}
                      {orderForm.contactMethod === 'both' && <ShoppingCart className="h-5 w-5 group-hover:animate-pulse" />}
                      <span className="text-lg">
                        {isRTL() ? 'معاينة وإرسال الطلب' : 'Preview & Submit Order'}
                      </span>
                      <Crown className="h-5 w-5 group-hover:animate-bounce" />
                    </Button>
                  </motion.div>
                  
                  {orderForm.items.length > 0 && (
                    <div className="space-y-2">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full gap-2 glass-card hover:bg-accent/20 hover:border-accent/40 transition-all duration-300 group"
                          onClick={downloadPDF}
                        >
                          <Download className="h-4 w-4 group-hover:animate-bounce" />
                          <span className="font-semibold">
                            {isRTL() ? 'تحميل PDF' : 'Download PDF'}
                          </span>
                          <FileText className="h-4 w-4 group-hover:animate-pulse" />
                        </Button>
                      </motion.div>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={clearOrder}
                      >
                        {isRTL() ? 'مسح الطلب' : 'Clear Order'}
                      </Button>
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground text-center">
                    {isRTL() 
                      ? 'بالضغط على إرسال الطلب، فإنك توافق على شروط الخدمة الخاصة بنا'
                      : 'By submitting your order, you agree to our terms of service'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </form>

        {/* Hidden PDF Component for generation */}
        <div className="fixed -top-[9999px] left-0 opacity-0 pointer-events-none">
          <OrderSummaryPDF
            ref={pdfRef}
            orderForm={orderForm}
            orderNumber={orderNumber}
          />
        </div>

        {/* Order Preview Modal */}
        <OrderPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          orderForm={orderForm}
          orderNumber={orderNumber}
          onDownloadPDF={downloadPDF}
          onSendWhatsApp={confirmAndSendOrder}
          isSubmitting={isSubmitting}
        />
    </div>
  );
}

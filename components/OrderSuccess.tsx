import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Home, Package, Phone, Mail, Calendar, Crown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/hooks/use-translation';
import { useAdmin, Order } from '@/contexts/AdminContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const { isRTL } = useTranslation();
  const { orders } = useAdmin();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderNumber) {
      const foundOrder = orders.find(o => o.orderNumber === orderNumber);
      setOrder(foundOrder);
    }
  }, [orderNumber, orders]);

  const downloadReceipt = async () => {
    if (!order) return;

    // Create a temporary div for the receipt
    const receiptElement = document.createElement('div');
    receiptElement.style.position = 'absolute';
    receiptElement.style.left = '-9999px';
    receiptElement.style.top = '0';
    receiptElement.style.width = '800px';
    receiptElement.style.backgroundColor = 'white';
    receiptElement.style.padding = '40px';
    receiptElement.style.fontFamily = 'Arial, sans-serif';
    receiptElement.style.color = '#000';

    receiptElement.innerHTML = `
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://cdn.builder.io/api/v1/image/assets%2F1f92479787d647a5873d822973f760c7%2F4551cf54f8504ccaa05505322826a1fb?format=webp&width=300"
             alt="DAM - The House of Insulation" style="height: 100px; margin-bottom: 20px;" />
        <h1 style="margin: 0; font-size: 28px; color: #1a365d;">DAM - The House of Insulation</h1>
        <p style="margin: 5px 0 0 0; color: #718096;">Dar Al Muaazil LLC</p>
      </div>

      <div style="text-align: center; margin-bottom: 30px; padding: 20px; background-color: #f7fafc; border-radius: 8px;">
        <h2 style="margin: 0 0 10px 0; font-size: 24px; color: #2d3748;">Order Receipt</h2>
        <p style="margin: 0; font-size: 18px; font-weight: bold; color: #3182ce;">Order #${order.orderNumber}</p>
        <p style="margin: 5px 0 0 0; color: #718096;">Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
      </div>

      <div style="margin-bottom: 30px;">
        <h3 style="margin-bottom: 15px; font-size: 18px; color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px;">Customer Information</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${order.customerName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${order.email}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${order.phone}</p>
            ${order.company ? `<p style="margin: 5px 0;"><strong>Company:</strong> ${order.company}</p>` : ''}
          </div>
          <div>
            <p style="margin: 5px 0;"><strong>Address:</strong></p>
            <p style="margin: 5px 0; padding-left: 20px;">${order.shippingAddress.address}</p>
            <p style="margin: 5px 0; padding-left: 20px;">${order.shippingAddress.city}, ${order.shippingAddress.emirate}</p>
            ${order.shippingAddress.postalCode ? `<p style="margin: 5px 0; padding-left: 20px;">${order.shippingAddress.postalCode}</p>` : ''}
          </div>
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        <h3 style="margin-bottom: 15px; font-size: 18px; color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px;">Order Items</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f7fafc;">
              <th style="text-align: left; padding: 12px; border: 1px solid #e2e8f0;">Item</th>
              <th style="text-align: center; padding: 12px; border: 1px solid #e2e8f0;">Qty</th>
              <th style="text-align: right; padding: 12px; border: 1px solid #e2e8f0;">Price (USD)</th>
              <th style="text-align: right; padding: 12px; border: 1px solid #e2e8f0;">Price (AED)</th>
              <th style="text-align: right; padding: 12px; border: 1px solid #e2e8f0;">Total (USD)</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td style="padding: 12px; border: 1px solid #e2e8f0;">
                  <div>
                    <strong>${item.name}</strong>
                    ${item.type === 'service' && item.urgency ? `<br><small style="color: #718096;">Priority: ${item.urgency}</small>` : ''}
                    ${item.size ? `<br><small style="color: #718096;">Size: ${item.size}</small>` : ''}
                    ${item.laborServices ? `<br><small style="color: #718096;">With Labor Services</small>` : ''}
                  </div>
                </td>
                <td style="text-align: center; padding: 12px; border: 1px solid #e2e8f0;">${item.quantity}</td>
                <td style="text-align: right; padding: 12px; border: 1px solid #e2e8f0;">$${item.price.usd.toFixed(2)}</td>
                <td style="text-align: right; padding: 12px; border: 1px solid #e2e8f0;">${item.price.aed.toFixed(2)} AED</td>
                <td style="text-align: right; padding: 12px; border: 1px solid #e2e8f0;">$${(item.price.usd * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div style="margin-bottom: 30px;">
        <div style="display: flex; justify-content: flex-end;">
          <div style="width: 300px; background-color: #f7fafc; padding: 20px; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span><strong>Total (USD):</strong></span>
              <span><strong>$${order.total.usd.toFixed(2)}</strong></span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span><strong>Total (AED):</strong></span>
              <span><strong>${order.total.aed.toFixed(2)} AED</strong></span>
            </div>
            <div style="border-top: 1px solid #cbd5e0; padding-top: 10px; margin-top: 10px;">
              <div style="display: flex; justify-content: space-between;">
                <span>Payment Method:</span>
                <span>${order.paymentMethod.replace('_', ' ').toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="text-align: center; color: #718096; font-size: 14px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
        <p style="margin: 5px 0;">Thank you for your business!</p>
        <p style="margin: 5px 0;">Contact us: +971502342218 | info@damgcc.com</p>
        <p style="margin: 5px 0;">Generated on ${new Date().toLocaleDateString()}</p>
      </div>
    `;

    document.body.appendChild(receiptElement);

    try {
      const canvas = await html2canvas(receiptElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`DAM-Receipt-${order.orderNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      document.body.removeChild(receiptElement);
    }
  };

  if (!orderNumber) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {isRTL() ? 'لم يتم العثور على الطلب' : 'Order not found'}
          </h1>
          <Button asChild>
            <Link href="/">
              {isRTL() ? 'العودة للرئيسية' : 'Back to Home'}
            </Link>
          </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-32 h-32 mx-auto mb-8 gradient-success rounded-full flex items-center justify-center"
          >
            <CheckCircle className="h-16 w-16 text-white" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent mb-4">
            {isRTL() ? 'تم تأكيد طلبك!' : 'Order Confirmed!'}
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            {isRTL() 
              ? 'شكراً لك! تم استلام طلبك وسيتم معالجته قريباً'
              : 'Thank you! Your order has been received and will be processed soon'
            }
          </p>
          {orderNumber && (
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg">
              <Package className="h-5 w-5" />
              <span className="font-semibold">
                {isRTL() ? 'رقم الطلب:' : 'Order Number:'} {orderNumber}
              </span>
            </div>
          )}
        </motion.div>

        {order && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="glass-card border-primary/20 premium-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Crown className="h-5 w-5 text-primary" />
                      {isRTL() ? 'تفاصيل الطلب' : 'Order Details'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {isRTL() ? 'اسم العميل' : 'Customer Name'}
                        </p>
                        <p className="font-medium">{order.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {isRTL() ? 'البريد الإلكتروني' : 'Email'}
                        </p>
                        <p className="font-medium">{order.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {isRTL() ? 'رقم الهاتف' : 'Phone'}
                        </p>
                        <p className="font-medium">{order.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {isRTL() ? 'حالة الطلب' : 'Order Status'}
                        </p>
                        <Badge className="gradient-primary text-white">
                          {order.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {isRTL() ? 'طريقة الدفع' : 'Payment Method'}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {order.paymentMethod === 'stripe' && '💳 Stripe'}
                            {order.paymentMethod === 'card' && '💳 Credit Card'}
                            {order.paymentMethod === 'bank_transfer' && '🏦 Bank Transfer'}
                            {order.paymentMethod === 'cash_on_delivery' && '💵 Cash on Delivery'}
                          </span>
                          <Badge className={`text-xs ${
                            order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                            order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {order.paymentStatus.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Items */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="glass-card border-accent/20 premium-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-accent" />
                      {isRTL() ? 'عناصر الطلب' : 'Order Items'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-start p-4 bg-accent/5 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{item.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span>{isRTL() ? 'الكمية:' : 'Qty:'} {item.quantity}</span>
                              {item.urgency && (
                                <Badge variant="outline" className="text-xs">
                                  {item.urgency}
                                </Badge>
                              )}
                              {item.size && <span>{isRTL() ? 'الحجم:' : 'Size:'} {item.size}</span>}
                              {item.laborServices && (
                                <span className="text-blue-600">
                                  {isRTL() ? 'مع خدمات العمالة' : 'With Labor Services'}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-primary">
                              ${(item.price.usd * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {(item.price.aed * item.quantity).toFixed(2)} AED
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Actions Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Total */}
              <Card className="glass-card border-green-500/20 premium-shadow-lg">
                <CardHeader>
                  <CardTitle className="text-green-600">
                    {isRTL() ? 'إجمالي الطلب' : 'Order Total'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-lg">
                      <span>USD:</span>
                      <span className="font-bold text-primary">${order.total.usd.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>AED:</span>
                      <span className="font-bold text-primary">{order.total.aed.toFixed(2)} AED</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="glass-card premium-shadow">
                <CardContent className="p-6 space-y-4">
                  <Button 
                    onClick={downloadReceipt}
                    className="w-full gap-2 gradient-primary text-white"
                  >
                    <Download className="h-4 w-4" />
                    {isRTL() ? 'تحميل الفاتورة' : 'Download Receipt'}
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full gap-2">
                    <Link href="/">
                      <Home className="h-4 w-4" />
                      {isRTL() ? 'العودة للرئيسية' : 'Back to Home'}
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full gap-2">
                    <Link href="/products">
                      <Package className="h-4 w-4" />
                      {isRTL() ? 'متابعة التسوق' : 'Continue Shopping'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="glass-card border-info/20 premium-shadow">
                <CardHeader>
                  <CardTitle className="text-info">
                    {isRTL() ? 'اتصل بنا' : 'Contact Us'}
                  </CardTitle>
                  <CardDescription>
                    {isRTL() 
                      ? 'لأي استفسارات حول طلبك'
                      : 'For any questions about your order'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>+971502342218</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>info@damgcc.com</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <Card className="glass-card border-accent/20 premium-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-accent" />
                {isRTL() ? 'الخطوات التالية' : 'What Happens Next?'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">
                    {isRTL() ? 'تأكيد الطلب' : 'Order Confirmation'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {isRTL() 
                      ? 'سنرسل لك بريداً إلكترونياً للتأكيد خلال 24 ساعة'
                      : 'We will send you a confirmation email within 24 hours'
                    }
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 gradient-accent rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">
                    {isRTL() ? 'تحضير الطلب' : 'Order Preparation'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {isRTL() 
                      ? 'سنبدأ في تحضير منتجاتك وجدولة خدماتك'
                      : 'We will start preparing your products and scheduling your services'
                    }
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 gradient-success rounded-full flex items-center justify-center mx-auto mb-3">
                    <ArrowRight className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">
                    {isRTL() ? 'التسليم والتنفيذ' : 'Delivery & Execution'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {isRTL() 
                      ? 'سنقوم بالتسليم وتنفيذ الخدمات حسب الموعد المحدد'
                      : 'We will deliver products and execute services as scheduled'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
    </div>
  );
}

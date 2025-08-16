'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const { t, isRTL } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: isRTL() ? 'العنوان' : 'Address',
      content: 'Shams Business Center, Sharjah, UAE',
      action: () => window.open('https://maps.google.com/?q=Shams+Business+Center+Sharjah+UAE', '_blank')
    },
    {
      icon: Phone,
      title: isRTL() ? 'الهاتف' : 'Phone',
      content: '+971502342218',
      action: () => window.open('tel:+971502342218')
    },
    {
      icon: Mail,
      title: isRTL() ? 'البريد الإلكتروني' : 'Email',
      content: 'info@damgcc.com',
      action: () => window.open('mailto:info@damgcc.com')
    },
    {
      icon: MessageCircle,
      title: isRTL() ? 'واتساب' : 'WhatsApp',
      content: '+971502342218',
      action: () => window.open('https://wa.me/971502342218', '_blank')
    }
  ];

  const businessHours = [
    { day: isRTL() ? 'الأحد - الخميس' : 'Sunday - Thursday', hours: '8:00 AM - 6:00 PM' },
    { day: isRTL() ? 'الجمعة' : 'Friday', hours: '2:00 PM - 6:00 PM' },
    { day: isRTL() ? 'السبت' : 'Saturday', hours: isRTL() ? 'مغلق' : 'Closed' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Initialize EmailJS (only needs to be done once)
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

      // Prepare template parameters
      const templateParams = {
        from_name: contactForm.name,
        from_email: contactForm.email,
        phone: contactForm.phone,
        subject: contactForm.subject,
        message: contactForm.message,
        to_name: 'DAM Team',
        to_email: 'info@damgcc.com',
        reply_to: contactForm.email,
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams
      );

      console.log('EmailJS response:', response);

      toast({
        title: isRTL() ? 'تم إرسال الرسالة' : 'Message Sent Successfully',
        description: isRTL() 
          ? 'شكراً لتواصلك معنا. سنرد عليك قريباً عبر البريد الإلكتروني'
          : 'Thank you for contacting us. We will get back to you soon via email.'
      });

      // Reset form
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('EmailJS error:', error);
      
      toast({
        title: isRTL() ? 'خطأ في الإرسال' : 'Failed to Send Message',
        description: isRTL() 
          ? 'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب'
          : 'Failed to send message. Please try again or contact us via WhatsApp.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.743!2d55.4033!3d25.3573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5f43348a67ed1%3A0x1a1b1c1d1e1f1g1h!2sShams%20Business%20Center%2C%20Sharjah%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s";

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
            {t('nav.contact')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRTL() 
              ? 'تواصل معنا للحصول على استشارة مجانية أو لطلب منتجاتك المطلوبة'
              : 'Get in touch with us for a free consultation or to order your required products'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: isRTL() ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Company Info */}
            <Card className="glass-effect border-border/30 premium-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                    <Building className="h-5 w-5 text-white" />
                  </div>
                  {isRTL() ? 'دار المعازل' : 'Dar Al Muaazil'}
                </CardTitle>
                <CardDescription>
                  {isRTL() 
                    ? 'مورد موثوق لمواد البناء والعزل في الإمارات'
                    : 'Trusted supplier of construction and insulation materials in UAE'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={info.action}
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{info.title}</h4>
                        <p className="text-sm text-muted-foreground">{info.content}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {isRTL() ? 'ساعات العمل' : 'Business Hours'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">{schedule.day}</span>
                    <span className="font-medium text-foreground">{schedule.hours}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick WhatsApp */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200/50 premium-shadow hover:premium-shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  {isRTL() ? 'تواصل فوري عبر واتساب' : 'Quick WhatsApp Contact'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {isRTL() 
                    ? 'احصل على رد سريع على استفساراتك'
                    : 'Get instant response to your queries'
                  }
                </p>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => window.open('https://wa.me/971502342218', '_blank')}
                >
                  {isRTL() ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form & Map */}
          <motion.div
            initial={{ opacity: 0, x: isRTL() ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact Form */}
            <Card className="glass-effect border-border/30 premium-shadow">
              <CardHeader>
                <CardTitle className="text-xl">
                  {isRTL() ? 'أرسل لنا رسالة' : 'Send us a Message'}
                </CardTitle>
                <CardDescription>
                  {isRTL() 
                    ? 'املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن'
                    : 'Fill out the form below and we will get back to you as soon as possible'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">
                        {isRTL() ? 'الاسم الكامل' : 'Full Name'} *
                      </Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={isRTL() ? 'أدخل اسمك الكامل' : 'Enter your full name'}
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
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder={isRTL() ? 'your@email.com' : 'your@email.com'}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">
                        {isRTL() ? 'رقم الهاتف' : 'Phone Number'}
                      </Label>
                      <Input
                        id="phone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder={isRTL() ? '+971501234567' : '+971501234567'}
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">
                        {isRTL() ? 'الموضوع' : 'Subject'} *
                      </Label>
                      <Input
                        id="subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder={isRTL() ? 'موضوع الرسالة' : 'Message subject'}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">
                      {isRTL() ? 'الرسالة' : 'Message'} *
                    </Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder={isRTL() ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full gap-3 gradient-primary text-white font-semibold py-4 premium-shadow-lg hover:scale-105 transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting 
                      ? (isRTL() ? 'جاري الإرسال...' : 'Sending...')
                      : (isRTL() ? 'إرسال الرسالة' : 'Send Message')
                    }
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Google Maps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {isRTL() ? 'موقعنا' : 'Our Location'}
                </CardTitle>
                <CardDescription>
                  {isRTL() 
                    ? 'زرنا في مركز شمس التجاري، الشارقة'
                    : 'Visit us at Shams Business Center, Sharjah'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-80 rounded-lg overflow-hidden">
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={isRTL() ? 'موقع دار المعازل' : 'Dar Al Muaazil Location'}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">
                        {isRTL() ? 'مركز شمس التجاري' : 'Shams Business Center'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {isRTL() ? 'الشارقة، الإمارات العربية المتحدة' : 'Sharjah, United Arab Emirates'}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open('https://maps.google.com/?q=Shams+Business+Center+Sharjah+UAE', '_blank')}
                    >
                      {isRTL() ? 'فتح في الخرائط' : 'Open in Maps'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

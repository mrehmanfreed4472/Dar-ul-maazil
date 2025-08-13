'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';

export function FAQSection() {
  const { isRTL } = useTranslation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      category: isRTL() ? "عام" : "General",
      questions: [
        {
          question: isRTL() ? "ما هي خدمات دار المعازل الأساسية؟" : "What are Dar Al Muaazil's main services?",
          answer: isRTL() 
            ? "نقدم خدمات العزل المائي والحراري، وتوريد مواد البناء عالية الجودة، وخدمات التركيب الاحترافية، وال��ستشارات الهندسية المتخصصة في مجال العزل."
            : "We provide waterproofing and thermal insulation services, supply high-quality construction materials, professional installation services, and specialized engineering consultations in the field of insulation."
        },
        {
          question: isRTL() ? "في أي المناطق تقدمون خدماتكم؟" : "In which areas do you provide your services?",
          answer: isRTL() 
            ? "نغطي جميع إمارات دولة الإمارات العربية المتحدة، مع خدمة توصيل سريعة في دبي وأبوظبي والشارقة، وتوصيل منتظم لباقي الإمارات."
            : "We cover all Emirates of the UAE, with fast delivery service in Dubai, Abu Dhabi, and Sharjah, and regular delivery to other Emirates."
        },
        {
          question: isRTL() ? "كم سنة من الخبرة لديكم في هذا المجال؟" : "How many years of experience do you have in this field?",
          answer: isRTL() 
            ? "لدينا أكثر من 15 سنة من الخبرة في مجال مواد البناء والعزل، وقد نفذنا أكثر من 1000 مشروع ناجح في جميع أنحاء الإمارات."
            : "We have over 15 years of experience in construction materials and insulation, having successfully completed over 1000 projects throughout the Emirates."
        }
      ]
    },
    {
      category: isRTL() ? "المنتجات والأسعار" : "Products & Pricing",
      questions: [
        {
          question: isRTL() ? "هل تقدمون ضمان على المنتجات؟" : "Do you provide warranty on products?",
          answer: isRTL() 
            ? "نعم، نقدم ضمان شامل على جميع منتجاتنا وخدماتنا. فترة الضمان تختلف حسب نوع المنتج، وتتراوح من سنة إلى 10 سنوات للعزل المائي."
            : "Yes, we provide comprehensive warranty on all our products and services. Warranty period varies by product type, ranging from 1 year to 10 years for waterproofing."
        },
        {
          question: isRTL() ? "كيف يمكنني الحصول على عرض أسعار؟" : "How can I get a price quote?",
          answer: isRTL() 
            ? "يمكنك الحصول على عرض أسعار مجاني عبر موقعنا الإلكتروني، أو الاتصال بنا مباشرة، أو زيارة معرضنا. نقدم استشارة مجانية وعرض أسعار مفصل خل��ل 24 ساعة."
            : "You can get a free quote through our website, call us directly, or visit our showroom. We provide free consultation and detailed quote within 24 hours."
        },
        {
          question: isRTL() ? "هل تقدمون أسعار خاصة للمقاولين؟" : "Do you offer special prices for contractors?",
          answer: isRTL() 
            ? "نعم، ��دينا برنامج خاص للمقاولين والمطورين مع أسعار تفضيلية وشروط دفع مرنة وخدمة توصيل مجانية للمشاريع الكبيرة."
            : "Yes, we have a special program for contractors and developers with preferential prices, flexible payment terms, and free delivery for large projects."
        }
      ]
    },
    {
      category: isRTL() ? "التركيب والخدمات" : "Installation & Services",
      questions: [
        {
          question: isRTL() ? "هل تقدمون خدمة التركيب؟" : "Do you provide installation service?",
          answer: isRTL() 
            ? "نعم، لدينا فريق من الفنيين المتخصصين والمعتمدين لتركيب جميع أنواع العزل. نضمن جودة التركيب ونقدم ضمان على العمالة."
            : "Yes, we have a team of specialized and certified technicians for installing all types of insulation. We guarantee installation quality and provide warranty on workmanship."
        },
        {
          question: isRTL() ? "كم يستغرق تنفيذ مشروع العزل؟" : "How long does an insulation project take?",
          answer: isRTL() 
            ? "يعتمد ذلك على حجم المشروع ونوع العزل. للمشاريع الصغيرة (فيلا) من 3-5 أيام، وللمشاريع الكبيرة قد تستغرق عدة أسابيع. نقدم جدول زمني مفصل مع كل عرض أسعار."
            : "It depends on project size and insulation type. Small projects (villa) take 3-5 days, large projects may take several weeks. We provide detailed timeline with every quote."
        },
        {
          question: isRTL() ? "هل تقدمون خدمة الصيانة؟" : "Do you provide maintenance service?",
          answer: isRTL() 
            ? "نعم، نقدم خدمات الصيانة الدورية والطارئة لجميع أنواع العزل. لدينا فريق صيانة متخصص متاح 24/7 للحالات الطارئة."
            : "Yes, we provide regular and emergency maintenance services for all types of insulation. We have a specialized maintenance team available 24/7 for emergencies."
        }
      ]
    },
    {
      category: isRTL() ? "التوصيل والدفع" : "Delivery & Payment",
      questions: [
        {
          question: isRTL() ? "ما هي خيارات التوصيل المتاحة؟" : "What delivery options are available?",
          answer: isRTL() 
            ? "نقدم توصيل مجاني داخل دبي لطلبات تزيد عن 1000 درهم، وتوصيل سريع في نفس اليوم للطلبات العاجلة، وتوصيل منتظم لجميع الإمارات خلال 1-3 أيام."
            : "We offer free delivery within Dubai for orders over AED 1000, same-day delivery for urgent orders, and regular delivery to all Emirates within 1-3 days."
        },
        {
          question: isRTL() ? "ما هي طرق الدفع المقبولة؟" : "What payment methods are accepted?",
          answer: isRTL() 
            ? "نقبل جميع طرق الدفع: النقد، البطاقات الائتمانية، التحويل البنكي، والشيكات. للمشاريع الكبيرة نقدم شروط دفع مرنة وتقسيط بدون فوائد."
            : "We accept all payment methods: cash, credit cards, bank transfer, and checks. For large projects, we offer flexible payment terms and interest-free installments."
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: isRTL() ? "اتصل بنا" : "Call Us",
      description: "+971 50 234 2218",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Mail,
      title: isRTL() ? "راسلنا" : "Email Us",
      description: "info@damgcc.com",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageCircle,
      title: isRTL() ? "واتساب" : "WhatsApp",
      description: isRTL() ? "محادثة فورية" : "Instant Chat",
      gradient: "from-green-600 to-green-500"
    },
    {
      icon: Clock,
      title: isRTL() ? "ساعات العمل" : "Working Hours",
      description: "8 AM - 6 PM",
      gradient: "from-purple-500 to-violet-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 text-primary border-primary/20">
            <HelpCircle className="h-4 w-4 mr-2" />
            {isRTL() ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {isRTL() ? "أجوبة على أكثر الأسئلة شيوعاً" : "Answers to Common Questions"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {isRTL() 
              ? "نجيب على الأسئلة الأكثر شيوعاً من عملائنا حول خدماتنا ومنتجاتنا"
              : "We answer the most common questions from our clients about our services and products"
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* FAQ Categories */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {faqs.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{categoryIndex + 1}</span>
                    </div>
                    {category.category}
                  </h3>
                  
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 10 + faqIndex;
                      const isOpen = openFAQ === globalIndex;
                      
                      return (
                        <motion.div
                          key={faqIndex}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: faqIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Card className="glass-card premium-shadow hover:premium-shadow-lg transition-all duration-300">
                            <CardContent className="p-0">
                              <motion.button
                                onClick={() => setOpenFAQ(isOpen ? null : globalIndex)}
                                className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
                                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                              >
                                <div className="flex items-center justify-between">
                                  <h4 className="text-lg font-semibold text-foreground pr-4">
                                    {faq.question}
                                  </h4>
                                  <motion.div
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-shrink-0"
                                  >
                                    <ChevronDown className="h-5 w-5 text-primary" />
                                  </motion.div>
                                </div>
                              </motion.button>
                              
                              <AnimatePresence>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-6 pb-6 pt-0">
                                      <div className="border-t border-border/50 pt-4">
                                        <p className="text-muted-foreground leading-relaxed">
                                          {faq.answer}
                                        </p>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Methods Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="sticky top-8"
            >
              <Card className="glass-card premium-shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6 text-center">
                    {isRTL() ? "تحتاج مساعدة أكثر؟" : "Need More Help?"}
                  </h3>
                  
                  <div className="space-y-4">
                    {contactMethods.map((method, index) => {
                      const Icon = method.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 border border-border/50"
                        >
                          <div className={`w-10 h-10 bg-gradient-to-br ${method.gradient} rounded-lg flex items-center justify-center`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">
                              {method.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {method.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="mt-8 space-y-3">
                    <Button 
                      className="w-full gap-2 premium-gradient text-white"
                      asChild
                    >
                      <Link href="/contact">
                        <MessageCircle className="h-4 w-4" />
                        {isRTL() ? "تواصل معنا" : "Contact Us"}
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full gap-2 border-primary/30 text-primary hover:bg-primary/10"
                      asChild
                    >
                      <Link href="/services">
                        <HelpCircle className="h-4 w-4" />
                        {isRTL() ? "تصفح الخدمات" : "Browse Services"}
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">
                      {isRTL() 
                        ? "نجيب على استفساراتك خلال 30 دقيقة في أوقات العمل"
                        : "We respond to inquiries within 30 minutes during business hours"
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

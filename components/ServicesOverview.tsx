'use client'

import { motion } from 'framer-motion';
import { ArrowRight, Droplets, Thermometer, Layers, Wrench, Shield, Clock, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';

export function ServicesOverview() {
  const { isRTL } = useTranslation();

  const services = [
    {
      icon: Droplets,
      title: isRTL() ? "عزل مائي" : "Waterproofing",
      description: isRTL() 
        ? "حلول عزل مائي متقدمة لحماية المباني من تسرب المياه"
        : "Advanced waterproofing solutions to protect buildings from water damage",
      features: [
        isRTL() ? "عزل الأسطح" : "Roof Waterproofing",
        isRTL() ? "عزل الحمامات" : "Bathroom Sealing",
        isRTL() ? "عزل البدروم" : "Basement Protection"
      ],
      price: "Starting AED 25/sqm",
      gradient: "from-blue-500 to-cyan-500",
      popular: false
    },
    {
      icon: Thermometer,
      title: isRTL() ? "عزل حراري" : "Thermal Insulation",
      description: isRTL() 
        ? "أنظمة عزل حراري موفرة للطاقة وصديقة للبيئة"
        : "Energy-efficient thermal insulation systems for optimal temperature control",
      features: [
        isRTL() ? "عزل الجدران" : "Wall Insulation",
        isRTL() ? "عزل الأسقف" : "Ceiling Insulation",
        isRTL() ? "عزل الأرضيات" : "Floor Insulation"
      ],
      price: "Starting AED 35/sqm",
      gradient: "from-orange-500 to-red-500",
      popular: true
    },
    {
      icon: Layers,
      title: isRTL() ? "مواد بناء" : "Construction Materials",
      description: isRTL() 
        ? "مواد بناء عالية الجودة مستوردة من أفضل المصانع العالمية"
        : "Premium construction materials imported from world-class manufacturers",
      features: [
        isRTL() ? "أسمنت ومواد لاصقة" : "Cement & Adhesives",
        isRTL() ? "مواد عزل متخصصة" : "Specialized Insulation",
        isRTL() ? "أدوات ومعدات" : "Tools & Equipment"
      ],
      price: "Competitive Pricing",
      gradient: "from-green-500 to-emerald-500",
      popular: false
    },
    {
      icon: Wrench,
      title: isRTL() ? "خدمات التركيب" : "Installation Services",
      description: isRTL() 
        ? "فريق من الخبراء المتخصصين في تركيب أنظمة العزل"
        : "Expert team specialized in professional insulation system installation",
      features: [
        isRTL() ? "تركيب احترافي" : "Professional Installation",
        isRTL() ? "ضمان الجودة" : "Quality Guarantee",
        isRTL() ? "خدمة ما بعد البيع" : "After-sales Service"
      ],
      price: "Contact for Quote",
      gradient: "from-purple-500 to-violet-500",
      popular: false
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: isRTL() ? "جودة مضمونة" : "Quality Guaranteed",
      description: isRTL() ? "ضمان شامل على جميع المنتجات والخدمات" : "Comprehensive warranty on all products and services"
    },
    {
      icon: Clock,
      title: isRTL() ? "توصيل س��يع" : "Fast Delivery",
      description: isRTL() ? "توصيل في نفس اليوم داخل دبي" : "Same-day delivery within Dubai"
    },
    {
      icon: Award,
      title: isRTL() ? "خبرة 15 سنة" : "15 Years Experience",
      description: isRTL() ? "خبرة طويلة في مجال مواد البناء" : "Extensive experience in construction materials"
    },
    {
      icon: Users,
      title: isRTL() ? "فريق متخصص" : "Expert Team",
      description: isRTL() ? "مهندسون وفنيون معتمدون" : "Certified engineers and technicians"
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
            {isRTL() ? "خدماتنا المتميزة" : "Our Premium Services"}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {isRTL() ? "حلول شاملة لجميع احتياجاتك" : "Complete Solutions for All Your Needs"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {isRTL() 
              ? "نقدم مجموعة متكاملة من الخدمات والمنتجات عالية الجودة في مجال العزل ومواد البناء"
              : "We provide a comprehensive range of high-quality services and products in insulation and construction materials"
            }
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="relative"
              >
                <Card className="h-full glass-card premium-shadow hover:premium-shadow-xl transition-all duration-300 group overflow-hidden">
                  {service.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                        {isRTL() ? "الأكثر طلباً" : "Most Popular"}
                      </Badge>
                    </div>
                  )}
                  
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <CardHeader className="pb-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-4 mx-auto relative`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-xl blur-lg opacity-30`}
                      ></motion.div>
                    </motion.div>
                    
                    <CardTitle className="text-xl text-center text-foreground">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-center">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                          <span className="text-muted-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="text-center">
                      <div className="text-lg font-bold text-primary mb-4">
                        {service.price}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
                        asChild
                      >
                        <Link href="/services">
                          {isRTL() ? "اعرف أكثر" : "Learn More"}
                          <ArrowRight className={`h-4 w-4 ml-2 ${isRTL() ? 'rotate-180' : ''}`} />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-foreground mb-4">
            {isRTL() ? "لماذا تختار دار المعازل؟" : "Why Choose Dar Al Muaazil?"}
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isRTL() 
              ? "نتميز بالخبرة الطويلة والجودة العالية والخدمة المتميزة التي تضعنا في المقدمة"
              : "We stand out with extensive experience, high quality, and exceptional service that puts us ahead"
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4"
                >
                  <Icon className="h-8 w-8 text-white" />
                </motion.div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 md:p-12 premium-shadow bg-gradient-to-br from-primary/5 to-accent/5">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {isRTL() ? "جاهز لبدء مشروعك؟" : "Ready to Start Your Project?"}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {isRTL() 
                ? "تواصل معنا اليوم للحصول على استشارة مجانية وعرض أسعار مخصص لمشروعك"
                : "Contact us today for a free consultation and customized quote for your project"
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gap-2 premium-gradient text-white font-semibold px-8 hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="/contact">
                  {isRTL() ? "احصل على عرض أسعار" : "Get Quote"}
                  <ArrowRight className={`h-5 w-5 ${isRTL() ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2 border-primary/30 text-primary hover:bg-primary/10 font-semibold px-8"
                asChild
              >
                <Link href="/services">
                  {isRTL() ? "استكشف الخدمات" : "Explore Services"}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

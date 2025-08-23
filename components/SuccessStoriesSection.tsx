'use client'

import { motion } from 'framer-motion';
import { CheckCircle, Users, Building2, Award, TrendingUp, Shield, Target, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';

export function SuccessStoriesSection() {
  const { isRTL } = useTranslation();

  const successStories = [
    {
      title: isRTL() ? "مشروع برج الإمارات" : "Emirates Tower Project",
      description: isRTL() 
        ? "تم تنفيذ أعمال العزل المائي والحراري بأحدث التقنيات العالمية لضمان أعلى مستويات الأداء والجودة"
        : "Waterproofing and thermal insulation executed with cutting-edge international technologies ensuring highest performance and quality",
      results: [
        { metric: isRTL() ? "توفير في الطاقة" : "Energy Savings", value: "35%" },
        { metric: isRTL() ? "مساحة المشروع" : "Project Area", value: "50,000m²" },
        { metric: isRTL() ? "مدة التنفيذ" : "Completion Time", value: isRTL() ? "8 أشهر" : "8 Months" }
      ],
      category: isRTL() ? "مشروع تجاري" : "Commercial Project",
      location: isRTL() ? "دبي، الإمارات" : "Dubai, UAE"
    },
    {
      title: isRTL() ? "مجمع سكني راقي" : "Luxury Residential Complex",
      description: isRTL() 
        ? "مشروع عزل شامل لمجمع سكني متكامل يضم 200 وحدة سكنية بمعايير الاستدامة العالمية"
        : "Comprehensive insulation project for integrated residential complex with 200 units meeting international sustainability standards",
      results: [
        { metric: isRTL() ? "وحدات سكنية" : "Residential Units", value: "200" },
        { metric: isRTL() ? "كفاءة العزل" : "Insulation Efficiency", value: "98%" },
        { metric: isRTL() ? "ضمان الجودة" : "Quality Warranty", value: isRTL() ? "10 سنوات" : "10 Years" }
      ],
      category: isRTL() ? "مشروع سكني" : "Residential Project",
      location: isRTL() ? "أبوظبي، الإمارات" : "Abu Dhabi, UAE"
    },
    {
      title: isRTL() ? "مشروع صناعي متقدم" : "Advanced Industrial Project",
      description: isRTL() 
        ? "حلول عزل متخصصة للمناطق الصناعية مع مقاومة للمواد الكيميائية ودرجات الحرارة العالية"
        : "Specialized insulation solutions for industrial zones with chemical resistance and high temperature tolerance",
      results: [
        { metric: isRTL() ? "مقاومة حرارية" : "Thermal Resistance", value: "400°C" },
        { metric: isRTL() ? "مساحة التغطية" : "Coverage Area", value: "25,000m²" },
        { metric: isRTL() ? "عمر الخدمة" : "Service Life", value: isRTL() ? "25 سنة" : "25 Years" }
      ],
      category: isRTL() ? "مشروع صناعي" : "Industrial Project",
      location: isRTL() ? "الشارقة، الإمارات" : "Sharjah, UAE"
    }
  ];

  const achievements = [
    {
      icon: Building2,
      number: "500+",
      label: isRTL() ? "مشروع منجز" : "Completed Projects",
      description: isRTL() ? "مشاريع متنوعة في كافة أنحاء الإمارات" : "Diverse projects across the UAE"
    },
    {
      icon: Users,
      number: "1000+",
      label: isRTL() ? "عميل راض" : "Satisfied Clients",
      description: isRTL() ? "عملاء يثقون في جودة خدماتنا" : "Clients who trust our quality services"
    },
    {
      icon: Award,
      number: "15+",
      label: isRTL() ? "سنة خبرة" : "Years Experience",
      description: isRTL() ? "خبرة متراكمة في مجال العزل" : "Accumulated expertise in insulation"
    },
    {
      icon: Shield,
      number: "100%",
      label: isRTL() ? "ضمان الجودة" : "Quality Guarantee",
      description: isRTL() ? "التزام كامل بأعلى معايير الجودة" : "Full commitment to highest quality standards"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 text-primary border-primary/20 bg-primary/5">
            <Award className="h-4 w-4 mr-2" />
            {isRTL() ? "قصص نجاحنا" : "Our Success Stories"}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {isRTL() ? "مشاريع ملهمة، نتائج استثنائية" : "Inspiring Projects, Exceptional Results"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {isRTL() 
              ? "نفخر بإنجازاتنا وثقة عملائنا في تنفيذ مشاريع عزل متمي��ة تلبي أعلى المعايير العالمية"
              : "We're proud of our achievements and clients' trust in executing outstanding insulation projects that meet the highest international standards"
            }
          </p>
        </motion.div>

        {/* Main Content Section with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Professional Team Image */}
          <motion.div
            initial={{ opacity: 0, x: isRTL() ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F71579200f3ac4307afa5688963f86641%2Fbdba5de7ae404c3a8cb40cc213a9ceac?format=webp&width=800"
                alt="Professional Construction Team Planning - DAM House of Insulation"
                className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">
                        {isRTL() ? "فريق متخصص ومحترف" : "Specialized Professional Team"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {isRTL() ? "خبراء في العزل والبناء" : "Experts in Insulation & Construction"}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {isRTL() 
                      ? "فريقنا من المهندسين والفنيين المتخصصين يضمن تنفيذ المشاريع بأعلى مستويات الجودة والدقة"
                      : "Our team of specialized engineers and technicians ensures project execution with the highest levels of quality and precision"
                    }
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div
            initial={{ opacity: 0, x: isRTL() ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {isRTL() ? "إنجازات تتحدث عن نفسها" : "Achievements That Speak for Themselves"}
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {isRTL() 
                  ? "أرقام تعكس التزامنا بالتميز والجودة في كل مشروع ننفذه"
                  : "Numbers that reflect our commitment to excellence and quality in every project we execute"
                }
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="text-center p-6 bg-white rounded-xl shadow-lg border border-border/10 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-2">
                      {achievement.number}
                    </div>
                    <div className="font-semibold text-foreground mb-2">
                      {achievement.label}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {achievement.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-6">
              <Link href="/contact">
                <Button size="lg" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold">
                  <Target className="h-5 w-5 mr-2" />
                  {isRTL() ? "ابدأ مشروعك معنا" : "Start Your Project With Us"}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Success Stories Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            {isRTL() ? "مشاريع مميزة من محفظة أعمالنا" : "Featured Projects from Our Portfolio"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <Card className="h-full glass-card premium-shadow hover:premium-shadow-xl transition-all duration-300 group overflow-hidden">
                  <CardContent className="p-0">
                    {/* Card Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                          {story.category}
                        </Badge>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {story.location}
                        </div>
                      </div>
                      
                      <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {story.title}
                      </h4>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {story.description}
                      </p>
                    </div>

                    {/* Results Grid */}
                    <div className="px-6 pb-6">
                      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-4">
                        <h5 className="font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          {isRTL() ? "النتائج المحققة" : "Achieved Results"}
                        </h5>
                        <div className="grid grid-cols-1 gap-3">
                          {story.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {result.metric}
                              </span>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span className="font-bold text-primary text-sm">
                                  {result.value}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card p-8 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {isRTL() ? "هل لديك مشروع جديد؟" : "Do You Have a New Project?"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {isRTL() 
                ? "دعنا نساعدك في تحقيق رؤيتك بحلول عزل متطورة ومبتكرة تضمن أفضل النتائج"
                : "Let us help you achieve your vision with advanced and innovative insulation solutions that guarantee the best results"
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  {isRTL() ? "احصل على استشارة مجانية" : "Get Free Consultation"}
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-primary/10">
                  {isRTL() ? "تصفح خدماتنا" : "Browse Our Services"}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

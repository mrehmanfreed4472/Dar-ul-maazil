import { motion } from 'framer-motion';
import { Star, Quote, User, Building, MapPin, ThumbsUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/use-translation';

export function TestimonialsSection() {
  const { isRTL } = useTranslation();

  const testimonials = [
    {
      name: "Ahmed Al Mansouri",
      title: isRTL() ? "مدير المشاريع" : "Project Manager",
      company: "Emaar Properties",
      location: "Dubai",
      rating: 5,
      review: isRTL() 
        ? "دار المعازل شريك موثوق في جميع مشاريعنا. جودة المواد ممتازة والخدمة احترافية. ننصح بالتعامل معهم بقوة."
        : "Dar Al Muaazil is a trusted partner in all our projects. Excellent material quality and professional service. Highly recommended.",
      project: isRTL() ? "برج الإمارات، دبي" : "Emirates Tower, Dubai",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Sarah Johnson",
      title: isRTL() ? "مهندسة معمارية" : "Architect",
      company: "Johnson & Associates",
      location: "Abu Dhabi",
      rating: 5,
      review: isRTL() 
        ? "خدمة استثنائية ومنتجات عالية الجودة. فريق العمل متخصص ويقدم حلول مبتكرة لكل التحديات."
        : "Exceptional service and high-quality products. The team is specialized and provides innovative solutions for every challenge.",
      project: isRTL() ? "مجمع سكني راقي، أبوظبي" : "Luxury Residential Complex, Abu Dhabi",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Mohammad Hassan",
      title: isRTL() ? "مالك العقار" : "Property Owner",
      company: "Private Villa",
      location: "Sharjah",
      rating: 5,
      review: isRTL() 
        ? "تم تنفيذ مشروع عزل ��يلتي بشكل ممتاز. النتائج فاقت التوقعات والأسعار منافسة جداً."
        : "My villa insulation project was executed excellently. Results exceeded expectations and prices are very competitive.",
      project: isRTL() ? "فيلا خاصة، الشارقة" : "Private Villa, Sharjah",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      title: isRTL() ? "مديرة المشتريات" : "Procurement Manager",
      company: "DAMAC Properties",
      location: "Dubai",
      rating: 5,
      review: isRTL() 
        ? "شراكة استراتيجية مثمرة مع دار المعازل. يوفرون كل ما نحتاجه بجودة عالية وأسعار تنافسية."
        : "Fruitful strategic partnership with Dar Al Muaazil. They provide everything we need with high quality and competitive prices.",
      project: isRTL() ? "مشاريع متعددة، دبي" : "Multiple Projects, Dubai",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Omar Abdullah",
      title: isRTL() ? "مقاول معتمد" : "Licensed Contractor",
      company: "Al Ghurair Construction",
      location: "Dubai",
      rating: 5,
      review: isRTL() 
        ? "أعتمد على دار المعازل في جميع مشاريعي. سرعة في التوصيل وجودة في المنتجات ودعم فني ممتاز."
        : "I rely on Dar Al Muaazil for all my projects. Fast delivery, quality products, and excellent technical support.",
      project: isRTL() ? "مشاريع تجارية وسكنية" : "Commercial & Residential Projects",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Anna Petrov",
      title: isRTL() ? "مهندسة مدنية" : "Civil Engineer",
      company: "Arup Engineering",
      location: "Abu Dhabi",
      rating: 5,
      review: isRTL() 
        ? "فريق محترف جداً ومنتجات تطابق أعلى المعايير الدولية. تجربة تعامل ممتازة في كل المراحل."
        : "Very professional team and products that meet the highest international standards. Excellent experience at all stages.",
      project: isRTL() ? "مشروع بنية تحتية" : "Infrastructure Project",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const overallStats = {
    averageRating: 4.9,
    totalReviews: 247,
    satisfactionRate: 98,
    repeatCustomers: 85
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
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
            {isRTL() ? "آراء عملائنا" : "Client Testimonials"}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {isRTL() ? "ماذا يقول عملاؤنا عنا؟" : "What Our Clients Say About Us"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {isRTL() 
              ? "نفخر بثقة عملائنا وتقديرهم لجودة خدماتنا ومنتجاتنا المتميزة"
              : "We're proud of our clients' trust and appreciation for our exceptional services and products"
            }
          </p>

          {/* Overall Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-4xl mx-auto">
            {[
              { 
                value: overallStats.averageRating, 
                label: isRTL() ? "متوسط التقييم" : "Average Rating",
                suffix: "/5",
                icon: Star
              },
              { 
                value: overallStats.totalReviews, 
                label: isRTL() ? "إجمالي المراجعات" : "Total Reviews",
                suffix: "+",
                icon: Quote
              },
              { 
                value: overallStats.satisfactionRate, 
                label: isRTL() ? "معدل الرضا" : "Satisfaction Rate",
                suffix: "%",
                icon: ThumbsUp
              },
              { 
                value: overallStats.repeatCustomers, 
                label: isRTL() ? "عملاء متكررون" : "Repeat Customers",
                suffix: "%",
                icon: User
              }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full"
            >
              <Card className="h-full glass-card premium-shadow hover:premium-shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4"
                  >
                    <Quote className="h-5 w-5 text-white" />
                  </motion.div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.review}"
                  </p>

                  {/* Project Info */}
                  <div className="mb-4 p-3 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="h-4 w-4 text-primary" />
                      <span className="font-medium text-foreground">
                        {testimonial.project}
                      </span>
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Building className="h-3 w-3" />
                        <span>{testimonial.company}</span>
                        <span>•</span>
                        <MapPin className="h-3 w-3" />
                        <span>{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-900/20 dark:to-blue-900/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {isRTL() ? "عملاء راضون = نجاح مستمر" : "Satisfied Clients = Continued Success"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {isRTL() 
                ? "نحن نؤمن بأن رضا العملاء هو مقياس نجاحنا الحقيقي، ونعمل باستمرار على تحسين خدماتنا"
                : "We believe that customer satisfaction is our true measure of success, and we continuously work to improve our services"
              }
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ThumbsUp className="h-4 w-4 text-green-500" />
              <span>
                {isRTL() 
                  ? `أكثر من ${overallStats.satisfactionRate}% من عملائنا راضون عن خدماتنا`
                  : `Over ${overallStats.satisfactionRate}% of our clients are satisfied with our services`
                }
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

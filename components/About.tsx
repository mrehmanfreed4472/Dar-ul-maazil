'use client'

import { motion } from 'framer-motion';
import { Shield, Award, Users, Truck, Building, Target, Eye, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/use-translation';

export function About() {
  const { t, isRTL } = useTranslation();

  const stats = [
    {
      icon: Users,
      value: isRTL() ? '500+' : '500+',
      label: isRTL() ? 'عميل راضٍ' : 'Satisfied Clients'
    },
    {
      icon: Building,
      value: isRTL() ? '1000+' : '1000+',
      label: isRTL() ? 'مشروع مكتمل' : 'Projects Completed'
    },
    {
      icon: Award,
      value: isRTL() ? '15+' : '15+',
      label: isRTL() ? 'سنة خبرة' : 'Years Experience'
    },
    {
      icon: Truck,
      value: isRTL() ? '7' : '7',
      label: isRTL() ? 'إمارات نخدمها' : 'Emirates Served'
    }
  ];

  const services = [
    {
      icon: Shield,
      title: isRTL() ? 'مواد عزل عالية الجودة' : 'High-Quality Insulation Materials',
      description: isRTL() 
        ? 'نوفر أفضل مواد العزل المقاومة للماء والحرارة والصوت'
        : 'We provide the best waterproof, thermal and acoustic insulation materials'
    },
    {
      icon: Award,
      title: isRTL() ? 'معايير دولية' : 'International Standards',
      description: isRTL() 
        ? 'جميع منتجاتنا تلتزم بالمعايير الدولية ومعايير دولة الإمارات'
        : 'All our products comply with international standards and UAE regulations'
    },
    {
      icon: Users,
      title: isRTL() ? 'خدمة عملاء ممتازة' : 'Excellent Customer Service',
      description: isRTL() 
        ? 'فريق متخصص يقدم الاستشارة والدعم الفني على مدار الساعة'
        : 'Specialized team providing consultation and technical support around the clock'
    },
    {
      icon: Truck,
      title: isRTL() ? 'توصيل سريع' : 'Fast Delivery',
      description: isRTL() 
        ? 'خدمة توصيل سريعة وموثوقة في جميع أنحاء دولة الإمارات'
        : 'Fast and reliable delivery service throughout the UAE'
    }
  ];

  const values = [
    {
      icon: Target,
      title: isRTL() ? 'رؤيتنا' : 'Our Vision',
      description: isRTL() 
        ? 'أن نكون الرائدين في توفير مواد البناء والعزل عالية الجودة في دولة الإمارات والمنطقة'
        : 'To be the leading provider of high-quality construction and insulation materials in the UAE and region'
    },
    {
      icon: Eye,
      title: isRTL() ? 'مهمتنا' : 'Our Mission',
      description: isRTL() 
        ? 'تقديم حلول متكاملة ومبتكرة لصناعة البناء مع الالتزام بأعلى م��ايير الجودة وال��دمة'
        : 'To provide comprehensive and innovative solutions to the construction industry with commitment to highest quality and service standards'
    },
    {
      icon: Heart,
      title: isRTL() ? 'قيمنا' : 'Our Values',
      description: isRTL() 
        ? 'الجودة، النزاهة، الابتكار، والالتزام برضا العملاء هي القيم الأساسية التي نعمل بها'
        : 'Quality, integrity, innovation, and commitment to customer satisfaction are the core values we operate by'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {isRTL() ? 'عن دار المعازل' : 'About Dar Al Muaazil'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {isRTL() 
              ? 'نحن شركة رائدة في توفير مواد البناء والعزل عالي�� الجودة في دولة الإمارات العربية المتحدة، نخدم صناعة البناء بخبرة تزيد عن 15 عامًا'
              : 'We are a leading company in providing high-quality construction and insulation materials in the United Arab Emirates, serving the construction industry with over 15 years of experience'
            }
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center glass-effect hover:premium-shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/30">
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 premium-shadow">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Company Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
        >
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {isRTL() ? 'قصة نجاحنا' : 'Our Success Story'}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {isRTL() 
                  ? 'تأسست ��ار المعازل كشركة متخصصة في توفير مواد العزل ومقاومة الماء عالية ال��ودة للمقاولين والمطورين في دولة الإمارات العربية المتحدة.'
                  : 'Dar Al Muaazil was established as a specialized company in providing high-quality waterproofing and insulation materials to contractors and developers in the United Arab Emirates.'
                }
              </p>
              <p>
                {isRTL() 
                  ? 'بدأنا رحلتنا من الشارقة ونمونا لنصبح واحدة من الموردين الموثوقين في هذا المجال، حيث نخدم العملاء في جميع أنحاء دولة الإمارات.'
                  : 'We started our journey from Sharjah and grew to become one of the trusted suppliers in this field, serving customers throughout the UAE.'
                }
              </p>
              <p>
                {isRTL() 
                  ? 'التزامنا بالجودة والابتكار جعلنا الخيار الأول للمقاولين الذين يبحثون عن مواد بناء موثوقة ومتطورة.'
                  : 'Our commitment to quality and innovation has made us the first choice for contractors looking for reliable and advanced construction materials.'
                }
              </p>
            </div>
            <div className="mt-6">
              <Badge variant="secondary" className="mr-2 mb-2">
                {isRTL() ? 'معتمد من دولة الإمارات' : 'UAE Certified'}
              </Badge>
              <Badge variant="secondary" className="mr-2 mb-2">
                {isRTL() ? 'معايير دولية' : 'International Standards'}
              </Badge>
              <Badge variant="secondary" className="mr-2 mb-2">
                {isRTL() ? 'خدمة 24/7' : '24/7 Service'}
              </Badge>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold text-primary/30">
                  دم
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm font-medium text-foreground">
                  {isRTL() ? 'مقرنا الرئيسي في مركز شمس التجاري، الشارقة' : 'Our headquarters at Shams Business Center, Sharjah'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isRTL() ? 'خدماتنا' : 'Our Services'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL() 
                ? 'نقدم مجموعة شاملة من الخدمات لتلبية جميع احتياجات مشاريع البناء'
                : 'We provide a comprehensive range of services to meet all construction project needs'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full glass-effect hover:premium-shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/30">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center premium-shadow">
                          <IconComponent className="h-7 w-7 text-white" />
                        </div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isRTL() ? 'رؤيتنا ومهمتنا وقيمنا' : 'Our Vision, Mission & Values'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL() 
                ? 'المبادئ التي توجه عملنا وتحدد هويتنا كشركة رائدة في هذا المجال'
                : 'The principles that guide our work and define our identity as a leading company in this field'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full text-center glass-effect hover:premium-shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/30">
                    <CardHeader>
                      <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 premium-shadow">
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {isRTL() ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {isRTL() 
              ? 'تواصل معنا اليوم للحصول على استشارة مجانية وعرض أسعار مخصص لمشروعك'
              : 'Contact us today for a free consultation and customized quote for your project'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
              className="px-10 py-4 gradient-primary text-white rounded-xl font-semibold premium-shadow-lg transition-all duration-300"
            >
              {isRTL() ? 'تواصل معنا' : 'Contact Us'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://wa.me/971502342218', '_blank')}
              className="px-10 py-4 glass-effect border-primary/50 text-primary rounded-xl font-semibold hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white transition-all duration-300"
            >
              {isRTL() ? 'واتساب' : 'WhatsApp'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

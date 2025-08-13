import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Globe, Clock, Shield, Star, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export function StatsSection() {
  const { isRTL } = useTranslation();

  const stats = [
    {
      icon: TrendingUp,
      number: "15+",
      label: isRTL() ? "سنة من الخبرة" : "Years of Excellence",
      description: isRTL() ? "في مجال مواد البناء والعزل" : "In construction materials & insulation",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      number: "500+",
      label: isRTL() ? "عميل راضي" : "Satisfied Clients",
      description: isRTL() ? "يثقون في جودة خدماتنا" : "Trust our quality services",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      number: "1000+",
      label: isRTL() ? "مشروع مكتمل" : "Projects Completed",
      description: isRTL() ? "بأعلى معايير الجودة" : "With highest quality standards",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: Globe,
      number: "7",
      label: isRTL() ? "إمارات نخدمها" : "Emirates Served",
      description: isRTL() ? "تغطية شاملة في الإمارات" : "Complete UAE coverage",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const achievements = [
    {
      icon: Shield,
      title: isRTL() ? "شهادة الآيزو 9001" : "ISO 9001 Certified",
      description: isRTL() ? "معتمدون في أنظمة إدارة الجودة" : "Quality Management System Certified"
    },
    {
      icon: Star,
      title: isRTL() ? "أفضل مورد للعام" : "Supplier of the Year",
      description: isRTL() ? "جائزة أفضل مورد مواد بناء 2023" : "Best Construction Materials Supplier 2023"
    },
    {
      icon: CheckCircle,
      title: isRTL() ? "خدمة عملاء ممتازة" : "Excellent Customer Service",
      description: isRTL() ? "تقييم 4.9/5 من عملائنا" : "4.9/5 Rating from our clients"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            {isRTL() ? "إنجازاتنا بالأرقام" : "Our Achievements in Numbers"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {isRTL() 
              ? "أرقام تت��دث عن التميز والثقة التي يضعها عملاؤنا في خدماتنا وجودة منتجاتنا"
              : "Numbers that speak of excellence and the trust our clients place in our services and product quality"
            }
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -15,
                  scale: 1.08,
                  rotateY: 5,
                  rotateX: 5,
                  boxShadow: "0 25px 50px rgba(34, 197, 94, 0.3)"
                }}
                className="relative group perspective-1000"
              >
                <div className="glass-card p-8 text-center premium-shadow hover:premium-shadow-xl transition-all duration-500 border-gradient relative overflow-hidden">
                  {/* Multiple Animated Backgrounds */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-15`}
                    animate={{
                      background: [
                        `linear-gradient(135deg, ${stat.gradient.includes('blue') ? '#3b82f6' : stat.gradient.includes('green') ? '#10b981' : stat.gradient.includes('purple') ? '#8b5cf6' : '#f97316'}, transparent)`,
                        `linear-gradient(225deg, transparent, ${stat.gradient.includes('blue') ? '#06b6d4' : stat.gradient.includes('green') ? '#34d399' : stat.gradient.includes('purple') ? '#a855f7' : '#ef4444'})`,
                        `linear-gradient(135deg, ${stat.gradient.includes('blue') ? '#3b82f6' : stat.gradient.includes('green') ? '#10b981' : stat.gradient.includes('purple') ? '#8b5cf6' : '#f97316'}, transparent)`
                      ]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Floating particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${stat.gradient} rounded-full opacity-40`}
                      animate={{
                        x: [0, 30 + i * 10, 0],
                        y: [0, -20 - i * 5, 0],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                      }}
                      style={{
                        left: `${20 + i * 20}%`,
                        top: `${30 + i * 10}%`,
                      }}
                    />
                  ))}

                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      rotate: [0, 360, 0],
                      scale: [1, 1.3, 1.2],
                      boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                    }}
                    transition={{
                      duration: 1.2,
                      ease: "easeInOut"
                    }}
                    className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center relative transform-gpu`}
                  >
                    <motion.div
                      animate={{
                        rotateY: [0, 360],
                        rotateX: [0, 15, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <Icon className="h-8 w-8 text-white filter drop-shadow-lg" />
                    </motion.div>

                    {/* Multiple glow effects */}
                    <motion.div
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0.7, 0.3],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-xl blur-lg`}
                    />

                    <motion.div
                      animate={{
                        scale: [1, 1.6, 1],
                        opacity: [0.1, 0.3, 0.1]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-xl blur-xl`}
                    />
                  </motion.div>

                  {/* Number with Counter Animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-foreground mb-2"
                  >
                    {stat.number}
                  </motion.div>

                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-foreground mb-4">
            {isRTL() ? "شهادات الجودة والتقدير" : "Quality Certifications & Recognition"}
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isRTL() 
              ? "حاصلون على أرفع الشهادات والجوائز في مجال صناعة مواد البناء والعزل"
              : "Holding the highest certifications and awards in construction materials and insulation industry"
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-6 premium-shadow hover:premium-shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

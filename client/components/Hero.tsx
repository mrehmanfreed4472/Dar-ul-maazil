import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, Award, Truck, Sparkles, Star, Crown, HardHat, Building, Wrench, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { useState, useEffect } from 'react';

const constructionImages = [
  // Construction workers and insulation work
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80",
  // Building insulation installation
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  // Modern construction site
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  // Construction materials
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80",
  // Building facade work
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80"
];

const laborIcons = [HardHat, Building, Wrench, Settings, Shield];

export function Hero() {
  const { t, isRTL } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  // Rotate images every 2 seconds
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % constructionImages.length);
    }, 2000);

    return () => clearInterval(imageInterval);
  }, []);

  // Rotate labor icons every 1.5 seconds
  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % laborIcons.length);
    }, 1500);

    return () => clearInterval(iconInterval);
  }, []);

  const CurrentLaborIcon = laborIcons[currentIconIndex];

  return (
    <section className="relative bg-gradient-to-br from-primary/8 via-background to-accent/6 overflow-hidden">
      {/* Enhanced background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="container mx-auto px-4 py-20 lg:py-32 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL() ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-effect text-primary px-6 py-3 rounded-full text-sm font-semibold mb-8 premium-shadow"
            >
              <Award className="h-4 w-4 text-accent" />
              {t('hero.standards')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-muted-foreground mb-4 leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-muted-foreground mb-8 leading-relaxed max-w-lg"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="gap-3 gradient-primary text-white font-semibold px-8 py-4 premium-shadow hover:premium-shadow-lg transition-all duration-300 hover:scale-105">
                <Link to="/products">
                  {t('hero.cta')}
                  <ArrowRight className={`h-5 w-5 ${isRTL() ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-3 glass-effect border-primary/30 text-primary hover:bg-primary/10 font-semibold px-8 py-4">
                <Link to="/contact">
                  {t('common.contactUs')}
                </Link>
              </Button>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12"
            >
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {isRTL() ? 'ضمان الجودة' : 'Quality Assured'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isRTL() ? 'معايير عالمية' : 'International Standards'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {isRTL() ? 'توصيل سريع' : 'Fast Delivery'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isRTL() ? 'في جميع أنحاء الإمارات' : 'Across UAE'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {isRTL() ? 'خبرة موثوقة' : 'Trusted Expertise'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isRTL() ? 'سنوات من الخبرة' : 'Years of Experience'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Visual Section with Rotating Images */}
          <motion.div
            initial={{ opacity: 0, x: isRTL() ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden premium-shadow-xl">
              {/* Rotating Background Images */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <img
                    src={constructionImages[currentImageIndex]}
                    alt="DAM Construction & Insulation Work"
                    className="w-full h-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-transparent to-accent/50"></div>
                </motion.div>
              </AnimatePresence>

              {/* Animated Grid Pattern */}
              <div className="absolute inset-0 bg-grid-white/10 bg-grid-16"></div>

              {/* Floating Animated Labor Icons */}
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-10 right-10"
              >
                <Sparkles className="h-6 w-6 text-accent/60" />
              </motion.div>

              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                }}
                className="absolute top-20 left-10"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIconIndex}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CurrentLaborIcon className="h-6 w-6 text-primary/60" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <motion.div
                animate={{
                  x: [-5, 15, -5],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  x: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute bottom-32 right-16"
              >
                <Crown className="h-4 w-4 text-accent/40" />
              </motion.div>

              {/* Central Content with DAM Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-64 h-64 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl"
                ></motion.div>
              </div>

              {/* Company Logo with Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="relative flex flex-col items-center"
                >
                  {/* Logo Image */}
                  <motion.div
                    animate={{
                      y: [-5, 5, -5],
                      rotateY: [0, 360]
                    }}
                    transition={{
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      rotateY: { duration: 8, repeat: Infinity, ease: "linear" }
                    }}
                    className="mb-4"
                  >
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2Fbe317009bb644e719e7cd7d209bca9da%2F8fc69e01b48e40bbb764d940bdc35dba?format=webp&width=800"
                      alt="DAM - The House of Insulation - Dar Al Muaazil LLC"
                      className="h-20 w-auto object-contain drop-shadow-2xl"
                    />
                  </motion.div>

                  {/* Animated Arabic Text */}
                  <motion.div
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.5)",
                        "0 0 30px rgba(147, 51, 234, 0.5)",
                        "0 0 20px rgba(59, 130, 246, 0.5)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="text-6xl lg:text-7xl font-bold bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent"
                  >
                    دم
                  </motion.div>

                  {/* Glow Effect */}
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 text-6xl lg:text-7xl font-bold text-primary/20 blur-lg"
                  >
                    دم
                  </motion.div>
                </motion.div>
              </div>

              {/* Enhanced Bottom Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute bottom-6 left-6 right-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/95 backdrop-blur-lg rounded-xl p-6 premium-shadow-lg border border-white/20"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center"
                    >
                      <Crown className="h-4 w-4 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                      >
                        {isRTL() ? 'دار المعازل - شريككم في التميز' : 'Dar Al Muaazil - Your Partner in Excellence'}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4 }}
                        className="text-xs text-muted-foreground mt-1"
                      >
                        {isRTL() ? 'مواد بناء عالية الجودة وحلول العزل المتميزة' : 'Premium Construction Materials & Advanced Insulation Solutions'}
                      </motion.p>
                    </div>

                    {/* Animated Badge */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          "0 0 10px rgba(34, 197, 94, 0.3)",
                          "0 0 20px rgba(34, 197, 94, 0.5)",
                          "0 0 10px rgba(34, 197, 94, 0.3)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {isRTL() ? 'موثوق' : 'Trusted'}
                    </motion.div>
                  </div>

                  {/* Stats with animated counters */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1.6, duration: 1 }}
                      className="flex items-center gap-1"
                    >
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-green-500 rounded-full"
                      ></motion.div>
                      <span>{isRTL() ? '15+ سنة خبرة' : '15+ Years Experience'}</span>
                    </motion.div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1.8, duration: 1 }}
                      className="flex items-center gap-1"
                    >
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      ></motion.div>
                      <span>{isRTL() ? '500+ مشروع' : '500+ Projects'}</span>
                    </motion.div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 2, duration: 1 }}
                      className="flex items-center gap-1"
                    >
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        className="w-2 h-2 bg-purple-500 rounded-full"
                      ></motion.div>
                      <span>{isRTL() ? 'جودة مضمونة' : 'Quality Assured'}</span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 left-6 w-3 h-3 bg-gradient-to-br from-primary to-accent rounded-full"
              ></motion.div>

              <motion.div
                animate={{
                  opacity: [0.3, 0.9, 0.3],
                  x: [0, 10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-32 left-8 w-2 h-2 bg-gradient-to-br from-accent to-primary rounded-full"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
    </section>
  );
}

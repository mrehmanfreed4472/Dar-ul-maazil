'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Award, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { DAMLogo } from '@/components/DAMLogo';

export function Hero() {
  const { t, isRTL } = useTranslation();

  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-white overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-32 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL() ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-8"
            >
              <Award className="h-4 w-4" />
              {t('hero.standards')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-muted-foreground mb-4 leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground mb-8 leading-relaxed max-w-lg"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/products">
                <Button size="lg" className="gap-3 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 transition-all duration-300">
                  {t('hero.cta')}
                  <ArrowRight className={`h-5 w-5 ${isRTL() ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="gap-3 border-primary/30 text-primary hover:bg-primary/10 font-semibold px-8 py-4">
                  {t('common.contactUs')}
                </Button>
              </Link>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12"
            >
              {[
                { icon: Shield, title: isRTL() ? 'ضمان الجودة' : 'Quality Assured', subtitle: isRTL() ? 'معايير عالمية' : 'International Standards' },
                { icon: Truck, title: isRTL() ? 'توصيل سريع' : 'Fast Delivery', subtitle: isRTL() ? 'في جميع أنحاء الإمارات' : 'Across UAE' },
                { icon: Award, title: isRTL() ? 'خبرة موثوقة' : 'Trusted Expertise', subtitle: isRTL() ? 'سنوات من الخبرة' : 'Years of Experience' }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-3 text-center sm:text-left"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{feature.title}</p>
                      <p className="text-xs text-muted-foreground">{feature.subtitle}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: isRTL() ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Professional construction worker image */}
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F71579200f3ac4307afa5688963f86641%2Fef4ad4348a0c4526a0ec6f9f39e56b20?format=webp&width=800"
                alt="Professional Construction Worker - DAM House of Insulation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-accent/40"></div>

              {/* Company Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <DAMLogo size="xl" className="mb-4 drop-shadow-lg" />
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                    دم
                  </div>
                </motion.div>
              </div>

              {/* Professional info card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute bottom-6 left-6 right-6"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-primary">
                        {isRTL() ? 'دار المعازل - شريككم في التميز' : 'Dar Al Muaazil - Your Partner in Excellence'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isRTL() ? 'مواد بناء عالية الجودة وحلول العزل المتميزة' : 'Premium Construction Materials & Advanced Insulation Solutions'}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      {isRTL() ? 'موثوق' : 'Trusted'}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{isRTL() ? '15+ سنة خبرة' : '15+ Years Experience'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{isRTL() ? '500+ مشروع' : '500+ Projects'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>{isRTL() ? 'جودة مضمونة' : 'Quality Assured'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Shield, Hammer, Droplets, Zap, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { productCategories } from '@/data/products';

const categoryIcons = {
  'primers': Palette,
  'membranes': Droplets,
  'protection-boards': Shield,
  'geotextiles': Layers,
  'sealants': Zap,
  'coatings': Hammer
};

export function FeaturedCategories() {
  const { t, language, isRTL } = useTranslation();

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
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('categories.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('categories.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {productCategories.map((category) => {
            const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || Layers;
            
            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{
                  y: -12,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="group glass-effect hover:premium-shadow-lg transition-all duration-300 border-border/30 hover:border-primary/30 overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-green-500/3 to-emerald-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center premium-shadow relative overflow-hidden"
                        whileHover={{
                          scale: 1.15,
                          boxShadow: "0 10px 30px rgba(34, 197, 94, 0.4)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          animate={{
                            opacity: [0, 0.5, 0],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <IconComponent className="h-7 w-7 text-white" />
                      </motion.div>
                      <div>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {category.name[language]}
                          </CardTitle>
                        </motion.div>
                      </div>
                    </div>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {category.description[language]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-between group-hover:bg-gradient-to-r group-hover:from-primary/10 group-hover:to-accent/10 group-hover:text-primary transition-all duration-300 rounded-xl font-medium relative overflow-hidden"
                        asChild
                      >
                        <Link href={`/products?category=${category.id}`}>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                            animate={{
                              x: ["-100%", "100%"]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatDelay: 2,
                              ease: "easeInOut"
                            }}
                          />
                          <span>{t('categories.viewMore')}</span>
                          <motion.div
                            animate={{
                              x: isRTL() ? [-2, 2, -2] : [2, -2, 2]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <ArrowRight className={`h-4 w-4 transition-transform group-hover:${isRTL() ? '-translate-x-1' : 'translate-x-1'} ${isRTL() ? 'rotate-180' : ''}`} />
                          </motion.div>
                        </Link>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" className="gap-3 gradient-primary text-white font-semibold px-8 py-4 premium-shadow-lg hover:scale-105 transition-all duration-300">
            <Link href="/products">
              {isRTL() ? 'عرض جميع المنتجات' : 'View All Products'}
              <ArrowRight className={`h-5 w-5 ${isRTL() ? 'rotate-180' : ''}`} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

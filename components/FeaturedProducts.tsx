'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/use-translation';
import { featuredProducts } from '@/data/products';

export function FeaturedProducts() {
  const { t, language, getCurrency, isRTL } = useTranslation();

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

  const currency = getCurrency();

  return (
    <section className="py-16 lg:py-24 bg-accent/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {isRTL() ? 'المنتجات المميزة' : 'Featured Products'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRTL() 
              ? 'اكتشف مجموعتنا المختارة من مواد البناء عالية الجودة' 
              : 'Discover our curated selection of premium construction materials'
            }
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="group glass-effect hover:premium-shadow-lg transition-all duration-300 border-border/30 hover:border-primary/30 h-full overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(34, 197, 94, 0.05), rgba(16, 185, 129, 0.05))",
                      "linear-gradient(225deg, rgba(16, 185, 129, 0.05), rgba(34, 197, 94, 0.05))",
                      "linear-gradient(45deg, rgba(34, 197, 94, 0.05), rgba(16, 185, 129, 0.05))"
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="relative overflow-hidden rounded-t-lg">
                  <motion.img
                    src={product.image}
                    alt={product.name[language]}
                    className="w-full h-48 object-cover transition-transform duration-500"
                    whileHover={{
                      scale: 1.1,
                      filter: "brightness(1.1) saturate(1.2)"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <motion.div
                    className="absolute top-4 left-4"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-0 backdrop-blur-sm animate-pulse-glow">
                      {isRTL() ? 'مميز' : 'Featured'}
                    </Badge>
                  </motion.div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {product.name[language]}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                    {product.description[language]}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    {language === 'en' ? (
                      <div>
                        <div className="text-xl font-bold text-primary">
                          ${product.pricing.usd} USD
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {product.pricing.aed} AED
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {product.pricing.aed} AED
                        </div>
                        <div className="text-xs text-muted-foreground">
                          لكل وحدة
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 relative overflow-hidden"
                        asChild
                      >
                        <Link href={`/products/${product.id}`}>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                            animate={{
                              x: ["-100%", "100%"]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3,
                              ease: "easeInOut"
                            }}
                          />
                          {isRTL() ? 'عرض التفاصيل' : 'View Details'}
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        rotateZ: 2
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="sm"
                        className="gap-2 gradient-primary text-white font-medium transition-all duration-300 relative overflow-hidden group"
                        asChild
                      >
                        <Link href="/order">
                          <motion.div
                            className="absolute inset-0 bg-white/20"
                            animate={{
                              opacity: [0, 0.3, 0],
                              scale: [1, 1.2, 1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          <ShoppingCart className="h-4 w-4" />
                          {isRTL() ? 'طلب' : 'Order'}
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline" className="gap-3 glass-effect border-primary/50 text-primary hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white font-semibold px-8 py-4 premium-shadow hover:scale-105 transition-all duration-300">
            <Link href="/products">
              {isRTL() ? 'عرض كامل الكتالوج' : 'View Full Catalog'}
              <ArrowRight className={`h-5 w-5 ${isRTL() ? 'rotate-180' : ''}`} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
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
              <motion.div key={category.id} variants={itemVariants}>
                <Card className="group glass-effect hover:premium-shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/30 hover:border-primary/30 overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 premium-shadow">
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {category.name[language]}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {category.description[language]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button
                      variant="ghost"
                      className="w-full justify-between group-hover:bg-gradient-to-r group-hover:from-primary/10 group-hover:to-accent/10 group-hover:text-primary transition-all duration-300 rounded-xl font-medium"
                      asChild
                    >
                      <Link to={`/products?category=${category.id}`}>
                        {t('categories.viewMore')}
                        <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL() ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                      </Link>
                    </Button>
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
            <Link to="/products">
              {isRTL() ? 'عرض جميع المنتجات' : 'View All Products'}
              <ArrowRight className={`h-5 w-5 ${isRTL() ? 'rotate-180' : ''}`} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

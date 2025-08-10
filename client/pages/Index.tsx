import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { StatsSection } from '@/components/StatsSection';
import { FeaturedCategories } from '@/components/FeaturedCategories';
import { ServicesOverview } from '@/components/ServicesOverview';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FAQSection } from '@/components/FAQSection';

export default function Index() {
  return (
    <Layout>
      <Hero />
      <StatsSection />
      <FeaturedCategories />
      <ServicesOverview />
      <FeaturedProducts />
      <TestimonialsSection />
      <FAQSection />
    </Layout>
  );
}

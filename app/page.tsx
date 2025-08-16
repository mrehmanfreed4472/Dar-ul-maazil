'use client'

export const dynamic = 'force-dynamic'

import { Hero } from '@/components/Hero'
import { StatsSection } from '@/components/StatsSection'
import { FeaturedCategories } from '@/components/FeaturedCategories'
import { ServicesOverview } from '@/components/ServicesOverview'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { FAQSection } from '@/components/FAQSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturedCategories />
      <ServicesOverview />
      <FeaturedProducts />
      <TestimonialsSection />
      <FAQSection />
    </>
  )
}

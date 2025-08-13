'use client'

import { Layout } from '@/components/Layout'
import ProductDetail from '@/components/ProductDetail'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <Layout>
      <ProductDetail />
    </Layout>
  )
}

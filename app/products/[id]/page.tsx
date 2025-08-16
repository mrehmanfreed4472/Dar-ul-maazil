'use client'

import ProductDetail from '@/components/ProductDetail'

export const dynamic = 'force-dynamic'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return <ProductDetail />
}

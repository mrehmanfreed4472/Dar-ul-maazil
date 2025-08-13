'use client'

import { Layout } from '@/components/Layout'
import ServiceDetail from '@/components/ServiceDetail'

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  return (
    <Layout>
      <ServiceDetail />
    </Layout>
  )
}

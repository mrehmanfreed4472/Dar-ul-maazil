'use client'

import ServiceDetail from '@/components/ServiceDetail'
import { Layout } from '@/components/Layout'

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  return (
    <Layout>
      <ServiceDetail />
    </Layout>
  )
}

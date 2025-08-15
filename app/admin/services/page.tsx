'use client'

import { AdminLayout } from '@/components/AdminLayout'
import AdminServices from '@/components/admin/Services'

export const dynamic = 'force-dynamic'

export default function AdminServicesPage() {
  return (
    <AdminLayout>
      <AdminServices />
    </AdminLayout>
  )
}

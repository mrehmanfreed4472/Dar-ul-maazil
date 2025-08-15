'use client'

import { AdminLayout } from '@/components/AdminLayout'
import AdminOrders from '@/components/admin/Orders'

export const dynamic = 'force-dynamic'

export default function AdminOrdersPage() {
  return (
    <AdminLayout>
      <AdminOrders />
    </AdminLayout>
  )
}

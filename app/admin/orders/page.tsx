'use client'

import { AdminLayout } from '@/components/AdminLayout'
import AdminOrders from '@/components/admin/Orders'

export default function AdminOrdersPage() {
  return (
    <AdminLayout>
      <AdminOrders />
    </AdminLayout>
  )
}

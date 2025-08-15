'use client'

import { AdminLayout } from '@/components/AdminLayout'
import AdminProducts from '@/components/admin/Products'

export const dynamic = 'force-dynamic'

export default function AdminProductsPage() {
  return (
    <AdminLayout>
      <AdminProducts />
    </AdminLayout>
  )
}

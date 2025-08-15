'use client'

import { AdminLayout } from '@/components/AdminLayout'
import AdminDashboard from '@/components/admin/Dashboard'

export const dynamic = 'force-dynamic'

export default function AdminPage() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  )
}

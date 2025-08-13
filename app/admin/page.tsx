'use client'

import { AdminLayout } from '@/components/AdminLayout'
import AdminDashboard from '@/components/admin/Dashboard'

export default function AdminPage() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  )
}

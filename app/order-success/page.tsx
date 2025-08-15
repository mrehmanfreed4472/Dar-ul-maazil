'use client'

import { Suspense } from 'react'
import OrderSuccess from '@/components/OrderSuccess'
import { Card, CardContent } from '@/components/ui/card'

function OrderSuccessPageFallback() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <Card className="glass-card premium-shadow max-w-lg mx-auto">
        <CardContent className="p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading order details...</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<OrderSuccessPageFallback />}>
      <OrderSuccess />
    </Suspense>
  )
}

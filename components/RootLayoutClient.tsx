'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/hooks/use-translation'
import { HeaderEnhanced } from '@/components/HeaderEnhanced'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { ChatBot } from '@/components/ChatBot'
import { ErrorBoundary } from '@/components/ErrorBoundary'

interface RootLayoutClientProps {
  children: React.ReactNode
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  const { isRTL } = useTranslation()
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  useEffect(() => {
    // Update document direction on language change
    document.documentElement.dir = isRTL() ? 'rtl' : 'ltr'
    document.documentElement.lang = isRTL() ? 'ar' : 'en'

    // Add responsive class for better mobile handling
    document.body.classList.toggle('rtl-layout', isRTL())
  }, [isRTL])

  // For admin pages, don't render HeaderEnhanced and Footer as AdminLayout handles its own layout
  if (isAdminPage) {
    return (
      <ErrorBoundary>
        <div className={`min-h-screen ${isRTL() ? 'rtl font-arabic' : 'ltr'}`}>
          {children}
        </div>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <div className={`min-h-screen flex flex-col ${isRTL() ? 'rtl font-arabic' : 'ltr'}`}>
        <HeaderEnhanced />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <ChatBot />
      </div>
    </ErrorBoundary>
  )
}

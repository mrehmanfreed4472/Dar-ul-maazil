'use client'

import { useEffect } from 'react'
import { useTranslation } from '@/hooks/use-translation'

interface RootLayoutClientProps {
  children: React.ReactNode
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  const { isRTL } = useTranslation()

  useEffect(() => {
    // Update document direction on language change
    document.documentElement.dir = isRTL() ? 'rtl' : 'ltr'
    document.documentElement.lang = isRTL() ? 'ar' : 'en'
    
    // Add responsive class for better mobile handling
    document.body.classList.toggle('rtl-layout', isRTL())
  }, [isRTL])

  return (
    <div className={`min-h-screen ${isRTL() ? 'rtl font-arabic' : 'ltr'}`}>
      {children}
    </div>
  )
}

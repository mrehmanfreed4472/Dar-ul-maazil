'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, X, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/hooks/use-translation'

interface PersistenceNotificationProps {
  type: 'products' | 'services'
  hasChanges: boolean
  onDismiss?: () => void
}

export function PersistenceNotification({ 
  type, 
  hasChanges, 
  onDismiss 
}: PersistenceNotificationProps) {
  const { isRTL } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [showDismissed, setShowDismissed] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(`admin_notification_dismissed_${type}`)
    if (!dismissed && hasChanges) {
      setIsVisible(true)
    } else if (dismissed) {
      setShowDismissed(true)
    }
  }, [hasChanges, type])

  const handleDismiss = () => {
    setIsVisible(false)
    setShowDismissed(true)
    localStorage.setItem(`admin_notification_dismissed_${type}`, 'true')
    onDismiss?.()
  }

  const handleShowAgain = () => {
    setShowDismissed(false)
    setIsVisible(true)
    localStorage.removeItem(`admin_notification_dismissed_${type}`)
  }

  if (showDismissed && !hasChanges) {
    return null
  }

  if (showDismissed) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        className="mb-4"
      >
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {isRTL() ? 'تم إخفاء إشعار الحفظ' : 'Save notification hidden'}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShowAgain}
            className="text-gray-600 hover:text-gray-800"
          >
            {isRTL() ? 'إظهار مر�� أخرى' : 'Show again'}
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
      {isVisible && hasChanges && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          className="mb-4"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Save className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">
                    {isRTL() ? 'حفظ تلقائي نشط' : 'Auto-Save Active'}
                  </h4>
                  <p className="text-sm text-blue-800 mt-1">
                    {isRTL() 
                      ? `تغييراتك في ${type === 'products' ? 'المنتجات' : 'الخدمات'} محفوظة تلقائياً في المتصفح وستبقى حتى بعد تحديث الصفحة.`
                      : `Your ${type} changes are automatically saved in your browser and will persist after page refresh.`
                    }
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800">
                      {isRTL() ? 'محفوظ محلياً' : 'Saved locally'}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-blue-600 hover:text-blue-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

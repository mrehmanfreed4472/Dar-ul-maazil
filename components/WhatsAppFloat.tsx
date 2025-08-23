'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Phone, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslation } from '@/hooks/use-translation'

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)
  const { t, isRTL } = useTranslation()

  // WhatsApp business number (replace with actual number)
  const whatsappNumber = "+971501234567" // Replace with actual DAM WhatsApp number
  const defaultMessage = isRTL() 
    ? "مرحباً، أرغب في الاستفسار عن منتجاتكم وخدماتكم."
    : "Hello, I would like to inquire about your products and services."

  const openWhatsApp = (customMessage?: string) => {
    const message = encodeURIComponent(customMessage || defaultMessage)
    const url = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${message}`
    window.open(url, '_blank')
    setIsOpen(false)
  }

  const quickMessages = [
    {
      text: isRTL() ? "استفسار عن المنتجات" : "Product Inquiry",
      message: isRTL() 
        ? "مرحباً، أرغب في الاستفسار عن منتجات العزل المتوفرة لديكم."
        : "Hello, I would like to inquire about your insulation products."
    },
    {
      text: isRTL() ? "طلب عرض سعر" : "Request Quote",
      message: isRTL()
        ? "مرحباً، أحتاج عرض سعر لمشروع عزل. يرجى ا��تواصل معي."
        : "Hello, I need a quote for an insulation project. Please contact me."
    },
    {
      text: isRTL() ? "دعم فني" : "Technical Support",
      message: isRTL()
        ? "مرحباً، أحتاج مساعدة فنية بخصوص منتجاتكم."
        : "Hello, I need technical assistance regarding your products."
    }
  ]

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* WhatsApp Chat Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className={`fixed z-50 ${
              isRTL() 
                ? 'bottom-24 left-4 sm:left-6'
                : 'bottom-24 right-4 sm:right-6'
            }`}
          >
            <Card className="w-80 sm:w-96 bg-white/95 backdrop-blur-xl border border-green-200/50 shadow-xl shadow-green-900/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-foreground">
                        {isRTL() ? 'دار المعازل' : 'Dar Al Muaazil'}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {isRTL() ? 'نحن هنا لمساعدتك' : 'We\'re here to help'}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="text-sm text-muted-foreground mb-4">
                  {isRTL() 
                    ? 'اختر نوع الاستفسار أو ابدأ محادثة مباشرة:'
                    : 'Choose inquiry type or start a direct chat:'
                  }
                </div>

                {/* Quick Action Buttons */}
                <div className="space-y-2">
                  {quickMessages.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-between text-left border-green-200/50 hover:bg-green-50 hover:border-green-300/50 group"
                        onClick={() => openWhatsApp(item.message)}
                      >
                        <span className="text-sm">{item.text}</span>
                        <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </Button>
                    </motion.div>
                  ))}
                </div>

                {/* Direct Chat Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-2"
                >
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium gap-2"
                    onClick={() => openWhatsApp()}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {isRTL() ? 'بدء المحادثة' : 'Start Chat'}
                  </Button>
                </motion.div>

                <div className="text-xs text-center text-muted-foreground pt-2">
                  {isRTL() 
                    ? 'سيتم فتح واتساب في نافذة جديدة'
                    : 'WhatsApp will open in a new window'
                  }
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.div
        className={`fixed z-50 ${
          isRTL() 
            ? 'bottom-6 left-4 sm:left-6'
            : 'bottom-6 right-4 sm:right-6'
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 1
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            boxShadow: [
              "0 0 0 0 rgba(34, 197, 94, 0.4)",
              "0 0 0 10px rgba(34, 197, 94, 0)",
              "0 0 0 20px rgba(34, 197, 94, 0)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="relative"
        >
          <Button
            size="lg"
            className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/25 border-0 group"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <MessageCircle className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
              )}
            </motion.div>
          </Button>

          {/* Online indicator */}
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Tooltip */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: isRTL() ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`absolute top-1/2 -translate-y-1/2 ${
              isRTL() 
                ? 'right-16 text-right'
                : 'left-16 text-left'
            }`}
          >
            <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              {isRTL() ? 'تحدث معنا' : 'Chat with us'}
              <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45 ${
                isRTL() ? '-left-1' : '-right-1'
              }`} />
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  )
}

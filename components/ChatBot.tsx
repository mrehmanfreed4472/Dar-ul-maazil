'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  Package,
  Crown,
  Calculator,
  HelpCircle,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from '@/hooks/use-translation'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  quickReplies?: string[]
  actionButtons?: Array<{
    label: string
    action: string
    icon?: any
  }>
}

interface ChatBotResponse {
  message: string
  quickReplies?: string[]
  actionButtons?: Array<{
    label: string
    action: string
    icon?: any
  }>
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { isRTL } = useTranslation()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message when chat opens
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: isRTL() 
          ? 'مرحباً بك في دار المعازل! 👋 أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟'
          : 'Welcome to Dar Al Muaazil! 👋 I\'m your AI assistant. How can I help you today?',
        timestamp: new Date(),
        quickReplies: isRTL() 
          ? ['منتجاتنا', 'خدماتنا', 'طلب عرض سعر', 'معلومات التواصل']
          : ['Our Products', 'Our Services', 'Request Quote', 'Contact Info']
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, isRTL])

  const generateResponse = (userMessage: string): ChatBotResponse => {
    const message = userMessage.toLowerCase()
    
    // Arabic keywords
    const arabicKeywords = {
      products: ['منتجات', 'منتج', 'مواد', 'عزل', 'مقاوم', 'حراري', 'مائي'],
      services: ['خدمات', 'خدمة', 'تركيب', 'استشارة', 'صيانة', 'تصميم'],
      quote: ['سعر', 'عرض', 'تكلفة', 'أسعار', 'مقايسة', 'عروض'],
      contact: ['تواصل', 'اتصال', 'عنوان', 'موقع', 'هاتف', 'إيميل']
    }
    
    // English keywords
    const englishKeywords = {
      products: ['product', 'material', 'insulation', 'waterproof', 'thermal', 'building'],
      services: ['service', 'installation', 'consultation', 'maintenance', 'design', 'support'],
      quote: ['quote', 'price', 'cost', 'pricing', 'estimate', 'quotation'],
      contact: ['contact', 'phone', 'email', 'address', 'location', 'reach']
    }

    // Check for greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('مرحبا') || message.includes('السلام')) {
      return {
        message: isRTL() 
          ? 'مرحباً بك! أنا هنا لمساعدتك في أي استفسارات حول منتجاتنا وخدماتنا. 😊'
          : 'Hello! I\'m here to help you with any questions about our products and services. 😊',
        quickReplies: isRTL() 
          ? ['عرض المنتجات', 'الخدمات المتاحة', 'طلب استشارة']
          : ['View Products', 'Available Services', 'Request Consultation']
      }
    }

    // Check for products
    const productMatch = [...arabicKeywords.products, ...englishKeywords.products].some(keyword => 
      message.includes(keyword)
    )
    if (productMatch) {
      return {
        message: isRTL() 
          ? 'نحن نقدم مجموعة واسعة من منتجات العزل والبناء:\n\n🏗️ مواد العزل الحراري\n💧 أنظمة العزل المائي\n🔧 مواد البناء المتخصصة\n⚡ حلول كفاءة الطاقة\n\nأي نوع من المنتجات تهمك؟'
          : 'We offer a comprehensive range of insulation and construction products:\n\n🏗️ Thermal Insulation Materials\n💧 Waterproofing Systems\n🔧 Specialized Building Materials\n⚡ Energy Efficiency Solutions\n\nWhich type of products are you interested in?',
        actionButtons: [
          { label: isRTL() ? 'تصفح المنتجات' : 'Browse Products', action: 'products', icon: Package },
          { label: isRTL() ? 'طلب كتالوج' : 'Request Catalog', action: 'catalog', icon: ExternalLink }
        ]
      }
    }

    // Check for services
    const serviceMatch = [...arabicKeywords.services, ...englishKeywords.services].some(keyword => 
      message.includes(keyword)
    )
    if (serviceMatch) {
      return {
        message: isRTL() 
          ? 'نقدم خدمات متكاملة في مجال العزل والبناء:\n\n👷‍♂️ التركيب المهني\n📋 الاستشارات الفنية\n🔍 التقييم والفحص\n🛠️ الصيانة والدعم\n📐 التصميم والتخطيط\n\nما الخدمة التي تحتاجها؟'
          : 'We provide comprehensive insulation and construction services:\n\n👷‍♂️ Professional Installation\n📋 Technical Consultation\n🔍 Assessment & Inspection\n🛠️ Maintenance & Support\n📐 Design & Planning\n\nWhich service do you need?',
        actionButtons: [
          { label: isRTL() ? 'عرض الخدمات' : 'View Services', action: 'services', icon: Crown },
          { label: isRTL() ? 'حجز استشارة' : 'Book Consultation', action: 'consultation', icon: Phone }
        ]
      }
    }

    // Check for quote/pricing
    const quoteMatch = [...arabicKeywords.quote, ...englishKeywords.quote].some(keyword => 
      message.includes(keyword)
    )
    if (quoteMatch) {
      return {
        message: isRTL() 
          ? 'نقدم عروض أسعار مجانية ومخصصة حسب احتياجاتك! 💰\n\nلتقديم عرض سعر دقيق، نحتاج معرفة:\n• ن��ع المشروع\n• المساحة التقريبية\n• نوع العزل المطلوب\n• الموقع\n\nهل تريد التواصل معنا مباشرة؟'
          : 'We provide free customized quotes tailored to your needs! 💰\n\nTo provide an accurate quote, we need to know:\n• Project type\n• Approximate area\n• Required insulation type\n• Location\n\nWould you like to contact us directly?',
        actionButtons: [
          { label: isRTL() ? 'طلب عرض سعر' : 'Request Quote', action: 'quote', icon: Calculator },
          { label: isRTL() ? 'اتصل بنا' : 'Call Us', action: 'call', icon: Phone }
        ]
      }
    }

    // Check for contact
    const contactMatch = [...arabicKeywords.contact, ...englishKeywords.contact].some(keyword => 
      message.includes(keyword)
    )
    if (contactMatch) {
      return {
        message: isRTL() 
          ? 'يمكنك التواصل معنا بعدة طرق:\n\n📞 الهاتف: +971 50 123 4567\n📧 البريد: info@damalmuaazil.com\n📍 العنوان: دبي، الإمارات العربية المتحدة\n⏰ ساعات العمل: 8:00 - 18:00\n\nنحن في خدمتك دائماً!'
          : 'You can reach us through multiple channels:\n\n📞 Phone: +971 50 123 4567\n📧 Email: info@damalmuaazil.com\n📍 Address: Dubai, United Arab Emirates\n⏰ Working Hours: 8:00 AM - 6:00 PM\n\nWe\'re always here to help!',
        actionButtons: [
          { label: isRTL() ? 'اتصال مباشر' : 'Direct Call', action: 'call', icon: Phone },
          { label: isRTL() ? 'إرسال إيميل' : 'Send Email', action: 'email', icon: Mail },
          { label: isRTL() ? 'عرض الموقع' : 'View Location', action: 'location', icon: MapPin }
        ]
      }
    }

    // Default response
    return {
      message: isRTL() 
        ? 'شكراً لك على سؤالك! 🤔 دعني أوجهك لأهم الخدمات التي يمكنني مساعدتك بها:'
        : 'Thank you for your question! 🤔 Let me guide you to the main services I can help you with:',
      quickReplies: isRTL() 
        ? ['المنتجات', 'الخدمات', 'عرض الأسعار', 'التواصل', 'مساعدة أخرى']
        : ['Products', 'Services', 'Pricing', 'Contact', 'Other Help']
    }
  }

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputValue.trim()
    if (!text) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const response = generateResponse(text)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response.message,
        timestamp: new Date(),
        quickReplies: response.quickReplies,
        actionButtons: response.actionButtons
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // Random delay for realism
  }

  const handleAction = (action: string) => {
    switch (action) {
      case 'products':
        window.location.href = '/products'
        break
      case 'services':
        window.location.href = '/services'
        break
      case 'quote':
      case 'consultation':
        window.location.href = '/contact'
        break
      case 'call':
        window.location.href = 'tel:+971501234567'
        break
      case 'email':
        window.location.href = 'mailto:info@damalmuaazil.com'
        break
      case 'location':
        window.open('https://maps.google.com/?q=Dubai,UAE', '_blank')
        break
      case 'catalog':
        handleSendMessage(isRTL() ? 'أريد ��تالوج المنتجات' : 'I want the product catalog')
        break
      default:
        break
    }
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Chat Window */}
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
            } w-80 sm:w-96 h-[500px]`}
          >
            <Card className="h-full bg-white/95 backdrop-blur-xl border border-blue-200/50 shadow-xl shadow-blue-900/20 flex flex-col">
              {/* Header */}
              <CardHeader className="pb-3 border-b border-border/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {isRTL() ? 'المساعد الذكي' : 'AI Assistant'}
                      </h3>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-muted-foreground">
                          {isRTL() ? 'متاح الآن' : 'Online now'}
                        </span>
                      </div>
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

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'bot' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'order-last' : ''}`}>
                      <div className={`p-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {message.content}
                        </p>
                      </div>
                      
                      {/* Quick Replies */}
                      {message.quickReplies && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.quickReplies.map((reply, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-7"
                              onClick={() => handleSendMessage(reply)}
                            >
                              {reply}
                            </Button>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      {message.actionButtons && (
                        <div className="space-y-2 mt-3">
                          {message.actionButtons.map((button, index) => {
                            const Icon = button.icon
                            return (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="w-full justify-start text-xs h-8"
                                onClick={() => handleAction(button.action)}
                              >
                                {Icon && <Icon className="h-3 w-3 mr-2" />}
                                {button.label}
                              </Button>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl">
                      <div className="flex gap-1">
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t border-border/20">
                <div className="flex gap-2">
                  <Input
                    placeholder={isRTL() ? 'اكتب رسالتك...' : 'Type your message...'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <motion.div
        className={`fixed z-50 ${
          isRTL() 
            ? 'bottom-6 left-20 sm:left-24'
            : 'bottom-6 right-20 sm:right-24'
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 1.5
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0.4)",
              "0 0 0 10px rgba(59, 130, 246, 0)",
              "0 0 0 20px rgba(59, 130, 246, 0)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 2
          }}
        >
          <Button
            size="lg"
            className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/25 border-0 group"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Bot className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
              )}
            </motion.div>
          </Button>
        </motion.div>

        {/* AI Badge */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
            className="absolute -top-2 -right-2"
          >
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
              AI
            </Badge>
          </motion.div>
        )}
      </motion.div>
    </>
  )
}

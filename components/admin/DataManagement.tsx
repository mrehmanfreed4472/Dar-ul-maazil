'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Database, 
  RefreshCw, 
  Download, 
  Upload, 
  AlertTriangle, 
  CheckCircle,
  Save,
  Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAdmin } from '@/contexts/AdminContext'
import { useToast } from '@/hooks/use-toast'
import { useTranslation } from '@/hooks/use-translation'
import { getAllProducts } from '@/data/products'
import { getAllServices } from '@/data/services'

export function DataManagement() {
  const { products, services, resetData, exportData, importData } = useAdmin()
  const { toast } = useToast()
  const { isRTL } = useTranslation()
  const [isResetting, setIsResetting] = useState(false)

  // Check if there are any differences from the original data
  const originalProducts = getAllProducts()
  const originalServices = getAllServices()
  
  const hasProductChanges = JSON.stringify(products) !== JSON.stringify(originalProducts)
  const hasServiceChanges = JSON.stringify(services) !== JSON.stringify(originalServices)

  const handleResetData = async (type: 'products' | 'services') => {
    setIsResetting(true)
    try {
      resetData(type)
      toast({
        title: isRTL() ? 'تم إعادة التعيين' : 'Data Reset',
        description: isRTL() 
          ? `تم إعادة تعيين بيانات ${type === 'products' ? 'المنتجات' : 'الخدمات'} إلى القيم الافتراضية`
          : `${type === 'products' ? 'Products' : 'Services'} data has been reset to defaults`,
      })
    } catch (error) {
      toast({
        title: isRTL() ? 'خطأ' : 'Error',
        description: isRTL() ? 'فشل في إعادة تعيين البيانات' : 'Failed to reset data',
        variant: 'destructive',
      })
    } finally {
      setIsResetting(false)
    }
  }

  const handleExportData = (type: 'products' | 'services') => {
    try {
      exportData(type)
      toast({
        title: isRTL() ? 'تم التصدير' : 'Data Exported',
        description: isRTL() 
          ? `تم تصدير بيانات ${type === 'products' ? 'المنتجات' : 'الخدمات'} بنجاح`
          : `${type === 'products' ? 'Products' : 'Services'} data exported successfully`,
      })
    } catch (error) {
      toast({
        title: isRTL() ? 'خطأ' : 'Error',
        description: isRTL() ? 'فشل في تصدير البيانات' : 'Failed to export data',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {isRTL() ? 'إدارة البيانات' : 'Data Management'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL() 
              ? 'إدارة بيانات المنتجات والخدمات المحفوظة محلياً'
              : 'Manage locally stored product and service data'
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Products Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                {isRTL() ? 'بيانات المنتجات' : 'Products Data'}
                {hasProductChanges && (
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {isRTL() ? 'تم التعديل' : 'Modified'}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {isRTL() 
                  ? `إجمالي ${products.length} منتج محفوظ محلياً`
                  : `${products.length} products stored locally`
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {hasProductChanges && (
                <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-800">
                    {isRTL() 
                      ? 'لديك تغييرات غير محفوظة في المنتجات'
                      : 'You have unsaved product changes'
                    }
                  </span>
                </div>
              )}
              
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => handleExportData('products')}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isRTL() ? 'تصدير البيانات' : 'Export Data'}
                </Button>
                
                <Button
                  onClick={() => handleResetData('products')}
                  variant="destructive"
                  className="w-full"
                  disabled={isResetting || !hasProductChanges}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isResetting ? 'animate-spin' : ''}`} />
                  {isRTL() ? 'إعادة تعيين للافتراضي' : 'Reset to Defaults'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Services Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                {isRTL() ? 'بيانات الخدمات' : 'Services Data'}
                {hasServiceChanges && (
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {isRTL() ? 'تم التعديل' : 'Modified'}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {isRTL() 
                  ? `إجمالي ${services.length} خدمة محفوظة محلياً`
                  : `${services.length} services stored locally`
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {hasServiceChanges && (
                <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-800">
                    {isRTL() 
                      ? 'لديك تغييرات غير محفوظة في الخدمات'
                      : 'You have unsaved service changes'
                    }
                  </span>
                </div>
              )}
              
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => handleExportData('services')}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isRTL() ? 'تصدير البيانات' : 'Export Data'}
                </Button>
                
                <Button
                  onClick={() => handleResetData('services')}
                  variant="destructive"
                  className="w-full"
                  disabled={isResetting || !hasServiceChanges}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isResetting ? 'animate-spin' : ''}`} />
                  {isRTL() ? 'إعادة تعيين للافتراضي' : 'Reset to Defaults'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Status Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              {isRTL() ? 'حالة البيانات' : 'Data Status'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                {hasProductChanges ? (
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <div>
                  <p className="font-medium">
                    {isRTL() ? 'المنتجات' : 'Products'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {hasProductChanges 
                      ? (isRTL() ? 'تم التعديل' : 'Modified')
                      : (isRTL() ? 'متزامن' : 'Synchronized')
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {hasServiceChanges ? (
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <div>
                  <p className="font-medium">
                    {isRTL() ? 'الخدمات' : 'Services'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {hasServiceChanges 
                      ? (isRTL() ? 'تم التعديل' : 'Modified')
                      : (isRTL() ? 'متزامن' : 'Synchronized')
                    }
                  </p>
                </div>
              </div>
            </div>
            
            {(hasProductChanges || hasServiceChanges) && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  {isRTL() 
                    ? 'ملاحظة: التغييرات محفوظة محلياً وستبقى حتى بعد تحديث الصفحة. استخدم "إعادة تعيين للافتراضي" للعودة للبيانات الأصلية.'
                    : 'Note: Changes are saved locally and will persist after page refresh. Use "Reset to Defaults" to revert to original data.'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

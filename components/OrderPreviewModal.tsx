import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, MessageCircle, X } from 'lucide-react';
import { OrderSummaryPDF } from '@/components/OrderSummaryPDF';
import { useTranslation } from '@/hooks/use-translation';

interface OrderItem {
  productId: string;
  productName: string;
  priceUsd: number;
  priceAed: number;
  quantity: number;
  laborServices: boolean;
  selectedSize?: string;
}

interface OrderForm {
  customerName: string;
  whatsappNumber: string;
  email: string;
  company: string;
  projectLocation: string;
  items: OrderItem[];
  contactMethod: 'whatsapp' | 'email' | 'both';
  urgency: 'standard' | 'urgent' | 'rush';
  deliveryDate: string;
  notes: string;
}

interface OrderPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderForm: OrderForm;
  orderNumber: string;
  onDownloadPDF: () => void;
  onSendWhatsApp: () => void;
  isSubmitting: boolean;
}

export function OrderPreviewModal({
  isOpen,
  onClose,
  orderForm,
  orderNumber,
  onDownloadPDF,
  onSendWhatsApp,
  isSubmitting
}: OrderPreviewModalProps) {
  const { isRTL } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>{isRTL() ? 'معاينة الطلب' : 'Order Preview'}</span>
          </DialogTitle>
          <DialogDescription>
            {isRTL() 
              ? 'راجع تفاصيل طلبك قبل الإرسال'
              : 'Review your order details before submitting'
            }
          </DialogDescription>
        </DialogHeader>

        {/* PDF Preview */}
        <div className="border rounded-lg overflow-hidden bg-white">
          <OrderSummaryPDF 
            orderForm={orderForm}
            orderNumber={orderNumber}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={onDownloadPDF}
            variant="outline"
            className="gap-2 flex-1"
          >
            <Download className="h-4 w-4" />
            {isRTL() ? 'تحميل PDF' : 'Download PDF'}
          </Button>
          
          <Button
            onClick={onSendWhatsApp}
            disabled={isSubmitting}
            className="gap-2 flex-1 gradient-primary text-white"
          >
            <MessageCircle className="h-4 w-4" />
            {isSubmitting 
              ? (isRTL() ? 'جاري الإرسال...' : 'Sending...')
              : (isRTL() ? 'إرسال عبر واتساب' : 'Send via WhatsApp')
            }
          </Button>
          
          <Button
            onClick={onClose}
            variant="ghost"
            className="gap-2"
          >
            <X className="h-4 w-4" />
            {isRTL() ? 'إغلاق' : 'Close'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

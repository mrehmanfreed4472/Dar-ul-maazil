import React from 'react';
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

interface OrderSummaryPDFProps {
  orderForm: OrderForm;
  orderNumber: string;
}

export const OrderSummaryPDF = React.forwardRef<HTMLDivElement, OrderSummaryPDFProps>(
  ({ orderForm, orderNumber }, ref) => {
    const { language, isRTL } = useTranslation();

    const calculateTotalUsd = () => {
      return orderForm.items.reduce((total, item) => {
        const itemTotal = item.priceUsd * item.quantity;
        const laborCost = item.laborServices ? (item.priceUsd * 0.3 * item.quantity) : 0;
        return total + itemTotal + laborCost;
      }, 0);
    };

    const calculateTotalAed = () => {
      return orderForm.items.reduce((total, item) => {
        const itemTotal = item.priceAed * item.quantity;
        const laborCost = item.laborServices ? (item.priceAed * 0.3 * item.quantity) : 0;
        return total + itemTotal + laborCost;
      }, 0);
    };

    const totalUsd = calculateTotalUsd();
    const totalAed = calculateTotalAed();
    const currentDate = new Date().toLocaleDateString(language === 'ar' ? 'ar-AE' : 'en-US');

    return (
      <div 
        ref={ref} 
        className="bg-white p-8 max-w-4xl mx-auto text-black font-sans"
        style={{ 
          fontFamily: language === 'ar' ? 'Arial, sans-serif' : 'Arial, sans-serif',
          direction: isRTL() ? 'rtl' : 'ltr'
        }}
      >
        {/* Header */}
        <div className="border-b-2 border-teal-600 pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F1f92479787d647a5873d822973f760c7%2F4551cf54f8504ccaa05505322826a1fb?format=webp&width=300"
                  alt="DAM - The House of Insulation"
                  className="h-16 w-auto object-contain"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">DAM - The House of Insulation</h1>
                  <p className="text-gray-600">{isRTL() ? 'دار المعازل ذ.م.م' : 'Dar Al Muaazil LLC'}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                <p>📍 Shams Business Center, Sharjah, UAE</p>
                <p>📞 +971502342218 | ✉ info@damgcc.com</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-teal-600 mb-2">
                {isRTL() ? 'طلب شراء' : 'PURCHASE ORDER'}
              </h2>
              <p className="text-gray-600">#{orderNumber}</p>
              <p className="text-gray-600">{currentDate}</p>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
              {isRTL() ? 'معلومات العميل' : 'Customer Information'}
            </h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">{isRTL() ? 'الاسم:' : 'Name:'}</span> {orderForm.customerName}</p>
              {orderForm.company && (
                <p><span className="font-medium">{isRTL() ? 'الشركة:' : 'Company:'}</span> {orderForm.company}</p>
              )}
              <p><span className="font-medium">{isRTL() ? 'البريد الإلكتروني:' : 'Email:'}</span> {orderForm.email}</p>
              <p><span className="font-medium">{isRTL() ? 'رقم الواتساب:' : 'WhatsApp:'}</span> {orderForm.whatsappNumber}</p>
              {orderForm.projectLocation && (
                <p><span className="font-medium">{isRTL() ? 'موقع المشروع:' : 'Project Location:'}</span> {orderForm.projectLocation}</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
              {isRTL() ? 'تفاصيل الطلب' : 'Order Details'}
            </h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">{isRTL() ? 'طريقة التواصل:' : 'Contact Method:'}</span> {orderForm.contactMethod}</p>
              <p>
                <span className="font-medium">{isRTL() ? 'الأولوية:' : 'Urgency:'}</span> 
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  orderForm.urgency === 'rush' ? 'bg-red-100 text-red-800' :
                  orderForm.urgency === 'urgent' ? 'bg-orange-100 text-orange-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {orderForm.urgency.charAt(0).toUpperCase() + orderForm.urgency.slice(1)}
                </span>
              </p>
              {orderForm.deliveryDate && (
                <p><span className="font-medium">{isRTL() ? 'تاريخ التسليم:' : 'Delivery Date:'}</span> {orderForm.deliveryDate}</p>
              )}
            </div>
          </div>
        </div>

        {/* Order Items Table */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            {isRTL() ? 'المنتجات المطلوبة' : 'Order Items'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-800">
                    {isRTL() ? 'المنتج' : 'Product'}
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-800">
                    {isRTL() ? 'الحجم' : 'Size'}
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-800">
                    {isRTL() ? 'الكمية' : 'Qty'}
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-800">
                    {isRTL() ? 'السعر (USD)' : 'Price (USD)'}
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-800">
                    {isRTL() ? 'السعر (AED)' : 'Price (AED)'}
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-800">
                    {isRTL() ? 'عمالة' : 'Labor'}
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-800">
                    {isRTL() ? 'المجموع (USD)' : 'Total (USD)'}
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-800">
                    {isRTL() ? 'المجموع (AED)' : 'Total (AED)'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderForm.items.map((item, index) => {
                  const itemTotalUsd = item.priceUsd * item.quantity + (item.laborServices ? item.priceUsd * 0.3 * item.quantity : 0);
                  const itemTotalAed = item.priceAed * item.quantity + (item.laborServices ? item.priceAed * 0.3 * item.quantity : 0);
                  
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 px-3 py-2">{item.productName}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">{item.selectedSize || '-'}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">{item.quantity}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">${item.priceUsd}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">{item.priceAed} AED</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        {item.laborServices ? (isRTL() ? 'نعم' : 'Yes') : (isRTL() ? 'لا' : 'No')}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center font-medium">${itemTotalUsd.toFixed(2)}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center font-medium">{itemTotalAed.toFixed(2)} AED</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Summary */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {isRTL() ? 'ملخص الطلب' : 'Order Summary'}
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between py-2">
                <span>{isRTL() ? 'المجموع الكلي (USD):' : 'Grand Total (USD):'}</span>
                <span className="font-bold text-teal-600 text-xl">${totalUsd.toFixed(2)}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between py-2">
                <span>{isRTL() ? 'المجموع الكلي (AED):' : 'Grand Total (AED):'}</span>
                <span className="font-bold text-teal-600 text-xl">{totalAed.toFixed(2)} AED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {orderForm.notes && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
              {isRTL() ? 'ملاحظات' : 'Notes'}
            </h3>
            <p className="text-gray-700 text-sm bg-gray-50 p-4 rounded">{orderForm.notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
          <p className="mb-2">
            {isRTL() 
              ? 'شكراً لاختياركم دار المعازل. سنتواصل معكم قريباً لتأكيد الطلب.'
              : 'Thank you for choosing Dar Al Muaazil. We will contact you shortly to confirm your order.'
            }
          </p>
          <p>
            {isRTL() 
              ? 'للاستفسارات: +971502342218 | info@damgcc.com'
              : 'For inquiries: +971502342218 | info@damgcc.com'
            }
          </p>
        </div>
      </div>
    );
  }
);

OrderSummaryPDF.displayName = 'OrderSummaryPDF';

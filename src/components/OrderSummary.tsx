
import { useCartStore } from '@/lib/store';

interface OrderSummaryProps {
  showCheckoutButton?: boolean;
}

const OrderSummary = ({ showCheckoutButton = false }: OrderSummaryProps) => {
  const { items, subtotal } = useCartStore();
  
  const subtotalAmount = subtotal();
  const shippingCost = subtotalAmount > 0 ? 5.99 : 0;
  const taxRate = 0.07; // 7% tax
  const taxAmount = subtotalAmount * taxRate;
  const totalAmount = subtotalAmount + shippingCost + taxAmount;

  return (
    <div className="bg-gray-50 rounded-lg p-6 border">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({items.length} items)</span>
          <span>${subtotalAmount.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          {subtotalAmount > 0 ? (
            <span>${shippingCost.toFixed(2)}</span>
          ) : (
            <span className="text-gray-500">--</span>
          )}
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (7%)</span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>
        
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {showCheckoutButton && (
        <a 
          href="/checkout" 
          className="btn-primary w-full flex justify-center"
        >
          Proceed to Checkout
        </a>
      )}
    </div>
  );
};

export default OrderSummary;

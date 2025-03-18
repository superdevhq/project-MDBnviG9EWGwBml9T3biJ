
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import CartItem from '@/components/CartItem';
import OrderSummary from '@/components/OrderSummary';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { items, clearCart } = useCartStore();
  
  const isEmpty = items.length === 0;

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {isEmpty ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <ShoppingCart className="h-10 w-10 text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold">
                      Cart Items ({items.reduce((sum, item) => sum + item.quantity, 0)})
                    </h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-500 hover:text-destructive"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
                
                <div className="divide-y">
                  {items.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-6">
                <Link 
                  to="/products" 
                  className="text-primary font-medium inline-flex items-center hover:underline"
                >
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <OrderSummary showCheckoutButton={true} />
              
              {/* Secure Checkout Message */}
              <div className="mt-4 text-center text-sm text-gray-500 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                  />
                </svg>
                Secure Checkout
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;

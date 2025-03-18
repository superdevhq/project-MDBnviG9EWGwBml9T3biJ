
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { sampleOrders } from '@/lib/data';
import { Order } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Package, Truck, Home, ArrowLeft } from 'lucide-react';

const OrderTracking = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch order
    const fetchOrder = () => {
      setTimeout(() => {
        const foundOrder = sampleOrders.find(o => o.id === id);
        
        // If order not found in sample data, create a mock order for demo
        if (!foundOrder && id) {
          const mockOrder: Order = {
            id: id,
            items: [],
            status: 'processing',
            date: new Date().toISOString().split('T')[0],
            total: 0,
            shippingAddress: {
              fullName: 'John Doe',
              streetAddress: '123 Main St',
              city: 'Anytown',
              state: 'CA',
              postalCode: '12345',
              country: 'USA'
            }
          };
          setOrder(mockOrder);
        } else {
          setOrder(foundOrder || null);
        }
        
        setLoading(false);
      }, 1000);
    };
    
    fetchOrder();
  }, [id]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
            <div className="h-64 bg-gray-200 rounded max-w-3xl mx-auto"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!order) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="mb-8">The order you're looking for doesn't exist or has been removed.</p>
          <Link to="/account" className="btn-primary">
            View Your Orders
          </Link>
        </div>
      </Layout>
    );
  }
  
  // Define the steps and their status based on order status
  const steps = [
    { 
      label: 'Order Placed', 
      icon: CheckCircle2, 
      status: 'completed', 
      description: 'Your order has been received and is being processed.' 
    },
    { 
      label: 'Processing', 
      icon: Clock, 
      status: order.status === 'pending' ? 'current' : 
              ['processing', 'shipped', 'delivered'].includes(order.status) ? 'completed' : 'upcoming',
      description: 'Your order is being prepared for shipping.' 
    },
    { 
      label: 'Shipped', 
      icon: Truck, 
      status: order.status === 'processing' ? 'current' : 
              ['shipped', 'delivered'].includes(order.status) ? 'completed' : 'upcoming',
      description: 'Your order is on its way to you.' 
    },
    { 
      label: 'Delivered', 
      icon: Home, 
      status: order.status === 'shipped' ? 'current' : 
              order.status === 'delivered' ? 'completed' : 'upcoming',
      description: 'Your order has been delivered.' 
    }
  ];
  
  // Get current step index
  const currentStepIndex = steps.findIndex(step => step.status === 'current');
  const progressPercentage = currentStepIndex >= 0 
    ? (currentStepIndex + 1) / steps.length * 100 
    : steps.filter(step => step.status === 'completed').length / steps.length * 100;

  return (
    <Layout>
      <div className="container-custom py-8">
        <Link 
          to="/account" 
          className="inline-flex items-center text-sm font-medium mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Account
        </Link>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg border overflow-hidden mb-8">
            {/* Header */}
            <div className="p-6 border-b bg-gray-50">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold">Order #{order.id}</h1>
                  <p className="text-gray-600">Placed on {order.date}</p>
                </div>
                
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm">
                    Contact Support
                  </Button>
                  <Button size="sm">
                    <Package className="mr-2 h-4 w-4" />
                    Track Package
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Progress Tracker */}
            <div className="p-6 border-b">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Order Progress</span>
                  <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                          step.status === 'completed' ? 'bg-primary text-white' :
                          step.status === 'current' ? 'bg-primary/20 text-primary border-2 border-primary' :
                          'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <StepIcon className="h-6 w-6" />
                      </div>
                      <h3 className={`font-medium ${
                        step.status === 'upcoming' ? 'text-gray-400' : ''
                      }`}>
                        {step.label}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Shipping Address */}
            <div className="p-6 border-b">
              <h2 className="font-semibold mb-4">Shipping Address</h2>
              <p className="text-gray-600">
                {order.shippingAddress.fullName}<br />
                {order.shippingAddress.streetAddress}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
                {order.shippingAddress.country}
              </p>
            </div>
            
            {/* Order Items */}
            {order.items.length > 0 && (
              <div className="p-6">
                <h2 className="font-semibold mb-4">Order Items</h2>
                <div className="divide-y">
                  {order.items.map((item, index) => (
                    <div key={index} className="py-4 flex items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden mr-4">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Need Help Section */}
          <div className="bg-gray-50 rounded-lg border p-6">
            <h2 className="font-semibold mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions or concerns about your order, our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline">
                Return or Exchange
              </Button>
              <Button variant="outline">
                Report an Issue
              </Button>
              <Button>
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderTracking;

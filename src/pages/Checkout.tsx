
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import OrderSummary from '@/components/OrderSummary';
import { useCartStore } from '@/lib/store';
import { useCheckoutStore } from '@/lib/store';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, Truck, Clock } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart, subtotal } = useCartStore();
  const { 
    shippingAddress, 
    setShippingAddress, 
    orderNotes, 
    setOrderNotes,
    shippingMethod,
    setShippingMethod,
    reset
  } = useCheckoutStore();
  
  const [formData, setFormData] = useState({
    fullName: shippingAddress?.fullName || '',
    streetAddress: shippingAddress?.streetAddress || '',
    city: shippingAddress?.city || '',
    state: shippingAddress?.state || '',
    postalCode: shippingAddress?.postalCode || '',
    country: shippingAddress?.country || '',
    email: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect to products if cart is empty
  if (items.length === 0) {
    navigate('/products');
    return null;
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    const requiredFields = [
      'fullName', 'streetAddress', 'city', 
      'state', 'postalCode', 'country', 'email'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData].trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Postal code validation (simple check)
    if (formData.postalCode && !/^[0-9]{5}(-[0-9]{4})?$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Please enter a valid postal code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Save shipping address
    setShippingAddress({
      fullName: formData.fullName,
      streetAddress: formData.streetAddress,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.country
    });
    
    // Simulate order processing
    setTimeout(() => {
      // Generate random order ID
      const orderId = `ORD-${Math.floor(Math.random() * 10000)}`;
      
      // Clear cart and checkout data
      clearCart();
      reset();
      
      // Show success message
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${orderId} has been placed.`,
      });
      
      // Redirect to order tracking page
      navigate(`/order-tracking/${orderId}`);
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <div className="bg-white rounded-lg border p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={errors.fullName ? 'border-destructive' : ''}
                    />
                    {errors.fullName && (
                      <p className="text-destructive text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="streetAddress">Street Address</Label>
                    <Input
                      id="streetAddress"
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      className={errors.streetAddress ? 'border-destructive' : ''}
                    />
                    {errors.streetAddress && (
                      <p className="text-destructive text-sm mt-1">{errors.streetAddress}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'border-destructive' : ''}
                    />
                    {errors.city && (
                      <p className="text-destructive text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={errors.state ? 'border-destructive' : ''}
                    />
                    {errors.state && (
                      <p className="text-destructive text-sm mt-1">{errors.state}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={errors.postalCode ? 'border-destructive' : ''}
                    />
                    {errors.postalCode && (
                      <p className="text-destructive text-sm mt-1">{errors.postalCode}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={errors.country ? 'border-destructive' : ''}
                    />
                    {errors.country && (
                      <p className="text-destructive text-sm mt-1">{errors.country}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              
              {/* Shipping Method */}
              <div className="bg-white rounded-lg border p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
                
                <RadioGroup 
                  value={shippingMethod} 
                  onValueChange={(value) => setShippingMethod(value as 'standard' | 'express')}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 mr-3 text-gray-500" />
                        <div>
                          <p className="font-medium">Standard Shipping</p>
                          <p className="text-sm text-gray-500">Delivery in 5-7 business days</p>
                        </div>
                      </div>
                    </Label>
                    <span className="font-medium">Free</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-3 text-gray-500" />
                        <div>
                          <p className="font-medium">Express Shipping</p>
                          <p className="text-sm text-gray-500">Delivery in 1-3 business days</p>
                        </div>
                      </div>
                    </Label>
                    <span className="font-medium">$9.99</span>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Order Notes */}
              <div className="bg-white rounded-lg border p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                
                <div>
                  <Label htmlFor="orderNotes">Order Notes (optional)</Label>
                  <Textarea
                    id="orderNotes"
                    placeholder="Special instructions for delivery or any other notes"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="h-24"
                  />
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white rounded-lg border p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                
                <div className="p-4 border rounded-lg bg-gray-50 flex items-center">
                  <CreditCard className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium">Payment will be handled in the next step</p>
                    <p className="text-sm text-gray-500">
                      You'll be redirected to our secure payment processor after placing your order
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Submit Button (Mobile) */}
              <div className="lg:hidden mb-8">
                <Button 
                  type="submit" 
                  className="w-full h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            </form>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="sticky top-24">
              <OrderSummary />
              
              {/* Submit Button (Desktop) */}
              <div className="hidden lg:block mt-6">
                <Button 
                  onClick={handleSubmit} 
                  className="w-full h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
              
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
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;

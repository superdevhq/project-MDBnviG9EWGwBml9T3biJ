
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { sampleOrders } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, User, MapPin, LogOut, ChevronRight, Clock } from 'lucide-react';

const Account = () => {
  const [activeTab, setActiveTab] = useState('orders');
  
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    addresses: [
      {
        id: '1',
        fullName: 'John Doe',
        streetAddress: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        postalCode: '12345',
        country: 'USA',
        isDefault: true
      }
    ]
  };
  
  // Get orders from sample data
  const orders = sampleOrders;

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border overflow-hidden sticky top-24">
              {/* User Info */}
              <div className="p-6 border-b bg-gray-50">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-semibold">{user.name}</h2>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="p-2">
                <button 
                  className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                    activeTab === 'orders' 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('orders')}
                >
                  <Package className="h-5 w-5 mr-3" />
                  Orders
                </button>
                
                <button 
                  className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                    activeTab === 'profile' 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <User className="h-5 w-5 mr-3" />
                  Profile
                </button>
                
                <button 
                  className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                    activeTab === 'addresses' 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('addresses')}
                >
                  <MapPin className="h-5 w-5 mr-3" />
                  Addresses
                </button>
                
                <div className="px-2 pt-2 mt-2 border-t">
                  <button className="w-full flex items-center px-4 py-2 rounded-md text-left text-gray-600 hover:bg-gray-100">
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out
                  </button>
                </div>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">My Orders</h2>
                
                {orders.length > 0 ? (
                  <div className="bg-white rounded-lg border overflow-hidden divide-y">
                    {orders.map((order) => (
                      <div key={order.id} className="p-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-semibold">Order #{order.id}</h3>
                              <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                                order.status === 'delivered' 
                                  ? 'bg-green-100 text-green-800' 
                                  : order.status === 'shipped'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">Placed on {order.date}</p>
                          </div>
                          
                          <div className="flex items-center">
                            <span className="font-medium mr-4">${order.total.toFixed(2)}</span>
                            <Link 
                              to={`/order-tracking/${order.id}`}
                              className="text-primary font-medium flex items-center hover:underline"
                            >
                              View Details
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center">
                              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden mr-3">
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-lg border">
                    <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                      <Clock className="h-10 w-10 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      You haven't placed any orders yet. Start shopping to see your orders here.
                    </p>
                    <Link to="/products" className="btn-primary">
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                
                <div className="bg-white rounded-lg border overflow-hidden">
                  <div className="p-6">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue={user.name} />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" defaultValue={user.email} />
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" type="tel" placeholder="Enter your phone number" />
                        </div>
                      </div>
                      
                      <div className="border-t pt-6">
                        <h3 className="font-medium mb-4">Password</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                          </div>
                          
                          <div>
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                          </div>
                          
                          <div>
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit">Save Changes</Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
            
            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Saved Addresses</h2>
                  <Button>Add New Address</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.addresses.map((address) => (
                    <div key={address.id} className="bg-white rounded-lg border p-6 relative">
                      {address.isDefault && (
                        <span className="absolute top-2 right-2 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                      
                      <h3 className="font-semibold mb-2">{address.fullName}</h3>
                      <p className="text-gray-600 mb-4">
                        {address.streetAddress}<br />
                        {address.city}, {address.state} {address.postalCode}<br />
                        {address.country}
                      </p>
                      
                      <div className="flex space-x-3">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Delete</Button>
                        {!address.isDefault && (
                          <Button size="sm">Set as Default</Button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Add New Address Card */}
                  <div className="bg-gray-50 rounded-lg border border-dashed p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <MapPin className="h-6 w-6 text-gray-500" />
                    </div>
                    <h3 className="font-semibold mb-2">Add a New Address</h3>
                    <p className="text-gray-600 mb-4">
                      Save your shipping addresses for faster checkout
                    </p>
                    <Button>Add Address</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;

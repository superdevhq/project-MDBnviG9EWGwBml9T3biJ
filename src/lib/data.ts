
import { Product, Order } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Minimalist Desk Lamp',
    description: 'A sleek, adjustable desk lamp with warm lighting perfect for your workspace.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'home',
    inStock: true,
    featured: true,
    rating: 4.5
  },
  {
    id: '2',
    name: 'Wireless Earbuds',
    description: 'Premium wireless earbuds with noise cancellation and crystal clear sound.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'electronics',
    inStock: true,
    rating: 4.8
  },
  {
    id: '3',
    name: 'Leather Notebook',
    description: 'Handcrafted leather notebook with premium paper, perfect for journaling or sketching.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'stationery',
    inStock: true,
    rating: 4.3
  },
  {
    id: '4',
    name: 'Ceramic Coffee Mug',
    description: 'Handmade ceramic coffee mug with minimalist design, available in multiple colors.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'home',
    inStock: true,
    rating: 4.2
  },
  {
    id: '5',
    name: 'Smart Watch',
    description: 'Feature-packed smartwatch with health tracking, notifications, and customizable watch faces.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'electronics',
    inStock: false,
    rating: 4.7
  },
  {
    id: '6',
    name: 'Wool Throw Blanket',
    description: 'Soft, warm wool throw blanket perfect for cozy evenings at home.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1580301762395-83a1d1ea31dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'home',
    inStock: true,
    featured: true,
    rating: 4.6
  },
  {
    id: '7',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact, waterproof Bluetooth speaker with impressive sound quality and long battery life.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'electronics',
    inStock: true,
    rating: 4.4
  },
  {
    id: '8',
    name: 'Minimalist Wall Clock',
    description: 'Sleek, modern wall clock with silent movement, perfect for any room.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'home',
    inStock: true,
    rating: 4.1
  }
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'home', name: 'Home & Living' },
  { id: 'stationery', name: 'Stationery' }
];

export const sampleOrders: Order[] = [
  {
    id: 'ORD-1234',
    items: [
      { product: products[0], quantity: 1 },
      { product: products[2], quantity: 2 }
    ],
    status: 'delivered',
    date: '2023-10-15',
    total: 99.97,
    shippingAddress: {
      fullName: 'John Doe',
      streetAddress: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      postalCode: '12345',
      country: 'USA'
    }
  },
  {
    id: 'ORD-5678',
    items: [
      { product: products[4], quantity: 1 }
    ],
    status: 'shipped',
    date: '2023-11-02',
    total: 199.99,
    shippingAddress: {
      fullName: 'John Doe',
      streetAddress: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      postalCode: '12345',
      country: 'USA'
    }
  }
];

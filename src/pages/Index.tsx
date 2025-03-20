
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

const Index = () => {
// Get featured products or just the first 4
const featuredProducts = products
.filter(product => product.featured || product.rating && product.rating >= 4.5)
.slice(0, 4);

return (
<Layout>
{/* Hero Section */}
<section className="bg-gradient-to-r from-indigo-50 to-blue-50 py-16 md:py-24">
<div className="container-custom">
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
<div className="space-y-6">
<h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
Discover Quality, <br />
<span className="text-primary">Delivered with Speed</span>
</h1>
<p className="text-lg text-gray-600 max-w-md">
Discover our curated collection of premium products for your everyday needs.
</p>
<div className="flex flex-col sm:flex-row gap-4">
<Link to="/products" className="btn-primary">
Shop Now
</Link>
<Link to="/products?featured=true" className="btn-outline">
Featured Products
</Link>
</div>
</div>
<div className="relative">
<div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
<img 
src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
alt="Featured products" 
className="w-full h-full object-cover"
/>
</div>
<div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
<p className="text-sm font-medium text-gray-900">Free Shipping</p>
<p className="text-xs text-gray-500">On orders over $50</p>
</div>
</div>
</div>
</div>
</section>

{/* ... keep existing code (Categories Section, Featured Products Section, Testimonials Section, CTA Section) */}
</Layout>
);
};

export default Index;

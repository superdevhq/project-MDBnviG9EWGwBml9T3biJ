import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/lib/data';
import { Product } from '@/lib/types';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get URL parameters
  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    const minPrice = Number(searchParams.get('minPrice') || 0);
    const maxPrice = Number(searchParams.get('maxPrice') || 200);
    const inStock = searchParams.get('inStock') === 'true';
    
    setSelectedCategory(category);
    setSearchTerm(search);
    setPriceRange([minPrice, maxPrice]);
    setInStockOnly(inStock);
    
    // Apply filters
    filterProducts(category, search, [minPrice, maxPrice], inStock);
  }, [searchParams]);
  
  const filterProducts = (
    category: string, 
    search: string, 
    price: number[], 
    inStock: boolean
  ) => {
    let filtered = [...products];
    
    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= price[0] && product.price <= price[1]
    );
    
    // Filter by stock status
    if (inStock) {
      filtered = filtered.filter(product => product.inStock);
    }
    
    setFilteredProducts(filtered);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchTerm });
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateFilters({ category });
  };
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    updateFilters({ minPrice: value[0], maxPrice: value[1] });
  };
  
  const handleInStockChange = (checked: boolean) => {
    setInStockOnly(checked);
    updateFilters({ inStock: checked });
  };
  
  const updateFilters = (newFilters: Record<string, any>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === null || value === undefined || value === false || value === '') {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    
    setSearchParams(params);
  };
  
  const clearFilters = () => {
    setSearchParams({});
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange([0, 200]);
    setInStockOnly(false);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 min-h-[calc(100vh-200px)]">
          {/* Filters - Mobile Toggle */}
          <div className="w-full md:hidden mb-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center"
              onClick={toggleFilters}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
          
          {/* Filters Sidebar */}
          <aside className={`w-full md:w-64 md:block h-full ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg border p-4 sticky top-24 h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                    <Button 
                      type="submit" 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-0 top-0 h-full"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div 
                      key={category.id}
                      className={`px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
                        selectedCategory === category.id 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <Slider
                  value={priceRange}
                  min={0}
                  max={200}
                  step={5}
                  onValueChange={handlePriceChange}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              {/* In Stock Only */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="in-stock" 
                  checked={inStockOnly}
                  onCheckedChange={handleInStockChange}
                />
                <label 
                  htmlFor="in-stock" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  In Stock Only
                </label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Active Filters */}
            {(selectedCategory !== 'all' || searchTerm || inStockOnly || priceRange[0] > 0 || priceRange[1] < 200) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedCategory !== 'all' && (
                  <div className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                    Category: {categories.find(c => c.id === selectedCategory)?.name}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 ml-1 text-gray-500"
                      onClick={() => handleCategoryChange('all')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                {searchTerm && (
                  <div className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                    Search: {searchTerm}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 ml-1 text-gray-500"
                      onClick={() => updateFilters({ search: '' })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                {(priceRange[0] > 0 || priceRange[1] < 200) && (
                  <div className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                    Price: ${priceRange[0]} - ${priceRange[1]}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 ml-1 text-gray-500"
                      onClick={() => updateFilters({ minPrice: 0, maxPrice: 200 })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                {inStockOnly && (
                  <div className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                    In Stock Only
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 ml-1 text-gray-500"
                      onClick={() => updateFilters({ inStock: false })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {/* Results Count */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">
                {selectedCategory !== 'all' 
                  ? categories.find(c => c.id === selectedCategory)?.name 
                  : 'All Products'}
              </h1>
              <p className="text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
            
            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search term</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
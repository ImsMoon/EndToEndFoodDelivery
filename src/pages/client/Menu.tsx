import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Star, ShoppingCart } from 'lucide-react';
import { products } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const Menu: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const { addToCart } = useApp();

  const categories = [
    { id: 'all', name: 'All', emoji: '🍽️' },
    { id: 'pizza', name: 'Pizza', emoji: '🍕' },
    { id: 'burger', name: 'Burgers', emoji: '🍔' },
    { id: 'coffee', name: 'Coffee', emoji: '☕' },
    { id: 'sides', name: 'Sides', emoji: '🍟' },
    { id: 'desserts', name: 'Desserts', emoji: '🍰' },
  ];

  const filteredProducts = useMemo(() => {
    let result = products;
    if (category !== 'all') result = result.filter(p => p.category === category);
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'popular') result = [...result].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    return result;
  }, [category, search, sortBy]);

  const handleQuickAdd = (product: typeof products[0]) => {
    addToCart(product, product.variants[0], [], '');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Menu</h1>
        <p className="text-gray-500">Fresh ingredients, amazing flavors. Customize every order to your liking.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder="Search menu items..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400" />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="popular">Popular First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setCategory(cat.id)} className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${category === cat.id ? 'bg-orange-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300'}`}>
            <span>{cat.emoji}</span><span className="font-medium text-sm">{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
            <Link to={`/product/${product.id}`}>
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 text-center relative">
                <span className="text-6xl group-hover:scale-110 transition-transform inline-block">{product.image}</span>
                {product.popular && <span className="absolute top-2 right-2 bg-orange-600 text-white text-xs px-2 py-1 rounded-full font-medium">Popular</span>}
              </div>
            </Link>
            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <div className="flex items-center gap-1 mb-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /><span className="text-xs text-gray-500">4.8</span></div>
                <h3 className="font-semibold text-gray-800 hover:text-orange-600 transition-colors">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
              </Link>
              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold text-orange-600">${product.price.toFixed(2)}</span>
                <div className="flex gap-2">
                  <button onClick={() => handleQuickAdd(product)} className="bg-orange-100 text-orange-600 p-2 rounded-lg hover:bg-orange-200 transition-colors" title="Quick add"><ShoppingCart size={16} /></button>
                  <Link to={`/product/${product.id}`} className="bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">Customize</Link>
                </div>
              </div>
              {product.variants.length > 1 && <p className="text-xs text-gray-400 mt-2">{product.variants.length} sizes available</p>}
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <span className="text-6xl block mb-4">🔍</span>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No items found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Menu;

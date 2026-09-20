import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from '../../router';
import { Search, Star, ShoppingCart, ChevronRight } from 'lucide-react';
import { products } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const Menu: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [loaded, setLoaded] = useState(false);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const { addToCart } = useApp();

  useEffect(() => {
    setLoaded(true);
  }, []);

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
    setAddedItems(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedItems(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Our Menu</h1>
        <p className="text-gray-500 text-lg">Fresh ingredients, amazing flavors. Customize every order to your liking.</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search menu items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white shadow-sm"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white shadow-sm font-medium text-gray-700"
        >
          <option value="popular">Popular First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 -mx-4 px-4">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all font-medium ${
              category === cat.id
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-200 scale-105'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:bg-orange-50'
            }`}
          >
            <span className="text-lg">{cat.emoji}</span>
            <span className="text-sm">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> items
          {category !== 'all' && <span> in <span className="font-semibold text-orange-600 capitalize">{category}</span></span>}
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Link to={`/product/${product.id}`}>
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 text-center relative overflow-hidden">
                <span className="text-6xl group-hover:scale-125 transition-transform duration-300 inline-block">{product.image}</span>
                {product.popular && (
                  <span className="absolute top-3 left-3 bg-orange-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                    🔥 Popular
                  </span>
                )}
              </div>
            </Link>
            <div className="p-5">
              <Link to={`/product/${product.id}`}>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-xs text-gray-500 font-medium">4.8</span>
                </div>
                <h3 className="font-bold text-gray-800 text-lg group-hover:text-orange-600 transition-colors">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
              </Link>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-orange-600">${product.price.toFixed(2)}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleQuickAdd(product)}
                    className={`p-2.5 rounded-xl transition-all ${
                      addedItems.has(product.id)
                        ? 'bg-green-100 text-green-600'
                        : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                    }`}
                    title="Quick add"
                  >
                    <ShoppingCart size={16} />
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-orange-700 transition-all hover:scale-105 flex items-center gap-1"
                  >
                    Customize <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
              {product.variants.length > 1 && (
                <p className="text-xs text-gray-400 mt-3">{product.variants.length} sizes available</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <span className="text-7xl block mb-4">🔍</span>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No items found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
          <button
            onClick={() => { setSearch(''); setCategory('all'); }}
            className="mt-4 text-orange-600 font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;

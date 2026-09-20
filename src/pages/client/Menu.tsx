import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from '../../router';
import { Search, Star, ShoppingCart } from 'lucide-react';
import { products } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const Menu: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const { addToCart } = useApp();

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'burger', name: 'Burgers' },
    { id: 'coffee', name: 'Coffee' },
    { id: 'sides', name: 'Sides' },
    { id: 'desserts', name: 'Desserts' },
  ];

  const filteredProducts = useMemo(() => {
    let result = products;
    if (category !== 'all') result = result.filter(p => p.category === category);
    if (search) result = result.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  }, [category, search]);

  const handleQuickAdd = (product: typeof products[0]) => {
    addToCart(product, product.variants[0], [], '');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-text mb-2">Menu</h1>
        <p className="text-text-secondary text-lg">Browse our selection of delicious items</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-5 py-2.5 rounded-xl whitespace-nowrap font-medium text-sm transition-colors ${
              category === cat.id
                ? 'bg-primary text-white'
                : 'bg-white text-text-secondary border border-border hover:border-primary/30'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all"
          >
            <Link to={`/product/${product.id}`}>
              <div className="aspect-square overflow-hidden bg-surface">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            <div className="p-5">
              <Link to={`/product/${product.id}`}>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={14} className="fill-warning text-warning" />
                  <span className="text-sm font-medium text-text">4.8</span>
                </div>
                <h3 className="font-bold text-text text-lg mb-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-2 mb-4">{product.description}</p>
              </Link>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleQuickAdd(product)}
                    className="p-2.5 bg-primary-light text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart size={16} />
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-text-secondary text-lg mb-4">No items found</p>
          <button
            onClick={() => { setSearch(''); setCategory('all'); }}
            className="text-primary font-semibold hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;

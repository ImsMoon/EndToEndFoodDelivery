import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from '../../router';
import { Search } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Menu</h1>
        <p className="text-gray-600">Browse our selection of delicious items</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-5 py-2 rounded-lg whitespace-nowrap font-medium text-sm ${
              category === cat.id
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
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
            className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md"
          >
            <Link to={`/product/${product.id}`}>
              <div className="bg-gray-100 p-8 text-center">
                <span className="text-6xl">{product.image}</span>
              </div>
            </Link>
            <div className="p-5">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold text-gray-900 mb-1 hover:underline">{product.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
              </Link>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleQuickAdd(product)}
                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
                  >
                    Add
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="px-3 py-1.5 text-sm bg-black text-white hover:bg-gray-800 rounded-lg font-medium"
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
          <p className="text-gray-500 text-lg">No items found</p>
          <button
            onClick={() => { setSearch(''); setCategory('all'); }}
            className="mt-4 text-black underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;

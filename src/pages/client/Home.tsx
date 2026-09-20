import React from 'react';
import { Link } from '../../router';
import { ArrowRight } from 'lucide-react';
import { products } from '../../data/mockData';

const Home: React.FC = () => {
  const popularItems = products.filter(p => p.popular).slice(0, 4);
  
  const categories = [
    { name: 'Pizza', emoji: '🍕', path: '/menu?category=pizza' },
    { name: 'Burgers', emoji: '🍔', path: '/menu?category=burger' },
    { name: 'Coffee', emoji: '☕', path: '/menu?category=coffee' },
    { name: 'Sides', emoji: '🍟', path: '/menu?category=sides' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto">
            Delicious food, delivered to your door
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Order pizza, burgers, and coffee from your favorite restaurants
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/menu"
              className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 inline-flex items-center gap-2"
            >
              Order Now <ArrowRight size={18} />
            </Link>
            <Link
              to="/menu"
              className="bg-white text-black px-8 py-4 rounded-lg font-semibold border border-gray-300 hover:border-gray-400"
            >
              View Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.name}
              to={cat.path}
              className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:border-gray-400 hover:shadow-sm"
            >
              <span className="text-5xl block mb-3">{cat.emoji}</span>
              <h3 className="font-semibold text-gray-900">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Items */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Popular Items</h2>
            <Link to="/menu" className="text-sm font-medium text-gray-600 hover:text-black">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map(item => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md"
              >
                <div className="bg-gray-100 p-8 text-center">
                  <span className="text-6xl">{item.image}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded capitalize">
                      {item.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to order?</h2>
        <p className="text-gray-600 mb-8 text-lg">Get started with your first order today</p>
        <Link
          to="/menu"
          className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 inline-flex items-center gap-2"
        >
          Browse Menu <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
};

export default Home;

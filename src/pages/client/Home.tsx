import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Truck, MapPin, Star } from 'lucide-react';
import { products } from '../../data/mockData';

const banners = [
  { title: '50% Off First Order!', subtitle: 'Use code WELCOME50', image: '🎉' },
  { title: 'Free Delivery Weekend', subtitle: 'On all orders above $20', image: '🚚' },
  { title: 'New: Summer Coffee Menu', subtitle: 'Try our refreshing iced coffees', image: '☕' },
];

const Home: React.FC = () => {
  const popularItems = products.filter(p => p.popular);
  const categories = [
    { name: 'Pizza', emoji: '🍕', path: '/menu?category=pizza', desc: 'Hand-tossed perfection' },
    { name: 'Burgers', emoji: '🍔', path: '/menu?category=burger', desc: 'Juicy & delicious' },
    { name: 'Coffee', emoji: '☕', path: '/menu?category=coffee', desc: 'Freshly brewed' },
    { name: 'Sides', emoji: '🍟', path: '/menu?category=sides', desc: 'Perfect companions' },
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🍕</div>
          <div className="absolute top-20 right-20 text-6xl">🍔</div>
          <div className="absolute bottom-10 left-1/3 text-7xl">☕</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Delicious Food,<br />Delivered Fast</h1>
            <p className="text-lg md:text-xl text-orange-100 mb-8">Order pizza, burgers, and coffee from your favorite restaurants. Delivery, takeaway, or dine-in — your choice!</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/menu" className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2">Order Now <ArrowRight size={18} /></Link>
              <Link to="/menu" className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">View Menu</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {banners.map((banner, i) => (
            <div key={i} className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-4 flex items-center gap-4">
              <span className="text-4xl">{banner.image}</span>
              <div><h3 className="font-bold text-gray-800">{banner.title}</h3><p className="text-sm text-gray-600">{banner.subtitle}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link key={cat.name} to={cat.path} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
              <span className="text-5xl block mb-3 group-hover:scale-110 transition-transform">{cat.emoji}</span>
              <h3 className="font-semibold text-gray-800">{cat.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Popular Items</h2>
          <Link to="/menu" className="text-orange-600 font-medium text-sm flex items-center gap-1 hover:underline">View All <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularItems.map(item => (
            <Link key={item.id} to={`/product/${item.id}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 text-center">
                <span className="text-6xl group-hover:scale-110 transition-transform inline-block">{item.image}</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-1"><Star size={14} className="text-yellow-500 fill-yellow-500" /><span className="text-xs text-gray-500">4.8 (120+)</span></div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-lg font-bold text-orange-600">${item.price.toFixed(2)}</span>
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">{item.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: <MapPin className="text-orange-600" size={28} />, title: 'Choose Location', desc: 'Select your nearest branch or delivery address' },
              { icon: <span className="text-2xl">🍽️</span>, title: 'Pick Your Food', desc: 'Browse menu and customize to your liking' },
              { icon: <Clock className="text-orange-600" size={28} />, title: 'Choose Time', desc: 'Order now or schedule for later' },
              { icon: <Truck className="text-orange-600" size={28} />, title: 'Fast Delivery', desc: 'Get your food delivered hot and fresh' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">{item.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
          <div className="text-6xl">🎁</div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Send Food as a Gift!</h2>
            <p className="text-purple-100 mb-4">Surprise your loved ones with a delicious meal. Add a personal message and we'll take care of the rest.</p>
            <Link to="/menu" className="inline-block bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors">Send a Gift</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

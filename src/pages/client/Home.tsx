import React, { useEffect, useState } from 'react';
import { Link } from '../../router';
import { ArrowRight, Clock, Truck, MapPin, Star, ChevronRight } from 'lucide-react';
import { products } from '../../data/mockData';

const Home: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const popularItems = products.filter(p => p.popular);
  const banners = [
    { title: '50% Off First Order!', subtitle: 'Use code WELCOME50', image: '🎉' },
    { title: 'Free Delivery Weekend', subtitle: 'On all orders above $20', image: '🚚' },
    { title: 'New: Summer Coffee Menu', subtitle: 'Try our refreshing iced coffees', image: '☕' },
  ];
  const categories = [
    { name: 'Pizza', emoji: '🍕', path: '/menu?category=pizza', desc: 'Hand-tossed perfection' },
    { name: 'Burgers', emoji: '🍔', path: '/menu?category=burger', desc: 'Juicy & delicious' },
    { name: 'Coffee', emoji: '☕', path: '/menu?category=coffee', desc: 'Freshly brewed' },
    { name: 'Sides', emoji: '🍟', path: '/menu?category=sides', desc: 'Perfect companions' },
  ];

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-orange-600 via-red-500 to-orange-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-[10%] text-[100px] md:text-[150px] opacity-10 animate-bounce" style={{ animationDuration: '3s' }}>🍕</div>
          <div className="absolute top-20 right-[15%] text-[80px] md:text-[120px] opacity-10 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>🍔</div>
          <div className="absolute bottom-10 left-[40%] text-[90px] md:text-[130px] opacity-10 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>☕</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="max-w-2xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">🔥 Free delivery on orders over $20</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Delicious Food,<br />
              <span className="text-yellow-300">Delivered Fast</span>
            </h1>
            <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-lg">
              Order pizza, burgers, and coffee from your favorite restaurants. 
              Delivery, takeaway, or dine-in — your choice!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold hover:bg-yellow-50 transition-all hover:scale-105 shadow-lg flex items-center gap-2 text-lg"
              >
                Order Now <ArrowRight size={20} />
              </Link>
              <Link
                to="/menu"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all hover:scale-105"
              >
                View Menu
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['🧑', '👩', '👨', '🧑'].map((e, i) => (
                    <span key={i} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm border-2 border-white/30">{e}</span>
                  ))}
                </div>
                <span className="text-sm text-orange-100">10k+ happy customers</span>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-yellow-300 fill-yellow-300" />)}
                <span className="text-sm text-orange-100 ml-1">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {banners.map((banner, i) => (
            <div key={i} className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 cursor-pointer">
              <span className="text-4xl">{banner.image}</span>
              <div>
                <h3 className="font-bold text-gray-800">{banner.title}</h3>
                <p className="text-sm text-gray-500">{banner.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">What are you craving?</h2>
          <p className="text-gray-500">Choose from our wide selection of delicious options</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map(cat => (
            <Link
              key={cat.name}
              to={cat.path}
              className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 group"
            >
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-4xl md:text-5xl">{cat.emoji}</span>
              </div>
              <h3 className="font-bold text-gray-800 text-lg">{cat.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{cat.desc}</p>
              <div className="mt-3 text-orange-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                Explore <ChevronRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Items */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Popular Items</h2>
              <p className="text-gray-500 mt-1">Most ordered by our customers</p>
            </div>
            <Link to="/menu" className="text-orange-600 font-medium text-sm flex items-center gap-1 hover:underline">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map(item => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 group"
              >
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 text-center relative overflow-hidden">
                  <span className="text-7xl group-hover:scale-125 transition-transform duration-300 inline-block">{item.image}</span>
                  {item.popular && (
                    <span className="absolute top-3 left-3 bg-orange-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                      🔥 Popular
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-gray-500 font-medium">4.8 (120+)</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg group-hover:text-orange-600 transition-colors">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-orange-600">${item.price.toFixed(2)}</span>
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold capitalize">
                      {item.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">How It Works</h2>
            <p className="text-gray-500">Get your food in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <MapPin className="text-orange-600" size={28} />, title: 'Choose Location', desc: 'Select your nearest branch or delivery address', step: '01' },
              { icon: <span className="text-2xl">🍽️</span>, title: 'Pick Your Food', desc: 'Browse menu and customize to your liking', step: '02' },
              { icon: <Clock className="text-orange-600" size={28} />, title: 'Choose Time', desc: 'Order now or schedule for later', step: '03' },
              { icon: <Truck className="text-orange-600" size={28} />, title: 'Fast Delivery', desc: 'Get your food delivered hot and fresh', step: '04' },
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                <div className="relative">
                  <div className="bg-orange-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 hover:rotate-0 transition-transform">
                    {item.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 -right-4 text-orange-300">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-16 text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-10 text-6xl">🎁</div>
            <div className="absolute bottom-4 left-10 text-5xl">🎂</div>
            <div className="absolute top-1/2 right-1/3 text-4xl">💝</div>
          </div>
          <div className="text-7xl md:text-8xl relative z-10">🎁</div>
          <div className="flex-1 text-center md:text-left relative z-10">
            <span className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm font-medium inline-block mb-4">New Feature</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Send Food as a Gift!</h2>
            <p className="text-purple-100 mb-6 text-lg">Surprise your loved ones with a delicious meal. Add a personal message and we'll take care of the rest.</p>
            <Link to="/menu" className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-purple-50 transition-all hover:scale-105 shadow-lg">
              Send a Gift
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to order?</h2>
          <p className="text-gray-400 mb-8 text-lg">Get started with your first order today</p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-700 transition-all hover:scale-105 shadow-lg text-lg"
          >
            Browse Menu <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

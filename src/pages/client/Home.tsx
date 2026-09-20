import React from 'react';
import { Link } from '../../router';
import { ArrowRight, MapPin, Star, Clock, Truck, ChefHat } from 'lucide-react';
import { products, IMAGES } from '../../data/mockData';

const Home: React.FC = () => {
  const popularItems = products.filter(p => p.popular);
  
  const categories = [
    { name: 'Pizza', path: '/menu?category=pizza', image: IMAGES.categories.pizza, count: 3, gradient: 'from-orange-400 to-red-500' },
    { name: 'Burgers', path: '/menu?category=burger', image: IMAGES.categories.burger, count: 3, gradient: 'from-amber-400 to-orange-500' },
    { name: 'Coffee', path: '/menu?category=coffee', image: IMAGES.categories.coffee, count: 3, gradient: 'from-amber-600 to-yellow-700' },
    { name: 'Sides', path: '/menu?category=sides', image: IMAGES.categories.sides, count: 2, gradient: 'from-yellow-400 to-amber-500' },
  ];

  return (
    <div>
      {/* Hero Section - Full width with gradient background */}
      <section className="relative bg-gradient-to-br from-brand-50 via-white to-brand-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-line mb-6">
                <span className="w-2 h-2 bg-green rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-ink-light">Delivering now in your area</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.1] mb-6">
                Your favorite food,{' '}
                <span className="text-brand relative">
                  delivered
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path d="M0 4C50 8 150 0 200 4" stroke="#FF5A36" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
                {' '}fast.
              </h1>
              
              <p className="text-lg text-ink-light mb-8 max-w-lg leading-relaxed">
                Order pizza, burgers, and coffee from your favorite restaurants. 
                Delivery, takeaway, or dine-in — your choice.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  to="/menu"
                  className="bg-brand hover:bg-brand-dark text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5"
                >
                  Order Now <ArrowRight size={20} />
                </Link>
                <Link
                  to="/menu"
                  className="bg-white hover:bg-gray-50 text-ink border-2 border-line px-8 py-4 rounded-xl font-semibold hover:border-ink/20"
                >
                  Explore Menu
                </Link>
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-6 pt-6 border-t border-line">
                <div>
                  <p className="text-2xl font-bold text-ink">10k+</p>
                  <p className="text-sm text-ink-muted">Happy customers</p>
                </div>
                <div className="w-px h-10 bg-line"></div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-amber text-amber" />)}
                  </div>
                  <p className="text-sm text-ink-muted">4.9 rating</p>
                </div>
                <div className="w-px h-10 bg-line"></div>
                <div>
                  <p className="text-2xl font-bold text-ink">30min</p>
                  <p className="text-sm text-ink-muted">Avg delivery</p>
                </div>
              </div>
            </div>

            {/* Right Image - Collage style */}
            <div className="order-1 lg:order-2 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden shadow-xl aspect-square food-img-bg">
                    <img src={IMAGES.products.margherita} alt="Pizza" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] food-img-bg-alt">
                    <img src={IMAGES.categories.coffee} alt="Coffee" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] food-img-bg-warm">
                    <img src={IMAGES.products.burger} alt="Burger" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-xl aspect-square food-img-bg-green">
                    <img src={IMAGES.categories.sides} alt="Sides" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-line">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green/10 rounded-full flex items-center justify-center">
                    <Truck size={20} className="text-green" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink text-sm">Free Delivery</p>
                    <p className="text-xs text-ink-muted">On orders $20+</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-line">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center">
                    <Clock size={20} className="text-brand" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink text-sm">Fast Delivery</p>
                    <p className="text-xs text-ink-muted">30 min average</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Search Section */}
      <section className="bg-white border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-3 text-ink-light">
              <MapPin size={20} className="text-brand" />
              <span className="font-medium">Where should we deliver?</span>
            </div>
            <div className="flex-1 w-full md:max-w-md">
              <input
                type="text"
                placeholder="Enter your delivery address"
                className="w-full px-4 py-3 bg-cream border border-line rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
              />
            </div>
            <Link
              to="/locations"
              className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-xl font-semibold whitespace-nowrap"
            >
              Find Locations
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-ink mb-2">Browse by Category</h2>
              <p className="text-ink-light">Find exactly what you're craving</p>
            </div>
            <Link to="/menu" className="text-brand font-semibold hover:underline hidden sm:block">
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={cat.path}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                {/* Gradient fallback */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient}`}></div>
                
                {/* Image */}
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-xl mb-1">{cat.name}</h3>
                  <p className="text-white/90 text-sm font-medium">{cat.count} items →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-ink mb-2">Popular Items</h2>
              <p className="text-ink-light">Most ordered by our customers</p>
            </div>
            <Link to="/menu" className="text-brand font-semibold hover:underline hidden sm:block">
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map(item => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-line hover:border-brand/30 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="aspect-square overflow-hidden food-img-bg relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.popular && (
                    <div className="absolute top-3 left-3 bg-brand text-white text-xs px-3 py-1 rounded-full font-semibold">
                      Popular
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="fill-amber text-amber" />
                    <span className="text-sm font-semibold text-ink">4.8</span>
                    <span className="text-xs text-ink-muted">(120+)</span>
                  </div>
                  <h3 className="font-bold text-ink text-lg mb-1 group-hover:text-brand transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-ink-light line-clamp-2 mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-brand">${item.price.toFixed(2)}</span>
                    <button className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-semibold">
                      + Add
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 lg:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-ink mb-2">How It Works</h2>
            <p className="text-ink-light">Get your food in 3 simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: 'Choose Location', desc: 'Select your delivery address or nearest pickup location', step: '01' },
              { icon: ChefHat, title: 'Pick Your Food', desc: 'Browse menu and customize your order to your liking', step: '02' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Get your food delivered hot and fresh in 30 minutes', step: '03' },
            ].map((item, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-8 border border-line hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="absolute top-4 right-4 text-6xl font-bold text-brand/10">{item.step}</div>
                <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center mb-4">
                  <item.icon size={28} className="text-brand" />
                </div>
                <h3 className="font-bold text-ink text-xl mb-2">{item.title}</h3>
                <p className="text-ink-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Banner */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand to-brand-dark rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Fresh ingredients. Great taste.
                </h2>
                <p className="text-white/90 text-lg mb-8 leading-relaxed">
                  Your next favorite meal is just a few clicks away. We use only the freshest ingredients to bring you delicious food every time.
                </p>
                <Link
                  to="/menu"
                  className="bg-white text-brand hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg"
                >
                  Order Now <ArrowRight size={20} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Clock size={32} className="mb-3" />
                  <h3 className="font-bold text-lg mb-1">Fast Delivery</h3>
                  <p className="text-white/80 text-sm">30 min average</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Truck size={32} className="mb-3" />
                  <h3 className="font-bold text-lg mb-1">Free Delivery</h3>
                  <p className="text-white/80 text-sm">On orders $20+</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Star size={32} className="mb-3" />
                  <h3 className="font-bold text-lg mb-1">Top Rated</h3>
                  <p className="text-white/80 text-sm">4.9/5 rating</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <MapPin size={32} className="mb-3" />
                  <h3 className="font-bold text-lg mb-1">3 Locations</h3>
                  <p className="text-white/80 text-sm">Near you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-ink mb-4">Ready to order?</h2>
          <p className="text-lg text-ink-light mb-8 max-w-2xl mx-auto">
            Discover delicious meals from your favorite restaurants. Order now and get your food delivered fast.
          </p>
          <Link
            to="/menu"
            className="bg-brand hover:bg-brand-dark text-white px-10 py-4 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-brand/25 hover:shadow-xl hover:-translate-y-0.5 text-lg"
          >
            Browse Menu <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

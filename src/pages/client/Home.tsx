import React from 'react';
import { Link } from '../../router';
import { ArrowRight, MapPin, Star, Clock, Truck } from 'lucide-react';
import { products, IMAGES } from '../../data/mockData';

const Home: React.FC = () => {
  const popularItems = products.filter(p => p.popular);
  
  const categories = [
    { name: 'Pizza', path: '/menu?category=pizza', image: IMAGES.categories.pizza, count: 3 },
    { name: 'Burgers', path: '/menu?category=burger', image: IMAGES.categories.burger, count: 3 },
    { name: 'Coffee', path: '/menu?category=coffee', image: IMAGES.categories.coffee, count: 3 },
    { name: 'Sides', path: '/menu?category=sides', image: IMAGES.categories.sides, count: 2 },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <p className="text-primary font-semibold text-sm mb-3 uppercase tracking-wide">
                Fresh food, delivered with care
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6">
                Your favorite food,{' '}
                <span className="text-primary">delivered</span> to your door.
              </h1>
              <p className="text-lg text-text-secondary mb-8 max-w-lg leading-relaxed">
                Order pizza, burgers, and coffee from your favorite restaurants. 
                Delivery, takeaway, or dine-in — your choice.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  to="/menu"
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 transition-colors shadow-lg shadow-primary/20"
                >
                  Order Now <ArrowRight size={20} />
                </Link>
                <Link
                  to="/menu"
                  className="bg-white hover:bg-gray-50 text-text border-2 border-border px-8 py-4 rounded-xl font-semibold transition-colors"
                >
                  Explore Menu
                </Link>
              </div>
              {/* Stats */}
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-2xl font-bold text-text">10k+</p>
                  <p className="text-sm text-text-muted">Happy customers</p>
                </div>
                <div className="w-px h-10 bg-border"></div>
                <div>
                  <p className="text-2xl font-bold text-text">4.9</p>
                  <p className="text-sm text-text-muted flex items-center gap-1">
                    <Star size={14} className="fill-warning text-warning" /> Rating
                  </p>
                </div>
                <div className="w-px h-10 bg-border"></div>
                <div>
                  <p className="text-2xl font-bold text-text">30min</p>
                  <p className="text-sm text-text-muted">Avg delivery</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={IMAGES.hero} 
                  alt="Delicious food spread" 
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                    <Truck size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="font-semibold text-text text-sm">Free Delivery</p>
                    <p className="text-xs text-text-muted">On orders $20+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Search Section */}
      <section className="bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-3 text-text-secondary">
              <MapPin size={20} className="text-primary" />
              <span className="font-medium">Where should we deliver?</span>
            </div>
            <div className="flex-1 w-full md:max-w-md">
              <input
                type="text"
                placeholder="Enter your delivery address"
                className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <Link
              to="/locations"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap"
            >
              Find Locations
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-text mb-2">Browse by Category</h2>
              <p className="text-text-secondary">Find exactly what you're craving</p>
            </div>
            <Link to="/menu" className="text-primary font-semibold hover:underline hidden sm:block">
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={cat.path}
                className="group relative bg-white rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                  <h3 className="text-white font-bold text-lg lg:text-xl mb-1">{cat.name}</h3>
                  <p className="text-white/80 text-sm">{cat.count} items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-text mb-2">Popular Items</h2>
              <p className="text-text-secondary">Most ordered by our customers</p>
            </div>
            <Link to="/menu" className="text-primary font-semibold hover:underline hidden sm:block">
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map(item => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all"
              >
                <div className="aspect-square overflow-hidden bg-surface">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="fill-warning text-warning" />
                    <span className="text-sm font-medium text-text">4.8</span>
                    <span className="text-xs text-text-muted">(120+)</span>
                  </div>
                  <h3 className="font-bold text-text text-lg mb-1 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">${item.price.toFixed(2)}</span>
                    <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                      + Add
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 lg:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
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
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  Order Now <ArrowRight size={20} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <Clock size={32} className="mb-3" />
                  <h3 className="font-bold text-lg mb-1">Fast Delivery</h3>
                  <p className="text-white/80 text-sm">30 min average</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <Truck size={32} className="mb-3" />
                  <h3 className="font-bold text-lg mb-1">Free Delivery</h3>
                  <p className="text-white/80 text-sm">On orders $20+</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <Star size={32} className="mb-3" />
                  <h3 className="font-bold text-lg mb-1">Top Rated</h3>
                  <p className="text-white/80 text-sm">4.9/5 rating</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
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
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-text mb-4">Ready to order?</h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Discover delicious meals from your favorite restaurants. Order now and get your food delivered fast.
          </p>
          <Link
            to="/menu"
            className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-xl font-semibold inline-flex items-center gap-2 transition-colors shadow-lg shadow-primary/20 text-lg"
          >
            Browse Menu <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

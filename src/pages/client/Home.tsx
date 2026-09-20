import React from 'react';
import { Link } from '../../router';
import { ArrowRight, MapPin, Star, Clock, Truck, ChefHat } from 'lucide-react';
import { products, IMAGES } from '../../data/mockData';

/* Shared container classes — every section uses these exact values */
const CONTAINER = 'w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8';

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
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-brand-light overflow-hidden">
        <div className={`${CONTAINER} py-12 sm:py-16 lg:py-20`}>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Text column */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-line mb-5">
                <span className="w-2 h-2 bg-green rounded-full animate-pulse" />
                <span className="text-sm font-medium text-ink-light">Delivering now in your area</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-ink leading-[1.1] mb-5 max-w-xl">
                Your favorite food,{' '}
                <span className="text-brand">delivered</span> fast.
              </h1>

              <p className="text-lg text-ink-light mb-7 max-w-md leading-relaxed">
                Order pizza, burgers, and coffee from your favorite restaurants. Delivery, takeaway, or dine-in — your choice.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  to="/menu"
                  className="bg-brand hover:bg-brand-dark text-white px-7 py-3.5 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-brand/20"
                >
                  Order Now <ArrowRight size={18} />
                </Link>
                <Link
                  to="/menu"
                  className="bg-white hover:bg-gray-50 text-ink border border-line px-7 py-3.5 rounded-xl font-semibold"
                >
                  Explore Menu
                </Link>
              </div>

              {/* Stats row — replaces floating badges */}
              <div className="flex items-center gap-6 pt-6 border-t border-line">
                <div>
                  <p className="text-xl font-bold text-ink">10k+</p>
                  <p className="text-xs text-ink-muted">Happy customers</p>
                </div>
                <div className="w-px h-8 bg-line" />
                <div>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-amber text-amber" />)}
                  </div>
                  <p className="text-xs text-ink-muted">4.9 rating</p>
                </div>
                <div className="w-px h-8 bg-line" />
                <div>
                  <p className="text-xl font-bold text-ink">30min</p>
                  <p className="text-xs text-ink-muted">Avg delivery</p>
                </div>
              </div>
            </div>

            {/* Image column — single hero image, no floating badges */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] food-img-bg">
                <img
                  src={IMAGES.hero}
                  alt="Delicious food spread"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Inline badge — positioned within the image container, not overflowing */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-4 sm:w-auto bg-white rounded-xl p-3 shadow-lg border border-line flex items-center gap-3">
                <div className="w-9 h-9 bg-green/10 rounded-full flex items-center justify-center shrink-0">
                  <Truck size={18} className="text-green" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-ink text-sm leading-tight">Free Delivery</p>
                  <p className="text-xs text-ink-muted leading-tight">On orders $20+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DELIVERY SEARCH BAR ===== */}
      <section className="bg-white border-y border-line">
        <div className={`${CONTAINER} py-5`}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center gap-2 text-ink-light shrink-0">
              <MapPin size={18} className="text-brand" />
              <span className="font-medium text-sm">Where should we deliver?</span>
            </div>
            <div className="flex-1 min-w-0">
              <input
                type="text"
                placeholder="Enter your delivery address"
                className="w-full px-4 py-2.5 bg-cream border border-line rounded-lg text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
              />
            </div>
            <Link
              to="/locations"
              className="bg-brand hover:bg-brand-dark text-white px-5 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap text-center"
            >
              Find Locations
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-10 sm:py-12 lg:py-16">
        <div className={CONTAINER}>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-1">Browse by Category</h2>
              <p className="text-ink-light text-sm sm:text-base">Find exactly what you're craving</p>
            </div>
            <Link to="/menu" className="text-brand font-semibold text-sm hover:underline hidden sm:block shrink-0">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={cat.path}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] hover:shadow-xl transition-shadow"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient}`} />
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg">{cat.name}</h3>
                  <p className="text-white/80 text-sm">{cat.count} items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POPULAR ITEMS ===== */}
      <section className="py-10 sm:py-12 lg:py-16 bg-white">
        <div className={CONTAINER}>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-1">Popular Items</h2>
              <p className="text-ink-light text-sm sm:text-base">Most ordered by our customers</p>
            </div>
            <Link to="/menu" className="text-brand font-semibold text-sm hover:underline hidden sm:block shrink-0">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularItems.map(item => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-line hover:border-brand/30 hover:shadow-lg transition-all flex flex-col"
              >
                {/* Image — fixed aspect ratio */}
                <div className="aspect-[4/3] overflow-hidden food-img-bg relative shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.popular && (
                    <div className="absolute top-3 left-3 bg-brand text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                      Popular
                    </div>
                  )}
                </div>

                {/* Body — flex column so actions stick to bottom */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-1 mb-1.5">
                    <Star size={13} className="fill-amber text-amber" />
                    <span className="text-sm font-semibold text-ink">4.8</span>
                    <span className="text-xs text-ink-muted">(120+)</span>
                  </div>
                  <h3 className="font-bold text-ink mb-1 group-hover:text-brand transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-ink-light line-clamp-2 mb-4 flex-1">
                    {item.description}
                  </p>
                  {/* Actions — pushed to bottom by flex-1 above */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-brand">${item.price.toFixed(2)}</span>
                    <span className="bg-brand hover:bg-brand-dark text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                      + Add
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-10 sm:py-12 lg:py-16 bg-cream">
        <div className={CONTAINER}>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-1">How It Works</h2>
            <p className="text-ink-light text-sm sm:text-base">Get your food in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: MapPin, title: 'Choose Location', desc: 'Select your delivery address or nearest pickup location', step: '01' },
              { icon: ChefHat, title: 'Pick Your Food', desc: 'Browse menu and customize your order to your liking', step: '02' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Get your food delivered hot and fresh in 30 minutes', step: '03' },
            ].map((item, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-6 border border-line">
                <div className="absolute top-4 right-4 text-5xl font-bold text-brand/10 select-none">{item.step}</div>
                <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-brand" />
                </div>
                <h3 className="font-bold text-ink text-lg mb-1.5">{item.title}</h3>
                <p className="text-ink-light text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUE PROPOSITION BANNER ===== */}
      <section className="py-10 sm:py-12 lg:py-16">
        <div className={CONTAINER}>
          <div className="bg-gradient-to-br from-brand to-brand-dark rounded-2xl p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden">
            {/* Decorative circles — contained within the banner */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full" />

            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                  Fresh ingredients. Great taste.
                </h2>
                <p className="text-white/85 mb-6 leading-relaxed max-w-md">
                  Your next favorite meal is just a few clicks away. We use only the freshest ingredients to bring you delicious food every time.
                </p>
                <Link
                  to="/menu"
                  className="bg-white text-brand hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 text-sm"
                >
                  Order Now <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Clock, title: 'Fast Delivery', desc: '30 min average' },
                  { icon: Truck, title: 'Free Delivery', desc: 'On orders $20+' },
                  { icon: Star, title: 'Top Rated', desc: '4.9/5 rating' },
                  { icon: MapPin, title: '3 Locations', desc: 'Near you' },
                ].map((feat, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-4 border border-white/15">
                    <feat.icon size={24} className="mb-2" />
                    <h3 className="font-bold text-sm mb-0.5">{feat.title}</h3>
                    <p className="text-white/75 text-xs">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-10 sm:py-12 lg:py-16 bg-white">
        <div className={`${CONTAINER} text-center`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-3">Ready to order?</h2>
          <p className="text-ink-light mb-6 max-w-lg mx-auto">
            Discover delicious meals from your favorite restaurants. Order now and get your food delivered fast.
          </p>
          <Link
            to="/menu"
            className="bg-brand hover:bg-brand-dark text-white px-8 py-3.5 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-brand/20"
          >
            Browse Menu <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import { Link, useRouter } from '../router';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount, user, logout } = useApp();
  const { path } = useRouter();
  const cartCount = getCartCount();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/locations', label: 'Locations' },
  ];

  const isActive = (linkPath: string) => {
    if (linkPath === '/') return path === '/' || path === '';
    return path.startsWith(linkPath);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-18">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-3xl group-hover:scale-110 transition-transform">🍕</span>
              <span className="text-xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">FoodHub</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {user && (
                <span className="hidden lg:inline text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                  👋 Hi, {user.name.split(' ')[0]}
                </span>
              )}
              <Link
                to="/cart"
                className="relative p-2.5 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
              {user ? (
                <button
                  onClick={logout}
                  className="hidden sm:block text-sm text-gray-600 hover:text-orange-600 bg-gray-100 hover:bg-orange-50 px-4 py-2 rounded-lg font-medium transition-all"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-orange-600 bg-gray-100 hover:bg-orange-50 px-4 py-2 rounded-lg font-medium transition-all"
                >
                  <User size={16} />
                  <span>Login</span>
                </Link>
              )}
              <button
                className="md:hidden p-2.5 text-gray-600 hover:text-orange-600 hover:bg-gray-100 rounded-xl transition-all"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg font-medium transition-all ${
                    isActive(link.path) ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t border-gray-100">
                {user ? (
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
                  >
                    Logout ({user.name})
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
                  >
                    Login
                  </Link>
                )}
              </div>
              <div className="pt-2 mt-2 border-t border-gray-100">
                <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Internal Tools</p>
                <Link to="/admin" className="block py-2.5 px-4 text-sm text-gray-500 hover:bg-gray-50 rounded-lg">🔧 Admin Panel</Link>
                <Link to="/kitchen" className="block py-2.5 px-4 text-sm text-gray-500 hover:bg-gray-50 rounded-lg">👨‍🍳 Kitchen Display</Link>
                <Link to="/pos" className="block py-2.5 px-4 text-sm text-gray-500 hover:bg-gray-50 rounded-lg">💰 POS System</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🍕</span>
                <span className="text-xl font-extrabold">FoodHub</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">Delicious food delivered to your door. Pizza, burgers, and coffee made with love.</p>
              <div className="flex gap-3 mt-4">
                {['📘', '📸', '🐦', '📺'].map((icon, i) => (
                  <button key={i} className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors text-sm">
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-300">Quick Links</h4>
              <div className="space-y-2.5 text-sm">
                <Link to="/menu" className="block text-gray-400 hover:text-white transition-colors">Menu</Link>
                <Link to="/locations" className="block text-gray-400 hover:text-white transition-colors">Locations</Link>
                <Link to="/cart" className="block text-gray-400 hover:text-white transition-colors">Cart</Link>
                <Link to="/login" className="block text-gray-400 hover:text-white transition-colors">Login</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-300">Internal</h4>
              <div className="space-y-2.5 text-sm">
                <Link to="/admin" className="block text-gray-400 hover:text-white transition-colors">Admin Panel</Link>
                <Link to="/kitchen" className="block text-gray-400 hover:text-white transition-colors">Kitchen Display</Link>
                <Link to="/pos" className="block text-gray-400 hover:text-white transition-colors">POS System</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-300">Contact</h4>
              <div className="space-y-2.5 text-sm text-gray-400">
                <p className="flex items-center gap-2">📞 555-FOOD-HUB</p>
                <p className="flex items-center gap-2">📧 hello@foodhub.com</p>
                <p className="flex items-center gap-2">📍 123 Main Street</p>
                <p className="flex items-center gap-2">🕐 10AM - 11PM Daily</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">© 2026 FoodHub. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientLayout;

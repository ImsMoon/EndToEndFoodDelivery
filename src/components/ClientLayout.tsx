import React, { useState } from 'react';
import { Link, useRouter } from '../router';
import { ShoppingBag, User, Menu, X, MapPin } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white text-lg">🍕</span>
              </div>
              <span className="text-xl font-bold text-text">FoodHub</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-primary bg-primary-light'
                      : 'text-text-secondary hover:text-text hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link
                to="/cart"
                className="relative p-2.5 text-text-secondary hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <button
                  onClick={logout}
                  className="hidden sm:flex items-center gap-2 text-sm text-text-secondary hover:text-text px-3 py-2 rounded-lg hover:bg-gray-50"
                >
                  <User size={16} />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark px-4 py-2.5 rounded-lg transition-colors"
                >
                  <User size={16} />
                  <span>Login</span>
                </Link>
              )}

              <button
                className="md:hidden p-2.5 text-text-secondary hover:text-text hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg font-medium ${
                    isActive(link.path) ? 'bg-primary-light text-primary' : 'text-text-secondary hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-border">
                {user ? (
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-3 px-4 text-text-secondary hover:bg-gray-50 rounded-lg"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 px-4 text-text-secondary hover:bg-gray-50 rounded-lg"
                  >
                    Login
                  </Link>
                )}
              </div>
              <div className="pt-3 mt-3 border-t border-border">
                <p className="px-4 py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">Tools</p>
                <Link to="/admin" className="block py-2.5 px-4 text-sm text-text-secondary hover:bg-gray-50 rounded-lg">Admin</Link>
                <Link to="/kitchen" className="block py-2.5 px-4 text-sm text-text-secondary hover:bg-gray-50 rounded-lg">Kitchen</Link>
                <Link to="/pos" className="block py-2.5 px-4 text-sm text-text-secondary hover:bg-gray-50 rounded-lg">POS</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🍕</span>
                </div>
                <span className="text-lg font-bold text-text">FoodHub</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">Delicious food delivered to your door. Pizza, burgers, and coffee made with love.</p>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-4 text-sm">Explore</h4>
              <div className="space-y-2.5 text-sm">
                <Link to="/menu" className="block text-text-secondary hover:text-primary">Menu</Link>
                <Link to="/locations" className="block text-text-secondary hover:text-primary">Locations</Link>
                <Link to="/cart" className="block text-text-secondary hover:text-primary">Cart</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-4 text-sm">Tools</h4>
              <div className="space-y-2.5 text-sm">
                <Link to="/admin" className="block text-text-secondary hover:text-primary">Admin</Link>
                <Link to="/kitchen" className="block text-text-secondary hover:text-primary">Kitchen</Link>
                <Link to="/pos" className="block text-text-secondary hover:text-primary">POS</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-4 text-sm">Contact</h4>
              <div className="space-y-2.5 text-sm text-text-secondary">
                <p>555-FOOD-HUB</p>
                <p>hello@foodhub.com</p>
                <p>123 Main Street</p>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-10 pt-8 text-center text-sm text-text-muted">
            © 2026 FoodHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientLayout;

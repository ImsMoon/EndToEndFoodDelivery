import React, { useState } from 'react';
import { Link, useRouter } from '../router';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
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
    <div className="flex flex-col bg-cream" style={{ minHeight: '100dvh' }}>
      {/* Header */}
      <header className="bg-white border-b border-line sticky top-0 z-50">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 lg:h-20 gap-4">
            {/* Logo - left */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-9 h-9 bg-brand rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white text-lg">🍕</span>
              </div>
              <span className="text-xl font-bold text-ink">FoodHub</span>
            </Link>

            {/* Navigation - center/left */}
            <nav className="hidden md:flex items-center gap-1 ml-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-brand bg-brand-light'
                      : 'text-ink-light hover:text-ink hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Actions - right */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/cart"
                className="relative p-2.5 text-ink-light hover:text-brand hover:bg-brand-light rounded-lg transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <button
                  onClick={logout}
                  className="hidden sm:flex items-center gap-2 text-sm text-ink-light hover:text-ink px-3 py-2 rounded-lg hover:bg-gray-50"
                >
                  <User size={16} />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-2 text-sm font-medium text-white bg-brand hover:bg-brand-dark px-4 py-2.5 rounded-lg"
                >
                  <User size={16} />
                  <span>Login</span>
                </Link>
              )}

              <button
                className="md:hidden p-2.5 text-ink-light hover:text-ink hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-line">
            <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg font-medium ${
                    isActive(link.path) ? 'bg-brand-light text-brand' : 'text-ink-light hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-line">
                {user ? (
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-3 px-4 text-ink-light hover:bg-gray-50 rounded-lg"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 px-4 text-ink-light hover:bg-gray-50 rounded-lg"
                  >
                    Login
                  </Link>
                )}
              </div>
              <div className="pt-3 mt-3 border-t border-line">
                <p className="px-4 py-2 text-xs font-semibold text-ink-muted uppercase tracking-wider">Tools</p>
                <Link to="/admin" className="block py-2.5 px-4 text-sm text-ink-light hover:bg-gray-50 rounded-lg">Admin</Link>
                <Link to="/kitchen" className="block py-2.5 px-4 text-sm text-ink-light hover:bg-gray-50 rounded-lg">Kitchen</Link>
                <Link to="/pos" className="block py-2.5 px-4 text-sm text-ink-light hover:bg-gray-50 rounded-lg">POS</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main content - grows to fill available space */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-line">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8">
            <div className="col-span-2 md:col-span-4">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🍕</span>
                </div>
                <span className="text-lg font-bold text-ink">FoodHub</span>
              </div>
              <p className="text-sm text-ink-light leading-relaxed max-w-xs">Delicious food delivered to your door. Pizza, burgers, and coffee made with love.</p>
            </div>
            <div className="md:col-span-2 md:col-start-6">
              <h4 className="font-semibold text-ink mb-4 text-sm">Explore</h4>
              <div className="space-y-2.5 text-sm">
                <Link to="/menu" className="block text-ink-light hover:text-brand">Menu</Link>
                <Link to="/locations" className="block text-ink-light hover:text-brand">Locations</Link>
                <Link to="/cart" className="block text-ink-light hover:text-brand">Cart</Link>
              </div>
            </div>
            <div className="md:col-span-2">
              <h4 className="font-semibold text-ink mb-4 text-sm">Tools</h4>
              <div className="space-y-2.5 text-sm">
                <Link to="/admin" className="block text-ink-light hover:text-brand">Admin</Link>
                <Link to="/kitchen" className="block text-ink-light hover:text-brand">Kitchen</Link>
                <Link to="/pos" className="block text-ink-light hover:text-brand">POS</Link>
              </div>
            </div>
            <div className="md:col-span-2">
              <h4 className="font-semibold text-ink mb-4 text-sm">Contact</h4>
              <div className="space-y-2.5 text-sm text-ink-light">
                <p>555-FOOD-HUB</p>
                <p>hello@foodhub.com</p>
                <p>123 Main Street</p>
              </div>
            </div>
          </div>
          <div className="border-t border-line mt-10 pt-8 text-center text-sm text-ink-muted">
            © 2026 FoodHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientLayout;

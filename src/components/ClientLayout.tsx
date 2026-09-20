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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <span className="text-2xl">🍕</span>
              <span>FoodHub</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium ${
                    isActive(link.path) ? 'text-black' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link
                to="/cart"
                className="relative p-2 hover:bg-gray-100 rounded-lg"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <button
                  onClick={logout}
                  className="hidden sm:block text-sm text-gray-600 hover:text-black"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-2 text-sm text-gray-600 hover:text-black"
                >
                  <User size={16} />
                  <span>Login</span>
                </Link>
              )}

              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-3 rounded-lg font-medium ${
                    isActive(link.path) ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-gray-200">
                {user ? (
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-3 px-3 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 px-3 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    Login
                  </Link>
                )}
              </div>
              <div className="pt-3 mt-3 border-t border-gray-200">
                <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase">Tools</p>
                <Link to="/admin" className="block py-2 px-3 text-sm text-gray-500 hover:bg-gray-50 rounded-lg">Admin</Link>
                <Link to="/kitchen" className="block py-2 px-3 text-sm text-gray-500 hover:bg-gray-50 rounded-lg">Kitchen</Link>
                <Link to="/pos" className="block py-2 px-3 text-sm text-gray-500 hover:bg-gray-50 rounded-lg">POS</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🍕</span>
                <span className="font-bold text-lg">FoodHub</span>
              </div>
              <p className="text-sm text-gray-600">Delicious food delivered fast.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Menu</h4>
              <div className="space-y-2 text-sm">
                <Link to="/menu" className="block text-gray-600 hover:text-black">All Items</Link>
                <Link to="/locations" className="block text-gray-600 hover:text-black">Locations</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Tools</h4>
              <div className="space-y-2 text-sm">
                <Link to="/admin" className="block text-gray-600 hover:text-black">Admin</Link>
                <Link to="/kitchen" className="block text-gray-600 hover:text-black">Kitchen</Link>
                <Link to="/pos" className="block text-gray-600 hover:text-black">POS</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Contact</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>555-FOOD-HUB</p>
                <p>hello@foodhub.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2026 FoodHub
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientLayout;

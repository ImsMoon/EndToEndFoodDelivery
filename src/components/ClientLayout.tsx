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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-3xl">🍕</span>
              <span className="text-xl font-bold text-orange-600">FoodHub</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path} className={`text-sm font-medium transition-colors ${path === link.path ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'}`}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              {user && <span className="hidden sm:inline text-sm text-gray-600">Hi, {user.name}</span>}
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{cartCount}</span>
                )}
              </Link>
              {user ? (
                <button onClick={logout} className="hidden sm:block text-sm text-gray-600 hover:text-orange-600">Logout</button>
              ) : (
                <Link to="/login" className="hidden sm:flex items-center gap-1 text-sm text-gray-600 hover:text-orange-600">
                  <User size={18} /><span>Login</span>
                </Link>
              )}
              <button className="md:hidden p-2 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-600 hover:text-orange-600">{link.label}</Link>
              ))}
              {user ? (
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block py-2 text-gray-600">Logout ({user.name})</button>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-600">Login</Link>
              )}
              <hr className="my-2" />
              <Link to="/admin" className="block py-2 text-xs text-gray-400">Admin Panel</Link>
              <Link to="/kitchen" className="block py-2 text-xs text-gray-400">Kitchen Display</Link>
              <Link to="/pos" className="block py-2 text-xs text-gray-400">POS System</Link>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4"><span className="text-2xl">🍕</span><span className="text-lg font-bold">FoodHub</span></div>
              <p className="text-gray-400 text-sm">Delicious food delivered to your door. Pizza, burgers, and coffee made with love.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <Link to="/menu" className="block hover:text-white">Menu</Link>
                <Link to="/locations" className="block hover:text-white">Locations</Link>
                <Link to="/cart" className="block hover:text-white">Cart</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Internal</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <Link to="/admin" className="block hover:text-white">Admin Panel</Link>
                <Link to="/kitchen" className="block hover:text-white">Kitchen Display</Link>
                <Link to="/pos" className="block hover:text-white">POS System</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📞 555-FOOD-HUB</p>
                <p>📧 hello@foodhub.com</p>
                <p>📍 123 Main Street</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">© 2026 FoodHub. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default ClientLayout;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from '../../router';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useApp();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const total = getCartTotal();
  const deliveryFee = total > 20 ? 0 : 3.99;
  const tax = total * 0.08;
  const grandTotal = total + deliveryFee + tax;

  useEffect(() => {
    setLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <span className="text-8xl block mb-6">🛒</span>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 text-lg">Looks like you haven't added anything yet. Browse our menu to find something delicious!</p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-700 transition-all hover:scale-105 shadow-lg shadow-orange-200"
          >
            <ShoppingBag size={20} /> Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <button onClick={() => window.history.back()} className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-6 font-medium group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Continue Shopping
      </button>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Your Cart</h1>
          <p className="text-gray-500 mt-1">{cart.reduce((s, i) => s + i.quantity, 0)} items in your cart</p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1 hover:bg-red-50 px-3 py-2 rounded-lg transition-all"
        >
          <Trash2 size={14} /> Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 flex gap-4 group">
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 flex items-center justify-center w-24 h-24 flex-shrink-0 group-hover:scale-105 transition-transform">
                <span className="text-4xl">{item.product.image}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-800 text-lg">{item.product.name}</h3>
                    {item.selectedVariant && (
                      <p className="text-sm text-gray-500 mt-0.5">{item.selectedVariant.name}</p>
                    )}
                    {item.selectedAddons.length > 0 && (
                      <p className="text-sm text-gray-500 mt-0.5">
                        + {item.selectedAddons.map(a => a.name).join(', ')}
                      </p>
                    )}
                    {item.notes && (
                      <p className="text-xs text-orange-600 mt-1.5 bg-orange-50 inline-block px-2 py-1 rounded-md">
                        📝 {item.notes}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-gray-300 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white">
                    <button
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-l-xl transition-all"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 text-sm font-bold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-r-xl transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-bold text-orange-600 text-lg">
                    ${(item.totalPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Order Summary</h2>
            
            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                {deliveryFee === 0 ? (
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <Tag size={12} /> FREE
                  </span>
                ) : (
                  <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                )}
              </div>
              {deliveryFee > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-xs text-green-700 font-medium">
                    🎉 Add ${(20 - total).toFixed(2)} more for free delivery!
                  </p>
                  <div className="mt-2 bg-green-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full transition-all" style={{ width: `${Math.min(100, (total / 20) * 100)}%` }} />
                  </div>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
            </div>
            
            <hr className="my-4" />
            
            <div className="flex justify-between font-bold text-gray-800 text-xl mb-6">
              <span>Total</span>
              <span className="text-orange-600">${grandTotal.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-orange-600 text-white text-center py-4 rounded-xl font-bold hover:bg-orange-700 transition-all hover:shadow-lg hover:shadow-orange-200 hover:scale-[1.02] text-lg"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/menu"
              className="block w-full mt-3 text-center text-orange-600 font-medium text-sm hover:underline py-2"
            >
              + Add More Items
            </Link>

            {/* Trust badges */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="text-xl block mb-1">🔒</span>
                  <span className="text-xs text-gray-500">Secure</span>
                </div>
                <div>
                  <span className="text-xl block mb-1">⚡</span>
                  <span className="text-xs text-gray-500">Fast</span>
                </div>
                <div>
                  <span className="text-xl block mb-1">✅</span>
                  <span className="text-xs text-gray-500">Fresh</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import React from 'react';
import { Link, useNavigate } from '../../router';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useApp();
  const navigate = useNavigate();
  const total = getCartTotal();
  const deliveryFee = total > 20 ? 0 : 3.99;
  const tax = total * 0.08;
  const grandTotal = total + deliveryFee + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some items to get started</p>
        <Link
          to="/menu"
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 inline-block"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={() => window.history.back()} className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 font-medium">
        <ArrowLeft size={18} /> Continue Shopping
      </button>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <button onClick={clearCart} className="text-sm text-red-600 hover:text-red-700 font-medium">
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">
              <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center w-20 h-20 flex-shrink-0">
                <span className="text-3xl">{item.product.image}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                    {item.selectedVariant && <p className="text-sm text-gray-600">{item.selectedVariant.name}</p>}
                    {item.selectedAddons.length > 0 && (
                      <p className="text-sm text-gray-600">+ {item.selectedAddons.map(a => a.name).join(', ')}</p>
                    )}
                  </div>
                  <button onClick={() => removeFromCart(index)} className="text-gray-400 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button onClick={() => updateQuantity(index, item.quantity - 1)} className="p-2 hover:bg-gray-100">
                      <Minus size={14} />
                    </button>
                    <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, item.quantity + 1)} className="p-2 hover:bg-gray-100">
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-bold text-lg">${(item.totalPrice * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className="font-medium">{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-black text-white text-center py-3 rounded-lg font-semibold hover:bg-gray-800"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

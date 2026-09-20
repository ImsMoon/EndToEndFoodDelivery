import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <span className="text-8xl block mb-6">🛒</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some delicious items to get started!</p>
        <Link to="/menu" className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors">
          <ShoppingBag size={18} /> Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-6">
        <ArrowLeft size={18} /> Continue Shopping
      </button>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4">
              <div className="bg-orange-50 rounded-lg p-4 flex items-center justify-center w-20 h-20 flex-shrink-0">
                <span className="text-4xl">{item.product.image}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                    {item.selectedVariant && <p className="text-sm text-gray-500">{item.selectedVariant.name}</p>}
                    {item.selectedAddons.length > 0 && <p className="text-sm text-gray-500">+ {item.selectedAddons.map(a => a.name).join(', ')}</p>}
                    {item.notes && <p className="text-xs text-orange-600 mt-1 italic">Note: {item.notes}</p>}
                  </div>
                  <button onClick={() => removeFromCart(index)} className="text-gray-400 hover:text-red-500 p-1"><Trash2 size={18} /></button>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button onClick={() => updateQuantity(index, item.quantity - 1)} className="p-2 text-gray-600 hover:text-orange-600"><Minus size={14} /></button>
                    <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, item.quantity + 1)} className="p-2 text-gray-600 hover:text-orange-600"><Plus size={14} /></button>
                  </div>
                  <span className="font-bold text-orange-600">${(item.totalPrice * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-600 font-medium">Clear Cart</button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span><span>${total.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Delivery Fee</span><span>{deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `$${deliveryFee.toFixed(2)}`}</span></div>
              {deliveryFee > 0 && <p className="text-xs text-green-600">Add ${(20 - total).toFixed(2)} more for free delivery!</p>}
              <div className="flex justify-between text-gray-600"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
              <hr />
              <div className="flex justify-between font-bold text-gray-800 text-lg"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
            </div>
            <Link to="/checkout" className="block w-full mt-6 bg-orange-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">Proceed to Checkout</Link>
            <Link to="/menu" className="block w-full mt-3 text-center text-orange-600 font-medium text-sm hover:underline">Add More Items</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import React from 'react';
import { Link, useNavigate } from '../../router';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-ink-muted mb-6" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-ink-light mb-8">Add some items to get started</p>
        <Link to="/menu" className="bg-brand hover:bg-brand-dark text-white px-8 py-4 rounded-xl font-semibold inline-block">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => window.history.back()} className="flex items-center gap-2 text-ink-light hover:text-brand mb-6 font-medium">
        <ArrowLeft size={18} /> Continue Shopping
      </button>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-600 font-medium">Clear All</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="bg-white border border-line rounded-2xl p-5 flex gap-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 food-img-bg">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-ink">{item.product.name}</h3>
                    {item.selectedVariant && <p className="text-sm text-ink-light">{item.selectedVariant.name}</p>}
                    {item.selectedAddons.length > 0 && <p className="text-sm text-ink-light">+ {item.selectedAddons.map(a => a.name).join(', ')}</p>}
                  </div>
                  <button onClick={() => removeFromCart(index)} className="text-ink-muted hover:text-red-500 p-1">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center border border-line rounded-xl bg-white">
                    <button onClick={() => updateQuantity(index, item.quantity - 1)} className="p-2 hover:bg-gray-50"><Minus size={14} /></button>
                    <span className="px-3 text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, item.quantity + 1)} className="p-2 hover:bg-gray-50"><Plus size={14} /></button>
                  </div>
                  <span className="font-bold text-lg text-brand">${(item.totalPrice * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-line rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm mb-4">
              <div className="flex justify-between"><span className="text-ink-light">Subtotal</span><span className="font-medium">${total.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-ink-light">Delivery</span><span className="font-medium">{deliveryFee === 0 ? <span className="text-green">FREE</span> : `$${deliveryFee.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-ink-light">Tax</span><span className="font-medium">${tax.toFixed(2)}</span></div>
            </div>
            <div className="border-t border-line pt-4 mb-6">
              <div className="flex justify-between font-bold text-xl"><span>Total</span><span className="text-brand">${grandTotal.toFixed(2)}</span></div>
            </div>
            <Link to="/checkout" className="block w-full bg-brand hover:bg-brand-dark text-white text-center py-4 rounded-xl font-bold">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

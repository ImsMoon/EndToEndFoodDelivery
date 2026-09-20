import React, { useState } from 'react';
import { products } from '../../data/mockData';
import { Search, ShoppingCart, Trash2, CreditCard, Banknote, ArrowLeft, Check, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface POSItem { product: typeof products[0]; quantity: number; variant?: typeof products[0]['variants'][0]; totalPrice: number; }

const POS: React.FC = () => {
  const [cart, setCart] = useState<POSItem[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | ''>('');
  const [cashReceived, setCashReceived] = useState('');

  const categories = [
    { id: 'all', name: 'All', emoji: '🍽️' },
    { id: 'pizza', name: 'Pizza', emoji: '🍕' },
    { id: 'burger', name: 'Burgers', emoji: '🍔' },
    { id: 'coffee', name: 'Coffee', emoji: '☕' },
    { id: 'sides', name: 'Sides', emoji: '🍟' },
    { id: 'desserts', name: 'Desserts', emoji: '🍰' },
  ];

  const filteredProducts = products.filter(p => {
    const matchCategory = category === 'all' || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const addToCart = (product: typeof products[0]) => {
    const existing = cart.find(c => c.product.id === product.id);
    if (existing) {
      setCart(cart.map(c => c.product.id === product.id ? { ...c, quantity: c.quantity + 1, totalPrice: (c.quantity + 1) * (c.product.price + (c.variant?.priceModifier || 0)) } : c));
    } else {
      setCart([...cart, { product, quantity: 1, variant: product.variants[0], totalPrice: product.price + (product.variants[0]?.priceModifier || 0) }]);
    }
  };

  const updateQty = (index: number, delta: number) => {
    const newQty = cart[index].quantity + delta;
    if (newQty <= 0) setCart(cart.filter((_, i) => i !== index));
    else setCart(cart.map((c, i) => i === index ? { ...c, quantity: newQty, totalPrice: newQty * (c.product.price + (c.variant?.priceModifier || 0)) } : c));
  };

  const removeItem = (index: number) => setCart(cart.filter((_, i) => i !== index));
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePayment = (method: 'card' | 'cash') => {
    setPaymentMethod(method);
    if (method === 'cash') setShowPayment(true);
    else { setPaymentComplete(true); setTimeout(() => { setPaymentComplete(false); setCart([]); setShowPayment(false); }, 2000); }
  };

  const handleCashPayment = () => {
    setPaymentComplete(true);
    setTimeout(() => { setPaymentComplete(false); setCart([]); setShowPayment(false); setCashReceived(''); setPaymentMethod(''); }, 2000);
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="text-green-600" size={40} /></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-500">Total: ${total.toFixed(2)}</p>
          {paymentMethod === 'cash' && cashReceived && <p className="text-sm text-gray-500 mt-2">Change: ${(parseFloat(cashReceived) - total).toFixed(2)}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></Link>
          <div className="flex items-center gap-2"><span className="text-2xl">💰</span><h1 className="text-lg font-bold text-gray-800">POS System</h1></div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500"><span>Cashier: Tom</span><span>{new Date().toLocaleDateString()}</span></div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-4 overflow-auto">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white" />
          </div>
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setCategory(cat.id)} className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${category === cat.id ? 'bg-orange-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300'}`}>
                <span>{cat.emoji}</span><span>{cat.name}</span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredProducts.map(product => (
              <button key={product.id} onClick={() => addToCart(product)} className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-orange-300 active:scale-95">
                <span className="text-4xl block mb-2">{product.image}</span>
                <p className="font-medium text-gray-800 text-sm truncate">{product.name}</p>
                <p className="text-orange-600 font-bold text-sm mt-1">${product.price.toFixed(2)}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2"><ShoppingCart size={18} className="text-orange-600" /><h2 className="font-bold text-gray-800">Current Order</h2><span className="ml-auto bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-bold">{cart.reduce((s, i) => s + i.quantity, 0)} items</span></div>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-400"><ShoppingCart size={40} className="mx-auto mb-2 opacity-50" /><p className="text-sm">No items yet</p></div>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                  <span className="text-2xl">{item.product.image}</span>
                  <div className="flex-1 min-w-0"><p className="font-medium text-gray-800 text-sm truncate">{item.product.name}</p><p className="text-xs text-gray-500">${item.product.price.toFixed(2)} each</p></div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateQty(index, -1)} className="w-6 h-6 rounded bg-gray-200 flex items-center justify-center hover:bg-gray-300"><Minus size={12} /></button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQty(index, 1)} className="w-6 h-6 rounded bg-gray-200 flex items-center justify-center hover:bg-gray-300"><Plus size={12} /></button>
                  </div>
                  <div className="text-right"><p className="font-bold text-sm text-gray-800">${item.totalPrice.toFixed(2)}</p><button onClick={() => removeItem(index)} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button></div>
                </div>
              ))
            )}
          </div>
          <div className="border-t border-gray-100 p-4 space-y-3">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg text-gray-800 pt-2 border-t"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            {showPayment && paymentMethod === 'cash' && (
              <div className="bg-gray-50 rounded-lg p-3">
                <label className="text-sm font-medium text-gray-700">Cash Received</label>
                <input type="number" value={cashReceived} onChange={(e) => setCashReceived(e.target.value)} className="w-full mt-1 p-2 border border-gray-200 rounded-lg text-lg font-bold" placeholder="0.00" />
                {cashReceived && parseFloat(cashReceived) >= total && <p className="text-green-600 font-medium text-sm mt-1">Change: ${(parseFloat(cashReceived) - total).toFixed(2)}</p>}
                <button onClick={handleCashPayment} disabled={!cashReceived || parseFloat(cashReceived) < total} className="w-full mt-2 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50">Complete Cash Payment</button>
              </div>
            )}
            {!showPayment && cart.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handlePayment('card')} className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"><CreditCard size={16} /> Card</button>
                <button onClick={() => handlePayment('cash')} className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700"><Banknote size={16} /> Cash</button>
              </div>
            )}
            {cart.length > 0 && <button onClick={() => setCart([])} className="w-full text-sm text-red-500 hover:text-red-600 font-medium">Clear Order</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;

import React, { useState } from 'react';
import { products } from '../../data/mockData';
import { Search, ShoppingCart, Trash2, ArrowLeft, Check, Plus, Minus } from 'lucide-react';
import { Link } from '../../router';

interface POSItem { product: typeof products[0]; quantity: number; totalPrice: number; }

const POS: React.FC = () => {
  const [cart, setCart] = useState<POSItem[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [total, setTotal] = useState(0);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'burger', name: 'Burgers' },
    { id: 'coffee', name: 'Coffee' },
    { id: 'sides', name: 'Sides' },
  ];

  const filteredProducts = products.filter(p => {
    const matchCategory = category === 'all' || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const addToCart = (product: typeof products[0]) => {
    const existing = cart.find(c => c.product.id === product.id);
    if (existing) {
      setCart(cart.map(c => c.product.id === product.id ? { ...c, quantity: c.quantity + 1, totalPrice: (c.quantity + 1) * c.product.price } : c));
    } else {
      setCart([...cart, { product, quantity: 1, totalPrice: product.price }]);
    }
  };

  const updateQty = (index: number, delta: number) => {
    const newQty = cart[index].quantity + delta;
    if (newQty <= 0) setCart(cart.filter((_, i) => i !== index));
    else setCart(cart.map((c, i) => i === index ? { ...c, quantity: newQty, totalPrice: newQty * c.product.price } : c));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + tax;

  const handlePayment = () => {
    setTotal(grandTotal);
    setPaymentComplete(true);
    setTimeout(() => { setPaymentComplete(false); setCart([]); }, 2000);
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 text-center">
          <Check size={48} className="text-green mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Payment Successful</h2>
          <p className="text-ink-light">Total: ${total.toFixed(2)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="bg-white border-b border-line px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-ink-muted hover:text-ink"><ArrowLeft size={20} /></Link>
          <h1 className="text-lg font-bold">POS</h1>
        </div>
        <div className="text-sm text-ink-light">{new Date().toLocaleDateString()}</div>
      </header>

      <div className="flex-1 flex">
        <div className="flex-1 p-4 overflow-auto">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" size={18} />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-line rounded-xl bg-white" />
          </div>
          <div className="flex gap-2 mb-4">
            {categories.map(cat => (<button key={cat.id} onClick={() => setCategory(cat.id)} className={`px-4 py-2 rounded-xl text-sm font-medium ${category === cat.id ? 'bg-brand text-white' : 'bg-white border border-line'}`}>{cat.name}</button>))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredProducts.map(product => (
              <button key={product.id} onClick={() => addToCart(product)} className="bg-white border border-line rounded-xl p-4 text-center hover:border-brand/30 hover:shadow-md transition-all">
                <div className="aspect-square rounded-lg overflow-hidden food-img-bg mb-2">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-medium text-sm truncate">{product.name}</p>
                <p className="font-bold text-sm text-brand mt-1">${product.price.toFixed(2)}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="w-80 bg-white border-l border-line flex flex-col">
          <div className="p-4 border-b border-line">
            <div className="flex items-center gap-2"><ShoppingCart size={18} className="text-brand" /><h2 className="font-bold">Order</h2><span className="ml-auto bg-brand-light text-brand text-xs px-2 py-1 rounded-lg font-semibold">{cart.reduce((s, i) => s + i.quantity, 0)}</span></div>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-ink-muted"><ShoppingCart size={32} className="mx-auto mb-2 opacity-50" /><p className="text-sm">No items</p></div>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-cream rounded-xl p-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"><img src={item.product.image} alt="" className="w-full h-full object-cover" /></div>
                  <div className="flex-1 min-w-0"><p className="font-medium text-sm truncate">{item.product.name}</p><p className="text-xs text-ink-light">${item.product.price.toFixed(2)}</p></div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateQty(index, -1)} className="w-6 h-6 rounded bg-gray-200 flex items-center justify-center hover:bg-gray-300"><Minus size={12} /></button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQty(index, 1)} className="w-6 h-6 rounded bg-gray-200 flex items-center justify-center hover:bg-gray-300"><Plus size={12} /></button>
                  </div>
                  <button onClick={() => updateQty(index, -item.quantity)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                </div>
              ))
            )}
          </div>
          <div className="border-t border-line p-4">
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between"><span className="text-ink-light">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-ink-light">Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-line"><span>Total</span><span className="text-brand">${grandTotal.toFixed(2)}</span></div>
            </div>
            {cart.length > 0 && (<button onClick={handlePayment} className="w-full bg-brand hover:bg-brand-dark text-white py-3 rounded-xl font-bold">Pay ${grandTotal.toFixed(2)}</button>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;

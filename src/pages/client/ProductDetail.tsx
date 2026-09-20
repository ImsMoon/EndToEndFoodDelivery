import React, { useState } from 'react';
import { useParams, useNavigate } from '../../router';
import { Minus, Plus, ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import { products, Variant, Addon } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const ProductDetail: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const { addToCart } = useApp();
  const product = products.find(p => p.id === id);

  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(product?.variants[0]);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <span className="text-6xl block mb-4">😕</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product not found</h2>
        <button onClick={() => navigate('/menu')} className="text-orange-600 hover:underline">Back to Menu</button>
      </div>
    );
  }

  const variantPrice = selectedVariant?.priceModifier || 0;
  const addonsPrice = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = product.price + variantPrice + addonsPrice;
  const totalPrice = unitPrice * quantity;

  const toggleAddon = (addon: Addon) => {
    if (selectedAddons.find(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedVariant, selectedAddons, notes);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => window.history.back()} className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-6">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-12 flex items-center justify-center">
          <span className="text-[120px] md:text-[180px]">{product.image}</span>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-medium capitalize">{product.category}</span>
            <div className="flex items-center gap-1"><Star size={14} className="text-yellow-500 fill-yellow-500" /><span className="text-sm text-gray-500">4.8 (120+ reviews)</span></div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="text-3xl font-bold text-orange-600 mb-6">${unitPrice.toFixed(2)}</div>

          {product.variants.length > 1 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Choose Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map(variant => (
                  <button key={variant.id} onClick={() => setSelectedVariant(variant)} className={`px-4 py-2 rounded-lg border-2 transition-all ${selectedVariant?.id === variant.id ? 'border-orange-600 bg-orange-50 text-orange-600' : 'border-gray-200 text-gray-600 hover:border-orange-300'}`}>
                    <span className="font-medium">{variant.name}</span>
                    {variant.priceModifier > 0 && <span className="text-sm ml-1">(+${variant.priceModifier.toFixed(2)})</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.addons.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Add Extras</h3>
              <div className="space-y-2">
                {product.addons.map(addon => {
                  const isSelected = selectedAddons.find(a => a.id === addon.id);
                  return (
                    <button key={addon.id} onClick={() => toggleAddon(addon)} className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${isSelected ? 'border-orange-600 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isSelected ? 'border-orange-600 bg-orange-600' : 'border-gray-300'}`}>
                          {isSelected && <span className="text-white text-xs">✓</span>}
                        </div>
                        <span className="font-medium text-gray-700">{addon.name}</span>
                      </div>
                      <span className="text-orange-600 font-medium">+${addon.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Special Instructions</h3>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special requests? (e.g., extra crispy, no onions, allergy info...)" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none" rows={3} />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-gray-600 hover:text-orange-600"><Minus size={18} /></button>
              <span className="px-4 font-semibold text-gray-800">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-gray-600 hover:text-orange-600"><Plus size={18} /></button>
            </div>
            <button onClick={handleAddToCart} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${added ? 'bg-green-600 text-white' : 'bg-orange-600 text-white hover:bg-orange-700'}`}>
              <ShoppingCart size={18} />{added ? 'Added to Cart!' : `Add to Cart — $${totalPrice.toFixed(2)}`}
            </button>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm text-gray-600"><span>Base price</span><span>${product.price.toFixed(2)}</span></div>
            {variantPrice > 0 && <div className="flex justify-between text-sm text-gray-600"><span>{selectedVariant?.name}</span><span>+${variantPrice.toFixed(2)}</span></div>}
            {selectedAddons.map(addon => (<div key={addon.id} className="flex justify-between text-sm text-gray-600"><span>{addon.name}</span><span>+${addon.price.toFixed(2)}</span></div>))}
            {quantity > 1 && <div className="flex justify-between text-sm text-gray-600"><span>Quantity</span><span>×{quantity}</span></div>}
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-gray-800"><span>Total</span><span>${totalPrice.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

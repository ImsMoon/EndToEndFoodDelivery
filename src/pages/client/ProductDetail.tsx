import React, { useState } from 'react';
import { useParams, useNavigate } from '../../router';
import { Minus, Plus, ArrowLeft } from 'lucide-react';
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button onClick={() => navigate('/menu')} className="text-black underline">
          Back to Menu
        </button>
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 font-medium"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-xl p-12 flex items-center justify-center">
          <span className="text-[150px] md:text-[200px]">{product.image}</span>
        </div>

        {/* Product Details */}
        <div>
          <span className="text-sm text-gray-600 capitalize mb-2 block">{product.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-6">{product.description}</p>
          
          <div className="text-3xl font-bold mb-8">${unitPrice.toFixed(2)}</div>

          {/* Variants */}
          {product.variants.length > 1 && (
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map(variant => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded-lg border-2 font-medium ${
                      selectedVariant?.id === variant.id
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {variant.name}
                    {variant.priceModifier > 0 && (
                      <span className="ml-2 text-sm">(+${variant.priceModifier.toFixed(2)})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Addons */}
          {product.addons.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Add Extras</h3>
              <div className="space-y-2">
                {product.addons.map(addon => {
                  const isSelected = selectedAddons.find(a => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border-2 ${
                        isSelected
                          ? 'border-black bg-gray-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <span className="font-medium">{addon.name}</span>
                      <span className="font-semibold">+${addon.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="mb-8">
            <label className="block font-semibold text-gray-900 mb-2">Special Instructions</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black resize-none"
              rows={3}
            />
          </div>

          {/* Quantity & Add */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-gray-100"
              >
                <Minus size={18} />
              </button>
              <span className="px-4 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-gray-100"
              >
                <Plus size={18} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 rounded-lg font-semibold ${
                added ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {added ? 'Added!' : `Add to Cart — $${totalPrice.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

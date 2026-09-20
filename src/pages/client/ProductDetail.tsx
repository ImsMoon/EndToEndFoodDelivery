import React, { useState } from 'react';
import { useParams, useNavigate } from '../../router';
import { Minus, Plus, ShoppingCart, ArrowLeft, Star, Check } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button onClick={() => navigate('/menu')} className="text-primary hover:underline font-semibold">
          ← Back to Menu
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-text-secondary hover:text-primary mb-6 font-medium"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white rounded-3xl overflow-hidden border border-border">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* Product Details */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-primary-light text-primary text-xs px-3 py-1.5 rounded-lg font-semibold capitalize">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-warning text-warning" />
              <span className="text-sm font-medium text-text">4.8</span>
              <span className="text-xs text-text-muted">(120+ reviews)</span>
            </div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-text mb-4">{product.name}</h1>
          <p className="text-lg text-text-secondary mb-6 leading-relaxed">{product.description}</p>
          
          <div className="text-4xl font-bold text-primary mb-8">${unitPrice.toFixed(2)}</div>

          {/* Variants */}
          {product.variants.length > 1 && (
            <div className="mb-8">
              <h3 className="font-bold text-text mb-3 text-lg">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map(variant => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-5 py-3 rounded-xl border-2 font-medium transition-colors ${
                      selectedVariant?.id === variant.id
                        ? 'border-primary bg-primary-light text-primary'
                        : 'border-border text-text-secondary hover:border-primary/30'
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
              <h3 className="font-bold text-text mb-3 text-lg">Add Extras</h3>
              <div className="space-y-2">
                {product.addons.map(addon => {
                  const isSelected = selectedAddons.find(a => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-colors ${
                        isSelected
                          ? 'border-primary bg-primary-light'
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected ? 'border-primary bg-primary' : 'border-border'
                        }`}>
                          {isSelected && <Check size={12} className="text-white" />}
                        </div>
                        <span className="font-medium text-text">{addon.name}</span>
                      </div>
                      <span className="font-semibold text-primary">+${addon.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="mb-8">
            <label className="block font-bold text-text mb-2 text-lg">Special Instructions</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests..."
              className="w-full p-4 bg-white border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
              rows={3}
            />
          </div>

          {/* Quantity & Add */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center bg-white border border-border rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3.5 hover:bg-gray-50"
              >
                <Minus size={18} />
              </button>
              <span className="px-5 font-bold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3.5 hover:bg-gray-50"
              >
                <Plus size={18} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 rounded-xl font-bold text-lg transition-colors ${
                added ? 'bg-success text-white' : 'bg-primary hover:bg-primary-dark text-white'
              }`}
            >
              {added ? '✓ Added to Cart!' : `Add to Cart — $${totalPrice.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

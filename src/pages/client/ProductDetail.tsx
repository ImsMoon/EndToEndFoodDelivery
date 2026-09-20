import React, { useState, useEffect } from 'react';
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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <span className="text-7xl block mb-4">😕</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product not found</h2>
        <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/menu')} className="text-orange-600 hover:underline font-medium">
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
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-6 font-medium group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
          <span className="text-[120px] md:text-[180px] lg:text-[200px] hover:scale-110 transition-transform duration-500">{product.image}</span>
          {product.popular && (
            <span className="absolute top-4 left-4 bg-orange-600 text-white text-sm px-4 py-2 rounded-full font-medium shadow-lg">
              🔥 Popular Choice
            </span>
          )}
        </div>

        {/* Product Details */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1.5 rounded-full font-semibold capitalize">
              {product.category}
            </span>
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span className="text-sm text-gray-600 font-medium">4.8</span>
              <span className="text-xs text-gray-400">(120+ reviews)</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">{product.description}</p>
          
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-4xl font-bold text-orange-600">${unitPrice.toFixed(2)}</span>
            {(variantPrice > 0 || addonsPrice > 0) && (
              <span className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
            )}
          </div>

          {/* Variants */}
          {product.variants.length > 1 && (
            <div className="mb-8">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">Choose Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map(variant => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-5 py-3 rounded-xl border-2 transition-all font-medium ${
                      selectedVariant?.id === variant.id
                        ? 'border-orange-600 bg-orange-50 text-orange-600 shadow-md shadow-orange-100'
                        : 'border-gray-200 text-gray-600 hover:border-orange-300 hover:bg-orange-50/50'
                    }`}
                  >
                    <span>{variant.name}</span>
                    {variant.priceModifier > 0 && (
                      <span className="text-sm ml-2 opacity-75">(+${variant.priceModifier.toFixed(2)})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Addons */}
          {product.addons.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">Add Extras</h3>
              <div className="space-y-2">
                {product.addons.map(addon => {
                  const isSelected = selectedAddons.find(a => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-orange-600 bg-orange-50 shadow-md shadow-orange-100'
                          : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                          isSelected ? 'border-orange-600 bg-orange-600' : 'border-gray-300'
                        }`}>
                          {isSelected && <Check size={14} className="text-white" />}
                        </div>
                        <span className="font-medium text-gray-700">{addon.name}</span>
                      </div>
                      <span className="text-orange-600 font-bold">+${addon.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Notes */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-3 text-lg">Special Instructions</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests? (e.g., extra crispy, no onions, allergy info...)"
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-gray-700"
              rows={3}
            />
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3.5 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-l-xl transition-all"
              >
                <Minus size={18} />
              </button>
              <span className="px-5 font-bold text-gray-800 text-lg min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3.5 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-r-xl transition-all"
              >
                <Plus size={18} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all ${
                added
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                  : 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-200 hover:scale-[1.02]'
              }`}
            >
              {added ? (
                <>
                  <Check size={20} />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart size={20} />
                  Add to Cart — ${totalPrice.toFixed(2)}
                </>
              )}
            </button>
          </div>

          {/* Price Breakdown */}
          <div className="mt-6 p-5 bg-gradient-to-br from-gray-50 to-orange-50/30 rounded-xl border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-3">Price Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Base price</span>
                <span className="font-medium">${product.price.toFixed(2)}</span>
              </div>
              {variantPrice > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>{selectedVariant?.name}</span>
                  <span className="font-medium">+${variantPrice.toFixed(2)}</span>
                </div>
              )}
              {selectedAddons.map(addon => (
                <div key={addon.id} className="flex justify-between text-gray-600">
                  <span>{addon.name}</span>
                  <span className="font-medium">+${addon.price.toFixed(2)}</span>
                </div>
              ))}
              {quantity > 1 && (
                <div className="flex justify-between text-gray-600">
                  <span>Quantity</span>
                  <span className="font-medium">×{quantity}</span>
                </div>
              )}
              <hr className="my-3 border-gray-200" />
              <div className="flex justify-between font-bold text-gray-800 text-lg">
                <span>Total</span>
                <span className="text-orange-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

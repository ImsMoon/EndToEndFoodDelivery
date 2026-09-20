import React, { useState, useEffect } from 'react';
import { useNavigate } from '../../router';
import { MapPin, Clock, Truck, Store, Armchair, Gift, CreditCard, CheckCircle, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { locations } from '../../data/mockData';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, user, login, getCartTotal, placeOrder } = useApp();
  const total = getCartTotal();
  const deliveryFee = total > 20 ? 0 : 3.99;
  const tax = total * 0.08;
  const grandTotal = total + deliveryFee + tax;

  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dining'>('delivery');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('asap');
  const [customTime, setCustomTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  if (cart.length === 0 && !orderPlaced) { navigate('/menu'); return null; }

  const handleLogin = (method: 'google' | 'email') => {
    if (method === 'google') login({ name: 'John Doe', email: 'john@gmail.com', method: 'google' });
    else if (loginEmail && loginName) login({ name: loginName, email: loginEmail, method: 'email' });
    setShowLogin(false);
  };

  const handlePlaceOrder = () => {
    const address = orderType === 'delivery' ? deliveryAddress : undefined;
    const time = deliveryTime === 'asap' ? 'ASAP' : customTime;
    placeOrder(orderType, address, notes, isGift, giftMessage || undefined, time);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle size={48} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Order Placed!</h2>
          <p className="text-gray-500 mb-6 text-lg">Your order has been confirmed and is being prepared.</p>
          {isGift && (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
              <p className="text-purple-600 font-bold">🎁 Gift order placed!</p>
              {giftMessage && <p className="text-sm text-purple-500 mt-1 italic">"{giftMessage}"</p>}
            </div>
          )}
          <div className="space-y-3">
            <button onClick={() => navigate('/')} className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-all hover:scale-[1.02]">Back to Home</button>
            <button onClick={() => navigate('/menu')} className="w-full border-2 border-gray-200 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all">Order More</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-10">
        {['Login', 'Location', 'Details', 'Payment'].map((label, i) => (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step > i + 1 ? 'bg-green-500 text-white scale-110' : step === i + 1 ? 'bg-orange-600 text-white scale-110 shadow-lg shadow-orange-200' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > i + 1 ? <Check size={18} /> : i + 1}
              </div>
              <span className={`mt-2 text-xs font-medium ${step === i + 1 ? 'text-orange-600' : 'text-gray-500'}`}>{label}</span>
            </div>
            {i < 3 && <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Login */}
          {step === 1 && (
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Login to Continue</h2>
              {user ? (
                <div className="flex items-center gap-4 p-5 bg-green-50 border border-green-200 rounded-xl">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={28} />
                  <div>
                    <p className="font-bold text-gray-800 text-lg">Welcome, {user.name}!</p>
                    <p className="text-sm text-gray-500">{user.email} • {user.method}</p>
                  </div>
                </div>
              ) : showLogin ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                    <input type="text" value={loginName} onChange={(e) => setLoginName(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                    <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder="your@email.com" />
                  </div>
                  <button onClick={() => handleLogin('email')} disabled={!loginEmail || !loginName} className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02]">Continue with Email</button>
                  <button onClick={() => setShowLogin(false)} className="w-full text-gray-500 text-sm hover:text-gray-700 font-medium">← Back</button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button onClick={() => handleLogin('google')} className="w-full flex items-center justify-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium">
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    Continue with Google
                  </button>
                  <button onClick={() => setShowLogin(true)} className="w-full flex items-center justify-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium">
                    <span className="text-xl">📧</span>
                    Continue with Email
                  </button>
                </div>
              )}
              {user && <button onClick={() => setStep(2)} className="w-full mt-6 bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-all hover:scale-[1.02]">Continue →</button>}
            </div>
          )}

          {/* Step 2: Location & Order Type */}
          {step === 2 && (
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Type & Location</h2>
              
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[{ type: 'delivery' as const, icon: Truck, label: 'Delivery', desc: 'To your door', emoji: '🚚' }, { type: 'takeaway' as const, icon: Store, label: 'Takeaway', desc: 'Pick up', emoji: '🏪' }, { type: 'dining' as const, icon: Armchair, label: 'Dine In', desc: 'At restaurant', emoji: '🍽️' }].map(({ type, icon: Icon, label, desc, emoji }) => (
                  <button key={type} onClick={() => setOrderType(type)} className={`p-5 rounded-xl border-2 text-center transition-all ${orderType === type ? 'border-orange-600 bg-orange-50 shadow-lg shadow-orange-100' : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/30'}`}>
                    <span className="text-3xl block mb-2">{emoji}</span>
                    <p className="font-bold text-sm text-gray-800">{label}</p>
                    <p className="text-xs text-gray-500 mt-1">{desc}</p>
                  </button>
                ))}
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-lg">
                  <MapPin size={20} className="text-orange-600" /> Select Location
                </h3>
                <div className="space-y-2">
                  {locations.map(loc => (
                    <button key={loc.id} onClick={() => setSelectedLocation(loc.id)} className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedLocation === loc.id ? 'border-orange-600 bg-orange-50 shadow-md shadow-orange-100' : 'border-gray-200 hover:border-orange-300'}`}>
                      <p className="font-bold text-gray-800">{loc.name}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{loc.address}</p>
                    </button>
                  ))}
                </div>
                <div className="mt-4 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl h-40 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center text-gray-400"><MapPin size={32} className="mx-auto mb-2" /><p className="text-sm font-medium">Interactive Map</p><p className="text-xs">Select a location on the map</p></div>
                </div>
              </div>

              {orderType === 'delivery' && (
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Delivery Address</label>
                  <textarea value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Enter your full delivery address..." className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none" rows={2} />
                </div>
              )}

              <button onClick={() => setStep(3)} disabled={!selectedLocation} className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02]">Continue →</button>
            </div>
          )}

          {/* Step 3: Time & Notes */}
          {step === 3 && (
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Time & Instructions</h2>

              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-lg">
                  <Clock size={20} className="text-orange-600" /> When would you like your order?
                </h3>
                <div className="flex gap-3 mb-4">
                  <button onClick={() => setDeliveryTime('asap')} className={`flex-1 p-5 rounded-xl border-2 text-center transition-all ${deliveryTime === 'asap' ? 'border-orange-600 bg-orange-50 shadow-md shadow-orange-100' : 'border-gray-200'}`}>
                    <span className="text-2xl block mb-1">⚡</span>
                    <p className="font-bold text-sm">ASAP</p>
                    <p className="text-xs text-gray-500">25-35 min</p>
                  </button>
                  <button onClick={() => setDeliveryTime('scheduled')} className={`flex-1 p-5 rounded-xl border-2 text-center transition-all ${deliveryTime === 'scheduled' ? 'border-orange-600 bg-orange-50 shadow-md shadow-orange-100' : 'border-gray-200'}`}>
                    <span className="text-2xl block mb-1">📅</span>
                    <p className="font-bold text-sm">Schedule</p>
                    <p className="text-xs text-gray-500">Pick a time</p>
                  </button>
                </div>
                {deliveryTime === 'scheduled' && <input type="datetime-local" value={customTime} onChange={(e) => setCustomTime(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />}
              </div>

              {orderType === 'delivery' && (
                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Delivery Instructions</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g., Ring doorbell, leave at door, apartment code..." className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none" rows={2} />
                </div>
              )}

              <div className="mb-8">
                <button onClick={() => setIsGift(!isGift)} className={`w-full p-5 rounded-xl border-2 text-left flex items-center gap-4 transition-all ${isGift ? 'border-purple-500 bg-purple-50 shadow-md shadow-purple-100' : 'border-gray-200 hover:border-purple-300'}`}>
                  <Gift size={28} className={isGift ? 'text-purple-600' : 'text-gray-400'} />
                  <div>
                    <p className="font-bold text-gray-800 text-lg">Send as a Gift 🎁</p>
                    <p className="text-sm text-gray-500">Add a personal message for the recipient</p>
                  </div>
                </button>
                {isGift && <textarea value={giftMessage} onChange={(e) => setGiftMessage(e.target.value)} placeholder="Write your gift message here..." className="w-full mt-3 p-4 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" rows={3} />}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="px-6 py-4 border-2 border-gray-200 rounded-xl text-gray-600 font-bold hover:bg-gray-50 transition-all">← Back</button>
                <button onClick={() => setStep(4)} className="flex-1 bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-all hover:scale-[1.02]">Continue to Payment →</button>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment</h2>

              <div className="space-y-3 mb-8">
                {[{ id: 'card', label: 'Credit/Debit Card', icon: '💳' }, { id: 'cash', label: 'Cash on Delivery', icon: '💵' }, { id: 'wallet', label: 'Digital Wallet', icon: '📱' }].map(method => (
                  <button key={method.id} onClick={() => setPaymentMethod(method.id)} className={`w-full p-5 rounded-xl border-2 flex items-center gap-4 transition-all ${paymentMethod === method.id ? 'border-orange-600 bg-orange-50 shadow-md shadow-orange-100' : 'border-gray-200 hover:border-orange-300'}`}>
                    <span className="text-3xl">{method.icon}</span>
                    <span className="font-bold text-gray-800 text-lg">{method.label}</span>
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 mb-8 p-5 bg-gradient-to-br from-gray-50 to-orange-50/30 rounded-xl border border-gray-100">
                  <div><label className="block text-sm font-bold text-gray-700 mb-2">Card Number</label><input type="text" placeholder="1234 5678 9012 3456" className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Expiry</label><input type="text" placeholder="MM/YY" className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">CVV</label><input type="text" placeholder="123" className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
                  </div>
                </div>
              )}

              <div className="border-t-2 border-gray-100 pt-6 mb-6">
                <h3 className="font-bold text-gray-800 mb-3 text-lg">Order Summary</h3>
                <div className="text-sm space-y-2 text-gray-600 bg-gray-50 rounded-xl p-4">
                  <p className="flex justify-between"><span>Type:</span><span className="font-medium text-gray-800">{orderType.charAt(0).toUpperCase() + orderType.slice(1)}</span></p>
                  <p className="flex justify-between"><span>Location:</span><span className="font-medium text-gray-800">{locations.find(l => l.id === selectedLocation)?.name}</span></p>
                  <p className="flex justify-between"><span>Time:</span><span className="font-medium text-gray-800">{deliveryTime === 'asap' ? 'ASAP' : customTime || 'Scheduled'}</span></p>
                  {isGift && <p className="text-purple-600 font-medium">🎁 Gift Order</p>}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="px-6 py-4 border-2 border-gray-200 rounded-xl text-gray-600 font-bold hover:bg-gray-50 transition-all">← Back</button>
                <button onClick={handlePlaceOrder} className="flex-1 bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg shadow-orange-200">
                  <CreditCard size={20} />Place Order — ${grandTotal.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Your Order</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.quantity}× {item.product.name}</span>
                  <span className="text-gray-800 font-bold">${(item.totalPrice * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="font-medium">${total.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Delivery</span><span className="font-medium">{deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `$${deliveryFee.toFixed(2)}`}</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax</span><span className="font-medium">${tax.toFixed(2)}</span></div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-gray-800 text-xl">
              <span>Total</span>
              <span className="text-orange-600">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

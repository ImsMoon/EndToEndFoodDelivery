import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Truck, Store, Armchair, Gift, CreditCard, CheckCircle } from 'lucide-react';
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
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-500 mb-6">Your order has been confirmed and is being prepared.</p>
          {isGift && (
            <div className="bg-purple-50 rounded-lg p-4 mb-6">
              <p className="text-purple-600 font-medium">🎁 Gift order placed!</p>
              {giftMessage && <p className="text-sm text-purple-500 mt-1">"{giftMessage}"</p>}
            </div>
          )}
          <div className="space-y-3">
            <button onClick={() => navigate('/')} className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700">Back to Home</button>
            <button onClick={() => navigate('/menu')} className="w-full border border-gray-200 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50">Order More</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
      <div className="flex items-center justify-between mb-8">
        {['Login', 'Location & Type', 'Time & Notes', 'Payment'].map((label, i) => (
          <div key={label} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span className={`ml-2 text-sm hidden sm:inline ${step === i + 1 ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>{label}</span>
            {i < 3 && <div className={`w-8 sm:w-16 h-0.5 mx-2 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Login to Continue</h2>
              {user ? (
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="text-green-500" size={24} />
                  <div><p className="font-medium text-gray-800">Logged in as {user.name}</p><p className="text-sm text-gray-500">{user.email} ({user.method})</p></div>
                </div>
              ) : showLogin ? (
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Name</label><input type="text" value={loginName} onChange={(e) => setLoginName(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Your name" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="your@email.com" /></div>
                  <button onClick={() => handleLogin('email')} disabled={!loginEmail || !loginName} className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed">Continue with Email</button>
                  <button onClick={() => setShowLogin(false)} className="w-full text-gray-500 text-sm hover:text-gray-700">Back</button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button onClick={() => handleLogin('google')} className="w-full flex items-center justify-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    <span className="font-medium text-gray-700">Continue with Google</span>
                  </button>
                  <button onClick={() => setShowLogin(true)} className="w-full flex items-center justify-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-lg">📧</span><span className="font-medium text-gray-700">Continue with Email</span>
                  </button>
                </div>
              )}
              {user && <button onClick={() => setStep(2)} className="w-full mt-4 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700">Continue</button>}
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Type & Location</h2>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[{ type: 'delivery' as const, icon: Truck, label: 'Delivery', desc: 'To your door' }, { type: 'takeaway' as const, icon: Store, label: 'Takeaway', desc: 'Pick up yourself' }, { type: 'dining' as const, icon: Armchair, label: 'Dine In', desc: 'Eat at restaurant' }].map(({ type, icon: Icon, label, desc }) => (
                  <button key={type} onClick={() => setOrderType(type)} className={`p-4 rounded-lg border-2 text-center transition-all ${orderType === type ? 'border-orange-600 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                    <Icon size={24} className={`mx-auto mb-2 ${orderType === type ? 'text-orange-600' : 'text-gray-400'}`} />
                    <p className="font-medium text-sm text-gray-800">{label}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </button>
                ))}
              </div>
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2"><MapPin size={18} /> Select Location</h3>
                <div className="space-y-2">
                  {locations.map(loc => (
                    <button key={loc.id} onClick={() => setSelectedLocation(loc.id)} className={`w-full p-3 rounded-lg border-2 text-left transition-all ${selectedLocation === loc.id ? 'border-orange-600 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                      <p className="font-medium text-gray-800">{loc.name}</p>
                      <p className="text-sm text-gray-500">{loc.address}</p>
                    </button>
                  ))}
                </div>
                <div className="mt-4 bg-gray-100 rounded-lg h-40 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center text-gray-400"><MapPin size={32} className="mx-auto mb-2" /><p className="text-sm">Interactive Map</p><p className="text-xs">Select a location on the map</p></div>
                </div>
              </div>
              {orderType === 'delivery' && (
                <div className="mb-6"><label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label><textarea value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Enter your full delivery address..." className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none" rows={2} /></div>
              )}
              <button onClick={() => setStep(3)} disabled={!selectedLocation} className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed">Continue</button>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Time & Instructions</h2>
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2"><Clock size={18} /> When would you like your order?</h3>
                <div className="flex gap-3 mb-3">
                  <button onClick={() => setDeliveryTime('asap')} className={`flex-1 p-3 rounded-lg border-2 text-center transition-all ${deliveryTime === 'asap' ? 'border-orange-600 bg-orange-50' : 'border-gray-200'}`}>
                    <p className="font-medium text-sm">ASAP</p><p className="text-xs text-gray-500">25-35 min</p>
                  </button>
                  <button onClick={() => setDeliveryTime('scheduled')} className={`flex-1 p-3 rounded-lg border-2 text-center transition-all ${deliveryTime === 'scheduled' ? 'border-orange-600 bg-orange-50' : 'border-gray-200'}`}>
                    <p className="font-medium text-sm">Schedule</p><p className="text-xs text-gray-500">Pick a time</p>
                  </button>
                </div>
                {deliveryTime === 'scheduled' && <input type="datetime-local" value={customTime} onChange={(e) => setCustomTime(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />}
              </div>
              {orderType === 'delivery' && (
                <div className="mb-6"><label className="block text-sm font-medium text-gray-700 mb-2">Delivery Instructions</label><textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g., Ring doorbell, leave at door, apartment code..." className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none" rows={2} /></div>
              )}
              <div className="mb-6">
                <button onClick={() => setIsGift(!isGift)} className={`w-full p-4 rounded-lg border-2 text-left flex items-center gap-3 transition-all ${isGift ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}>
                  <Gift size={24} className={isGift ? 'text-purple-600' : 'text-gray-400'} />
                  <div><p className="font-medium text-gray-800">Send as a Gift 🎁</p><p className="text-sm text-gray-500">Add a personal message for the recipient</p></div>
                </button>
                {isGift && <textarea value={giftMessage} onChange={(e) => setGiftMessage(e.target.value)} placeholder="Write your gift message here..." className="w-full mt-3 p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" rows={3} />}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="px-6 py-3 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(4)} className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700">Continue to Payment</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Payment</h2>
              <div className="space-y-3 mb-6">
                {[{ id: 'card', label: 'Credit/Debit Card', icon: '💳' }, { id: 'cash', label: 'Cash on Delivery', icon: '💵' }, { id: 'wallet', label: 'Digital Wallet', icon: '📱' }].map(method => (
                  <button key={method.id} onClick={() => setPaymentMethod(method.id)} className={`w-full p-4 rounded-lg border-2 flex items-center gap-3 transition-all ${paymentMethod === method.id ? 'border-orange-600 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                    <span className="text-2xl">{method.icon}</span><span className="font-medium text-gray-800">{method.label}</span>
                  </button>
                ))}
              </div>
              {paymentMethod === 'card' && (
                <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label><input type="text" placeholder="1234 5678 9012 3456" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label><input type="text" placeholder="MM/YY" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">CVV</label><input type="text" placeholder="123" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
                  </div>
                </div>
              )}
              <div className="border-t pt-4 mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Order Summary</h3>
                <div className="text-sm space-y-1 text-gray-600">
                  <p>Type: {orderType.charAt(0).toUpperCase() + orderType.slice(1)}</p>
                  <p>Location: {locations.find(l => l.id === selectedLocation)?.name}</p>
                  <p>Time: {deliveryTime === 'asap' ? 'ASAP' : customTime || 'Scheduled'}</p>
                  {isGift && <p className="text-purple-600">🎁 Gift Order</p>}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="px-6 py-3 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50">Back</button>
                <button onClick={handlePlaceOrder} className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 flex items-center justify-center gap-2">
                  <CreditCard size={18} />Place Order — ${grandTotal.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-bold text-gray-800 mb-3">Your Order</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between text-sm"><span className="text-gray-600">{item.quantity}× {item.product.name}</span><span className="text-gray-800 font-medium">${(item.totalPrice * item.quantity).toFixed(2)}</span></div>
              ))}
            </div>
            <hr className="my-3" />
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Delivery</span><span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-bold text-gray-800"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

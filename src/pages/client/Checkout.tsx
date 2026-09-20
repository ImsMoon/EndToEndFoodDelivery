import React, { useState } from 'react';
import { useNavigate } from '../../router';
import { CheckCircle } from 'lucide-react';
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
  const [notes, setNotes] = useState('');
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');

  if (cart.length === 0 && !orderPlaced) { navigate('/menu'); return null; }

  const handleLogin = (method: 'google' | 'email') => {
    if (method === 'google') login({ name: 'John Doe', email: 'john@gmail.com', method: 'google' });
    else if (loginEmail && loginName) login({ name: loginName, email: loginEmail, method: 'email' });
  };

  const handlePlaceOrder = () => {
    const address = orderType === 'delivery' ? deliveryAddress : undefined;
    placeOrder(orderType, address, notes, isGift, giftMessage || undefined, 'ASAP');
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <CheckCircle size={64} className="text-green mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4">Order Placed!</h2>
        <p className="text-ink-light mb-8">Your order has been confirmed</p>
        <div className="space-y-3">
          <button onClick={() => navigate('/')} className="w-full bg-brand hover:bg-brand-dark text-white py-4 rounded-xl font-bold">Back to Home</button>
          <button onClick={() => navigate('/menu')} className="w-full border-2 border-line py-4 rounded-xl font-bold hover:bg-gray-50">Order More</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex items-center justify-between mb-10">
        {['Login', 'Location', 'Details', 'Payment'].map((label, i) => (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                step > i + 1 ? 'bg-green text-white' : step === i + 1 ? 'bg-brand text-white' : 'bg-line text-ink-muted'
              }`}>{i + 1}</div>
              <span className="mt-2 text-xs font-medium">{label}</span>
            </div>
            {i < 3 && <div className={`flex-1 h-1 mx-2 rounded ${step > i + 1 ? 'bg-green' : 'bg-line'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-white border border-line rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">Login</h2>
              {user ? (
                <div className="bg-brand-light border border-brand/20 rounded-xl p-4">
                  <p className="font-semibold">Logged in as {user.name}</p>
                  <p className="text-sm text-ink-light">{user.email}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <button onClick={() => handleLogin('google')} className="w-full p-4 border-2 border-line rounded-xl hover:border-brand/30 font-medium">Continue with Google</button>
                  <div>
                    <input type="text" value={loginName} onChange={(e) => setLoginName(e.target.value)} placeholder="Name" className="w-full p-4 border border-line rounded-xl mb-2 focus:outline-none focus:border-brand" />
                    <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email" className="w-full p-4 border border-line rounded-xl mb-3 focus:outline-none focus:border-brand" />
                    <button onClick={() => handleLogin('email')} disabled={!loginEmail || !loginName} className="w-full bg-brand hover:bg-brand-dark text-white py-4 rounded-xl font-bold disabled:opacity-50">Continue with Email</button>
                  </div>
                </div>
              )}
              {user && <button onClick={() => setStep(2)} className="w-full mt-6 bg-brand hover:bg-brand-dark text-white py-4 rounded-xl font-bold">Continue</button>}
            </div>
          )}

          {step === 2 && (
            <div className="bg-white border border-line rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">Order Type & Location</h2>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {(['delivery', 'takeaway', 'dining'] as const).map(type => (
                  <button key={type} onClick={() => setOrderType(type)} className={`p-4 rounded-xl border-2 text-center capitalize font-medium ${orderType === type ? 'border-brand bg-brand-light text-brand' : 'border-line'}`}>{type}</button>
                ))}
              </div>
              <div className="mb-6">
                <h3 className="font-bold mb-3">Select Location</h3>
                <div className="space-y-2">
                  {locations.map(loc => (
                    <button key={loc.id} onClick={() => setSelectedLocation(loc.id)} className={`w-full p-4 rounded-xl border-2 text-left ${selectedLocation === loc.id ? 'border-brand bg-brand-light' : 'border-line'}`}>
                      <p className="font-semibold">{loc.name}</p>
                      <p className="text-sm text-ink-light">{loc.address}</p>
                    </button>
                  ))}
                </div>
              </div>
              {orderType === 'delivery' && (
                <div className="mb-6">
                  <label className="block font-semibold mb-2">Delivery Address</label>
                  <textarea value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Enter your address..." className="w-full p-4 border border-line rounded-xl focus:outline-none focus:border-brand" rows={2} />
                </div>
              )}
              <button onClick={() => setStep(3)} disabled={!selectedLocation} className="w-full bg-brand hover:bg-brand-dark text-white py-4 rounded-xl font-bold disabled:opacity-50">Continue</button>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white border border-line rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">Order Details</h2>
              <div className="mb-6">
                <label className="block font-semibold mb-2">Delivery Instructions</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special instructions..." className="w-full p-4 border border-line rounded-xl focus:outline-none focus:border-brand" rows={2} />
              </div>
              <div className="mb-6">
                <button onClick={() => setIsGift(!isGift)} className={`w-full p-4 rounded-xl border-2 text-left ${isGift ? 'border-brand bg-brand-light' : 'border-line'}`}>
                  <p className="font-semibold">Send as a Gift 🎁</p>
                  <p className="text-sm text-ink-light">Add a personal message</p>
                </button>
                {isGift && <textarea value={giftMessage} onChange={(e) => setGiftMessage(e.target.value)} placeholder="Gift message..." className="w-full mt-3 p-4 border border-line rounded-xl focus:outline-none focus:border-brand" rows={3} />}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="px-6 py-4 border-2 border-line rounded-xl font-bold hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(4)} className="flex-1 bg-brand hover:bg-brand-dark text-white py-4 rounded-xl font-bold">Continue to Payment</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="bg-white border border-line rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">Payment</h2>
              <button onClick={handlePlaceOrder} className="w-full bg-brand hover:bg-brand-dark text-white py-4 rounded-xl font-bold mb-4">Place Order — ${grandTotal.toFixed(2)}</button>
              <button onClick={() => setStep(3)} className="w-full border-2 border-line py-4 rounded-xl font-bold hover:bg-gray-50">Back</button>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-line rounded-2xl p-6 sticky top-24">
            <h3 className="font-bold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between text-sm"><span className="text-ink-light">{item.quantity}× {item.product.name}</span><span className="font-medium">${(item.totalPrice * item.quantity).toFixed(2)}</span></div>
              ))}
            </div>
            <div className="border-t border-line pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-ink-light">Subtotal</span><span>${total.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-ink-light">Delivery</span><span>{deliveryFee === 0 ? <span className="text-green">FREE</span> : `$${deliveryFee.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-ink-light">Tax</span><span>${tax.toFixed(2)}</span></div>
            </div>
            <div className="border-t border-line pt-4 mt-4">
              <div className="flex justify-between font-bold text-xl"><span>Total</span><span className="text-brand">${grandTotal.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

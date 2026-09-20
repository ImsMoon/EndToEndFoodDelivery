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
        <CheckCircle size={64} className="text-green-600 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4">Order Placed!</h2>
        <p className="text-gray-600 mb-8">Your order has been confirmed</p>
        <div className="space-y-3">
          <button onClick={() => navigate('/')} className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800">
            Back to Home
          </button>
          <button onClick={() => navigate('/menu')} className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50">
            Order More
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Progress */}
      <div className="flex items-center justify-between mb-10">
        {['Login', 'Location', 'Details', 'Payment'].map((label, i) => (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                step > i + 1 ? 'bg-green-600 text-white' : step === i + 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {i + 1}
              </div>
              <span className="mt-2 text-xs font-medium">{label}</span>
            </div>
            {i < 3 && <div className={`flex-1 h-1 mx-2 ${step > i + 1 ? 'bg-green-600' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Login */}
          {step === 1 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Login</h2>
              {user ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="font-semibold">Logged in as {user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <button onClick={() => handleLogin('google')} className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                    Continue with Google
                  </button>
                  <div>
                    <input type="text" value={loginName} onChange={(e) => setLoginName(e.target.value)} placeholder="Name" className="w-full p-3 border border-gray-300 rounded-lg mb-2" />
                    <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg mb-3" />
                    <button onClick={() => handleLogin('email')} disabled={!loginEmail || !loginName} className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50">
                      Continue with Email
                    </button>
                  </div>
                </div>
              )}
              {user && (
                <button onClick={() => setStep(2)} className="w-full mt-6 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800">
                  Continue
                </button>
              )}
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Order Type & Location</h2>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                {(['delivery', 'takeaway', 'dining'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`p-4 rounded-lg border-2 text-center capitalize font-medium ${
                      orderType === type ? 'border-black bg-gray-50' : 'border-gray-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Select Location</h3>
                <div className="space-y-2">
                  {locations.map(loc => (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left ${
                        selectedLocation === loc.id ? 'border-black bg-gray-50' : 'border-gray-300'
                      }`}
                    >
                      <p className="font-semibold">{loc.name}</p>
                      <p className="text-sm text-gray-600">{loc.address}</p>
                    </button>
                  ))}
                </div>
              </div>

              {orderType === 'delivery' && (
                <div className="mb-6">
                  <label className="block font-semibold mb-2">Delivery Address</label>
                  <textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter your address..."
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={2}
                  />
                </div>
              )}

              <button onClick={() => setStep(3)} disabled={!selectedLocation} className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50">
                Continue
              </button>
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Order Details</h2>

              <div className="mb-6">
                <label className="block font-semibold mb-2">Delivery Instructions</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special instructions..."
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={2}
                />
              </div>

              <div className="mb-6">
                <button
                  onClick={() => setIsGift(!isGift)}
                  className={`w-full p-4 rounded-lg border-2 text-left ${
                    isGift ? 'border-black bg-gray-50' : 'border-gray-300'
                  }`}
                >
                  <p className="font-semibold">Send as a Gift</p>
                  <p className="text-sm text-gray-600">Add a personal message</p>
                </button>
                {isGift && (
                  <textarea
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Gift message..."
                    className="w-full mt-3 p-3 border border-gray-300 rounded-lg"
                    rows={3}
                  />
                )}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50">
                  Back
                </button>
                <button onClick={() => setStep(4)} className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800">
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Payment</h2>

              <button onClick={handlePlaceOrder} className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 mb-4">
                Place Order — ${grandTotal.toFixed(2)}
              </button>

              <button onClick={() => setStep(3)} className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50">
                Back
              </button>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
            <h3 className="font-bold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.quantity}× {item.product.name}</span>
                  <span className="font-medium">${(item.totalPrice * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>${total.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Delivery</span><span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Tax</span><span>${tax.toFixed(2)}</span></div>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

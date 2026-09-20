import React, { useState } from 'react';
import { useNavigate } from '../../router';
import { useApp } from '../../context/AppContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, user } = useApp();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState<'choose' | 'email'>('choose');

  if (user) { navigate('/'); return null; }

  const handleGoogleLogin = () => { login({ name: 'John Doe', email: 'john@gmail.com', method: 'google' }); navigate('/'); };
  const handleEmailLogin = () => { if (email && name) { login({ name, email, method: 'email' }); navigate('/'); } };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <div className="text-center mb-8">
            <span className="text-5xl block mb-4">🍕</span>
            <h1 className="text-2xl font-bold">Welcome</h1>
            <p className="text-gray-600 mt-2">Login to place orders</p>
          </div>

          {mode === 'choose' ? (
            <div className="space-y-3">
              <button onClick={handleGoogleLogin} className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                Continue with Google
              </button>
              <button onClick={() => setMode('email')} className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                Continue with Email
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="your@email.com" />
              </div>
              <button onClick={handleEmailLogin} disabled={!email || !name} className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50">
                Login
              </button>
              <button onClick={() => setMode('choose')} className="w-full text-gray-600 text-sm hover:text-black">
                ← Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate } from '../../router';
import { useApp } from '../../context/AppContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, user } = useApp();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState<'choose' | 'email'>('choose');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (user) { navigate('/'); return null; }

  const handleGoogleLogin = () => { login({ name: 'John Doe', email: 'john@gmail.com', method: 'google' }); navigate('/'); };
  const handleEmailLogin = () => { if (email && name) { login({ name, email, method: 'email' }); navigate('/'); } };

  return (
    <div className={`min-h-[80vh] flex items-center justify-center px-4 transition-all duration-500 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-block bg-orange-100 rounded-2xl p-4 mb-4">
              <span className="text-5xl block">🍕</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
            <p className="text-gray-500 mt-2">Login to place orders and track deliveries</p>
          </div>

          {mode === 'choose' ? (
            <div className="space-y-3">
              <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500">or</span></div>
              </div>
              <button onClick={() => setMode('email')} className="w-full flex items-center justify-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium">
                <span className="text-xl">📧</span>
                Continue with Email
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder="your@email.com" />
              </div>
              <button onClick={handleEmailLogin} disabled={!email || !name} className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] shadow-lg shadow-orange-200">Login</button>
              <button onClick={() => setMode('choose')} className="w-full text-gray-500 text-sm hover:text-gray-700 font-medium">← Back to login options</button>
            </div>
          )}

          <p className="text-center text-xs text-gray-400 mt-8">By logging in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

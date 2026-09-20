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
        <div className="bg-white border border-border rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-3xl">🍕</span>
            </div>
            <h1 className="text-2xl font-bold">Welcome</h1>
            <p className="text-text-secondary mt-2">Login to place orders</p>
          </div>

          {mode === 'choose' ? (
            <div className="space-y-3">
              <button onClick={handleGoogleLogin} className="w-full p-4 border-2 border-border rounded-xl hover:border-primary/30 font-medium">Continue with Google</button>
              <button onClick={() => setMode('email')} className="w-full p-4 border-2 border-border rounded-xl hover:border-primary/30 font-medium">Continue with Email</button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 border border-border rounded-xl focus:outline-none focus:border-primary" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 border border-border rounded-xl focus:outline-none focus:border-primary" placeholder="your@email.com" />
              </div>
              <button onClick={handleEmailLogin} disabled={!email || !name} className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold disabled:opacity-50 transition-colors">Login</button>
              <button onClick={() => setMode('choose')} className="w-full text-text-secondary text-sm hover:text-text">← Back</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

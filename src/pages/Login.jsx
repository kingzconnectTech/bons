import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
    setLoading(false);
  }

  async function handleGoogleSignIn() {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen bg-slate-50 flex-col lg:flex-row">
      {/* Left Side: Illustrative Image */}
      <div className="hidden lg:flex lg:w-1/2 premium-gradient items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Education Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-white max-w-md text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 inline-block p-4 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20"
          >
            <Sparkles className="w-12 h-12 text-brand-mint" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black mb-6 tracking-tight uppercase"
          >
            Welcome Back
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 font-medium leading-relaxed"
          >
            Your journey to academic excellence continues here. Sign in to access your dashboard.
          </motion.p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-20 py-12 lg:py-20">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full"
        >
          <div className="mb-10 sm:mb-12 text-center lg:text-left">
            <h2 className="text-4xl font-black text-brand-black mb-2 uppercase tracking-tight">Sign In</h2>
            <p className="text-slate-600 font-bold">Enter your credentials to continue</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center text-red-700 text-sm font-bold"
            >
              <AlertCircle className="w-5 h-5 mr-3 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-black text-slate-800 mb-2 ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-brand-mint transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 sm:py-4 bg-white border border-slate-300 rounded-2xl focus:ring-4 focus:ring-brand-mint/10 focus:border-brand-mint transition-all text-brand-black font-medium placeholder:text-slate-400"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-black text-slate-800 mb-2 ml-1 uppercase tracking-wider">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-brand-mint transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 sm:py-4 bg-white border border-slate-300 rounded-2xl focus:ring-4 focus:ring-brand-mint/10 focus:border-brand-mint transition-all text-brand-black font-medium placeholder:text-slate-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full btn-primary py-3.5 sm:py-4 text-base sm:text-lg mt-2 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                <span className="px-4 bg-slate-50 text-slate-500">Secure Access</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="mt-8 w-full btn-secondary py-3.5 sm:py-4 group flex items-center justify-center"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-3" />
              <span className="group-hover:text-brand-mint transition-colors">Continue with Google</span>
            </button>
          </div>

          <p className="mt-8 sm:mt-10 text-center text-sm font-bold text-slate-500">
            New to CBT Master?{' '}
            <Link to="/register" className="text-brand-mint hover:text-brand-deep underline underline-offset-4 decoration-2 transition-colors">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

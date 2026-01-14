import React, { useState, useContext } from 'react';
import { signup, login } from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: saveUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const res = await login({ email, password });
        saveUser(res.data);
        navigate('/products');
      } else {
        await signup({ email, password });
        alert("Account created successfully! Please login.");
        setIsLogin(true);
        setPassword('');
      }
    } catch (err) {
      alert("Auth failed: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="text-4xl font-bold text-pink-600">🎂 Hope Epicure</Link>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-center text-gray-600 mb-6">
            {isLogin ? 'Login to place your orders' : 'Join us for delicious treats'}
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 text-white py-3 rounded-lg font-bold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setPassword('');
                }} 
                className="ml-2 text-pink-600 font-bold hover:text-pink-700"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
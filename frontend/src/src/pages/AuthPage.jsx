import React, { useState, useContext } from 'react';
import { signup, login } from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: saveUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await login({ email, password });
        saveUser(res.data); // Save to context and localStorage
        navigate('/');
      } else {
        await signup({ email, password });
        alert("Account created! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Auth failed: " + err.response?.data?.detail);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
          {isLogin ? 'Welcome Back' : 'Join Hope Epicure'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg" 
            onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg" 
            onChange={(e) => setPassword(e.target.value)} required />
          <button className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold hover:bg-pink-600">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)} className="ml-1 text-pink-600 font-bold">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
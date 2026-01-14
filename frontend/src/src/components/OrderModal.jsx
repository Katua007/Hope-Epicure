import React, { useState } from 'react';
import { placeOrder } from '../api';

const OrderModal = ({ product, isOpen, onClose, userEmail }) => {
  const [orderInfo, setOrderInfo] = useState({ 
    customer_name: userEmail?.split('@')[0] || '',
    quantity: 1, 
    flavor: product?.flavor || '' 
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        customer_name: orderInfo.customer_name,
        customer_email: userEmail,
        product_name: product.name,
        flavor: orderInfo.flavor,
        quantity: parseInt(orderInfo.quantity)
      };
      await placeOrder(payload);
      alert("✅ Order placed successfully! Hope has been notified.");
      onClose();
      setOrderInfo({ customer_name: userEmail?.split('@')[0] || '', quantity: 1, flavor: product?.flavor || '' });
    } catch (err) {
      console.error("Order failed", err);
      alert("❌ Failed to place order: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Order {product.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
        </div>
        
        <div className="mb-6">
          <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
          <p className="mt-2 text-gray-600">{product.description}</p>
          <p className="mt-1 text-2xl font-bold text-pink-600">${product.price}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
              value={orderInfo.customer_name} 
              onChange={(e) => setOrderInfo({...orderInfo, customer_name: e.target.value})} 
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input 
              type="number" 
              min="1" 
              max="100"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
              value={orderInfo.quantity} 
              onChange={(e) => setOrderInfo({...orderInfo, quantity: e.target.value})} 
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Flavor</label>
            <input 
              type="text" 
              placeholder="e.g., Chocolate, Vanilla, Strawberry"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
              value={orderInfo.flavor} 
              onChange={(e) => setOrderInfo({...orderInfo, flavor: e.target.value})} 
              required
            />
          </div>
          
          <div className="flex gap-4 mt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Placing Order...' : 'Confirm Order'}
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
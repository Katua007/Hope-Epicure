import React, { useState } from 'react';
import { placeOrder } from '../api';

const OrderModal = ({ product, isOpen, onClose, userEmail }) => {
  const [orderInfo, setOrderInfo] = useState({ quantity: 1, flavor: product?.flavor || '' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...orderInfo,
      product_name: product.name,
      customer_email: userEmail,
    };
    await placeOrder(payload);
    alert("Order sent to Hope! Check your email for confirmation.");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Order {product.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <input type="number" min="1" className="w-full border p-2 rounded" 
              value={orderInfo.quantity} onChange={(e) => setOrderInfo({...orderInfo, quantity: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium">Preferred Flavor</label>
            <input type="text" className="w-full border p-2 rounded" 
              value={orderInfo.flavor} onChange={(e) => setOrderInfo({...orderInfo, flavor: e.target.value})} />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-pink-500 text-white py-2 rounded-lg">Confirm Order</button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 py-2 rounded-lg">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
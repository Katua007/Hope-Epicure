import React, { useState } from 'react';
import { createProduct } from '../api';

const AdminProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '', price: '', flavor: '', description: '', image_url: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(formData);
      onProductAdded(); // Refresh the list
      setFormData({ name: '', price: '', flavor: '', description: '', image_url: '' });
      alert("Product added successfully!");
    } catch (err) {
      console.error("Error adding product", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">Add New Treat</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Product Name" className="border p-2 rounded" 
          value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input type="number" placeholder="Price ($)" className="border p-2 rounded" 
          value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
        <input type="text" placeholder="Flavor" className="border p-2 rounded" 
          value={formData.flavor} onChange={(e) => setFormData({...formData, flavor: e.target.value})} required />
        <input type="text" placeholder="Image URL" className="border p-2 rounded" 
          value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} required />
        <textarea placeholder="Description" className="border p-2 rounded md:col-span-2" 
          value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
      </div>
      <button type="submit" className="mt-4 bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 transition">
        Save Product
      </button>
    </form>
  );
};

export default AdminProductForm;
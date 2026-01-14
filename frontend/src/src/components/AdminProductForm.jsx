import React, { useState } from 'react';
import axios from 'axios';

const AdminProductForm = ({ onProductAdded }) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '', price: '', flavor: '', description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert("Please select an image");
      return;
    }
    
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', parseFloat(formData.price));
      data.append('flavor', formData.flavor);
      data.append('description', formData.description || '');
      data.append('image', file);

      await axios.post('http://localhost:8000/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      onProductAdded();
      setFormData({ name: '', price: '', flavor: '', description: '' });
      setFile(null);
      e.target.reset();
      alert("✅ Product added successfully!");
    } catch (err) {
      console.error("Error adding product", err);
      alert("❌ Failed to add product: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">Add New Treat</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Product Name" className="border p-2 rounded" 
          value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input type="number" step="0.01" min="0" placeholder="Price ($)" className="border p-2 rounded" 
          value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
        <input type="text" placeholder="Flavor" className="border p-2 rounded" 
          value={formData.flavor} onChange={(e) => setFormData({...formData, flavor: e.target.value})} required />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} 
          className="border p-2 rounded block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-50 file:text-pink-700" required />
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
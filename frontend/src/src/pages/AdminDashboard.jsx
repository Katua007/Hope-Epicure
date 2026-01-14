import React, { useEffect, useState } from 'react';
import { fetchProducts, toggleAvailability, deleteProduct } from '../api';
import AdminProductForm from '../components/AdminProductForm';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetchProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products", err);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  const handleToggle = async (id, currentStatus) => {
    try {
      await toggleAvailability(id, !currentStatus);
      loadProducts();
    } catch (err) {
      console.error("Toggle failed", err);
      alert("Failed to toggle availability");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product? This cannot be undone.")) {
      try {
        await deleteProduct(id);
        loadProducts();
        alert("Product deleted successfully");
      } catch (err) {
        console.error("Delete failed", err);
        alert("Error deleting product: " + (err.response?.data?.detail || err.message));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <Link to="/products" className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600">
            View Store
          </Link>
        </div>
        
        <AdminProductForm onProductAdded={loadProducts} />

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Product Management</h2>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
              <p className="mt-2 text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products yet. Add your first product above!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                  <tr>
                    <th className="p-4 border-b">Image</th>
                    <th className="p-4 border-b">Product</th>
                    <th className="p-4 border-b">Flavor</th>
                    <th className="p-4 border-b">Price</th>
                    <th className="p-4 border-b">Status</th>
                    <th className="p-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="p-4 border-b">
                        <img src={p.image_url} alt={p.name} className="w-16 h-16 object-cover rounded" />
                      </td>
                      <td className="p-4 border-b font-medium">{p.name}</td>
                      <td className="p-4 border-b text-gray-600">{p.flavor}</td>
                      <td className="p-4 border-b font-semibold">${p.price}</td>
                      <td className="p-4 border-b">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {p.is_available ? "Available" : "Sold Out"}
                        </span>
                      </td>
                      <td className="p-4 border-b">
                        <button 
                          onClick={() => handleToggle(p.id, p.is_available)} 
                          className="text-blue-600 hover:text-blue-800 font-medium mr-4"
                        >
                          Toggle
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)} 
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
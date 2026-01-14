import React, { useEffect, useState } from 'react';
import { fetchProducts, toggleAvailability, deleteProduct } from '../api';
import AdminProductForm from '../components/AdminProductForm';

//  Add the handleDelete function inside the AdminDashboard component
const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this product? This cannot be undone.")) {
    try {
      await deleteProduct(id);
      loadProducts(); // Refresh the list
    } catch (err) {
      alert("Error deleting product");
    }
  }
};

//  Update the button in the JSX table:
<button 
  onClick={() => handleDelete(p.id)} 
  className="text-red-500 hover:underline font-semibold"
>
  Delete
</button>

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await fetchProducts();
    setProducts(res.data);
  };

  useEffect(() => { loadProducts(); }, []);

  const handleToggle = async (id, currentStatus) => {
    await toggleAvailability(id, !currentStatus);
    loadProducts(); // Refresh list
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Hope Epicure Admin</h1>
      
      <AdminProductForm onProductAdded={loadProducts} />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="p-4 border-b">Product</th>
              <th className="p-4 border-b">Price</th>
              <th className="p-4 border-b">Status</th>
              <th className="p-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-4 border-b font-medium">{p.name}</td>
                <td className="p-4 border-b">${p.price}</td>
                <td className="p-4 border-b">
                  <span className={`px-2 py-1 rounded text-xs ${p.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {p.is_available ? "Available" : "Sold Out"}
                  </span>
                </td>
                <td className="p-4 border-b">
                  <button onClick={() => handleToggle(p.id, p.is_available)} className="text-blue-500 hover:underline mr-4">
                    Toggle Status
                  </button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
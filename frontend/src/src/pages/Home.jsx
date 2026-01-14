import React, { useEffect, useState, useContext } from 'react';
import { fetchProducts } from '../api';
import { AuthContext } from '../context/AuthContext'; // Import Context
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import OrderModal from '../components/OrderModal';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { user } = useContext(AuthContext); // Get logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    const getActiveProducts = async () => {
      const res = await fetchProducts();
      setProducts(res.data.filter(p => p.is_available));
    };
    getActiveProducts();
  }, []);

  const handleOrderClick = (product) => {
    if (!user) {
      // If not logged in, go to login page
      navigate('/login');
    } else {
      // If logged in, open the modal
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <header className="py-12 text-center bg-white shadow-sm">
        <h1 className="text-5xl font-extrabold text-pink-600">Hope Epicure</h1>
        {user ? (
          <p className="mt-2 text-gray-600">Welcome back, {user.email}!</p>
        ) : (
          <p className="mt-2 text-gray-400">Log in to start ordering!</p>
        )}
      </header>

      <main className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map(p => (
            <ProductCard key={p.id} product={p} onOrder={handleOrderClick} />
          ))}
        </div>
      </main>

      {/* The Order Modal */}
      {selectedProduct && (
        <OrderModal 
          product={selectedProduct} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          userEmail={user?.email} 
        />
      )}
    </div>
  );
};

export default Home;
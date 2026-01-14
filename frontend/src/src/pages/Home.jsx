import React, { useEffect, useState, useContext } from 'react';
import { fetchProducts } from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import OrderModal from '../components/OrderModal';
import Navbar from '../components/Navbar';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getActiveProducts = async () => {
      try {
        setLoading(true);
        const res = await fetchProducts();
        setProducts(res.data.filter(p => p.is_available));
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };
    getActiveProducts();
  }, []);

  const handleOrderClick = (product) => {
    if (!user) {
      navigate('/login');
    } else {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />
      
      <header className="py-12 text-center bg-gradient-to-r from-pink-500 to-pink-600 text-white">
        <h1 className="text-5xl font-extrabold mb-2">Our Delicious Products</h1>
        <p className="text-lg">Handcrafted with love, baked to perfection</p>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
            <p className="mt-4 text-gray-600">Loading delicious treats...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">No products available at the moment.</p>
            <p className="text-gray-500 mt-2">Check back soon for fresh treats!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(p => (
              <ProductCard key={p.id} product={p} onOrder={handleOrderClick} />
            ))}
          </div>
        )}
      </main>

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
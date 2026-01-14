import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getActiveProducts = async () => {
      const res = await fetchProducts();
      // Filter out products that are NOT available
      const availableItems = res.data.filter(p => p.is_available === true);
      setProducts(availableItems);
    };
    getActiveProducts();
  }, []);

  const handleOrderInit = (product) => {
    // We will build the Order Modal in the next step
    console.log("Ordering:", product.name);
  };

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Hero Section */}
      <header className="py-16 text-center bg-white border-b border-pink-100">
        <h1 className="text-5xl font-extrabold text-pink-600 mb-2">Hope Epicure</h1>
        <p className="text-gray-500 italic">Handcrafted treats, baked with love.</p>
      </header>

      {/* Product Grid */}
      <main className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(p => (
            <ProductCard key={p.id} product={p} onOrder={handleOrderInit} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
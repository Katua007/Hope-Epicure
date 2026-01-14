import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Landing = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
            Welcome to <span className="text-pink-600">Hope Epicure</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Indulge in handcrafted cakes and pastries made with love. 
            Every bite tells a story of passion and perfection.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/products"
              className="bg-pink-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-pink-700 transition"
            >
              Browse Products
            </Link>
            {!user && (
              <Link
                to="/login"
                className="bg-white text-pink-600 border-2 border-pink-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-pink-50 transition"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-5xl mb-4">🎂</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fresh Daily</h3>
            <p className="text-gray-600">
              All our products are baked fresh every day with premium ingredients
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-5xl mb-4">🍰</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Custom Orders</h3>
            <p className="text-gray-600">
              Personalize your order with your favorite flavors and designs
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-5xl mb-4">🚚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick and reliable delivery to bring sweetness to your doorstep
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Order?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Join hundreds of happy customers who trust Hope Epicure
          </p>
          <Link
            to="/products"
            className="bg-white text-pink-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-pink-50 transition inline-block"
          >
            View Our Menu
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Hope Epicure. Made with ❤️ and lots of sugar.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

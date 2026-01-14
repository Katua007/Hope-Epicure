import React from 'react';

const ProductCard = ({ product, onOrder }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition hover:scale-105 duration-300">
      <img 
        src={product.image_url} 
        alt={product.name} 
        className="w-full h-56 object-cover"
      />
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
          <span className="text-pink-600 font-bold">${product.price}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
          Base Flavor: {product.flavor}
        </div>
        
        <button 
          onClick={() => onOrder(product)}
          className="w-full bg-pink-500 text-white py-2 rounded-xl font-semibold hover:bg-pink-600 transition"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
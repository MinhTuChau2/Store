import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from './CartContext'; // Import the useCart hook
import './Product.css';

const Product = ({ cartIconRef }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // Destructure addToCart from useCart

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/product/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddToCart = (product, e) => {
    addToCart(product);

    const flyingElement = document.createElement('div');
    flyingElement.className = 'flying-element';
    flyingElement.textContent = '❤️'; // Heart emoji
    document.body.appendChild(flyingElement);

    const productElement = e.currentTarget.closest('.product');
    const cartIconElement = cartIconRef.current;

    if (!productElement || !cartIconElement) {
      // Clean up if elements are not found
      document.body.removeChild(flyingElement);
      return;
    }

    const productRect = productElement.getBoundingClientRect();
    const cartRect = cartIconElement.getBoundingClientRect();

    flyingElement.style.position = 'absolute';
    flyingElement.style.top = `${productRect.top + window.scrollY + 250}px`;
    flyingElement.style.left = `${productRect.left + window.scrollX + 100}px`;

    requestAnimationFrame(() => {
      flyingElement.style.top = `${cartRect.top + window.scrollY}px`;
      flyingElement.style.left = `${cartRect.left + window.scrollX}px`;
      flyingElement.style.fontSize = '15px'; // Shrink size
      flyingElement.style.opacity = '0'; // Fade out
    });

    setTimeout(() => {
      document.body.removeChild(flyingElement);
    }, 2500); // Adjust time to match animation duration
  };


  return (
    <div className="home">
      <h1>Product List</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${parseFloat(product.price).toFixed(2)}</p>
            <button 
              className="add-to-cart-btn" 
              onClick={(e) => handleAddToCart(product, e)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;

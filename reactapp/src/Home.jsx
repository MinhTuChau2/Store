import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="home">
      <h1>Home Page</h1>

      <div className="about-us">
        <h2>About Us</h2>
        <p>Welcome to our store! We are dedicated to providing you with the best products and services. Our mission is to offer high-quality products at competitive prices. We hope you have a great shopping experience with us!</p>
      </div>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${parseFloat(product.price).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

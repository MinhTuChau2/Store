import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick'; // Import Slider from react-slick
import { useCart } from './CartContext'; // Import the useCart hook
import './Product.css';

// Custom Arrow components
const CustomArrow = ({ className, style, onClick, direction }) => (
  <div
    className={className}
    style={{
      ...style,
      display: 'block',
      background: 'transparent',
      zIndex: 1,
      [direction]: '10px', // Adjust the positioning of the arrows
      borderRadius: '50%',
      padding: '10px',
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    <span className={`arrow ${direction}`}> {direction === 'left' ? '←' : '→'} </span>
  </div>
);

// Settings for the slider
const sliderSettings = {
  dots: false, // Disable dots
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <CustomArrow direction="left" />,
  nextArrow: <CustomArrow direction="right" />
};

const Product = ({ cartIconRef }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for the selected product
  const { addToCart } = useCart(); // Destructure addToCart from useCart
  const sliderRef = useRef(null); // Ref for the slider

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/product/');
      setProducts(response.data);
      setSelectedProduct(response.data[0]); // Set the first product as default selected
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
    flyingElement.style.top = `${productRect.top + window.scrollY + 420}px`;
    flyingElement.style.left = `${productRect.left + window.scrollX + 250}px`;

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
    <div className="product-container">
      <div className="book-slider1">
        <Slider {...sliderSettings} ref={sliderRef} afterChange={index => setSelectedProduct(products[index])}>
          {products.map((product) => (
            <div key={product.id} className="product">
              <img src={product.image} alt={product.name} className="product-image" />
              <h2>{product.name}</h2>
              <p>${parseFloat(product.price).toFixed(2)}</p>
              <button 
                className="add-to-cart-btn" 
                onClick={(e) => handleAddToCart(product, e)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </Slider>
      </div>
      
    </div>
  );
};

export default Product;

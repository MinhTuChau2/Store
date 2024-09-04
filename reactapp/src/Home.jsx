import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';  // Import Slider from react-slick
import './Home.css';
import removeBgImage from './Removebg.png'; // Correctly imported image

// Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true, // Add arrows for navigation
};

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
      {/* Use the imported image */}
      <img src={removeBgImage} alt="Home" className="home-image" />

      <div className="product-container">
      <div className="book-slider">
  <div className="antenna-bulb"></div> {/* Antenna bulb */}
  <Slider {...sliderSettings}>
    {products.map((product) => (
      <div key={product.id} className="product">
        <video
          src={product.video} // Assuming video URLs are stored in `product.video`
          controls
          className="product-video"
          alt={product.name}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    ))}
  </Slider>
</div>


      
      </div>
    </div>
  );
};

export default Home;

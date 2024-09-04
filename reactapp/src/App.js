import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Home from './Home';
import Contact from './Contact';
import Product from './Product';
import Cart from './Cart';
import { CartProvider } from './CartContext';
import './App.css';
import Checkout from './Checkout';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FlowerBackground from './FlowerBackground'; // Import FlowerBackground

const DropdownNavigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        Menu
        <span className={`arrow ${isDropdownOpen ? 'open' : ''}`}></span>
      </button>
      <nav className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
        <ul>
          <li><button onClick={() => handleNavigation('/')}>Home</button></li>
          <li><button onClick={() => handleNavigation('/product')}>Products</button></li>
          <li><button onClick={() => handleNavigation('/contact')}>Contact</button></li>
          <li><button onClick={() => handleNavigation('/cart')}>Cart</button></li>
        </ul>
      </nav>
    </div>
  );
};

function App() {
  const cartIconRef = useRef(null);

  return (
    <CartProvider>
      <Router>
        <div className="app">
          <FlowerBackground /> {/* Add FlowerBackground here */}
          <header className="app-header">
            <div className="header-content">
              <Link to="/" className="left-header">
              <h1 className="header-logo">Blüm</h1>
              </Link>
              <nav className="header-nav">
                <ul>
                  <li>
                    <DropdownNavigation />
                  </li>
                  <li>
                    <Link to="/cart" className="cart-link">
                      <FontAwesomeIcon icon={faShoppingCart} ref={cartIconRef} /> Cart
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product" element={<Product cartIconRef={cartIconRef} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <div className="footer-content">
              <p>&copy; Blüm. All rights reserved.</p>
              <div className="footer-contact">
                <h4>Contact Us:</h4>
                <p>Email: blummtl@gmail.com</p>
                <p>Phone: (514) 690-5124</p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

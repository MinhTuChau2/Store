import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Home from './Home';
import Contact from './Contact';
import Product from './Product';
import Cart from './Cart';
import { CartProvider } from './CartContext'; // Import the CartProvider
import './App.css'; // Import your CSS file if you have one

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
          <header className="app-header">
            <div className="header-content">
              <h1 className="header-logo">Blüm</h1>
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
            </Routes>
          </main>
          <footer className="app-footer">
            <div className="footer-content">
              <p>&copy; Blüm. All rights reserved.</p>
              <div className="footer-sponsors">
                <h4>Our Sponsors:</h4>
                {/* Add sponsor information here */}
              </div>
              <div className="footer-contact">
                <h4>Contact Us:</h4>
                <p>Email: info@blum.com</p>
                <p>Phone: (123) 456-7890</p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

import React, { useState } from 'react';
import { useCart } from './CartContext';
import axios from 'axios';
import Modal from './Modal';
import './Checkout.css';

const Checkout = () => {
  const { cartItems } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showModal, setShowModal] = useState(false);

  if (!cartItems || cartItems.length === 0) {
    return <div className="checkout">Your cart is empty.</div>;
  }

  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

  // Create a formatted string with product details
  const productsString = cartItems.map(item => {
    return `Product ID: ${item.id}, Name: ${item.name}, Price: $${item.price}, Quantity: ${item.quantity}`;
  }).join('; ');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      name,
      email,
      address,
      phone_number: phoneNumber,
      total_price: totalPrice,
      products: productsString  // Use the formatted string for products
    };

    try {
      const response = await axios.post('http://localhost:8000/api/orders/', orderData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        setShowModal(true); // Show the modal on success
        // Optionally clear the cart or perform other actions here
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('There was an error with your purchase. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.href = '/'; // Redirect to the home page after closing the modal
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="checkout-summary">
        <h2>Order Summary</h2>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <h3>Products:</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Shipping Information</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input 
            type="text" 
            id="address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input 
            type="tel" 
            id="phoneNumber" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="checkout-button">Complete Purchase</button>
      </form>

      <Modal show={showModal} onClose={handleCloseModal} title="Purchase Complete">
        <p>Thank you for your purchase!</p>
      </Modal>
    </div>
  );
};

export default Checkout;

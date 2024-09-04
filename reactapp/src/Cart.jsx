import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate(); // Initialize useNavigate

  if (!cartItems || cartItems.length === 0) {
    return <div className="cart">Your cart is empty.</div>;
  }

  // Calculate the total price
  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

  // Function to handle checkout button click
  const handleCheckout = () => {
    navigate('/Checkout'); // Redirect to the checkout page using navigate
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>${parseFloat(item.price).toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove One</button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
      </div>
      <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button> {/* Add the checkout button */}
    </div>
  );
};

export default Cart;

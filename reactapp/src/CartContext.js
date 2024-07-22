// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the CartContext
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// Provider component for the CartContext
export const CartProvider = ({ children }) => {
  // Initialize cartItems from local storage or an empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Update local storage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add a product to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if the product already exists in the cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // If exists, update the quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // If not exists, add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove a single instance of a product from the cart by its ID
  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      // Find the index of the item to be removed
      const itemIndex = prevItems.findIndex(item => item.id === id);
      if (itemIndex >= 0) {
        // Decrease quantity or remove item if quantity is 1
        const item = prevItems[itemIndex];
        if (item.quantity > 1) {
          const updatedItems = [...prevItems];
          updatedItems[itemIndex].quantity -= 1;
          return updatedItems;
        } else {
          return prevItems.filter(item => item.id !== id);
        }
      }
      return prevItems;
    });
  };

  // Provide cart items and functions to the children
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

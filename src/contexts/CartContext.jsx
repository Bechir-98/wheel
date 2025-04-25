// src/contexts/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context for the cart
const CartContext = createContext();

// Custom hook to use the Cart context
export const useCart = () => useContext(CartContext);

// CartProvider to wrap your app and provide the cart state
export const CartProvider = ({ children }) => {
  // Initialize the cart state from localStorage if available
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];  // Parse the cart from localStorage or set as empty array
  });

  // Update localStorage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));  // Store the cart in localStorage
  }, [cart]);

  // Add an item to the cart, only if it's not already in the cart
  const addToCart = (wheelchair) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === wheelchair.id);  // Check if the item already exists
      if (exists) return prev;  // If item already exists, don't add it again
      return [...prev, wheelchair];  // Otherwise, add it to the cart
    });
  };

  // Remove an item from the cart by its id
  const removeFromCart = (id) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);  // Remove the item by id
      localStorage.setItem("cart", JSON.stringify(updatedCart));  // Update localStorage
      return updatedCart;  // Return the updated cart
    });
  };

  // Clear all items from the cart
  const clearCart = () => {
    setCart([]);  // Clear the cart state
    localStorage.setItem("cart", JSON.stringify([]));  // Clear localStorage
  };

  // Provide cart state and functions to the rest of the app
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

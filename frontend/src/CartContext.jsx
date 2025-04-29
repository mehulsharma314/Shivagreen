import React, { createContext, useContext, useEffect, useState } from 'react';
import products from './data/product'; // ✅ Importing from product data file
import { toast } from 'react-hot-toast';


const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Load cart from sessionStorage on initial render
  const [cart, setCart] = useState(() => {
    const storedCart = sessionStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : {};
  });

  // Save cart to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to the cart with a specific quantity
const addToCart = (id, quantity = 1) => {
  const numericId = Number(id);

  setCart((prev) => {
    const updatedCart = { ...prev };
    const product = products.find((p) => p.id === numericId);
    if (!product) return prev;

    if (updatedCart[numericId]) {
      updatedCart[numericId].quantity += quantity;
    } else {
      updatedCart[numericId] = { ...product, quantity };
      toast.success(`Added ${product.name} to cart`);
    }

    return updatedCart;
  });
};

// Decrease item quantity, remove it when quantity is 1
const removeFromCart = (id) => {
  setCart((prev) => {
    const updatedCart = { ...prev };
    const product = updatedCart[id];

    if (product) {
      if (product.quantity > 1) {
        updatedCart[id].quantity -= 1;
      } else {
        delete updatedCart[id];
        toast.success(`Removed ${product.name} from cart`);
      }
    }

    return updatedCart;
  });
};

// Completely remove item from the cart
const deleteItemFromCart = (id) => {
  setCart((prev) => {
    const updatedCart = { ...prev };
    const product = updatedCart[id];
    if (product) {
      delete updatedCart[id];
      toast.success(`Deleted ${product.name} from cart`);
    }
    return updatedCart;
  });
};


  // Total number of items in the cart
  const totalItems = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);

  // Total price of items in the cart
  const totalPrice = Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, deleteItemFromCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

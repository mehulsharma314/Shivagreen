import React, { createContext, useContext, useEffect, useState } from 'react';
import products from './data/product';
import { toast } from 'react-hot-toast';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = sessionStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // ✅ Add item with id, weight, price
  const addToCart = (id, quantity = 1, weight, price) => {
    const numericId = Number(id);
    const product = products.find((p) => p.id === numericId);
    if (!product) return;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === numericId && item.weight === weight
      );

      if (existingIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += quantity;
        return updatedCart;
      } else {
        toast.success(`Added ${product.name} (${weight}) to cart`);
        return [
          ...prevCart,
          {
            id: numericId,
            name: product.name,
            image: product.image,
            weight,
            price,
            quantity
          }
        ];
      }
    });
  };

  const removeFromCart = (id, weight) => {
    setCart((prevCart) =>
      prevCart.reduce((acc, item) => {
        if (item.id === id && item.weight === weight) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          } else {
            toast.success(`Removed ${item.name} (${weight}) from cart`);
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  };

  const deleteItemFromCart = (id, weight) => {
    setCart((prevCart) =>
      prevCart.filter((item) => {
        const shouldDelete = item.id === id && item.weight === weight;
        if (shouldDelete) {
          toast.success(`Deleted ${item.name} (${weight}) from cart`);
        }
        return !shouldDelete;
      })
    );
  };

  // Total number of items
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        deleteItemFromCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

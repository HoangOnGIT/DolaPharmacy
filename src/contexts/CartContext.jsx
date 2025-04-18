import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import queryString from "query-string";
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const initialCart = {
    userId: null,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const [cart, setCart] = useState(initialCart);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const { user } = useAuth();
      const userId = { userId: user.id };
      fetch(`http://localhost:3000/api/carts?${queryString.stringify(userId)}`)
        .then((res) => res.json())
        .then((data) => {
          setCart(data);
        });
    } else {
      // Load cart from localStorage when no user is logged in
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        setCart(JSON.parse(localCart));
      } else {
        setCart(initialCart);
      }
    }
  }, []);

  const addToCart = (item) => {
    // Make a copy of the current cart items
    const currentItems = cart.items ? [...cart.items] : [];

    // Check if the item already exists in the cart
    const existingItemIndex = currentItems.findIndex(
      (cartItem) => cartItem.productId === item.id || cartItem.id === item.id
    );

    if (existingItemIndex >= 0) {
      // If item exists, increment its quantity
      currentItems[existingItemIndex].quantity += 1;
    } else {
      // If item doesn't exist, add it with quantity 1
      currentItems.push({
        ...item,
        productId: item.id, // Ensure we have productId for consistency
        quantity: 1,
      });
    }

    const updatedCart = {
      ...cart,
      items: currentItems,
      updatedAt: new Date(),
    };

    if (user) {
      // If user is logged in, update cart on server
      fetch(`http://localhost:3000/api/carts/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCart),
      })
        .then((response) => response.json())
        .then((serverCart) => {
          setCart(serverCart);
        })
        .catch((error) => {
          console.error("Error updating cart:", error);
          // Update local state anyway to keep UI consistent
          setCart(updatedCart);
        });
    } else {
      // If no user, store in localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      // Remove the item if the quantity is less than 1
      removeItemFromCart(itemId);
      return;
    }

    const updatedItems = cart.items.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );

    setCart({ ...cart, items: updatedItems });
    // Here you would also update the cart on the server
  };

  const removeItemFromCart = (itemId) => {
    const updatedItems = cart.items.filter((item) => item.id !== itemId);
    const updatedCart = { ...cart, items: updatedItems };

    if (user) {
      // If user is logged in, remove the item from the server
      fetch(`http://localhost:3000/api/carts/${user.id}/items/${itemId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to remove item from server");
          }
          return response.json();
        })
        .then(() => {
          setCart(updatedCart);
        })
        .catch((error) => {
          console.error("Error removing item from cart:", error);
        });
    } else {
      // If no user, update localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  const value = {
    cart,
    addToCart,
    updateItemQuantity,
    removeItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

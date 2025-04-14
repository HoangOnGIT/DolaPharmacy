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

  const { user } = useAuth();

  console.log(user);

  console.log(user && user.id);

  useEffect(() => {
    if (user) {
      const userId = { userId: user.id };
      fetch(`http://localhost:3000/api/carts?${queryString.stringify(userId)}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
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
  }, [user]);

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
    if (newQuantity < 1) return;

    const updatedItems = cart.items.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );

    setCart({ ...cart, items: updatedItems });
    // Here you would also update the cart on the server
  };

  const removeItemFromCart = (itemId) => {
    const updatedItems = cart.items.filter((item) => item.id !== itemId);
    setCart({ ...cart, items: updatedItems });
    // Here you would also update the cart on the server
  };

  const value = {
    cart,
    addToCart,
    updateItemQuantity,
    removeItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

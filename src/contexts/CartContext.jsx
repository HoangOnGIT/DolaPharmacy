import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import queryString from "query-string";
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const initialCart = {};

  const [cart, setCart] = useState(initialCart);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      const userId = { userId: user.id };
      const fetchCart = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/carts?${queryString.stringify(userId)}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch cart data");
          }
          const data = await response.json();
          setCart(data[0]);
        } catch (error) {
          console.error("Error fetching cart:", error);
          setCart(initialCart);
        }
      };
      fetchCart();
    } else {
      setCart(initialCart);
    }
  }, [isAuthenticated, user]);

  const sanitizeItem = (item) => ({
    id: item.id,
    productId: item.id,
    name: item.name,
    salePrice: item.salePrice,
    basePrice: item.basePrice,
    quantity: item.quantity || 1,
    images: item.images,
    variant: item.variant ? item.variant : item.variants[0].name,
  });

  const addToCart = async (item) => {
    try {
      if (!isAuthenticated || !user) {
        console.error("User must be logged in to add items to the cart.");
        return;
      }

      const sanitizedItem = sanitizeItem(item);
      const currentItems = cart.items ? [...cart.items] : [];
      const existingItemIndex = currentItems.findIndex(
        (cartItem) => cartItem.productId === sanitizedItem.productId
      );

      if (existingItemIndex >= 0) {
        currentItems[existingItemIndex].quantity += 1;
      } else {
        currentItems.push(sanitizedItem);
      }

      const updatedCart = {
        ...cart,
        items: currentItems,
        updatedAt: new Date(),
      };

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/carts/${cart.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedCart),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update cart on server");
      }
      const serverCart = await response.json();
      setCart(serverCart);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const addToCartWithDetail = async (item) => {
    try {
      if (!isAuthenticated || !user) {
        console.error("User must be logged in to add items to the cart.");
        return;
      }

      const sanitizedItem = sanitizeItem(item);
      const currentItems = cart.items ? [...cart.items] : [];
      const existingItemIndex = currentItems.findIndex(
        (cartItem) => cartItem.productId === sanitizedItem.productId
      );

      if (existingItemIndex >= 0) {
        currentItems[existingItemIndex].quantity += sanitizedItem.quantity;
      } else {
        currentItems.push(sanitizedItem);
      }

      const updatedCart = {
        ...cart,
        items: currentItems,
        updatedAt: new Date(),
      };

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/carts/${cart.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedCart),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update cart on server");
      }
      const serverCart = await response.json();
      setCart(serverCart);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    if (!isAuthenticated || !user) {
      console.error("User must be logged in to update item quantity.");
      return;
    }

    if (newQuantity < 1) {
      removeItemFromCart(itemId);
      return;
    }

    const updatedItems = cart.items.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );

    const updatedCart = {
      ...cart,
      items: updatedItems,
      updatedAt: new Date(),
    };

    setCart({ ...cart, items: updatedItems });

    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/api/carts/${cart.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedCart),
    })
      .then((response) => response.json())
      .then((serverCart) => {
        setCart(serverCart);
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
        setCart(updatedCart);
      });
  };

  const removeItemFromCart = (itemId) => {
    if (!isAuthenticated || !user) {
      console.error("User must be logged in to remove items from the cart.");
      return;
    }

    const updatedItems = cart.items.filter((item) => item.id !== itemId);
    const updatedCart = { ...cart, items: updatedItems };
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/api/carts/${cart.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedCart),
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
  };

  const emptyCart = async (item) => {
    try {
      if (!isAuthenticated || !user) {
        console.error("User must be logged in to add items to the cart.");
        return;
      }

      const updatedCart = {
        ...cart,
        items: [],
        updatedAt: new Date(),
      };

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/carts/${cart.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedCart),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update cart on server");
      }
      const serverCart = await response.json();
      setCart(serverCart);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const value = {
    cart,
    addToCart,
    addToCartWithDetail,
    updateItemQuantity,
    removeItemFromCart,
    emptyCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

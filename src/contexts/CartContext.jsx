import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import queryString from "query-string";
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const CartProvider = ({ children }) => {
  const initialCart = { items: [] };

  // Try to get cart from localStorage first
  const getInitialCart = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart && JSON.parse(savedCart)?.items
      ? JSON.parse(savedCart)
      : initialCart;
  };

  const [cart, setCart] = useState(getInitialCart);
  const { isAuthenticated, user } = useAuth();

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (isAuthenticated && user) {
      const userId = { userId: user.id };
      const fetchCart = async () => {
        try {
          const response = await fetch(
            `${BASE_URL}/api/carts?${queryString.stringify(userId)}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch cart data");
          }
          const data = await response.json();

          // If server cart exists, use it, otherwise keep using local cart
          if (data && data[0]) {
            setCart(data[0]);
            localStorage.setItem("cart", JSON.stringify(data[0]));
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
          // Don't reset cart on error, keep using current cart
        }
      };
      fetchCart();
    } else {
      // For non-authenticated users, keep using the local cart
      // No need to reset the cart here
      const localCart = getInitialCart();

      // Only set the cart if it's different from current cart
      if (JSON.stringify(localCart) !== JSON.stringify(cart)) {
        setCart(localCart);
      }
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
    variant: item.variant ? item.variant : { name: "Không phân loại" },
  });

  const addToCart = async (item) => {
    try {
      // if (!isAuthenticated || !user) {
      //   console.error("User must be logged in to add items to the cart.");
      //   return;
      // }

      const sanitizedItem = sanitizeItem(item);
      const currentItems = cart.items ? [...cart.items] : [];
      const existingItemIndex = currentItems.findIndex(
        (cartItem) =>
          cartItem.id === sanitizedItem.id &&
          (sanitizedItem.variant.name !== "Không phân loại"
            ? sanitizedItem.variant.id === cartItem.variant.id
            : true)
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

      // Update localStorage immediately
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);

      if (isAuthenticated) {
        const token = localStorage.getItem("token");

        const response = await fetch(`${BASE_URL}/api/carts/${cart.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedCart),
        });
        if (!response.ok) {
          throw new Error("Failed to update cart on server");
        }
        const serverCart = await response.json();
        setCart(serverCart);
        // Update localStorage with server response
        localStorage.setItem("cart", JSON.stringify(serverCart));
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const addToCartWithDetail = async (item) => {
    try {
      // if (!isAuthenticated || !user) {
      //   console.error("User must be logged in to add items to the cart.");
      //   return;
      // }

      const sanitizedItem = sanitizeItem(item);
      const currentItems = cart.items ? [...cart.items] : [];

      const existingItemIndex = currentItems.findIndex(
        (cartItem) =>
          cartItem.id === sanitizedItem.id &&
          (sanitizedItem.variant.name !== "Không phân loại"
            ? sanitizedItem.variant.id === cartItem.variant.id
            : true)
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

      // Update localStorage immediately
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);

      if (isAuthenticated) {
        const token = localStorage.getItem("token");

        const response = await fetch(`${BASE_URL}/api/carts/${cart.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedCart),
        });
        if (!response.ok) {
          throw new Error("Failed to update cart on server");
        }
        const serverCart = await response.json();
        setCart(serverCart);
        // Update localStorage with server response
        localStorage.setItem("cart", JSON.stringify(serverCart));
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const updateItemQuantity = (itemNew, newQuantity) => {
    // if (!isAuthenticated || !user) {
    //   console.error("User must be logged in to update item quantity.");
    //   return;
    // }

    if (newQuantity < 1) {
      removeItemFromCart(itemNew);
      return;
    }

    const updatedItems = cart.items.map((item) => {
      // Check if item has the same product ID
      if (item.id === itemNew.id) {
        // If both items have variants, check if the variant IDs match
        if (item.variant && itemNew.variant) {
          if (item.variant.id === itemNew.variant.id) {
            return { ...item, quantity: newQuantity };
          }
        }
        // If neither has a variant or the item has "Không phân loại" variant
        else if (
          (!item.variant && !itemNew.variant) ||
          (item.variant && item.variant.name === "Không phân loại")
        ) {
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    });

    const updatedCart = {
      ...cart,
      items: updatedItems,
      updatedAt: new Date(),
    };

    setCart(updatedCart);
    // Update localStorage immediately
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (isAuthenticated) {
      const token = localStorage.getItem("token");

      fetch(`${BASE_URL}/api/carts/${cart.id}`, {
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
          // Update localStorage with server response
          localStorage.setItem("cart", JSON.stringify(serverCart));
        })
        .catch((error) => {
          console.error("Error updating cart:", error);
          setCart(updatedCart);
        });
    }
  };

  const removeItemFromCart = (item) => {
    // if (!isAuthenticated || !user) {
    //   console.error("User must be logged in to remove items from the cart.");
    //   return;
    // }

    // Handle both cases: when item is an ID or when it's a full item object
    const isItemObject = typeof item === "object";
    const itemId = isItemObject ? item.id : item;

    const updatedItems = cart.items.filter((cartItem) => {
      // Different product ID - keep the item
      if (cartItem.id !== item.id) return true;

      // Same product ID - check variants
      if (item.variant && item.variant.id) {
        // Item has a variant with ID - only remove if variant IDs match
        return !(cartItem.variant && cartItem.variant.id === item.variant.id);
      } else if (item.variant && item.variant.name === "Không phân loại") {
        // For default variant, remove items with matching ID and default variant
        return !(
          cartItem.variant && cartItem.variant.name === "Không phân loại"
        );
      } else {
        // No variant in the item to remove - remove any item with matching ID without variant
        return cartItem.variant !== undefined && cartItem.variant !== null;
      }
    });

    const updatedCart = { ...cart, items: updatedItems, updatedAt: new Date() };

    // Update localStorage immediately
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);

    if (isAuthenticated && cart.id) {
      const token = localStorage.getItem("token");

      fetch(`${BASE_URL}/api/carts/${cart.id}`, {
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
        .then((serverCart) => {
          setCart(serverCart);
          // Update localStorage with server response
          localStorage.setItem("cart", JSON.stringify(serverCart));
        })
        .catch((error) => {
          console.error("Error removing item from cart:", error);
        });
    }
  };

  const emptyCart = async (item) => {
    try {
      const updatedCart = {
        ...cart,
        items: [],
        updatedAt: new Date(),
      };

      // Update localStorage immediately
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);

      if (isAuthenticated) {
        const token = localStorage.getItem("token");

        const response = await fetch(`${BASE_URL}/api/carts/${cart.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedCart),
        });
        if (!response.ok) {
          throw new Error("Failed to update cart on server");
        }
        const serverCart = await response.json();
        setCart(serverCart);
        // Update localStorage with server response
        localStorage.setItem("cart", JSON.stringify(serverCart));
      }
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

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";

const FavContext = createContext();

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useFav = () => useContext(FavContext);

const FavProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  const [favList, setFavList] = useState({});

  useEffect(() => {
    if (isAuthenticated && user) {
      const userId = { userId: user.id };

      console.log(
        `${BASE_URL}/api/favourites?${queryString.stringify(userId)}`
      );
      const fetchCart = async () => {
        try {
          const response = await fetch(
            `${BASE_URL}/api/favourites?${queryString.stringify(userId)}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch cart data");
          }
          const data = await response.json();

          setFavList(data[0]);
        } catch (error) {
          console.error("Error fetching cart:", error);
          setFavList({});
        }
      };
      fetchCart();
    }
  }, [isAuthenticated, user]);

  const toggleFavourite = async (item) => {
    try {
      const currentItems = favList.items;

      const existingItemIndex = currentItems.findIndex(
        (favItem) => favItem.id === item.id
      );
      let updatedItems = currentItems;

      if (existingItemIndex >= 0) {
        updatedItems = currentItems.filter((favItem) => favItem.id !== item.id);
      } else {
        updatedItems.push(item);
      }

      const token = localStorage.getItem("token");

      const updatedFavList = { ...favList, items: updatedItems };
      const response = await fetch(`${BASE_URL}/api/favourites/${favList.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFavList),
      });

      if (!response.ok) {
        throw new Error("Failed to favourite list on server");
      }

      const serverFavList = await response.json();
      setFavList(serverFavList);
    } catch (err) {
      console.error(err);
    }
  };

  const value = { favList, toggleFavourite };

  return <FavContext.Provider value={value}> {children} </FavContext.Provider>;
};

export default FavProvider;

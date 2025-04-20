import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";

const FavContext = createContext();

export const useFav = () => useContext(FavContext);

const FavProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  const [favList, setFavList] = useState({});

  useEffect(() => {
    if (isAuthenticated && user) {
      const userId = { userId: user.id };
      console.log(
        `http://localhost:3000/api/favourites?${queryString.stringify(userId)}`
      );
      const fetchCart = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/favourites?${queryString.stringify(
              userId
            )}`
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
      console.log("current items: ", currentItems);

      const existingItemIndex = currentItems.findIndex(
        (favItem) => favItem.id === item.id
      );
      let updatedItems = currentItems;

      if (existingItemIndex >= 0) {
        updatedItems = currentItems.filter((favItem) => favItem.id !== item.id);
        console.log("item bi xoa: ", updatedItems);
      } else {
        updatedItems.push(item);
        console.log("item duoc them: ", updatedItems);
      }

      const token = localStorage.getItem("token");

      const updatedFavList = { ...favList, items: updatedItems };

      console.log(`http://localhost:3000/api/favourites/${favList.id}`);

      const response = await fetch(
        `http://localhost:3000/api/favourites/${favList.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFavList),
        }
      );

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

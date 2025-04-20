import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import queryString from "query-string";

const FavContext = createContext();

export const useFav = () => useContext(FavContext);

const FavProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [favList, setFavList] = useState({});

  useEffect(() => {
    if (isAuthenticated && user) {
      const userId = { userId: user.id };
      const fetchCart = async () => {
        try {
          console.log(
            `http://localhost:3000/api/favourites/?${queryString.stringify(
              userId
            )}`
          );

          const response = await fetch(
            `http://localhost:3000/api/favourites/?${queryString.stringify(
              userId
            )}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch cart data");
          }
          const data = await response.json();

          setFavList(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching cart:", error);
          setFavList({});
        }
      };
      fetchCart();
    }
  }, []);

  const value = { favList };

  return <FavContext.Provider value={value}> {children} </FavContext.Provider>;
};

export default FavProvider;

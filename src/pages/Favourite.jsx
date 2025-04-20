import React from "react";
import { useFav } from "../contexts/FavouriteContext";

function Favourite() {
  const { favList } = useFav(); // Provide a default value for favList

  console.log(favList);

  return <div>Favourite</div>;
}

export default Favourite;

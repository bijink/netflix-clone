import React, { useState } from "react";
import { createContext } from "react";

export const MovieDetailsContext = createContext({});

const MovieDetailsContextProvider = (props) => {
   const [details, setDetails] = useState([]);

   return (
      <MovieDetailsContext.Provider value={{ details, setDetails }}>{props.children}</MovieDetailsContext.Provider>
   );
};

export default MovieDetailsContextProvider;

import React, { useState } from 'react';
import { createContext } from 'react';

export const MovieDetailsCC = createContext(null);

const MovieDetailsContext = (props) => {

   const [details, setDetails] = useState([]);

   return (
      <MovieDetailsCC.Provider value={{ details, setDetails }}>
         {props.children}
      </MovieDetailsCC.Provider>
   );
};

export default MovieDetailsContext;

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import MovieDetailsContextProvider from "./Context/MovieDetails.context";
import VideoPopUpContextProvider from "./Context/VideoPopUp.context";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
   <React.StrictMode>
      <CookiesProvider>
         <VideoPopUpContextProvider>
            <MovieDetailsContextProvider>
               <App />
            </MovieDetailsContextProvider>
         </VideoPopUpContextProvider>
      </CookiesProvider>
   </React.StrictMode>,
   document.getElementById("root")
);

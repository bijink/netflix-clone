import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import VideoPopUpContextProvider from "./Context/VideoPopUp.context";

ReactDOM.render(
   <React.StrictMode>
      <VideoPopUpContextProvider>
         <App />
      </VideoPopUpContextProvider>
   </React.StrictMode>,
   document.getElementById("root")
);

import React, { useState } from "react";
import { createContext } from "react";

export const VideoPopUpContext = createContext({});

const VideoPopUpContextProvider = (props) => {
   const [videoPopUpTrigger, setVideoPopUpTrigger] = useState(false);

   videoPopUpTrigger ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "visible");

   return (
      <VideoPopUpContext.Provider value={{ videoPopUpTrigger, setVideoPopUpTrigger }}>
         {props.children}
      </VideoPopUpContext.Provider>
   );
};

export default VideoPopUpContextProvider;

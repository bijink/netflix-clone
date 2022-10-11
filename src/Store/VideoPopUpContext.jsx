import React, { useState } from "react";
import { createContext } from "react";

export const VideoPopUpCC = createContext(null);

const VideoPopUpContext = (props) => {
   const [videoPopUpTrigger, setVideoPopUpTrigger] = useState(false);

   return (
      <VideoPopUpCC.Provider value={{ videoPopUpTrigger, setVideoPopUpTrigger }}>
         {props.children}
      </VideoPopUpCC.Provider>
   );
};

export default VideoPopUpContext;

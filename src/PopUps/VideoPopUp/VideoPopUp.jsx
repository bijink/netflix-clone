import React from 'react';
import { useContext } from 'react';
import { VideoPopUpCC } from '../../Store/VideoPopUpContext';
import './VideoPopUp.css';

const VideoPopUp = (props) => {
   const { setVideoPopUpTrigger } = useContext(VideoPopUpCC);

   return (
      <div className="parentVideoPopUp">
         <h1 onClick={() => { setVideoPopUpTrigger(false); }} >Close</h1>
         {props.children}
      </div>
   );
};

export default VideoPopUp;

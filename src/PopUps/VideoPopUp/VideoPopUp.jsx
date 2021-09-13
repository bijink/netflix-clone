import React from 'react';
import { useContext } from 'react';
import { VideoPopUpCC } from '../../Store/VideoPopUpContext';
import './VideoPopUp.css';

const VideoPopUp = (props) => {
   const { setVideoPopUpTrigger } = useContext(VideoPopUpCC);
   // const ee = props.shade;

   return (
      // <div className="parentVideoPopUp" style={{ backgroundColor: props.shade ,width:props.width,height:props.height,top:props.top,left:props.left,}}>
      <div className={props.shade ? 'parentVideoPopUp_banner' : 'parentVideoPopUp'}>
         <div className="close">
            <i onClick={() => setVideoPopUpTrigger(false)} className="fas fa-times-circle"></i>
         </div>
         {props.children}
      </div >
   );
};

export default VideoPopUp;
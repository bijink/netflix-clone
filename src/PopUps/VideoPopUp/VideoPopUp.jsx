import React from 'react';
import './VideoPopUp.scss';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { VideoPopUpCC } from '../../Store/VideoPopUpContext';

const VideoPopUp = (props) => {
   const { setVideoPopUpTrigger } = useContext(VideoPopUpCC);

   const history = useHistory();

   return (
      <div className={props.shade ? 'parentVideoPopUp_banner' : 'parentVideoPopUp'}>
         <div className="close">
            <i onClick={() => {
               setVideoPopUpTrigger(false);
               if (props.historys) {
                  history.push('/');
               } else {
                  history.push('/');
                  history.push('/details');
               }
            }} className="fas fa-times-circle"></i>
         </div>
         {props.children}
      </div >
   );
};

export default VideoPopUp;

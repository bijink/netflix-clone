import React from "react";
import './VideoPopUp.scss';
import { useContext } from 'react';
import { VideoPopUpCC } from '../../Store/VideoPopUpContext';
import { useHistory } from 'react-router';

const VideoPopUp = ({ banner, urlId, videoCount, videoLenght, handleVideo }) => {
   const { setVideoPopUpTrigger } = useContext(VideoPopUpCC);

   const history = useHistory();

   // console.log(urlId);

   return (
      <>
         <div className={`videoBgShade_${banner ? 'banner' : 'movieDetails'}`}>
            <iframe
               className="videoFrame"
               width="853"
               height="480"
               src={`https://www.youtube.com/embed/${urlId.key}`}
               frameBorder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
               title="Embedded youtube"
            />

            {(!(videoCount === 0)) && <i className="videoBackBtn fas fa-chevron-circle-left" onClick={() => handleVideo('back')} ></i>}
            {(!(videoCount === (videoLenght - 1))) && < i className="videoNextBtn fas fa-chevron-circle-right" onClick={() => handleVideo('next')} ></i>}

            <div className="closeBtn">
               <i onClick={() => {
                  setVideoPopUpTrigger(false);
                  if (banner) {
                     history.push('/');
                  } else {
                     history.push('/');
                     history.push('/details');
                  }
               }} className="fas fa-times-circle"></i>
            </div>
         </div>
      </>
   );
};

export default VideoPopUp;

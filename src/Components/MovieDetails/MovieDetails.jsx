import React, { useContext, useState } from 'react';
import { MovieDetailsCC } from '../../Store/MovieDetailsContext';
import './MovieDetails.css';
import { API_KEY, imageUrl } from '../../Constants/Constants';
import YouTube from 'react-youtube';
import axios from '../../Axios';
import VideoPopUp from '../../PopUps/VideoPopUp/VideoPopUp';
import { VideoPopUpCC } from '../../Store/VideoPopUpContext';

const MovieDetails = () => {
   const { details } = useContext(MovieDetailsCC);
   console.log(details);
   const [urlId, setUrlId] = useState();
   // console.log(urlId);
   const { videoPopUpTrigger, setVideoPopUpTrigger } = useContext(VideoPopUpCC);

   const handleVideo = () => {
      console.log(details.id);
      axios.get(`/movie/${details.id}/videos?api_key=${API_KEY}&language=en-US`).then(res => {
         if (res.data.length !== 0) {
            console.log(res.data.results[0]);
            setVideoPopUpTrigger(true);
            setUrlId(res.data.results[0]);
         }
      });
   };

   const opts = {
      height: '533',
      width: '100%',
      playerVars: {
         autoplay: 1,
      },
   };

   return (
      <div className="parentDivMovieDetails" style={{ backgroundImage: `url(${details && (imageUrl + details.backdrop_path)})` }}>
         <div className="shadeDiv">
            <div className="sidePoster">
               <img src={imageUrl + details.poster_path} alt="" />
            </div>
            <div className="movieDetails">
               <h1>{details.name || details.title}</h1>
               <p>{details.release_date} </p>
               <h1 onClick={handleVideo} className="Teaser" >{details.poster_path ? 'Teaser' : ''}</h1>
            </div>
         </div>
         {
            videoPopUpTrigger &&
            <VideoPopUp>
               <div className="video">
                  {urlId && <YouTube videoId={urlId.key} opts={opts} />}
               </div>
            </VideoPopUp>
         }
      </div>
   );
};

export default MovieDetails;

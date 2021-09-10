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
               <br />
               <p className="overview" >{details.overview && details.overview}</p>
               <br />
               <p>{details.release_date && `Release Date : ${details.release_date}`} </p>
               <p>{details.vote_average && `Rating (average) : ${details.vote_average} / 10`} </p>
               <br />
               <h2 onClick={handleVideo} className="Teaser" ><i className={`${details.id && 'fab fa-youtube'}`}></i> {details.id && 'Teaser / Making'}</h2>
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

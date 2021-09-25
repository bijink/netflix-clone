import React, { useContext, useEffect, useState } from 'react';
import './MovieDetails.scss';
import { MovieDetailsCC } from '../../Store/MovieDetailsContext';
import { API_KEY, imageUrl } from '../../Constants/Constants';
import axios from '../../Axios';
import VideoPopUp from '../../PopUps/VideoPopUp/VideoPopUp';
import { VideoPopUpCC } from '../../Store/VideoPopUpContext';
import YoutubeEmbed from '../YoutubeEmbed/YoutubeEmbed';

const MovieDetails = () => {
   const [urlId, setUrlId] = useState();
   // console.log(urlId);
   var [count, setCount] = useState(0);
   const [lg, setLg] = useState();
   // console.log(count);

   const { details } = useContext(MovieDetailsCC);
   // console.log(details);
   const { videoPopUpTrigger, setVideoPopUpTrigger } = useContext(VideoPopUpCC);

   useEffect(() => {
      setVideoPopUpTrigger(false);
      return () => {
      };
   }, [setVideoPopUpTrigger]);

   const handleVideo = (backNext) => {
      if (!videoPopUpTrigger) {
         setCount(count = 0);
      } else {
         if (backNext === 'back') {
            if (count === 0)
               setCount(count = (lg - 1));
            else
               setCount(count -= 1);
         } else if (backNext === 'next') {
            if (count < (lg - 1))
               setCount(count += 1);
            else
               setCount(count = 0);
         }
      }
      // console.log(details.id);
      axios.get(`/movie/${details.id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
         if (response.data.results.length !== 0) {
            // console.log(response.data.results[0]);
            // console.log(response.data.results);
            setVideoPopUpTrigger(true);
            setUrlId(response.data.results[count]);
            setLg(response.data.results.length);
         } else {
            alert('Sorry, There is no video available');
         }
      });
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
               <h2 onClick={() => handleVideo()} className="Teaser" ><i className={`${details.id && 'fab fa-youtube'}`}></i> {details.id && 'Teaser / Making'}</h2>
            </div>
         </div>
         {
            videoPopUpTrigger &&
            <VideoPopUp>
               {urlId ? < YoutubeEmbed embedId={urlId.key} /> : <h1 className="noVideo">This video is unavailable.</h1>}
               {(urlId && !(count === 0)) && <i className="videoBtn videoBackbtn fas fa-chevron-circle-left" onClick={() => handleVideo('back')} ></i>}
               {(urlId && !(count === (lg - 1))) && < i className="videoBtn videoNextbtn fas fa-chevron-circle-right" onClick={() => handleVideo('next')} ></i>}
            </VideoPopUp>
         }
      </div >
   );
};

export default MovieDetails;

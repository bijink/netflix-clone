import React, { useContext, useEffect, useState } from 'react';
import './Banner.css';
import axios from '../../Axios';
import { API_KEY, imageUrl } from '../../Constants/Constants';
import { MovieDetailsCC } from '../../Store/MovieDetailsContext';
import VideoPopUp from '../../PopUps/VideoPopUp/VideoPopUp';
import { VideoPopUpCC } from '../../Store/VideoPopUpContext';
import YouTube from 'react-youtube';

function Banner(props) {

   const [movie, setMovie] = useState();
   // const { details } = useContext(MovieDetailsCC);
   const [urlId, setUrlId] = useState();
   const { videoPopUpTrigger, setVideoPopUpTrigger } = useContext(VideoPopUpCC);


   const handleVideo = () => {
      // console.log(details.id);
      axios.get(`/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`).then(res => {
         if (res.data.length !== 0) {
            console.log(res.data.results[0]);
            setVideoPopUpTrigger(true);
            setUrlId(res.data.results[0]);
         }
      });
   };

   const opts = {
      height: '390',
      width: '100%',
      playerVars: {
         autoplay: 1,
      },
   };

   useEffect(() => {
      axios.get(props.url).then((response) => {
         console.log(response.data);
         const index = Math.floor(Math.random() * response.data.results.length);
         console.log(response.data.results[index]);
         setMovie(response.data.results[index]);
      });
   }, []);

   return (
      <div className="banner" style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ''})` }}>
         <div className="fade_content">
            <div className="content">
               <h1 className="title">{movie ? movie.title || movie.name : ''}</h1>
               <div className="banner_button">
                  <button className="button" onClick={handleVideo}>Play</button>
                  <button className="button">My List</button>
               </div>
               <p className="description">{movie ? movie.overview : ''}</p>
            </div>
            <div className="fade_bottom"></div>
         </div>
         {
            videoPopUpTrigger &&
            // <VideoPopUp shade={'rgba(0, 0, 0, 0.762)'} width={'100%'} top={'0'} left={'0'} height={'100vh'}>
            // <VideoPopUp shade={'rgba(0, 0, 0, 0'} width={'100%'} top={'0'} left={'0'} height={'100vh'}>
            <VideoPopUp shade={true}>
               <div className="video">
                  {
                     urlId && <YouTube videoId={urlId.key} opts={opts} />
                  }
               </div>
            </VideoPopUp>
         }
      </div>
   );

}

export default Banner;
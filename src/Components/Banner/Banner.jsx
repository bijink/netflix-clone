import React, { useContext, useEffect, useState } from 'react';
import './Banner.css';
import axios from '../../Axios';
import { API_KEY, imageUrl } from '../../Constants/Constants';
import { MovieDetailsCC } from '../../Store/MovieDetailsContext';
import VideoPopUp from '../../PopUps/VideoPopUp/VideoPopUp';
import { VideoPopUpCC } from '../../Store/VideoPopUpContext';
import YouTube from 'react-youtube';
import YoutubeEmbed from '../YoutubeEmbed/YoutubeEmbed';
// import YoutubeEmbed from '../../YoutubeEmbed';

function Banner(props) {

   const [movie, setMovie] = useState();
   // const { details } = useContext(MovieDetailsCC);
   const [urlId, setUrlId] = useState();
   const { videoPopUpTrigger, setVideoPopUpTrigger } = useContext(VideoPopUpCC);
   var [count, setCount] = useState(0);
   const [lg, setLg] = useState();

   const handleVideo = (backNext) => {
      // console.log(details.id);
      if (!videoPopUpTrigger) {
         setCount(count = 0);
      } else {
         if (backNext === 'back') {
            if (count == 0)
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
      axios.get(`/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
         // console.log(response);
         // console.log(response.data);
         if (response.data.results.length !== 0) {
            console.log(response.data);
            setVideoPopUpTrigger(true);
            // response.data.results[0] && setUrlId(response.data.results[0].key);
            setUrlId(response.data.results[count]);
            setLg(response.data.results.length);
         } else {
            alert('Sorry, There is no video available');
         }
      });
   };

   useEffect(() => {
      setVideoPopUpTrigger(false);
      axios.get(props.url).then((response) => {
         console.log(response.data);
         const index = Math.floor(Math.random() * response.data.results.length);
         console.log(response.data.results[index]);
         setMovie(response.data.results[index]);
         // setMovie(response.data.results[12]);
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
            <VideoPopUp shade={true} history={true}>
               {/* <div className="video">
                  {
                     urlId && <YouTube videoId={urlId.key} opts={opts} />
                  }
               </div> */}
               {urlId ? <YoutubeEmbed embedId={urlId.key} styles={true} /> : <h1 className="noVideo">This video is unavailable.</h1>}
               {(urlId && !(count == 0)) && <i className="videoBtn videoBackbtn_b fas fa-chevron-circle-left" onClick={() => handleVideo('back')} ></i>}
               {(urlId && !(count == (lg - 1))) && < i className="videoBtn videoNextbtn_b fas fa-chevron-circle-right" onClick={() => handleVideo('next')} ></i>}
            </VideoPopUp>
         }
      </div>
   );

}

export default Banner;
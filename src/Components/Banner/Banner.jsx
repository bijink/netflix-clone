import React, { useContext, useEffect, useState } from 'react';
import './Banner.scss';
import axios from '../../Axios';
import { API_KEY, imageUrl } from '../../Constants/Constants';
import { MovieDetailsCC } from '../../Store/MovieDetailsContext';
import { VideoPopUpCC } from '../../Store/VideoPopUpContext';
import { useHistory } from 'react-router';
import VideoPopUp from '../VideoPopUp/VideoPopUp';


function Banner(props) {
   const [movie, setMovie] = useState();
   const [urlId, setUrlId] = useState();
   var [count, setCount] = useState(0);
   const [lg, setLg] = useState();

   const { videoPopUpTrigger, setVideoPopUpTrigger } = useContext(VideoPopUpCC);
   const { setDetails } = useContext(MovieDetailsCC);

   const history = useHistory();

   const handleVideo = (backNext) => {
      // console.log(details.id);
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
      axios.get(`/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
         // console.log(response);
         // console.log(response.data);
         if (response.data.results.length !== 0) {
            // console.log(response.data);
            setVideoPopUpTrigger(true);
            setUrlId(response.data.results[count]);
            setLg(response.data.results.length);
         } else {
            alert('Sorry, There is no video available');
         }
      }).catch((err) => {
         err && alert('Sorry, There is no video available');
      });
   };

   const handleMovieDetails = (data) => {
      setDetails(data);
      history.push('/details');
   };

   useEffect(() => {
      setVideoPopUpTrigger(false);
      axios.get(props.url).then((response) => {
         // console.log(response.data);
         const index = Math.floor(Math.random() * response.data.results.length);
         // console.log(response.data.results[index]);
         setMovie(response.data.results[index]);
      });
   }, [props.url, setVideoPopUpTrigger]);

   return (
      <div className="banner" style={{ backgroundImage: `url(${movie ? imageUrl + '/original' + movie.backdrop_path : ''})` }}>
         <div className="fade_content">
            <div className="content">
               <div className='flex_div'></div>
               <h1 className="title">{movie ? movie.title || movie.name : ''}</h1>
               <div className="banner_button">
                  <button className="button" onClick={handleVideo}><i className="fas fa-play"></i> Play</button>
                  <button className="button" onClick={() => handleMovieDetails(movie)}><i className="fas fa-info-circle"></i> More Info</button>
               </div>
               <p className="description">{movie ? movie.overview : ''}</p>
            </div>
         </div>
         <div className="fade_bottom"></div>
         {
            videoPopUpTrigger &&
            // (urlId ? < VideoPopUp banner urlId={urlId} videoCount={count} videoLenght={lg} handleVideo={handleVideo} /> : <h1 className="noVideo">This video is unavailable.</h1>)
            (urlId && < VideoPopUp banner urlId={urlId} videoCount={count} videoLenght={lg} handleVideo={handleVideo} />)
         }
      </div>
   );
}

export default Banner;

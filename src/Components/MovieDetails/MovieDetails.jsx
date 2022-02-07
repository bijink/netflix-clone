import React, { useContext, useEffect, useState } from 'react';
import './MovieDetails.scss';
import { MovieDetailsCC } from '../../Store/MovieDetailsContext';
import { API_KEY, imageUrl } from '../../Constants/Constants';
import axios from '../../Axios';
import { VideoPopUpCC } from '../../Store/VideoPopUpContext';
import VideoPopUp from '../VideoPopUp/VideoPopUp';
import { useCookies } from 'react-cookie';


const MovieDetails = () => {
   const [cookies, setCookie] = useCookies(['Netflix_cookie']);

   const { details } = useContext(MovieDetailsCC);
   // console.log(details);
   const { videoPopUpTrigger, setVideoPopUpTrigger } = useContext(VideoPopUpCC);

   const [urlId, setUrlId] = useState();
   // console.log(urlId);
   var [count, setCount] = useState(0);
   const [lg, setLg] = useState();
   // console.log(count);
   // getting stored movieDetails data from cookies and setting to state
   const [movieDetails] = useState((details.length !== 0) ? details : (cookies.movie_details));


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
      // axios.get(`/movie/${details.id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
      axios.get(`/movie/${movieDetails.id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
         if (response.data.results.length !== 0) {
            // console.log(response.data.results[0]);
            // console.log(response.data.results);
            // console.log(response.data);
            // console.log(response);
            setVideoPopUpTrigger(true);
            setUrlId(response.data.results[count]);
            setLg(response.data.results.length);
         } else {
            alert('Sorry, There is no video available');
         }
         // }).catch((err) => console.log(err));
      }).catch((err) => {
         err && alert('Sorry, There is no video available');
      });
   };


   useEffect(() => {
      setVideoPopUpTrigger(false);

      // storing movieDetails data to browser cookies
      ((details.length !== 0)) && (setCookie('movie_details', details, { path: '/' }));
   }, [setVideoPopUpTrigger]);


   return (
      <div className="parentDivMovieDetails" style={{ backgroundImage: `url(${imageUrl + '/original' + movieDetails.backdrop_path})` }}>
         <div className="shadeDiv">
            <div className="flex-div"></div>
            <div className="movieContent">
               <div className="sidePoster">
                  <img src={imageUrl + '/original' + movieDetails.poster_path} alt="Movie Poster" />
               </div>
               <div className="movieDetails">
                  <h1 className='title' >{movieDetails.name || movieDetails.title}</h1>
                  <br />
                  <p className="overview" >{movieDetails.overview && movieDetails.overview}</p>
                  <br />
                  <p>{movieDetails.release_date && `Release Date : ${movieDetails.release_date}`} </p>
                  <p>{movieDetails.vote_average && `Rating (Avg) : ${movieDetails.vote_average} / 10`} </p>
                  <br />
                  {movieDetails.id && <h2 onClick={() => handleVideo()} className="Teaser" ><i className="fab fa-youtube"></i>Watch Teaser/Making</h2>}
               </div>
            </div>
         </div>
         {
            videoPopUpTrigger &&
            ((urlId) && < VideoPopUp urlId={urlId} videoCount={count} videoLenght={lg} handleVideo={handleVideo} />)
         }
      </div >
   );
};

export default MovieDetails;

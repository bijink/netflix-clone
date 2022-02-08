import React, { useContext, useEffect, useState } from 'react';
import './MovieDetails.scss';
import { MovieDetailsCC } from '../../Store/MovieDetailsContext';
import { API_KEY, imageUrl } from '../../Constants/Constants';
import { VideoPopUpCC } from '../../Store/VideoPopUpContext';
import VideoPopUp from '../VideoPopUp/VideoPopUp';
import { useCookies } from 'react-cookie';
import axios from "../../Axios";


const MovieDetails = () => {
   const [cookies, setCookie] = useCookies(['Netflix_cookie']);

   const { details } = useContext(MovieDetailsCC);
   const { videoPopUpTrigger, setVideoPopUpTrigger } = useContext(VideoPopUpCC);

   // getting stored movieDetails data from cookies and setting to state
   const [movieDetails] = useState((details.length !== 0) ? details : (cookies.movie_details));


   const handleVideo = () => {
      axios.get(`/movie/${movieDetails.id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
         if (response.data.results.length !== 0) {
            setVideoPopUpTrigger(true);
         } else {
            alert('Sorry, There is no video available');
         }
      }).catch((err) => {
         err && alert('Sorry, There is no video available');
      });
   };


   useEffect(() => {
      setVideoPopUpTrigger(false);

      // storing movieDetails data to browser cookies
      // ((details.length !== 0)) && (setCookie('movie_details', details, { path: '/' }));
      ((details.length !== 0)) && (setCookie('movie_details', details, { path: '/details' }));
   }, [setVideoPopUpTrigger, details, setCookie]);


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
                  {movieDetails.id && <button className="Teaser" onClick={() => handleVideo()} ><i className="fab fa-youtube"></i>Watch videos</button>}
               </div>
            </div>
         </div>
         {videoPopUpTrigger && <VideoPopUp movieDetails={movieDetails} />}
      </div>
   );
};

export default MovieDetails;

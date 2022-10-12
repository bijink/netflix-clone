import React, { useContext, useEffect, useState } from "react";
import "./MovieDetails.scss";
import { MovieDetailsContext, VideoPopUpContext } from "../../Context";
import VideoPopUp from "../VideoPopUp/VideoPopUp";
import { useHistory } from "react-router-dom";
import { axios_instance } from "../../Utils/axios.utils";
import { imgUrl } from "../../Data/constant.data";

const MovieDetails = () => {
   const history = useHistory();

   const { details } = useContext(MovieDetailsContext);
   const { videoPopUpTrigger, setVideoPopUpTrigger } = useContext(VideoPopUpContext);

   // const [movieDetails] = useState(details);
   //
   // getting stored movieDetails data from localStorage and setting to state
   // const [movieDetails] = useState((details.length !== 0) ? details : JSON.parse(localStorage.getItem("netflix_movie_details")));
   //
   // getting stored movieDetails data from cookies and setting to state
   // const [movieDetails] = useState((details.length !== 0) ? details : (cookies.movie_details));
   //
   // getting stored movieDetails data from sessionStorage and setting to state
   const [movieDetails] = useState(
      details.length !== 0 ? details : JSON.parse(sessionStorage.getItem("netflix_movie_details"))
   );

   window.onpopstate = function () {
      videoPopUpTrigger && history.goForward();
   };

   const handleVideo = () => {
      axios_instance
         .get(`/movie/${movieDetails.id}/videos?language=en-US`)
         .then((response) => {
            if (response.data.results.length !== 0) {
               setVideoPopUpTrigger(true);
            } else {
               alert("Sorry, There is no video available");
            }
         })
         .catch((err) => {
            err && alert("Sorry, There is no video available");
         });
   };

   useEffect(() => {
      setVideoPopUpTrigger(false);

      // storing movieDetails data to browser localStorage
      // ((details.length !== 0)) && (localStorage.setItem("netflix_movie_details", JSON.stringify(movieDetails)));
      //
      // storing movieDetails data to browser cookies
      // ((details.length !== 0)) && (setCookie('movie_details', details, { path: '/' }));
      //
      // storing movieDetails data to browser sessionStorage
      details.length !== 0 && sessionStorage.setItem("netflix_movie_details", JSON.stringify(movieDetails));
   }, [setVideoPopUpTrigger, details, movieDetails]);

   return (
      <div
         className="parentDivMovieDetails"
         style={{ backgroundImage: `url(${imgUrl.w_og + movieDetails.backdrop_path})` }}
      >
         <div className="shadeDiv">
            <div className="flex-div"></div>
            <div className="movieContent">
               <div className="sidePoster">
                  <img src={imgUrl.w_og + movieDetails.poster_path} alt="Movie Poster" />
               </div>
               <div className="movieDetails">
                  <h1 className="title">{movieDetails.name || movieDetails.title}</h1>
                  <br />
                  <p className="overview">{movieDetails.overview && movieDetails.overview}</p>
                  <br />
                  <p>{movieDetails.release_date && `Release Date : ${movieDetails.release_date}`} </p>
                  <p>{movieDetails.vote_average && `Rating (Avg) : ${movieDetails.vote_average} / 10`} </p>
                  <br />
                  {movieDetails.id && (
                     <button className="Teaser" onClick={() => handleVideo()}>
                        <i className="fab fa-youtube"></i>Watch videos
                     </button>
                  )}
               </div>
            </div>
         </div>
         {videoPopUpTrigger && <VideoPopUp movieDetails={movieDetails} />}
      </div>
   );
};

export default MovieDetails;

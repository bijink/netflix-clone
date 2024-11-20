import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { VideoPopUpContext } from "../../Context";
import { imgUrl } from "../../Data/constant.data";
import { fetchMovieDetails } from "../../Utils/fetchMovieDetails";
import VideoPopUp from "../VideoPopUp/VideoPopUp";
import "./Banner.scss";

const Banner = ({ movies }) => {
   const history = useHistory();

   const { videoPopUpTrigger, setVideoPopUpTrigger } = useContext(VideoPopUpContext);

   const [movieDetails, setMovieDetails] = useState({});
   const [movieVideos, setMovieVideos] = useState([]);

   const handleMovieDetails = async (movie) => {
      sessionStorage.setItem("enteasers_temp_m_data", JSON.stringify(await fetchMovieDetails(movie)));
      history.push("/details");
   };

   useEffect(() => {
      // #store movies to sessionStorage from the initial fetch
      movies && sessionStorage.setItem("enteasers_banner_query_data", JSON.stringify(movies));
      // #to show random movieDetails on banner
      const index = Math.floor(Math.random() * movies?.data?.results?.length);
      setMovieDetails(movies?.data?.results[index]);
      // #pass movieVideos array to videoPopUp component
      setMovieVideos(movies?.data?.results[index].video_list);
      // #to turn off videoPopUp when pressing browser backBtn from details page(when with history.forward())
      setVideoPopUpTrigger(false);
   }, [movies, setVideoPopUpTrigger]);

   return (
      <div
         className="banner"
         style={{
            backgroundImage: movieDetails?.backdrop_path && `url(${imgUrl.w_og + movieDetails.backdrop_path})`,
         }}
      >
         <div className="banner__main-layer">
            <div className="banner__main-layer__content-layer">
               <div className="banner__main-layer__content-layer__content">
                  <h1 className="banner__main-layer__content-layer__content--title">
                     {movieDetails ? movieDetails.title || movieDetails.name : ""}
                  </h1>
                  <div className="banner__main-layer__content-layer__content__buttons">
                     <button
                        className="banner__main-layer__content-layer__content__buttons--play"
                        onClick={() => setVideoPopUpTrigger(true)}
                     >
                        <FontAwesomeIcon icon="fa-solid fa-play" /> Watch
                     </button>
                     <button
                        className="banner__main-layer__content-layer__content__buttons--more-info"
                        onClick={() => handleMovieDetails(movieDetails)}
                     >
                        <FontAwesomeIcon icon="fa-solid fa-circle-info" /> More Info
                     </button>
                  </div>
                  <div className="banner__main-layer__content-layer__content__description">
                     <p className="banner__main-layer__content-layer__content__description--text">
                        {movieDetails ? movieDetails.overview : ""}
                     </p>
                  </div>
               </div>
            </div>
            <div className="banner__main-layer__fade-bottom-layer"></div>
         </div>
         {videoPopUpTrigger && <VideoPopUp banner b_movieVideos={movieVideos} />}
      </div>
   );
};

export default Banner;

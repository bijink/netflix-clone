import React, { useContext, useEffect, useState } from "react";
import "./Banner.scss";
import { VideoPopUpContext } from "../../Context";
import { useHistory } from "react-router";
import VideoPopUp from "../VideoPopUp/VideoPopUp";
import { imgUrl } from "../../Data/constant.data";
import { useMoviesData } from "../../Hooks";
import { category } from "../../Data/category.data";
import { fetchMovieDetails } from "../../Utils/fetchMovieDetails";
import PropagateLoader from "react-spinners/PropagateLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Banner = () => {
   const history = useHistory();

   const { videoPopUpTrigger, setVideoPopUpTrigger } = useContext(VideoPopUpContext);

   const [movieDetails, setMovieDetails] = useState({});
   const [movieVideos, setMovieVideos] = useState([]);
   const [isFetchHasWorstDelay, setIsFetchHasWorstDelay] = useState(false);

   const { data: movies, isLoading } = useMoviesData(category.trending.url, "banner");

   const handleMovieDetails = async (movie) => {
      sessionStorage.setItem("netflix_temp_m_data", JSON.stringify(await fetchMovieDetails(movie)));

      history.push("/details");
   };

   useEffect(() => {
      // #to disable/enable body(screen) scrollbar
      isLoading ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "visible");
      // #to show a message on worst network on initial fetch
      isLoading &&
         setTimeout(() => {
            setIsFetchHasWorstDelay(true);
         }, 25 * 1000); // #25 seconds
   }, [isLoading]);

   useEffect(() => {
      // #store movies to sessionStorage from the initial fetch
      movies && sessionStorage.setItem("netflix_banner_query_data", JSON.stringify(movies));
      // #to show random movieDetails on banner
      const index = Math.floor(Math.random() * movies?.data.results.length);
      setMovieDetails(movies?.data.results[index]);
      // #pass movieVideos array to videoPopUp component
      setMovieVideos(movies?.data.results[index].video_list);
      // #to turn off videoPopUp when pressing browser backBtn from details page(when with history.forword())
      setVideoPopUpTrigger(false);
   }, [movies, setVideoPopUpTrigger]);

   return (
      <div
         className="banner"
         style={{
            backgroundImage: movieDetails?.backdrop_path && `url(${imgUrl.w_og + movieDetails.backdrop_path})`,
         }}
      >
         {/* banner_loading_screen */}
         {isLoading && (
            <div className="banner__loading__screen">
               <div className="banner__loading__screen--main">
                  <PropagateLoader color="rgb(192, 0, 16)" loading={isLoading} aria-label="Loading Spinner" />
                  {isFetchHasWorstDelay && (
                     <p className="loading__screen--message">
                        <span>I think we have a slower network </span>
                        <span>Please wait...</span>
                     </p>
                  )}
               </div>
            </div>
         )}
         <div className="fade_content">
            {!isLoading && (
               <div className="content">
                  <div className="flex_div"></div>
                  <h1 className="title">{movieDetails ? movieDetails.title || movieDetails.name : ""}</h1>
                  <div className="banner_button">
                     <button className="button" onClick={() => setVideoPopUpTrigger(true)}>
                        <FontAwesomeIcon icon="fa-solid fa-play" /> Play
                     </button>
                     <button className="button" onClick={() => handleMovieDetails(movieDetails)}>
                        <FontAwesomeIcon icon="fa-solid fa-circle-info" /> More Info
                     </button>
                  </div>
                  <p className="description">{movieDetails ? movieDetails.overview : ""}</p>
               </div>
            )}
         </div>
         <div className="fade_bottom"></div>
         {videoPopUpTrigger && <VideoPopUp banner b_movieVideos={movieVideos} />}
      </div>
   );
};

export default Banner;

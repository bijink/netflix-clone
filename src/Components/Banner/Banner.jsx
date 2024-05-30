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

   const { data: movies, isLoading, isError } = useMoviesData(category.trending.url, "banner");

   const handleMovieDetails = async (movie) => {
      sessionStorage.setItem("netflix_temp_m_data", JSON.stringify(await fetchMovieDetails(movie)));
      history.push("/details");
   };

   useEffect(() => {
      // #to show a message on worst network on initial fetch
      const worstDelayTimer = setTimeout(() => {
         if (isLoading) setIsFetchHasWorstDelay(true);
      }, 25 * 1000); // #25 seconds

      return () => {
         clearTimeout(worstDelayTimer);
      };
   }, [isLoading]);
   useEffect(() => {
      if (isError) {
         setIsFetchHasWorstDelay(false);
         sessionStorage.setItem("netflix_banner_query_data", null);
      }
   }, [isError]);
   useEffect(() => {
      // #to disable/enable body(screen) scrollbar
      isLoading || isError
         ? (document.body.style.overflow = "hidden")
         : (document.body.style.overflow = "visible");
   }, [isLoading, isError]);
   useEffect(() => {
      // #store movies to sessionStorage from the initial fetch
      movies && sessionStorage.setItem("netflix_banner_query_data", JSON.stringify(movies));
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
         {/* banner_blank_screen */}
         {(isLoading || isError) && (
            <div className="banner__blank__screen">
               <div className="banner__blank__screen--main">
                  {/* banner_loading_screen_content */}
                  {isLoading && (
                     <>
                        <PropagateLoader
                           color="rgb(192, 0, 16)"
                           loading={isLoading}
                           aria-label="Loading Spinner"
                        />
                        {isFetchHasWorstDelay && (
                           <p className="blank__screen__loading--message">
                              <span>I think we have a slower network </span>
                              <span>Please wait...</span>
                           </p>
                        )}
                     </>
                  )}
                  {/* banner_error_screen_content */}
                  {isError && (
                     <>
                        <p className="blank__screen__error--message">
                           <span>Error 504</span>
                           <span>Gateway Timeout</span>
                        </p>
                     </>
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

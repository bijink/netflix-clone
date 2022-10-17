import React, { useContext, useEffect, useState } from "react";
import "./Banner.scss";
import { VideoPopUpContext } from "../../Context";
import { useHistory } from "react-router";
import VideoPopUp from "../VideoPopUp/VideoPopUp";
import { imgUrl } from "../../Data/constant.data";
import { useMoviesData } from "../../Hooks";
import { category } from "../../Data/category.data";
import { fetchMovieDetails } from "../../Utils/fetchMovieDetails";

const Banner = () => {
   const history = useHistory();

   const { videoPopUpTrigger, setVideoPopUpTrigger } = useContext(VideoPopUpContext);

   const [movieDetails, setMovieDetails] = useState({});
   const [movieVideos, setMovieVideos] = useState([]);

   const { data: movies, isLoading } = useMoviesData(category.trending.url, "banner");

   const handleMovieDetails = async (movie) => {
      sessionStorage.setItem("netflix_temp_m_data", JSON.stringify(await fetchMovieDetails(movie)));

      history.push("/details");
   };

   useEffect(() => {
      const index = Math.floor(Math.random() * movies?.data.results.length);
      setMovieDetails(movies?.data.results[index]);

      setMovieVideos(movies?.data.results[index].video_list);
      setVideoPopUpTrigger(false);
   }, [movies, setVideoPopUpTrigger]);

   return (
      <div
         className="banner"
         style={{
            backgroundImage: movieDetails?.backdrop_path && `url(${imgUrl.w_og + movieDetails.backdrop_path})`,
         }}
      >
         {isLoading && <h1 style={{ textAlign: "center" }}>Loading...</h1>}
         <div className="fade_content">
            {!isLoading && (
               <div className="content">
                  <div className="flex_div"></div>
                  <h1 className="title">{movieDetails ? movieDetails.title || movieDetails.name : ""}</h1>
                  <div className="banner_button">
                     <button className="button" onClick={() => setVideoPopUpTrigger(true)}>
                        <i className="fas fa-play"></i> Play
                     </button>
                     <button className="button" onClick={() => handleMovieDetails(movieDetails)}>
                        <i className="fas fa-info-circle"></i> More Info
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

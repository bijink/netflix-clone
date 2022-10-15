import React, { useContext, useEffect, useState } from "react";
import "./Banner.scss";
import { MovieDetailsContext, VideoPopUpContext } from "../../Context";
import { useHistory } from "react-router";
import VideoPopUp from "../VideoPopUp/VideoPopUp";
import { axios_instance } from "../../Utils/axios.utils";
import { imgUrl } from "../../Data/constant.data";
import { useMoviesData } from "../../Hooks";
import { category } from "../../Data/category.data";
import { fetchMovieDetails } from "../../Utils/fetchMovieDetails";

const Banner = () => {
   const history = useHistory();

   const { videoPopUpTrigger, setVideoPopUpTrigger } = useContext(VideoPopUpContext);
   const { setDetails } = useContext(MovieDetailsContext);

   const [movieDetails, setMovieDetails] = useState({});
   const [movieVideos, setMovieVideos] = useState([]);

   const { data: movies } = useMoviesData(category.trending.url, "trending");

   const handleVideo = () => {
      axios_instance
         .get(`/movie/${movieDetails.id}/videos?language=en-US`)
         .then((res) => {
            if (res?.data?.results.length > 0) {
               setMovieVideos(res.data.results.reverse());
               setVideoPopUpTrigger(true);
            } else {
               alert("Sorry, There is no video available");
            }
         })
         .catch((err) => {
            err && alert("Sorry, There is no video available");
         });
   };

   const handleMovieDetails = async (movie) => {
      setDetails(movie);

      sessionStorage.setItem("netflix_temp_m_data", JSON.stringify(await fetchMovieDetails(movie)));

      history.push("/details");
   };

   useEffect(() => {
      setVideoPopUpTrigger(false);

      const index = Math.floor(Math.random() * movies?.data.results.length);
      setMovieDetails(movies?.data.results[index]);
   }, [movies, setVideoPopUpTrigger]);

   return (
      <div
         className="banner"
         style={{
            backgroundImage: movieDetails?.backdrop_path && `url(${imgUrl.w_og + movieDetails.backdrop_path})`,
         }}
      >
         <div className="fade_content">
            <div className="content">
               <div className="flex_div"></div>
               <h1 className="title">{movieDetails ? movieDetails.title || movieDetails.name : ""}</h1>
               <div className="banner_button">
                  <button className="button" onClick={handleVideo}>
                     <i className="fas fa-play"></i> Play
                  </button>
                  <button className="button" onClick={() => handleMovieDetails(movieDetails)}>
                     <i className="fas fa-info-circle"></i> More Info
                  </button>
               </div>
               <p className="description">{movieDetails ? movieDetails.overview : ""}</p>
            </div>
         </div>
         <div className="fade_bottom"></div>
         {videoPopUpTrigger && <VideoPopUp banner b_movieVideos={movieVideos} />}
      </div>
   );
};

export default Banner;

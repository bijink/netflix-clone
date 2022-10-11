import React, { useContext, useEffect, useState } from "react";
import "./Banner.scss";
import { MovieDetailsCC } from "../../Store/MovieDetailsContext";
import { VideoPopUpCC } from "../../Store/VideoPopUpContext";
import { useHistory } from "react-router";
import VideoPopUp from "../VideoPopUp/VideoPopUp";
import { axios_instance } from "../../Utils/axios.utils";
import { imgUrl } from "../../Data/constant.data";

const Banner = ({ url }) => {
   const history = useHistory();

   const { videoPopUpTrigger, setVideoPopUpTrigger } = useContext(VideoPopUpCC);
   const { setDetails } = useContext(MovieDetailsCC);

   const [movieDetails, setMovieDetails] = useState();

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

   const handleMovieDetails = (data) => {
      setDetails(data);
      history.push("/details");
   };

   useEffect(() => {
      setVideoPopUpTrigger(false);
      // TODO:: use staling (react-query)
      axios_instance.get(url).then((response) => {
         const index = Math.floor(Math.random() * response.data.results.length);
         setMovieDetails(response.data.results[index]);
      });
   }, [url, setVideoPopUpTrigger]);

   return (
      <div
         className="banner"
         style={{
            backgroundImage: `url(${movieDetails ? imgUrl.w_og + movieDetails.backdrop_path : ""})`,
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
         {videoPopUpTrigger && <VideoPopUp banner movieDetails={movieDetails} />}
      </div>
   );
};

export default Banner;

import React, { useContext, useState } from "react";
import "./Details.scss";
import { VideoPopUpContext } from "../../Context";
import VideoPopUp from "../VideoPopUp/VideoPopUp";
import { useHistory } from "react-router-dom";
import { imgUrl } from "../../Data/constant.data";

const Details = () => {
   const history = useHistory();

   const { videoPopUpTrigger, setVideoPopUpTrigger } = useContext(VideoPopUpContext);

   // #getting stored movieDetails data from sessionStorage
   const [movieDetails] = useState(JSON.parse(sessionStorage.getItem("netflix_temp_m_data")));

   // #to close videoPopUp instead of going back to home page, when browser backBtn is clicked
   window.onpopstate = function () {
      videoPopUpTrigger && history.goForward();
   };

   return (
      <div
         className="parentDivMovieDetails"
         style={{
            backgroundImage: `url(${imgUrl.w_og + (movieDetails?.backdrop_path ?? movieDetails?.poster_path)})`,
         }}
      >
         <div className="shadeDiv">
            <div className="flex-div"></div>
            <div className="movieContent">
               <div className="sidePoster">
                  <img src={imgUrl.w_og + movieDetails?.poster_path} alt="Movie Poster" />
               </div>
               <div className="movieDetails">
                  <h1 className="title">{movieDetails?.name ?? movieDetails?.title}</h1>
                  <br />
                  <p className="overview">{movieDetails?.overview}</p>
                  <br />
                  <p>{movieDetails?.release_date && `Release Date : ${movieDetails.release_date}`} </p>
                  <p>{movieDetails?.vote_average && `Rating (Avg) : ${movieDetails.vote_average} / 10`} </p>
                  <br />
                  {movieDetails?.video && (
                     <button className="Teaser" onClick={() => setVideoPopUpTrigger(true)}>
                        <i className="fab fa-youtube"></i>Watch videos
                     </button>
                  )}
               </div>
            </div>
         </div>
         {videoPopUpTrigger && <VideoPopUp />}
      </div>
   );
};

export default Details;

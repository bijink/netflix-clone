import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { VideoPopUpContext } from "../../Context";
import { imgUrl } from "../../Data/constant.data";
import VideoPopUp from "../VideoPopUp/VideoPopUp";
import "./Details.scss";

const Details = () => {
   const history = useHistory();

   const { videoPopUpTrigger, setVideoPopUpTrigger } = useContext(VideoPopUpContext);

   // #getting stored movieDetails data from sessionStorage
   const [movieDetails] = useState(JSON.parse(sessionStorage.getItem("enteasers_temp_m_data")));

   // #converts "YYYY-MM-DD" to "Mmm DD, YYYY"
   const date = new Date(movieDetails?.release_date ?? movieDetails?.first_air_date)
      .toString()
      .slice(4, 15)
      .split(" ");
   const formatedDate = `${date[0]} ${date[1]}, ${date[2]}`;

   // #to close videoPopUp instead of going back to home page, when browser backBtn is clicked
   window.onpopstate = function () {
      videoPopUpTrigger && history.goForward();
   };

   useEffect(() => {
      window.scrollTo({ top: 0 });
   }, []);

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
                  <img className="sideImg" src={imgUrl.w_og + movieDetails?.poster_path} alt="Movie Poster" />
               </div>
               <div className="movieDetails">
                  <h1 className="title">{movieDetails?.name ?? movieDetails?.title}</h1>
                  <br />
                  <p className="overview">{movieDetails?.overview}</p>
                  <br />
                  <p>
                     {(movieDetails?.release_date || movieDetails?.first_air_date) &&
                        `Release Date : ${formatedDate}`}
                  </p>
                  <p>{movieDetails?.vote_average && `Rating (Avg) : ${movieDetails.vote_average} / 10`} </p>
                  <br />
                  {movieDetails?.video && (
                     <button className="teaserWatchBtn" onClick={() => setVideoPopUpTrigger(true)}>
                        <FontAwesomeIcon className="youtubeIcon" icon="fa-brands fa-youtube" /> Watch
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

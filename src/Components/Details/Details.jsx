import React, { useContext, useEffect } from "react";
import "./Details.scss";
import { VideoPopUpContext } from "../../Context";
import VideoPopUp from "../VideoPopUp/VideoPopUp";
import { useHistory, useParams } from "react-router-dom";
import { axios_instance } from "../../Utils/axios.utils";
import { imgUrl } from "../../Data/constant.data";
import { useMovieDetails } from "../../Hooks";

const Details = () => {
   const history = useHistory();
   let { category, id } = useParams();

   const { videoPopUpTrigger, setVideoPopUpTrigger } = useContext(VideoPopUpContext);

   const { isLoading, data: movie } = useMovieDetails(`/movie/${id}`, [category, id]);
   // console.log("query: ", isLoading, movie?.data);

   // // #getting stored movieDetails data from sessionStorage and setting to state
   // const [movieDetails] = useState(
   //    details.length !== 0 ? details : JSON.parse(sessionStorage.getItem("netflix_movie_details"))
   // );

   // #to close videoPopUp instead of going back to home page, when browser backBtn is clicked
   window.onpopstate = function () {
      videoPopUpTrigger && history.goForward();
   };

   const handleVideo = (movieID) => {
      axios_instance
         .get(`/movie/${movieID}/videos?language=en-US`)
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

      // #storing movieDetails data to browser sessionStorage
      // details.length !== 0 && sessionStorage.setItem("netflix_movie_details", JSON.stringify(movieDetails));
   }, [setVideoPopUpTrigger]);
   // }, [setVideoPopUpTrigger, details, movieDetails]);

   if (isLoading) return <h5 style={{ color: "white" }}>Loading...</h5>;

   // return null;

   return (
      <div
         className="parentDivMovieDetails"
         style={{
            backgroundImage: `url(${imgUrl.w_og + (movie?.data.backdrop_path ?? movie?.data.poster_path)})`,
         }}
      >
         <div className="shadeDiv">
            <div className="flex-div"></div>
            <div className="movieContent">
               <div className="sidePoster">
                  <img src={imgUrl.w_og + movie?.data.poster_path} alt="Movie Poster" />
               </div>
               <div className="movieDetails">
                  <h1 className="title">{movie?.data.name ?? movie?.data.title}</h1>
                  <br />
                  {/* <p className="overview">{movie?.data.overview && movie?.data.overview}</p> */}
                  <p className="overview">{movie?.data?.overview}</p>
                  <br />
                  <p>{movie?.data.release_date && `Release Date : ${movie.data.release_date}`} </p>
                  <p>{movie?.data.vote_average && `Rating (Avg) : ${movie.data.vote_average} / 10`} </p>
                  <br />
                  {movie?.data.id && (
                     <button className="Teaser" onClick={() => handleVideo(movie?.data.id)}>
                        <i className="fab fa-youtube"></i>Watch videos
                     </button>
                  )}
               </div>
            </div>
         </div>
         {videoPopUpTrigger && <VideoPopUp movieDetails={movie?.data} />}
      </div>
   );
};

export default Details;

import React, { useState } from "react";
import "./RowPost.scss";
import { useHistory } from "react-router-dom";
import { imgUrl } from "../../Data/constant.data";
import { useMoviesData } from "../../Hooks";
import { fetchMovieDetails } from "../../Utils/fetchMovieDetails";
import BeatLoader from "react-spinners/BeatLoader";

function RowPost({ category, w_sm }) {
   const history = useHistory();

   const { isLoading, data: movies } = useMoviesData(category.url, category.id);

   const [loading, setLoading] = useState({ value: false, movieId: "" });

   const handleMovieDetails = async (movie) => {
      setLoading({ value: true, movieId: movie.id });

      sessionStorage.setItem("netflix_temp_m_data", JSON.stringify(await fetchMovieDetails(movie)));

      setLoading({ value: false, movieId: "" });

      history.push("/details");
   };

   if (!isLoading) {
      return (
         <div className="row">
            <h2 className="heading">{category.title}</h2>
            <div className="poster__row">
               {movies?.data.results.map((obj) => (
                  <div
                     key={obj.id}
                     className={w_sm ? "poster__sm" : "poster__lg"}
                     onClick={() => handleMovieDetails(obj)}
                  >
                     <img
                        src={imgUrl.w_200 + obj.poster_path}
                        className="poster__sm--img poster__lg--img"
                        alt={obj.name ?? obj.title}
                     />
                     {loading.value && loading.movieId === obj.id && (
                        <div className="poster__loading__div">
                           <BeatLoader
                              color="rgb(0, 0, 0)"
                              speedMultiplier={1}
                              size={5}
                              aria-label="Loading Spinner"
                           />
                        </div>
                     )}
                  </div>
               ))}
            </div>
         </div>
      );
   }

   return null;
}

export default RowPost;

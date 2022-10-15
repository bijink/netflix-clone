import React, { useContext } from "react";
import "./RowPost.scss";
import { useHistory } from "react-router-dom";
import { MovieDetailsContext } from "../../Context";
import { imgUrl } from "../../Data/constant.data";
import { useMoviesData } from "../../Hooks";
import { fetchMovieDetails } from "../../Utils/fetchMovieDetails";

function RowPost({ category, w_sm }) {
   const history = useHistory();

   const { setDetails } = useContext(MovieDetailsContext);

   const { isLoading, data: movies } = useMoviesData(category.url, category.id);

   // const [loading, setLoading] = useState({ value: false, movieId: "" });

   const handleMovieDetails = async (movie) => {
      // setLoading({ value: true, movieId: movie.id });

      setDetails(movie);

      sessionStorage.setItem("netflix_temp_m_data", JSON.stringify(await fetchMovieDetails(movie)));

      // setLoading({ value: false, movieId: "" });

      history.push("/details");
   };

   return (
      <div className="row">
         <h2 className="heading">{category.title}</h2>
         <div className="posters">
            {isLoading && <h5>Loading...</h5>}
            {movies?.data.results.map((obj) => (
               <img
                  onClick={() => handleMovieDetails(obj)}
                  key={obj.id}
                  className={w_sm ? "smallPoster" : "poster"}
                  src={imgUrl.w_200 + obj.poster_path}
                  // src={isLoading ? "/favicon.ico" : imgUrl.w_200 + obj.poster_path}
                  // src="/favicon.ico"
                  alt="Poster"
               />

               // TODO:: loading indication when clicking for a movieDetails
               // <div
               //    onClick={() => handleMovieDetails(obj)}
               //    key={obj.id}
               //    style={{ backgroundColor: "red", position: "relative" }}
               //    className={w_sm ? "smallPoster" : "poster"}
               // >
               //    {loading.value && loading.movieId === obj.id && (
               //       <div
               //          style={{
               //             backgroundColor: "#00ff0055",
               //             position: "absolute",
               //             width: "100%",
               //             height: "100%",
               //          }}
               //       >
               //          {loading.value && loading.movieId === obj.id && (
               //             <h4
               //                style={{
               //                   backgroundColor: "blue",
               //                   position: "absolute",
               //                   top: "50%",
               //                   left: "50%",
               //                   transform: "translate(-50%, -50%)",
               //                }}
               //             >
               //                Loading
               //             </h4>
               //          )}
               //       </div>
               //    )}

               //    <img src={imgUrl.w_200 + obj.poster_path} style={{ height: "220px" }} alt="" />
               // </div>
            ))}
         </div>
      </div>
   );
}

export default RowPost;

import React, { useContext } from "react";
import "./RowPost.scss";
import { useHistory } from "react-router-dom";
import { MovieDetailsContext } from "../../Context";
import { imgUrl } from "../../Data/constant.data";
import { useMoviesData } from "../../Hooks";

function RowPost({ category, isSmall }) {
   const history = useHistory();

   const { setDetails } = useContext(MovieDetailsContext);

   const { isLoading, data: movies } = useMoviesData(category.url, category.id);
   // console.log(movies.data.results);

   const handleMovieDetails = (data) => {
      setDetails(data);

      // console.log(data.id);
      // history.push("/details");
      history.push(`/details/${category.id}/${data.id}`);
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
                  className={isSmall ? "smallPoster" : "poster"}
                  src={imgUrl.w_200 + obj.poster_path}
                  // src={isLoading ? "/favicon.ico" : imgUrl.w_200 + obj.poster_path}
                  // src="/favicon.ico"
                  alt="Poster"
               />
            ))}
         </div>
      </div>
   );
}

export default RowPost;

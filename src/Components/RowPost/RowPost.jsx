import React, { useContext, useEffect, useState } from "react";
import "./RowPost.scss";
import { useHistory } from "react-router-dom";
import { MovieDetailsCC } from "../../Store/MovieDetailsContext";
import { axios_instance } from "../../Utils/axios.utils";
import { imgUrl } from "../../Data/constant.data";

function RowPost({ category, isSmall }) {
   const history = useHistory();

   const { setDetails } = useContext(MovieDetailsCC);

   const [movies, setMovies] = useState([]);
   // console.log(movies);

   const handleMovieDetails = (data) => {
      setDetails(data);
      // console.log(data);
      // console.log(data.indexOf(data.id));

      history.push("/details");
   };

   useEffect(() => {
      axios_instance.get(category.url).then((res) => {
         // console.log("axios_result: ",res.data.results);
         setMovies(res.data.results);
      });
   }, [category]);

   return (
      <div className="row">
         <h2 className="heading">{category.title}</h2>
         <div className="posters">
            {movies.map((obj) => (
               <img
                  onClick={() => handleMovieDetails(obj)}
                  key={obj.id}
                  className={isSmall ? "smallPoster" : "poster"}
                  src={imgUrl.w_200 + obj.poster_path}
                  alt="Poster"
               />
            ))}
         </div>
      </div>
   );
}

export default RowPost;

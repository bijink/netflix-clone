import React, { useContext, useEffect, useState } from "react";
import "./RowPost.scss";
import axios from "../../Axios";
import { imageUrl } from "../../Constants/Constants";
import { useHistory } from "react-router-dom";
import { MovieDetailsCC } from "../../Store/MovieDetailsContext";

function RowPost(props) {
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
      axios.get(props.url).then((response) => {
         // console.log(props.title +  response.data.results);
         // console.log(props.title);
         // console.log(response.data.results);
         setMovies(response.data.results);
      });
   }, [props.url]);

   return (
      <div className="row">
         <h2 className="heading">{props.title}</h2>
         <div className="posters">
            {movies.map((obj) => (
               <img
                  onClick={() => handleMovieDetails(obj)}
                  key={obj.id}
                  className={props.isSmall ? "smallPoster" : "poster"}
                  src={`${imageUrl + "/w200" + obj.poster_path}`}
                  alt="Poster"
               />
            ))}
         </div>
      </div>
   );
}

export default RowPost;

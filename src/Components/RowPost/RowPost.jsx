import React, { useContext, useEffect, useState } from 'react';
import './RowPost.scss';
import axios from '../../Axios';
import { imageUrl } from '../../Constants/Constants';
import { useHistory } from 'react-router-dom';
import { MovieDetailsCC } from '../../Store/MovieDetailsContext';

function RowPost(props) {
   const [movies, setMovies] = useState([]);

   const { setDetails } = useContext(MovieDetailsCC);

   const history = useHistory();

   useEffect(() => {
      axios.get(props.url).then(response => {
         // console.log(response.data);
         setMovies(response.data.results);
      });
   }, [props.url]);

   const handleMovieDetails = (data) => {
      setDetails(data);
      history.push('/details');
   };

   return (
      <div className="row">
         <h2 className="heading">{props.title}</h2>
         <div className="posters">
            {
               movies.map((obj) => (
                  <img onClick={() => handleMovieDetails(obj)} key={obj.id} className={props.isSmall ? "smallPoster" : "poster"} src={`${imageUrl + obj.poster_path}`} alt="Poster" />
               ))
            }
         </div>
      </div>
   );
}

export default RowPost;

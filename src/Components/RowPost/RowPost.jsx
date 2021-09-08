import React, { useEffect, useState } from 'react';
import './RowPost.css';
import axios from '../../Axios';
import { imageUrl, API_KEY } from '../../Constants/Constants';
import YouTube from 'react-youtube';

function RowPost(props) {

   const [movies, setMovies] = useState([]);
   const [urlId, setUrlId] = useState('');

   useEffect(() => {
      axios.get(props.url).then(response => {
         console.log(response.data);
         setMovies(response.data.results);
      });
   }, []);

   const handleVideo = (id) => {
      // console.log(id);
      axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
         if (response.data.length !== 0) {
            console.log(response.data.results[0]);
            setUrlId(response.data.results[0]);
         }
      });
   };

   const opts = {
      height: '390',
      width: '100%',
      playerVars: {
         autoplay: 1,
      },
   };

   return (
      <div className="row">
         <h2 className="heading">{props.title}</h2>
         <div className="posters">
            {
               movies.map((obj) => (
                  <img onClick={() => handleVideo(obj.id)} key={obj.id} className={props.isSmall ? "smallPoster" : "poster"} src={`${imageUrl + obj.poster_path}`} alt="Poster" />
               ))
            }
         </div>
         <div className="video">
            {
               urlId && <YouTube videoId={urlId.key} opts={opts} />
            }
         </div>
      </div>
   );
}

export default RowPost;
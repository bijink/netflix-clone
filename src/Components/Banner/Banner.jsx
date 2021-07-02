import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from '../../Axios';
import { imageUrl } from '../../Constants/Constants';

function Banner(props) {

   const [movie, setMovie] = useState();

   useEffect(() => {
      axios.get(props.url).then((response) => {
         console.log(response.data);
         const index = Math.floor(Math.random() * response.data.results.length);
         setMovie(response.data.results[index]);
      });
   }, []);

   return (
      <div className="banner" style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ''})` }}>
         <div className="fade_content">
            <div className="content">
               <h1 className="title">{movie ? movie.title || movie.name : ''}</h1>
               <div className="banner_button">
                  <button className="button">Play</button>
                  <button className="button">My List</button>
               </div>
               <p className="description">{movie ? movie.overview : ''}</p>
            </div>
         </div>
         <div className="fade_bottom"></div>
      </div>
   );

}

export default Banner;
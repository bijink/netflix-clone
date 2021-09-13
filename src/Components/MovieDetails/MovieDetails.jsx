import React, { useContext, useEffect, useState } from 'react';
import { MovieDetailsCC } from '../../Store/MovieDetailsContext';
import './MovieDetails.css';
import { API_KEY, imageUrl } from '../../Constants/Constants';
import YouTube from 'react-youtube';
import axios from '../../Axios';
import VideoPopUp from '../../PopUps/VideoPopUp/VideoPopUp';
import { VideoPopUpCC } from '../../Store/VideoPopUpContext';
import YoutubeEmbed from '../YoutubeEmbed/YoutubeEmbed';

const MovieDetails = () => {
   const { details } = useContext(MovieDetailsCC);
   // console.log(details);
   const [urlId, setUrlId] = useState();
   // console.log(urlId);
   const { videoPopUpTrigger, setVideoPopUpTrigger } = useContext(VideoPopUpCC);
   var [count, setCount] = useState(0);
   const [lg, setLg] = useState();
   // console.log(count);
   // console.log(videoNext_Back);

   useEffect(() => {
      setVideoPopUpTrigger(false);
      return () => {
      };
   }, []);



   const handleVideo = (aa) => {
      if (aa === 'back') {
         if (count == 0)
            setCount(count = (lg - 1));
         else
            setCount(count -= 1);
      } else if (aa === 'next') {
         if (count < (lg - 1))
            setCount(count += 1);
         else
            setCount(count = 0);
      }
      // console.log(details.id);
      axios.get(`/movie/${details.id}/videos?api_key=${API_KEY}&language=en-US`).then(res => {
         if (res.data.length !== 0) {
            // console.log(res.data.results[0]);
            // console.log(res.data.results);
            setVideoPopUpTrigger(true);
            setUrlId(res.data.results[count]);
            setLg(res.data.results.length);
         }
      });
   };



   return (
      <div className="parentDivMovieDetails" style={{ backgroundImage: `url(${details && (imageUrl + details.backdrop_path)})` }}>
         <div className="shadeDiv">
            <div className="sidePoster">
               <img src={imageUrl + details.poster_path} alt="" />
            </div>
            <div className="movieDetails">
               <h1>{details.name || details.title}</h1>
               <br />
               <p className="overview" >{details.overview && details.overview}</p>
               <br />
               <p>{details.release_date && `Release Date : ${details.release_date}`} </p>
               <p>{details.vote_average && `Rating (average) : ${details.vote_average} / 10`} </p>
               <br />
               <h2 onClick={() => handleVideo()} className="Teaser" ><i className={`${details.id && 'fab fa-youtube'}`}></i> {details.id && 'Teaser / Making'}</h2>
               {/* <h2 onClick={() => aa} className="Teaser" ><i className={`${details.id && 'fab fa-youtube'}`}></i> {details.id && 'Teaser / Making'}</h2> */}
            </div>
         </div>
         {
            videoPopUpTrigger &&
            <VideoPopUp>
               {/* <div className="video">
                  {urlId && <YouTube videoId={urlId.key} opts={opts} />}
               </div> */}
               {urlId ? < YoutubeEmbed embedId={urlId.key} /> : <h1 className="noVideo">Video is not available</h1>}
               <i className="videoBackbtn fas fa-chevron-circle-left" onClick={() => handleVideo('back')} ></i>
               <i className="videoNextbtn fas fa-chevron-circle-right" onClick={() => handleVideo('next')} ></i>
            </VideoPopUp>
         }
         {/* <button onClick={() => handleVideo('back')} >back</button>
         <button onClick={() => handleVideo('next')} >next</button> */}
      </div>
   );
};

export default MovieDetails;

import React, { useEffect, useState } from "react";
import "./VideoPopUp.scss";
import { useContext } from "react";
import { VideoPopUpContext } from "../../Context";
import ReactPlayer from "react-player/youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { axios_instance } from "../../Utils/axios.utils";

const VideoPopUp = ({ banner, movieDetails }) => {
   const { setVideoPopUpTrigger } = useContext(VideoPopUpContext);

   const [videoData, setVideoData] = useState();
   const [videoDataLength, setVideoDataLength] = useState();
   const [count, setCount] = useState(0);
   const [videoDataIndex, setVideoDataIndex] = useState();
   const [playlistOrNot, setPlaylistOrNot] = useState(false);
   const [showPlayList, setShowPlayList] = useState(false);
   const [playlistOrderClick, setPlaylistOrderClick] = useState(false);
   const [playlistDateOrderArrowCheck, setPlaylistDateOrderArrowCheck] = useState(false);

   const handlePlaylistVideo = (item) => {
      // To check the condition
      setPlaylistOrNot(true);

      videoData.forEach((data) => {
         if (data === item) {
            setVideoDataIndex(videoData.indexOf(data));
         }
      });
   };

   const handleVideoCount = (prevOrNext) => {
      if (prevOrNext === "prev") {
         setCount(count === 0 ? videoDataLength - 1 : count - 1);
      } else if (prevOrNext === "next") {
         setCount(count < videoDataLength - 1 && count + 1);
      }
   };

   useEffect(() => {
      playlistOrNot && setCount(videoDataIndex);
      if (playlistOrderClick) {
         setPlaylistOrderClick(!playlistOrderClick);
         videoData.reverse();
      }
      playlistOrderClick && setPlaylistDateOrderArrowCheck(!playlistDateOrderArrowCheck);
   }, [playlistOrNot, videoDataIndex, playlistOrderClick, playlistDateOrderArrowCheck, videoData]);

   useEffect(() => {
      if (movieDetails) {
         axios_instance
            // .get(`/movie/${movieDetails.id}/videos?language=en-US`)
            // .get(`/movie/${movieDetails.id}/videos?append_to_response=videos`)
            .get(`/movie/${movieDetails.id}/videos`)
            .then((response) => {
               if (response.data.results.length !== 0) {
                  setVideoDataLength(response.data.results.length);
                  setVideoData(response.data.results.reverse());
               } else {
                  alert("Sorry, There is no video available");
               }
            })
            .catch((err) => {
               err && alert("Sorry, There is no video available");
            });
      }
   }, [movieDetails]);

   return (
      <>
         <div className={`videoBgShade_${banner ? "banner" : "movieDetails"}`}>
            <div className="videoFrame">
               <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${videoData && videoData[count].key}`}
                  width="100%"
                  height="100%"
                  controls
                  playing
                  onEnded={() => setCount(count < videoDataLength - 1 && count + 1)}
               />
            </div>

            <div
               className="videoPlayListContainer"
               style={{ transform: `${showPlayList ? "translateX(0%)" : "translateX(100%)"}` }}
            >
               <div className="semiCircleBtn" onClick={() => setShowPlayList(!showPlayList)}>
                  <FontAwesomeIcon className="arrowLeftRight" icon={showPlayList ? faAnglesRight : faAnglesLeft} />
               </div>

               <div className="videoPlayList">
                  <div className="playlistHeader">
                     <h3 className="playlistHeader_title">Video Playlist</h3>
                     <button className="video_dateOrderBtn" onClick={() => setPlaylistOrderClick(true)}>
                        Latest <FontAwesomeIcon icon={playlistDateOrderArrowCheck ? faArrowUp : faArrowDown} />
                     </button>
                  </div>
                  {videoData &&
                     videoData.map((item) => (
                        <div className="videoItem" key={item.key}>
                           <div
                              className="video_preview"
                              style={{
                                 backgroundColor: `${
                                    videoData[count] === item ? "rgb(40, 40, 40)" : "transparent"
                                 }`,
                              }}
                              onClick={() => handlePlaylistVideo(item)}
                           >
                              <p className="video_number">{videoData.indexOf(item) + 1}</p>
                              <img
                                 className="video_thumbnail"
                                 src={`https://img.youtube.com/vi/${item.key}/default.jpg`}
                                 alt="video Thumbnail"
                              />
                              <div className="video_properties">
                                 <h4 className="video_title">{item.name}</h4>
                                 <p className="video_type">Video type : {item.type}</p>
                                 <p className="video_date">
                                    Published at {new Date(item.published_at).toLocaleString().slice(0, 10)}
                                 </p>
                              </div>
                           </div>
                        </div>
                     ))}
               </div>
            </div>

            {!(count === 0) && (
               <i
                  className="videoBackBtn fas fa-chevron-circle-left"
                  onClick={() => {
                     setPlaylistOrNot(false);
                     handleVideoCount("prev");
                  }}
               ></i>
            )}
            {!(count === videoDataLength - 1) && (
               <i
                  className="videoNextBtn fas fa-chevron-circle-right"
                  onClick={() => {
                     setPlaylistOrNot(false);
                     handleVideoCount("next");
                  }}
               ></i>
            )}

            <div className="closeBtn">
               <i
                  onClick={() => {
                     setVideoPopUpTrigger(false);
                  }}
                  className="fas fa-times-circle"
               ></i>
            </div>
         </div>
      </>
   );
};

export default VideoPopUp;

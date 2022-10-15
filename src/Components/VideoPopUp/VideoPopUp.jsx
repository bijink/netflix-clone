import React, { useState } from "react";
import "./VideoPopUp.scss";
import { useContext } from "react";
import { VideoPopUpContext } from "../../Context";
import ReactPlayer from "react-player/youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

const VideoPopUp = ({ banner, b_movieVideos }) => {
   const { setVideoPopUpTrigger } = useContext(VideoPopUpContext);

   const [movieDetails] = useState(JSON.parse(sessionStorage.getItem("netflix_temp_m_data")));

   const [videoData] = useState(banner ? b_movieVideos : movieDetails?.video_list);
   const [videoDataLength] = useState(videoData?.length);
   const [count, setCount] = useState(0);
   const [showPlayList, setShowPlayList] = useState(false);
   const [playlistOrder, setPlaylistOrder] = useState(false);

   const handlePlaylistVideo = (item) => {
      videoData.forEach((data) => {
         if (data === item) {
            setCount(videoData.indexOf(data));
         }
      });
   };

   const handlePlaylistOrder = () => {
      videoData.reverse();
      setCount(0);
      setPlaylistOrder((prev) => !prev);
   };

   const handleVideoCount = (prevOrNext) => {
      if (prevOrNext === "prev") setCount((count) => --count);
      else if (prevOrNext === "next") setCount((count) => ++count);
   };

   return (
      <>
         <div className={`videoBgShade_${banner ? "banner" : "movieDetails"}`}>
            {/* video_player */}
            {videoData && (
               <div className="videoFrame">
                  <ReactPlayer
                     url={`https://www.youtube.com/watch?v=${videoData[count]?.key}`}
                     width="100%"
                     height="100%"
                     controls
                     playing
                     onEnded={() => count < videoDataLength - 1 && setCount((count) => ++count)}
                  />
               </div>
            )}

            {/* side_video_playlist */}
            <div
               className="videoPlayListContainer"
               style={{ transform: `${showPlayList ? "translateX(0%)" : "translateX(100%)"}` }}
            >
               <div className="semiCircleBtn" onClick={() => setShowPlayList((prev) => !prev)}>
                  <FontAwesomeIcon className="arrowLeftRight" icon={showPlayList ? faAnglesRight : faAnglesLeft} />
               </div>

               <div className="videoPlayList">
                  <div className="playlistHeader">
                     <h3 className="playlistHeader_title">Video Playlist</h3>
                     <button className="video_dateOrderBtn" onClick={() => handlePlaylistOrder()}>
                        Latest <FontAwesomeIcon icon={playlistOrder ? faArrowUp : faArrowDown} />
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

            {/* video_control_btns */}
            {count > 0 && (
               <i
                  className="videoBackBtn fas fa-chevron-circle-left"
                  onClick={() => {
                     handleVideoCount("prev");
                  }}
               ></i>
            )}
            {count < videoDataLength - 1 && (
               <i
                  className="videoNextBtn fas fa-chevron-circle-right"
                  onClick={() => {
                     handleVideoCount("next");
                  }}
               ></i>
            )}
            {/* video_close_btn */}
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

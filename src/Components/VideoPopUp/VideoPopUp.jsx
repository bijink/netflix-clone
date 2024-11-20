import { faAnglesLeft, faAnglesRight, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import ReactPlayer from "react-player/youtube";
import BeatLoader from "react-spinners/BeatLoader";
import { VideoPopUpContext } from "../../Context";
import "./VideoPopUp.scss";

const VideoPopUp = ({ banner, b_movieVideos }) => {
   const { setVideoPopUpTrigger } = useContext(VideoPopUpContext);

   const [movieDetails] = useState(JSON.parse(sessionStorage.getItem("enteasers_temp_m_data")));

   const [videoData] = useState(banner ? b_movieVideos : movieDetails?.video_list);
   const [videoDataLength] = useState(videoData?.length);
   const [count, setCount] = useState(0);
   const [showPlayList, setShowPlayList] = useState(false);
   const [playlistOrder, setPlaylistOrder] = useState(false);
   const [isInitialVideoReady, setIsInitialVideoReady] = useState(false);

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
                  <BeatLoader
                     color="rgba(255, 255, 255, 0.8)"
                     loading={!isInitialVideoReady}
                     speedMultiplier={1.2}
                     size={10}
                     aria-label="Loading Spinner"
                     cssOverride={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                     }}
                  />
                  <ReactPlayer
                     url={`https://www.youtube.com/watch?v=${videoData[count]?.key}`}
                     width="100%"
                     height="100%"
                     controls
                     playing
                     onReady={() => setIsInitialVideoReady(true)}
                     onEnded={() => count < videoDataLength - 1 && setCount((count) => ++count)}
                     onError={() => count < videoDataLength - 1 && setCount((count) => ++count)}
                  />
               </div>
            )}
            {/* videoPopUp_control_btns */}
            <div className="videoControlBtns">
               {count > 0 && (
                  <FontAwesomeIcon
                     icon="fa-solid fa-circle-chevron-left"
                     className="videoBackBtn"
                     onClick={() => {
                        handleVideoCount("prev");
                     }}
                  />
               )}
               <FontAwesomeIcon
                  icon="fa-solid fa-circle-xmark"
                  className="videoCloseBtn"
                  onClick={() => {
                     setVideoPopUpTrigger(false);
                  }}
               />
               {count < videoDataLength - 1 && (
                  <FontAwesomeIcon
                     icon="fa-solid fa-circle-chevron-right"
                     className="videoNextBtn"
                     onClick={() => {
                        handleVideoCount("next");
                     }}
                  />
               )}
            </div>
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
         </div>
      </>
   );
};

export default VideoPopUp;

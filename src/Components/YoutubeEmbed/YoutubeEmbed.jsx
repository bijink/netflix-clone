import React from "react";
// import PropTypes from "prop-types";
import './YoutubeEmbed.css';

const YoutubeEmbed = (props) => {

   return (
      <div className={props.styles ? "video-responsive_banner" : "video-responsive"}>
         <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${props.embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
         />
      </div>
   );
};

// YoutubeEmbed.propTypes = {
//    embedId: PropTypes.string.isRequired
// };

export default YoutubeEmbed;

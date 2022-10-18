import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Footer.scss";

function Footer() {
   return (
      <div className="footer">
         <div className="footer__content">
            <p className="appName">Netflix Teasers (netflix-clone)</p>
            <p className="createdText">created by</p>
            <a className="appAuthor" href="https://github.com/bijink" target="_blank" rel="noreferrer">
               Bijin Kandengalath
            </a>
            <a
               className="githubIcon"
               href="https://github.com/bijink/Netflix-clone"
               target="_blank"
               rel="noreferrer"
            >
               <FontAwesomeIcon icon="fa-brands fa-github" />
            </a>
         </div>
      </div>
   );
}

export default Footer;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Footer.scss";

function Footer({ home_page }) {
   return (
      <div className="footer">
         <div className="footer__content">
            <div className="footer__content__disclaimer">
               <p className="footer__content__disclaimer--title">Disclaimer</p>
               <p className="footer__content__disclaimer--text">
                  This project, <strong>EnTeasers</strong>, is a Netflix-inspired clone created for educational
                  purposes only. It is not affiliated with or endorsed by <strong>Netflix, Inc.</strong>.
               </p>
            </div>
            <p className="appName">EnTeasers (netflix-clone)</p>
            <p className="createdText">created by</p>
            <a className="appAuthor" href="https://bijink.github.io" target="_blank" rel="noopener noreferrer">
               Bijin Kandengala
            </a>
            <a
               className="githubIcon"
               href="https://github.com/bijink/netflix-clone"
               target="_blank"
               rel="noopener noreferrer"
            >
               <FontAwesomeIcon icon="fa-brands fa-github" />
            </a>
         </div>
      </div>
   );
}

export default Footer;

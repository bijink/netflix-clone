import React, { useEffect, useState } from "react";
import "./NavBar.scss";
import { useHistory } from "react-router";

function NavBar() {
   const history = useHistory();

   const [color, setColor] = useState("");
   const [username, setUsername] = useState(() => {
      // getting stored username data from localStorage
      const saved = localStorage.getItem("Netflix_username");
      const initialValue = JSON.parse(saved);
      return initialValue || "";
   });

   const listenScrollEvent = () => {
      if (window.scrollY > 50) {
         setColor("rgba(0, 0, 0, .9");
      } else {
         setColor("");
      }
   };

   const handleClick = () => {
      if (username === "" || !username) {
         const name = window.prompt("Please enter your name");
         setUsername(name);
      }
   };

   useEffect(() => {
      window.addEventListener("scroll", listenScrollEvent);

      if (username === "") {
         const name = window.prompt("Please enter your name");
         setUsername(name);
      }
      // storing username data to localStorage of browser
      localStorage.setItem("Netflix_username", JSON.stringify(username));

      return () => {
         setColor(" ");
      };
   }, [username]);

   return (
      <div className="navBar" style={{ backgroundColor: color }}>
         <img
            className="logo"
            onClick={() => history.push("/")}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
            alt="Netflix Logo"
         />
         <div className="avatar-div">
            <img
               className="avatar"
               src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
               alt="Avatar"
               onClick={handleClick}
            />
            {username && (
               <div className="userDetails">
                  <h3 className="username">{username.charAt(0).toUpperCase() + username.slice(1)}</h3>
                  <button
                     className="logOutBtn"
                     onClick={() => {
                        setUsername(null);
                     }}
                  >
                     Log Out
                  </button>
               </div>
            )}
         </div>
      </div>
   );
}

export default NavBar;

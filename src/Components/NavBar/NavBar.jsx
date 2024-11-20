import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { category } from "../../Data/category.data";
import "./NavBar.scss";

function NavBar({ details_page }) {
   const history = useHistory();
   const { categoryID } = useParams();

   const [color, setColor] = useState("");
   const [hamburgerBtnClick, setHamburgerBtnClick] = useState(false);

   const navMenuData = [category.trending, category.tv, category.music, category.drama, category.history];

   const listenScrollEvent = () => {
      if (window.scrollY > 50) {
         setColor("rgba(0, 0, 0, .9");
      } else {
         setColor("");
      }
   };

   const handleCategoryClick = (category) => {
      history.push(`/category/${category}/1`);
   };

   useEffect(() => {
      window.addEventListener("scroll", listenScrollEvent);

      return () => {
         setColor(" ");
      };
   }, []);

   return (
      <div className="nav" style={{ backgroundColor: color }}>
         <img
            className="nav__logo"
            onClick={() => history.push("/")}
            src="/page-logo.webp"
            alt="enteasers-app-logo"
         />
         {!details_page && (
            <div className="nav__menu">
               {navMenuData.map((cate, i) => {
                  if (cate.id === "trending") {
                     cate = { ...cate, title: "Trendings" };
                  }
                  return (
                     <p
                        key={i}
                        style={
                           cate.id === categoryID
                              ? {
                                   color: "rgba(255, 255, 255)",
                                   backgroundColor: "rgba(255, 255, 255, 0.15)",
                                }
                              : {}
                        }
                        onClick={() => cate.id !== categoryID && handleCategoryClick(cate.id)}
                     >
                        {cate.title}
                     </p>
                  );
               })}
            </div>
         )}
         {/* Hamburger */}
         {!details_page && (
            <>
               {/* Hamburger btn */}
               <div
                  className={`nav__hamburger ${hamburgerBtnClick && "nav__hamburger__open"}`}
                  onClick={() => setHamburgerBtnClick((prev) => !prev)}
               >
                  <span className="nav__hamburger--top"></span>
                  <span className="nav__hamburger--middle"></span>
                  <span className="nav__hamburger--bottom"></span>
               </div>
               {/* Hamburger menu */}
               <div
                  className="nav__menu_sm"
                  style={hamburgerBtnClick ? { top: 0, color: "rgba(255, 255, 255)" } : {}}
               >
                  {navMenuData.map((cate, i) => {
                     if (cate.id === "trending") {
                        cate = { ...cate, title: "Trendings" };
                     }
                     return (
                        <p
                           key={i}
                           style={
                              cate.id === categoryID && hamburgerBtnClick
                                 ? {
                                      color: "rgba(255, 255, 255)",
                                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                                   }
                                 : {}
                           }
                           onClick={() => cate.id !== categoryID && handleCategoryClick(cate.id)}
                        >
                           {cate.title}
                        </p>
                     );
                  })}
               </div>
            </>
         )}
      </div>
   );
}

export default NavBar;

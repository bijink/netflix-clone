import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import Banner from "../Components/Banner/Banner";
import Footer from "../Components/Footer/Footer";
import NavBar from "../Components/NavBar/NavBar";
import RowPost from "../Components/RowPost/RowPost";
import { category } from "../Data/category.data";
import { useMoviesData } from "../Hooks";
import "./HomePage.scss";

const HomePage = () => {
   const { data: movies, isLoading, isError } = useMoviesData(category.trending.url, "banner");
   const [isFetchHasWorstDelay, setIsFetchHasWorstDelay] = useState(false);
   const categoryList = [
      category.trending,
      category.tv,
      category.origin,
      category.fiction,
      category.romance,
      category.action,
      category.horror,
      category.animation,
      category.drama,
      category.comedy,
      category.music,
      category.documentary,
      category.history,
      // ~:~
      // category.adventure,
      // category.crime,
      // category.family,
      // category.fantasy,
      // category.mystery,
      // category.thriller,
      // category.war,
      // category.western,
   ];

   useEffect(() => {
      // #to show a message on worst network on initial fetch
      const worstDelayTimer = setTimeout(() => {
         if (isLoading) setIsFetchHasWorstDelay(true);
      }, 25 * 1000); // #25 seconds
      return () => {
         clearTimeout(worstDelayTimer);
      };
   }, [isLoading]);
   useEffect(() => {
      if (isError) {
         setIsFetchHasWorstDelay(false);
         sessionStorage.setItem("enteasers_banner_query_data", null);
      }
   }, [isError]);

   if (isLoading)
      return (
         <div className="blank-screen">
            <div className="blank-screen__loading">
               <PropagateLoader
                  color="rgb(192, 0, 16)"
                  loading={isLoading}
                  aria-label="Loading Spinner"
                  className="blank-screen__loading--indicator"
               />
               {isFetchHasWorstDelay && (
                  <p className="blank-screen__loading--message">
                     <span>I think we have a slower network</span>
                     <span>Please wait...</span>
                  </p>
               )}
            </div>
         </div>
      );
   if (isError)
      return (
         <div className="blank-screen">
            <div className="blank-screen__error">
               <p className="blank-screen__error--code">Error 504</p>
               <p className="blank-screen__error--title">Gateway Timeout</p>
               <p className="blank-screen__error--message">
                  The API service (TMDB) used in this application has been blocked by your internet provider
               </p>
            </div>
         </div>
      );

   return (
      <>
         <NavBar />
         <Banner movies={movies} />
         <div className="row-post">
            {categoryList.map((cate, i) => {
               if (i % 2 === 0) return <RowPost key={i} category={cate} />;
               return <RowPost key={i} category={cate} w_sm />;
            })}
         </div>
         <Footer home_page />
      </>
   );
};

export default HomePage;

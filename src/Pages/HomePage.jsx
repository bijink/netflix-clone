import React from "react";
import Banner from "../Components/Banner/Banner";
import Footer from "../Components/Footer/Footer";
import NavBar from "../Components/NavBar/NavBar";
import RowPost from "../Components/RowPost/RowPost";
import { category } from "../Data/category.data";

const HomePage = () => {
   const categoryList = [
      category.trending,
      category.origin,
      category.fiction,
      category.action,
      category.romance,
      category.animation,
      category.horror,
      category.drama,
      category.comedy,
      category.adventure,
      category.music,
      category.documentary,
      category.history,
      // ~:
      // category.crime,
      // category.family,
      // category.fantasy,
      // category.mystery,
      // category.tv,
      // category.thriller,
      // category.war,
      // category.western,
   ];

   return (
      <>
         <NavBar />
         <Banner />
         {categoryList.map((cate, i) => {
            if (i % 2 === 0) return <RowPost key={i} category={cate} />;
            return <RowPost key={i} category={cate} w_sm />;
         })}
         <Footer home_page />
      </>
   );
};

export default HomePage;

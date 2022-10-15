import React from "react";
import Banner from "../Components/Banner/Banner";
import Footer from "../Components/Footer/Footer";
import NavBar from "../Components/NavBar/NavBar";
import RowPost from "../Components/RowPost/RowPost";
import { category } from "../Data/category.data";

const HomePage = () => {
   const categoryList = [
      category.trending,
      category.tv,
      category.origin,
      category.fiction,
      category.action,
      category.romance,
      category.animation,
      category.horror,
      category.comedy,
      category.adventure,
      category.music,
      category.documentary,
      // ~:
      // category.crime,
      // category.drama,
      // category.family,
      // category.fantasy,
      // category.history,
      // category.mystery,
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
         <Footer />
      </>
   );
};

export default HomePage;

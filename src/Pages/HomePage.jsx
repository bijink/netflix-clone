import React from "react";
import Banner from "../Components/Banner/Banner";
import Footer from "../Components/Footer/Footer";
import NavBar from "../Components/NavBar/NavBar";
import RowPost from "../Components/RowPost/RowPost";
import { category } from "../Data/category.data";

const HomePage = () => {
   return (
      <>
         <NavBar />
         <Banner />
         <RowPost category={category.origin} />
         <RowPost category={category.trending} isSmall />
         <RowPost category={category.action} />
         <RowPost category={category.romance} isSmall />
         <RowPost category={category.comedy} />
         <RowPost category={category.horror} isSmall />
         <RowPost category={category.documentary} />
         <Footer />
      </>
   );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import { category as categoryData } from "../../Data/category.data";
import { imgUrl } from "../../Data/constant.data";
import { axios_instance } from "../../Utils/axios.utils";
import { fetchMovieDetails } from "../../Utils/fetchMovieDetails";
import "./Category.scss";

const Category = () => {
   const history = useHistory();
   const { categoryID, page } = useParams();

   const pageLimit = 20;
   let [pageNum, setPageNum] = useState(1);

   let category = "";
   for (const key in categoryData) {
      if (Object.hasOwnProperty.call(categoryData, key)) {
         const element = categoryData[key];
         if (element.id === categoryID) category = element;
      }
   }

   const { data: movies, isLoading } = useQuery(["movie-category", category.id, page], async () => {
      return axios_instance.get(`${category.url}&page=${page}`);
   });

   const handlePage = (nextOrPrev) => {
      if (pageNum > 1 && nextOrPrev === "prev") {
         setPageNum(--pageNum);
         history.push(`/category/${categoryID}/${pageNum}`);
      }
      if (pageNum < pageLimit && nextOrPrev === "next") {
         setPageNum(++pageNum);
         window.scrollTo({
            top: 0,
            behavior: "smooth",
         });
         history.push(`/category/${categoryID}/${pageNum}`);
      }
   };

   const handleMovieDetails = async (movie) => {
      sessionStorage.setItem("enteasers_temp_m_data", JSON.stringify(await fetchMovieDetails(movie)));

      history.push("/details");
   };

   useEffect(() => {
      setPageNum(page);
   }, [page]);

   if (isLoading) {
      return (
         <div className="category">
            <PropagateLoader color="rgb(192, 0, 16)" loading={isLoading} aria-label="Loading Spinner" />
         </div>
      );
   }
   if (!isLoading) {
      return (
         <div className="category">
            <p className="category__title">{category.title}</p>
            <div className="category__movies">
               {movies?.data?.results?.map((movie, i) => (
                  <div className="category__movies--movie" key={i}>
                     <img
                        className="movie--img"
                        src={imgUrl.w_200 + movie.poster_path}
                        alt={movie.name ?? movie.title}
                        onClick={() => handleMovieDetails(movie)}
                     />
                  </div>
               ))}
            </div>
            <div className="category__paginationBtns">
               <p
                  className="page_nextBtn"
                  style={{ textDecoration: pageNum > 1 ? "underline" : "none", cursor: pageNum < 2 && "default" }}
                  onClick={() => handlePage("prev")}
               >
                  Prev
               </p>
               <p className="page_num">{page}</p>
               <p
                  className="page_prevBtn"
                  style={{
                     textDecoration: pageNum < pageLimit ? "underline" : "none",
                     cursor: pageNum > 19 && "default",
                  }}
                  onClick={() => handlePage("next")}
               >
                  Next
               </p>
            </div>
         </div>
      );
   }
};

export default Category;

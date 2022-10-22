import React from "react";
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
   const { categoryID } = useParams();

   let category = "";
   for (const key in categoryData) {
      if (Object.hasOwnProperty.call(categoryData, key)) {
         const element = categoryData[key];
         if (element.id === categoryID) category = element;
      }
   }

   const { data: movies, isLoading } = useQuery(["movie-category", category.id], async () => {
      return axios_instance.get(category.url);
   });

   const handleMovieDetails = async (movie) => {
      sessionStorage.setItem("netflix_temp_m_data", JSON.stringify(await fetchMovieDetails(movie)));

      history.push("/details");
   };

   return (
      <div className="category">
         {isLoading && (
            <PropagateLoader color="rgb(192, 0, 16)" loading={isLoading} aria-label="Loading Spinner" />
         )}
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
      </div>
   );
};

export default Category;

import { useQuery } from "react-query";
import { axios_instance } from "../Utils/axios.utils";
import { fetchMovieDetails } from "../Utils/fetchMovieDetails";

export const useMoviesData = (url, keyID) => {
   return useQuery(
      ["movie-data", keyID],
      async () => {
         if (keyID === "banner") {
            // #*to return the stored banner data(from sessionStorage) for improving performance
            const bannerFetchData = JSON.parse(sessionStorage.getItem("netflix_banner_query_data"));
            if (bannerFetchData) return bannerFetchData;

            let page = 1;
            let moviesData_limit = 15;
            let finalMoviesData = [];
            let finalizedFetchData = {};

            // *to make all movies of banner that has video
            // #movies which doesn't have videos will removed
            // #if there is no movies available that has videos in the fetch, then the fetch process will repeat until 15 data get
            do {
               const fetchData = await axios_instance.get(`${url}&page=${page}`);
               // #fetchData_results ~= moviesData
               const fetchData_results = fetchData?.data?.results;
               // #looping through all movieData, and taking movies that has video
               const moviesData = [];
               for (let i = 0; i < fetchData_results.length; i++) {
                  await fetchMovieDetails(fetchData_results[i]).then((res) => {
                     if (res.video) moviesData.push(res);
                  });
               }
               finalMoviesData = [...finalMoviesData, ...moviesData];
               // #inserting filtered moviesData into fetchData(axios), to not loose the axios response data structure
               const tempFetchData = {
                  ...fetchData,
                  data: { ...fetchData?.data, results: finalMoviesData.slice(0, moviesData_limit) },
               };
               finalizedFetchData = { ...finalizedFetchData, ...tempFetchData };

               page++;
            } while (finalMoviesData?.length < moviesData_limit);

            return finalizedFetchData;
         }

         return axios_instance.get(url);
      },
      {
         staleTime: 5 * 60 * 1000, // #5 minutes
      }
   );
};

import { useQuery } from "react-query";
import { axios_instance } from "../Utils/axios.utils";
import { fetchMovieDetails } from "../Utils/fetchMovieDetails";

export const useMoviesData = (url, keyID) => {
   return useQuery(
      ["movie-data", keyID],
      async () => {
         if (keyID === "banner") {
            // #*to return the stored banner data(from sessionStorage) for improving performance
            const bannerQueryData = JSON.parse(sessionStorage.getItem("enteasers_banner_query_data"));
            if (bannerQueryData) return bannerQueryData;

            let page = 1;
            let moviesData_limit = 15;
            let finalMoviesData = [];
            let finalizedBannerData = {};

            function fetchData(pageNo) {
               return new Promise(async (resolve, reject) => {
                  // #setting a timeout to handle 504 error
                  setTimeout(() => {
                     reject();
                  }, 10 * 1000); // #10 seconds

                  await axios_instance
                     .get(`${url}&page=${pageNo}`)
                     .then((res) => {
                        resolve(res);
                     })
                     .catch((err) => {
                        reject(err);
                     });
               });
            }

            // *to make all movies of banner that has video
            // #movies which doesn't have videos will removed
            // #if there is no movies available that has videos in the fetch, then the fetch process will repeat until 15 data get
            do {
               try {
                  const responseData = await fetchData(page);
                  // #responseData_results ~= moviesData
                  const responseData_results = responseData?.data?.results;
                  // #looping through all movieData, and taking movies that has video
                  const moviesData = [];
                  for (let i = 0; i < responseData_results.length; i++) {
                     await fetchMovieDetails(responseData_results[i]).then((res) => {
                        if (res.video) moviesData.push(res);
                     });
                  }
                  finalMoviesData = [...finalMoviesData, ...moviesData];
                  // #inserting filtered moviesData into "responseData"(axios), to not loose the axios response data structure
                  const tempResponseData = {
                     ...responseData,
                     data: { ...responseData?.data, results: finalMoviesData.slice(0, moviesData_limit) },
                  };
                  finalizedBannerData = { ...finalizedBannerData, ...tempResponseData };
               } catch (error) {
                  throw new Error("API failed...");
               }

               page++;
            } while (finalMoviesData?.length < moviesData_limit);

            return finalizedBannerData;
         }

         return axios_instance.get(url);
      },
      {
         staleTime: 5 * 60 * 1000, // #5 minutes
         retry: 2, // Will retry failed requests 10 times before displaying an error (default value: 3)
      }
   );
};

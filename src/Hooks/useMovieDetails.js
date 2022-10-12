import { useQuery, useQueryClient } from "react-query";
import { axios_instance } from "../Utils/axios.utils";

export const useMovieDetails = (url, keyID) => {
   // #queryClient can access queryCacheData
   const queryClient = useQueryClient();
   return useQuery(
      ["movie-data", ...keyID],
      () => {
         return axios_instance.get(url);
      },
      {
         staleTime: Infinity,
         initialData: () => {
            const movie = queryClient
               .getQueriesData(["movie-data", keyID[0]])[0][1]
               .data.results.find((movie) => movie.id === parseInt(keyID[1]));
            if (movie) {
               return {
                  data: movie,
               };
            } else return undefined;
         },
      }
   );
};

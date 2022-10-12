import { useQuery } from "react-query";
import { axios_instance } from "../Utils/axios.utils";

export const useMoviesData = (url, keyID) => {
   return useQuery(
      ["movie-data", keyID],
      () => {
         return axios_instance.get(url);
      },
      {
         staleTime: 300000, //5 minutes
      }
   );
};

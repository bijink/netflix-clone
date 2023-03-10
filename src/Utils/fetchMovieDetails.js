import { axios_instance } from "./axios.utils";

export const fetchMovieDetails = async (movie) => {
   // *fetch movieVideosData and return movieDetails by merging movieVidoes in it
   return axios_instance
      .get(`/movie/${movie.id}/videos`)
      .then((res) => {
         let videos = res?.data?.results;
         if (videos?.length > 0) {
            // #filter videos result by "teaser" and "trailer"
            // #removes other type of videos (eg: featurette, clip etc.)
            const filterVideos = videos.filter((video) =>
               ["Teaser", "teaser", "Trailer", "trailer"].includes(video.type)
            );

            return {
               ...movie,
               video: true,
               video_list: [...filterVideos?.reverse()],
            };
         } else {
            // #if video result exist but has empty array
            return {
               ...movie,
               video: false,
            };
         }
      })
      .catch((_err) => {
         // #if video result not exist
         return {
            ...movie,
            video: false,
         };
      });
};

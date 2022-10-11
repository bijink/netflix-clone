import axios from "axios";
// import { data } from "../Data/category.data";

// const Actions = "discover/movie?with_genres=28";
// const Trendings = `trending/all/week?language=en-US`;

// console.warn(process.env.REACT_APP_TMDB_AUTH_TOKEN);

export const axios_instance = axios.create({
   baseURL: "https://api.themoviedb.org/3",
   headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTH_TOKEN}`,
      "Content-Type": "application/json;charset=utf-8",
   },
});

// // #debugging
// axios_instance.get(data.trending.url).then((res) => {
// console.log("axios_result: ", res.data.results);
//    // console.log("res: ", res.status, res);
// });

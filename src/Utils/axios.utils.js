import axios from "axios";

export const axios_instance = axios.create({
   baseURL: "https://api.themoviedb.org/3",
   headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTH_TOKEN}`,
      "Content-Type": "application/json;charset=utf-8",
   },
});

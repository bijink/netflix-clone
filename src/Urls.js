import { API_KEY } from './Constants/Constants';

export const trendings = `trending/all/week?api_key=${API_KEY}&language=en-US`;
export const origins = `discover/tv?api_key=${API_KEY}&with_networks=213`;
export const actions = `discover/movie?api_key=${API_KEY}&with_genres=28`;
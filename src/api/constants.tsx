export const BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = process.env.REACT_APP_API_KEY;

//Movie endpoints
export const TRENDING = `/trending/all/week?api_key=${API_KEY}&language=en-US`;
export const NETFLIX_ORIGINALS = `/discover/tv?api_key=${API_KEY}&with_network=213`;
export const TOP_RATED = `/movie/top_rated?api_key=${API_KEY}&language=en-US`;
export const ACTION_MOVIES = `/discover/tv?api_key=${API_KEY}&with_network=28`;
export const COMEDY_MOVIES = `/discover/tv?api_key=${API_KEY}&with_network=35`;
export const HORROR_MOVIES = `/discover/tv?api_key=${API_KEY}&with_network=27`;
export const ROMANCE_MOVIES = `/discover/tv?api_key=${API_KEY}&with_network=10749`;
export const DOCUMENTARIES = `/discover/tv?api_key=${API_KEY}&with_network=99`;

export const requests = {
  trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  netflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=213`,
  popular: `/movie/popular?api_key=${API_KEY}&language=en-US`,
  topRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  actionMovies: `/discover/tv?api_key=${API_KEY}&with_network=28`,
  comedyMovies: `/discover/tv?api_key=${API_KEY}&with_network=35`,
  horrorMovies: `/discover/tv?api_key=${API_KEY}&with_network=27`,
  romanceMovies: `/discover/tv?api_key=${API_KEY}&with_network=10749`,
  documentaries: `/discover/tv?api_key=${API_KEY}&with_network=99`,
};

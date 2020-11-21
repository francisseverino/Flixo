export const BASE_URL = 'https://api.themoviedb.org/3';

export const API_KEY = process.env.REACT_APP_API_KEY;
export const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original/'

//Movie endpoints

export const requests = {
  trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  netflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  popular: `/movie/popular?api_key=${API_KEY}&language=en-US`,
  topRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  actionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  comedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  horrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  romanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  documentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export const showsRequests = {
  trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  netflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  popular: `/tv/popular?api_key=${API_KEY}&language=en-US`,
  topRated: `/tv/top_rated?api_key=${API_KEY}&language=en-US`,
  actionShows: `/discover/tv?api_key=${API_KEY}&with_genres=28`,
  comedyShows: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
  horrorShows: `/discover/tv?api_key=${API_KEY}&with_genres=27`,
  romanceShows: `/discover/tv?api_key=${API_KEY}&with_genres=10749`,
  documentaries: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
};

// const movieGenres = [
//   {
//     id: 28,
//     name: 'Action',
//   },
//   {
//     id: 12,
//     name: 'Adventure',
//   },
//   {
//     id: 16,
//     name: 'Animation',
//   },
//   {
//     id: 35,
//     name: 'Comedy',
//   },
//   {
//     id: 80,
//     name: 'Crime',
//   },
//   {
//     id: 99,
//     name: 'Documentary',
//   },
//   {
//     id: 18,
//     name: 'Drama',
//   },
//   {
//     id: 10751,
//     name: 'Family',
//   },
//   {
//     id: 14,
//     name: 'Fantasy',
//   },
//   {
//     id: 36,
//     name: 'History',
//   },
//   {
//     id: 27,
//     name: 'Horror',
//   },
//   {
//     id: 10402,
//     name: 'Music',
//   },
//   {
//     id: 9648,
//     name: 'Mystery',
//   },
//   {
//     id: 10749,
//     name: 'Romance',
//   },
//   {
//     id: 878,
//     name: 'Science Fiction',
//   },
//   {
//     id: 10770,
//     name: 'TV Movie',
//   },
//   {
//     id: 53,
//     name: 'Thriller',
//   },
//   {
//     id: 10752,
//     name: 'War',
//   },
//   {
//     id: 37,
//     name: 'Western',
//   },
// ];

// const tvGenres = [
//   {
//     id: 10759,
//     name: 'Action & Adventure',
//   },
//   {
//     id: 16,
//     name: 'Animation',
//   },
//   {
//     id: 35,
//     name: 'Comedy',
//   },
//   {
//     id: 80,
//     name: 'Crime',
//   },
//   {
//     id: 99,
//     name: 'Documentary',
//   },
//   {
//     id: 18,
//     name: 'Drama',
//   },
//   {
//     id: 10751,
//     name: 'Family',
//   },
//   {
//     id: 10762,
//     name: 'Kids',
//   },
//   {
//     id: 9648,
//     name: 'Mystery',
//   },
//   {
//     id: 10763,
//     name: 'News',
//   },
//   {
//     id: 10764,
//     name: 'Reality',
//   },
//   {
//     id: 10765,
//     name: 'Sci-Fi & Fantasy',
//   },
//   {
//     id: 10766,
//     name: 'Soap',
//   },
//   {
//     id: 10767,
//     name: 'Talk',
//   },
//   {
//     id: 10768,
//     name: 'War & Politics',
//   },
//   {
//     id: 37,
//     name: 'Western',
//   },
// ];

import axiosApi from '@/utils/Api';

/**
 * Get popular movies from TMDB API (Discover endpoint)
 */
export const getPopularMovies = (page: number = 1) => {
  return axiosApi.get('/discover/movie', {
    params: {
      include_adult: false,
      include_video: false,
      language: 'en-US',
      page,
      sort_by: 'popularity.desc',
    },
  });
};



/**
 * Get now playing movies from TMDB API
 */
export const getNowPlayingMovies = (page: number = 1) => {
  return axiosApi.get('/movie/now_playing', {
    params: {
      language: 'en-US',
      page,
    },
  });
};



export const getTopRated = (page: number = 1) => {
  return axiosApi.get('/movie/top_rated',{
    params: {
      language: 'en-US',
      page,
    }
  });

}


/**
 * Search for movies based on a query string.
 */
// In your movieApi file
export const searchMovies = (query: string, page = 1) => {
  return axiosApi.get('/search/movie', {
    params: {
      include_adult: false,
      language: 'en-US',
      page,
      query
    },
  });
};


export const getMovieDetail = (movieId: string) => {
  return axiosApi.get(`/movie/${movieId}S`);
};

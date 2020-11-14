import React, { useState, useEffect } from 'react';
import request from '../../api/helper';
import './Row.css';
import { MovieData } from '../../types';
import YouTube from 'react-youtube';
const movieTrailer = require('movie-trailer');

interface RowData {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
}

const BASE_URL = 'https://image.tmdb.org/t/p/original/';

function Row(props: RowData) {
  const { title, fetchUrl, isLargeRow } = props;

  const [movies, setMovies] = useState<Array<MovieData>>([]);
  const [trailerUrl, setTrailerUrl] = useState<string>('');

  useEffect(() => {
    request(fetchUrl)
      .then(response => {
        setMovies(response.results);
      })
      .catch(err => console.log(err));
  }, [fetchUrl]);

  const handleClick = (movie: MovieData) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      //TODO: find an alternative to movie-trailer
      movieTrailer('finding nemo') //movie?.name || ''
        .then((url: any) => {
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v') || '');
        })
        .catch((err: Error) => console.log(err));
    }
  };

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {movies.map(movie => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && 'row_posterLarge'}`}
            src={`${BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && (
        <YouTube
          videoId={trailerUrl}
          opts={{
            height: '390',
            width: '100%',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          }}
        />
      )}
    </div>
  );
}

export default Row;

import React, { useState, useEffect } from 'react';
import request from '../../../../api/helper';
import './index.css';
import { MovieData } from '../../types';

interface RowData {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
}

const BASE_URL = 'https://image.tmdb.org/t/p/original/';

function Row(props: RowData) {
  const { title, fetchUrl, isLargeRow } = props;

  const [movies, setMovies] = useState<Array<MovieData>>([]);
  // console.table(movies);
  useEffect(() => {
    request(fetchUrl).then(response => {
      setMovies(response.results);
    });
  }, [fetchUrl]);

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {movies.map(movie => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && 'row_posterLarge'}`}
            src={`${BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;

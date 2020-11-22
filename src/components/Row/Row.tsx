import React, { useState, useEffect } from 'react';
import request from '../../api/helper';
import './Row.css';
import { MovieData } from '../../types';
import { useHistory } from 'react-router-dom';

interface RowData {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
}

const BASE_URL = 'https://image.tmdb.org/t/p/original/';

function Row(props: RowData) {
  const { title, fetchUrl, isLargeRow } = props;
  const history = useHistory();

  const [movies, setMovies] = useState<Array<MovieData>>([]);

  useEffect(() => {
    request(fetchUrl)
      .then(response => {
        setMovies(response.results);
      })
      .catch(err => console.log(err));
  }, [fetchUrl]);

  const handleClick = (movie: MovieData) => {
    history.push(`/overview/${movie.id}`);
  };

  return (
    <div className='row'>
      <h2 className='row__title'>{title}</h2>
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
    </div>
  );
}

export default Row;

import React, { useState, useEffect } from 'react';
import request from '../../api/helper';
import './Row.css';
import { MultimediaData } from '../../types';
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

  const [multimedia, setMultimedia] = useState<Array<MultimediaData>>([]);

  useEffect(() => {
    request(fetchUrl)
      .then(response => {
        setMultimedia(response.results);
      })
      .catch(err => console.log(err));
  }, [fetchUrl]);

  const handleClick = (multimedia: MultimediaData) => {
    const type = multimedia.first_air_date ? 'tv' : 'movie';
    history.push(`/overview/${type}-${multimedia.id}`);
  };

  return (
    <div className='row'>
      <h2 className='row__title'>{title}</h2>
      <div className='row__posters'>
        {multimedia.map(multimedia => (
          <img
            key={multimedia.id}
            onClick={() => handleClick(multimedia)}
            className={`row__poster ${isLargeRow && 'row_posterLarge'}`}
            src={`${BASE_URL}${isLargeRow ? multimedia.poster_path : multimedia.backdrop_path}`}
            alt={multimedia.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;

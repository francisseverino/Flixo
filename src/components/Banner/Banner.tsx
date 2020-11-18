import React from 'react';
import request from '../../api/helper';
import { requests } from '../../api/constants';
import { MovieData } from '../../types';
import './Banner.css';

function Banner() {
  const [movie, setMovie] = React.useState<MovieData>();

  React.useEffect(() => {
    request(requests.popular).then(response => {
      const randomIndex = Math.floor(Math.random() * response.results.length - 1);
      setMovie(response.results[randomIndex]);
    });
  }, []);

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: 'center center',
      }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>

        <h1 className='banner__description'>{truncate(movie?.overview || '', 150)}</h1>
        <div className='banner__buttons'>
          <button className='banner__button'>Play</button>
          <button className='banner__button'>More Info</button>
        </div>
      </div>

      <div className='banner--fadeBottom' />
    </header>
  );
}

export default Banner;

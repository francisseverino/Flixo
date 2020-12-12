import React from 'react';
import request from '../../api/helper';
import { requests } from '../../api/constants';
import { MultimediaData } from '../../types';
import './Banner.css';

function Banner() {
  const [multimedia, setMultimedia] = React.useState<MultimediaData>();

  React.useEffect(() => {
    request(requests.trendingAll).then(response => {
      const randomIndex = Math.floor(Math.random() * response.results.length - 1);
      setMultimedia(response.results[randomIndex]);
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
            "https://image.tmdb.org/t/p/original/${multimedia?.backdrop_path}"
        )`,
        backgroundPosition: 'center center',
      }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>{multimedia?.title || multimedia?.name || multimedia?.original_name}</h1>

        <h1 className='banner__description'>{truncate(multimedia?.overview || '', 150)}</h1>
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

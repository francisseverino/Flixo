import React from 'react';
import request from '../../api/helper';
import { requests } from '../../api/constants';
import { MultimediaData } from '../../types';
import { useHistory } from 'react-router-dom';
import { tools } from '../../utils';
import './Banner.css';

function Banner() {
  const history = useHistory();
  const [multimedia, setMultimedia] = React.useState<MultimediaData>();
  const [type, setType] = React.useState<string>('');

  React.useEffect(() => {
    request(requests.trendingAll).then(response => {
      const randomIndex = Math.floor(Math.random() * response.results.length - 1);
      const chosenMultimedia = response.results[randomIndex];
      setType(chosenMultimedia.first_air_date ? 'tv' : 'movie');
      setMultimedia(chosenMultimedia);
    });
  }, []);

  const handleClick = (multimedia: any) => {
    history.push(`/overview/${type}-${multimedia.id}`);
  };

  if (!multimedia) {
    return null;
  }

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

        <h1 className='banner__description'>{tools.truncate(multimedia?.overview || '', 350)}</h1>
        <div className='banner__buttons'>
          <button className='banner__button' onClick={() => handleClick(multimedia)}>
            More Info
          </button>
        </div>
      </div>
      <div className='banner--fadeLeft' />

      {/* <div className='banner--fadeBottom' /> */}
    </header>
  );
}

export default Banner;

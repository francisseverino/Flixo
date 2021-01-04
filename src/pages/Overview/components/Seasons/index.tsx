import React from 'react';
import { BASE_IMAGE_URL } from '../../../../api/constants';
import './index.css';
import { Dropdown } from '../../../../components';

function Seasons(props: any) {
  const ref = React.useRef<HTMLLIElement>(null);
  const { multimedia, seasons } = props;
  const [selectedSeason, setSelectedSeason] = React.useState<any>(seasons[0]);
  const renderSeasons = () => {
    if (!seasons) {
      return null;
    }
    return (
      <div className='seasons'>
        {seasons.map((season: any) => (
          <div className='season'>
            <img
              key={season.id}
              className='season__poster'
              src={`${BASE_IMAGE_URL}${season.poster_path}`}
              alt={season.name}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderLastEpisode = () => {
    const { id, name, season_number, air_date, episode_number, overview, still_path, vote_average, vote_count } =
      multimedia?.last_episode_to_air || {};
    const multimediaName = multimedia?.title || multimedia?.name || multimedia?.original_name;

    return (
      <div className='episode'>
        <img key={id} className='episode__poster' src={`${BASE_IMAGE_URL}${still_path}`} alt={name} />
        <div className='episode__info'>
          <div className='episode__title'>
            <span className='episode__name'>
              {episode_number}. {name}
            </span>
            <span className='episode__extra'>
              {air_date} | {episode_number}
            </span>
          </div>
          <p className='episode__overview'>{overview}</p>
        </div>
      </div>
    );
  };

  return (
    <div className='seasons'>
      {/* <Dropdown title='Season 1'>
        <ul>
          {seasons.map((season: any) => (
            <li onClick={() => setSelectedSeason(season)} key={season.id}>
              <h1>Season {season.season_number}</h1>
              <p>something</p>
            </li>
          ))}
        </ul>
      </Dropdown> */}
      <div>
        <div>
          <h1 className='multimedia__name'>
            Episodes
            {/* <span> |{multimedia?.title || multimedia?.name || multimedia?.original_name}</span> */}
          </h1>
        </div>
        <div>
          <h2 className='season__release'>Release date: {selectedSeason.air_date.split('-')[0]}</h2>
          <p className='season__overview'>{selectedSeason.overview}</p>
        </div>
        <div className='episodes'>
          {selectedSeason.episodes.map((episode: any) => (
            <div className='episode'>
              <img
                key={episode.id}
                className='episode__poster'
                src={`${BASE_IMAGE_URL}${episode.still_path}`}
                alt={episode.name}
              />
              <h1 className='episode__name'>{episode.name}</h1>
              <p className='episode__overview'>{episode.overview}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Seasons;

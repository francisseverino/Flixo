import React from 'react';
import { BASE_IMAGE_URL } from '../../../../api/constants';
import './Seasons.css';

function Seasons(props: any) {
  const { seasons } = props;
  const [selectedSeason, setSelectedSeason] = React.useState<any>(seasons[0]);
  const [selectedSeasonNumber, setSelectedSeasonNumber] = React.useState<any>(0);

  const handleSelectChange = (e: any) => {
    const index = e.target.value;
    setSelectedSeasonNumber(index);
    setSelectedSeason(seasons[index - 1]);
  };

  return (
    <div className='seasons'>
      <div>
        <h1 className='multimedia__name'>
          Episodes
          {/* <span> |{multimedia?.title || multimedia?.name || multimedia?.original_name}</span> */}
        </h1>
      </div>
      <select className='seasons__select' value={selectedSeasonNumber} onChange={handleSelectChange}>
        {seasons.map((season: any) => (
          <option value={season.season_number} key={season.id}>
            Season {season.season_number}
          </option>
        ))}
      </select>
      <div>
        <h2 className='season__release'>Release date: {selectedSeason.air_date.split('-')[0]}</h2>
        <p className='season__overview'>{selectedSeason.overview}</p>
      </div>
      <div className='episodes'>
        {selectedSeason.episodes.map((episode: any) => (
          <div className='episode' key={episode.id}>
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
  );
}

export default Seasons;

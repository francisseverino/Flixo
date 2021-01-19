import React from 'react';
import { BASE_IMAGE_URL } from '../../../../api/constants';
import './Seasons.css';

const DEFAULT_EPISODE_NUMBER = 8;

function Seasons(props: any) {
  const { seasons } = props;
  const [selectedSeason, setSelectedSeason] = React.useState<any>(seasons[0]);
  const [selectedSeasonNumber, setSelectedSeasonNumber] = React.useState<any>(0);
  const [episodesToShow, setEpisodesToShow] = React.useState<number>(DEFAULT_EPISODE_NUMBER);
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  const handleSelectChange = (e: any) => {
    const seasonNumber = e.target.value;
    setSelectedSeasonNumber(seasonNumber);
    setSelectedSeason(seasons.find((season: any) => season.season_number === parseInt(seasonNumber)));
  };

  const showMore = () => {
    if (episodesToShow === DEFAULT_EPISODE_NUMBER) {
      setEpisodesToShow(selectedSeason.episodes.length);
      setIsExpanded(true);
    } else {
      setEpisodesToShow(DEFAULT_EPISODE_NUMBER);
      setIsExpanded(false);
    }
  };

  return (
    <div className='seasons'>
      <select className='seasons__select' value={selectedSeasonNumber} onChange={handleSelectChange}>
        {seasons.map((season: any) => (
          <option value={season.season_number} key={season.id}>
            {season.name}
          </option>
        ))}
      </select>
      <div>
        {selectedSeason.air_date ? (
          <h2 className='season__release'>Release date: {selectedSeason.air_date.split('-')[0]}</h2>
        ) : null}
        <p className='season__overview'>{selectedSeason.overview}</p>
      </div>
      <div className='episodes'>
        {selectedSeason.episodes.slice(0, episodesToShow).map((episode: any) => (
          <div className='episode' key={episode.id}>
            <img
              key={episode.id}
              className='episode__poster'
              src={`${BASE_IMAGE_URL}${episode.still_path}`}
              alt={episode.name}
            />
            <h1 className='episode__name'>
              {episode.episode_number}. {episode.name}
            </h1>
            <p className='episode__overview'>{episode.overview}</p>
          </div>
        ))}
        {selectedSeason.episodes.length > DEFAULT_EPISODE_NUMBER ? (
          <div className='episode__expand__container'>
          <div className='episode__expand'>
            <a className='episode__expandButton' onClick={showMore}>
              {isExpanded ? <span>Show less</span> : <span>Show more</span>}
            </a>
          </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Seasons;

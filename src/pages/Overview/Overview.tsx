import React from 'react';
import request from '../../api/helper';
import { BASE_IMAGE_URL, API_KEY } from '../../api/constants';
import { Modal } from './../../components';
import './Overview.css';
import * as FiIcons from 'react-icons/fi';

interface genres {
  id: number;
  name: string;
}

interface MovieDetail {
  id: number;
  name: string;
  title: string;
  original_name: string;
  tagline: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: Array<genres>;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
}

function Overview(props: any) {
  const [type, multimediaId] = props.match.params.multimediaId.split('-');
  console.log(props.match.params.multimediaId);
  const [multimedia, setMultimedia] = React.useState<MovieDetail>();
  const [cast, setCast] = React.useState<any>([]);
  const [recommendations, setRecommendations] = React.useState<any>([]);
  const [videos, setVideos] = React.useState<any>([]);
  const [trailer, setTrailer] = React.useState<string>('');

  React.useEffect(() => {
    request(
      type === 'movie'
        ? `/movie/${multimediaId}?api_key=${API_KEY}&language=en-US`
        : `/tv/${multimediaId}?api_key=${API_KEY}&language=en-US`
    )
      .then(response => {
        setMultimedia(response);
      })
      .catch(err => console.log(err));
  }, [type, multimediaId]);

  React.useEffect(() => {
    request(
      type === 'movie'
        ? `/movie/${multimediaId}/credits?api_key=${API_KEY}&language=en-US`
        : `/tv/${multimediaId}/credits?api_key=${API_KEY}&language=en-US`
    )
      .then(response => {
        // setCrew(response.crew)
        setCast(response.cast);
      })
      .catch(err => console.log(err));
  }, [type, multimediaId]);

  React.useEffect(() => {
    request(
      type === 'movie'
        ? `/movie/${multimediaId}/videos?api_key=${API_KEY}&language=en-US`
        : `/tv/${multimediaId}/videos?api_key=${API_KEY}&language=en-US`
    )
      .then(response => {
        console.log(response);
        setVideos(response.results);
        setTrailer(response.results[0].key);
      })
      .catch(err => console.log(err));
  }, [type, multimediaId]);

  //   React.useEffect(() => {
  //     request(`/movie/${multimediaId}/recommendations?api_key=${API_KEY}&language=en-US`).then(response => {
  //       setRecommendations(response);
  //     });
  //   }, [multimediaId]);

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  const credits = () => {
    return (
      <div className='cast'>
        <div className='cast__titleContainer'>
          <span className='cast__title'>Cast:</span>
          <button className='cast__button'>
            View all credits
            <FiIcons.FiArrowRight />
          </button>
        </div>

        <div className='cast__stars'>
          {cast.map((star: any) => (
            <div className='cast__star' key={star.id}>
              {star.profile_path ? (
                <img
                  key={star.id}
                  className='star__poster'
                  src={`${BASE_IMAGE_URL}${star.profile_path}`}
                  alt={star.name}
                />
              ) : (
                <img
                  key={star.id}
                  className='star__poster'
                  src='https://pbs.twimg.com/media/ESHtph2WAAMQAUR.jpg'
                  alt={star.name}
                />
              )}
              <p className='star__name'>{star.name}</p>
              <p className='star__character'>{star.character}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className='overview'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(
            "${BASE_IMAGE_URL + multimedia?.backdrop_path}"
        )`,
        backgroundPosition: 'center center',
      }}
    >
      <div className='overview__overlay'>
        <div className='overview__contents'>
          <div className='overview__header'>
            <img
              key={multimedia?.id}
              className='overview__poster'
              src={`${BASE_IMAGE_URL + multimedia?.poster_path}`}
              alt={multimedia?.title || multimedia?.name || multimedia?.original_name}
            />
            <div className='overview__right'>
              <h1 className='overview__title'>{multimedia?.title || multimedia?.name || multimedia?.original_name}</h1>
              <div className='overview__extra'>
                <span>
                  {type === 'movie' ? multimedia?.release_date.split('-')[0] : multimedia?.first_air_date.split('-')[0]}
                </span>
                <span>•</span>
                <span>{multimedia?.runtime} Mins</span>
                <span>•</span>
                <span>{multimedia?.genres.map((g, i) => (i ? ', ' : '') + g.name)}</span>
              </div>
              <div className='rate'>
                <span>
                  <FiIcons.FiStar className='rate__icon' />
                </span>
                <div>
                  <p className='rate_rating'>
                    {multimedia?.vote_average}
                    <span style={{ fontSize: 12, margin: 0, color: '#c6c6c6' }}>/10</span>
                  </p>
                  <p className='rate_count'>{multimedia?.vote_count}</p>
                </div>
              </div>
              {!multimedia?.tagline ? null : <p className='overview__tagline'>"{multimedia?.tagline}"</p>}
              <h1 className='overview__descriptionTitle'>Overview</h1>
              <p className='overview__description'>{truncate(multimedia?.overview || '', 550)}</p>
              <Modal
                activator={({ setShow }: any) => (
                  <button className='overview__button' onClick={() => setShow(true)}>
                    <FiIcons.FiPlay className='overview__buttonIcon' />
                    Play Trailer
                  </button>
                )}
              >
                <div className='video__container'>
                  <iframe
                    title={multimedia?.title || multimedia?.name || multimedia?.original_name}
                    src={`https://www.youtube.com/embed/${trailer}`}
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                  ></iframe>
                </div>
              </Modal>
            </div>
          </div>
          {credits()}
        </div>
      </div>
    </div>
  );
}

export default Overview;

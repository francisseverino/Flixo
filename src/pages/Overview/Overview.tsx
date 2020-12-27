import React from 'react';
import request from '../../api/helper';
import { BASE_IMAGE_URL, API_KEY } from '../../api/constants';
import { Modal } from './../../components';
import { tools } from '../../utils';
import './Overview.css';
import * as FiIcons from 'react-icons/fi';
import * as FaIcons from 'react-icons/fa';
import { Cast } from './components';
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
  homepage: string;
}

interface ExternalIds {
  imdb_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
  id: string;
}

function Overview(props: any) {
  const [type, multimediaId] = props.match.params.multimediaId.split('-');
  const [multimedia, setMultimedia] = React.useState<MovieDetail>();
  const [crew, setCrew] = React.useState<any>([]);
  const [cast, setCast] = React.useState<any>([]);
  const [providers, setProviders] = React.useState<any>([]);
  const [recommendations, setRecommendations] = React.useState<any>([]);
  const [videos, setVideos] = React.useState<any>([]);
  const [trailer, setTrailer] = React.useState<string>('');
  const [externalIds, setExternalIds] = React.useState<ExternalIds>();

  const x = {
    adult: false,
    backdrop_path: '/wzJRB4MKi3yK138bJyuL9nx47y6.jpg',
    belongs_to_collection: null,
    budget: 205000000,
    genres: [
      { id: 28, name: 'Action' },
      { id: 53, name: 'Thriller' },
      { id: 878, name: 'Science Fiction' },
    ],
    homepage: 'https://www.tenetfilm.com/',
    id: 577922,
    imdb_id: 'tt6723592',
    original_language: 'en',
    original_title: 'Tenet',
    overview:
      'Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
    popularity: 1498.768,
    poster_path: '/k68nPLbIST6NP96JmTxmZijEvCA.jpg',
    production_companies: [
      { id: 9996, logo_path: '/3tvBqYsBhxWeHlu62SIJ1el93O7.png', name: 'Syncopy', origin_country: 'GB' },
      { id: 174, logo_path: '/ky0xOc5OrhzkZ1N6KyUxacfQsCk.png', name: 'Warner Bros. Pictures', origin_country: 'US' },
    ],
    production_countries: [
      { iso_3166_1: 'GB', name: 'United Kingdom' },
      { iso_3166_1: 'US', name: 'United States of America' },
    ],
    release_date: '2020-08-22',
    revenue: 359900000,
    runtime: 150,
    spoken_languages: [{ english_name: 'English', iso_639_1: 'en', name: 'English' }],
    status: 'Released',
    tagline: 'Time runs out.',
    title: 'Tenet',
    video: false,
    vote_average: 7.4,
    vote_count: 3189,
  };

  React.useEffect(() => {
    request(
      type === 'movie'
        ? `/movie/${multimediaId}?api_key=${API_KEY}&language=en-US`
        : `/tv/${multimediaId}?api_key=${API_KEY}&language=en-US`
    )
      .then(response => {
        console.log(JSON.stringify(response));
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
        setCrew(response.crew);
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
        setVideos(response.results);
        setTrailer(response.results[0].key);
      })
      .catch(err => console.log(err));
  }, [type, multimediaId]);

  /**
   * Fetch providers to watch
   */
  React.useEffect(() => {
    request(
      type === 'movie'
        ? `/movie/${multimediaId}/watch/providers?api_key=${API_KEY}&language=en-US`
        : `/tv/${multimediaId}/watch/providers?api_key=${API_KEY}&language=en-US`
    )
      .then(response => {
        setProviders(response.results.US);
      })
      .catch(err => console.log(err));
  }, [type, multimediaId]);

  /**
   * Fetch external IDs
   */
  React.useEffect(() => {
    request(
      type === 'movie'
        ? `/movie/${multimediaId}/external_ids?api_key=${API_KEY}&language=en-US`
        : `/tv/${multimediaId}/external_ids?api_key=${API_KEY}&language=en-US`
    )
      .then(response => {
        setExternalIds(response);
      })
      .catch(err => console.log(err));
  }, [type, multimediaId]);

  //   React.useEffect(() => {
  //     request(`/movie/${multimediaId}/recommendations?api_key=${API_KEY}&language=en-US`).then(response => {
  //       setRecommendations(response);
  //     });
  //   }, [multimediaId]);

  const renderProviders = () => {
    return (
      <div className='providers'>
        {providers && providers.rent ? (
          <div>
            <h1 className='providers__title'>Rent:</h1>
            <div className='providers__container'>
              {providers.rent.map((provider: any) => (
                <img
                  key={provider.provider_id}
                  className='provider__poster'
                  src={`${BASE_IMAGE_URL}${provider.logo_path}`}
                  alt={provider.provider_name}
                />
              ))}
            </div>
          </div>
        ) : null}

        {providers && providers.buy ? (
          <div>
            <h1 className='providers__title'>Buy:</h1>
            <div className='providers__container'>
              {providers.buy.map((provider: any) => (
                <img
                  key={provider.provider_id}
                  className='provider__poster'
                  src={`${BASE_IMAGE_URL}${provider.logo_path}`}
                  alt={provider.provider_name}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  // const renderLastEpisode = () => {
  //   const { id, name, season_number, air_date, episode_number, overview, still_path } = multimedia.last_episode_to_air;
  //   const multimediaName = multimedia?.title || multimedia?.name || multimedia?.original_name;
  //   const x = {
  //     last_episode_to_air: {
  //       air_date: '2020-12-04',
  //       episode_number: 9,
  //       id: 2543528,
  //       name: 'Qué Creías',
  //       overview:
  //         'Selena feels conflicted about her secret relationship with Chris. Meanwhile, AB finds inspiration in a memory of a plastic flower and lost love.',
  //       production_code: '',
  //       season_number: 1,
  //       still_path: '/fmbgTdQ40KLSJ0RYaZzJVWYaspl.jpg',
  //       vote_average: 0,
  //       vote_count: 0,
  //     },
  //   };
  //   return type === 'movie' ? null : (
  //     <div>
  //       <img key={id} className='star__poster' src={`${BASE_IMAGE_URL}${still_path}`} alt={name} />
  //       <div>
  //         <h1>Season {season_number}</h1>
  //         <h1>
  //           {air_date.split('-')[0]} | {episode_number} Episodes
  //         </h1>
  //         <p>
  //           Season {season_number} of {multimediaName} premiered on {air_date}
  //         </p>
  //         <p>{overview}</p>
  //       </div>
  //     </div>
  //   );
  // };

  const renderExternalsIds = () => {
    // externalIds
    return (
      <div className='links'>
        <a href={multimedia?.homepage} target='_blank'>
          <FiIcons.FiLink className='link__icon' />
        </a>
        {externalIds ? (
          <>
            {externalIds.facebook_id ? (
              <a href={`https://www.facebook.com/${externalIds.facebook_id}`} target='_blank'>
                <FiIcons.FiFacebook className='link__icon' />
              </a>
            ) : null}
            {externalIds.instagram_id ? (
              <a href={`https://www.instagram.com/${externalIds.instagram_id}`} target='_blank'>
                <FiIcons.FiInstagram className='link__icon' />
              </a>
            ) : null}
            {externalIds.twitter_id ? (
              <a href={`https://www.twitter.com/${externalIds.twitter_id}`} target='_blank'>
                <FiIcons.FiTwitter className='link__icon' />
              </a>
            ) : null}
            {externalIds.imdb_id ? (
              <a href={`https://www.imdb.com/title/${externalIds.imdb_id}`} target='_blank'>
                <FaIcons.FaImdb className='link__icon' />
              </a>
            ) : null}
          </>
        ) : null}
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
                {renderExternalsIds()}
              </div>
              {!multimedia?.tagline ? null : <p className='overview__tagline'>"{multimedia?.tagline}"</p>}
              <h1 className='overview__descriptionTitle'>Overview</h1>
              <p className='overview__description'>{tools.truncate(multimedia?.overview || '', 550)}</p>
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
              {providers && providers.buy ? (
                <div>
                  <div className='providers__container'>
                    {providers.buy.map((provider: any) => (
                      <img
                        key={provider.provider_id}
                        className='provider__poster'
                        src={`${BASE_IMAGE_URL}${provider.logo_path}`}
                        alt={provider.provider_name}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <Cast cast={cast} crew={crew} />
        </div>
      </div>
    </div>
  );
}

export default Overview;

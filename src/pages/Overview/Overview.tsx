import React from 'react';
import request from '../../api/helper';
import { BASE_IMAGE_URL, API_KEY } from '../../api/constants';
import { Modal, Column } from './../../components';
import { tools } from '../../utils';
import './Overview.css';
import * as FiIcons from 'react-icons/fi';
import * as FaIcons from 'react-icons/fa';
import { Cast, Seasons } from './components';
import { useHistory } from 'react-router-dom';
import { MultimediaData } from '../../types';

interface ExternalIds {
  imdb_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
  id: string;
}

function Overview(props: any) {
  const [type, multimediaId] = props.match.params.multimediaId.split('-');
  const [multimedia, setMultimedia] = React.useState<MultimediaData>();
  const [crew, setCrew] = React.useState<any>([]);
  const [cast, setCast] = React.useState<any>([]);
  const [providers, setProviders] = React.useState<any>([]);
  const [recommendations, setRecommendations] = React.useState<any>([]);
  const [videos, setVideos] = React.useState<any>([]);
  const [trailer, setTrailer] = React.useState<string>('');
  const [externalIds, setExternalIds] = React.useState<ExternalIds>();
  const [seasons, setSeasons] = React.useState<any>([]);

  const history = useHistory();

  React.useEffect(() => {
    request(
      type === 'movie'
        ? `/movie/${multimediaId}?api_key=${API_KEY}&language=en-US`
        : `/tv/${multimediaId}?api_key=${API_KEY}&language=en-US`
    )
      .then(response => {
        setMultimedia(response);
        if (type === 'tv') {
          getSeasons(response.number_of_seasons);
        }
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
   * Fetch recommendations
   */
  React.useEffect(() => {
    request(
      type === 'movie'
        ? `/movie/${multimediaId}/recommendations?api_key=${API_KEY}&language=en-US`
        : `/tv/${multimediaId}/recommendations?api_key=${API_KEY}&language=en-US`
    )
      .then(response => {
        setRecommendations(response.results);
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

  /**
   * Fetch Season's episodes
   */
  const getSeasons = (numberOfSeasons: number) => {
    if (type === 'movie') {
      return;
    }
    setSeasons([]);
    for (let n = 0; n <= numberOfSeasons; n++) {
      request(`/tv/${multimediaId}/season/${n}?api_key=${API_KEY}&language=en-US`)
        .then(response => {
          setSeasons((prevEpisodes: any) => prevEpisodes.concat(response).sort());
        })
        .catch(err => console.log(err));
    }
  };

  const renderExternalsIds = () => {
    return (
      <div className='links'>
        <a href={multimedia?.homepage} target='_blank' rel='noreferrer'>
          <FiIcons.FiLink className='link__icon' />
        </a>
        {externalIds ? (
          <>
            {externalIds.facebook_id ? (
              <a href={`https://www.facebook.com/${externalIds.facebook_id}`} target='_blank' rel='noreferrer'>
                <FiIcons.FiFacebook className='link__icon' />
              </a>
            ) : null}
            {externalIds.instagram_id ? (
              <a href={`https://www.instagram.com/${externalIds.instagram_id}`} target='_blank' rel='noreferrer'>
                <FiIcons.FiInstagram className='link__icon' />
              </a>
            ) : null}
            {externalIds.twitter_id ? (
              <a href={`https://www.twitter.com/${externalIds.twitter_id}`} target='_blank' rel='noreferrer'>
                <FiIcons.FiTwitter className='link__icon' />
              </a>
            ) : null}
            {externalIds.imdb_id ? (
              <a href={`https://www.imdb.com/title/${externalIds.imdb_id}`} target='_blank' rel='noreferrer'>
                <FaIcons.FaImdb className='link__icon' />
              </a>
            ) : null}
          </>
        ) : null}
      </div>
    );
  };

  const handleClick = (selectedMultimedia: any) => {
    const type = selectedMultimedia.first_air_date ? 'tv' : 'movie';
    history.push(`/overview/${type}-${selectedMultimedia.id}`);
    window.location.reload();
    window.scrollTo(0, 0);
  };

  return (
    <div className='overview'>
      <div
        className='overview__header'
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(
            "${BASE_IMAGE_URL + multimedia?.backdrop_path}"
        )`,
          backgroundPosition: 'center center',
        }}
      >
        <div className='overview__headerOverlay'>
          <div className='overview__headerContents'>
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
                <span>{type === 'tv' ? multimedia?.episode_run_time.join('-') : multimedia?.runtime} Mins</span>
                {type === 'tv' ? (
                  <>
                    <span>•</span>
                    <span>{multimedia?.number_of_seasons} Seasons</span>
                  </>
                ) : null}
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
              <p className='overview__description'>{multimedia?.overview}</p>
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
          <div className='overview__headerGradient'>
            <div className='overview__footerButton'>
              <FiIcons.FiChevronDown />
            </div>
          </div>
        </div>
      </div>
      <div className='overview__footer'>
        <div className='overview__footerContent'>
          {seasons.length === 0 ? null : <Seasons seasons={seasons} multimedia={multimedia} />}
          <Cast cast={cast} crew={crew} />
          <div>
            <Column title='Videos'>
              {videos.map((video: any) => (
                <div className='video' key={video.id}>
                  <iframe
                    title={multimedia?.title || multimedia?.name || multimedia?.original_name}
                    src={`https://www.youtube.com/embed/${video.key}`}
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </Column>
          </div>
          <div>
            <Column title='Recommendations'>
              {recommendations.map((recommendation: any) => (
                <img
                  key={recommendation.id}
                  onClick={() => handleClick(recommendation)}
                  className='recommendation__poster'
                  src={`${BASE_IMAGE_URL}${recommendation.poster_path}`}
                  alt={recommendation.title || recommendation.name || recommendation.original_name}
                />
              ))}
            </Column>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;

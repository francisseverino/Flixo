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
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: Array<genres>;
  vote_average: number;
  vote_count: number;
}

function Overview(props: any) {
  const movieId = props.match.params.movieId;
  const [movie, setMovie] = React.useState<MovieDetail>();
  const [cast, setCast] = React.useState<any>([]);
  const [recommendations, setRecommendations] = React.useState<any>([]);
  const [videos, setVideos] = React.useState<any>([]);
  const [trailer, setTrailer] = React.useState<string>('');

  React.useEffect(() => {
    request(`/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        setMovie(response);
      })
      .catch(err => console.log(err));
  }, [movieId]);

  React.useEffect(() => {
    request(`/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        // setCrew(response.crew)
        setCast(response.cast);
      })
      .catch(err => console.log(err));
  }, [movieId]);

  React.useEffect(() => {
    request(`/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        console.log(response);
        setVideos(response.results);
        setTrailer(response.results[0].key);
      })
      .catch(err => console.log(err));
  }, [movieId]);

  //   React.useEffect(() => {
  //     request(`/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US`).then(response => {
  //       setRecommendations(response);
  //     });
  //   }, [movieId]);

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  const credits = () => {
    return (
      <div className='cast'>
        <h1 className='cast__title'>Cast:</h1>

        <div className='cast__stars'>
          {cast.map((star: any) => (
            <div className='cast__star' key={star.id}>
              <img
                key={star.id}
                className='star__poster'
                src={`${BASE_IMAGE_URL}${star.profile_path}`}
                alt={star.name}
              />
              <p className='star__name'>{star.name}</p>
              <p className='star__character'>{star.character}</p>
            </div>
          ))}
        </div>

        <button className='overview__button'>View all credits</button>
      </div>
    );
  };

  return (
    <div
      className='overview'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(
            "${BASE_IMAGE_URL + movie?.backdrop_path}"
        )`,
        backgroundPosition: 'center center',
      }}
    >
      <div className='overview__overlay'>
        <div className='overview__contents'>
          <div className='overview__contentsLeft'>
            <h1 className='overview__title'>{movie?.title || movie?.name || movie?.original_name}</h1>
            <div className='overview__extra'>
              <span>
                <FiIcons.FiStar />
              </span>
              <span>{movie?.vote_average}/10</span>
              <span>{movie?.vote_count}</span>
              <span>•</span>
              <span>{movie?.release_date.split('-')[0]}</span>
              <span>•</span>
              <span>{movie?.runtime} Mins</span>
              <span>•</span>
              <span>{movie?.genres.map((g, i) => (i ? ', ' : '') + g.name)}</span>
            </div>
            <p className='overview__description'>{truncate(movie?.overview || '', 550)}</p>
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
                  src={`https://www.youtube.com/embed/${trailer}`}
                  frameBorder='0'
                  allow='autoplay; encrypted-media'
                  allowFullScreen
                ></iframe>
              </div>
            </Modal>
          </div>

          <div className='overview__contentsRight'>{credits()}</div>
        </div>
      </div>
    </div>
  );
}

export default Overview;

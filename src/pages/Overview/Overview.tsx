import React from 'react';
import request from '../../api/helper';
import { BASE_IMAGE_URL, API_KEY } from '../../api/constants';
import './Overview.css';
import * as FiIcons from 'react-icons/fi';

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
  genres: Array<any>;
  vote_average: number;
  vote_count: number;
}

function Overview(props: any) {
  const movieId = props.match.params.movieId;
  const [movie, setMovie] = React.useState<MovieDetail>();
  const [cast, setCast] = React.useState<any>([]);
  const [recommendations, setRecommendations] = React.useState<any>([]);

  React.useEffect(() => {
    request(`/movie/${movieId}?api_key=${API_KEY}&language=en-US`).then(response => {
      setMovie(response);
    });
  }, []);

  React.useEffect(() => {
    request(`/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        // setCrew(response.crew)
        setCast(response.cast);
      })
      .catch(err => console.log(err));
  }, []);

  //   React.useEffect(() => {
  //     request(`/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US`).then(response => {
  //       setRecommendations(response);
  //     });
  //   }, []);

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
            <button className='overview__button'>
              <FiIcons.FiPlay className='overview__buttonIcon' />
              Play Trailer
            </button>
            {/* <div className='overview__cast'>
            {cast.map((member: any) => {
                <div>
                    <h2>{member.name}</h2>
                    <h2>{member.character}</h2>
                </div>
            })}
        </div> */}
          </div>

          <div className='overview__contentsRight'>{credits()}</div>
        </div>
      </div>
    </div>
  );
}

// const xx = {
//   adult: false,
//   backdrop_path: null,
//   genre_ids: (2)[(16, 10751)],
//   id: 360615,
//   original_language: 'en',
//   original_title: 'Winnie the Pooh Learning: Helping Others',
//   overview: 'Winnie the Pooh and friends teach us to help others.',
//   popularity: 4.042,
//   poster_path: null,
//   release_date: '1997-01-01',
//   title: 'Winnie the Pooh Learning: Helping Others',
//   video: true,
//   vote_average: 5.9,
//   vote_count: 9,
// };

// const x = {
//   adult: false,
//   backdrop_path: '/54yOImQgj8i85u9hxxnaIQBRUuo.jpg',
//   belongs_to_collection: null,
//   budget: 0,
//   genres: [
//     {
//       id: 28,
//       name: 'Action',
//     },
//     {
//       id: 80,
//       name: 'Crime',
//     },
//     {
//       id: 18,
//       name: 'Drama',
//     },
//     {
//       id: 53,
//       name: 'Thriller',
//     },
//   ],
//   homepage: 'http://essaymonkey.net/',
//   id: 539885,
//   imdb_id: 'tt8784956',
//   original_language: 'en',
//   original_title: 'Ava',
//   overview: 'A black ops assassin is forced to fight for her own survival after a job goes dangerously wrong.',
//   popularity: 544.473,
//   poster_path: '/qzA87Wf4jo1h8JMk9GilyIYvwsA.jpg',
//   production_companies: [
//     {
//       id: 83210,
//       logo_path: null,
//       name: 'Freckles Films',
//       origin_country: 'US',
//     },
//     {
//       id: 6626,
//       logo_path: '/A1BnMoWjzjOrjzpWimyBQkf84mS.png',
//       name: 'Voltage Pictures',
//       origin_country: 'US',
//     },
//     {
//       id: 88606,
//       logo_path: null,
//       name: 'Vertical Entertainment',
//       origin_country: 'US',
//     },
//   ],
//   production_countries: [
//     {
//       iso_3166_1: 'US',
//       name: 'United States of America',
//     },
//   ],
//   release_date: '2020-07-02',
//   revenue: 2987741,
//   runtime: 96,
//   spoken_languages: [
//     {
//       english_name: 'English',
//       iso_639_1: 'en',
//       name: 'English',
//     },
//     {
//       english_name: 'French',
//       iso_639_1: 'fr',
//       name: 'Français',
//     },
//     {
//       english_name: 'German',
//       iso_639_1: 'de',
//       name: 'Deutsch',
//     },
//   ],
//   status: 'Released',
//   tagline: 'Kill. Or be killed.',
//   title: 'Ava',
//   video: false,
//   vote_average: 5.6,
//   vote_count: 638,
// };
export default Overview;

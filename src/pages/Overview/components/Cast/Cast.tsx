import React from 'react';
import { BASE_IMAGE_URL } from '../../../../api/constants';
import { Modal } from './../../../../components';
import * as FiIcons from 'react-icons/fi';
import './Cast.css';

interface Cast {
  cast: any;
  crew: any;
}

function Cast(props: Cast) {
  const { cast, crew } = props;

  const renderCredits = () => {
    return (
      <div className='credits'>
        <div className='credits__container'>
          <h1 className='credits__title'>
            Series Cast <span>• {cast.length}</span>
          </h1>
          <div className='credits__list'>
            {cast.map((credit: any) => (
              <div className='credit' key={credit.id}>
                {credit.profile_path ? (
                  <img
                    key={credit.id}
                    className='credit__poster'
                    src={`${BASE_IMAGE_URL}${credit.profile_path}`}
                    alt={credit.name}
                  />
                ) : (
                  <img
                    key={credit.id}
                    className='credit__poster'
                    src='https://pbs.twimg.com/media/ESHtph2WAAMQAUR.jpg'
                    alt={credit.name}
                  />
                )}
                <div>
                  <p className='credit__name'>{credit.name}</p>
                  <p className='credit__character'>{credit.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='credits__container'>
          <h1 className='credits__title'>
            Series Crew <span>• {crew.length}</span>
          </h1>
          <div className='credits__list'>
            {crew.map((credit: any) => (
              <div className='credit' key={credit.id}>
                {credit.profile_path ? (
                  <img
                    key={credit.id}
                    className='credit__poster'
                    src={`${BASE_IMAGE_URL}${credit.profile_path}`}
                    alt={credit.name}
                  />
                ) : (
                  <img
                    key={credit.id}
                    className='credit__poster'
                    src='https://pbs.twimg.com/media/ESHtph2WAAMQAUR.jpg'
                    alt={credit.name}
                  />
                )}
                <div>
                  <p className='credit__name'>{credit.name}</p>
                  <p className='credit__character'>{credit.job}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='cast'>
      <div className='cast__titleContainer'>
        <span className='cast__title'>Cast:</span>
        <Modal
          activator={({ setShow }: any) => (
            <button className='cast__button' onClick={() => setShow(true)}>
              View all credits
              <FiIcons.FiArrowRight />
            </button>
          )}
        >
          {renderCredits()}
        </Modal>
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
}

export default Cast;

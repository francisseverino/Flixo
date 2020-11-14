import React from 'react';
import './Home.css';
import { Row, Banner } from '../../components';
import { requests } from '../../api/constants';

function Home() {
  return (
    <div className='home'>
      <Banner />

      <Row title='Netflix Originals' fetchUrl={requests.netflixOriginals} isLargeRow />
      <Row title='Trending Now' fetchUrl={requests.trending} />
      <Row title='Top Rated' fetchUrl={requests.topRated} />
      <Row title='Action Movies' fetchUrl={requests.actionMovies} />
      <Row title='Comedy Movies' fetchUrl={requests.comedyMovies} />
      <Row title='Horror Movies' fetchUrl={requests.horrorMovies} />
      <Row title='Romance Movies' fetchUrl={requests.romanceMovies} />
      <Row title='Documentaries' fetchUrl={requests.documentaries} />
    </div>
  );
}

export default Home;

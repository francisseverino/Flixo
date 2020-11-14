import React from 'react';
import './App.css';
import { Row, Banner, Nav } from './components';
import { requests } from '../../api/constants';

function App() {
  return (
    <div className='app'>
      <Nav />
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

export default App;

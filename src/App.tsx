import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Nav } from './components';
import './App.css';
import { Home, Movies, Shows, Overview } from './pages';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/movies'>
          <Movies />
        </Route>
        <Route path='/shows'>
          <Shows />
        </Route>
        <Route path='/overview/:movieId' component={Overview} />
      </Switch>
    </Router>
  );
}

export default App;

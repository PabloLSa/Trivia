import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Game from './Pages/Game';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
      </Switch>
    </div>
  );
}

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Game from './Pages/Game';
import Config from './Pages/Config';
import Feedback from './Pages/Feedback';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/config" component={ Config } />
        <Route exact path="/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    return (
      <div data-testid="ranking-title">
        <h1>
          Ranking
        </h1>
        <Link
          to="/"
          data-testid="btn-go-home"
        >
          Inicio
        </Link>
      </div>
    );
  }
}

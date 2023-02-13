import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  state = {
    rankings: [],
  };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ rankings: ranking });
  }

  render() {
    const { rankings } = this.state;
    return (
      <div data-testid="ranking-title">
        {rankings.sort((a, b) => b.score - a.score)
          .map((ranking, index) => (
            <div key={ index }>
              <p data-testid={ `player-name-${index}` }>{ ranking.name }</p>
              <img src={ ranking.image } alt={ ranking.name } />
              <p data-testid={ `player-score-${index}` }>{ ranking.score }</p>
            </div>
          ))}
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

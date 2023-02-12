import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const number = 3;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-total-score">{ score }</h1>
        <h2 data-testid="feedback-total-question">{ assertions }</h2>
        <p data-testid="feedback-text">
          {
            assertions >= number ? 'Well Done!' : 'Could be better...'
          }
        </p>
        <Link
          to="/"
          data-testid="btn-play-again"
        >
          Play Again
        </Link>
        <Link
          to="/ranking"
          data-testid="btn-ranking"
        >
          Ranking
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);

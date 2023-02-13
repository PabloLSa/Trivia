import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { addScore } from '../Redux/Actions';

class Feedback extends Component {
  componentWillUnmount() {
    const { email, score, name, dispatch } = this.props;
    const ranking = [{
      image: `https://www.gravatar.com/avatar/${md5(email).toString()}`,
      score,
      name,
    }];
    const rankingInfo = localStorage.getItem('ranking');
    if (rankingInfo === null) {
      localStorage.setItem('ranking', JSON.stringify(ranking));
    } else {
      localStorage.setItem('ranking', JSON
        .stringify([...JSON.parse(rankingInfo), ...ranking]));
    }
    dispatch(addScore(0, true));
  }

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
  email: state.user.email,
  name: state.user.name,
});

export default connect(mapStateToProps)(Feedback);

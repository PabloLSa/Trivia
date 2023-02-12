import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { disableButton } from '../Redux/Actions';

class AnswerTimer extends Component {
  state = {
    seconds: 30,
  };

  componentDidMount() {
    this.timer();
  }

  timer = () => {
    const second = 1000;
    return setInterval(() => {
      this.countDown();
    }, second);
  };

  countDown = () => {
    const { seconds } = this.state;
    if (seconds === 0) {
      return;
    }
    this.setState({ seconds: seconds - 1 }, this.disableButtons);
  };

  disableButtons = () => {
    const { dispatch } = this.props;
    const { seconds } = this.state;
    if (seconds === 0) {
      dispatch(disableButton());
    }
  };

  render() {
    const { seconds } = this.state;
    return (
      <div>{ seconds }</div>
    );
  }
}

AnswerTimer.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(null)(AnswerTimer);

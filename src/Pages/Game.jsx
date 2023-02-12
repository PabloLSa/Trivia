import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../styles/game.css';
import AnswerTimer from '../components/AnswerTimer';

const INITIAL_STATE = {
  questions: [],
  options: [],
  correctAnswer: [],
  questionId: 0,
  category: [],
  responseAPI: false,
  color: '',
  nextButton: false,
};

class Game extends Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const token = localStorage.getItem('token');
    const data = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((conteudo) => conteudo);
    const responseFail = 3;
    if (data.response_code === responseFail) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      questions: data.results.map((result) => result.question),
      options: data.results.map((result) => [
        result.correct_answer,
        ...result.incorrect_answers]),
      correctAnswer: data.results.map((result) => result.correct_answer),
      category: data.results.map((result) => result.category),
      responseAPI: true,
    });
  };

  changeColor = (e) => {
    const { target } = e;
    const { correctAnswer } = this.state;
    const { id, innerHTML } = target;
    if (innerHTML === correctAnswer[id]) {
      e.currentTarget.classList.add('green');
      this.setState({ color: 'green' });
    } else {
      e.currentTarget.classList.add('red');
      this.setState({ color: 'red' });
    }
  };

  teste = (boolean) => {
    const { color } = this.state;
    if (color === 'green' && boolean) {
      return 'green';
    }
    if (color === 'green' && !boolean) {
      return 'red';
    }
    if (color === 'red' && boolean) {
      return 'green';
    }
    if (color === 'red' && !boolean) {
      return 'red';
    }
  };

  renderNextButton = () => {
    this.setState({
      nextButton: true,
    });
  };

  renderNextQuestion = () => {
    const { questionId } = this.state;
    const second = 10;
    this.setState({
      nextQuestion: true,
      questionId: questionId + 1,
      color: '',
      nextButton: false,
    });
    setTimeout(() => {
      this.setState({ nextQuestion: false });
    }, second);
  };

  render() {
    const {
      questions,
      options,
      correctAnswer,
      questionId,
      responseAPI,
      category,
      nextButton,
      nextQuestion } = this.state;
    const number = 0.5;
    const { isDisabled } = this.props;
    return (
      <div>
        <Header />
        <form>
          <h3 data-testid="question-category">{ category[questionId] }</h3>
          {responseAPI && <AnswerTimer disabled={ nextButton } next={ nextQuestion } />}
          <h2 data-testid="question-text">{ questions[questionId] }</h2>
          {responseAPI && (
            <div data-testid="answer-options">
              {
                options[questionId].sort(() => Math.random() - number)
                  .map((question, index) => (
                    <button
                      key={ index }
                      data-testid={
                        question === correctAnswer[questionId]
                          ? 'correct-answer'
                          : `wrong-answer-${index - 1}`
                      }
                      id={ questionId }
                      className={ this.teste(question === correctAnswer[questionId]) }
                      onClick={ (e) => {
                        e.preventDefault();
                        this.changeColor(e);
                        this.renderNextButton();
                      } }
                      disabled={ isDisabled }
                    >
                      {question}
                    </button>
                  ))
              }
            </div>)}
          {nextButton && (
            <button
              data-testid="btn-next"
              onClick={ (e) => {
                e.preventDefault();
                this.renderNextQuestion();
              } }
            >
              Next
            </button>)}
        </form>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  isDisabled: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  isDisabled: state.user.isDisabled,
});

export default connect(mapStateToProps)(Game);

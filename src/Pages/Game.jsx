import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../App.css';

const INITIAL_STATE = {
  questions: [],
  options: [],
  correctAnswer: [],
  questionId: 0,
  category: [],
  responseAPI: false,
};

export default class Game extends Component {
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

  render() {
    const {
      questions,
      options,
      correctAnswer,
      questionId,
      responseAPI,
      category } = this.state;
    const number = 0.5;

    return (
      <div>
        <Header />
        <form>
          <h3 data-testid="question-category">{ category[questionId] }</h3>
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
                      className={ question === correctAnswer[questionId]
                        ? 'green'
                        : 'white' }
                    >
                      {question}
                    </button>
                  ))
              }
            </div>)}
        </form>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

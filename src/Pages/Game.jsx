import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const INITIAL_STATE = {
  questions: [],
  incorrectOptions: [],
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
    const responseFail = 3;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    console.log(data);
    if (data.response_code === 0) {
      this.setState({
        questions: data.results.map((result) => result.question),
        incorrectOptions: data.results.map((result) => [...result.incorrect_answers]),
        correctAnswer: data.results.map((result) => result.correct_answer),
        category: data.results.map((result) => result.category),
        responseAPI: true,
      });
    } else if (data.response_code === responseFail) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  render() {
    const {
      questions,
      incorrectOptions,
      correctAnswer,
      questionId,
      responseAPI,
      category } = this.state;
    return (
      <div>
        <Header />
        <form>
          <h3 data-testid="question-category">{ category[questionId] }</h3>
          <h2 data-testid="question-text">{ questions[questionId] }</h2>
          {responseAPI && (
            <ul data-testid="answer-options">
              {
                incorrectOptions[questionId]
                  .map((question, index) => (
                    <li key={ question }>
                      <button
                        data-testid={ `wrong-answer-${index}` }
                      >
                        { question }
                      </button>
                    </li>
                  ))
              }
              <li>
                <button
                  data-testid="correct-answer"
                >
                  { correctAnswer[questionId] }
                </button>
              </li>
            </ul>)}
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

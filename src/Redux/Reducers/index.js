import { combineReducers } from 'redux';
import {
  ADD_EMAIL, ADD_NAME,
  IS_DISABLED,
  ADD_SCORE,
  ADD_SECOND_SCORE } from '../Actions';

const INITIAL_STATE = {
  isDisabled: false,
};

const INITIAL_PLAYER_STATE = {
  score: 0,
  seconds: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  case ADD_NAME:
    return {
      ...state,
      name: action.payload,
    };
  case IS_DISABLED:
    return {
      ...state,
      isDisabled: action.payload,
    };
  default:
    return state;
  }
};

const playerReducer = (state = INITIAL_PLAYER_STATE, action) => {
  switch (action.type) {
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case ADD_SECOND_SCORE:
    return {
      ...state,
      seconds: action.payload,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  player: playerReducer,
});

export default rootReducer;

import { combineReducers } from 'redux';
import { ADD_EMAIL, ADD_NAME } from '../Actions';

const INITIAL_STATE = {};

const exampleReducer = (state = INITIAL_STATE, action) => {
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
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  user: exampleReducer });

export default rootReducer;
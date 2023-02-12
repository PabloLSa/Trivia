export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_NAME = 'ADD_NAME';
export const IS_DISABLED = 'IS_DISABLED';
export const ADD_SCORE = 'ADD_SCORE';
export const ADD_SECOND_SCORE = 'ADD_SECOND_SCORE';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const addName = (name) => ({
  type: ADD_NAME,
  payload: name,
});

export const addScore = (score) => ({
  type: ADD_SCORE,
  payload: score,
});

export const timerSecondToScore = (seconds) => ({
  type: ADD_SECOND_SCORE,
  payload: seconds,
});

export const disableButton = () => ({
  type: IS_DISABLED,
  payload: true,
});

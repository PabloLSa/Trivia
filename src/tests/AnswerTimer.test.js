import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AnswerTimer from '../components/AnswerTimer';
import rootReducer from '../Redux/Reducers';
import App from '../App';

let container = null;
let store = null;

beforeEach(() => {
  // Configura o container DOM como o destino da renderização
  container = document.createElement('div');
  document.body.appendChild(container);

  // Configura o store Redux
  store = createStore(rootReducer);
});
 
afterEach(() => {
  // Limpa o container DOM após cada teste
  unmountComponentAtNode(container);
  container.remove();
  container = null;

  // Limpa o store Redux após cada teste
  store = null;
});

it('deve iniciar a contagem regressiva quando montado', () => {
  act(() => {
    render(
      <Provider store={store}>
        <AnswerTimer />
      </Provider>,
      container
    );
  });

  // Verifica se a contagem regressiva começou
  expect(container.textContent).toBe('30');
});


it('deve reiniciar a contagem regressiva quando atualizado', () => {
  act(() => {
    render(
      <Provider store={store}>
        <AnswerTimer />
      </Provider>,
      container
    );
  });

  // Espera 15 segundos antes de atualizar o componente
  jest.advanceTimersByTime(15000);

  act(() => {
    render(
      <Provider store={store}>
        <AnswerTimer next={true} />
      </Provider>,
      container
    );
  });

  // Verifica se a contagem regressiva foi reiniciada
  expect(container.textContent).toBe('30');
});

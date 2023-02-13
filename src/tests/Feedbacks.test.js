import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Feedback from '../Pages/Feedback';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testes do componente Feedback.js', () => {
  it('Deve renderizar os componentes corretamente', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const headerText = screen.getByTestId('header-player-name');
    const feedbackText = screen.getByTestId('feedback-text');

    expect(feedbackText).toHaveTextContent('Could be better...');
    expect(headerText).toBeInTheDocument();
    expect(feedbackText).toBeInTheDocument();
  });
  
  it('Deve exibir a mensagem "Well Done!" em caso de muitos acertos', async () => {
    const { store, history } = renderWithRouterAndRedux(<App />);
    store.getState().player.assertions = 5;
    act(() => {
      history.push('/feedback');
    })
    await waitFor(() => {
      const feedbackText = screen.getByTestId('feedback-text');
      expect(feedbackText).toHaveTextContent('Well Done!');
    }, 2000);

  });
  
  it('Deve permitir que o usuário jogue novamente ao clicar no botão "Play Again"', async() => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/feedback');
    });
    expect(history.location.pathname).toBe('/feedback')
    await waitFor(() => {
      const playAgainBtn = screen.getByTestId('btn-play-again');
      userEvent.click(playAgainBtn);
      expect(history.location.pathname).toBe('/')
    }, 2000);
  })
  
  it('Deve redirecionar o usuário para a página de ranking ao clicar no botão "Ranking"', async() => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/feedback');
    });
    expect(history.location.pathname).toBe('/feedback')
    await waitFor(() => {
      const playAgainBtn = screen.getByTestId('btn-ranking');
      userEvent.click(playAgainBtn);
      expect(history.location.pathname).toBe('/ranking')
    }, 2000);
  })
});

import React from 'react';
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { mock, easy, medium, hard, error, data } from "./helpers/mock";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import Game from '../Pages/Game';
import { wait } from '@testing-library/user-event/dist/utils';

const initState = {
  player: {
    name: 'grupo 6',
    assertions: 0,
    score: 0,
  }
};

describe('Teste Pagina Game', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mock),
    }));
    jest.setTimeout(30000);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

 
  
  it('Botão de Next não deve aparecer na primeira pergunta', async () => {
    await act(async () => {
      renderWithRouterAndRedux(<App />, initState, '/game');
    });

    const nextBtn =  screen.queryByTestId('btn-next');

    expect(nextBtn).not.toBeInTheDocument();
  });

  it('Botão de Next deve aparecer após a primeira pergunta', async () => {
    await act(async () => {
      renderWithRouterAndRedux(<App />, initState, '/game');
    });

    const answer = await screen.findByTestId('correct-answer');
    userEvent.click(answer);

    const nextBtn = await screen.findByTestId('btn-next');

    expect(nextBtn).toBeInTheDocument();
  });

  it('Próxima pergunta é renderizada ao clicar no botão de Next', async () => {
    await act(async () => {
      renderWithRouterAndRedux(<App />, initState, '/game');
    });

    const answer = await screen.findByTestId('correct-answer');
    userEvent.click(answer);

    const nextBtn = await screen.findByTestId('btn-next');
    userEvent.click(nextBtn);

    const question = await screen.findByTestId('question-category');
    const questionText = await screen.findByTestId('question-text');
    const answerOptions = await screen.findByTestId('answer-options');

    expect(question).toBeInTheDocument();
    expect(questionText).toBeInTheDocument();
    expect(answerOptions).toBeInTheDocument();
  });

  it('O botão é desabilitado, ', async () => {
    await act(async () => {
      renderWithRouterAndRedux(<App />, initState, '/game');
    });

    const answer = await screen.findByTestId('correct-answer');
    userEvent.click(answer);

    const nextBtn = await screen.findByTestId('btn-next');
    userEvent.click(nextBtn);

    expect(nextBtn).not.toBeInTheDocument();
  });

  it('A pergunta deve ser renderizada ao clicar no botão de Next', async () => {
    await act(async () => {
      renderWithRouterAndRedux(<App />, initState, '/game');
    });

    expect(screen.getByTestId('question-text')).toHaveTextContent(mock.results[0].question);
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));

    expect(screen.getByTestId('question-text')).toHaveTextContent(mock.results[1].question);
  });


  it('A resposta correta é contabilizada', async () => {
    await act(async () => {
      renderWithRouterAndRedux(<App />, initState, '/game');
    });

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));

    expect(screen.getByTestId('header-score')).not.toHaveTextContent(/^0$/);
  });



  it('Um token invalido deve redirecionar para tela de login', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ response_code: 3, results: [] }),
    }));

    const { history } = renderWithRouterAndRedux(<App />, initState, '/game');
     expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });

  it('Componentes são renderizados conforme proposto', async () => {
    const { history } = renderWithRouterAndRedux(<Game />);
    await waitFor(() => {
      const category = screen.getByTestId('question-category');
      expect(category).toBeInTheDocument();
    }, 4000);
  })
  it('Renders Game component', async () => {
    const { history } = renderWithRouterAndRedux(<Game />);
    await waitFor(() => {
    const questionText = screen.getByTestId('question-text');
    expect(questionText).toBeInTheDocument();
    })
   
  });
 
 it('Testa se a página existe', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        act(() => {
            history.push('/game');
          });
        const { location: { pathname }} = history;
        expect(pathname).toBe('/game');
  })

  it('Confirindo Header', () => {
    renderWithRouterAndRedux(<Game />);
    const name = screen.getByTestId('header-player-name');
    const pontos = screen.getByTestId('header-score');
    expect(name).toBeInTheDocument();
    expect(pontos).toBeInTheDocument();
  });

  it('Confirindo  o botão ', ()=> {
    const {history} = renderWithRouterAndRedux(<App />);
    const btn = screen.getByTestId("btn-play");
    expect(btn).toBeInTheDocument();
  
  })

const validEmail = "teste@teste.com";
const validName = "João";

it('Renderiza corretamente os elementos do gravatar', () => {
  const { history } = renderWithRouterAndRedux(<App />, initState, '/game');


  const name = screen.getByTestId('header-player-name');
  const pontos = screen.getByTestId('header-score');
  
  expect(name).toBeInTheDocument();
  expect(pontos).toBeInTheDocument();
});


it('Verifica a cor da questão correta', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: () => easy,
  });

  jest.useFakeTimers()

  const expectedStore = { 
    player: {
    userName: 'Name test',
    userEmail: 'test@test.com',
    score: 30,
    assertions: 1
  }
}

  const { store } = renderWithRouterAndRedux(<App />);
  const NAME = 'Name test';
  const EMAIL = 'test@test.com';

  const inputName = screen.getByTestId('input-player-name');

  const inputEmail = screen.getByTestId('input-gravatar-email');

  userEvent.type(inputName, NAME);
  userEvent.type(inputEmail, EMAIL);

  const buttonPlay = screen.getByTestId('btn-play');

  await act(() =>  userEvent.click(buttonPlay));

  const correctAnswer = screen.getByTestId('correct-answer');

  await act(() => jest.advanceTimersByTime(100000));
  
  await act(() => userEvent.click(correctAnswer));


  const styles = getComputedStyle(correctAnswer);

  expect(styles.border).toBe('2px outset buttonface');

})

it('Verifica a cor da questão incorreta', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: () => easy,
  });

  jest.useFakeTimers()

  const expectedStore = { 
    player: {
    userName: 'Name test',
    userEmail: 'test@test.com',
    score: 0,
    assertions: 0
  }
}

  const { store } = renderWithRouterAndRedux(<App />);
  const NAME = 'Name test';
  const EMAIL = 'test@test.com';

  const inputName = screen.getByTestId('input-player-name');

  const inputEmail = screen.getByTestId('input-gravatar-email');

  userEvent.type(inputName, NAME);
  userEvent.type(inputEmail, EMAIL);

  const buttonPlay = screen.getByTestId('btn-play');

  await act(() =>  userEvent.click(buttonPlay));

  const incorrecttAnswer = screen.getByTestId('wrong-answer-1');

  await act(() => jest.advanceTimersByTime(10000));

  await act(() => userEvent.click(incorrecttAnswer));

  const styles = getComputedStyle(incorrecttAnswer);

  
  expect(styles.border).toBe('2px outset buttonface');

  const headerScore = screen.getByTestId('header-score');
  expect(headerScore.innerHTML).toBe('0')

  });

  it('Valida se o usuário é redirecionado para a página principal, caso o token seja inválido', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => error,
    });
  
    const { history } = renderWithRouterAndRedux(<App />);
    const NAME = 'Name test';
    const EMAIL = 'test@test.com';

    const inputName = screen.getByTestId('input-player-name');

    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputName, NAME);
    userEvent.type(inputEmail, EMAIL);

    const buttonPlay = screen.getByTestId('btn-play');

    await act(() =>  userEvent.click(buttonPlay));

    const { location: { pathname }, entries } = history;
 
    expect(entries.length).toBe(3)
    expect(entries[0].pathname).toBe('/')
    expect(entries[1].pathname).toBe('/game')
    expect(entries[2].pathname).toBe('/')

    expect(pathname).toBe('/')

  })
}); 
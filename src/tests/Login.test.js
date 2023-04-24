import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa componente Login', () => {
  it('testa se botão é habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const validEmail = 'teste@teste.com';
    const validPassword = '111111';

    const email = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Senha');
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });

    expect(buttonLogin).toBeDisabled();

    userEvent.type(email, validEmail);
    userEvent.type(password, validPassword);
    expect(buttonLogin).toBeEnabled();
  });
  it('testa se o botão encaminha para a página carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const validEmail = 'teste@teste.com';
    const validPassword = '111111';

    const email = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Senha');
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, validEmail);
    userEvent.type(password, validPassword);
    userEvent.click(buttonLogin);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});

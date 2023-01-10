import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormLogin from './FormLogin';

/**
 *
 * - FormLogin Component Test
 *
 *  - Should handle email typing correctly
 *  - Should handle password typing correctly
 *  - Should call login function when login button is clicked
 *
 * */

describe('FormLogin Component Test', () => {
  it('Should handle email typing correctly', async () => {
    render(
      <FormLogin onLogin={() => { }} />,
    );

    const emailInput = screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'test@gmail.com');

    expect(emailInput).toHaveAttribute('value', 'test@gmail.com');
  });

  it('Should handle password typing correctly', async () => {
    render(<FormLogin onLogin={() => { }} />);

    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'nazir123');

    expect(passwordInput).toHaveAttribute('value', 'nazir123');
  });

  it('Should call login function when login button is clicked', async () => {
    const mockLogin = jest.fn();
    render(<FormLogin onLogin={mockLogin} />);

    const emailInput = screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'emailtest@gmail.com');

    const passwordInput = screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');

    const loginButton = screen.getByRole('button', { name: 'Masuk' });

    await userEvent.click(loginButton);

    expect(mockLogin).toBeCalledWith({
      email: 'emailtest@gmail.com',
      password: 'passwordtest',
    });
  });
});

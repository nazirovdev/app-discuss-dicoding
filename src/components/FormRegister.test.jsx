import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormRegister from './FormRegister';

/**
 *
 * - FormRegister Component Test
 *
 *  - Should handle name typing correctly
 *  - Should handle email typing correctly
 *  - Should handle password typing correctly
 *  - Should call onRegister function when Daftar button is clicked
 *
 * */

describe('FormRegister Component Test', () => {
  it('Should handle name typing correctly', async () => {
    render(<FormRegister onRegister={() => {}} />);

    const nameInput = screen.getByPlaceholderText('Nama');
    await userEvent.type(nameInput, 'testingcuy');

    expect(nameInput).toHaveAttribute('value', 'testingcuy');
  });

  it('Should handle email typing correctly', async () => {
    render(<FormRegister onRegister={() => {}} />);

    const emailInput = screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'testingcuy@gmail.com');

    expect(emailInput).toHaveAttribute('value', 'testingcuy@gmail.com');
  });

  it('Should handle password typing correctly', async () => {
    render(<FormRegister onRegister={() => {}} />);

    const passwordInput = screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'testingcuy123');

    expect(passwordInput).toHaveAttribute('value', 'testingcuy123');
  });

  it('Should call onRegister function when Daftar button is clicked', async () => {
    const mockRegister = jest.fn();

    render(<FormRegister onRegister={mockRegister} />);

    const nameInput = screen.getByPlaceholderText('Nama');
    await userEvent.type(nameInput, 'testingcuy');

    const emailInput = screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'testingcuy@gmail.com');

    const passwordInput = screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'testingcuy123');

    const registerButton = screen.getByRole('button', { name: 'Daftar' });
    await userEvent.click(registerButton);

    expect(mockRegister).toBeCalledWith({
      name: 'testingcuy',
      email: 'testingcuy@gmail.com',
      password: 'testingcuy123',
    });
  });
});

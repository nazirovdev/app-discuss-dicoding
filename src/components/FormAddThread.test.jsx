import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormAddThread from './FormAddThread';

/**
 *
 * - FormAddThread Component Test
 *
 *  - Should handle title typing correctly
 *  - Should handle category typing correctly
 *  - Should handle body typing correctly
 *  - Should call onAddThread function when create button is clicked
 *
 * */

describe('FormAddThread Component Test', () => {
  it('Should handle title typing correctly', async () => {
    render(<FormAddThread onAddThread={() => {}} />);

    const titleInput = screen.getByPlaceholderText('Judul Thread');
    await userEvent.type(titleInput, 'Ini adalah judul thread saya');

    expect(titleInput).toHaveAttribute('value', 'Ini adalah judul thread saya');
  });

  it('Should handle category typing correctly', async () => {
    render(<FormAddThread onAddThread={() => {}} />);

    const categoryInput = screen.getByPlaceholderText('Kategori Thread');
    await userEvent.type(categoryInput, 'Ini adalah kategori saya');

    expect(categoryInput).toHaveAttribute('value', 'Ini adalah kategori saya');
  });

  it('Should handle body typing correctly', async () => {
    render(<FormAddThread onAddThread={() => {}} />);

    const bodyInput = screen.getByPlaceholderText('Isi Thread');
    await userEvent.type(bodyInput, 'Ini adalah isi thread saya');

    expect(bodyInput).toContainHTML('Ini adalah isi thread saya');
  });

  it('Should call onAddThread function when create button is clicked', async () => {
    const mockOnAddThread = jest.fn();

    render(<FormAddThread onAddThread={mockOnAddThread} />);

    const titleInput = screen.getByPlaceholderText('Judul Thread');
    await userEvent.type(titleInput, 'Ini adalah judul thread saya');

    const categoryInput = screen.getByPlaceholderText('Kategori Thread');
    await userEvent.type(categoryInput, 'Ini adalah kategori saya');

    const bodyInput = screen.getByPlaceholderText('Isi Thread');
    await userEvent.type(bodyInput, 'Ini adalah isi thread saya');

    const buttonCreate = screen.getByRole('button', { name: 'Buat' });
    await userEvent.click(buttonCreate);

    expect(mockOnAddThread).toBeCalledWith({
      title: 'Ini adalah judul thread saya',
      category: 'Ini adalah kategori saya',
      body: 'Ini adalah isi thread saya',
    });
  });
});

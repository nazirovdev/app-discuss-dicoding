import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormAddComment from './FormAddComment';

/**
 *
 * - FormAddComment Component Test
 *
 *  - Should handle comment typing correctly
 *  - Should call onAddComment function when Kirim button is clicked
 *
 * */

describe('FormLogin Component Test', () => {
  it('Should handle comment typing correctly', async () => {
    render(
      <FormAddComment onAddComment={() => {}} />,
    );

    const commentInput = screen.getByPlaceholderText('Masukkan Komentar');
    await userEvent.type(commentInput, 'ini adalah komentar saya');

    expect(commentInput).toContainHTML('ini adalah komentar saya');
  });

  it('Should call onAddComment function when Kirim button is clicked', async () => {
    const mockOnAddComment = jest.fn();

    render(
      <FormAddComment onAddComment={mockOnAddComment} />,
    );

    const commentInput = screen.getByPlaceholderText('Masukkan Komentar');
    await userEvent.type(commentInput, 'ini adalah komentar saya');

    const buttonAddComment = screen.getByRole('button', { name: 'Kirim' });
    await userEvent.click(buttonAddComment);

    expect(mockOnAddComment).toBeCalledWith({ yourComment: 'ini adalah komentar saya' });
  });
});

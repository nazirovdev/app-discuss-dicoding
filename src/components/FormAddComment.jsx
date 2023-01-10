import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { Button } from './atoms/Button';

export default function FormAddComment({ onAddComment }) {
  const [yourComment, setYourComment, onResetComment] = useInput('');

  const onAddCommentHandle = (e) => {
    e.preventDefault();
    onAddComment({ yourComment });
    onResetComment();
  };

  return (
    <form className="flex flex-col gap-3 mt-5 md:mb-8">
      <textarea
        className="p-1 rounded-md ring-2 h-40 focus:outline-none mb-4"
        value={yourComment}
        onChange={setYourComment}
        placeholder="Masukkan Komentar"
      />
      <Button type="gray" onClick={onAddCommentHandle}>Kirim</Button>
    </form>
  );
}

FormAddComment.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

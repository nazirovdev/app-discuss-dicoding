import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { Button } from './atoms/Button';

export default function FormAddThread({ onAddThread }) {
  const [title, setTitle, onResetTitle] = useInput('');
  const [category, setCategory, onResetCategory] = useInput('');
  const [body, setBody, onResetBody] = useInput('');

  const onAddThreadClick = (e) => {
    e.preventDefault();

    if (title.length < 1 || title.category < 1 || body.length < 1) {
      return alert('Data harus lengkap !');
    }

    onAddThread({ title, category, body });

    onResetTitle();
    onResetCategory();
    onResetBody();
  };

  return (
    <div className="flex flex-col px-4 gap-6">
      <form className="flex flex-col gap-3 md:mb-8">
        <input className="p-1 rounded-md ring-2 focus:outline-none" placeholder="Judul Thread" value={title} onChange={setTitle} />
        <input className="p-1 rounded-md ring-2 focus:outline-none" placeholder="Kategori Thread" value={category} onChange={setCategory} />
        <textarea className="p-1 mb-4 rounded-md ring-2 h-40 focus:outline-none" placeholder="Isi Thread" value={body} onChange={setBody} />
        <Button type="green" onClick={onAddThreadClick}>Buat</Button>
      </form>
    </div>
  );
}

FormAddThread.propTypes = {
  onAddThread: PropTypes.func.isRequired,
};

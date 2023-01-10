import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormAddThread from '../components/FormAddThread';
import { asyncAddThread } from '../states/threads/action';

export default function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThreadHandle = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };

  return (
    <section className="bg-slate-50 min-h-screen mt-10">
      <h1 className="p-4 font-bold text-2xl">Tambah Threads</h1>
      <FormAddThread onAddThread={onAddThreadHandle} />
    </section>
  );
}

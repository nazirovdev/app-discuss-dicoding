import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormRegister from '../components/FormRegister';
import { asyncAddUser } from '../states/users/action';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { isRegisterReducer } = useSelector((states) => states);
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegisterReducer !== false) {
      navigate('/login');
    }
  });

  const onRegisterHandle = async ({ name, email, password }) => {
    dispatch(asyncAddUser({ name, email, password }));
  };

  return (
    <section className="bg-slate-50 min-h-screen mt-10">
      <h1 className="p-4 font-bold text-2xl text-slate-700">Register Threads</h1>
      <FormRegister onRegister={onRegisterHandle} />
    </section>
  );
}

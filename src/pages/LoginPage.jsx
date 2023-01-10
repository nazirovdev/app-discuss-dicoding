import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FormLogin from '../components/FormLogin';
import { asyncSetAuthUser } from '../states/authUser/action';
import { setRegisterActionCreator } from '../states/isRegister/action';

export default function LoginPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRegisterActionCreator(false));
  });

  const onLoginHandle = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="bg-slate-50 min-h-screen mt-10">
      <h1 className="p-4 font-bold text-2xl text-slate-700">Login Threads</h1>
      <FormLogin onLogin={onLoginHandle} />
    </section>
  );
}

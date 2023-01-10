import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { Button } from './atoms/Button';

export default function FormRegister({ onRegister }) {
  const [name, setName, onResetName] = useInput('');
  const [email, setEmail, onResetEmail] = useInput('');
  const [password, setPassword, onResetPassword] = useInput('');

  const onRegisterHandle = (e) => {
    e.preventDefault();
    onRegister({ name, email, password });

    onResetName();
    onResetEmail();
    onResetPassword();
  };
  return (
    <div className="flex flex-col px-4 gap-6">
      <form className="flex flex-col gap-3 md:mb-8">
        <input className="p-1 rounded-md ring-2 focus:outline-none" placeholder="Nama" value={name} onChange={setName} />
        <input className="p-1 rounded-md ring-2 focus:outline-none" placeholder="Email" value={email} onChange={setEmail} />
        <input className="p-1 rounded-md ring-2 focus:outline-none" placeholder="Password" type="password" value={password} onChange={setPassword} />
      </form>
      <Button type="blue" onClick={onRegisterHandle}>
        Daftar
      </Button>
    </div>
  );
}

FormRegister.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

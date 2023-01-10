import React from 'react';
import { MdError } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/atoms/Button';
import { unsetAuthUserActionCreator } from '../states/authUser/action';
import { api } from '../utils/api';

export default function UserProfile() {
  const navigate = useNavigate();
  const { authUserReducer } = useSelector((states) => states);
  const dispatch = useDispatch();

  const onLogout = () => {
    api.deleteAccessToken();
    dispatch(unsetAuthUserActionCreator());
  };

  const onLogin = () => {
    navigate('/login');
  };

  const onRegister = () => {
    navigate('/register');
  };

  return (
    <section className="bg-slate-50 min-h-screen mt-10">
      <h1 className="p-4 font-bold text-2xl text-slate-700">User Profile</h1>
      <div className="flex flex-col items-center px-4 gap-4 mt-6">
        <div className="flex flex-col items-center gap-2">
          {
              authUserReducer === null ? (
                <>
                  <h2 className="font-bold text-3xl text-slate-700">Anda Belum Login</h2>
                  <MdError size="200" color="#fa4639" />
                </>
              ) : (
                <>
                  <div className="w-24 h-24 rounded-full bg-slate-600 overflow-hidden">
                    <img className="w-full h-full" src={authUserReducer.avatar} alt={authUserReducer.name} />
                  </div>
                  <h2 className="font-bold text-lg text-slate-700">{authUserReducer.name}</h2>
                  <h3 className="text-sm text-slate-700">{authUserReducer.email}</h3>
                </>
              )
            }
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          {
              authUserReducer === null ? (
                <>
                  <Button type="green" onClick={onLogin}>
                    Login
                  </Button>
                  <Button type="blue" onClick={onRegister}>
                    Register
                  </Button>
                </>
              ) : (
                <Button type="red" onClick={onLogout}>
                  Logout
                </Button>
              )
            }
        </div>
      </div>
    </section>
  );
}

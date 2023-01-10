import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../utils/api';
import { setRegisterActionCreator } from '../isRegister/action';

const ActionType = {
  GET_USERS: 'users/GET',
};

const receiveUsersActionCreator = (users) => ({
  type: ActionType.GET_USERS,
  payload: {
    users,
  },
});

const asyncAddUser = ({ name, email, password }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.register({ name, email, password });
    dispatch(setRegisterActionCreator(true));
  } catch (error) {
    alert(error.message);
    dispatch(setRegisterActionCreator(false));
  }
  dispatch(hideLoading());
};

export { ActionType, receiveUsersActionCreator, asyncAddUser };

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  api,
} from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'authUser/SET',
  UNSET_AUTH_USER: 'authUser/UNSET',
};

const setAuthUserActionCreator = (authUser) => ({
  type: ActionType.SET_AUTH_USER,
  payload: {
    authUser,
  },
});

const unsetAuthUserActionCreator = () => ({
  type: ActionType.UNSET_AUTH_USER,
  payload: {
    authUser: null,
  },
});

const asyncSetAuthUser = ({ email, password }) => async (dispatch) => {
  dispatch(showLoading());

  try {
    const token = await api.login({ email, password });
    api.putAccessToken(token);

    const authUser = await api.getOwnProfile();
    dispatch(setAuthUserActionCreator(authUser));
  } catch (error) {
    alert(error.message);
  }

  dispatch(hideLoading());
};

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
};

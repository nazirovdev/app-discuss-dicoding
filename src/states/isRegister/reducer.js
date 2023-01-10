import { ActionType } from './action';

const isRegisterReducer = (isRegister = false, action = {}) => {
  switch (action.type) {
    case ActionType.SET_IS_REGISTER:
      return action.payload.isRegister;
    default:
      return isRegister;
  }
};

export default isRegisterReducer;

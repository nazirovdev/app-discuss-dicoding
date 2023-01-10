const ActionType = {
  SET_IS_REGISTER: 'isRegister/SET',
};

const setRegisterActionCreator = (isRegister) => ({
  type: ActionType.SET_IS_REGISTER,
  payload: {
    isRegister,
  },
});

export { ActionType, setRegisterActionCreator };

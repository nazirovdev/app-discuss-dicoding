/**
 *
 * test scenario for isRegisterReducer
 *
 * - isRegisterReducer reducer
 *
 *  - should return initialState when given by unknown action
 *  - should return true when given by SET_IS_REGISTER action with payload isRegister true
 *  - should return false when given by SET_IS_REGISTER action with payload isRegister false
 * */

import { ActionType } from './action';
import isRegisterReducer from './reducer';

describe('test scenario for isRegisterReducer', () => {
  it('should return initialState when given by unknown action', () => {
    const initialState = false;

    const action = {
      type: 'unknown',
    };

    const nextState = isRegisterReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return true when given by SET_IS_REGISTER action with payload isRegister true', () => {
    const initialState = false;

    const action = {
      type: ActionType.SET_IS_REGISTER,
      payload: {
        isRegister: true,
      },
    };

    const nextState = isRegisterReducer(initialState, action);
    expect(nextState).toEqual(true);
  });

  it('should return false when given by SET_IS_REGISTER action with payload isRegister false', () => {
    const initialState = false;

    const action = {
      type: ActionType.SET_IS_REGISTER,
      payload: {
        isRegister: false,
      },
    };

    const nextState = isRegisterReducer(initialState, action);
    expect(nextState).toEqual(false);
  });
});

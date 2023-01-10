/**
 *
 * test scenario for asyncAddUser
 *
 * - asyncAddUser thunk
 *
 *  - should dispatch action correctly when register data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../utils/api';
import { setRegisterActionCreator } from '../isRegister/action';
import { asyncAddUser } from './action';

const fakeErrorMessage = new Error('email is already taken');

describe('asyncAddUser thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api.register = api._register;

    delete api._register;
  });

  it('should dispatch action correctly when register data fetching success', async () => {
    const dispatch = jest.fn();
    api.register = () => Promise.resolve({});

    await asyncAddUser({ name: 'John Doe', email: 'john@example.com', password: 'testingx' })(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setRegisterActionCreator(true));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    api.register = () => Promise.reject(fakeErrorMessage);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncAddUser({ name: 'testing4', email: 'testing@gmail4.com', password: 'testing4' })(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setRegisterActionCreator(false));
    expect(window.alert).toHaveBeenCalledWith(fakeErrorMessage.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

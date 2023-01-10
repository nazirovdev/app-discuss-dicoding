/**
 *
 * test scenario for asyncSetAuthUser
 *
 * - asyncSetAuthUser thunk function
 *
 *  - should dispatch action correctly when login successfully
 *  - should dispatch action correctly and call alert when login failed
 * */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../utils/api';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';

describe('test scenario for asyncSetAuthUser', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;

    delete api._login;
    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when login successfully', async () => {
    const fakeAuthUserResponse = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };

    const fakeTokenResponse = '12345678';

    const fakePayload = {
      email: 'john@example.com',
      password: '12345',
    };

    api.login = () => Promise.resolve(fakeTokenResponse);
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);

    const dispatch = jest.fn();

    await asyncSetAuthUser({ email: fakePayload.email, password: fakePayload.password })(dispatch);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(setAuthUserActionCreator(fakeAuthUserResponse));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch action correctly and call alert when login failed', async () => {
    const fakeErrorResponse = new Error('Ups, Something went wrong!');

    const fakePayload = {
      email: 'john@example.com',
      password: '12345',
    };

    api.login = () => Promise.reject(fakeErrorResponse);
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncSetAuthUser({ email: fakePayload.email, password: fakePayload.password })(dispatch);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(window.alert).toBeCalledWith(fakeErrorResponse.message);
    expect(dispatch).toBeCalledWith(hideLoading());
  });
});

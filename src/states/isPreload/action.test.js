/**
 *
 * test scenario for asyncSetIsPreload
 *
 * - asyncSetIsPreload thunk function
 *
 *  - should dispatch setAuthUser when fetching data success
 *  - should dispatch setAuthUser when fetching data failed
 *
 * */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';
import { asyncSetIsPreload, setIsPreloadActionCreator } from './action';

describe('test scenario for asyncSetIsPreload', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;

    delete api._getOwnProfile;
  });

  it('should dispatch setAuthUser when fetching data success', async () => {
    const fakeAuthUser = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };

    api.getOwnProfile = () => Promise.resolve(fakeAuthUser);

    const dispatch = jest.fn();

    await asyncSetIsPreload()(dispatch);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(setAuthUserActionCreator(fakeAuthUser));
    expect(dispatch).toBeCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch setAuthUser when fetching data failed', async () => {
    const fakeAuthUser = null;

    api.getOwnProfile = () => Promise.resolve(fakeAuthUser);

    const dispatch = jest.fn();

    await asyncSetIsPreload()(dispatch);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(setAuthUserActionCreator(fakeAuthUser));
    expect(dispatch).toBeCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toBeCalledWith(hideLoading());
  });
});

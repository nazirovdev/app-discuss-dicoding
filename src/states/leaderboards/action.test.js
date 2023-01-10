/**
 *
 * test scenario for asyncReceiveLeaderboards
 *
 * asyncReceiveLeaderboards thunk function
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert when data fetching failed
 * */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../utils/api';
import { asyncReceiveLeaderboards, receiveLeaderboardsActionCreator } from './action';

describe('test scenario for asyncReceiveLeaderboards', () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;

    delete api._getLeaderboards;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    const fakeLeaderboards = [
      {
        user: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 10,
      },
      {
        user: {
          id: 'users-2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 5,
      },
    ];

    api.getLeaderboards = () => Promise.resolve(fakeLeaderboards);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncReceiveLeaderboards()(dispatch);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(receiveLeaderboardsActionCreator(fakeLeaderboards));
    expect(dispatch).toBeCalledWith(hideLoading());
  });
});

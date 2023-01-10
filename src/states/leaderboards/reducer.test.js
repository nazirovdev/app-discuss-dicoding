/**
 *
 * test scenario leaderboardsReducer
 *
 * - leaderboardsReducer function
 *  - should return initial state when given by action action unknown
 *  - should return leaderboards when given by GET_LEADERBOARDS
 * */

import { ActionType } from './action';
import leaderboardsReducer from './reducer';

describe('test scenario leaderboardsReducer', () => {
  it('should return initial state when given by action action unknown', () => {
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return leaderboards when given by GET_LEADERBOARDS', () => {
    const initialState = [];
    const action = {
      type: ActionType.GET_LEADERBOARDS,
      payload: {
        leaderboards: [
          {
            user: {
              id: 'users-1',
              name: 'John Doe',
              email: 'john@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 10,
          },
        ],
      },
    };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.leaderboards);
  });
});

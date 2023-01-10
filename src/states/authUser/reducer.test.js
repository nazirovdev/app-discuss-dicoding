/**
 *
 * test for scenario authUserReducer
 *
 * - authUserReducer function
 *
 *  - should return initialState when given by unknown action
 *  - should return object authUser when given by SET_AUTH_USER
 *  - should return object authUser when given by UNSET_AUTH_USER
 * */

import { ActionType } from './action';
import authUserReducer from './reducer';

describe('test for scenario authUserReducer', () => {
  it('should return initialState when given by unknown action', () => {
    const initialState = null;
    const action = {
      type: 'unknown',
    };

    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return object authUser when given by SET_AUTH_USER', () => {
    const initialState = null;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };

    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should return object authUser when given by UNSET_AUTH_USER', () => {
    const initialState = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };

    const action = {
      type: ActionType.UNSET_AUTH_USER,
      payload: {
        authUser: null,
      },
    };

    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(action.payload.authUser);
  });
});

/**
 *
 * test scenario usersReducer
 *
 * - usersReducer function
 *  - should return initialState when given by unknown action
 *  - should return users when given by GET_USERS action
 *
 * */

import { ActionType } from './action';
import usersReducer from './reducer';

describe('usersReducer function', () => {
  it('should return initialState when given by unknown action', () => {
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return users when given by GET_USERS action', () => {
    const initialState = [];
    const action = {
      type: ActionType.GET_USERS,
      payload: {
        users: [
          {
            id: 'john_doe',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          {
            id: 'jane_doe',
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          {
            id: 'fulan',
            name: 'Si Fulan',
            email: 'fulan@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
        ],
      },
    };

    const nextState = usersReducer(initialState, action);
    expect(nextState).toEqual(action.payload.users);
  });
});

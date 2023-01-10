import { ActionType } from './action';
import threadsReducer from './reducer';

/**
 *
 * test scenario for threadsReducer
 *
 * - threadsReducer function
 *  - should return initial state when given by unknown action
 *  - should return the threads when givev by GET_THREADS action
 *  - should return the threads with the new thread when given by ADD_THREAD action
 *  - should return the threads with the toggled upVote thread when given by TOGGLE_UP_VOTE_THREAD
 *  - should return the threads with the toggled downVote thread when given by TOGGLE_DOWN_VOTE_THREAD
 */

describe('threadsReducer function', () => {
  it('should return initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by GET_THREADS action', () => {
    const initialState = [];

    const action = {
      type: ActionType.GET_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread Kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with new thread when given ADD_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread Kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: {
          id: 'thread-3',
          title: 'Thread Ketiga',
          body: 'Ini adalah thread Ketiga',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-3',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the threads with toggled upVote thread when given by TOGGLE_UP_VOTE_THREAD', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: ActionType.TOGGLE_UP_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([{ ...initialState[0], upVotesBy: [action.payload.userId] }]);
  });

  it('should return the threads with the toggled downVote thread when given by TOGGLE_DOWN_VOTE_THREAD', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([{ ...initialState[0], downVotesBy: [action.payload.userId] }]);
  });
});

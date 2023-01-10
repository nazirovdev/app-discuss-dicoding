/**
 *
 * test scenario for detailThreadReducer
 *
 * - detailThreadReducer function
 *
 *  - should return initialState when given by unknown action
 *  - should return detailThread when given by RECEIVE_DETAIL_THREAD action
 *  - should return null when given by UNSET_DETAIL_THREAD action
 *  - should return detailThread when given by TOGGLE_VOTE_UP_THREAD action
 *  - should return detailThread when given by TOGGLE_VOTE_DOWN_THREAD action
 *  - should return detailThread when given by ADD_COMMENT_THREAD action
 *  - should return detailThread when given by TOGGLE_VOTE_UP_COMMENT_THREAD action
 *  - should return detailThread when given by TOGGLE_VOTE_DOWN_COMMENT_THREAD action
 *
 * */

import { ActionType } from './action';
import detailThreadReducer from './reducer';

describe('test scenario for detailThreadReducer', () => {
  it('should return initialState when given by unknown action', () => {
    const initialState = null;
    const action = {
      type: 'UNKNOWN',
    };

    const nextState = detailThreadReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return detailThread when given by RECEIVE_DETAIL_THREAD action', () => {
    const initialState = null;
    const action = {
      type: ActionType.RECEIVE_DETAIL_THREAD,
      payload: {
        thread: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [
            {
              id: 'comment-1',
              content: 'Ini adalah komentar pertama',
              createdAt: '2021-06-21T07:00:00.000Z',
              owner: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg',
              },
              upVotesBy: [],
              downVotesBy: [],
            },
          ],
        },
      },
    };

    const nextState = detailThreadReducer(initialState, action);
    expect(nextState).toEqual(action.payload.thread);
  });

  it('should return null when given by UNSET_DETAIL_THREAD action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: ActionType.UNSET_DETAIL_THREAD,
      payload: {
        thread: null,
      },
    };

    const nextState = detailThreadReducer(initialState, action);
    expect(nextState).toEqual(action.payload.thread);
  });

  it('should return detailThread when given by TOGGLE_VOTE_UP_THREAD action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: ActionType.TOGGLE_VOTE_UP_THREAD,
      payload: {
        userId: 'users-2',
      },
    };

    const nextState = detailThreadReducer(initialState, action);
    expect(nextState).toEqual({ ...initialState, upVotesBy: [action.payload.userId] });
  });

  it('should return detailThread when given by TOGGLE_VOTE_DOWN_THREAD action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: ActionType.TOGGLE_VOTE_DOWN_THREAD,
      payload: {
        userId: 'users-2',
      },
    };

    const nextState = detailThreadReducer(initialState, action);
    expect(nextState).toEqual({ ...initialState, downVotesBy: [action.payload.userId] });
  });

  it('should return detailThread when given by ADD_COMMENT_THREAD action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: ActionType.ADD_COMMENT_THREAD,
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-2',
            name: 'Nazir Azhari',
            email: 'nazirazhari@example.com',
          },
        },
      },
    };

    const nextState = detailThreadReducer(initialState, action);
    expect(nextState).toEqual({ ...initialState, comments: [action.payload.comment] });
  });

  it('should return detailThread when given by TOGGLE_VOTE_UP_COMMENT_THREAD action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: ActionType.TOGGLE_VOTE_UP_COMMENT_THREAD,
      payload: {
        commentId: 'comment-1',
        authUser: 'users-2',
      },
    };

    const nextState = detailThreadReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState, comments: [{ ...initialState.comments[0], upVotesBy: [action.payload.authUser] }],
    });
  });

  it('should return detailThread when given by TOGGLE_VOTE_DOWN_COMMENT_THREAD action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: ActionType.TOGGLE_VOTE_DOWN_COMMENT_THREAD,
      payload: {
        commentId: 'comment-1',
        authUser: 'users-2',
      },
    };

    const nextState = detailThreadReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState, comments: [{ ...initialState.comments[0], downVotesBy: [action.payload.authUser] }],
    });
  });
});

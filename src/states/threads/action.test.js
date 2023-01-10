/**
 *
 * test scenario for Thread Thunk Action
 *
 * - should dispatch action correctly when add thread fetching success
 * - should dispatch action and call alert when add thread fetching failed
 * - should dispatch action correctly when toggleUpVote thread fetching success
 * - should dispatch action correctly when toggleDownVote thread fetching success
 * */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../utils/api';
import {
  addThreadActionCreator, asyncAddThread, asyncToggleDownvote, asyncToggleUpvote, toggleDownVoteActionCreator, toggleUpVoteActionCreator,
} from './action';

describe('test scenario for Thread Thunk Action', () => {
  beforeEach(() => {
    api._addThread = api.addThread;
    api._upVote = api.upVote;
    api._downVote = api.downVote;
  });

  afterEach(() => {
    api.addThread = api._addThread;
    api.upVote = api._upVote;
    api.downVote = api._downVote;

    delete api._addThread;
    delete api._upVote;
    delete api._downVote;
  });

  it('should dispatch action correctly when add thread fetching success', async () => {
    const fakeThread = {
      id: 'thread-1x',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };

    api.addThread = () => Promise.resolve(fakeThread);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncAddThread({})(dispatch);
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(addThreadActionCreator(fakeThread));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch action and call alert when add thread fetching failed', async () => {
    const fakeError = new Error('Ups something went wrong : (');

    api.addThread = () => Promise.reject(fakeError);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncAddThread({})(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when toggleUpVote thread fetching success', async () => {
    const mockState = {
      authUserReducer: {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      threadsReducer: [
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
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    };

    api.upVote = () => Promise.resolve({ threadId: 'thread-1' });
    api.downVote = () => Promise.resolve({ threadId: 'thread-1' });

    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(mockState);

    await asyncToggleUpvote('thread-1')(dispatch, getState);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(toggleUpVoteActionCreator({ threadId: 'thread-1', userId: 'john_doe' }));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch action correctly when toggleDownVote thread fetching success', async () => {
    const mockState = {
      authUserReducer: {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      threadsReducer: [
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
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    };

    api.upVote = () => Promise.resolve({ threadId: 'thread-1' });
    api.downVote = () => Promise.resolve({ threadId: 'thread-1' });

    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(mockState);

    await asyncToggleDownvote('thread-1')(dispatch, getState);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(toggleDownVoteActionCreator({ threadId: 'thread-1', userId: 'john_doe' }));
    expect(dispatch).toBeCalledWith(hideLoading());
  });
});

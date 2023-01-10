import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../utils/api';
import { receiveCategoryActionCreator } from '../category/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import asyncPopulatedThreadsAndUsers from './action';

/**
 *
 * Skenario Test
 *
 * - asyncPopulatedThreadsAndUsers thunk
 *
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * */
const fakeThreadsResponse = [
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

const fakeUsersResponse = [
  {
    id: 'users-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeCategoryResponse = ['General'];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulatedThreadAndUser thunk', () => {
  beforeEach(() => {
    api._getThreads = api.getThreads;
    api._getUsers = api.getUsers;
  });

  afterEach(() => {
    api.getThreads = api._getThreads;
    api.getUsers = api._getUsers;

    delete api._getThreads;
    delete api._getUsers;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub
    api.getThreads = () => Promise.resolve(fakeThreadsResponse);
    api.getUsers = () => Promise.resolve(fakeUsersResponse);

    // mock
    const dispatch = jest.fn();

    // action
    await asyncPopulatedThreadsAndUsers()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveCategoryActionCreator(fakeCategoryResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    api.getThreads = () => Promise.reject(fakeErrorResponse);
    api.getUsers = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncPopulatedThreadsAndUsers()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

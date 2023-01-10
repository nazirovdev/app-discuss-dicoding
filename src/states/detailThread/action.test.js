/**
 *
 * test scenario for detail thread
 *
 * - asyncReceiveDetailThread thunk function
 *
 *  - should dispatch action correctly when receive detail data thread success
 *  - should dispatch action correctly and call alert when receive detail data thread failed
 *
 * - asyncToggleUpVoteDetailThread thunk function
 *
 *  - should dispatch action correctly when toggle upVote detail data thread success
 *  - should dispatch action correctly and call alert when authUser is null in toggleUpVote
 *
 * - asyncToggleDownVoteDetailThread thunk function
 *
 *  - should dispatch action correctly when toggle downVote detail data thread success
 *  - should dispatch action correctly and call alert when authUser is null in toggleDownVote
 *
 * - asyncAddCommentThreadDetail thunk function
 *
 *  - should dispatch action correctly when add comment detail data thread success
 *  - should dispatch action correctly and call alert when add comment detail data thread failed
 *
 * - asyncToggleUpCommentThreadDetail thunk function
 *
 *  - should dispatch action correctly when toggle upVote comment detail data thread success
 *  - should dispatch action correctly and call alert when toggle upVote comment detail data thread failed
 *
 * - asyncToggleDownCommentThreadDetail
 *
 *  - should dispatch action correctly when toggle downVote comment detail data thread success
 *  - should dispatch action correctly and call alert when toggle downVote comment detail data thread failed
 * */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../utils/api';
import {
  addCommentThreadDetail,
  asyncAddCommentThreadDetail,
  asyncReceiveDetailThread,
  asyncToggleDownCommentThreadDetail,
  asyncToggleDownVoteDetailThread,
  asyncToggleUpCommentThreadDetail,
  asyncToggleUpVoteDetailThread,
  receiveDetailThreadActionCreator,
  toggleVoteDownCommentThreadDetail,
  toggleVoteDownThreadDetail,
  toggleVoteUpCommentThreadDetail,
  toggleVoteUpThreadDetail,
} from './action';

describe('test scenario for detail thread', () => {
  beforeEach(() => {
    api._detailThread = api.detailThread;
    api._upVote = api.upVote;
    api._downVote = api.downVote;
    api._addComment = api.addComment;
    api._upVoteComment = api.upVoteComment;
    api._netralVoteComment = api.netralVoteComment;
    api._downVoteComment = api.downVoteComment;
  });

  afterEach(() => {
    api.detailThread = api._detailThread;
    api.upVote = api._upVote;
    api.downVote = api._downVote;
    api.addComment = api._addComment;
    api.upVoteComment = api._upVoteComment;
    api.netralVoteComment = api._netralVoteComment;
    api.downVoteComment = api._downVoteComment;

    delete api._detailThread;
    delete api._upVote;
    delete api._downVote;
    delete api._addComment;
    delete api._upVoteComment;
    delete api._netralVoteComment;
    delete api._downVoteComment;
  });

  it('should dispatch action correctly when receive detail data thread success', async () => {
    const fakeDetailThread = {
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

    api.detailThread = () => Promise.resolve(fakeDetailThread);

    const dispatch = jest.fn();

    await asyncReceiveDetailThread({ idThread: 'thread-1' })(dispatch);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(receiveDetailThreadActionCreator({ thread: fakeDetailThread }));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch action correctly and call alert when receive detail data thread failed', async () => {
    const fakeDetailThread = new Error('Ups, Something wen wrong !');

    api.detailThread = () => Promise.reject(fakeDetailThread);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncReceiveDetailThread({})(dispatch);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(window.alert).toBeCalledWith(fakeDetailThread.message);
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch action correctly when toggle upVote detail data thread success', async () => {
    const fakeThreadId = {
      threadId: 'thread-1',
    };

    api.upVote = () => Promise.resolve({
      id: 'vote-1',
      userId: 'users-1',
      threadId: 'thread-1',
      voteType: 1,
    });

    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue({
      authUserReducer: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      detailThreadReducer: {
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
    });

    await asyncToggleUpVoteDetailThread({ idThread: fakeThreadId.threadId })(dispatch, getState);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(toggleVoteUpThreadDetail({ userId: 'users-1' }));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch action correctly and call alert when authUser is null in toggleUpVote', async () => {
    const fakeThreadId = {
      threadId: 'thread-1',
    };

    const fakeError = new Error('Ups, Something went wrong');

    api.upVote = () => Promise.reject(fakeError);

    const dispatch = jest.fn();
    window.alert = jest.fn();
    const getState = jest.fn().mockReturnValue({
      authUserReducer: null,
      detailThreadReducer: {
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
    });

    await asyncToggleUpVoteDetailThread({ idThread: fakeThreadId.threadId })(dispatch, getState);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(window.alert).toBeCalled();
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch action correctly when toggle downVote detail data thread success', async () => {
    const fakeThreadId = {
      threadId: 'thread-1',
    };

    api.downVote = () => Promise.resolve({
      id: 'vote-1',
      userId: 'users-1',
      threadId: 'thread-1',
      voteType: 1,
    });

    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue({
      authUserReducer: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      detailThreadReducer: {
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
    });

    await asyncToggleDownVoteDetailThread({ idThread: fakeThreadId.threadId })(dispatch, getState);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(toggleVoteDownThreadDetail({ userId: 'users-1' }));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch action correctly and call alert when authUser is null in toggleDownVote', async () => {
    const fakeThreadId = {
      threadId: 'thread-1',
    };

    const fakeError = new Error('Ups, Something went wrong');

    api.downVote = () => Promise.reject(fakeError);

    const dispatch = jest.fn();
    window.alert = jest.fn();
    const getState = jest.fn().mockReturnValue({
      authUserReducer: null,
      detailThreadReducer: {
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
    });

    await asyncToggleDownVoteDetailThread({ idThread: fakeThreadId.threadId })(dispatch, getState);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(window.alert).toBeCalled();
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch action correctly when add comment detail data thread success', async () => {
    const fakeComment = {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      upVotesBy: [],
      downVotesBy: [],
      owner: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
      },
    };

    const stateValue = {
      authUserReducer: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    };

    api.addComment = () => Promise.resolve(fakeComment);

    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(stateValue);

    await asyncAddCommentThreadDetail({ threadId: fakeComment.id, content: fakeComment.content })(dispatch, getState);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(addCommentThreadDetail(fakeComment));
    expect(dispatch).toBeCalledWith(showLoading());
  });

  it('should dispatch action correctly and call alert when add comment detail data thread failed', async () => {
    const fakeComment = {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      upVotesBy: [],
      downVotesBy: [],
      owner: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
      },
    };

    const fakeError = new Error('Ups, Something went wrong');

    const stateValue = {
      authUserReducer: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    };

    api.addComment = () => Promise.reject(fakeError);

    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(stateValue);
    window.alert = jest.fn();

    await asyncAddCommentThreadDetail({ threadId: fakeComment.id, content: fakeComment.content })(dispatch, getState);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(window.alert).toBeCalledWith(fakeError.message);
    expect(dispatch).toBeCalledWith(showLoading());
  });

  it('should dispatch action correctly when toggle upVote comment detail data thread success', async () => {
    const fakeDataPayload = {
      authUserId: 'users-1',
      threadId: 'thread-1',
      commentId: 'comment-1',
    };

    const fakeResponseVote = {
      id: 'vote-1',
      userId: 'users-1',
      commentId: 'comment-1',
      voteType: 1,
    };

    const fakeState = {
      authUserReducer: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      detailThreadReducer: {
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
    };

    api.upVoteComment = () => Promise.resolve(fakeResponseVote);
    api.netralVoteComment = () => Promise.resolve(fakeResponseVote);

    const dispatch = jest.fn();
    const state = jest.fn().mockReturnValue(fakeState);

    await asyncToggleUpCommentThreadDetail({
      idThread: fakeDataPayload.threadId, commentId: fakeDataPayload.commentId,
    })(dispatch, state);

    expect(dispatch).toBeCalledWith(showLoading());

    expect(dispatch).toBeCalledWith(toggleVoteUpCommentThreadDetail({
      threadId: fakeDataPayload.threadId, commentId: fakeDataPayload.commentId, authUser: fakeDataPayload.authUserId,
    }));

    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch action correctly and call alert when toggle upVote comment detail data thread failed', async () => {
    const fakeDataPayload = {
      authUserId: 'users-1',
      threadId: 'thread-1',
      commentId: 'comment-1',
    };

    const fakeResponseVote = {
      id: 'vote-1',
      userId: 'users-1',
      commentId: 'comment-1',
      voteType: 1,
    };

    const fakeState = {
      authUserReducer: null,
      detailThreadReducer: {
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
    };

    const fakeErrorMessage = new Error('Anda harus login!');

    api.upVoteComment = () => Promise.resolve(fakeResponseVote);
    api.netralVoteComment = () => Promise.resolve(fakeResponseVote);

    const dispatch = jest.fn();
    const state = jest.fn().mockReturnValue(fakeState);
    window.alert = jest.fn();

    await asyncToggleUpCommentThreadDetail({
      idThread: fakeDataPayload.threadId, commentId: fakeDataPayload.commentId,
    })(dispatch, state);

    expect(dispatch).toBeCalledWith(showLoading());

    expect(window.alert).toBeCalledWith(fakeErrorMessage.message);

    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch action correctly when toggle downVote comment detail data thread success', async () => {
    const fakeDataPayload = {
      authUserId: 'users-1',
      threadId: 'thread-1',
      commentId: 'comment-1',
    };

    const fakeResponseVote = {
      id: 'vote-1',
      userId: 'users-1',
      commentId: 'comment-1',
      voteType: 1,
    };

    const fakeState = {
      authUserReducer: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      detailThreadReducer: {
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
    };

    api.downVoteComment = () => Promise.resolve(fakeResponseVote);
    api.netralVoteComment = () => Promise.resolve(fakeResponseVote);

    const dispatch = jest.fn();
    const state = jest.fn().mockReturnValue(fakeState);

    await asyncToggleDownCommentThreadDetail({
      idThread: fakeDataPayload.threadId, commentId: fakeDataPayload.commentId,
    })(dispatch, state);

    expect(dispatch).toBeCalledWith(showLoading());

    expect(dispatch).toBeCalledWith(toggleVoteDownCommentThreadDetail({
      threadId: fakeDataPayload.threadId, commentId: fakeDataPayload.commentId, authUser: fakeDataPayload.authUserId,
    }));

    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch action correctly and call alert when toggle downVote comment detail data thread failed', async () => {
    const fakeDataPayload = {
      authUserId: 'users-1',
      threadId: 'thread-1',
      commentId: 'comment-1',
    };

    const fakeResponseVote = {
      id: 'vote-1',
      userId: 'users-1',
      commentId: 'comment-1',
      voteType: 1,
    };

    const fakeState = {
      authUserReducer: null,
      detailThreadReducer: {
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
    };

    const fakeErrorMessage = new Error('Anda harus login!');

    api.downVoteComment = () => Promise.resolve(fakeResponseVote);
    api.netralVoteComment = () => Promise.resolve(fakeResponseVote);

    const dispatch = jest.fn();
    const state = jest.fn().mockReturnValue(fakeState);
    window.alert = jest.fn();

    await asyncToggleDownCommentThreadDetail({
      idThread: fakeDataPayload.threadId, commentId: fakeDataPayload.commentId,
    })(dispatch, state);

    expect(dispatch).toBeCalledWith(showLoading());

    expect(window.alert).toBeCalledWith(fakeErrorMessage.message);

    expect(dispatch).toBeCalledWith(hideLoading());
  });
});

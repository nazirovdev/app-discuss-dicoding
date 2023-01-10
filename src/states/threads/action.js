import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  api,
} from '../../utils/api';

const ActionType = {
  GET_THREADS: 'threads/RECEIVE',
  ADD_THREAD: 'threads/ADD',
  TOGGLE_UP_VOTE_THREAD: 'threads/TOGGLE_UP_VOTE',
  TOGGLE_DOWN_VOTE_THREAD: 'threads/TOGGLE_DOWN_VOTE',
};

const receiveThreadsActionCreator = (threads) => ({
  type: ActionType.GET_THREADS,
  payload: {
    threads,
  },
});

const addThreadActionCreator = (thread) => ({
  type: ActionType.ADD_THREAD,
  payload: {
    thread,
  },
});

const toggleUpVoteActionCreator = ({ threadId, userId }) => ({
  type: ActionType.TOGGLE_UP_VOTE_THREAD,
  payload: {
    threadId, userId,
  },
});

const asyncToggleUpvote = (threadId) => async (dispatch, state) => {
  const { authUserReducer, threadsReducer } = state();
  dispatch(showLoading());

  try {
    if (authUserReducer === null) {
      throw new Error('Anda harus login !');
    } else {
      const userId = authUserReducer?.id;

      dispatch(toggleUpVoteActionCreator({ threadId, userId }));
      const toggleUpNetralVote = threadsReducer.find((thread) => thread.id === threadId);

      if (!toggleUpNetralVote.upVotesBy.includes(userId)) {
        await api.upVote({ threadId });
      } else {
        await api.netralVote({ threadId });
      }
    }
  } catch (error) {
    alert(error.message);
  }

  dispatch(hideLoading());
};

const toggleDownVoteActionCreator = ({ threadId, userId }) => ({
  type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
  payload: {
    threadId, userId,
  },
});

const asyncToggleDownvote = (threadId) => async (dispatch, state) => {
  const { authUserReducer, threadsReducer } = state();

  dispatch(showLoading());

  try {
    if (authUserReducer === null) {
      throw new Error('Anda harus Login');
    } else {
      const userId = authUserReducer?.id;

      dispatch(toggleDownVoteActionCreator({ threadId, userId }));

      const toggleDownNetralVote = threadsReducer.find((thread) => thread.id === threadId);

      if (!toggleDownNetralVote.downVotesBy.includes(userId)) {
        await api.downVote({ threadId });
      } else {
        await api.netralVote({ threadId });
      }
    }
  } catch (error) {
    alert(error.message);
  }
  dispatch(hideLoading());
};

const asyncAddThread = ({ title, body, category }) => async (dispatch) => {
  dispatch(showLoading());

  try {
    const thread = await api.addThread({ title, body, category });
    dispatch(addThreadActionCreator(thread));
  } catch (error) {
    alert(error.message);
  }
  dispatch(hideLoading());
};

export {
  ActionType,
  receiveThreadsActionCreator,
  asyncAddThread,
  asyncToggleUpvote,
  toggleDownVoteActionCreator,
  asyncToggleDownvote,
  addThreadActionCreator,
  toggleUpVoteActionCreator,
};

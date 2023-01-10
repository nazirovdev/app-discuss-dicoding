import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  api,
} from '../../utils/api';

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'detailThread/RECEIVE',
  UNSET_DETAIL_THREAD: 'detailThread/UNSET',
  TOGGLE_VOTE_UP_THREAD: 'detailThread/TOGGLE_UP_VOTE',
  TOGGLE_VOTE_DOWN_THREAD: 'detailThread/TOGGLE_DOWN_VOTE',
  RECEIVE_COMMENT_THREAD: 'detailThread/RECEIVE_COMMENT',
  ADD_COMMENT_THREAD: 'detailThread/ADD_COMMENT',
  TOGGLE_VOTE_UP_COMMENT_THREAD: 'detailThread/TOGGLE_UP_VOTE_COMMENT',
  TOGGLE_VOTE_DOWN_COMMENT_THREAD: 'detailThread/TOGGLE_DOWN_VOTE_COMMENT',
};

const receiveDetailThreadActionCreator = ({ thread }) => ({
  type: ActionType.RECEIVE_DETAIL_THREAD,
  payload: {
    thread,
  },
});

const unsetDetailThreadActionCreator = () => ({
  type: ActionType.UNSET_DETAIL_THREAD,
  payload: {
    thread: null,
  },
});

const asyncReceiveDetailThread = ({ idThread }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const thread = await api.detailThread({ threadId: idThread });
    dispatch(receiveDetailThreadActionCreator({ thread }));
  } catch (error) {
    alert(error.message);
  }
  dispatch(hideLoading());
};

const toggleVoteUpThreadDetail = ({ userId }) => ({
  type: ActionType.TOGGLE_VOTE_UP_THREAD,
  payload: {
    userId,
  },
});

const asyncToggleUpVoteDetailThread = ({ idThread }) => async (dispatch, state) => {
  const { authUserReducer, detailThreadReducer } = state();
  dispatch(showLoading());

  try {
    if (authUserReducer === null) {
      throw new Error('Anda harus login !');
    } else {
      const authUserId = authUserReducer?.id;

      dispatch(toggleVoteUpThreadDetail({ userId: authUserId }));
      const filterThreadUpvotes = detailThreadReducer.upVotesBy.includes(authUserId);

      if (!filterThreadUpvotes) {
        await api.upVote({ threadId: idThread });
      } else {
        await api.netralVote({ threadId: idThread });
      }
    }
  } catch (error) {
    alert(error.message);
  }
  dispatch(hideLoading());
};

const toggleVoteDownThreadDetail = ({ userId }) => ({
  type: ActionType.TOGGLE_VOTE_DOWN_THREAD,
  payload: {
    userId,
  },
});

const asyncToggleDownVoteDetailThread = ({ idThread }) => async (dispatch, state) => {
  const { authUserReducer, detailThreadReducer } = state();

  dispatch(showLoading());
  try {
    if (authUserReducer === null) {
      throw new Error('Anda harus login !');
    } else {
      const authUserId = authUserReducer?.id;

      dispatch(toggleVoteDownThreadDetail({ userId: authUserId }));
      const filterThreadDownvotes = detailThreadReducer.downVotesBy.includes(authUserId);

      if (!filterThreadDownvotes) {
        await api.downVote({ threadId: idThread });
      } else {
        await api.netralVote({ threadId: idThread });
      }
    }
  } catch (error) {
    alert(error.message);
  }
  dispatch(hideLoading());
};

const addCommentThreadDetail = (comment) => ({
  type: ActionType.ADD_COMMENT_THREAD,
  payload: {
    comment,
  },
});

const asyncAddCommentThreadDetail = ({ threadId, content }) => async (dispatch, state) => {
  const { authUserReducer } = state();

  dispatch(showLoading());
  try {
    if (authUserReducer === null) {
      throw new Error('Anda harus login!');
    } else {
      const comment = await api.addComment({ threadId, content });
      dispatch(addCommentThreadDetail(comment));
    }
  } catch (error) {
    alert(error.message);
  }
  dispatch(hideLoading());
};

const toggleVoteUpCommentThreadDetail = ({ threadId, commentId, authUser }) => ({
  type: ActionType.TOGGLE_VOTE_UP_COMMENT_THREAD,
  payload: {
    threadId,
    commentId,
    authUser,
  },
});

const asyncToggleUpCommentThreadDetail = ({ idThread, commentId }) => async (dispatch, state) => {
  const { authUserReducer, detailThreadReducer } = state();

  dispatch(showLoading());
  try {
    if (authUserReducer === null) {
      throw new Error('Anda harus login!');
    } else {
      const authUserId = authUserReducer?.id;

      dispatch(toggleVoteUpCommentThreadDetail({
        threadId: idThread, commentId, authUser: authUserId,
      }));

      const filterCommentUpVotes = detailThreadReducer.comments
        .find((comment) => comment.id === commentId);

      if (!filterCommentUpVotes.upVotesBy.includes(authUserId)) {
        await api.upVoteComment({ threadId: idThread, commentId });
      } else {
        await api.netralVoteComment({ threadId: idThread, commentId });
      }
    }
  } catch (error) {
    alert(error.message);
  }
  dispatch(hideLoading());
};

const toggleVoteDownCommentThreadDetail = ({ threadId, commentId, authUser }) => ({
  type: ActionType.TOGGLE_VOTE_DOWN_COMMENT_THREAD,
  payload: {
    threadId,
    commentId,
    authUser,
  },
});

const asyncToggleDownCommentThreadDetail = ({ idThread, commentId }) => async (dispatch, state) => {
  const { authUserReducer, detailThreadReducer } = state();

  dispatch(showLoading());
  try {
    if (authUserReducer === null) {
      throw new Error('Anda harus login!');
    } else {
      const authUserId = authUserReducer?.id;

      dispatch(toggleVoteDownCommentThreadDetail({
        threadId: idThread, commentId, authUser: authUserId,
      }));
      const filterThreadDownvotes = detailThreadReducer.comments
        .find((comment) => comment.id === commentId);

      if (!filterThreadDownvotes.downVotesBy.includes(authUserId)) {
        await api.downVoteComment({ threadId: idThread, commentId });
      } else {
        await api.netralVoteComment({ threadId: idThread, commentId });
      }
    }
  } catch (error) {
    alert(error.message);
  }
  dispatch(hideLoading());
};

export {
  ActionType,
  asyncReceiveDetailThread,
  unsetDetailThreadActionCreator,
  toggleVoteUpThreadDetail,
  toggleVoteDownThreadDetail,
  asyncToggleUpVoteDetailThread,
  asyncToggleDownVoteDetailThread,
  asyncAddCommentThreadDetail,
  toggleVoteUpCommentThreadDetail,
  asyncToggleUpCommentThreadDetail,
  asyncToggleDownCommentThreadDetail,
  receiveDetailThreadActionCreator,
  addCommentThreadDetail,
  toggleVoteDownCommentThreadDetail,
};

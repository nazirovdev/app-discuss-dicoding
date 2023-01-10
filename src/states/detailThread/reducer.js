import { ActionType } from './action';

const detailThreadReducer = (detailThread = null, action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.thread;
    case ActionType.UNSET_DETAIL_THREAD:
      return action.payload.thread;
    case ActionType.TOGGLE_VOTE_UP_THREAD:
      return {
        ...detailThread,
        downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
          ? detailThread.downVotesBy.filter((downVote) => downVote !== action.payload.userId)
          : detailThread.downVotesBy,
        upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
          ? detailThread.upVotesBy.filter((upVote) => upVote !== action.payload.userId)
          : detailThread.upVotesBy.concat(action.payload.userId),
      };
    case ActionType.TOGGLE_VOTE_DOWN_THREAD:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
          ? detailThread.upVotesBy.filter((upVote) => upVote !== action.payload.userId)
          : detailThread.upVotesBy,
        downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
          ? detailThread.downVotesBy.filter((upVote) => upVote !== action.payload.userId)
          : detailThread.downVotesBy.concat(action.payload.userId),
      };

    case ActionType.ADD_COMMENT_THREAD:
      return {
        ...detailThread,
        comments: [action.payload.comment, ...detailThread.comments],
      };
    case ActionType.TOGGLE_VOTE_UP_COMMENT_THREAD:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.authUser)
                ? comment.upVotesBy.filter((upVote) => upVote !== action.payload.authUser)
                : comment.upVotesBy.concat(action.payload.authUser),
              downVotesBy: comment.downVotesBy.includes(action.payload.authUser)
                ? comment.downVotesBy.filter((downVote) => downVote !== action.payload.authUser)
                : comment.downVotesBy,
            };
          }
          return comment;
        }),
      };
    case ActionType.TOGGLE_VOTE_DOWN_COMMENT_THREAD:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.includes(action.payload.authUser)
                ? comment.downVotesBy.filter((upVote) => upVote !== action.payload.authUser)
                : comment.downVotesBy.concat(action.payload.authUser),
              upVotesBy: comment.upVotesBy.includes(action.payload.authUser)
                ? comment.upVotesBy.filter((downVote) => downVote !== action.payload.authUser)
                : comment.upVotesBy,
            };
          }
          return comment;
        }),
      };
    default:
      return detailThread;
  }
};

export default detailThreadReducer;

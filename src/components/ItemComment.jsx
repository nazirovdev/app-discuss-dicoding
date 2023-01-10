import HTMLReactParser from 'html-react-parser';
import React from 'react';
import {
  AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { asyncToggleDownCommentThreadDetail, asyncToggleUpCommentThreadDetail } from '../states/detailThread/action';
import { postedAt } from '../utils';

export default function ItemComment({ comment, idThread }) {
  const dispatch = useDispatch();

  const onUpVoteCommentHandle = () => {
    dispatch(asyncToggleUpCommentThreadDetail({ idThread, commentId: comment.id }));
  };

  const onDownVoteCommentHandle = () => {
    dispatch(asyncToggleDownCommentThreadDetail({ idThread, commentId: comment.id }));
  };

  const { authUserReducer } = useSelector((states) => states);

  return (
    <article className="p-4 flex flex-col gap-2 bg-slate-300 rounded-md">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
            <img className="w-full h-full" src={comment.owner.avatar} alt={comment.owner.name} />
          </div>
          <p className="font-bold">{comment.owner.name}</p>
        </div>
        <p>{postedAt(comment.createdAt)}</p>
      </div>
      <h3 className="text-md">{HTMLReactParser(comment.content)}</h3>
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <button type="button" onClick={onUpVoteCommentHandle}>
            {
              comment.upVotesBy.includes(authUserReducer?.id)
                ? <AiFillLike />
                : <AiOutlineLike />
            }
          </button>
          <span>{comment.upVotesBy.length}</span>
        </div>
        <div className="flex items-center">
          <button type="button" onClick={onDownVoteCommentHandle}>
            {
              comment.downVotesBy.includes(authUserReducer?.id)
                ? <AiFillDislike />
                : <AiOutlineDislike />
            }
          </button>
          <span>{comment.downVotesBy.length}</span>
        </div>
      </div>
    </article>
  );
}

ItemComment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    owner: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  idThread: PropTypes.string.isRequired,
};

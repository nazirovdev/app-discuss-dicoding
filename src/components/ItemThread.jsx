import React from 'react';
import {
  AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike,
} from 'react-icons/ai';
import { BiCommentDots } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HTMLReactParser from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { asyncToggleDownvote, asyncToggleUpvote } from '../states/threads/action';
import { postedAt, truncateString } from '../utils';

export default function ItemThread({ thread }) {
  const dispatch = useDispatch();
  const { authUserReducer } = useSelector((states) => states);

  const onUpVote = () => {
    dispatch(asyncToggleUpvote(thread?.id));
  };

  const onDownVote = () => {
    dispatch(asyncToggleDownvote(thread?.id));
  };

  return (
    <article className="bg-slate-100 border-l-2 border-slate-600 ml-4 mr-4 rounded-md shadow-lg">
      <div className="p-4 flex flex-col gap-2">
        <Link to={`/threads/${thread?.id}`}><h2 className="font-bold text-2xl text-slate-700">{thread?.title}</h2></Link>
        <span className="bg-slate-300 p-1 rounded-md w-fit font-bold text-slate-800 shadow-md">{thread?.category}</span>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
            <img className="w-full h-full" src={thread?.user?.avatar} alt={thread?.user?.name} />
          </div>
          <p className="font-bold text-slate-700">{thread?.user?.name}</p>
          <p className="text-slate-700">{postedAt(thread?.createdAt)}</p>
        </div>
        <h3 className="text-md text-slate-700">{HTMLReactParser(truncateString(thread?.body))}</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <button type="button" onClick={onUpVote} id={`upVote-${thread?.id}`}>
              {
                thread?.upVotesBy.includes(authUserReducer?.id) ? <AiFillLike /> : <AiOutlineLike />
              }
            </button>
            <span className="text-slate-700 font-bold">{thread?.upVotesBy.length}</span>
          </div>
          <div className="flex items-center">
            <button type="button" onClick={onDownVote} id={`downVote-${thread?.id}`}>
              {
                thread?.downVotesBy.includes(authUserReducer?.id)
                  ? <AiFillDislike />
                  : <AiOutlineDislike />
              }
            </button>
            <span className="text-slate-700 font-bold">{thread?.downVotesBy.length}</span>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <span><BiCommentDots /></span>
          <span className="text-slate-700 font-bold">
            {thread?.totalComments}
            {' '}
            Komentar
          </span>
        </div>
      </div>
    </article>
  );
}

ItemThread.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
    totalComments: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

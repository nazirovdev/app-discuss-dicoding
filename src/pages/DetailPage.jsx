import HTMLReactParser from 'html-react-parser';
import React, { useEffect } from 'react';
import {
  AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FormAddComment from '../components/FormAddComment';
import ItemComment from '../components/ItemComment';
import {
  asyncAddCommentThreadDetail,
  asyncReceiveDetailThread,
  asyncToggleDownVoteDetailThread,
  asyncToggleUpVoteDetailThread,
  unsetDetailThreadActionCreator,
} from '../states/detailThread/action';
import { postedAt } from '../utils';

export default function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(unsetDetailThreadActionCreator());
    dispatch(asyncReceiveDetailThread({ idThread: id }));
  }, [dispatch, id]);

  const { detailThreadReducer, authUserReducer } = useSelector((states) => states);

  if (detailThreadReducer === null) {
    return null;
  }

  const {
    id: idThread, title, body, category, createdAt, owner, upVotesBy, downVotesBy, comments,
  } = detailThreadReducer;

  const onUpVote = () => {
    dispatch(asyncToggleUpVoteDetailThread({ idThread }));
  };

  const onDownVote = () => {
    dispatch(asyncToggleDownVoteDetailThread({ idThread }));
  };

  const onAddCommentHandle = ({ yourComment }) => {
    dispatch(asyncAddCommentThreadDetail({ threadId: idThread, content: yourComment }));
  };

  return (
    <section className="bg-slate-50 min-h-screen mt-10 pb-10">
      <h1 className="p-4 font-bold text-2xl text-slate-700">Detail Thread</h1>

      <article className="bg-slate-100 border-l-2 border-slate-600 ml-4 mr-4 rounded-md">
        <div className="p-4 flex flex-col gap-4">
          <h2 className="font-bold text-2xl text-slate-700">{title}</h2>
          <span className="bg-slate-300 p-1 rounded-md w-fit font-bold text-slate-700 shadow-md">{category}</span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
              <img className="w-full h-full" src={owner.avatar} alt={owner.name} />
            </div>
            <p className="font-bold text-slate-700">{owner.name}</p>
            <p className="text-slate-700">{postedAt(createdAt)}</p>
          </div>
          <h3 className="text-md">{HTMLReactParser(body)}</h3>
          <div className="flex items-center gap-2 mt-5">
            <div className="flex items-center">
              <button type="button" onClick={onUpVote}>
                {upVotesBy.includes(authUserReducer?.id) ? <AiFillLike /> : <AiOutlineLike />}
              </button>
              <span className="text-xl text-slate-700 font-bold">{upVotesBy.length}</span>
            </div>
            <div className="flex items-center">
              <button type="button" onClick={onDownVote}>
                {downVotesBy.includes(authUserReducer?.id)
                  ? <AiFillDislike />
                  : <AiOutlineDislike />}
              </button>
              <span className="text-xl text-slate-700 font-bold">{downVotesBy.length}</span>
            </div>
          </div>
          <FormAddComment onAddComment={onAddCommentHandle} />
          <div>
            <h2 className="text-slate-700 font-bold">
              Komentar (
              {comments.length}
              )
            </h2>
            <div className="mt-2 flex flex-col gap-2">
              {
                  comments.map((comment) => (
                    <ItemComment key={comment.id} comment={comment} idThread={idThread} />
                  ))
                }
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

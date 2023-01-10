import React, { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ListThreads from '../components/ListThreads';
import asyncPopulatedThreadsAndUsers from '../states/shared/action';

export default function Homepage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulatedThreadsAndUsers());
  }, [dispatch]);

  const {
    threadsReducer = [], usersReducer = [], authUserReducer, categoryReducer,
  } = useSelector((states) => states);

  const threads = threadsReducer.map((thread) => ({
    ...thread,
    user: usersReducer.find((user) => user.id === thread.ownerId),
  }));

  const filterThreadByCategory = threads.filter((thread) => thread.category.includes(categoryReducer.selectedCategory === null ? '' : categoryReducer.selectedCategory));

  return (
    <>
      <section className="flex">
        <div className="bg-slate-50 flex-1 min-h-screen">
          <h1 className="p-4 font-bold text-2xl mt-10 text-slate-700">Daftar Threads</h1>
          <ListThreads threads={filterThreadByCategory} />
        </div>
      </section>
      {
        authUserReducer !== null && (
          <Link to="/add-thread">
            <button type="button" className="w-10 h-10 bg-slate-300 ring-4 ring-slate-600 fixed rounded-full bottom-10 right-3 flex justify-center items-center">
              <i className="text-slate-700 shadow-lg"><FaPlus size="25" /></i>
            </button>
          </Link>
        )
      }
    </>
  );
}

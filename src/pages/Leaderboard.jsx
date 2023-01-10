import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListLeaderboards from '../components/ListLeaderboards';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

export default function Leaderboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  const { leaderboardsReducer } = useSelector((states) => states);

  return (
    <section className="mt-10 bg-slate-50">
      <h1 className="p-4 font-bold text-2xl text-slate-700">Leaderboards</h1>
      <ListLeaderboards leaderboards={leaderboardsReducer} />
    </section>
  );
}

import React from 'react';
import PropTypes from 'prop-types';

export default function ItemLeaderboard({ leaderboard }) {
  return (
    <div className="w-full ring-2 ring-slate-700 flex items-center justify-between bg-slate-200 h-16 rounded-full">
      <div className="flex items-center gap-4">
        <div className="w-16 h-full bg-slate-400 overflow-hidden rounded-full">
          <img src={leaderboard.user.avatar} alt={leaderboard.user.name} />
        </div>
        <h2 className="font-bold text-slate-800 text-lg">{leaderboard.user.name}</h2>
      </div>
      <div className="font-bold text-slate-800 text-lg mr-4">{leaderboard.score}</div>
    </div>
  );
}

ItemLeaderboard.propTypes = {
  leaderboard: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      avatar: PropTypes.string,
    }).isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};

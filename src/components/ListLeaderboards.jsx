import React from 'react';
import PropTypes from 'prop-types';
import ItemLeaderboard from './ItemLeaderboard';

export default function ListLeaderboards({ leaderboards }) {
  return (
    <div className="flex flex-col items-center px-4 gap-4 mt-6 mb-12">
      {
        leaderboards.map((leaderboard) => (
          <ItemLeaderboard key={leaderboard.user.id} leaderboard={leaderboard} />
        ))
      }
    </div>
  );
}

ListLeaderboards.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      avatar: PropTypes.string,
    }),
    score: PropTypes.number,
  })).isRequired,
};

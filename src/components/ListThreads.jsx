import React from 'react';
import PropTypes from 'prop-types';
import ItemThread from './ItemThread';

export default function ListThreads({ threads }) {
  return (
    <section className="flex flex-col gap-2 mb-12 md:mb-8">
      {
        threads.map((thread) => (
          <ItemThread key={thread.id} thread={thread} />
        ))
      }
    </section>
  );
}

ListThreads.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape({
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
    }).isRequired,
  })).isRequired,
};

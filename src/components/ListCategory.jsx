import React from 'react';
import { useSelector } from 'react-redux';
import ItemCategory from './ItemCategory';

export default function ListCategory() {
  const { threadsReducer } = useSelector((states) => states);
  const category = threadsReducer.map((thread) => thread.category);

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {
        category.map((categoryName, id) => (
          <ItemCategory key={id} categoryName={categoryName} />
        ))
      }
    </div>
  );
}

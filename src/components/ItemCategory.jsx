import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { removeCategoryActionCreator, setCategoryActionCreator } from '../states/category/action';

export default function ItemCategory({ categoryName }) {
  const dispatch = useDispatch();

  const { categoryReducer } = useSelector((states) => states);

  const onCategoryClick = () => {
    if (categoryName !== categoryReducer.selectedCategory) {
      dispatch(setCategoryActionCreator(categoryName));
    } else {
      dispatch(removeCategoryActionCreator());
    }
  };

  return (
    <div
      onClick={onCategoryClick}
      className={`${categoryName === categoryReducer.selectedCategory ? 'bg-slate-800' : 'bg-slate-500'} text-white font-bold p-1 rounded-md cursor-pointer`}
    >
      {categoryName}

    </div>
  );
}

ItemCategory.propTypes = {
  categoryName: PropTypes.string.isRequired,
};

import { ActionType } from './action';

const categoryReducer = (category = null, action = {}) => {
  switch (action.type) {
    case ActionType.GET_CATEGORIES:
      return {
        ...category,
        values: action.payload.categories,
        selectedCategory: null,
      };
    case ActionType.SET_CATEGORIES:
      return {
        ...category,
        selectedCategory: action.payload.category,
      };
    case ActionType.REMOVE_CATEGORIES:
      return {
        ...category,
        selectedCategory: null,
      };
    default:
      return category;
  }
};

export default categoryReducer;

const ActionType = {
  GET_CATEGORIES: 'category/RECEIVE',
  SET_CATEGORIES: 'category/SET',
  REMOVE_CATEGORIES: 'category/REMOVE',
};
const receiveCategoryActionCreator = (categories) => ({
  type: ActionType.GET_CATEGORIES,
  payload: {
    categories,
  },
});

const setCategoryActionCreator = (category) => ({
  type: ActionType.SET_CATEGORIES,
  payload: {
    category,
  },
});

const removeCategoryActionCreator = (category) => ({
  type: ActionType.REMOVE_CATEGORIES,
  payload: {
    category,
  },
});

export {
  ActionType,
  receiveCategoryActionCreator,
  setCategoryActionCreator,
  removeCategoryActionCreator,
};

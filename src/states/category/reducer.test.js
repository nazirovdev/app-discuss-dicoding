/**
 *
 * test scenario for categoryReducer
 *
 * - categoryReducer function
 *
 *  - should return null when given by unknown action
 *  - should return object category when given by GET_CATEGORIES action
 *  - should return object category with category item selected by SET_CATEGORIES action
 *  - should return object category and null category item selected by REMOVE_CATEGORIES action
 * */

import { ActionType } from './action';
import categoryReducer from './reducer';

describe('test scenario for categoryReducer', () => {
  it('should return null when given by unknown action', () => {
    const initialState = null;
    const action = {
      type: 'unknown',
    };

    const nextState = categoryReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return object category when given by GET_CATEGORIES action', () => {
    const initialState = null;
    const action = {
      type: ActionType.GET_CATEGORIES,
      payload: {
        categories: ['HTML', 'CSS', 'JS', 'React'],
      },
    };

    const nextState = categoryReducer(initialState, action);
    expect(nextState).toEqual(
      {
        values: action.payload.categories,
        selectedCategory: null,
      },
    );
  });

  it('should return object category with category item selected by SET_CATEGORIES action', () => {
    const initialState = {
      values: ['HTML', 'CSS', 'JS', 'React'],
      selectedCategory: null,
    };

    const action = {
      type: ActionType.SET_CATEGORIES,
      payload: {
        category: 'React',
      },
    };

    const nextState = categoryReducer(initialState, action);
    expect(nextState).toEqual({ ...initialState, selectedCategory: action.payload.category });
  });

  it('should return object category and null category item selected by REMOVE_CATEGORIES action', () => {
    const initialState = {
      values: ['HTML', 'CSS', 'JS', 'React'],
      selectedCategory: 'React',
    };

    const action = {
      type: ActionType.REMOVE_CATEGORIES,
      payload: {
        category: 'React',
      },
    };

    const nextState = categoryReducer(initialState, action);
    expect(nextState).toEqual({ ...initialState, selectedCategory: null });
  });
});

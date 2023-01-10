import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../utils/api';
import { receiveCategoryActionCreator } from '../category/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

const asyncPopulatedThreadsAndUsers = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const threads = await api.getThreads();
    const users = await api.getUsers();
    const categories = threads.map((thread) => thread.category);

    dispatch(receiveThreadsActionCreator(threads));
    dispatch(receiveUsersActionCreator(users));
    dispatch(receiveCategoryActionCreator(categories));
  } catch (error) {
    alert(error.message);
  }
  dispatch(hideLoading());
};

export default asyncPopulatedThreadsAndUsers;

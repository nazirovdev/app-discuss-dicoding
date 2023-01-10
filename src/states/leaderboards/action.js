import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../utils/api';

const ActionType = {
  GET_LEADERBOARDS: 'leaderboards/GET',
};

const receiveLeaderboardsActionCreator = (leaderboards) => ({
  type: ActionType.GET_LEADERBOARDS,
  payload: {
    leaderboards,
  },
});

const asyncReceiveLeaderboards = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const leaderBoards = await api.getLeaderboards();
    dispatch(receiveLeaderboardsActionCreator(leaderBoards));
  } catch (error) {
    alert(error.message);
  }
  dispatch(hideLoading());
};

export { ActionType, receiveLeaderboardsActionCreator, asyncReceiveLeaderboards };

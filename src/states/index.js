import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import categoryReducer from './category/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import detailThreadReducer from './detailThread/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadsReducer from './threads/reducer';
import usersReducer from './users/reducer';
import isRegisterReducer from './isRegister/reducer';

const store = configureStore({
  reducer: {
    isPreloadReducer,
    authUserReducer,
    threadsReducer,
    usersReducer,
    leaderboardsReducer,
    detailThreadReducer,
    loadingBar: loadingBarReducer,
    categoryReducer,
    isRegisterReducer,
  },
});

export default store;

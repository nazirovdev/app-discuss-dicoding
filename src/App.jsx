import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AddThreadPage from './pages/AddThreadPage';
import DetailPage from './pages/DetailPage';
import Homepage from './pages/Homepage';
import Leaderboard from './pages/Leaderboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfile from './pages/UserProfile';
import { asyncSetIsPreload } from './states/isPreload/action';
import Navbar from './components/Navbar';

function App() {
  const dispatch = useDispatch();
  const { isPreloadReducer, authUserReducer } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncSetIsPreload());
  }, [dispatch]);

  if (isPreloadReducer === true) {
    return null;
  }

  if (authUserReducer !== null) {
    return (
      <div className="App">
        <Navbar type="dark" />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/add-thread" element={<AddThreadPage />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/leaderboards" element={<Leaderboard />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/*" element={<UserProfile />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar type="light" />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/*" element={<UserProfile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/leaderboards" element={<Leaderboard />} />
        <Route path="/threads/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;

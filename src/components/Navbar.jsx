import React, { useState } from 'react';
import { FaUserAlt, FaBars, FaHome } from 'react-icons/fa';
import { MdLeaderboard } from 'react-icons/md';
import LoadingBar from 'react-redux-loading-bar';
import { Link, useLocation } from 'react-router-dom';
import ListCategory from './ListCategory';

export default function Navbar() {
  const [sidenav, setSidenav] = useState(true);
  const location = useLocation();

  const setSitenavHandle = () => {
    setSidenav(!sidenav);
  };

  return (
    <>
      <div className="flex items-center fixed top-0 left-0 right-0 z-20">
        <LoadingBar />
      </div>
      <header className="w-full h-12 fixed z-10 bg-slate-300 top-0 flex items-center justify-between px-4">
        <nav className="flex items-center gap-2 w-full justify-between">
          <div className="flex items-center gap-2">
            {
              location.pathname === '/' && (
                <button type="button" onClick={setSitenavHandle}><FaBars /></button>
              )
            }
            <Link to="/"><h1 className="font-bold text-lg text-slate-600">Discuss App</h1></Link>
          </div>
          <ul className="gap-4 items-center hidden md:flex">
            <Link to="/"><li className="font-bold text-slate-800">Home</li></Link>
            <Link to="/leaderboards"><li className="font-bold text-slate-800">Leaderboards</li></Link>
            <Link to="/user-profile"><li className="font-bold text-slate-800">Profile</li></Link>
          </ul>
        </nav>
      </header>
      {/* sidenav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-300 p-2 z-20 md:hidden">
        <ul className="flex gap-2 items-center justify-evenly">
          <Link to="/leaderboards"><li><MdLeaderboard /></li></Link>
          <Link to="/"><li><FaHome /></li></Link>
          <Link to="/user-profile"><li><FaUserAlt /></li></Link>
        </ul>
      </nav>
      <aside className={`w-64 h-screen bg-slate-100 border-r-2 transition-all border-slate-400 fixed top-12 z-10 ${sidenav ? '-left-full' : 'left-0'}`}>
        <div className="bg-slate-50 p-4 m-4">
          <h1 className="font-bold text-lg">Kategori</h1>
          <ListCategory />
        </div>
      </aside>
    </>
  );
}

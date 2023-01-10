import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaBars, FaHome, FaUserAlt } from 'react-icons/fa';
import { MdLeaderboard } from 'react-icons/md';
import { LoadingBar } from 'react-redux-loading-bar';
import { Link, useLocation } from 'react-router-dom';

import styled, { createGlobalStyle } from 'styled-components';
import ListCategory from '../ListCategory';

export const GlobalCss = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    font-size: 16px;
  }

  li {
    list-style-type: none;
  }
`;

export const bgColors = {
  green: '#4ADE80',
  blue: '#60A5FA',
  red: '#FA4639',
  gray: '#64748B',
  dark: '#202123',
  light: '#f1f5f9',
};

export const textColors = {
  dark: '#E5E6E8',
  light: '#475569',
};

export const NavContainer = styled.header`
  width: 100%;
  background-color: ${({ bgColor }) => bgColors[bgColor]};
  display: flex;
  justify-content: space-between;
  height: 3rem;
  padding: 0 1rem;
  position: fixed;
  left:0;
  top:0;
  right: 0;
`;

export const NavTitle = styled.h1`
  font-size: 1em;
  font-weight: bold;
  color:${({ txtColor }) => textColors[txtColor]};
  cursor: pointer;
`;

export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

export const ButtonIcon = styled.button`
  display: flex;
  font-size: 1.5em;
  border-style:none;
  color:${({ txtColor }) => textColors[txtColor]};
  background-color: transparent;
  cursor: pointer;
`;

export function NavbarNew({ type }) {
  const [sidenav, setSidenav] = useState(true);
  const location = useLocation();

  const setSitenavHandle = () => {
    setSidenav(!sidenav);
  };
  return (
    <>
      <GlobalCss />
      <NavContainer bgColor={`${type}`}>
        <NavWrapper>
          {location.pathname === '/' && <ButtonIcon txtColor={`${type}`} onClick={setSitenavHandle}><FaBars /></ButtonIcon>}
          <Link to="/"><NavTitle txtColor={`${type}`}>Discuss App</NavTitle></Link>
        </NavWrapper>
        <NavWrapper className="md:visible">
          <Link to="/"><NavTitle className="hidden md:block" txtColor={`${type}`}>Homepage</NavTitle></Link>
          <Link to="/leaderboards"><NavTitle className="hidden md:block" txtColor={`${type}`}>Leaderboards</NavTitle></Link>
          <Link to="/user-profile"><NavTitle className="hidden md:block" txtColor={`${type}`}>Profile</NavTitle></Link>
        </NavWrapper>
      </NavContainer>
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

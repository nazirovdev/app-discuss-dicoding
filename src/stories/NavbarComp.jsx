import { FaBars } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  ButtonIcon, GlobalCss, NavContainer, NavTitle, NavWrapper,
} from '../components/atoms/NavbarComp';

export function NavbarComp(args) {
  return (
    <>
      <GlobalCss />
      <NavContainer {...args}>
        <NavWrapper>
          <ButtonIcon {...args}><FaBars /></ButtonIcon>
          <NavTitle {...args}>Discuss App</NavTitle>
        </NavWrapper>
        <NavWrapper>
          <NavTitle {...args}>Homepage</NavTitle>
          <NavTitle {...args}>Leaderboards</NavTitle>
          <NavTitle {...args}>Profile</NavTitle>
        </NavWrapper>
      </NavContainer>
    </>
  );
}

NavbarComp.propTypes = {
  /** type of bgColor to change the color background Navbar */
  bgColor: PropTypes.string,
  /** type of txtColor to change the color Navbar */
  txtColor: PropTypes.string,
};

import React from 'react';

import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Logo from './Logo';
import Toggle from './Toggle';
import ToggleWrap from './ToggleWrap';
import Menu from './Menu';
import MobileMenu from './MobileMenu';
import FlexContainer from './FlexContainer';

function Header({ open, setOpen }) {
  return (
    <NavBar>
      {/* logo */}
      <FlexContainer>
        <Logo>GFH Room tracker</Logo>
        <Menu>
          {/* Desktop/Table menu */}
          <HeaderLink to="/">Home</HeaderLink>
          <HeaderLink to="/admin">Assignment</HeaderLink>
        </Menu>
        {open && (
          <MobileMenu>
            {/* Mobile menu */}
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink to="/admin">Assignment</HeaderLink>
          </MobileMenu>
        )}
        <ToggleWrap>
          <Toggle open={open} onClick={() => setOpen(!open)} />
        </ToggleWrap>
      </FlexContainer>
    </NavBar>
  );
}

export default Header;

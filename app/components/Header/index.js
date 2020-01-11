import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Logo from './Logo';
import Toggle from './Toggle';
import ToggleWrap from './ToggleWrap';
import Menu from './Menu';
import messages from './messages';

import styled from 'styled-components';

const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;;
  justify-content: space-between;
  height: 4rem;
`;

const MobileMenu = styled.div`
  background: #2d3436;
  position: fixed;
  top: calc(4rem + 1px);
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
`;



function Header({open, setOpen}) {
  return (
    <NavBar>
        {/* logo */}
      <FlexContainer>
        <Logo>GFH Room tracker</Logo>
        <Menu>
          {/* links */}
          <HeaderLink  to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/admin">
            <FormattedMessage {...messages.assignment} />
          </HeaderLink>
          <HeaderLink to="/report">
            <FormattedMessage {...messages.report} />
          </HeaderLink>
        </Menu>
        { open && <MobileMenu >
          <HeaderLink  to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/admin">
            <FormattedMessage {...messages.assignment} />
          </HeaderLink>
          <HeaderLink to="/report">
            <FormattedMessage {...messages.report} />
          </HeaderLink>
        </MobileMenu> }
        <ToggleWrap>
          <Toggle
            open={open}
            onClick={() => setOpen(!open)}
          />
        </ToggleWrap>
      </FlexContainer>
    </NavBar>
  );
}

export default Header;

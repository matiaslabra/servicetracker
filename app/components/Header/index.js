import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Logo from './Logo';
import Toggle from './Toggle';
import ToggleWrap from './ToggleWrap';
import Menu from './Menu';
import MobileMenu from './MobileMenu';
import FlexContainer from './FlexContainer';
import messages from './messages';

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

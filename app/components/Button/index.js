/**
 *
 * Button
 *
 */

import React, { Children } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Wrapper from './Wrapper';
import StyledButton from './StyledButton';

function Button(props) {
  let button = (
    <StyledButton onClick={props.onClick}>
      {Children.toArray(props.children)}
    </StyledButton>
  );
  return <Wrapper>{button}</Wrapper>;
}

Button.propTypes = {};

export default Button;

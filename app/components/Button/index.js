/**
 *
 * Button
 *
 */

import React, { Children } from 'react';
import { PropTypes } from 'prop-types';
import Wrapper from './Wrapper';
import StyledButton from './StyledButton';

function Button(props) {
  const button = (
    <StyledButton {...props}>{Children.toArray(props.children)}</StyledButton>
  );
  return <Wrapper>{button}</Wrapper>;
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;

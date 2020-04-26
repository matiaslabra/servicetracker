/**
 *
 * Input
 *
 */

import React from 'react';
import StyledInput from './StyledInput';
import Wrapper from './Wrapper';

function Input(props) {
  const input = <StyledInput {...props} />;
  return <Wrapper>{input}</Wrapper>;
}

Input.propTypes = {};

export default Input;

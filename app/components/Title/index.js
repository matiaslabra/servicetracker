/**
 *
 * Title
 *
 */

import React from 'react';
import Wrapper from './Wrapper'
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Title(props) {
  return <Wrapper>
    {props.children}
  </Wrapper>
}

Title.propTypes = {};

export default Title;

/**
 *
 * Box
 *
 */

import React, { Children } from 'react';
import { PropTypes } from 'prop-types';
import Wrapper from './Wrapper';
function Box(props) {
  return <Wrapper {...props}>{Children.toArray(props.children)}</Wrapper>;
}

Box.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Box;

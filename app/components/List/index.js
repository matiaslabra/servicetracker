import React from 'react';
import PropTypes from 'prop-types';

import Rl from './Rl';
// import Wrapper from './Wrapper';

function List(props) {

  const {clickAction, isAssignment, isHousekeeping } = props;

  const roomListProps = {
    clickAction,
    isAssignment,
    isHousekeeping,
  };

  const ComponentToRender = props.component;
  let content = <div />;
  // If we have items, render them
  if (props.items.length > 0) {
    content = props.items.map(item => (
      <ComponentToRender {...roomListProps} key={`item-${item._id}`} id={item._id} item = {item} />
    ));
  } else {
    // Otherwise render empty message
    content = <div>No items assigned</div>;
  }

  return (

      <Rl>{content}</Rl>
  );
}

List.propTypes = {
  component: PropTypes.elementType.isRequired,
  items: PropTypes.array,
};

export default List;

import React from 'react';
import PropTypes from 'prop-types';

import Rl from './Rl';
// import Li from './Li';
import TaskItem from '../TaskItem';
// import Wrapper from './Wrapper';

function List(props) {

  const {clickAction, isAssignment, isHousekeeping } = props;

  const roomListProps = {
    clickAction,
    isAssignment,
    isHousekeeping,
  };

  // const ComponentToRender = props.component;
  let content = <div />;
  // If we have items, render them
  if (props.items.length > 0) {
    content = props.items.map(item => (
      <TaskItem {...roomListProps} key={`item-${item._id}`} id={item._id} item = {item} />
    ));
  } else {
    // Otherwise render empty message
    content = <Li>No items assigned</Li>;
  }

  return (

      <Rl>{content}</Rl>
  );
}

List.propTypes = {
  items: PropTypes.array,
};

export default List;

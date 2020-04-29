/**
 *
 * TaskListItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import AssignBox from './AssignBox';
import HKBox from './HKBox';
import Title from './Title';
import StatusBox from './StatusBox';

function TaskListItem({ item, isAssignment, isHousekeeping, clickAction }) {
  // hk : housekeeping
  // assign: assignment

  if (isAssignment === true) {
    return (
      <AssignBox
        assignKey={item.assignKey}
        onClick={() => clickAction(item._id)}
      >
        <StatusBox>
          {item.assignArray[item.assignKey]} {item.isDaily ? ' - Daily' : ''}
        </StatusBox>
        <Title>{item.name}</Title>
      </AssignBox>
    );
  }

  if (isHousekeeping === true) {
    return (
      <HKBox hkKey={item.hkKey} onClick={() => clickAction(item._id)}>
        <StatusBox>
          {item.hkArray[item.hkKey]}
          {item.isDaily ? ' - Daily' : ''}
        </StatusBox>
        <Title>{item.task.name}</Title>
      </HKBox>
    );
  }
}

TaskListItem.propTypes = {
  item: PropTypes.object,
  isAssignment: PropTypes.bool,
  isHousekeeping: PropTypes.bool,
  isDaily: PropTypes.bool,
  clickAction: PropTypes.func,
};

export default TaskListItem;

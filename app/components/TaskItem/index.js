/**
 *
 * TaskItem
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AssignBox from './AssignBox';
import HKBox from './HKBox';
import Title from './Title';
import StatusBox from './StatusBox';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function TaskItem({
  item,
  isAssignment,
  isHousekeeping,
  clickAction,
  isDaily
}) {
  // hk : housekeeping
  // assign: assignment
  const [taskProperties, setTaskProperties] = useState({
    _id: item._id,
    task: item._id,
    assignKey : item.assignment || item.isDaily ? 1 : 0,
    assignArray: ['Not assigned', 'Assigned'],
    hkKey: item.hkKey ? item.hkKey : 0,
    hkArray: ['Not taken', 'Taken', 'Done'],
    isDaily: item.isDaily ? item.isDaily : false,
    type: 'tasks'
  });

  useEffect(() => {
    // loading on
    // console.log('useEffect in taskItem', item);
    if(taskProperties.hkKey != item.hkKey){
      setTaskProperties({...taskProperties, hkKey: item.hkKey});
    }
 });

  const roomClickAction = () => {
    let nextKey = 0;
    if(isAssignment){
      nextKey = taskProperties.assignKey + 1;
      if(nextKey > (taskProperties.assignArray.length-1)){
        nextKey = 0;
      }
      setTaskProperties({...taskProperties, assignKey: nextKey});
      clickAction({...taskProperties, assignKey: nextKey});
    }else{
      nextKey = taskProperties.hkKey + 1;
      if(nextKey > (taskProperties.hkArray.length-1)){
        nextKey = 0;
      }
      setTaskProperties({...taskProperties, hkKey: nextKey});
      clickAction({
        task: item._id,
        _id: item._id,
        hkKey: nextKey,
        type: 'tasks',
        date: item.date
      });
    }
  }


  if (isAssignment == true) {
    return (
      <AssignBox
        assignKey={ taskProperties.assignKey }
        onClick={roomClickAction}
      >
      <StatusBox>{taskProperties.assignArray[taskProperties.assignKey]} { taskProperties.isDaily ? ' - Daily': ''}</StatusBox>
      <Title>{item.name}</Title>
      </AssignBox>
    );
  }

  if( isHousekeeping == true ){
    return (
      <HKBox
        hkKey={ taskProperties.hkKey}
        onClick={roomClickAction}
      >
      <StatusBox>{taskProperties.hkArray[taskProperties.hkKey]}{taskProperties.isDaily ? ' - Daily': ''}</StatusBox>
      <Title>{item.task.name}</Title>
      </HKBox>
    );
  }
}

TaskItem.propTypes = {};

export default TaskItem;

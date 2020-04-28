import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import TaskListItem from '../../containers/TaskListItem';
import Rl from './Rl';
import Li from './Li';
// import Wrapper from './Wrapper';

function TaskList({ items, isAssignment, isHousekeeping, parentAction, date }) {
  const [taskList, setTaskList] = useState([]);

  const taskItem = {
    assignKey: 0,
    assignArray: ['Not assigned', 'Assigned'],
    hkArray: ['Not taken', 'Taken', 'Done'],
    type: 'tasks',
  };

  useEffect(() => {
    const taskItems = items.reduce((ac, item) => {
      let newTaskItem;
      newTaskItem = { ...item, ...taskItem };
      if (item.assignment) {
        newTaskItem = {
          ...newTaskItem,
          ...item.assignment.tasks,
        };
      }
      ac.push(newTaskItem);
      return ac;
    }, []);

    setTaskList(taskItems);
  }, [items]);

  const findTaskKeyById = useCallback(
    _id => taskList.findIndex(item => item._id === _id),
    [taskList],
  );

  const clickAction = _id => {
    const taskIndex = findTaskKeyById(_id);
    let nextKey = 0;
    let newTaskList;
    if (isAssignment) {
      nextKey = taskList[taskIndex].assignKey + 1;
      if (nextKey > taskList[taskIndex].assignArray.length - 1) {
        nextKey = 0;
      }
      newTaskList = [...taskList];
      newTaskList[taskIndex] = {
        ...taskList[taskIndex],
        assignKey: nextKey,
      };
    } else {
      nextKey = taskList[taskIndex].hkKey + 1;
      if (nextKey > taskList[taskIndex].hkArray.length - 1) {
        nextKey = 0;
      }
      newTaskList = [...taskList];
      newTaskList[taskIndex] = {
        ...taskList[taskIndex],
        hkKey: nextKey,
      };
    }

    setTaskList(newTaskList);
    parentAction({
      ...newTaskList[taskIndex],
      date,
    });
  };
  return (
    <Rl>
      {taskList.length === 0 ? <Li>No items assigned</Li> : null}
      {taskList.map(item => (
        <TaskListItem
          isAssignment={isAssignment || false}
          isHousekeeping={isHousekeeping || false}
          clickAction={clickAction}
          key={item._id}
          item={item}
        />
      ))}
    </Rl>
  );
}

TaskList.propTypes = {
  items: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
  parentAction: PropTypes.func,
  isAssignment: PropTypes.bool,
  isHousekeeping: PropTypes.bool,
};

export default TaskList;

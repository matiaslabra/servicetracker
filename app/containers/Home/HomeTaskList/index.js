import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import TaskListItem from '../../../components/TaskListItem';
import List from '../../../components/List';
import LoadingIndicator from '../../../components/LoadingIndicator';
// import Wrapper from './Wrapper';

function HomeTaskList({ loading, items, parentAction, date, ...props }) {
  const [taskList, setTaskList] = useState([]);

  const taskItem = {
    hkArray: ['Not taken', 'Taken', 'Done'],
    type: 'tasks',
  };

  useEffect(() => {
    // console.log('assignmentId', assignmentId);
    const taskItems = items.reduce((ac, item) => {
      const newTaskItem = { ...item, ...taskItem };
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
    nextKey = taskList[taskIndex].hkKey + 1;
    if (nextKey > taskList[taskIndex].hkArray.length - 1) {
      nextKey = 0;
    }
    const newTaskList = [...taskList];
    newTaskList[taskIndex] = {
      ...taskList[taskIndex],
      hkKey: nextKey,
    };

    setTaskList(newTaskList);
    parentAction({ ...newTaskList[taskIndex], date });
  };

  return (
    <section>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <List
          {...props}
          component={TaskListItem}
          items={taskList}
          clickAction={clickAction}
        />
      )}
    </section>
  );
}

HomeTaskList.propTypes = {
  items: PropTypes.array.isRequired,
  date: PropTypes.string,
  parentAction: PropTypes.func,
  isHousekeeping: PropTypes.bool,
  loading: PropTypes.bool,
};

export default HomeTaskList;

/**
 *
 * AdminTaskSection
 *
 *
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import TaskForm from '../TaskForm';
import List from '../../../components/List';
import TaskListItem from '../../../components/TaskListItem';
import { addTask, checkAssignment } from '../AdminPage/actions';
import { makeSelectAssignmentId } from '../AdminPage/selectors';
import TaskListWrapper from './TaskListWrapper';

export function AdminTaskSection({
  items,
  parentAction,
  onSubmitForm,
  getAssignmentId,
  assignmentId,
}) {
  const [taskList, setTaskList] = useState([]);

  const taskItem = {
    assignKey: 0,
    assignArray: ['Not assigned', 'Assigned'],
    type: 'tasks',
  };

  useEffect(() => {
    getAssignmentId();
  }, []);

  useEffect(() => {
    if (assignmentId !== undefined) {
      const taskItems = items.reduce((ac, item) => {
        let newTaskItem;
        newTaskItem = { ...item, ...taskItem };
        if (assignmentId && 'assignment' in item) {
          newTaskItem = {
            ...newTaskItem,
            ...item.assignment.tasks,
          };
        } else if (item.isDaily) {
          newTaskItem = {
            ...newTaskItem,
            assignKey: 1,
          };
        }
        ac.push(newTaskItem);
        return ac;
      }, []);

      setTaskList(taskItems);
      checkTasksForEdition(taskItems);
    }
  }, [assignmentId, items]);

  /**
   * checkTasksForEdition
   * @description same as checkRoomsForEdition but with tasks and their daily logic
   * @param {Array} tasks
   */
  const checkTasksForEdition = itemsToCheck => {
    const tasksToEdit = [];
    itemsToCheck.forEach(item => {
      if (item.assignKey === 1) tasksToEdit.push(item);
    });
    // console.log(tasksToEdit);
    if (tasksToEdit.length > 0) {
      parentAction(tasksToEdit);
    }
  };

  const findTaskKeyById = useCallback(
    _id => taskList.findIndex(item => item._id === _id),
    [taskList],
  );

  const clickAction = _id => {
    const taskIndex = findTaskKeyById(_id);
    let nextKey = 0;
    nextKey = taskList[taskIndex].assignKey + 1;
    if (nextKey > taskList[taskIndex].assignArray.length - 1) {
      nextKey = 0;
    }
    const newTaskList = [...taskList];
    newTaskList[taskIndex] = {
      ...taskList[taskIndex],
      assignKey: nextKey,
    };

    setTaskList(newTaskList);
    parentAction([{ ...newTaskList[taskIndex] }]);
  };

  return (
    <TaskListWrapper>
      <TaskForm onSubmitForm={onSubmitForm} />
      <List
        component={TaskListItem}
        clickAction={clickAction}
        items={taskList}
        isAssignment
      />
    </TaskListWrapper>
  );
}

AdminTaskSection.propTypes = {
  items: PropTypes.array.isRequired,
  parentAction: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  getAssignmentId: PropTypes.func.isRequired,
  assignmentId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  assignmentId: makeSelectAssignmentId(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: task => {
      dispatch(addTask(task));
    },
    getAssignmentId: () => dispatch(checkAssignment()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AdminTaskSection);

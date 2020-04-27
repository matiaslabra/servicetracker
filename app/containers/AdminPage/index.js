/**
 *
 * AdminPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectRooms, makeSelectTasks, makeSelectDate } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { setAssignment, loadAssignment } from '../App/actions';
import { changeDate, loadRooms, loadTasks, addTask } from './actions';

import H1 from '../../components/H1';
import H2 from '../../components/H2';
import Button from '../../components/Button';
import TaskListWrapper from './TaskListWrapper';

import TaskList from '../../components/TaskList';
import { DateForm } from '../DateForm';
import { TaskForm } from '../TaskForm';
import RoomZones from '../../components/RoomZones';
import AdminRoomList from '../AdminRoomList';

export function AdminPage({
  rooms,
  date,
  initRooms,
  initTasks,
  tasks,
  onClickButton,
  onChangeDate,
  onSubmitForm,
}) {
  useInjectReducer({ key: 'adminPage', reducer });
  useInjectSaga({ key: 'adminPage', saga });

  const [assignSelection, setAssignSelection] = useState({
    rooms: [],
    tasks: [],
    date,
  });

  const [assignCheck, setAssignCheck] = useState({
    roomsChecked: false,
    tasksChecked: false,
  });

  useEffect(() => {
    // calls to get rooms / tasks data from api
    // recall if date from props changes
    initRooms();
    initTasks();
  }, [date]);

  useEffect(() => {
    // second useEffect checks if rooms and tasks pulled from api have already an assignment
    // :todo: rework rooms structure ?
    if (Object.keys(rooms).length > 0 && !assignCheck.roomsChecked) {
      checkRoomsForEdition(rooms);
    }
    if (tasks.length > 0 && !assignCheck.tasksChecked) {
      checkTasksForEdition(tasks);
    }
  }, [rooms, tasks]);

  /**
   * checkRoomsForEdition
   * @description if item has an assignment push items to state's rooms/tasks stack
   * @param {Array} rooms
   */
  const checkRoomsForEdition = zones => {
    // :todo: improve double loop
    const roomsToEdit = [];
    Object.keys(zones).forEach(key => {
      zones[key].items.forEach(item => {
        if ('assignment' in item) roomsToEdit.push(item.assignment.rooms);
      });
    });
    if (roomsToEdit.length > 0) {
      setAssignSelection({ ...assignSelection, rooms: roomsToEdit });
    }
    setAssignCheck({ ...assignCheck, roomsChecked: true });
  };

  /**
   * checkTasksForEdition
   * @description same as checkRoomsForEdition but with tasks and their daily logic
   * @param {Array} tasks
   */
  const checkTasksForEdition = items => {
    const tasksToEdit = [];
    items.forEach(item => {
      if ('assignment' in item) tasksToEdit.push(item.assignment.tasks);
    });
    // if there's no tasks/rooms assigned its a new day then we check for daily tasks
    if (assignSelection.rooms.length === 0 && tasksToEdit.length === 0) {
      items.forEach(item => {
        if (!item.isDaily) return;
        // if its daily we push to task array the default task object
        tasksToEdit.push({
          ...item,
          assignKey: 1,
          type: 'tasks',
        });
      });
    }

    if (tasksToEdit.length > 0) {
      setAssignSelection({ ...assignSelection, tasks: tasksToEdit });
    }
    setAssignCheck({ ...assignCheck, tasksChecked: true });
  };

  /**
   * updateAssignList
   * @description push new items to state rooms/tasks stack (assignment list)
   * and also updates them with their new status
   * @param {Array} item
   */
  const updateAssignList = item => {
    let newItemToAssign;
    if (item.type === 'rooms') {
      newItemToAssign = assignSelection.rooms;
    } else {
      newItemToAssign = assignSelection.tasks;
    }
    const wasFounded = newItemToAssign.find((o, i) => {
      if (o._id === item._id) {
        newItemToAssign[i] = item;
        if (item.assignKey === 0) {
          newItemToAssign.splice(i, 1);
        }
        return true; // stop searching
      }
      return false;
    });
    if (!wasFounded && item.assignKey !== 0) {
      newItemToAssign.push(item);
    }
    setAssignSelection({ ...assignSelection, [item.type]: newItemToAssign });
  };
  const handleDateChange = newDate => {
    // when date changes clean rooms already assigned and items checks
    setAssignSelection({
      rooms: [],
      tasks: [],
      date: newDate,
    });
    // when date changes reset room/task check status
    setAssignCheck({
      roomsChecked: false,
      tasksChecked: false,
    });

    onChangeDate(newDate);
  };

  return (
    <article>
      <Helmet>
        <title>AdminPage</title>
        <meta name="description" content="Admin page room tracker" />
      </Helmet>
      <H1>Room assignment</H1>
      <section>
        <DateForm onChangeCallback={handleDateChange} defaultValue={date} />
        <Button onClick={() => onClickButton(assignSelection)}>
          Save assignment
        </Button>
      </section>
      <section>
        <H2>Tasks</H2>
        <TaskListWrapper>
          <TaskForm onSubmitForm={onSubmitForm} />
          <TaskList
            items={tasks}
            parentAction={updateAssignList}
            isAssignment
          />
        </TaskListWrapper>
        <H2>Rooms</H2>
        <RoomZones
          component={AdminRoomList}
          zones={rooms}
          isAssignment
          parentAction={updateAssignList}
        />
      </section>
    </article>
  );
}

AdminPage.propTypes = {
  rooms: PropTypes.object,
  tasks: PropTypes.array,
  date: PropTypes.string,
  initRooms: PropTypes.func,
  initTasks: PropTypes.func,
  onClickButton: PropTypes.func,
  onChangeDate: PropTypes.func,
  onSubmitForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  rooms: makeSelectRooms(),
  tasks: makeSelectTasks(),
  date: makeSelectDate(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAssignment: () => dispatch(loadAssignment(true)),
    onClickButton: assignSelection => {
      dispatch(setAssignment(assignSelection));
    },
    initRooms: () => {
      dispatch(loadRooms());
    },
    initTasks: () => {
      dispatch(loadTasks());
    },
    onSubmitForm: task => {
      dispatch(addTask(task));
    },
    onChangeDate: date => {
      dispatch(changeDate(date));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AdminPage);

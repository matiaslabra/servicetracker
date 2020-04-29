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

import { changeDate, loadRooms, loadTasks, setAssignment } from './actions';

import H1 from '../../../components/H1';
import H2 from '../../../components/H2';
import Button from '../../../components/Button';
import RoomZones from '../../../components/RoomZones';
import DateForm from '../../DateForm';
import AdminTaskSection from '../AdminTaskSection/Loadable';
import AdminRoomList from '../AdminRoomList';
import Box from '../../../components/Box';

export function AdminPage({
  rooms,
  date,
  initRooms,
  initTasks,
  tasks,
  saveAssignment,
  onChangeDate,
}) {
  useInjectReducer({ key: 'adminPage', reducer });
  useInjectSaga({ key: 'adminPage', saga });

  const [itemSelection, setItemSelection] = useState({
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
    // console.log(rooms);
    initRooms();
    initTasks();
  }, [date]);

  useEffect(() => {
    // second useEffect checks if rooms and tasks pulled from api have already an assignment
    // :todo: rework rooms structure ?
    if (Object.keys(rooms).length > 0 && !assignCheck.roomsChecked) {
      checkRoomsForEdition(rooms);
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
      setItemSelection({ ...itemSelection, rooms: roomsToEdit });
    }
    setAssignCheck({ ...assignCheck, roomsChecked: true });
  };

  /**
   * updateAssignList
   * @description push new items to state rooms/tasks stack (assignment list)
   * and also updates them with their new status
   * @param {Array} item
   */
  const updateAssignList = items => {
    let newItemToAssign;
    items.forEach(item => {
      if (item.type === 'rooms') {
        newItemToAssign = itemSelection.rooms;
      } else {
        newItemToAssign = itemSelection.tasks;
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
      setItemSelection({ ...itemSelection, [item.type]: newItemToAssign });
    });
  };
  const handleDateChange = newDate => {
    // when date changes clean rooms already assigned and items checks
    setItemSelection({
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
      <H1>Items assignment</H1>
      <Box>
        <DateForm onChangeCallback={handleDateChange} defaultValue={date} />
        <Button onClick={() => saveAssignment(itemSelection)}>
          Save assignment
        </Button>
      </Box>
      <section>
        <H2>Tasks</H2>
        <AdminTaskSection items={tasks} parentAction={updateAssignList} />
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
  // loading: PropTypes.bool,
  rooms: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
  initRooms: PropTypes.func.isRequired,
  initTasks: PropTypes.func.isRequired,
  saveAssignment: PropTypes.func.isRequired,
  onChangeDate: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  rooms: makeSelectRooms(),
  tasks: makeSelectTasks(),
  date: makeSelectDate(),
  // loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    saveAssignment: itemSelection => {
      dispatch(setAssignment(itemSelection));
    },
    initRooms: () => {
      dispatch(loadRooms());
    },
    initTasks: () => {
      dispatch(loadTasks());
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

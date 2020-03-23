/**
 *
 * AdminPage
 *
 */

import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect, batch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectRooms,makeSelectTasks, makeSelectDate } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { setAssignment} from '../App/actions';
import { changeDate, loadRooms, loadTasks, addTask} from '../AdminPage/actions';
import { loadAssignment } from '../App/actions';

import H1 from '../../components/H1';
import H2 from '../../components/H2';
import Button from '../../components/Button';
import TaskListWrapper from './TaskListWrapper'


import TaskList from '../../components/TaskList';
import RoomList from '../../components/RoomList';

export function AdminPage({
  rooms,
  date,
  initRooms,
  initTasks,
  tasks,
  onClickButton,
  onChangeDate,
  onSubmitForm,
}){
  useInjectReducer({ key: 'adminPage', reducer });
  useInjectSaga({ key: 'adminPage', saga })

  const [assignSelection, setAssignSelection] = useState({
    rooms: [],
    tasks: [],
    date: date
  });

  const [itemCheck, setItemCheck] = useState({
    roomsChecked: false,
    tasksChecked: false
  })

  useEffect(() => {
    // calls to get rooms / tasks data from api
    // recall if date from props changes
    batch(() => {
      initRooms();
      initTasks();
    })
  },[date]);

  useEffect(() => {
    // second useEffect checks if rooms and tasks pulled from api have already an assigment
    if(rooms.length > 0 && !itemCheck.roomsChecked){
      _checkRoomsForEdition(rooms);
    }
    if(tasks.length > 0 && !itemCheck.tasksChecked){
      _checkTasksForEdition(tasks);
    }
  },[rooms, tasks]);
    console.log('rooms in page', rooms);

  /**
   * _checkRoomsForEdition
   * @description if item has an assigment push items to state's rooms/tasks stack
   * @param {Array} rooms
   */
  const _checkRoomsForEdition = rooms => {
    let roomsToEdit = [];
    rooms.map( item => {
      if('assignment' in item){
        roomsToEdit.push(item.assignment.rooms)
      }
    })
    if(roomsToEdit.length > 0){
      setAssignSelection({...assignSelection, rooms:roomsToEdit});
    }
    setItemCheck({...itemCheck, roomsChecked: true});
  }

  /**
   * _checkTasksForEdition
   * @description same as _checkRoomsForEdition but with tasks and their daily logic
   * @param {Array} tasks
   */
  const _checkTasksForEdition = tasks => {
    let tasksToEdit = [];
    tasks.map( item => {
      if('assignment' in item ){
        tasksToEdit.push(item.assignment.tasks)
      }
      // if there's no tasks/rooms assigment its a new day then check for daily tasks
      if(assignSelection.rooms.length === 0 && tasksToEdit.length === 0){
        if(item.isDaily){
          // if its daily we push to task array the default task object
          tasksToEdit.push({...item, task: item._id, assignKey: 1, type: 'tasks'})
        }
      }
    })
    // console.log('tasksToEdit', tasksToEdit);
    if(tasksToEdit.length > 0){
      setAssignSelection({...assignSelection, tasks:tasksToEdit});
    }
    setItemCheck({...itemCheck, tasksChecked: true});  }

  /**
   * updateAssignList
   * @description push new items to state rooms/tasks stack (assignment list)
   * and also updates them with their new status
   * @param {Array} item
   */
  const updateAssignList = item => {
    let newItemToAssign;
    if(item.type == 'rooms'){
      newItemToAssign = assignSelection.rooms;
    }else{
      newItemToAssign = assignSelection.tasks;
    }
    let wasFounded = false;
    wasFounded = newItemToAssign.find((o, i) => {
      if (o._id === item._id) {
        newItemToAssign[i] = item;
        if(item.assignKey == 0){
          newItemToAssign.splice(i, 1);
        }
        return true; // stop searching
      }
    });
    if(!wasFounded && item.assignKey != 0){
      newItemToAssign.push(item);
    }
    setAssignSelection({...assignSelection, [item.type] : newItemToAssign});
  }
  const _onChangeDate = (evt) => {
    let newDate = evt.target !== undefined ? evt.target.value : evt;
    //when date changes clean rooms already assigned and items checks
    setAssignSelection({
      rooms: [],
      tasks: [],
      date: newDate
    });
    //when date changes item's check status
    setItemCheck({
      roomsChecked: false,
      tasksChecked: false
    })

    onChangeDate(newDate);
  }

  const _onSubmit = (evt) => {
    let task = evt.target.value ? evt.target.value : evt.target.querySelector('input').value;
    if(task !== ''){
      onSubmitForm(task); // submitting
      evt.target.reset(); // clear input
    }
  }
  return (
    <article>
      <Helmet>
        <title>AdminPage</title>
        <meta name="description" content="Admin page room tracker" />
      </Helmet>
      <section>
        <H1>Room assignment</H1>
        <span><input type="date" onChange={_onChangeDate} defaultValue={assignSelection.date}/></span>
        <Button onClick={()=>onClickButton(assignSelection)}>Save assignment</Button>
      </section>
      <section>
        <H2>Tasks</H2>
        <TaskListWrapper>
          <form
            onSubmit={evt => {
              evt.preventDefault()
              _onSubmit(evt)
            }}
          >
            <input placeholder='Enter new task'/>
            <input type="submit" value="Add"/>
          </form>
        <TaskList
          items = {tasks}
          clickAction = {updateAssignList}
          action = {updateAssignList}
          isAssignment={ true }
        />
        </TaskListWrapper>
        <H2>Rooms</H2>
        <RoomList
          items = {rooms}
          action = {updateAssignList}
          isAssignment= { true }
          hasMultipleSet = { true }
        />
      </section>
    </article>
  );
}

AdminPage.propTypes = {
  rooms: PropTypes.array,
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
    onClickButton: assignSelection => {dispatch(setAssignment(assignSelection))},
    initRooms: () => {dispatch(loadRooms())},
    initTasks: () => {dispatch(loadTasks())},
    onSubmitForm: task => {dispatch(addTask(task))},
    onChangeDate: date => {dispatch(changeDate(date))}
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AdminPage);

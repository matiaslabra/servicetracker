/**
 *
 * AdminPage
 *
 */

import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
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

import MultipleComponents from '../../components/RoomList';
import H1 from '../../components/H1';
import H2 from '../../components/H2';
import Button from '../../components/Button';
import TaskSection from './TaskSection'


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
    date: date,
    roomsChecked: false,
    tasksChecked: false
  });

  useEffect(() => {
    // calls to get rooms / tasks data from api
    // recall if date from props changes
    initRooms();
    initTasks();
  },[date]);

  useEffect(() => {
    // second useEffect checks if rooms and tasks pulled from api have already an assigment
    if(rooms.length > 0 && !assignSelection.roomsChecked){
      _checkRoomsForEdition(rooms);
    }
    if(tasks.length > 0 && !assignSelection.tasksChecked){
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
    setAssignSelection({...assignSelection, rooms:roomsToEdit, roomsChecked: true});
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
    setAssignSelection({...assignSelection, tasks:tasksToEdit, tasksChecked: true});
  }

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
      roomsChecked: false,
      tasksChecked: false,
      date: newDate
    });

    onChangeDate(newDate);
  }

  const _onSubmit = (evt) => {
    let task = evt.target.value ? evt.target.value : evt.target.querySelector('input').value;
    if(task !== ''){
      onSubmitForm(task); //submiting
      evt.target.reset(); // clear input
    }
  }
  return (
    <article>
      <Helmet>
        <title>AdminPage</title>
        <meta name="description" content="Admin page room tracker" />
      </Helmet>
      {/* <FormattedMessage {...messages.header} /> */}
      <section>
        <H1>Room assignment</H1>
        <span><input type="date" onChange={_onChangeDate} defaultValue={assignSelection.date}/></span>
        <Button onClick={()=>onClickButton(assignSelection)}>Save assignment</Button>
      </section>
      <section>
        <TaskSection>
          <form
            onSubmit={evt => {
              evt.preventDefault()
              _onSubmit(evt)
            }}
          >
            <input placeholder='Enter new task'/>
            <input type="submit" value="Add"/>
          </form>
          {/* <TaskList
            items={tasks}
            clickAction = {updateAssignList}
            isAssignment={true}
            isHousekeeping={ false }
          /> */}
        <TaskList
          items = {tasks}
          clickAction = {updateAssignList}
          action = {updateAssignList}
          isAssignment={ true }
        />
        </TaskSection>
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
    initRooms: evt => {dispatch(loadRooms())},
    initTasks: evt => {dispatch(loadTasks())},
    onSubmitForm: task => {dispatch(addTask(task))},
    onChangeDate: date => {dispatch(changeDate(date))}
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AdminPage);

/**
 *
 * AdminPage
 *
 */

import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectRooms,makeSelectTasks, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { setAssignment} from '../App/actions';
import { changeDate, loadRooms, loadTasks, addTask} from '../AdminPage/actions';

import AssignmentList from '../../components/AssignmentList';
import H1 from '../../components/H1';
import H2 from '../../components/H2';
import TaskSection from './TaskSection'
import TaskList from '../../components/TaskList';

export function AdminPage({
  rooms,
  initRooms,
  initTasks,
  tasks,
  onClickButton,
  onChangeDate,
  onSubmitForm
}){
  useInjectReducer({ key: 'adminPage', reducer });
  useInjectSaga({ key: 'adminPage', saga })

  const [assignSelection, setAssignSelection] = useState({
    rooms: [],
    tasks: [],
    date: new Date().toISOString().slice(0,10)
  });

  useEffect(() => {
    initTasks();
    initRooms();
  },[]);

  const updateAssignList = (item) => {
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
    if(!wasFounded){
      newItemToAssign.push(item);
    }
    console.log('newItemToAssign', newItemToAssign);
    setAssignSelection({...assignSelection, [item.type] : newItemToAssign});
  }

  const _onSubmit = (evt) => {
    let task = evt.target.value ? evt.target.value : evt.target.querySelector('input').value;
    if(task !== ''){
      onSubmitForm(task);
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
        <span><input type="date" onChange={onChangeDate} defaultValue={assignSelection.date}/></span>
        <span><button onClick={()=>onClickButton(assignSelection)}>Save</button></span>
      </section>
      <div>
      <H2>Tasks</H2>
      <TaskSection>
        <form
          onSubmit={evt => {
              evt.preventDefault()
              _onSubmit(evt)
          }}
        >
          <input
              placeholder='Enter new task'
          />
          <input type="submit" value="Add"/>
        </form>


        <TaskList
          items={tasks}
          clickAction = {updateAssignList}
          isAssignment={true}
          isHousekeeping={ false }
        />
      </TaskSection>
      <AssignmentList
        roomsList= {rooms}
        action = {updateAssignList}
        isAssignment={ true }
      />
      </div>
    </article>
  );
}

AdminPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  rooms: makeSelectRooms(),
  tasks: makeSelectTasks(),
});

function mapDispatchToProps(dispatch) {
  return {
    onClickButton: assignSelection => {dispatch(setAssignment(assignSelection))},
    initRooms: evt => {dispatch(loadRooms())},
    initTasks: evt => {dispatch(loadTasks())},
    onSubmitForm: task => {dispatch(addTask(task))},
    onChangeDate: evt => {
      if (evt.target !== undefined){
        dispatch(changeDate(evt.target.value))
      }else{
        dispatch(changeDate(evt));
      }
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AdminPage);

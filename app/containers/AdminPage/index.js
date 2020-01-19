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
import moment from 'moment';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectRooms,makeSelectTasks, makeSelectDate } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { setAssignment} from '../App/actions';
import { changeDate, loadRooms, loadTasks, addTask} from '../AdminPage/actions';
import { loadAssignment } from '../App/actions';

import AssignmentList from '../../components/AssignmentList';
import H1 from '../../components/H1';
import H2 from '../../components/H2';
import TaskSection from './TaskSection'
import TaskList from '../../components/TaskList';

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
    date: moment().format('YYYY-MM-DD')
  });
  useEffect(() => {
    if(assignSelection.date != date){
      initTasks();
      initRooms();
    }

  },);

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
    if(!wasFounded && item.assignKey != 0){
      newItemToAssign.push(item);
    }
    console.log('newItemToAssign', newItemToAssign);
    setAssignSelection({...assignSelection, [item.type] : newItemToAssign});
  }
  const _onChangeDate = (evt) => {
    let newDate = evt.target !== undefined ? evt.target.value : evt;
    // setAssignSelection({...assignSelection, [item.type] : newItemToAssign});

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

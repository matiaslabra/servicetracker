/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import {setAssignmentDone, setAssignmentError } from 'containers/App/actions';
import {
  roomsLoaded,
  roomsLoadedError,
  tasksLoaded,
  tasksLoadedError,
  taskCreated
} from 'containers/AdminPage/actions';

import request from 'utils/request';
import { makeSelectAssignment,  } from 'containers/App/selectors';
import { SET_ASSIGNMENT, SET_ASSIGNMENT_SUCCESS } from '../App/constants';
import {
  LOAD_TASKS,
  LOAD_ROOMS,
  ADD_NEW_TASK
} from '../AdminPage/constants';

import {createNotification, NOTIFICATION_TYPE_SUCCESS} from 'react-redux-notify';


/**
 * Github repos request/response handler
 */
export function* setAssignmentSuccess() {
  const mySuccessNotification = {
    message: 'Assignment set successfully',
    type: NOTIFICATION_TYPE_SUCCESS,
    duration: 3500,
    canDismiss: true,
  }

  yield put(createNotification(mySuccessNotification))
}
export function* setAssignment() {
  // Select username from store
  const assignment = yield select(makeSelectAssignment());
  // const baseURL = `http://localhost:4001/api`;
  const requestURL = `/api/assignment`;

  try {
    // Call our request helper (see 'utils/request')
    yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(assignment),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    // yield put(roomsAssigned(repos));
    yield put(setAssignmentDone());
  } catch (err) {
    console.log(err);
    yield put(setAssignmentError(err));
  }
}

export function* getRooms() {

  //  const baseURL = `http://localhost:4001/api`;
   const requestURL = `/api/room`;

   try {
     // Call our request helper (see 'utils/request')
     const rooms = yield call(request, requestURL, {
       method: 'GET',
       mode: 'cors',
       headers: {
         'Content-Type': 'application/json'
         // 'Content-Type': 'application/x-www-form-urlencoded',
       }
     });
     // yield put(roomsAssigned(repos));
     yield put(roomsLoaded(rooms));
   } catch (err) {
     console.log(err);
    //  yield put(roomsLoadedError(err));
   }
}
export function* getTasks() {
  const baseURL = `http://localhost:4001/api`;
  const requestURL = `/api/task`;

  try {
    // Call our request helper (see 'utils/request')
    const tasks = yield call(request, requestURL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    // yield put(roomsAssigned(repos));
    yield put(tasksLoaded(tasks));
  } catch (err) {
    console.log(err);
    // yield put(tasksLoadedError(err));
  }
}

export function* createTask(action) {
  const baseURL = `http://localhost:4001/api`;
  const requestURL = `/api/task`;
  console.log('<saga> create new task with :', action.task)
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    // yield put(roomsAssigned(repos));
    yield put(taskCreated(response.task));
  } catch (err) {
    console.log(err);
    // yield put(tasksLoadedError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* roomsData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SET_ASSIGNMENT, setAssignment);
  yield takeLatest(LOAD_TASKS, getTasks);
  yield takeLatest(LOAD_ROOMS, getRooms);
  yield takeEvery(SET_ASSIGNMENT_SUCCESS, setAssignmentSuccess);
  yield takeEvery(ADD_NEW_TASK, createTask);
}

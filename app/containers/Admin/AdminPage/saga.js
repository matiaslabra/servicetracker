/**
 *
 */

import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import {
  createNotification,
  removeAllNotifications,
  NOTIFICATION_TYPE_SUCCESS,
  NOTIFICATION_TYPE_INFO,
} from 'react-redux-notify';
import request from 'utils/request';
import { makeSelectDate, makeSelectAssignmentProp } from './selectors';
import {
  assignmentChecked,
  roomsLoaded,
  roomsLoadedError,
  tasksLoaded,
  tasksLoadedError,
  taskCreated,
  setAssignmentDone,
  setAssignmentError,
} from './actions';

import {
  LOAD_TASKS,
  LOAD_ROOMS,
  ADD_NEW_TASK,
  CHECK_ASSIGNMENT,
  SET_ASSIGNMENT,
} from './constants';

export function* setAssignment() {
  // Select username from store
  const assignment = yield select(makeSelectAssignmentProp());
  const requestURL = `/api/assignment`;

  try {
    const infoNotification = {
      message: 'Uploading Assignment',
      type: NOTIFICATION_TYPE_INFO,
      canDismiss: false,
    };

    yield put(createNotification(infoNotification));

    yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(assignment),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    yield put(setAssignmentDone());
    const successNotification = {
      message: 'Assignment set successfully',
      type: NOTIFICATION_TYPE_SUCCESS,
      duration: 3000,
      canDismiss: true,
    };

    yield put(removeAllNotifications(true));
    yield put(createNotification(successNotification));
  } catch (err) {
    // console.log(err);
    yield put(setAssignmentError(err));
  }
}

export function* checkAssignment() {
  const date = yield select(makeSelectDate());
  const requestURL = `/api/assignment/id?date=${date}`;

  try {
    // Call our request helper (see 'utils/request')
    const assignment = yield call(request, requestURL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(assignmentChecked(assignment._id));
  } catch (err) {
    console.log(err);
  }
}
export function* getRooms() {
  const date = yield select(makeSelectDate());
  const requestURL = `/api/room?date=${date}`;

  try {
    // Call our request helper (see 'utils/request')
    const rooms = yield call(request, requestURL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    if (rooms) {
      yield put(roomsLoaded(rooms));
    }
  } catch (err) {
    // console.log(err);
    yield put(roomsLoadedError(err));
  }
}
export function* getTasks() {
  const date = yield select(makeSelectDate());
  const requestURL = `/api/task?date=${date}`;

  try {
    // Call our request helper (see 'utils/request')
    const tasks = yield call(request, requestURL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    // yield put(roomsAssigned(repos));
    yield put(tasksLoaded(tasks));
  } catch (err) {
    // console.log(err);
    yield put(tasksLoadedError(err));
  }
}

export function* createTask(action) {
  const requestURL = `/api/task`;
  // console.log('<saga> create new task with :', action.task)
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    // yield put(roomsAssigned(repos));
    yield put(taskCreated(response.task));
  } catch (err) {
    // console.log(err);
    // yield put(taskCreateError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* adminPageSagas() {
  yield takeEvery(ADD_NEW_TASK, createTask);
  yield takeEvery(SET_ASSIGNMENT, setAssignment);
  yield takeEvery(LOAD_ROOMS, getRooms);
  yield takeEvery(LOAD_TASKS, getTasks);
  yield take(CHECK_ASSIGNMENT, yield call(checkAssignment));
}

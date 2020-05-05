/**
 *
 */

import {
  call,
  put,
  select,
  take,
  takeLatest,
  fork,
  all,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';

import { makeSelectAssignment } from '../../App/selectors';
import { SET_ITEM_TO_UPDATE } from './constants';
import { LOAD_ASSIGNMENT } from '../../App/constants';
import {
  assignmentLoaded,
  updateAssignmentRoomDone,
  updateAssignmentTaskDone,
} from '../../App/actions';

import { makeSelectUpdatedItem, makeSelectDate } from './selectors';
import request from '../../../utils/request';

/**
 * Socket handler
 */

function connect() {
  const socket = io('/');
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

export function* subscribe(socket) {
  // eslint-disable-next-line new-cap
  return new eventChannel(emit => {
    const updateAssignment = data => {
      if (data.item.type === 'rooms') {
        return emit(updateAssignmentRoomDone(data.item));
      }
      return emit(updateAssignmentTaskDone(data.item));
    };
    socket.on('assignment-items', updateAssignment);
    return () => {
      // socket.off('assignment-items');
    };
  });
}

export function* socketWrite(socket) {
  while (true) {
    const { item } = yield take(SET_ITEM_TO_UPDATE);
    socket.emit('update-item', item);
  }
}

function* socketRead(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export function* getAssignment() {
  // Select date from store
  const viewDate = yield select(makeSelectDate());
  const requestURL = `api/assignment?date=${viewDate}`;

  try {
    // Call our request helper (see 'utils/request')
    const assignment = yield call(request, requestURL, {
      method: 'GET',
    });
    // yield put(roomsAssigned(repos));
    yield put(assignmentLoaded(assignment));
  } catch (err) {
    // yield put(roomsAssignedError(err));
  }
}

/**
 * HomePage assignment handler
 */

export function* updateItemAssigned() {
  // Select item to update from HomePage reducer
  const itemToUpdate = yield select(makeSelectUpdatedItem());
  const assignment = yield select(makeSelectAssignment());
  const requestURL = `api/assignment/item`;

  try {
    // We don't wait for api to change it, item is updated right away
    if (itemToUpdate.type === 'rooms') {
      yield put(updateAssignmentRoomDone(itemToUpdate));
    } else {
      yield put(updateAssignmentTaskDone(itemToUpdate));
    }

    yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify({
        item: itemToUpdate,
        assignmentId: assignment.id,
      }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  } catch (err) {
    // console.log(err);
  }
}
function* watchGetAssignment() {
  yield takeLatest(LOAD_ASSIGNMENT, getAssignment);
}

function* watchItemUpdate() {
  yield takeLatest(SET_ITEM_TO_UPDATE, updateItemAssigned);
}

/**
 * Home Root saga manages watcher lifecycle
 */
export default function* homePageSagas() {
  yield all([fork(watchGetAssignment), fork(watchItemUpdate)]);
  const socket = yield call(connect);
  yield fork(socketRead, socket);
  yield fork(socketWrite, socket);
}

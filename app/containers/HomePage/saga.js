/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, take, takeEvery, takeLatest, fork } from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import { SET_ITEM_TO_UPDATE } from 'containers/HomePage/constants';
import { makeSelectAssignment, makeSelectDate } from 'containers/App/selectors';
import {updateAssignmentRoomDone, updateAssignmentTaskDone } from 'containers/App/actions';
import { makeSelectUpdatedItem  } from 'containers/HomePage/selectors';
import request from 'utils/request';
import io from 'socket.io-client';

/**
 * Socket handler
 */

function connect() {
  const socket = io('/');
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
      console.log("Socket connected");
    });
  });
}

export function* subscribe(socket) {
  return new eventChannel(emit => {
    const updateAssignment = data => {
      console.log("listened data", data);
      if(data.item.type == 'rooms'){
        return emit(updateAssignmentRoomDone(data.item));
      }else{
        return emit(updateAssignmentTaskDone(data.item));
      }
    }
    console.log("socket listening on assignment-items");
    socket.on('assignment-items', updateAssignment)
    return () => {
      // socket.off(‘newTask’, handler);
    };
  })
}

export function* socketWrite(socket) {

  while (true) {
    const {item} = yield take(SET_ITEM_TO_UPDATE)
    socket.emit('update-item', item)
  }
}

function* socketRead(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    console.log("action",action);
    yield put(action);
  }
}


/**
 * HomePage assignment handler
 */

export function* updateItemAssigned() {
  // Select item to update from HomePage reducer
  const itemToUpdate = yield select(makeSelectUpdatedItem());
  const assignment = yield select(makeSelectAssignment());
  // const baseURL = `http://localhost:4001/api`;
  // const baseURL = `http://169.254.220.17:4001/api`;
  const requestURL = `api/assignment/item`;

  try {
    // We dont wait for our local changes item is updated right away
    if(itemToUpdate.type == 'rooms'){
      yield put(updateAssignmentRoomDone(itemToUpdate));
    }else{
      yield put(updateAssignmentTaskDone(itemToUpdate));
    }

    yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify({
        item: itemToUpdate,
        assignment_id: assignment.id
      }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    // yield put(roomsAssigned(repos));

  } catch (err) {
    console.log(err);
    // yield put(roomsAssignedError(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* roomsAssignedData() {

  yield takeLatest(SET_ITEM_TO_UPDATE, updateItemAssigned);
  const socket = yield call(connect)
  yield fork(socketRead, socket)
  yield fork(socketWrite, socket)
  // yield takeLatest(GET_ROOMS, getRooms);
}

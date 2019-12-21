/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, take, takeLatest, fork } from 'redux-saga/effects';
import {eventChannel} from 'redux-saga'
import { LOAD_ASSIGNMENT } from 'containers/App/constants';
import { SET_ITEM_TO_UPDATE } from 'containers/HomePage/constants';
import { assignmentLoaded, updateAssignmentRoomDone, updateAssignmentTaskDone  } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectAssignment,  } from 'containers/App/selectors';
import { makeSelectUpdatedItem,  } from 'containers/HomePage/selectors';

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
      if(data.item.type == 'room'){
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
    console.log("socketWrite ",item);
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

export function* getAssignment() {
  // Select username from store
  // const rooms = yield select(makeSelectAssignedRooms());
  // const baseURL = `http://localhost:4001/api`;
  // const baseURL = `http://169.254.220.17:4001/api`;
  const requestURL = `api/assignment`;

  try {
    // Call our request helper (see 'utils/request')
    const assignment = yield call(request, requestURL, {
      method: 'GET',
    });
    // yield put(roomsAssigned(repos));
    yield put(assignmentLoaded(assignment));
  } catch (err) {
    console.log(err);
    // yield put(roomsAssignedError(err));
  }
}

export function* updateItemAssigned() {
  // Select item to update from HomePage reducer
  const itemToUpdate = yield select(makeSelectUpdatedItem());
  const assignment = yield select(makeSelectAssignment());
  // const baseURL = `http://localhost:4001/api`;
  // const baseURL = `http://169.254.220.17:4001/api`;
  const requestURL = `api/assignment/item`;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, {
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
    if(itemToUpdate.type == 'room'){
      yield put(updateAssignmentRoomDone(response.item));
    }else{
      yield put(updateAssignmentTaskDone(response.item));
    }
  } catch (err) {
    console.log(err);
    // yield put(roomsAssignedError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* roomsAssignedData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_ASSIGNMENT, getAssignment);
  yield takeEvery(SET_ITEM_TO_UPDATE, updateItemAssigned);
  const socket = yield call(connect)
  yield fork(socketRead, socket)
  yield fork(socketWrite, socket)
  // yield takeLatest(GET_ROOMS, getRooms);
}

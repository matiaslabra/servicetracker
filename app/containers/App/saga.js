import { call, put, select, take, takeEvery, takeLatest, fork } from 'redux-saga/effects';
import { LOAD_ASSIGNMENT, CHANGE_DATE } from 'containers/App/constants';
import { assignmentLoaded } from 'containers/App/actions';
import request from 'utils/request';
import { makeSelectAssignment, makeSelectDate } from 'containers/App/selectors';

export function* getAssignment() {
  // Select date from store
  const date = yield select(makeSelectDate());
  // const baseURL = `http://localhost:4001/api`;
  // const baseURL = `http://169.254.220.17:4001/api`;
  const requestURL = `api/assignment?date=` + date;

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

export default function* assignationData() {
  yield takeLatest(CHANGE_DATE, getAssignment);
  yield takeLatest(LOAD_ASSIGNMENT, getAssignment);
}

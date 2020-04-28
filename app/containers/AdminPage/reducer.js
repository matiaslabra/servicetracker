/*
 *
 * AdminPage reducer
 *
 */
import produce from 'immer';
import moment from 'moment';

import {
  CHANGE_DATE,
  LOAD_ROOMS,
  LOAD_ROOMS_SUCCESS,
  ADD_NEW_TASK,
  ADD_NEW_TASK_SUCCESS,
  LOAD_TASKS,
  LOAD_TASKS_SUCCESS,
} from './constants';

export const initialState = {
  date: moment().format('YYYY-MM-DD'),
  rooms: {},
  tasks: [],
  loading: false,
  error: false,
};
/* eslint-disable default-case, no-param-reassign */
const adminPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_DATE:
        draft.date = action.date;
        draft.tasks = [];
        draft.rooms = [];
        break;
      case LOAD_ROOMS:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_ROOMS_SUCCESS:
        draft.rooms = action.rooms;
        draft.loading = false;
        break;
      case LOAD_TASKS:
        draft.loading = true;
        draft.error = false;
        break;
      case ADD_NEW_TASK:
        draft.loading = true;
        draft.error = false;
        break;
      case ADD_NEW_TASK_SUCCESS:
        draft.tasks.push(action.task);
        draft.loading = false;
        break;
      case LOAD_TASKS_SUCCESS:
        draft.tasks = action.tasks;
        draft.loading = false;
        break;
    }
  });

export default adminPageReducer;

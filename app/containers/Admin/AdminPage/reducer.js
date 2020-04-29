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
  CHECK_ASSIGNMENT,
  CHECK_ASSIGNMENT_SUCCESS,
  SET_ASSIGNMENT,
  SET_ASSIGNMENT_SUCCESS,
  SET_ASSIGNMENT_ERROR,
} from './constants';

export const initialState = {
  date: moment().format('YYYY-MM-DD'),
  assignment: {
    _id: undefined,
    proposal: {},
  },
  rooms: {},
  tasks: [],
  loading: false,
  error: false,
};
/* eslint-disable default-case, no-param-reassign */
const adminPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHECK_ASSIGNMENT:
      case LOAD_ROOMS:
      case LOAD_TASKS:
        draft.loading = true;
        draft.error = false;
        break;
      case CHANGE_DATE:
        draft.date = action.date;
        draft.tasks = [];
        draft.rooms = {};
        break;
      case CHECK_ASSIGNMENT_SUCCESS:
        draft.loading = true;
        draft.loading = true;
        draft.assignment._id = action.id;
        break;
      case LOAD_ROOMS_SUCCESS:
        draft.rooms = action.rooms;
        draft.loading = false;
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
      case SET_ASSIGNMENT:
        console.log('reducer called');
        draft.isLoading = true;
        draft.error = false;
        draft.assignment.proposal.date = action.assignment.date;
        draft.assignment.proposal.rooms = action.assignment.rooms;
        draft.assignment.proposal.tasks = action.assignment.tasks;
        break;
      case SET_ASSIGNMENT_SUCCESS:
        // if assignment is successfully created we clean the assignment object
        draft.isLoading = false;
        draft.error = false;
        draft.assignment.proposal.tasks = [];
        draft.assignment.proposal.rooms = [];
        draft.assignment.proposal.date = '';
        break;
      case SET_ASSIGNMENT_ERROR:
        draft.isLoading = false;
        draft.error = action.error;
        break;
      default:
    }
  });

export default adminPageReducer;

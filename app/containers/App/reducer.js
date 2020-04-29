/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';

import {
  UPDATED_ASSIGNED_ITEM,
  UPDATED_ASSIGNED_TASK_SUCCESS,
  UPDATED_ASSIGNED_ROOM_SUCCESS,
  LOAD_ASSIGNMENT,
  LOAD_ASSIGNMENT_SUCCESS,
  LOAD_ASSIGNMENT_ERROR,
} from './constants';

export const initialState = {
  assignment: {
    id: '',
    rooms: {},
    tasks: [],
    date: '',
    updated: '',
  },
  isLoading: false,
  error: false,
};

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ASSIGNMENT:
        draft.isLoading = true;
        draft.error = false;
        break;
      case LOAD_ASSIGNMENT_ERROR:
        draft.isLoading = false;
        draft.error = action.error;
        break;
      case LOAD_ASSIGNMENT_SUCCESS:
        draft.isLoading = false;
        draft.error = false;
        draft.assignment.id = action.assignment._id;
        draft.assignment.rooms = action.assignment.rooms;
        draft.assignment.tasks = action.assignment.tasks;
        draft.assignment.date = action.assignment.date;
        draft.date = action.assignment.date;
        break;
      case UPDATED_ASSIGNED_ITEM:
        draft.isLoading = true;
        draft.error = false;
        break;
      case UPDATED_ASSIGNED_TASK_SUCCESS:
        // if someone updates an item from a different assignment date
        if (draft.assignment.date === action.task.date) {
          draft.assignment.tasks[
            draft.assignment.tasks.findIndex(
              task => task._id === action.task._id,
            )
          ].hkKey = action.task.hkKey;
        }
        // }
        draft.isLoading = false;
        break;
      case UPDATED_ASSIGNED_ROOM_SUCCESS:
        // if someone updates an item from a different assignment date
        if (draft.assignment.date === action.room.date) {
          draft.assignment.rooms[action.room.zone].items[
            draft.assignment.rooms[action.room.zone].items.findIndex(
              room => room._id === action.room._id,
            )
          ].hkKey = action.room.hkKey;
        }
        // }
        draft.isLoading = false;
        break;
      default:
    }
  });

export default appReducer;

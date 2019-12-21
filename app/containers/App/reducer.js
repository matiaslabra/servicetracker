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
  SET_ASSIGNMENT,
  SET_ASSIGNMENT_SUCCESS,
  SET_ASSIGNMENT_ERROR,
  UPDATED_ASSIGNED_ITEM,
  UPDATED_ASSIGNED_TASK_SUCCESS,
  UPDATED_ASSIGNED_ROOM_SUCCESS,
  LOAD_ASSIGNMENT,
  LOAD_ASSIGNMENT_SUCCESS,
  LOAD_ASSIGNMENT_ERROR
} from './constants';

export const initialState = {
  assignment: {
    id: '',
    rooms: [],
    tasks: [],
    date: '',
    updated: ''
  },
  date: '',
  isLoading: false,
  error: false
};

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ASSIGNMENT:
        draft.isLoadgin = true;
        draft.error = false;
        break;
      case LOAD_ASSIGNMENT_SUCCESS:
        draft.isLoadgin = false;
        draft.error = false;
        console.log('LOAD_ASSIGNMENT_SUCCESS:', action)
        draft.assignment.id = action.assignment._id
        draft.assignment.rooms = action.assignment.rooms
        draft.assignment.tasks = action.assignment.tasks
        draft.assignment.date = action.assignment.date
        break;
      case UPDATED_ASSIGNED_ITEM:
        draft.isLoadgin = true;
        draft.error = false;
        break;
      case UPDATED_ASSIGNED_TASK_SUCCESS:
        const updatedTask = action.task;
        console.log('UPDATED_ASSIGNED_TASK_SUCCESS with:', action);
        draft.assignment.tasks[draft.assignment.tasks.findIndex(task => task._id == updatedTask._id)].hkKey = updatedTask.hkKey;
        draft.isLoadgin = false;
        break;
      case UPDATED_ASSIGNED_ROOM_SUCCESS:
        const updatedRoom = action.room;
        // console.log('UPDATED_ASSIGNED_ITEM_SUCCESS with:', action);
        draft.assignment.rooms[draft.assignment.rooms.findIndex(room => room._id == updatedRoom._id)].hkKey = updatedRoom.hkKey;
        draft.isLoadgin = false;
        break;
      case SET_ASSIGNMENT:
        console.log('SET_ASSIGNMENT with:', action);
        draft.isLoadgin = true;
        draft.error = false;
        draft.assignment.date = action.assignment.date;
        draft.assignment.rooms = action.assignment.rooms;
        draft.assignment.tasks = action.assignment.tasks;
        break;
      case SET_ASSIGNMENT_SUCCESS:
          console.log('SET_ASSIGNMENT_SUCCESS');
          draft.isLoadgin = false;
          draft.error = false;
        break;
      case SET_ASSIGNMENT_ERROR:
          draft.isLoadgin = false;
          draft.error = action.error;
        break;
    }
  });

export default appReducer;

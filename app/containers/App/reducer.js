/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import moment from 'moment';

import {
  SET_ASSIGNMENT,
  SET_ASSIGNMENT_SUCCESS,
  SET_ASSIGNMENT_ERROR,
  UPDATED_ASSIGNED_ITEM,
  UPDATED_ASSIGNED_TASK_SUCCESS,
  UPDATED_ASSIGNED_ROOM_SUCCESS,
  LOAD_ASSIGNMENT,
  LOAD_ASSIGNMENT_SUCCESS,
} from './constants';

export const initialState = {
  assignment: {
    id: '',
    rooms: [],
    tasks: [],
    date: '',
    updated: ''
  },
  isLoading: false,
  error: false
};

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ASSIGNMENT:
        draft.isLoading = true;
        draft.error = false;
        break;
      case LOAD_ASSIGNMENT_SUCCESS:
        draft.isLoading = false;
        draft.error = false;
        console.log('LOAD_ASSIGNMENT_SUCCESS:', action)
        draft.assignment.id = action.assignment._id
        draft.assignment.rooms = action.assignment.rooms
        draft.assignment.tasks = action.assignment.tasks
        draft.assignment.date = action.assignment.date
        draft.date = action.assignment.date
        break;
      case UPDATED_ASSIGNED_ITEM:
        draft.isLoading = true;
        draft.error = false;
        break;
      case UPDATED_ASSIGNED_TASK_SUCCESS:
        let updatedTask = action.task;
        // if someone update and item from a different assignment date
        // if(draft.date == updatedTask.date){
          draft.assignment.tasks[draft.assignment.tasks.findIndex(task => task._id == updatedTask._id)].hkKey = updatedTask.hkKey;
        // }
        draft.isLoading = false;
        break;
      case UPDATED_ASSIGNED_ROOM_SUCCESS:
        let updatedRoom = action.room;
        // if someone update an item from a different assignment date
        // if(draft.date == updatedRoom.date){ :todo:
        let groupIndex = draft.assignment.rooms.findIndex(group => group.name == updatedRoom.zone);
        draft.assignment.rooms[groupIndex].items[draft.assignment.rooms[groupIndex].items.findIndex(room => room._id == updatedRoom._id)].hkKey = updatedRoom.hkKey;
        // }
        draft.isLoading = false;
        break;
      case SET_ASSIGNMENT:
        console.log('SET_ASSIGNMENT with:', action);
        draft.isLoading = true;
        draft.error = false;
        draft.assignment.date = action.assignment.date;
        draft.assignment.rooms = action.assignment.rooms;
        draft.assignment.tasks = action.assignment.tasks;
        break;
      case SET_ASSIGNMENT_SUCCESS:
          console.log('SET_ASSIGNMENT_SUCCESS');
          draft.isLoading = false;
          draft.error = false;
          draft.assignment.tasks = [];
          draft.assignment.rooms = []
          draft.assignment.date = ''
        break;
      case SET_ASSIGNMENT_ERROR:
          draft.isLoading = false;
          draft.error = action.error;
        break;
    }
  });

export default appReducer;

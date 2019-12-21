/*
 *
 * HomePage actions
 *
 */

import {
  LOAD_ASSIGNMENT,
  LOAD_ASSIGNMENT_SUCCESS,
  LOAD_ASSIGNMENT_ERROR,
  SET_ASSIGNMENT,
  SET_ASSIGNMENT_SUCCESS,
  SET_ASSIGNMENT_ERROR,
  UPDATED_ASSIGNED_ITEM,
  UPDATED_ASSIGNED_ROOM_SUCCESS,
  UPDATED_ASSIGNED_TASK_SUCCESS
} from './constants';

/**
 *
 */

/**
 *
 */
export function loadAssignment() {
  return {
    type: LOAD_ASSIGNMENT,
  };
}

export function assignmentLoaded(assignment) {
  return {
    type: LOAD_ASSIGNMENT_SUCCESS,
    assignment
  };
}

export function setAssignment(assignment) {
  return {
    type: SET_ASSIGNMENT,
    assignment
  };
}

export function updateAssignmentItem() {
  return {
    type: UPDATED_ASSIGNED_ITEM,
  };
}

export function updateAssignmentRoomDone(room) {
  return {
    type: UPDATED_ASSIGNED_ROOM_SUCCESS,
    room
  };
}

export function updateAssignmentTaskDone(task) {
  return {
    type: UPDATED_ASSIGNED_TASK_SUCCESS,
    task
  };
}

export function setAssignmentDone() {
  return {
    type: SET_ASSIGNMENT_SUCCESS,
  };
}

export function setAssignmentError(error) {
  return {
    type: SET_ASSIGNMENT_ERROR,
    error
  };
}

// export function roomsLoadingError(error) {
//   return {
//     type: SET_ROOMS_ASSIGNED_ERROR,
//     error,
//   };
// }



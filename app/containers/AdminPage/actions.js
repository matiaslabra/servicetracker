/*
 *
 * AdminPage actions
 *
 */

import {
  CHANGE_DATE,
  LOAD_ROOMS,
  LOAD_ROOMS_SUCCESS,
  LOAD_TASKS,
  LOAD_TASKS_SUCCESS,
  ADD_NEW_TASK,
  ADD_NEW_TASK_SUCCESS,
} from './constants';

export function changeDate(date) {
  return {
    type: CHANGE_DATE,
    date,
  };
}

export function loadRooms() {
  return {
    type: LOAD_ROOMS,
  };
}

export function roomsLoaded(rooms) {
  return {
    type: LOAD_ROOMS_SUCCESS,
    rooms,
  };
}

export function roomsLoadedError() {
  return {
    type: LOAD_ROOMS_ERROR,
  };
}
export function loadTasks() {
  return {
    type: LOAD_TASKS,
  };
}

export function tasksLoaded(tasks) {
  return {
    type: LOAD_TASKS_SUCCESS,
    tasks,
  };
}

export function addTask(task) {
  return {
    type: ADD_NEW_TASK,
    task,
  };
}

export function taskCreated(task) {
  return {
    type: ADD_NEW_TASK_SUCCESS,
    task,
  };
}

export function tasksLoadedError() {
  return {
    type: LOAD_TASKS_ERROR,
  };
}

/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

// export const LOAD_ROOMS_ASSIGNED = 'app/LOAD_ROOMS_ASSIGNED';
export const CHANGE_DATE = 'app/CHANGE_DATE';

export const LOAD_ASSIGNMENT = 'app/LOAD_ASSIGNMENT';
export const LOAD_ASSIGNMENT_ERROR = 'app/LOAD_ASSIGNMENT_ERROR';
export const LOAD_ASSIGNMENT_SUCCESS = 'app/LOAD_ASSIGNMENT_SUCCESS';

export const SET_ASSIGNMENT = 'app/SET_ASSIGNMENT';
export const SET_ASSIGNMENT_SUCCESS = 'app/SET_ASSIGNMENT_SUCCESS';
export const SET_ASSIGNMENT_ERROR = 'app/SET_ASSIGNMENT_ERROR';

export const UPDATED_ASSIGNED_ITEM = 'app/UPDATED_ASSIGNED_ITEM';
export const UPDATED_ASSIGNED_TASK_SUCCESS =
  'app/UPDATED_ASSIGNED_TASK_SUCCESS';
export const UPDATED_ASSIGNED_ROOM_SUCCESS =
  'app/UPDATED_ASSIGNED_ROOM_SUCCESS';

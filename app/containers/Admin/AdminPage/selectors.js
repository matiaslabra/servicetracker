import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminPage state domain
 */

const selectAdminPageDomain = state => state.adminPage || initialState;

/**
 * Other specific selectors
 */
const makeSelectRooms = () =>
  createSelector(
    selectAdminPageDomain,
    substate => substate.rooms,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAdminPageDomain,
    substate => substate.loading,
  );

const makeSelectAssignmentId = () =>
  createSelector(
    selectAdminPageDomain,
    substate => substate.assignment._id,
  );

const makeSelectTasks = () =>
  createSelector(
    selectAdminPageDomain,
    substate => substate.tasks,
  );
/**
 * Default selector used by AdminPage
 */

const makeSelectDate = () =>
  createSelector(
    selectAdminPageDomain,
    substate => substate.date,
  );

const makeSelectAssignmentProp = () =>
  createSelector(
    selectAdminPageDomain,
    substate => substate.assignment.proposal,
  );

export {
  selectAdminPageDomain,
  makeSelectDate,
  makeSelectRooms,
  makeSelectTasks,
  makeSelectAssignmentId,
  makeSelectLoading,
  makeSelectAssignmentProp,
};

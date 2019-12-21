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

const makeSelectTasks = () =>
  createSelector(
    selectAdminPageDomain,
    substate => substate.tasks,
  );
/**
 * Default selector used by AdminPage
 */

const makeSelectAdminPage = () =>
  createSelector(
    selectAdminPageDomain,
    substate => substate,
  );

export {
  selectAdminPageDomain,
  makeSelectRooms,
  makeSelectTasks
};

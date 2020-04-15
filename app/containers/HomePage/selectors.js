import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

const makeSelectUpdatedItem = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.itemToUpdate,
  );

const makeSelectDate = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.date,
  );

const makeSelectLoading = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.error,
  );

export {
  selectHomePageDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectDate,
  makeSelectUpdatedItem,
};

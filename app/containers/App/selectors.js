import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;
const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isLoading,
  );

const makeSelectAppDate = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.date,
  );

const makeSelectAssignment = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.assignment,
  );
export {
  makeSelectLocation,
  makeSelectAppDate,
  makeSelectAssignment,
  makeSelectLoading,
};

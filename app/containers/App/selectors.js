import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;
const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

  const makeSelectAssignment = () =>
   createSelector(
    selectGlobal,
    globalState => globalState.assignment,
   );

   const makeSelectDate = () =>
   createSelector(
    selectGlobal,
    globalState => globalState.date,
   );

export {
  makeSelectLocation,
  makeSelectAssignment,
  makeSelectDate
};

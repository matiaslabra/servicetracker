import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the roomListItem state domain
 */

const selectRoomListItemDomain = state => state.roomListItem || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RoomListItem
 */

const makeSelectRoomListItem = () =>
  createSelector(
    selectRoomListItemDomain,
    substate => substate,
  );

export default makeSelectRoomListItem;
export { selectRoomListItemDomain };

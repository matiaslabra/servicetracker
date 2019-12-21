/*
 *
 * RoomListItem reducer
 *
 */
import produce from 'immer';
import { ROOM_CLICK } from './constants';

export const initialState = {
  dropdownId: 0,
};

/* eslint-disable default-case, no-param-reassign */
const roomListItemReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ROOM_CLICK:
          // console.log('room_click reducer called')
          Object.keys(draft).map( a =>{
            draft[a] = false;
          })
          draft.isReady = true;
        break;
      }
  });

export default roomListItemReducer;


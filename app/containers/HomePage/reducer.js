import { statement } from "@babel/template";

/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import {
  SET_ITEM_TO_UPDATE,
  SET_ITEM_TO_UPDATE_SUCCESS,
} from './constants';

export const initialState = {
  itemToUpdate:'',
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_ITEM_TO_UPDATE:
        console.log('SET_ITEM_TO_UPDATE', action);
        draft.itemToUpdate = action.item;
      break;
      case SET_ITEM_TO_UPDATE_SUCCESS:
        draft.itemToUpdate = ''
      break;
    }
  });

export default homePageReducer;

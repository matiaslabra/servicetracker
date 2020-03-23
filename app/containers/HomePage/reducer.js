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
  CHANGE_DATE
} from './constants';

export const initialState = {
  date:'',
  itemToUpdate:'',
  isLoading:false,
  error:''
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_DATE:
        draft.date = action.date;
      case SET_ITEM_TO_UPDATE:
        draft.itemToUpdate = action.item;
      break;
      case SET_ITEM_TO_UPDATE_SUCCESS:
        draft.itemToUpdate = ''
      break;
    }
  });

export default homePageReducer;

/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import moment from 'moment';
import {
  SET_ITEM_TO_UPDATE,
  SET_ITEM_TO_UPDATE_SUCCESS,
  CHANGE_DATE,
} from './constants';

export const initialState = {
  date: moment().format('YYYY-MM-DD'),
  itemToUpdate: '',
  isLoading: false,
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_DATE:
        draft.date = action.date;
        break;
      case SET_ITEM_TO_UPDATE:
        draft.itemToUpdate = action.item;
        draft.isLoading = true;
        break;
      case SET_ITEM_TO_UPDATE_SUCCESS:
        draft.itemToUpdate = '';
        draft.isLoading = false;
        break;
    }
  });

export default homePageReducer;

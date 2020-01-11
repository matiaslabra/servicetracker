/*
 *
 * HomePage actions
 *
 */

import {
  SET_ITEM_TO_UPDATE,
  SET_ITEM_TO_UPDATE_SUCCESS,
} from './constants';


export function setItemToUpdate(item) {
  return {
    type: SET_ITEM_TO_UPDATE,
    item
  };
}

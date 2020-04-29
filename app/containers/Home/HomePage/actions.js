/*
 *
 * HomePage actions
 *
 */

import { SET_ITEM_TO_UPDATE, CHANGE_DATE } from './constants';

export function changeDate(date) {
  return {
    type: CHANGE_DATE,
    date,
  };
}
export function setItemToUpdate(item) {
  return {
    type: SET_ITEM_TO_UPDATE,
    item,
  };
}

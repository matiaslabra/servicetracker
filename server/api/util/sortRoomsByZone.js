/* eslint-disable no-param-reassign */
/**
 * sortRoomsByZone takes an array of items and arranges
 * them by they zone value.
 * @param {Array} items
 */
const assignment = items => {
  let arrayToObject = [];
  if (items.length > 0) {
    arrayToObject = items.reduce((obj, item) => {
      if (!(item.zone in obj)) {
        obj[item.zone] = {};
        obj[item.zone].items = [];
        obj[item.zone].displayOrientation = 'horizontal';
      }
      obj[item.zone].items.push(item);
      return obj;
    }, {});
  }

  return arrayToObject;
};

const housekeeping = items => {
  let arrayToObject = [];
  if (items.length > 0) {
    arrayToObject = items.reduce((obj, item) => {
      if (!(item.room.zone in obj)) {
        obj[item.room.zone] = {};
        obj[item.room.zone].items = [];
        obj[item.room.zone].displayOrientation = 'horizontal';
      }
      obj[item.room.zone].items.push({
        ...item.toObject(),
        name: item.room.name,
        zone: item.room.zone,
      });
      return obj;
    }, {});
  }

  return arrayToObject;
};

module.exports = {
  assignment,
  housekeeping,
};

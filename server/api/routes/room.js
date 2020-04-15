const express = require('express');
const moment = require('moment');
const Room = require('../models/roomSchema');

const router = express.Router();

/**
 * sortRoomsByZone takes an array of items and arranges
 * them by they zone value.
 * @param {Array} items
 */
const sortRoomsByZone = items => {
  const zoneArray = [];
  const zoneObject = {};
  if (items.length > 0) {
    items.forEach(item => {
      if (!(item.zone in zoneObject)) {
        zoneObject[item.zone] = {};
        zoneObject[item.zone].items = [];
        zoneObject[item.zone].name = item.zone;
        zoneObject[item.zone].displayOrientation = 'horizontal';
      }
      zoneObject[item.zone].items.push(item);
    });
    Object.entries(zoneObject).forEach(value => {
      zoneArray.push(value);
    });
  }

  return zoneArray;
};

router.get('/', (req, res) => {
  const date =
    req.query.date !== '' ? req.query.date : moment().format('YYYY-MM-DD');
  // console.log(req.query);
  Room.aggregate([
    {
      $lookup: {
        from: 'assignments',
        localField: '_id',
        foreignField: 'rooms._id',
        as: 'assignment',
      },
    },
    {
      $addFields: {
        assignment: {
          $arrayElemAt: [
            {
              $map: {
                input: {
                  $filter: {
                    input: '$assignment',
                    cond: {
                      $eq: ['$$this.date', date],
                    },
                  },
                },
                as: 'item',
                in: {
                  rooms: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: '$$item.rooms',
                          as: 'room',
                          cond: {
                            $and: [{ $eq: ['$$room._id', '$_id'] }],
                          },
                        },
                      },
                      0,
                    ],
                  },
                },
              },
            },
            0,
          ],
        },
        numberName: { $toInt: '$name' },
      },
    },
    {
      $sort: { numberName: 1 },
    },
  ]).exec((err, rooms) => {
    if (err) return res.status(401).send({ error: err.message });
    return res.send(sortRoomsByZone(rooms));
  });
});

module.exports = router;

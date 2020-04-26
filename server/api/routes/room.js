/* eslint-disable no-param-reassign */
const express = require('express');
const moment = require('moment');
const Room = require('../models/roomSchema');
const sortRoomsByZone = require('../util/sortRoomsByZone');
const router = express.Router();

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
    return res.json(sortRoomsByZone.assignment(rooms));
  });
});

module.exports = router;

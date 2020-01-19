const express = require('express');
const Room = require('../models/roomSchema');
const moment = require ('moment');

const router = express.Router();

router.use(function(req, res, next) {
  // console.log('Something is happening.');
  next();
});

router.get('/', (req, res) => {
  let date = req.query.date !== '' ? req.query.date : moment().format('YYYY-MM-DD');
  console.log(req.query);
  Room.aggregate([
    {
      $lookup:{
        from: 'assignments',
        localField: '_id',
        foreignField: "rooms._id",
        as: "assignment",
      }
    },
    {
      $addFields: {
        assignment: {
          $arrayElemAt: [{
            $map:{
              input: {
                $filter:{
                  input:"$assignment",
                  cond:{
                    $eq:["$$this.date", date]
                  }
                }
              },
              as: "item",
              in: {
                rooms:{
                  $arrayElemAt: [{
                    $filter:{
                      input: "$$item.rooms",
                      as: "room",
                      cond: {
                        $and: [
                          {$eq: ["$$room._id", "$_id"]}
                        ]
                      }
                    }
                  },0]
                }
              }
            }
          },0]
        },
        numberName: { $toInt: "$name" }
      }
    },
    {
      $sort: { "numberName" : 1 }
    },
    ]).exec(function(err, rooms){
      // console.log('rooms', rooms);
      res.send(rooms);
    });

  // Room.aggregate([
  //   // { $match : { _id : mongoose.Types.ObjectId("5de3a5da5fc33c78ab352095") } },
  //   { $addFields :
  //       {
  //           "numberName" : { $toInt: "$name" }
  //       }
  //   },
  //   {
  //       $sort: { "numberName" : 1 }
  //   },
  //   {
  //       $project: {
  //           name: 1,
  //           zone: 1,
  //           lastTimeCleaned: { $ifNull: [ "$lastTimeCleaned", "No register" ] },
  //           lastServiceType: { $ifNull: [ "$lastServiceType", "No register" ] },
  //           lastCurtainWash: { $ifNull: [ "$lastCurtainWash", "No register" ] },
  //           lastDoonaWash: { $ifNull: [ "$lastDoonaWash", "No register" ] },

  //       }
  //   }
  // ]).exec(function(err, rooms){
  //     res.send(rooms);
  // });

  // return res.send(assigment);
});

module.exports = router;

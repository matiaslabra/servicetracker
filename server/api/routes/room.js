const express = require('express');
const Room = require('../models/roomSchema');
const  mongoose  = require("mongoose");

const router = express.Router();

router.use(function(req, res, next) {
  // console.log('Something is happening.');
  next();
});

router.get('/', (req, res) => {
  // let today = moment().format('YYYY-MM-DD');
  // console.log(today);
  Room.aggregate([
    // { $match : { _id : mongoose.Types.ObjectId("5de3a5da5fc33c78ab352095") } },
    { $addFields :
        {
            "numberName" : { $toInt: "$name" }
        }
    },
    {
        $sort: { "numberName" : 1 }
    },
    {
        $project: {
            name: 1,
            zone: 1,
            lastTimeCleaned: { $ifNull: [ "$lastTimeCleaned", "No register" ] },
            lastServiceType: { $ifNull: [ "$lastServiceType", "No register" ] },
            lastCurtainWash: { $ifNull: [ "$lastCurtainWash", "No register" ] },
            lastDoonaWash: { $ifNull: [ "$lastDoonaWash", "No register" ] },
        }
    }
  ]).exec(function(err, rooms){
      res.send(rooms);
  });

  // return res.send(assigment);
});

module.exports = router;

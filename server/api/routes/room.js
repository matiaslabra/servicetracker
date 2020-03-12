const express = require('express');
const Room = require('../models/roomSchema');
const moment = require ('moment');

const router = express.Router();

let processItems = items =>{
  let zoneArray = []
  let zoneObject = {};
  if(items.length > 0){
    items.map( item =>{
      if(!(item.zone in zoneObject)){
        zoneObject[item.zone] = {};
        zoneObject[item.zone].items = [];
        zoneObject[item.zone].name = item.zone;
        zoneObject[item.zone].dataOrientation = 'horizontal';
      }
      zoneObject[item.zone].items.push(item);
    });
    //  console.log('zoneObject', zoneObject);
     Object.entries(zoneObject).map( ([key, value]) => {
      zoneArray.push(value)
    })
  }

  return zoneArray;
}

router.get('/', (req, res) => {
  let date = req.query.date !== '' ? req.query.date : moment().format('YYYY-MM-DD');
  // console.log(req.query);
  Room.aggregate([{
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
  }]).exec(function(err, rooms){
    res.send(processItems(rooms));
  });
});

module.exports = router;

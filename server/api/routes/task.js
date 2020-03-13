const { Router } = require('express');
const Task = require('../models/taskSchema');
const moment = require('moment');

const router = Router();

// let processItems = items =>{
//   let zoneArray = []
//   let zoneObject = {};

//   zoneObject.items = [];
//   if(items.length > 0){
//     items.map( item =>{
//       zoneObject['items'].push(item);
//     });
//     zoneObject.name = 'tasks'
//     zoneObject.displayOrientation = 'vertical';
//   }

//   return [zoneObject];
// }

router.get('/', (req, res) => {
  let date = req.query.date !== '' ? req.query.date : moment().format('YYYY-MM-DD');
  // console.log(today);
  Task.aggregate([{
    $lookup:{
      from: 'assignments',
      localField: '_id',
      foreignField: 'tasks._id',
      as: "assignment",
    }
  },
  {
    $addFields: {
      assignment: {
        $arrayElemAt: [{
          $map:{
            input: {
              $filter: {
                input: "$assignment",
                cond: {
                  $eq:["$$this.date", date]
                }
              }
            },
            as: "item",
            in: {
              tasks:{
                $arrayElemAt: [{
                  $filter:{
                    input: "$$item.tasks",
                    as: "task",
                    cond: {
                      $and: [
                        {$eq: ["$$task._id", "$_id"]}
                      ]
                    }
                  }
                },0]
              }
            }
          }
        },0]
      }
    }
  }]).exec(function(err, tasks){
    // console.log(tasks);
    res.send(tasks);
  });
});

router.post('/', (req, res) => {
  // let today = moment().format('YYYY-MM-DD');
  // console.log(today);
  let newTask = new Task({
    name: req.body.task,
    isDaily: false
  })
  newTask
  .save()
  .then (doc => {
    res.send({
      success: true,
      task: doc
    });
  });

  // return res.send(assigment);
});

module.exports = router;

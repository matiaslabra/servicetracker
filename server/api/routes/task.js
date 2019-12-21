const { Router } = require('express');
const Task = require('../models/taskSchema');
const moment = require('moment');
const  mongoose  = require("mongoose");

const router = Router();

router.get('/', (req, res) => {
  // let today = moment().format('YYYY-MM-DD');
  // console.log(today);
  Task.find().exec(function(err, tasks){
      res.send(tasks);
  });

  // return res.send(assigment);
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

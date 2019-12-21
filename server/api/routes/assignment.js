const express = require ('express');
const Room = require ('../models/roomSchema');
const Task = require ('../models/taskSchema');
const Assignment = require ('../models/assignmentSchema');
const moment = require ('moment');

const router = express.Router();
module.exports = io => {

  io.sockets.on("connection",function(socket){
    // Everytime a client logs in, display a connected message
    console.log("Server-Client Connected!");
    socket.on("disconnect", ()=>{
      console.log("Disconnected")
    })
    socket.on('connected', function(data) {
        //listen to event at anytime (not only when endpoint is called)
        //execute some code here
    });

    socket.on('taskResponse', data => {
        //calling a function which is inside the router so we can send a res back
        sendResponse(data);
    })
    socket.on('update-item',async (data) => {

      console.log('socket on.update-item', data);
      socket.broadcast.emit('assignment-items',{ item : data })
  })
  });

  let processAssignment = assignment =>{
    let zoneObject = {};
    if(assignment.rooms.length){
      let response = assignment.rooms.map( item =>{
        if(!(item.zone in zoneObject)){
          zoneObject[item.zone] = {};
          zoneObject[item.zone].rooms = [];
          zoneObject[item.zone].name = item.zone; //temp
        }
        zoneObject[item.zone].rooms.push(item.name);
      });
    }s

    return zoneObject;
  }

  router.get('/', (req, res) => {
    let today = moment().format('YYYY-MM-DD');
    // console.log(today);
    Assignment.findOne({
      date: today
    })
    .populate('rooms.room')
    .populate('tasks.task')
    .exec(function(err, assignment){
      if(!assignment){
        assignment = {
          rooms:[],
          tasks:[]
        }
      }
      // res.send(processAssignment(assignment));
      res.send(assignment);
    });


    // return res.send(assigment);
  });
  router.put('/item', (req, res) => {
    console.log('req.body', req.body);
    const item = req.body.item
    let dbItem;
    const assignmentId = req.body.assignment_id

      Assignment.findById(assignmentId)
      .then((assignment) => {
        if(item.type == 'room'){
          dbItem = assignment.rooms.id(item._id); // returns a matching subdocument
        }else{
          dbItem = assignment.tasks.id(item._id);
        }
        dbItem.hkKey = item.hkKey
        return assignment.save(); // saves document with subdocuments and triggers validation
      })
      .then((assignment) => {
        let updatedItem;
        if(item.type == 'room'){
          updatedItem =  assignment.rooms.id(item._id)
        } else{
          updatedItem =  assignment.tasks.id(item._id)
        }
        res.send({
          success: true,
          item: updatedItem
        });
      })
      .catch(e => res.status(400).send(e));
  });

  router.post('/', (req, res) => {
    console.log(req.body);

    let newAssigment = new Assignment({
      rooms: req.body.rooms,
      tasks: req.body.tasks,
      date: req.body.date
    })
    newAssigment
      .save()
      .then (doc => {
        res.send({
          success: true,
          assignment: doc
        });
      })

  });
  return router;
}

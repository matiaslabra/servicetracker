const express = require ('express');
const Assignment = require ('../models/assignmentSchema');
const moment = require ('moment');

const router = express.Router();
module.exports = io => {

  io.sockets.on("connection",function(socket){
    // Every time a client logs in, display a connected message
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

  /**
   * sortRoomsByZone takes an array of items and arranges 
   * them by they zone value.
   * @param {Array} items 
   */
  const sortRoomsByZone = items => {
    let zoneArray = []
    let zoneObject = {};
    if(items.length > 0){
      items.map( item =>{
        if(!(item.room.zone in zoneObject)){
          zoneObject[item.room.zone] = {};
          zoneObject[item.room.zone].items = [];
          zoneObject[item.room.zone].name = item.room.zone;
          zoneObject[item.room.zone].displayOrientation = 'horizontal';
        }
        zoneObject[item.room.zone].items.push(item);
      });

      Object.entries(zoneObject).map( ([key, value]) => {
        zoneArray.push(value)
      })
    }
    return zoneArray;
  }

  router.get('/', (req, res) => {

    let date = req.query.date !== '' ? req.query.date : moment().format('YYYY-MM-DD');

    Assignment.findOne({
      date: date
    })
    .populate('rooms.room')
    .populate('tasks.task')
    .exec(function(err, assignment){
      let processedAssignment;
      if(assignment){
        processedAssignment = assignment.toObject();
        processedAssignment.rooms = sortRoomsByZone(assignment.rooms)
      }else{
        processedAssignment = {
          rooms:[],
          tasks:[],
          date: date
        }
      }
      res.send(processedAssignment);
    });
    
  });

  router.put('/item', (req, res) => {
    // console.log('req.body', req.body);
    const item = req.body.item
    let dbItem;
    const assignmentId = req.body.assignment_id

    Assignment.findById(assignmentId)
    .then((assignment) => {
      if(item.type == 'rooms'){
        dbItem = assignment.rooms.id(item._id); // returns a matching subdocument
      }else{
        dbItem = assignment.tasks.id(item._id);
      }
      dbItem.hkKey = item.hkKey
      return assignment.save(); // saves document with subdocuments and triggers validation
    })
    .then((assignment) => {
      let updatedItem;
      if(item.type == 'rooms'){
        updatedItem =  assignment.rooms.id(item._id)
      } else{
        updatedItem =  assignment.tasks.id(item._id)
      }
      res.send({
        success: true,
        item: updatedItem,
      });
    })
    .catch(e => res.status(400).send(e));
  });

  router.post('/', (req, res) => {

    let newAssignment = new Assignment({
      rooms: req.body.rooms,
      tasks: req.body.tasks,
      date: req.body.date
    })
    newAssignment
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

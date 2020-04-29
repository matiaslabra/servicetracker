const express = require('express');
const moment = require('moment');
const Assignment = require('../models/assignmentSchema');
const sortRoomsByZone = require('../util/sortRoomsByZone');

const router = express.Router();
module.exports = io => {
  io.sockets.on('connection', socket => {
    // Every time a client logs in, display a connected message
    // console.log('Server-Client Connected!');
    socket.on('disconnect', () => {
      // console.log('Disconnected');
    });
    socket.on('connected', () => {
      // listen to event at anytime (not only when endpoint is called)
      // execute some code here
    });

    socket.on('update-item', async data => {
      // console.log('socket on.update-item', data);
      socket.broadcast.emit('assignment-items', { item: data });
    });
  });

  router.get('/id', async (req, res) => {
    const date =
      req.query.date !== '' ? req.query.date : moment().format('YYYY-MM-DD');

    const assignment = await Assignment.findOne({ date });
    return res.json({
      success: true,
      _id: assignment ? assignment._id : '',
    });
  });

  router.get('/', async (req, res) => {
    const date =
      req.query.date !== '' ? req.query.date : moment().format('YYYY-MM-DD');

    Assignment.findOne({
      date,
    })
      .populate('rooms.room')
      .populate('tasks.task')
      .exec((err, assignment) => {
        if (err) return res.status(400).send(err);
        let processedAssignment;
        if (!assignment) {
          processedAssignment = {
            rooms: {},
            tasks: [],
            date,
          };
          return res.json(processedAssignment);
        }
        processedAssignment = assignment.toObject();
        processedAssignment.rooms = sortRoomsByZone.housekeeping(
          assignment.rooms,
        );
        return res.json(processedAssignment);
      });
  });

  router.put('/item', (req, res) => {
    // console.log('req.body', req.body);
    const { item, assignmentId } = req.body;
    let dbItem;
    Assignment.findById(assignmentId)
      .then(assignment => {
        if (item.type === 'rooms') {
          dbItem = assignment.rooms.id(item._id); // returns a matching subdocument
        } else {
          dbItem = assignment.tasks.id(item._id);
        }
        dbItem.hkKey = item.hkKey;
        return assignment.save(); // saves document with subdocuments and triggers validation
      })
      .then(assignment => {
        let updatedItem;
        if (item.type === 'rooms') {
          updatedItem = assignment.rooms.id(item._id);
        } else {
          updatedItem = assignment.tasks.id(item._id);
        }
        res.send({
          success: true,
          item: updatedItem,
        });
      })
      .catch(e => res.status(400).send(e));
  });

  router.post('/', async (req, res) => {
    const assignmentRooms = req.body.rooms.map(item => ({
      ...item,
      room: item._id,
    }));
    const assignmentTasks = req.body.tasks.map(item => ({
      ...item,
      task: item._id,
    }));
    const cleaning = await Assignment.deleteOne({ date: req.body.date });

    if (cleaning.ok !== 1) res.status(400).json(cleaning);

    const newAssignment = new Assignment({
      rooms: assignmentRooms,
      tasks: assignmentTasks,
      date: req.body.date,
    });
    const doc = await newAssignment.save();
    res.send({
      success: true,
      assignment: doc,
    });
  });

  return router;
};

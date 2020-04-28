const cors = require('cors');
const express = require('express');
const socket = require('socket.io');
// Mongoose config
const mongoose = require('mongoose');
const routes = require('../api/routes');
mongoose.Promise = require('bluebird');
const url =
  process.env.MONGO_URL !== undefined
    ? process.env.MONGO_URL
    : 'mongodb://localhost:27017/housekeeping';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = function apiMiddlewares(app, options) {
  const io = socket.listen(options.server, {
    handlePreflightRequest: (req, res) => {
      const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Origin': 'http://localhost:3000', // or the specific origin you want to give access to,
        'Access-Control-Allow-Credentials': true,
      };
      res.writeHead(200, headers);
      res.end();
    },
  });

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api/assignment', routes.assignment(io));
  app.use('/api/room', routes.room);
  app.use('/api/task', routes.task);
};

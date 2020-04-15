const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  name: String,
  lastTimeDone: Date,
  isDaily: Boolean,
});

module.exports = mongoose.model('Task', taskSchema);

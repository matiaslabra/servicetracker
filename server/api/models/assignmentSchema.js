const mongoose = require('mongoose');
const { Schema } = mongoose;

const assignmentSchema = new Schema({
  tasks: [
    {
      task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
      assignKey: Number,
      hkKey: { type: Number, default: 0 },
      service: String,
    },
  ],
  rooms: [
    {
      room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
      },
      assignKey: Number,
      hkKey: { type: Number, default: 0 },
      service: String,
      washDoona: { type: Boolean, default: false },
      washCurtain: { type: Boolean, default: false },
      washMattressProtector: { type: Boolean, default: false },
    },
  ],
  date: { type: String },
  updated: { type: Date },
});

module.exports = mongoose.model('Assignment', assignmentSchema);

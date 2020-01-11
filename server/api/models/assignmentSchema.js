const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var moment = require('moment');
// mongoose.set('debug', true);

const assignmentSchema = new Schema({
  tasks: [
    {
      task: {
          type: Schema.Types.ObjectId, ref: 'Task'
      },
      assignKey: Number,
      hkKey: { type: Number, default: 0 },
      service: String,
      date: { type: String, default: moment().format('YYYY-MM-DD') },
    }
  ],
  rooms: [
    {
      room: {
          type: Schema.Types.ObjectId, ref: 'Room'
      },
      date: { type: String, default: moment().format('YYYY-MM-DD') },
      assignKey: Number,
      hkKey: { type: Number, default: 0 },
      service: String,
      washDoona: { type: Boolean, default: false },
      washCurtain: { type: Boolean, default: false },
      washMattressProtector: { type: Boolean, default: false }
    }
  ],
  date: { type: String },
  updated: { type: Date },
});

module.exports   =  mongoose.model("Assignment", assignmentSchema);

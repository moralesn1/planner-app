const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  entry: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Schedule", scheduleSchema);

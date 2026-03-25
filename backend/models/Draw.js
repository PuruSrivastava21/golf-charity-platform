const mongoose = require("mongoose");

const drawSchema = new mongoose.Schema({
  numbers: [Number],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Draw", drawSchema);
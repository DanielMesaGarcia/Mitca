const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    _id: { type: Number, required: true, unique: true },
  carrera: { type: mongoose.Schema.Types.ObjectId, ref: 'Race', unique: true },
  statusAtTheMoment: { type: String, required: true, default: "Not started" },
  winner: { type: String },
  duration: { type: String }
});

const Status = mongoose.model('Status', statusSchema);
module.exports = Status;

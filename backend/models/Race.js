const mongoose = require('mongoose');

const raceSchema = new mongoose.Schema({
  _id: { type: Number, required: true, unique: true },
  creationDate: { type: Date, default: Date.now },
  eventDate: { type: Date, required: true },
  city: { type: String, required: true },
  length: { type: String, required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  status: { type: mongoose.Schema.Types.ObjectId, ref: 'Status' },
  runners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Runner' }],
  sponsors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sponsor' }]
});

const Race = mongoose.model('Race', raceSchema);
module.exports = Race;

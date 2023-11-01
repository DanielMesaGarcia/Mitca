const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    _id: { type: Number, required: true, unique: true },
  race: { type: mongoose.Schema.Types.ObjectId, ref: 'Race', unique: true },
  checkpoint: { type: Number, required: true },
  startPoint: { type: String, required: true },
  goal: { type: String, required: true }
});

const Route = mongoose.model('Route', routeSchema);
module.exports = Route;

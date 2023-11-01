const mongoose = require('mongoose');

const runnerSchema = new mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    mail: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    details: { type: String }
  });  

const Runner = mongoose.model('Runner', runnerSchema);
module.exports = Runner;

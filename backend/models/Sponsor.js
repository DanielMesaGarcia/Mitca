const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    moneyGiven: { type: Number, required: true },
    typeCompany: { type: String, required: true }
  });  
const Sponsor = mongoose.model('Sponsor', sponsorSchema);
module.exports = Sponsor;

var express = require('express');
var raceRouter = express.Router();

var RaceController = require('../controllers/RaceController');

// Create endpoint handlers for /races
raceRouter.route('/')
  .post(RaceController.createRace)
  .get(RaceController.getRaces);

// Create endpoint handlers for /races/:race_id
raceRouter.route('/:race_id')
  .get(RaceController.getRaceById)
  .put(RaceController.updateRace)
  .delete(RaceController.deleteRace);

module.exports = raceRouter;
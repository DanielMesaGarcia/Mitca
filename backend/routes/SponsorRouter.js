const express = require('express');
const sponsorRouter = express.Router();
const SponsorController = require('../controllers/SponsorController');

sponsorRouter.route('/')
  .post(SponsorController.createSponsor)
  .get(SponsorController.getSponsors);

sponsorRouter.route('/:sponsor_id')
  .get(SponsorController.getSponsorById)
  .put(SponsorController.updateSponsor)
  .delete(SponsorController.deleteSponsor);

module.exports = sponsorRouter;

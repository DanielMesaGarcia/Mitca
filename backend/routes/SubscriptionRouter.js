const express = require('express');
const subscriptionsRouter = express.Router();
const SubscriptionsController = require('../controllers/SubscribeController');


subscriptionsRouter.route('/subscribe')
  .post(SubscriptionsController.create);

module.exports =subscriptionsRouter;

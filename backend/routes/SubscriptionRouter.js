const express = require('express');
const subscriptionsRouter = express.Router();
const SubscriptionsController = require('../controllers/SubscriptionController');


subscriptionsRouter.route('/subscribe')
  .post(SubscriptionsController.create);

  subscriptionsRouter.route('/notification')
  .post(SubscriptionsController.notification);

module.exports =subscriptionsRouter;

const express = require('express');
const subscriptionRouter = express.Router();
const subscriptions = require("../controllers/SubscriptionController");

subscriptionRouter.post("/subscribe", subscriptions.create);

subscriptionRouter.post("/sendNotificationToSubscriptionName", subscriptions.sendNotificationToSubscriptionName);

subscriptionRouter.post("/deleteByEndpoint", subscriptions.deleteByEndpoint);

subscriptionRouter.get("/", subscriptions.findAll);

module.exports = subscriptionRouter;

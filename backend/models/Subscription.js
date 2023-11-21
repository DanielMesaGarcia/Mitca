const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const Subscription = new Schema ({
  endpoint: String,
  expirationTime: Number,
  keys: {
    p256dh: String,
    auth: String,
  },
<<<<<<< HEAD
  subscriptionName: String,
});
module.exports = mongoose.model ('subscription', Subscription);
=======
});
module.exports = mongoose.model ('subscription', Subscription);
>>>>>>> 52fedfe7c736591ccab603e8e47ff9ce71408ef4

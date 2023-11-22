const Subscription = require('../models/Subscription');
const webPush = require('web-push');

exports.create= async (req, res, next) => {
  const newSubscription = await Subscription.create ({...req.body});
  // return res.send ('hallo');
  const options = {
    vapidDetails: {
      subject: 'mailto:myemail@example.com',
      publicKey: process.env.PUBLIC_KEY,
      privateKey: process.env.PRIVATE_KEY,
    },
  };
  try {
    const res2 = await webPush.sendNotification (
      newSubscription,
      JSON.stringify ({
        title: 'Hello from server',
        description: 'this message is coming from the server',
        image: 'https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg',
      }),
      options
    );
    
    res.sendStatus(200)
  } catch (error) {
    console.log (error);
    res.sendStatus (500);
  }
}


exports.notification = async (req, res) => {
  const { subscription, title, description } = req.body;
  
  // Check if the subscription has the required properties
  if (!subscription || !subscription.endpoint) {
    console.error('Invalid subscription:', subscription);
    return res.sendStatus(400); // Bad Request
  }

  const options = {
    vapidDetails: {
      subject: 'mailto:myemail@example.com',
      publicKey: process.env.PUBLIC_KEY,
      privateKey: process.env.PRIVATE_KEY,
    },
  };

  try {
    const notificationPayload = {
      title,
      description,
      image: 'https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg',
    };

    await webPush.sendNotification(
      subscription,
      JSON.stringify(notificationPayload),
      options
    );

    res.sendStatus(200);
  } catch (error) {
    console.error('Error:', error);
    res.sendStatus(500);
  }
};

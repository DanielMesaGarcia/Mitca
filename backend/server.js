const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

// Import routers
const raceRouter = require('./routes/RaceRouter');
const runnerRouter = require('./routes/RunnerRouter');
const sponsorRouter = require('./routes/SponsorRouter');
const statusRouter = require('./routes/StatusRouter');
const userRouter = require('./routes/UserRouter');
const routeRouter = require('./routes/RouteRouter');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mitca', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// Configure multer properly based on your requirements for file uploads
const upload = multer();
app.use(upload.array());

// Routes
app.use('/races', raceRouter);
app.use('/runners', runnerRouter);
app.use('/sponsors', sponsorRouter);
app.use('/status', statusRouter);
app.use('/users', userRouter);
app.use('/routes', routeRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');

// Import routers
const raceRouter = require('./routes/raceRoutes');
const runnerRouter = require('./routes/runnerRoutes');
const sponsorRouter = require('./routes/sponsorRoutes');
const statusRouter = require('./routes/statusRoutes');
const userRouter = require('./routes/userRoutes');
const routeRouter = require('./routes/routeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Middleware
app.use(express.json());

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

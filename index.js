require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// Route Imports
const workoutRoutes = require('./routes/workout');
const userRoutes = require('./routes/user');

// Route Mounting
app.use('/workouts', workoutRoutes);
app.use('/users', userRoutes);

// MongoDB Connection (this is what you're missing!)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB Atlas");

  // Start server only after DB connects
  app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${process.env.PORT || 4000}`);
  });
})
.catch(err => {
  console.error("MongoDB connection error:", err.message);
});

module.exports = { app, mongoose };

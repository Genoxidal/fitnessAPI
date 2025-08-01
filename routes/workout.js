const express = require('express');
const router = express.Router();
const { verify } = require('../auth');
const {
  addWorkout,
  getMyWorkouts,
  updateWorkout,
  deleteWorkout,
  completeWorkoutStatus
} = require('../controllers/workoutController');

// Auth-protected routes
router.use(verify);

router.post('/addWorkout', addWorkout);
router.get('/getMyWorkouts', getMyWorkouts);
router.put('/updateWorkout/:id', updateWorkout);
router.delete('/deleteWorkout/:id', deleteWorkout);
router.patch('/completeWorkoutStatus/:id', completeWorkoutStatus);


module.exports = router;

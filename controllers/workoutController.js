const Workout = require('../models/Workout');

exports.addWorkout = async (req, res) => {
  try {
    const workout = await Workout.create({ ...req.body, userId: req.user.id });
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMyWorkouts = async (req, res) => {
  const workouts = await Workout.find({ userId: req.user.id });
  res.json(workouts);
};

exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteWorkout = async (req, res) => {
  const workout = await Workout.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!workout) return res.status(404).json({ message: 'Workout not found' });
  res.json({ message: 'Workout deleted' });
};

exports.completeWorkoutStatus = async (req, res) => {
  try {
    const workoutId = req.params.id;
    const { status } = req.body;
    const userId = req.user.id;

    if (!status) {
      return res.status(400).json({ message: 'Status is required in the body' });
    }

    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: workoutId, userId },
      { status },
      { new: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout not found or unauthorized' });
    }

    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


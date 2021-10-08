const auth = require('../configs/auth');

const { getWorkout, getWorkouts, updateWorkout, addWorkout } = require('../modules/Workout')

module.exports = function(app) {
  app.get('/workouts', [auth.verifyToken], getWorkouts);
  app.get('/workout/:idWorkout', [auth.verifyToken], getWorkout);
  app.put('/workout/:idWorkout',[auth.verifyToken], updateWorkout);
  app.post('/workout',[auth.verifyToken, addWorkout])
};
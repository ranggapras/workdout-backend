const auth = require('../configs/auth');

const { getworkout, getworkouts } = require('../modules/Workout')

module.exports = function(app) {
  app.get('/workouts', [auth.verifyToken], getworkouts);
  app.get('/workout/:idWorkout', [auth.verifyToken], getworkout);
};
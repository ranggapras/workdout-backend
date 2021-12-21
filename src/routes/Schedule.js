const auth = require('../configs/auth');

const { getSchedule, getSchedules, updateSchedule, addSchedule, getSchedulesByWorkout } = require('../modules/Schedule')

module.exports = function(app) {
  app.get('/schedules', [auth.verifyToken], getSchedules);
  app.get('/schedules/workout/:idWorkout', [auth.verifyToken], getSchedulesByWorkout);
  app.get('/schedule/:idSchedule', [auth.verifyToken], getSchedule);
  app.put('/schedule/:idSchedule',[auth.verifyToken], updateSchedule);
  app.post('/schedule',[auth.verifyToken], addSchedule)
};
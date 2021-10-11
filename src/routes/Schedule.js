const auth = require('../configs/auth');

const { getSchedule, getSchedules, updateSchedule, addSchedule } = require('../modules/Schedule')

module.exports = function(app) {
  app.get('/schedules', [auth.verifyToken], getSchedules);
  app.get('/schedule/:idSchedule', [auth.verifyToken], getSchedule);
  app.put('/schedule/:idSchedule',[auth.verifyToken], updateSchedule);
  app.post('/schedule',[auth.verifyToken, addSchedule])
};
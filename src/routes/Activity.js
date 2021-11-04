const auth = require('../configs/auth');
const { getActivities, getActivity, updateActivity, addActivity } = require('../modules/Activity');

module.exports = function(app) {
  app.get('/activities', [auth.verifyToken], getActivities);
  app.get('/activity/:idActivity', [auth.verifyToken], getActivity);
  app.put('/activity/:idActivity',[auth.verifyToken], updateActivity);
  app.post('/activity',[auth.verifyToken], addActivity)
};
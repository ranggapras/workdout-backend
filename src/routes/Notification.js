const auth = require('../configs/auth');
const { getNotifications, getNotification, updateNotification, addNotification } = require('../modules/Notification');

module.exports = function(app) {
  app.get('/notification', [auth.verifyToken], getNotifications);
  app.get('/notification/:idNotification', [auth.verifyToken], getNotification);
  app.put('/notification/:idNotification',[auth.verifyToken], updateNotification);
  app.post('/notification',[auth.verifyToken], addNotification)
}
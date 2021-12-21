const auth = require('../configs/auth');

const { getUsers, registerUser, loginUser, getUser, updateUser, updatePassword, getAdmin, getDashboard, sendEmail } = require('../modules/User')

module.exports = function(app) {
  app.post('/send-email/:email', [auth.basicValidation], sendEmail);
  app.get('/dashboard', [auth.verifyToken], getDashboard);
  app.get('/users', [auth.verifyToken], getUsers);
  app.get('/user/:idUser', [auth.verifyToken], getUser);
  app.get('/admin/:idUser', [auth.verifyToken], getAdmin);
  app.put('/user/:idUser', [auth.verifyToken], updateUser);
  app.patch('/user/update-password', [auth.verifyToken], updatePassword);
  app.post('/register', [auth.basicValidation], registerUser);
  app.post('/login', [auth.basicValidation], loginUser);
};
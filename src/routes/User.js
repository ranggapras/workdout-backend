const auth = require('../configs/auth');

const { getUsers, registerUser, loginUser, getUser, updateUser, updatePassword } = require('../modules/User')

module.exports = function(app) {
  app.get('/users', [auth.verifyToken], getUsers);
  app.get('/user/:idUser', [auth.verifyToken], getUser);
  app.put('/user/:idUser', [auth.verifyToken], updateUser);
  app.patch('/user/update-password', [auth.verifyToken], updatePassword);
  app.post('/register', [auth.basicValidation], registerUser);
  app.post('/login', [auth.basicValidation], loginUser);
};
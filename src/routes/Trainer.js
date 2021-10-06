const auth = require('../configs/auth');

const { getTrainer, getTrainers, addTrainer, updateTrainer } = require('../modules/Trainer')

module.exports = function(app) {
  app.get('/trainers', [auth.verifyToken], getTrainers);
  app.get('/trainer/:idUser', [auth.verifyToken], getTrainer);
  app.post('/trainer', [auth.verifyToken], addTrainer);
  app.put('/trainer/:idUser', [auth.verifyToken], updateTrainer);
};
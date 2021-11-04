const auth = require('../configs/auth');
const { getTransactions, getTransaction, updateTransaction, addTransaction, getMemberBySchedule } = require('../modules/TransactionSchedule');

module.exports = function(app) {
  app.get('/transaction/schedules', [auth.verifyToken], getTransactions);
  app.get('/transaction/schedule/:idTransaction', [auth.verifyToken], getTransaction);
  app.get('/transaction/schedule-member/:idTrainer', [auth.verifyToken], getMemberBySchedule);
  app.put('/transaction/schedule/:idTransaction',[auth.verifyToken], updateTransaction);
  app.post('/transaction/schedule',[auth.verifyToken], addTransaction)
};
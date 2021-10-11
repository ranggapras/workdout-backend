const auth = require('../configs/auth');
const { getTransactions, getTransaction, updateTransaction, addTransaction } = require('../modules/TransactionSchedule');

module.exports = function(app) {
  app.get('/transaction/schedules', [auth.verifyToken], getTransactions);
  app.get('/transaction/schedule/:idTransaction', [auth.verifyToken], getTransaction);
  app.put('/transaction/schedule/:idTransaction',[auth.verifyToken], updateTransaction);
  app.post('/transaction/schedule',[auth.verifyToken, addTransaction])
};
const auth = require('../configs/auth');
const { getTransactionProduct, getTransactionProducts, updateTransaction, addTransactionProduct, getMidtransNotif } = require('../modules/TransactionProduct');

module.exports = function(app) {
  app.get('/transaction/products', [auth.verifyToken], getTransactionProducts);
  app.get('/transaction/product/:idTransactionProducts', [auth.verifyToken], getTransactionProduct);
  app.put('/transaction/product/:idTransactionProducts',[auth.verifyToken], updateTransaction);
  app.post('/transaction/product',[auth.verifyToken], addTransactionProduct)
  app.post('/transaction/midtrans',[], getMidtransNotif)
};
const auth = require('../configs/auth');
const { getPayments, getPayment, getMidtransNotif, getIsi } = require('../modules/Payment');

module.exports = function(app) {
  app.get('/payments', [auth.verifyToken], getPayments);
  app.get('/isi-saldo', [auth.verifyToken], getIsi);
  app.get('/payment/:idPayment', [auth.verifyToken], getPayment);
  app.post('/payment/midtrans',[], getMidtransNotif)
};
const auth = require('../configs/auth');
const { getPayments, getPayment, getMidtransNotif } = require('../modules/Payment');

module.exports = function(app) {
  app.get('/payments', [auth.verifyToken], getPayments);
  app.get('/payment/:idPayment', [auth.verifyToken], getPayment);
  app.post('/payment/midtrans',[], getMidtransNotif)
};
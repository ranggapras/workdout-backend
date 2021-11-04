const auth = require('../configs/auth');
const { getCarts, addCart, updateItem, deleteCart } = require('../modules/Cart');

module.exports = function(app) {
  app.get('/cart/:idUser', [auth.verifyToken], getCarts);
  app.post('/cart', [auth.verifyToken], addCart);
  app.put('/cart/:idProduct',[auth.verifyToken], updateItem);
  app.delete('/cart/:idCart',[auth.verifyToken], deleteCart)
}
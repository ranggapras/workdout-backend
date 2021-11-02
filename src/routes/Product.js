const auth = require('../configs/auth');
const { getProducts, getProduct, updateProduct, addProduct } = require('../modules/Product');

module.exports = function(app) {
  app.get('/products', [auth.verifyToken], getProducts);
  app.get('/product/:idProduct', [auth.verifyToken], getProduct);
  app.put('/product/:idProduct',[auth.verifyToken], updateProduct);
  app.post('/product',[auth.verifyToken, addProduct])
}
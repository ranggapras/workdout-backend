const auth = require('../configs/auth');
const { getMembershipProduct, getMembershipProducts, updateMembershipProduct, addMembershipProduct } = require('../modules/MembershipProduct');

module.exports = function(app) {
  app.get('/product/memberships', [auth.verifyToken], getMembershipProducts);
  app.get('/product/membership/:idMembershipProduct', [auth.verifyToken], getMembershipProduct);
  app.put('/product/membership/:idMembershipProduct',[auth.verifyToken], updateMembershipProduct);
  app.post('/product/membership',[auth.verifyToken], addMembershipProduct)
}
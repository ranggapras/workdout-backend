const auth = require('../configs/auth');
const { getPromo, getPromos, updatePromo, addPromo } = require('../modules/Promo');

module.exports = function(app) {
  app.get('/promo', [auth.verifyToken], getPromos);
  app.get('/promo/:idPromo', [auth.verifyToken], getPromo);
  app.put('/promo/:idPromo',[auth.verifyToken], updatePromo);
  app.post('/Promo',[auth.verifyToken, addPromo])
};
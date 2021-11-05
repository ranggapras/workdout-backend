const auth = require('../configs/auth');
const { getMemberships, getMembership, addMembership, updateMembership } = require('../modules/Membership');

module.exports = function(app) {
  app.get('/memberships', [auth.verifyToken], getMemberships);
  app.get('/membership/:idMembership', [auth.verifyToken], getMembership);
  app.put('/membership/:idMembership',[auth.verifyToken], addMembership);
  app.post('/membership',[auth.verifyToken], updateMembership)
}
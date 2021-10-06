const BASIC_TOKEN = 'YWRtaW5Ad29ya2RvdXQuY29tOndvcmtkb3V0';
const jwt = require("jsonwebtoken");

const basicValidation = (request, response, next) => {
  const reqToken = request.headers.authorization;
  const token = reqToken ? reqToken.split(' ')[1] : '';
  if(!token){
    return response.status(403).send({
      code: 403,
      message: "No Token!"
    });
  } else if(token !== BASIC_TOKEN){
    return response.status(401).send({
      code: 401,
      message: "Unauthorized!"
    });
  }
  next();
}

const verifyToken = (request, response, next) => {
  const reqToken = request.headers.authorization;
  const token = reqToken ? reqToken.split(' ')[1] : '';
  if(!token){
    return response.status(403).send({
      code: 403,
      message: "No Token!"
    });
  }

  jwt.verify(token, BASIC_TOKEN, (err, decoded) => {
    if (err) {
      return response.status(401).send({
        code: 401,
        message: "Unauthorized!"
      });
    }
    request.idUser = decoded.id;
    next();
  });
};


module.exports = { basicValidation, verifyToken, BASIC_TOKEN };
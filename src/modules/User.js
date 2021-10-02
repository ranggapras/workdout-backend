const pool = require('../config/dbconnect');
const { BASIC_TOKEN } = require('../config/auth');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = (request, response) => {
  pool.query('SELECT * FROM public."User"', (error, results) => {
    if (error) {
      return response.status(500).send({
        code: 500,
        message: "Failed!"
      });
    }
    const result = {
      data: results.rows,
      code: 200,
      message: 'success'
    }
    return response.status(200).json(result)
  })
}

const registerUser = (request, response) => {
  const { nameUser, password, email, phoneNumber } = request.body;
  pool.query(`INSERT INTO public."User" ("nameUser", "password", "phoneNumber", "email") VALUES
    ('${nameUser}', '${bcrypt.hashSync(password, 8)}', '${phoneNumber}', '${email}')`, (error, results) => {
      const result = {
        data: {},
        code: 200,
        message: 'success'
      }
      return response.status(200).json(result)
  })
}

const loginUser = (request, response) => {
  const { password, email } = request.body;
  pool.query(`SELECT * FROM public."User" WHERE "email" = '${email}'`, (error, results) => {
      if(results.rows.length > 0){
        const passwordIsValid = bcrypt.compareSync(
          password,
          results.rows[0].password
        );
        if (!passwordIsValid) {
          return response.status(401).send({
            accessToken: null,
            code: 401,
            message: "Email atau Password Salah"
          });
        }

        var token = jwt.sign({ id: results.rows[0].idUser }, BASIC_TOKEN, {
          expiresIn: 86400
        });

        return response.status(200).send({
          accessToken: token,
          code: 200,
          message: "Sukses Login"
        });
      } else {
        return response.status(400).json({
          code: 404,
          message: "Email atau Password Salah"
        })
      }
  })
}

module.exports = {
  getUsers,
  registerUser,
  loginUser,
}
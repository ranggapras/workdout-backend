const pool = require('../configs/dbconnect');
const { BASIC_TOKEN } = require('../configs/auth');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = (request, response) => {
  pool.query('SELECT * FROM public."view_member"', (error, results) => {
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

const getUser = (request, response) => {
  const { idUser } = request.params;
  pool.query(`SELECT * FROM public."view_member" WHERE public."view_member"."idUser" = '${idUser}'`, (error, results) => {
    if (error) {
      return response.status(500).send({
        code: 500,
        message: "Failed!"
      });
    }
    const result = {
      data: results.rows[0],
      code: 200,
      message: 'success'
    }
    return response.status(200).json(result)
  })
}

const registerUser = (request, response) => {
  const { nameUser, password, email, phoneNumber, gender, dob, address } = request.body;
  pool.query(`INSERT INTO public."User" ("nameUser", "password", "phoneNumber", "email") VALUES
    ('${nameUser}', '${bcrypt.hashSync(password, 8)}', '${phoneNumber}', '${email}')  RETURNING "idUser"`, (error, results) => {
      pool.query(`INSERT INTO public."Customer" ("idUser" ,"gender", "dob", "address") VALUES
    ('${results.rows[0].idUser}', '${gender}', '${dob}', '${address}')  RETURNING "idUser"`, (error, results) => {
      if (error) {
        return response.status(500).send({
          code: 500,
          message: "Failed!"
        });
      }
      const result = {
        data: results.rows[0],
        code: 201,
        message: 'success'
      }
      return response.status(200).json(result)
    })
    if (error) {
      return response.status(500).send({
        code: 500,
        message: "Failed!"
      });
    }
  })
}

const updateUser = (request, response) => {
  const { idUser } = request.params;
  const { nameUser, photo, email, phoneNumber } = request.body;
  pool.query(`UPDATE public."User" SET "nameUser" = '${nameUser}', "photo" = '${photo}', "phoneNumber" = '${phoneNumber}',
     "email" = '${email}' WHERE "idUser" = '${idUser}'`, (error, results) => {
      if (error) {
        console.log(error);
        return response.status(500).send({
          code: 500,
          message: "Failed!"
        });
      }
      const result = {
        data: {},
        code: 201,
        message: 'success'
      }
      return response.status(200).json(result)
  })
}

const updatePassword = (request, response) => {
  const { password, newPassword, repeatPassword } = request.body;
  pool.query(`SELECT * FROM public."User" WHERE "idUser" = '${request.idUser}'`, (error, results) => {
    if (error) {
      console.log(error);
      return response.status(500).send({
        code: 500,
        message: "Failed!"
      });
    }
    if(results.rows.length > 0){
      const passwordIsValid = bcrypt.compareSync(
        password,
        results.rows[0].password
      );
      if (!passwordIsValid) {
        return response.status(401).send({
          accessToken: null,
          code: 401,
          message: "Password Salah"
        });
      } else {
        if(newPassword !== repeatPassword) {
          if (error) {
            return response.status(400).send({
              code: 400,
              message: "Password baru tidak sama!"
            });
          }
        }
        pool.query(`UPDATE public."User" SET "password" = '${bcrypt.hashSync(newPassword, 8)}' WHERE "idUser" = '${request.idUser}'`, (error, results) => {
          if (error) {
            return response.status(500).send({
              code: 500,
              message: "Failed!"
            });
          }
          const result = {
            data: {},
            code: 201,
            message: 'success'
          }
          return response.status(200).json(result)
      })
      }
    } else {
      return response.status(401).send({
        accessToken: null,
        code: 400,
        message: "Password Salah"
      });
    }
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
  getUser,
  registerUser,
  updateUser,
  updatePassword,
  loginUser,
}
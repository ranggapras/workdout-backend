const pool = require('../configs/dbconnect');
const { BASIC_TOKEN } = require('../configs/auth');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getTrainers = (request, response) => {
  pool.query('SELECT * FROM public."view_trainer"', (error, results) => {
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

const getTrainer = (request, response) => {
  const { idUser } = request.params;
  pool.query(`SELECT * FROM public."view_trainer" WHERE public."view_member"."idUser" = '${idUser}'`, (error, results) => {
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

const addTrainer = (request, response) => {
  const { nameUser, password, email, phoneNumber, gender, dob, address } = request.body;
  pool.query(`INSERT INTO public."User" ("nameUser", "password", "phoneNumber", "email","role") VALUES
    ('${nameUser}', '${bcrypt.hashSync(password, 8)}', '${phoneNumber}', '${email}, '2')  RETURNING "idUser"`, (error, results) => {
      pool.query(`INSERT INTO public."Trainer" ("idUser" ) VALUES ('${results.rows[0].idUser}')  RETURNING "idUser"`, (error, results) => {
      const result = {
        data: results.rows[0],
        code: 201,
        message: 'success'
      }
      return response.status(200).json(result)
    })
  })
}

const updateTrainer = (request, response) => {
  const { nameUser, photo, email, phoneNumber } = request.body;
  pool.query(`UPDATE public."User" SET "nameUser" = '${nameUser}', "photo = '${photo}', "phoneNumber" = '${phoneNumber}',
     "email" = '${email}'`, (error, results) => {
      const result = {
        data: {},
        code: 201,
        message: 'success'
      }
      return response.status(200).json(result)
  })
}

const deleteTrainer = (request, response) => {
  const { idTrainer } = request.params;
  pool.query(`DELETE FROM public."Trainer" WHERE "idTrainer"='${idTrainer}'`, (error, results) => {
    if (error) {
      return response.status(500).send({
        code: 500,
        message: 'Failed!',
      });
    }
      const result = {
        data: {},
        code: 200,
        message: 'success'
      }
      return response.status(200).json(result)
  })
}


module.exports = {
  getTrainer,
  getTrainers,
  addTrainer,
  updateTrainer,
  deleteTrainer
}
const pool = require('../configs/dbconnect');
const { BASIC_TOKEN } = require('../configs/auth');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getworkouts = (request, response) => {
  pool.query('SELECT * FROM public."Workout"', (error, results) => {
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

const getworkout = (request, response) => {
  const { idWorkout } = request.params;
  pool.query(`SELECT * FROM public."Workout" WHERE "idWorkdout" = '${idWorkout}'`, (error, results) => {
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

const addworkout = (request, response) => {
  const { nameUser, password, email, phoneNumber, gender, dob, address } = request.body;
  pool.query(`INSERT INTO public."User" ("nameUser", "password", "phoneNumber", "email") VALUES
    ('${nameUser}', '${bcrypt.hashSync(password, 8)}', '${phoneNumber}', '${email}')  RETURNING "idUser"`, (error, results) => {
      pool.query(`INSERT INTO public."workout" ("idUser" ) VALUES ('${results.rows[0].idUser}')  RETURNING "idUser"`, (error, results) => {
      const result = {
        data: results.rows[0],
        code: 201,
        message: 'success'
      }
      return response.status(200).json(result)
    })
  })
}

const updateworkout = (request, response) => {
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

module.exports = {
  getworkout,
  getworkouts,
  addworkout,
  updateworkout,
}
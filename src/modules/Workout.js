const pool = require('../configs/dbconnect');

const getWorkouts = (request, response) => {
  pool.query('SELECT * FROM public."Workout"', (error, results) => {
    if (error) {
      return response.status(500).send({
        code: 500,
        message: "Failed!"
      });
    }
    const result = {
      data: results.rows,
      meta: { totalData: 2, page: 1 },
      code: 200,
      message: 'success'
    }
    return response.status(200).json(result)
  })
}

const getWorkout = (request, response) => {
  const { idWorkout } = request.params;
  pool.query(`SELECT * FROM public."Workout" WHERE "idWorkout" = '${idWorkout}'`, (error, results) => {
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

const addWorkout = (request, response) => {
  const { name, time, description } = request.body;
  pool.query(`INSERT INTO public."Workout" ("name", "time", "description") VALUES
    ( '${name}', '${time}', '${description}')  RETURNING "idWorkout"`, (error, results) => {
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
}

const updateWorkout = (request, response) => {
  const { idWorkout } = request.params;
  const { name,time,description } = request.body;
  pool.query(`UPDATE public."Workout" SET "name" = '${name}', "time" = '${time}', "description" = '${description}'
  WHERE "idWorkout"='${idWorkout}'`, (error, results) => {
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

const deleteWorkout = (request, response) => {
  const { idWorkout } = request.params;
  pool.query(`DELETE FROM public."Workout" WHERE "idWorkout"='${idWorkout}'`, (error, results) => {
    if (error) {
      return response.status(500).send({
        code: 500,
        message: "Failed!"
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
  getWorkout,
  getWorkouts,
  addWorkout,
  deleteWorkout,
  updateWorkout,
}
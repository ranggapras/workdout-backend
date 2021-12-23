const pool = require('../configs/dbconnect');

const getSchedules = (request, response) => {
  pool.query('SELECT * FROM public."Schedule"', (error, results) => {
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

const getSchedulesByWorkout = (request, response) => {
  const { idWorkout } = request.params;
  pool.query(`SELECT * FROM public."Schedule" WHERE "idWorkout" = '${idWorkout}'`, (error, results) => {
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

const getSchedule = (request, response) => {
  const { idSchedule } = request.params;
  pool.query(`SELECT * FROM public."Schedule" WHERE "idSchedule" = '${idSchedule}'`, (error, results) => {
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

const addSchedule = (request, response) => {
  const { idTrainer, idWorkout, name, dateTimeStart, dateTimeEnd, isPlanned = false } = request.body;
  pool.query(`INSERT INTO public."Schedule" ("idTrainer", "idWorkout", "name","dateTimeStart","dateTimeEnd","isPlanned") VALUES
    ('${idTrainer}','{${idWorkout.map(d => `"${d}"`).join(',')}}', '${name}','${dateTimeStart}', '${dateTimeEnd}', '${isPlanned}')  RETURNING "idSchedule"`, (error, results) => {
      if (error) {
        console.log(error);
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

const updateSchedule = (request, response) => {
  const { idSchedule } = request.params;
  const { idTrainer, idWorkout, name, dateTimeStart, dateTimeEnd, isPlanned = false} = request.body;
  pool.query(`UPDATE public."Schedule" SET "idTrainer" = '${idTrainer}',"idWorkout" = '{${idWorkout.map(d => `"${d}"`).join(',')}}',"name" = '${name}', "dateTimeStart" = '${dateTimeStart}', "dateTimeEnd" = '${dateTimeEnd}', "isPlanned" = '${isPlanned}'
  WHERE "idSchedule"='${idSchedule}'`, (error, results) => {
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

module.exports = {
  getSchedules,
  getSchedule,
  addSchedule,
  updateSchedule,
  getSchedulesByWorkout
}
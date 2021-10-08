const pool = require('../configs/dbconnect');

const getActivities = (request, response) => {
  pool.query('SELECT * FROM public."Activity"', (error, results) => {
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

const getActivity = (request, response) => {
  const { idActivity } = request.params;
  pool.query(`SELECT * FROM public."Activity" WHERE "idActivity" = '${idActivity}'`, (error, results) => {
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

const addActivity = (request, response) => {
  const { name,jumlahKalori } = request.body;
  pool.query(`INSERT INTO public."Activity" ("name", "jumlahKalori") VALUES
    ('${name}', '${jumlahKalori}')  RETURNING "idActivity"`, (error, results) => {
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

const updateActivity = (request, response) => {
  const { idActivity } = request.params;
  const { name,jumlahKalori } = request.body;
  pool.query(`UPDATE public."Activity" SET "name" = '${name}', "jumlahKalori" = '${jumlahKalori}'
    WHERE "idActivity" = '${idActivity}'`, (error, results) => {
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
  getActivity,
  getActivities,
  addActivity,
  updateActivity,
}
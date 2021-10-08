const pool = require('../configs/dbconnect');

const getNotifications = (request, response) => {
  pool.query('SELECT * FROM public."Notification"', (error, results) => {
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

const getNotification = (request, response) => {
  const { idNotification } = request.params;
  pool.query(`SELECT * FROM public."Notification" WHERE "idNotification" = '${idNotification}'`, (error, results) => {
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

const addNotification = (request, response) => {
  const { idDevice,message,dateTime,title } = request.body;
  pool.query(`INSERT INTO public."Notification" ("idDevice","message", "dateTime","title") VALUES
    ('${idDevice}','${message}', '${dateTime}','${title}')  RETURNING "idNotification"`, (error, results) => {
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

const updateNotification = (request, response) => {
  const { idNotification } = request.params;
  const { idDevice,message,dateTime,title } = request.body;
  pool.query(`UPDATE public."Notification" SET "idDevice" = '${idDevice}', "message" = '${message}',"dateTime"='${dateTime}',"title"='${title}'
    WHERE "idNotification" = '${idNotification}'`, (error, results) => {
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

module.exports = {
  getNotification,
  getNotifications,
  addNotification,
  updateNotification,
}
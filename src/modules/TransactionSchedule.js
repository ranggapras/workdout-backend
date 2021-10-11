const pool = require('../configs/dbconnect');

const getTransactions = (request, response) => {
  pool.query('SELECT * FROM public."TransactionSchedule"', (error, results) => {
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

const getTransaction = (request, response) => {
  const { idTransaction } = request.params;
  pool.query(`SELECT * FROM public."TransactionSchedule" WHERE "idTransaction" = '${idTransaction}'`, (error, resultsSchedule) => {
    pool.query(`SELECT * FROM public."Schedule" WHERE "idSchedule" = '${resultsSchedule.rows[0].idSchedule}'`, (error, results) => {
      if (error) {
        console.log(error);
        return response.status(500).send({
          code: 500,
          message: "Failed!"
        });
      }
      if(resultsSchedule.rows[0].idPromo !== ''){
        pool.query(`SELECT * FROM public."Promo" WHERE "idPromo" = '${resultsSchedule.rows[0].idPromo}'`, (error, resultsPromo) => {
          if (error) {
            console.log(error);
            return response.status(500).send({
              code: 500,
              message: "Failed!"
            });
          }
          const result = {
            data: {
              ...resultsSchedule.rows[0],
              schedule: results.rows[0],
              promo: resultsPromo.rows[0]
            },
            code: 200,
            message: 'success'
          }
          return response.status(200).json(result)
        })
      } else {
        const result = {
          data: {
            ...resultsSchedule.rows[0],
            schedule: results.rows[0],
            promo: {},
          },
          code: 200,
          message: 'success'
        }
        return response.status(200).json(result)
      }
    })
    if (error) {
      return response.status(500).send({
        code: 500,
        message: "Failed!"
      });
    }
  })
}

const addTransaction = (request, response) => {
  const { idSchedule, amount = 40000, description, idPromo = '', idUser } = request.body;
  pool.query(`INSERT INTO public."TransactionSchedule" ("idSchedule", "amount","description","idPromo","idUser") VALUES
    ('${idSchedule}','${amount}', '${description}','${idPromo}', '${idUser}')  RETURNING "idTransaction"`, (error, results) => {
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

const updateTransaction = (request, response) => {
  const { idTransaction } = request.params;
  const { status } = request.body;
  pool.query(`UPDATE public."TransactionSchedule" SET "status" = '${status}' WHERE "idTransaction"='${idTransaction}'`, (error, results) => {
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
  getTransaction,
  getTransactions,
  addTransaction,
  updateTransaction,
}
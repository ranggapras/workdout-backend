const pool = require('../configs/dbconnect');
const { snap } = require('../configs/midtrans');

const getPayments = (request, response) => {
  pool.query('SELECT * FROM public."Payment"', (error, results) => {
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

const getPayment = (request, response) => {
  const { idTransactionProduct } = request.params;
  pool.query(`SELECT * FROM public."Payment" WHERE "idPayment" = '${idTransactionProduct}'`, (error, results) => {
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

module.exports = {
  getPayments,
  getPayment,
}
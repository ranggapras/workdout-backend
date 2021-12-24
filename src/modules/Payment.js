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
      meta: { totalData: 10, page: 1},
      code: 200,
      message: 'success'
    }
    return response.status(200).json(result)
  })
}

const getIsi = (request, response) => {
  pool.query('SELECT * FROM public."Payment" WHERE "type" = 4', (error, results) => {
    if (error) {
      return response.status(500).send({
        code: 500,
        message: "Failed!"
      });
    }
    const result = {
      data: results.rows,
      meta: { totalData: 10, page: 1},
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

const getMidtransNotif = (request, response) => {
  snap.transaction.notification(notificationJson)
    .then((statusResponse)=>{
        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;
 
        console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

        pool.query(`UPDATE public."Payment" SET "status" = 1 WHERE "orderId"='${orderId}'`, (error, results) => {
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
    });
}

module.exports = {
  getPayments,
  getIsi,
  getPayment,
  getMidtransNotif
}
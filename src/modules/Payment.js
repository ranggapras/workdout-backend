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

const getMidtransNotif = (request, response) => {
  snap.transaction.notification(notificationJson)
    .then((statusResponse)=>{
        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;
 
        console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

        if (transactionStatus == 'capture'){
            if (fraudStatus == 'challenge'){
                // TODO set transaction status on your database to 'challenge'
                // and response with 200 OK
            } else if (fraudStatus == 'accept'){
                // TODO set transaction status on your database to 'success'
                // and response with 200 OK
            }
        } else if (transactionStatus == 'settlement'){
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
        } else if (transactionStatus == 'cancel' ||
          transactionStatus == 'deny' ||
          transactionStatus == 'expire'){
          // TODO set transaction status on your database to 'failure'
          // and response with 200 OK
        } else if (transactionStatus == 'pending'){
          // TODO set transaction status on your database to 'pending' / waiting payment
          // and response with 200 OK
        }
    });
}

module.exports = {
  getPayments,
  getPayment,
  getMidtransNotif
}